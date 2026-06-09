"""
Persistent store (reports.json) -> src/data/projects.ts generator.

Reads the merged list of normalized records (each with a local `gallery`) and
emits the TypeScript data module the site imports. Pure transform: no network.
"""

import datetime
import json
import re

# Curated homepage highlights. Any id still present is kept in this order;
# empty / missing slots are back-filled with the newest projects that have
# images, so the homepage never breaks after a future import.
FEATURED_IDS = ["54426", "54086", "55363", "55345"]

# Avenues shown as filter labels on the Projects page, in display order.
PROJECT_AVENUES = [
    "Club Administration",
    "Service Project",
    "International Service",
    "Public Image",
    "Finance",
    "The Rotary Foundation",
]


def _dpart(s):
    return s.split(" ")[0] if s else ""


def _sort_key(r):
    """Newest first, with id as a deterministic tie-breaker for same-date items."""
    rid = re.sub(r"\D", "", str(r.get("id", "")))
    return (_dpart(r.get("start_date", "")), int(rid) if rid else 0)


def _status_for(start, end, today):
    try:
        sd = datetime.date.fromisoformat(_dpart(start))
        ed = datetime.date.fromisoformat(_dpart(end)) if end else sd
    except Exception:
        return "Completed"
    if ed < today:
        return "Completed"
    if sd > today:
        return "Upcoming"
    return "Ongoing"


def _slugify(s, rid):
    base = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
    base = re.sub(r"-+", "-", base)[:60].strip("-")
    return f"{base}-{rid}"


def _clean_goal(g):
    g = re.sub(r"\b(IN PROGRESS|COMPLETED|NOT STARTED|YET TO START|ON HOLD)\b.*$", "", g, flags=re.I)
    return re.sub(r"\s+", " ", g).strip(" -")


def _truncate(s, n=185):
    s = re.sub(r"\s+", " ", s).strip()
    if len(s) <= n:
        return s
    cut = s[:n].rsplit(" ", 1)[0].rstrip(",.;:")
    return cut + "…"


def _to_int(s):
    m = re.search(r"\d+", s or "")
    return int(m.group()) if m else 0


def _metrics_for(r):
    out = []
    c = r.get("counts", {})
    att = _to_int(c.get("Rotaractors", "0")) + _to_int(c.get("Rotarians", "0")) + _to_int(
        c.get("Other Visitors", "0")
    )
    if att > 0:
        out.append(("Attendees", str(att)))
    vh = _to_int(r.get("volunteering_hours"))
    if vh > 0:
        out.append(("Volunteer hrs", str(vh)))
    exp = (r.get("expense_nrs") or "").strip()
    if exp and exp.upper() != "N/A" and _to_int(exp) > 0:
        out.append(("Budget", f"NRs {_to_int(exp):,}"))
    mp = len(r.get("members_present", []))
    if mp > 0:
        out.append(("Members", str(mp)))
    return out[:4]


def _partners_for(r):
    jw = r.get("jointly_with")
    if isinstance(jw, list):
        return [x for x in jw if x and x.strip().upper() != "N/A"]
    if isinstance(jw, str) and jw.strip() and jw.strip().upper() != "N/A":
        return [jw.strip()]
    return []


def _js(v):
    return json.dumps(v, ensure_ascii=False)


def _resolve_featured(reports_sorted):
    by_id = {r["id"]: r for r in reports_sorted}
    chosen, seen = [], set()
    for fid in FEATURED_IDS:
        if fid in by_id and fid not in seen:
            chosen.append(fid)
            seen.add(fid)
    if len(chosen) < 4:
        for r in reports_sorted:  # already newest-first
            if len(chosen) >= 4:
                break
            if r["id"] not in seen and r.get("gallery"):
                chosen.append(r["id"])
                seen.add(r["id"])
    return chosen[:4]


