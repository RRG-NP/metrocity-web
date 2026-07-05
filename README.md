# Rotaract Club of Metro City — Website

The club's **digital handbook**: an installable, animated, production-grade
site for the **Rotaract Club of Metro City** (sponsored by the Rotary Club of
Kathmandu Metro), currently serving Rotary Year **2026–27** under President
**Rtr. Rohan Raj Gautam**.

> **Service Above Self** · Connect, Grow, Give

Architected as a **tenure-aware, config-driven boilerplate**: the yearly board
rotation is a data change, and re-skinning the repo for another club is a
config change. See the docs suite:

| Doc | What it covers |
| --- | --- |
| [`docs/PRD.md`](docs/PRD.md) | Product vision, personas, requirements (R1–R22), success metrics |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Layer map, config/data contracts, rendering model, fork runbook |
| [`docs/DESIGN-SYSTEM.md`](docs/DESIGN-SYSTEM.md) | Brand tokens, type, motion contract, component inventory |
| [`docs/PWA.md`](docs/PWA.md) | Manifest, service worker strategy, icons, testing checklist |
| [`docs/TENURE-HANDOVER.md`](docs/TENURE-HANDOVER.md) | The ≤30-minute yearly rotation checklist |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | White-label boilerplate → minutes digitization → subscription product |

---

## Tech stack

| Concern          | Choice                                                     |
| ---------------- | ---------------------------------------------------------- |
| Framework        | Next.js 16 (App Router, Turbopack) · React 19 · TypeScript |
| Styling          | Tailwind CSS v4 + CSS variables (design tokens)            |
| Motion           | CSS-first entrances/reveals; Motion + GSAP as enhancement  |
| Sliders/lightbox | Swiper · yet-another-react-lightbox                        |
| Forms            | React Hook Form + Zod                                      |
| PWA              | `app/manifest.ts` + hand-written `public/sw.js`            |
| Analytics        | GA4, gated behind `NEXT_PUBLIC_GA_ID`                      |
| Deploy           | Vercel (all pages static; APIs serverless; weekly IG cron) |

> ⚠️ This repo bundles a **custom Next.js 16.2.7** whose APIs differ from
> public Next.js — read `node_modules/next/dist/docs/` before writing code
> (see `AGENTS.md`). Notable: `next/image` uses `preload` (not `priority`);
> `themeColor` lives in the `viewport` export.

## Getting started

```bash
npm install
cp .env.example .env.local   # optional env (analytics, Instagram, importer)
npm run dev                  # http://localhost:3000
```

```bash
npm run build                # production build (all pages prerendered)
npm run start                # serve production build (needed to test the PWA)
npm run lint                 # ESLint
npm run import:projects      # regenerate src/data/projects.ts from the district portal
python3 scripts/generate-icons.py   # regenerate public/icons/ from the logo
```

## Where things live

```
src/config/club.config.ts  ← identity, TENURES (president/year), feature flags
src/data/                  ← rosters (per tenure), sponsors (+tier benefits),
                             projects (generated), testimonials, site copy
src/app/globals.css        ← @theme brand tokens (single re-brand point)
src/app/                   ← routes, metadata, manifest.ts, sitemap, APIs
src/components/            ← ui / sections / sliders / forms / gallery / pwa
public/sw.js               ← service worker (docs/PWA.md)
scripts/import-projects/   ← district-portal → projects.ts pipeline
```

**The golden rule:** components never hardcode club facts. If a fact needs
changing, it lives in `club.config.ts`, `src/data/*`, or the `@theme` block.

## Content status (2026–27)

- ✅ Tenure, president, board structure, past-presidents timeline (vacant
  seats render as "To be announced" — fill via `docs/TENURE-HANDOVER.md` §2)
- ✅ Projects 2023-24 → 2025-26 imported from the district portal
- ✅ Live Instagram gallery (token in KV, weekly refresh cron)
- ⚠️ Sponsors beyond the sponsoring Rotary club are `[PLACEHOLDER]` stubs
- ⚠️ Testimonials are placeholders; home VideoSection parked until a real
  club video exists
- ⚠️ Contact/membership API is a logging stub — wire an email provider before
  campaigns

## Accessibility & motion

Semantic landmarks, skip link, focus rings, keyboard-complete controls.
Content is **never gated on JavaScript** (CSS-first entrances, observer-based
reveals), and `prefers-reduced-motion` collapses all animation to final
states. Keep both invariants when adding sections.

## Deploy

Vercel auto-detects Next.js. Set env vars from `.env.example` as needed
(`NEXT_PUBLIC_GA_ID`, `INSTAGRAM_ACCESS_TOKEN`, `CRON_SECRET`, KV creds).
`vercel.json` schedules the weekly Instagram token refresh. Update
`clubIdentity.url` in `club.config.ts` if the domain changes.
