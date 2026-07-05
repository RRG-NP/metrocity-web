# Design system

Single source of visual truth: the `@theme` block in `src/app/globals.css`
(Tailwind v4 — tokens ARE the theme; there is no tailwind.config).
Re-branding a fork = replacing that block + the logo files.

## Brand tokens

Derived from the club logo (fuchsia flame / brown red / black):

| Token | Value | Use |
|---|---|---|
| `--color-cranberry` | `#DE1675` | primary accent, CTAs, links, focus rings |
| `--color-azure` | `#902D2C` | secondary/deep sections (name is historical — it's brown-red) |
| `--color-gold` | `#FF8FBE` | tertiary highlight (hero title gradient) |
| `--color-ink` | `#190A10` | headings, dark surfaces |
| `--color-slate` | `#6C5C62` | body copy |
| `--color-cloud` | `#FCF2F7` | tinted section backgrounds |
| tints | `cranberry-50/100/600`, `azure-50/100/600` | subtle fills / hovers |

Gradients: `--gradient-primary` (90°) and `-135` (135°), exposed as
`.bg-gradient-primary`, `.bg-gradient-primary-135`, `.text-gradient`.
Shadows: brand-tinted (`--shadow-cranberry-40/20/10`, `--shadow-azure-*`,
`--shadow-soft`) — used via `shadow-[var(--shadow-…)]`.

## Type

- Display: **Sora** (`--font-display`) — headings, stat numbers, names.
- Body: **Inter** (`--font-sans`).
- Fluid sizes use `clamp()` (see Hero) — no breakpoint jumps.
- `.eyebrow` utility: small caps-tracking label above headings.

## Signature shapes & motion

- `.rounded-asym` / `.rounded-asym-sm` — 3-of-4 rounded corners; the visual
  signature on cards and feature blocks.
- Entrance: `.rise-in` (CSS keyframes, staggered via `animation-delay`);
  scroll reveals: `.reveal` / `.reveal-stagger` + IntersectionObserver
  (`components/ui/Reveal.tsx`). Content is visible by default — JS only
  *enhances*. Keep that invariant.
- Preloader (once per session) pauses `.rise-in`/`.scroll-cue` via
  `html.preloading` until it lifts.
- `prefers-reduced-motion: reduce` collapses ALL animation globally — never
  add an animation outside this contract.

## Hero (full-viewport pattern)

`min-h-svh` + `supports-[min-height:100dvh]:min-h-dvh` on the section;
content column `flex-1` centered; facts strip + scroll cue pinned to the
bottom edge with `env(safe-area-inset-*)` padding (works with
`viewport-fit: cover` set in the layout's `viewport` export). Vertical
rhythm inside the hero uses `clamp(…, Xvh, …)` margins so it breathes on
tall screens and compresses on short ones (landscape phones).

## Components inventory

Primitives (`src/components/ui/`): Button (gradient/outline/ghost ×
sm/md/lg; renders Link / anchor / button — handles `mailto:`),
SectionHeading, Container (max-w-7xl), MemberCard (photo | initials |
vacancy states, president crown), ProjectCard, SmartImage (skeleton +
fade-in), StatCounter (count-up), Reveal/RevealGroup/RevealItem, Logo,
SocialIcons.

Sections: Hero, Objectives, Stats, FeaturedProjects, LeadershipPreview,
BoardRoster (tenure tabs), Testimonials, SponsorsStrip, JoinCTA, PageHeader,
ProjectsExplorer, VideoSection (parked until a real video exists).

## Accessibility bar

WCAG 2.1 AA: focus-visible rings (cranberry), skip link, semantic headings,
`role=tablist` on the tenure switcher, alt text on all informative images
(decorative images `alt=""`), reduced-motion, no color-only meaning.
