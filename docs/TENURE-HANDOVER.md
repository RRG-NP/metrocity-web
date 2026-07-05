# Tenure handover runbook

Run this every year around 1 July when the new board is installed.
Target: ≤ 30 minutes, data-only changes (if you need to touch a component,
stop — that's an architecture bug; see `ARCHITECTURE.md`).

Worked example: the 2025-26 → 2026-27 rotation (this repo's git history,
July 2026).

## 1. Register the new tenure — `src/config/club.config.ts`

- [ ] Add a new entry at the TOP of `tenures`:
      `{ id: "2027-28", label: "2027–28", president: "Rtr. …",
         themeLine: "…", startDate: "2027-07-01", endDate: "2028-06-30" }`
- [ ] Point `currentTenureId` at it.

That alone rotates: the hero badge and president line, page headers, the
members page default, sponsors-page year references, metadata.

## 2. New roster — `src/data/members.ts`

- [ ] Add a `"2027-28": [ … ]` key to `rosters` (copy the previous year's
      block as a starting template). Do NOT edit past years.
- [ ] Confirmed seats get real names + portal photo URLs
      (`https://my.rotaract3292.org/storage/profile_images/…`).
- [ ] Unfilled seats: `name: "To be announced"`, `photo: ""` (renders a
      tasteful vacancy card). Members without a photo yet: real name +
      `photo: ""` (renders branded initials).
- [ ] Add the outgoing president to `pastPresidents` (top of list, note
      "Immediate Past President"); demote the previous IPP note to
      "Past President".
- [ ] Update `generalMembers` `rotaryYear` and membership changes.

## 3. Sponsors — `src/data/sponsors.ts`

- [ ] Sponsorships are per-Rotary-year: remove lapsed sponsors, add renewals
      and new ones (logo files → `public/sponsors/`).
- [ ] Review `sponsorTierBenefits` contributions with the new board.

## 4. Content freshness

- [ ] `src/data/siteSettings.ts` → `stats` (member counts, years of service,
      reports filed).
- [ ] Run `npm run import:projects` so the new year's tenure tab appears on
      /projects (needs `ROTARACT_EMAIL`/`ROTARACT_PASSWORD` in `.env.local`).
- [ ] Swap `src/data/testimonials.ts` quotes if fresher ones exist.

## 5. Verify & ship

- [ ] `npm run build` — must be clean, all pages static.
- [ ] Spot-check: `/` hero shows new year + president; `/members` defaults to
      the new board with the year switcher listing the old one; `/sponsors`
      shows the new year; past-presidents timeline includes the outgoing
      president.
- [ ] Commit, PR, deploy. Done.

## Notes

- The en-dash matters in `label` ("2027–28"); the plain-hyphen `id`
  ("2027-28") is the data key used by rosters and the projects importer.
- Never delete a tenure or roster — the site is the club's handbook; history
  is a feature.
