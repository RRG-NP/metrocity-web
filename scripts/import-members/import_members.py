#!/usr/bin/env python3
"""
Roster sync for RAC Metro City.

Logs in to the District 3292 club portal, pulls the club's member list, saves a
privacy-filtered snapshot to members.json, and reports how it differs from
`src/data/members.ts`:

    npm run import:members            # fetch and report the diff
    npm run import:members -- --offline   # re-report from the saved snapshot

Unlike the project importer, this script never rewrites `src/data/members.ts`.
That file is hand-curated: it carries the site's own role titles (e.g. "Vice
President (Operations)" where the portal only says "Vice President"), display
order, board/general split, and photo overrides. Clobbering it would throw all
of that away. So this reports what changed and prints paste-ready entries for
anyone new; a human decides where they belong.

Credentials are read from (in order): --email/--password flags, the
ROTARACT_EMAIL / ROTARACT_PASSWORD environment variables, a .env.local file at
the repo root, or an interactive prompt.
"""

import argparse
import getpass
import json
import os
import re
import subprocess
import sys

BASE = "https://my.rotaract3292.org"
LOGIN_URL = f"{BASE}/software/login"
MEMBERS_API = f"{BASE}/software/my-club/api/myMembersList"

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, "..", ".."))
CACHE_DIR = os.path.join(SCRIPT_DIR, ".cache")
COOKIE_JAR = os.path.join(CACHE_DIR, "cookies.txt")
SNAPSHOT_PATH = os.path.join(SCRIPT_DIR, "members.json")
MEMBERS_TS = os.path.join(REPO_ROOT, "src", "data", "members.ts")

# The API also returns email, contact_number and blood_group. members.json is
# committed to a public repo, so those never leave the portal - only what the
# website itself displays is kept.
KEEP_FIELDS = ("id", "member_id", "name", "designation", "status", "profile_image")


def log(msg):
    print(msg, flush=True)


def die(msg):
    print(f"\nERROR: {msg}", file=sys.stderr)
    sys.exit(1)


def curl(args):
    base = ["curl", "-sS", "-b", COOKIE_JAR, "-c", COOKIE_JAR,
            "--retry", "3", "--retry-delay", "2", "--max-time", "90"]
    return subprocess.run(base + args, capture_output=True, text=True)


# ── credentials ──────────────────────────────────────────────────────────────


def load_dotenv_local():
    path = os.path.join(REPO_ROOT, ".env.local")
    if not os.path.isfile(path):
        return {}
    out = {}
    for line in open(path, encoding="utf-8"):
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        out[k.strip()] = v.strip().strip('"').strip("'")
    return out


def get_credentials(args):
    env = load_dotenv_local()
    email = args.email or os.environ.get("ROTARACT_EMAIL") or env.get("ROTARACT_EMAIL")
    pw = args.password or os.environ.get("ROTARACT_PASSWORD") or env.get("ROTARACT_PASSWORD")
    if not email:
        email = input("Portal email: ").strip()
    if not pw:
        pw = getpass.getpass("Portal password (hidden): ").strip()
    if not email or not pw:
        die("Email and password are required.")
    return email, pw


# ── portal session ───────────────────────────────────────────────────────────


def login(email, pw):
    os.makedirs(CACHE_DIR, exist_ok=True)
    login_page = os.path.join(CACHE_DIR, "login_page.html")
    r = curl(["-L", LOGIN_URL, "-o", login_page, "-w", "%{http_code}"])
    if not r.stdout.strip().startswith("2"):
        die(f"Could not load the login page (HTTP {r.stdout.strip()}). Is the portal reachable?")

    html = open(login_page, encoding="utf-8").read()
    m = re.search(r'name="_token"\s+value="([^"]*)"', html)
    if not m:
        die("Could not find the CSRF token on the login page (the portal layout may have changed).")

    after = os.path.join(CACHE_DIR, "after_login.html")
    curl(["-L", LOGIN_URL,
          "--data-urlencode", f"_token={m.group(1)}",
          "--data-urlencode", f"email={email}",
          "--data-urlencode", f"password={pw}",
          "-o", after, "-w", "%{http_code}"])
    body = open(after, encoding="utf-8").read().lower()
    if "do not match" in body or "incorrect" in body or "these credentials" in body:
        die("Login rejected - check the email/password.")
    if "logout" not in body and "dashboard" not in body:
        die("Login did not reach the dashboard (unexpected response). Check credentials/portal.")
    log("Logged in.")


def fetch_members():
    """The portal returns the club's whole roster as one JSON array (no paging)."""
    out = os.path.join(CACHE_DIR, "members_raw.json")
    curl(["-G", MEMBERS_API, "-H", "X-Requested-With: XMLHttpRequest", "-o", out])
    try:
        rows = json.load(open(out, encoding="utf-8"))
    except Exception:
        die("Member API did not return JSON (session may have expired).")
    if isinstance(rows, dict):  # tolerate a future {data: [...]} wrapper
        rows = rows.get("data", [])
    if not rows:
        die("Member API returned an empty roster - that is almost certainly wrong.")
    log(f"Portal roster: {len(rows)} member(s).")
    return [{k: r.get(k) for k in KEEP_FIELDS} for r in rows]


