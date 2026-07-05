# PRD — RAC Metro City Web Platform, Tenure 2026/27

**Status:** Living document · **Owner:** Rtr. Rohan Raj Gautam (President, 2026–27)
**Last updated:** 2026-07-03

---

## 1. Vision

The Rotaract Club of Metro City website is not a brochure — it is the club's
**digital handbook**: the single place where members, prospects, sponsors, the
sponsoring Rotary club, and the district can see who we are, what we did, who
leads us, and how to take part.

Beyond this tenure, the same codebase becomes a **white-label boilerplate**
("Club OS") that any Rotaract/Rotary club can subscribe to, and the foundation
for future club-software tools — starting with **digitization of club minutes**
(meeting records, attendance, motions, action items).

### Product pillars

1. **Handbook, not brochure** — every page is structured club data
   (roster, projects, sponsors, history) rendered beautifully; content lives in
   typed data modules, never hardcoded in components.
2. **Tenure-aware by design** — the site "rotates" every Rotary year
   (July 1 → June 30). Changing tenure is a data change, not a redesign.
3. **App-like** — installable PWA, instant navigation, smooth motion,
   full-screen hero; feels native on a phone.
4. **Sponsor-first commercial layer** — sponsors get real visibility and a
   clear path to become one; this funds the club and later the SaaS.
5. **Boilerplate-ready architecture** — one config file + data folder defines a
   club. Fork → edit config → deploy = new club site.

## 2. Users & jobs-to-be-done

| Persona | Job |
|---|---|
| Prospective member (18+, Kathmandu) | "Is this club alive, credible, fun? How do I join?" |
| Current member | "When/where is the meeting? What projects are coming? Show my profile." |
| Board member | "Update the roster/projects/sponsors without touching components." |
| Sponsor / donor | "What visibility do I get? Who do I talk to? Proof of impact." |
| Rotary district / sponsor club | "Is this club compliant, active, well-branded?" |
| Future: other clubs (SaaS buyers) | "Can I get this for my club with my branding, cheaply?" |

## 3. Scope — tenure 2026/27 release

### 3.1 In scope

