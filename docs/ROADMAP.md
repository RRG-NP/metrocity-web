# Roadmap — from club website to Club OS

The 2026/27 site is deliberately architected as the seed of a subscription
product for Rotaract/Rotary clubs. This roadmap records the intended path so
future contributors (human or AI) extend rather than rewrite.

## Phase 1 — Tenure 2026/27 site (this repo, now)

- Full-screen presidential hero, tenure-aware data model, sponsors showcase,
  members redesign, PWA. See `PRD.md`.
- Everything club-specific flows from `src/config/club.config.ts` + `src/data/*`.
- Exit criteria: R1–R22 in the PRD shipped; `TENURE-HANDOVER.md` proven by a
  dry run.

## Phase 2 — White-label boilerplate

Goal: a second club deploys this codebase without touching components.

- Extract to a template repo (`club-os-template`); this site becomes the first
  consumer.
- Everything brandable lives in two places only:
  1. `src/config/club.config.ts` — identity, tenure, socials, features flags.
  2. `src/app/theme.css` (or the `@theme` block) — brand tokens generated from
     config-declared colors.
- Feature flags in config: `gallery.instagram`, `projects.portalImport`,
  `sponsors`, `testimonials` — sections render only when enabled, so clubs
  without an Instagram token or portal access still get a complete site.
- Data contract stays in `src/types/index.ts`; import scripts
  (`scripts/import-projects`) become per-district adapters.
- Pricing thought experiment (validate later): setup fee + ~NPR 500–1000/mo
  per club, hosting included (Vercel free tier covers most clubs).

## Phase 3 — Minutes digitization (first SaaS tool)

The "handbook" becomes writable. New surface: `/minutes` (auth-gated).

- Data model: `Meeting { date, type (weekly/board/AGM), attendees[], agenda[],
  motions[] { text, movedBy, secondedBy, result }, actionItems[] { owner, due,
  status }, minutesText }`.
- Workflow: Secretary drafts → President approves → published to members;
  export to the district reporting format (the same portal
  `scripts/import-projects` already scrapes — reuse its session/auth learnings).
- Requires: member auth (start with email magic links), a real database
  (start with Vercel KV/Postgres — KV is already wired for the Instagram
  token), role-based access (President/Secretary/Member).
- Attendance rollups feed the site's stats band automatically.

## Phase 4 — Subscription product

- Multi-tenant: one deployment, many clubs (subdomain per club) — or
  one-repo-per-club managed by a provisioning script; decide based on Phase 2
  friction.
- Admin UI replaces hand-editing data files (the typed data layer becomes the
  API contract).
- Billing (Stripe or eSewa/Khalti for Nepal), plan gating via the existing
  feature flags.

## Sequencing principles

1. Never break the yearly tenure rotation — it is the product's heartbeat.
2. Prefer config/data changes over component changes; if a club need requires
   editing a component, that's a template bug.
3. Each phase must leave the plain "club website" fully functional without the
   later phases.
