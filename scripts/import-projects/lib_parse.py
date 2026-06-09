"""
HTML -> normalized record parser for District 3292 club project reports.

Given the detail-page HTML of a report (from
my.rotaract3292.org/software/my-club/project-reports/<id>) plus the matching
row from the list API, produce a flat dict of the fields the site needs.

This module has no network access and no hardcoded paths, so it can be unit
tested on saved HTML. The orchestrator (import_projects.py) feeds it.
"""

import re

from bs4 import BeautifulSoup


def clean(s):
    if s is None:
        return ""
    return re.sub(r"\s+", " ", s.replace("\xa0", " ")).strip()


def _labeled(soup, label):
    """Find a <strong>label</strong> and return the text that follows it."""
    for st in soup.find_all("strong"):
        if clean(st.get_text()).rstrip(":").lower() == label.lower():
            parent = st.parent
            txt = parent.get_text()
            if ":" in txt:
                return clean(txt.split(":", 1)[1])
            return clean(txt.replace(st.get_text(), ""))
    return ""


def _section_body(soup, heading):
    """Return the body text / list under a portlet head-title matching heading."""
    for h3 in soup.select("h3.kt-portlet__head-title"):
        if clean(h3.get_text()).lower() == heading.lower():
            head = h3.find_parent(class_="kt-portlet__head")
            body = head.find_next_sibling(class_="kt-portlet__body") if head else None
            if not body:
                return None
            items = [clean(x.get_text()) for x in body.select(".kt-list-timeline__text")]
            if items:
                return [i for i in items if i and i.lower() != "none"]
            ps = [clean(p.get_text()) for p in body.find_all("p")]
            ps = [p for p in ps if p]
            return "\n\n".join(ps) if ps else clean(body.get_text())
    return None


def _widget_counts(soup):
    out = {}
    for item in soup.select(".kt-widget__bottom .kt-widget__item"):
        t = item.select_one(".kt-widget__title")
        v = item.select_one(".kt-widget__value")
        if t and v:
            out[clean(t.get_text())] = clean(v.get_text())
    return out


def extract_image_urls(html):
    """Return the absolute report-image URLs referenced in a report page."""
    soup = BeautifulSoup(html, "lxml")
    urls = []
    for img in soup.find_all("img"):
        src = img.get("src", "")
        if "report_images" in src and src not in urls:
            urls.append(src)
    return urls


def parse_report(html, list_row):
    """
    Parse one report.

    `list_row` is the dict from the list API (provides project_type, avenue,
    dates, rota year and goal codes that aren't reliably on the detail page).
    Returns a record WITHOUT the local `gallery` field -- the orchestrator
    fills that in after downloading images. `image_urls` holds the remote URLs.
    """
    soup = BeautifulSoup(html, "lxml")
    rid = str(list_row.get("id", ""))

    head = soup.select_one(".kt-widget__head h4")
    title = clean(head.get_text()) if head else ""

    def span_by_title(t):
        el = soup.find("span", attrs={"title": t})
        if not el:
            return ""
        txt = el.get_text()
        st = el.find("strong")
        if st:
            return clean(txt.replace(st.get_text(), ""))
        return clean(txt)

    ptype = span_by_title("Type") or list_row.get("project_type", "")
    avenue = _labeled(soup, "Avenue") or span_by_title("Avenue") or list_row.get("avenue", "")
    jointly = _section_body(soup, "Jointly With")

    return {
        "id": rid,
        "rota_year": list_row.get("current_rota_year_id", ""),
        "title": title or list_row.get("title", ""),
        "project_type": clean(ptype),
        "avenue": avenue,
        "category": _labeled(soup, "Project Category"),
        "venue": _labeled(soup, "Project Venue"),
        "duration": _labeled(soup, "Project Duration"),
        "volunteering_hours": _labeled(soup, "Total Volunteering Hours"),
        "expense_nrs": _labeled(soup, "Total Expense Amount (NRs.)")
        or _labeled(soup, "Total Expense Amount"),
        "benefit_note": _labeled(soup, "Project Benefit Note"),
        "counts": _widget_counts(soup),
        "objectives": _section_body(soup, "Project Objectives"),
        "details": _section_body(soup, "Project Details"),
        "jointly_with": jointly
        if isinstance(jointly, str) and jointly.lower() != "n/a"
        else (jointly or ""),
        "members_present": _section_body(soup, "List of Club Members Present") or [],
        "coordinators": _section_body(soup, "List of Project Coordinators") or [],
        "sdgs": _section_body(soup, "SDG (Sustainable Development Goals)") or [],
        "goals": _section_body(soup, "List of Goals") or [],
        "start_date": list_row.get("start_date", ""),
        "end_date": list_row.get("end_date", ""),
        "image_urls": extract_image_urls(html),
    }