def generate(reports, out_path, today=None):
    """Write projects.ts from `reports`. Returns the number of projects written."""
    today = today or datetime.date.today()
    reports_sorted = sorted(reports, key=_sort_key, reverse=True)
    needs_ph = any(not r.get("gallery") for r in reports_sorted)

    blocks = []
    for r in reports_sorted:
        rid = r["id"]
        imgs = r.get("gallery", [])
        benefit = (r.get("benefit_note") or "").strip()
        objectives = (r.get("objectives") or "").strip()
        details = (r.get("details") or "").strip()
        excerpt = benefit or objectives or details
        body = details or objectives or benefit
        goals = [g for g in (_clean_goal(g) for g in r.get("goals", [])) if g]
        metrics = _metrics_for(r)
        partners = _partners_for(r)
        coords = [c for c in r.get("coordinators", []) if c and c.strip().upper() != "N/A"]

        lines = ["  {"]
        lines.append(f"    id: {_js(rid)},")
        lines.append(f"    title: {_js(r['title'])},")
        lines.append(f"    slug: {_js(_slugify(r['title'], rid))},")
        lines.append(f"    avenue: {_js(r['avenue'])},")
        lines.append(f"    projectType: {_js(r['project_type'])},")
        lines.append(f"    status: {_js(_status_for(r.get('start_date'), r.get('end_date'), today))},")
        lines.append(f"    date: {_js(_dpart(r.get('start_date')))},")
        if _dpart(r.get("end_date")) and _dpart(r.get("end_date")) != _dpart(r.get("start_date")):
            lines.append(f"    endDate: {_js(_dpart(r['end_date']))},")
        lines.append(f"    location: {_js(r.get('venue') or 'Kathmandu, Nepal')},")
        if r.get("category"):
            lines.append(f"    category: {_js(r['category'])},")
        if imgs:
            lines.append(f"    cover: {_js(imgs[0])},")
        else:
            lines.append(f"    cover: ph({_js(r['title'])}, 800, 600),")
        lines.append(f"    gallery: {_js(imgs)},")
        lines.append(f"    excerpt: {_js(_truncate(excerpt))},")
        lines.append(f"    body: {_js(body)},")
        if objectives:
            lines.append(f"    objectives: {_js(objectives)},")
        if metrics:
            m = ", ".join("{ label: %s, value: %s }" % (_js(l), _js(v)) for l, v in metrics)
            lines.append(f"    metrics: [{m}],")
        else:
            lines.append("    metrics: [],")
        lines.append(f"    partners: {_js(partners)},")
        if goals:
            lines.append(f"    goals: {_js(goals)},")
        if coords:
            lines.append(f"    coordinators: {_js(coords)},")
        lines.append("  },")
        blocks.append("\n".join(lines))

    featured = _resolve_featured(reports_sorted)

    ph_import = 'import { ph } from "./placeholder";\n' if needs_ph else ""
    avenues = "\n".join(f'  "{a}",' for a in PROJECT_AVENUES)
    featured_list = ", ".join(f'projects.find((p) => p.id === {_js(i)})!' for i in featured)

    out = f'''import type {{ Project }} from "@/types";
{ph_import}
/**
 * Real project reports for RAC Metro City.
 * Imported from the District 3292 club portal (my.rotaract3292.org).
 * Photos live under /public/images/projects/<reportId>/.
 *
 * GENERATED FILE - do not edit by hand. To refresh, run:
 *   npm run import:projects
 * (see scripts/import-projects/README.md)
 */
export const projects: Project[] = [
{chr(10).join(blocks)}
];

/** Avenues present in the current project set (for filter tabs / labels). */
export const projectAvenues = [
{avenues}
] as const;

/** Project participation types - the primary filter on the Projects page. */
export const projectTypes = ["Hosted", "Collaborated", "Participated"] as const;

export function getProject(slug: string): Project | undefined {{
  return projects.find((p) => p.slug === slug);
}}

/** A small curated set highlighted on the home page. */
export const featuredProjects: Project[] = [{featured_list}];
'''

    # Repo convention (commit 28cc710): em/en dashes are written as hyphens.
    out = out.replace("—", "-").replace("–", "-")

    with open(out_path, "w", encoding="utf-8") as f:
        f.write(out)
    return len(reports_sorted)
