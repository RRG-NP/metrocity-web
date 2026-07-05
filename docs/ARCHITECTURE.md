# Architecture — the club-site boilerplate

How this codebase is structured so that (a) yearly tenure rotation is a data
change, and (b) forking it for another club is a config change. Read
`PRD.md` for the why; this is the how.

## The golden rule

**Components never hardcode club facts.** Name, city, tenure, president,
socials, colors, meeting times — all flow from two roots:

```
src/config/club.config.ts   ← identity, tenures, feature flags   (the "tenant")
src/data/*.ts               ← content: rosters, sponsors, projects, testimonials
src/app/globals.css @theme  ← brand tokens (colors, fonts, shadows)
```

If a change request requires editing a component to change a fact, that is an
architecture bug — fix it by moving the fact into config/data.

## Layer map

```
┌─ src/app/            routes, metadata, manifest, sitemap/robots, API routes
│    └── globals.css   Tailwind 4 @theme design tokens (single brand block)
├─ src/components/
│    ├── layout/       Header, Footer, Preloader, AnimatedBackground
│    ├── sections/     page sections (Hero, BoardRoster, SponsorsStrip, …)
│    ├── sliders/      swiper/marquee client components
│    ├── ui/           primitives (Button, MemberCard, SectionHeading, …)
│    ├── forms/        react-hook-form + zod forms
│    ├── gallery/      Instagram feed + lightbox
│    └── pwa/          ServiceWorkerManager (registers /sw.js)
├─ src/config/         club.config.ts — THE tenant definition
├─ src/data/           typed content modules (see "Data layer")
├─ src/lib/            instagram API, analytics, gsap/motion setup, zod schemas
├─ src/types/          content contracts shared by data + components
├─ public/sw.js        hand-written service worker (docs/PWA.md)
└─ scripts/            import-projects: district-portal → projects.ts pipeline
```

## Config layer (`src/config/club.config.ts`)

- `clubIdentity` — tenure-independent facts (name, charter, contact, URLs).
- `tenures[]` + `currentTenureId` — the Rotary-year registry. Each entry:
  `{ id, label, president, themeLine?, startDate, endDate }`.
- `features` — flags for optional integrations (Instagram gallery, portal
  import, sponsors, testimonials, PWA). Groundwork for white-labeling: clubs
  without a given integration disable the flag, section disappears.

`src/data/siteSettings.ts` derives the flat `siteSettings` object components
consume (spread of `clubIdentity` + fields derived from the current tenure:
`tenureId`, `rotaractYear`, `president`, `presidentThemeLine`). Existing
component imports never changed — that's deliberate: the config refactor was
invisible to the UI layer.

## Data layer (`src/data/`)

| Module | Shape | Notes |
|---|---|---|
| `members.ts` | `rosters: Record<tenureId, Member[]>` + `boardForTenure()` + `board` (current) | Past tenures are history — never overwritten. `photo: ""` renders an initials avatar; `name: "To be announced"` renders a vacancy card. |
| `sponsors.ts` | `sponsors`, `sponsorTiers`, `sponsorTierBenefits` | Per-tenure; `since` marks long-running patrons. `[PLACEHOLDER]` entries are layout stubs. |
| `projects.ts` | generated — `npm run import:projects` | Never hand-edit; the importer scrapes the District 3292 portal (`scripts/import-projects/`). Tenure-keyed via `project.tenure`. |
| `testimonials.ts` | placeholder quotes | swap when real quotes collected |
| `siteSettings.ts` | derived from config + page copy (stats, goals, focus areas) | |

`src/types/index.ts` is the contract between data and UI. A future CMS or the
Phase-4 admin UI replaces the data modules behind the same types.

## Rendering model

- Every page is a **static, server-rendered** React Server Component
  (`next build` output: all `○`), except the two API routes. Client components
  are leaves only: sliders, forms, lightboxes, `BoardRoster` tabs, SW
  registration, scroll-reveal wrappers.
- Animation is **CSS-first with JS enhancement** (`.rise-in`, `.reveal` +
  IntersectionObserver): content is never gated on JavaScript, and
  `prefers-reduced-motion` collapses everything to final states. Keep this
  invariant when adding sections.
- The tenure switcher (`BoardRoster`) is a client component over local data —
  no fetch, no dynamic rendering, the members page stays static.

### A note on this repo's Next.js

The bundled Next 16.2.7 differs from public Next.js (see `AGENTS.md`); its
authoritative docs are `node_modules/next/dist/docs/`. Deviations that already
bit or will bite:

- `next/image`: `priority` is deprecated → use `preload` (done everywhere).
- `themeColor`/`viewport` must be the `viewport` export, not `metadata`.
- `params`/`searchParams`/`cookies()`/`headers()` are async-only.
- `images.domains` removed → `remotePatterns` (already used).
- Deliberately **not** enabled: `cacheComponents` / `unstable_instant`
  (instant-navigation validation). All pages are already fully static, so the
  win is marginal today; revisit when dynamic per-member/minutes pages appear.
  If slow client-side navigation is ever the complaint, the fix per the
  bundled docs is `cacheComponents: true` + `export const unstable_instant =
  { prefetch: 'static' }` per route — not Suspense alone.

## PWA

See `docs/PWA.md`. Summary: `src/app/manifest.ts` (manifest route),
generated icons in `public/icons/`, hand-written `public/sw.js`
(cache-first statics, network-first pages, `/api/*` untouched, versioned
caches), registered by `components/pwa/ServiceWorkerManager` in production
only, offline fallback `public/offline.html`.

## External integrations

- **Instagram gallery** — Graph API; long-lived token stored in Vercel
  KV/Upstash, refreshed weekly by `vercel.json` cron →
  `/api/instagram/refresh` (guarded by `CRON_SECRET`). Feed cached 1h via
  fetch tag `instagram-feed`.
- **District portal import** — `scripts/import-projects/` logs into
  my.rotaract3292.org, scrapes project reports, regenerates
  `src/data/projects.ts`. Member photos hotlink to the portal CDN
  (`remotePatterns` allows it; MemberCard falls back to initials if empty).
- **Contact/membership forms** — POST `/api/contact`, zod-validated, emailed
  to the club inbox via Gmail SMTP (`src/lib/email.ts`, Nodemailer + an App
  Password - see `.env.example`). Falls back to server-log-only when
  `GMAIL_USER`/`GMAIL_APP_PASSWORD` are unset, so local dev never needs real
  credentials. Each notification's reply-to is set to the submitter's email
  so the board can reply directly from Gmail.

## Fork-a-club runbook (Phase 2 preview)

1. Fork repo; `npm i`.
2. Edit `src/config/club.config.ts` (identity + first tenure + flags).
3. Replace brand tokens in `globals.css` `@theme` + logos in `public/`
   (`logo.png`, `logo-white.png`, `wheel*.png`); regenerate `public/icons/`
   (script in docs/PWA.md).
4. Replace `src/data/` content (members, sponsors, testimonials); run the
   projects importer if the club is on District 3292's portal, else disable
   the flag.
5. Set env vars (`.env.example`) and deploy to Vercel.

Anything beyond these five steps that a fork requires = template bug → fix
upstream here.

## Yearly rotation

See `docs/TENURE-HANDOVER.md` — the ≤30-minute checklist proven by the
2025-26 → 2026-27 rotation in this repo's history.
