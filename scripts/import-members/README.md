# Roster sync

This folder checks the club's member list on the District 3292 portal
(`my.rotaract3292.org`) against the roster the website shows, and tells you what
has changed.

```
npm run import:members
```

It logs in, reads the club's member list, and prints a short report: who is new
on the portal, who has left, and who is no longer enabled. For anyone new it
also prints a ready-made block of code you can paste straight into
`src/data/members.ts`.

## Why it doesn't just rewrite the roster for you

`src/data/members.ts` is hand-maintained on purpose, and the portal doesn't hold
enough to rebuild it:

- The site uses **better titles** than the portal does. The portal says "Vice
  President" for two different people; the site says "Vice President
  (Operations)" and "Vice President (Service)".
- The site decides **who counts as board** and **what order** everyone appears
  in. The portal has no idea about either.
- A few people have **their own photo** on the site rather than the portal's.

An automatic overwrite would throw all of that away every time it ran. So this
script does the tedious part - noticing what changed - and leaves the judgement
calls to you.

## One-time setup

Same as the project importer, and if you've already done that, you're done:
`ROTARACT_EMAIL` and `ROTARACT_PASSWORD` in a `.env.local` file at the project
root (git-ignored). Without it, the script asks for your login each time.

## Everyday use

```
npm run import:members                 # log in, refresh the snapshot, show the report
npm run import:members -- --offline    # re-show the report, no login needed
```

When it lists someone new, paste the printed block into `generalMembers` in
`src/data/members.ts`. If that person is actually on the board, move them into
the `rosters` list for the current year instead and give them their real title.

Then commit as usual:

```
git add -A
git commit -m "Add new members"
git push
```

## What gets created / changed

- `scripts/import-members/members.json` - the saved snapshot of the portal
  roster. Committed, so `--offline` works and so changes between runs are
  visible in `git diff`.
- `scripts/import-members/.cache/` - login cookie and the raw API response.
  Git-ignored; safe to delete anytime.
- `src/data/members.ts` - **never touched by this script.** You edit it.

## A note on privacy

The portal's member API also returns each member's **email address, phone
number, and blood group**. `members.json` is committed to the repository, so the
script deliberately drops those three fields and keeps only what the website
itself displays - name, member id, designation, status, and photo URL. If you
ever need the contact details for club admin, read them from the portal
directly; don't add them here.

## Troubleshooting

- **"Login rejected"** - wrong email/password, or the portal is down. Try
  logging in through a browser to confirm.
- **Someone shows up as both "new" and "left"** - their name is spelt
  differently in the two places (a missing "Rtr.", a middle name). Match the
  spelling in `members.ts` to the portal and the pair disappears.
- **"Member API did not return JSON"** - the saved login cookie expired; just
  run it again.