# ── comparison against the website ───────────────────────────────────────────


def norm(name):
    """'Rtr Bhumika Bhandari' and 'Rtr. Bhumika Bhandari' are the same person."""
    n = re.sub(r"^\s*(rtr|rtn|rotaractor)\.?\s+", "", (name or "").strip(), flags=re.I)
    return re.sub(r"\s+", " ", n).strip().lower()


def site_members():
    """Pull every name/role pair the website renders, board and general alike."""
    src = open(MEMBERS_TS, encoding="utf-8").read()
    pairs = re.findall(r'name:\s*"([^"]+)",\s*\n\s*role:\s*"([^"]+)"', src)
    return {norm(n): (n, r) for n, r in pairs}


def ts_entry(m, order):
    """A paste-ready Member literal for someone the site doesn't have yet."""
    name = m["name"] if re.match(r"^\s*Rtr\.?\s", m["name"] or "", re.I) else f"Rtr. {m['name']}"
    name = re.sub(r"^Rtr\s", "Rtr. ", name)
    img = m.get("profile_image") or ""
    file = img.rsplit("/", 1)[-1]
    if not file or file == "default.jpg":
        seed = re.sub(r"[^a-z0-9]+", "-", norm(name)).strip("-")
        photo = f'ph("{seed}", 200, 200)'
        note = "    // No profile photo on the portal yet - branded placeholder until there is one.\n"
    else:
        photo = f"`${{PHOTO_BASE}}/{file}`"
        note = ""
    return (
        "  {\n"
        f'    name: "{name}",\n'
        f'    role: "General Member",\n'
        f"{note}"
        f"    photo: {photo},\n"
        f'    rotaryYear: "{ROTARY_YEAR}",\n'
        f"    order: {order},\n"
        "    isBoard: false,\n"
        "  },"
    )


def current_tenure_id():
    cfg = open(os.path.join(REPO_ROOT, "src", "config", "club.config.ts"), encoding="utf-8").read()
    m = re.search(r'currentTenureId\s*=\s*"([^"]+)"', cfg)
    return m.group(1) if m else "unknown"


def highest_order():
    src = open(MEMBERS_TS, encoding="utf-8").read()
    orders = [int(o) for o in re.findall(r"order:\s*(\d+)", src)]
    return max(orders) if orders else 0


def report(portal):
    site = site_members()
    by_norm = {norm(m["name"]): m for m in portal}

    new = [m for k, m in by_norm.items() if k not in site]
    gone = [site[k] for k in site if k not in by_norm]
    disabled = [m for m in portal if (m.get("status") or "").lower() != "enabled"]

    log("")
    log("=" * 68)
    log(f"  Portal roster : {len(portal)} member(s)  "
        f"({len(portal) - len(disabled)} active, {len(disabled)} not enabled)")
    log(f"  Website shows : {len(site)} member(s)   [{MEMBERS_TS.split('src/')[-1]}]")
    log("=" * 68)

    if disabled:
        log("\nNot enabled on the portal:")
        for m in disabled:
            log(f"  - {m['name']} ({m['member_id']}) - status {m['status']}")

    if gone:
        log("\nOn the website but NOT on the portal (left the club, or a name spelt differently):")
        for name, role in gone:
            log(f"  - {name} - {role}")

    if new:
        log(f"\nOn the portal but NOT on the website ({len(new)}):")
        for m in sorted(new, key=lambda x: str(x["member_id"])):
            log(f"  - {m['name']} ({m['member_id']}) - {m['designation']}")
        log("\nPaste these into `generalMembers` in src/data/members.ts,")
        log("then move anyone who is actually a board member into the roster with a real title:\n")
        order = highest_order()
        for i, m in enumerate(sorted(new, key=lambda x: str(x["member_id"])), 1):
            log(ts_entry(m, order + i))

    if not new and not gone and not disabled:
        log("\nThe website roster matches the portal. Nothing to do.")
    log("")


def main():
    global ROTARY_YEAR
    ap = argparse.ArgumentParser(description="Sync-check RAC Metro City's roster against the portal.")
    ap.add_argument("--offline", action="store_true",
                    help="Re-report from the saved members.json without logging in.")
    ap.add_argument("--email", help="Portal email (else env / .env.local / prompt).")
    ap.add_argument("--password", help="Portal password (else env / .env.local / prompt).")
    args = ap.parse_args()

    ROTARY_YEAR = current_tenure_id()

    if args.offline:
        if not os.path.isfile(SNAPSHOT_PATH):
            die("No saved snapshot yet - run without --offline once first.")
        portal = json.load(open(SNAPSHOT_PATH, encoding="utf-8"))
        log(f"Using saved snapshot: {len(portal)} member(s).")
    else:
        email, pw = get_credentials(args)
        login(email, pw)
        portal = fetch_members()
        portal.sort(key=lambda m: str(m.get("member_id") or ""))
        with open(SNAPSHOT_PATH, "w", encoding="utf-8") as f:
            json.dump(portal, f, indent=1, ensure_ascii=False)
        log(f"Snapshot saved to {SNAPSHOT_PATH}")

    report(portal)


if __name__ == "__main__":
    main()