1. **Full-screen hero** — covers 100% of the viewport on every device
   (small-viewport-safe units), presidential tenure identity ("2026/27 ·
   Led by Rtr. Rohan Raj Gautam"), club motto, live facts strip, scroll cue.
   CSS-first entrance (never gated on JS), reduced-motion safe.
2. **Tenure rotation to 2026/27** — Rohan Raj Gautam as President; Anusha
   Pandey becomes Immediate Past President; roster structured per-tenure so
   history is preserved, not overwritten.
3. **Members redesign** — board grid with role hierarchy, tenure switcher
   (2026/27 default, previous years browsable), past-presidents timeline.
4. **Sponsors redesign** — tiered showcase (Patron / Partner / Supporter),
   sponsor spotlight on the landing page, "Become a Sponsor" pitch section with
   tier benefits and contact CTA.
5. **PWA** — web app manifest, icons, service worker with offline fallback,
   installable ("Add to Home Screen"), standalone display, theme color.
6. **Central club config** — `src/config/club.config.ts` as the single source
   of truth: identity, tenure, theme, links. Everything reads from it.
7. **Documentation** — this PRD, `ARCHITECTURE.md`, `DESIGN-SYSTEM.md`,
   `PWA.md`, `TENURE-HANDOVER.md` (yearly rotation runbook), `ROADMAP.md`.

### 3.2 Out of scope (this release, tracked in ROADMAP.md)

- Minutes digitization tool (meeting records, attendance, motions).
- Multi-tenant hosting / billing for the subscription product.
- CMS/admin UI (data stays in typed TS modules + import scripts).
- Member authentication / portal.
- Payments for membership dues or sponsorship.

## 4. Detailed requirements

### 4.1 Hero (landing)

- **R1** Hero section height = exactly one viewport on all devices; use
  `100svh`-class sizing so mobile URL bars never cause overflow/underflow,
  with `100dvh` progressive enhancement.
- **R2** Content scales fluidly (`clamp()` typography); no fixed breakpoint
  jumps; safe-area insets respected (notched phones).
- **R3** Communicates within 3 seconds: who (club), where (Kathmandu), what
  (service club), now (2026/27 tenure + president), do (Join / Projects CTAs).
- **R4** Entrance animation is CSS-driven and works with JS disabled;
  `prefers-reduced-motion` collapses to final state; preloader coordination
  preserved.
- **R5** A scroll indicator invites continuation; hero never traps scroll.
- **R6** LCP element is text or a priority image; LCP < 2.5s on 4G mid-tier
  Android.

### 4.2 Tenure model

- **R7** `club.config.ts` exports `currentTenure` (e.g. `"2026-27"`) and
  `tenures` metadata (president, theme accent, dates).
- **R8** Roster data is keyed by tenure; the members page renders the current
  tenure by default and can render past tenures without code changes.
- **R9** Yearly handover = edit config + add new roster entries; documented as
  a ≤30 minute runbook (`TENURE-HANDOVER.md`).

### 4.3 Sponsors

- **R10** Tier semantics: Patron (top, large logo, link, blurb), Partner
  (medium logo, link), Supporter (name/logo strip).
- **R11** Landing page shows a sponsor strip; the sponsors page carries the
  full tiered showcase + benefits table + "Become a Sponsor" CTA (mailto /
  contact form prefill).
- **R12** Sponsors are per-tenure (a sponsorship is for a Rotary year), with a
  `since` field for long-running patrons.

### 4.4 Members

- **R13** Board cards: photo, name, role, committee; hierarchy order (President
  → VP → Secretary → Treasurer → IPP → chairs → advisors).
- **R14** Past presidents honor roll as a timeline (charter 2012 → present).
- **R15** Photos keep coming from the district portal CDN; broken images fall
  back to branded initials avatar (never a broken-image glyph).

### 4.5 PWA

- **R16** Installable: valid manifest (name, icons 192/512 + maskable,
  standalone display, theme/background color, start_url `/`).
- **R17** Service worker: offline fallback page, cache-first for static assets,
  network-first for pages; never caches API routes (`/api/*`).
- **R18** iOS support: apple-touch-icon, status-bar style, splash-safe colors.
- **R19** No stale-forever traps: SW versioned per deploy, old caches purged on
  activate.

### 4.6 Boilerplate architecture

- **R20** No component may hardcode club-specific facts (name, year, president,
  city, socials, colors) — all from `club.config.ts` / `src/data/*`.
- **R21** Theme colors are CSS variables set from config-declared brand colors;
  re-skinning a fork = edit one token block.
- **R22** `ARCHITECTURE.md` documents the fork-and-configure flow end to end.

## 5. Non-functional requirements

- **Performance:** Lighthouse ≥ 90 perf / ≥ 95 a11y / ≥ 95 best-practices /
  100 SEO on the landing page (mobile, throttled).
- **Accessibility:** WCAG 2.1 AA — focus states, contrast, alt text, reduced
  motion, skip link (already present), keyboard-complete navigation.
- **SEO:** per-page metadata, JSON-LD (NGO), sitemap/robots kept current,
  OG images.
- **Resilience:** all content visible with JS disabled; external image
  failures degrade gracefully.
- **Maintainability:** a non-developer board member can follow
  `TENURE-HANDOVER.md`; TypeScript strict; data validated by types.

## 6. Success metrics (tenure 2026/27)

| Metric | Target |
|---|---|
| Membership form submissions | ≥ 5/month |
| Sponsor inquiries via site | ≥ 1/quarter |
| PWA installs | ≥ 30 (members + friends) |
| Lighthouse mobile perf (landing) | ≥ 90 |
| Tenure handover effort (2027/28) | ≤ 30 min, no code changes beyond data |

## 7. Future roadmap (summary — see ROADMAP.md)

1. **Phase 2 — Club OS foundations:** extract `club.config.ts` + data layer
   into a template repo; second club pilot deployment.
2. **Phase 3 — Minutes digitization:** meeting minutes, attendance, motions,
   action items; member auth; export to district-report format.
3. **Phase 4 — Subscription product:** multi-tenant hosting, admin UI, billing;
   pricing tiers per club size.
