# Project report importer

This folder pulls the club's project reports from the District 3292 portal
(`my.rotaract3292.org`) and turns them into the data the website shows on the
**Projects & Events** page — text, metrics, and photos. You run it
yourself whenever new reports are added to the portal; you don't need a
developer to do it.

```
npm run import:projects
```

That one command logs in, finds the newest Rota year's reports, reads their
details, and rebuilds `src/data/projects.ts`. Then you commit the result.

Photos are **not** downloaded — the site links straight to the portal's own
public image URLs (`my.rotaract3292.org/storage/report_images/…`), so imports
stay small and fast. (Trade-off: if a photo is ever removed from the portal,
it stops showing on the site too.)

---

## One-time setup

You only do this once per computer.

1. **Install Python 3** (macOS already has it — check with `python3 --version`).

2. **Install the two Python libraries** the script needs:

   ```
   python3 -m pip install -r scripts/import-projects/requirements.txt
   ```

3. **(Optional but recommended) Save your portal login** so you never have to
   type it. Create a file named `.env.local` in the project root (next to
   `package.json`) with:

   ```
   ROTARACT_EMAIL=you@example.com
   ROTARACT_PASSWORD=your-portal-password
   ```

   `.env.local` is git-ignored, so it never gets committed or shared. If you
   skip this, the script just asks for your email and password each time (the
   password stays hidden as you type).

---

## Everyday use

Whenever new project reports show up on the portal:

```
npm run import:projects        # imports the current (newest) Rota year
```

Then review and save the changes:

```
git status                     # see what changed
git add -A
git commit -m "Update project reports"
git push
```

That's it. The website now shows the new projects.

### Other options

Add options after a `--`:

| Command | What it does |
| --- | --- |
| `npm run import:projects` | Import the **newest** Rota year (default). |
| `npm run import:projects -- --year 2024-25` | Import a specific Rota year. |
| `npm run import:projects -- --all` | Import **every** Rota year on the portal. |
| `npm run import:projects -- --fresh` | Ignore cached report pages and re-fetch them. |
| `npm run import:projects -- --regen-only` | Rebuild `projects.ts` from saved data **without** logging in. |

Imports **add to** what's already there — running it for a new year keeps the
old years too. Re-running the same year just refreshes it.

---

## What gets created / changed

- `src/data/projects.ts` — the generated data file the website reads.
  **Don't hand-edit it**; it's overwritten on every run.
- `scripts/import-projects/reports.json` — a saved copy of all imported report
  data (including each photo's portal URL). Committed so the site can be rebuilt
  without logging in again.
- `scripts/import-projects/.cache/` — temporary login cookie and downloaded
  pages. Git-ignored; safe to delete anytime.

---

## How it works (for the curious)

The pieces are intentionally small and separate:

- **`import_projects.py`** — the conductor. Logs in, lists reports, fetches each
  report page (keeping its photos as portal URLs), then saves and regenerates.
- **`lib_parse.py`** — turns one report's HTML into clean fields.
- **`lib_generate.py`** — turns the saved data into `src/data/projects.ts`.

The newest Rota year is detected automatically from the portal, so you never
have to look up a year code.

To feature different projects on the home page, edit `FEATURED_IDS` near the top
of `lib_generate.py` (use the report id numbers), then run with `--regen-only`.

---

## Security notes

- Your password is used **only** to submit the portal's own login form. It is
  never stored by the script (except your own optional `.env.local`, which stays
  on your machine and is git-ignored) and never sent anywhere else.
- If you ever shared your password in a chat or screen-share, change it on the
  portal afterward.

## Troubleshooting

- **"Login rejected" / "did not reach the dashboard"** — wrong email/password,
  or the portal is down. Try logging in through a browser to confirm.
- **`ModuleNotFoundError: bs4`** — run the `pip install` step above.
- **A photo doesn't load on the site** — it was probably removed from the portal;
  re-run the import to refresh that report's photo URLs.
- **The portal changed its layout** and parsing breaks — the field-finding logic
  lives in `lib_parse.py`; that's the place to adjust.
