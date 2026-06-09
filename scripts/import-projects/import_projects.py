#!/usr/bin/env python3
"""
One-command importer for RAC Metro City project reports.

Logs in to the District 3292 club portal, pulls the report list, downloads each
report's detail page and photos, normalizes everything, merges it into the
committed store (reports.json), and regenerates src/data/projects.ts.

Run it from anywhere:

    npm run import:projects                 # newest Rota year only (default)
    npm run import:projects -- --year 2024-25
    npm run import:projects -- --all        # every Rota year on the portal
    npm run import:projects -- --regen-only # rebuild projects.ts from the store, no login

Credentials are read from (in order): --email/--password flags, the
ROTARACT_EMAIL / ROTARACT_PASSWORD environment variables, a .env.local file at
the repo root, or an interactive prompt. Nothing is written to disk by this
script except the session cookie under .cache/ (gitignored).
"""

import argparse
import getpass
import json
import os
import re
import subprocess
import sys

import lib_generate
import lib_parse

BASE = "https://my.rotaract3292.org"
LOGIN_URL = f"{BASE}/software/login"
LIST_API = f"{BASE}/software/my-club/api/project-reportsList"
REPORT_URL = f"{BASE}/software/my-club/project-reports"

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, "..", ".."))
CACHE_DIR = os.path.join(SCRIPT_DIR, ".cache")
COOKIE_JAR = os.path.join(CACHE_DIR, "cookies.txt")
HTML_DIR = os.path.join(CACHE_DIR, "reports")
STORE_PATH = os.path.join(SCRIPT_DIR, "reports.json")
PROJECTS_TS = os.path.join(REPO_ROOT, "src", "data", "projects.ts")


# ── small helpers ────────────────────────────────────────────────────────────


def log(msg):
    print(msg, flush=True)


def die(msg):
    print(f"\nERROR: {msg}", file=sys.stderr)
    sys.exit(1)


def curl(args):
    """Run curl with the shared cookie jar. Returns CompletedProcess."""
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
    token = m.group(1)

    after = os.path.join(CACHE_DIR, "after_login.html")
    curl(["-L", LOGIN_URL,
          "--data-urlencode", f"_token={token}",
          "--data-urlencode", f"email={email}",
          "--data-urlencode", f"password={pw}",
          "-o", after, "-w", "%{http_code}"])
    body = open(after, encoding="utf-8").read().lower()
    if "do not match" in body or "incorrect" in body or "these credentials" in body:
        die("Login rejected - check the email/password.")
    if "logout" not in body and "dashboard" not in body:
        die("Login did not reach the dashboard (unexpected response). Check credentials/portal.")
    log("Logged in.")


def fetch_list():
    """Page through the report list API and return all rows (across all years)."""
    rows, page, total = [], 1, None
    while True:
        out = os.path.join(CACHE_DIR, f"list_p{page}.json")
        curl(["-G", LIST_API,
              "--data-urlencode", f"pagination[page]={page}",
              "--data-urlencode", "pagination[perpage]=100",
              "-H", "X-Requested-With: XMLHttpRequest",
              "-o", out])
        try:
            d = json.load(open(out, encoding="utf-8"))
        except Exception:
            die(f"List API did not return JSON on page {page} (session may have expired).")
        rows.extend(d.get("data", []))
        total = (d.get("meta") or {}).get("total", len(rows))
        if len(rows) >= total or not d.get("data"):
            break
        page += 1
    log(f"Report list: {len(rows)} reports across all Rota years.")
    return rows


# ── per-report fetch ─────────────────────────────────────────────────────────


def fetch_detail_html(rid, fresh):
    os.makedirs(HTML_DIR, exist_ok=True)
    path = os.path.join(HTML_DIR, f"{rid}.html")
    if not fresh and os.path.exists(path) and os.path.getsize(path) > 10_000:
        return open(path, encoding="utf-8").read()
    curl([f"{REPORT_URL}/{rid}", "-o", path, "-w", "%{http_code}"])
    if not os.path.exists(path) or os.path.getsize(path) < 10_000:
        die(f"Report {rid} did not download fully (session expired or report removed).")
    return open(path, encoding="utf-8").read()


# ── store ────────────────────────────────────────────────────────────────────


def load_store():
    if os.path.isfile(STORE_PATH):
        return json.load(open(STORE_PATH, encoding="utf-8"))
    return []


def save_store(records):
    records = sorted(records, key=lib_generate._sort_key, reverse=True)
    with open(STORE_PATH, "w", encoding="utf-8") as f:
        json.dump(records, f, indent=1, ensure_ascii=False)


# ── main ─────────────────────────────────────────────────────────────────────


def select_rows(rows, args):
    years = sorted({r.get("current_rota_year_id", "") for r in rows if r.get("current_rota_year_id")})
    if args.all:
        return rows, years
    target = args.year or (years[-1] if years else "")
    if not target:
        die("Could not determine a Rota year from the report list.")
    if args.year and target not in years:
        die(f"Rota year {target!r} not found. Available: {', '.join(years)}")
    return [r for r in rows if r.get("current_rota_year_id") == target], [target]


def regenerate():
    store = load_store()
    n = lib_generate.generate(store, PROJECTS_TS)
    log(f"Wrote {PROJECTS_TS} ({n} projects).")


def main():
    ap = argparse.ArgumentParser(description="Import RAC Metro City project reports.")
    ap.add_argument("--year", help="Rota year label to import, e.g. 2025-26 (default: newest).")
    ap.add_argument("--all", action="store_true", help="Import every Rota year on the portal.")
    ap.add_argument("--fresh", action="store_true", help="Ignore cached report HTML and re-fetch.")
    ap.add_argument("--regen-only", action="store_true",
                    help="Rebuild projects.ts from reports.json without logging in.")
    ap.add_argument("--email", help="Portal email (else env / .env.local / prompt).")
    ap.add_argument("--password", help="Portal password (else env / .env.local / prompt).")
    args = ap.parse_args()

    os.chdir(SCRIPT_DIR)  # so lib_* imports + relative cache paths resolve

    if args.regen_only:
        regenerate()
        return

    email, pw = get_credentials(args)
    login(email, pw)
    rows = fetch_list()
    selected, years = select_rows(rows, args)
    log(f"Importing Rota year(s): {', '.join(years)} -> {len(selected)} reports.\n")

    store = {r["id"]: r for r in load_store()}
    for i, row in enumerate(selected, 1):
        rid = str(row["id"])
        log(f"[{i}/{len(selected)}] {rid}  {row.get('title', '')[:60]}")
        html = fetch_detail_html(rid, args.fresh)
        record = lib_parse.parse_report(html, row)
        # Use the portal's own public image URLs directly (they live under
        # /storage/report_images/ and are served without auth), rather than
        # mirroring them into the repo.
        record["gallery"] = record.pop("image_urls", [])
        log(f"      {len(record['gallery'])} photo(s)")
        store[rid] = record

    save_store(list(store.values()))
    log(f"\nStore updated: {len(store)} reports total in reports.json.")
    regenerate()
    log("\nDone. Review the changes with `git diff`, then commit when happy.")


if __name__ == "__main__":
    main()
