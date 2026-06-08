# Rotaract Club of Metro City — Website

A polished, animated, production-grade landing site for the **Rotaract Club of
Metro City** (sponsored by the Rotary Club of Kathmandu Metro). Built with
Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.

> **Service Above Self** · Connect, Grow, Give

---

## Tech stack

| Concern            | Choice                                            |
| ------------------ | ------------------------------------------------- |
| Framework          | Next.js 16 (App Router) · React 19 · TypeScript   |
| Styling            | Tailwind CSS v4 + CSS variables (design tokens)   |
| Component motion   | [Motion](https://motion.dev) (`motion/react`)     |
| Scroll/timeline    | GSAP + ScrollTrigger (drifting backdrop)          |
| Sliders            | Swiper                                            |
| Lightbox           | yet-another-react-lightbox                        |
| Icons              | lucide-react (+ inline brand SVGs)                |
| Fonts              | `next/font` — Sora (headings), Inter (body)       |
| Forms              | React Hook Form + Zod                             |
| Analytics          | GA4, gated behind `NEXT_PUBLIC_GA_ID`             |
| Lint/format        | ESLint + Prettier                                 |
| Deploy             | Vercel (SSG where possible)                       |

---

## Getting started

```bash
npm install
cp .env.example .env.local   # optional: set NEXT_PUBLIC_GA_ID to enable analytics
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build   # production build (all pages prerendered/SSG)
npm run start   # serve the production build
npm run lint    # ESLint
npx prettier --write .   # format
```

---

## Project structure

```
src/
  app/                 # routes (App Router)
    layout.tsx         # fonts, metadata, JSON-LD, Preloader, Header, Footer, GA
    page.tsx           # Home (single-scroll landing)
    about/ projects/ members/ gallery/ sponsors/ membership/ contact/
    api/contact/route.ts   # form handler STUB (logs payload)
    sitemap.ts robots.ts
  components/
    ui/                # Button, SectionHeading, Card, Container, GradientBorder,
                       # StatCounter, Reveal, ProjectCard, MemberCard, CogWheel, Logo
    layout/            # Header, Footer, Preloader, AnimatedBackground
    sections/          # Hero, Objectives, Stats, FeaturedProjects, VideoSection,
                       # LeadershipPreview, Testimonials, SponsorsStrip, JoinCTA,
                       # PageHeader, ProjectsExplorer
    sliders/           # HeroSlider, TeamSlider, TestimonialSlider, SponsorMarquee
    gallery/           # GalleryGrid (+ lightbox), VideoLightbox
    forms/             # ContactForm, MembershipForm
  data/                # ALL CONTENT lives here (typed placeholders)
  types/               # shared interfaces
  lib/                 # gsap setup, motion variants, analytics, schemas, utils
  app/globals.css      # design tokens (Tailwind @theme) + base + animations
```

---

## ✏️ Where to edit content

**All site content is centralized in `src/data/` — components never hardcode
content, so you can swap placeholders for real data (or a CMS) without touching
the UI.**

| File                          | What it holds                                                            |
| ----------------------------- | ----------------------------------------------------------------------- |
| `src/data/siteSettings.ts`    | **Start here.** Club facts, contact info, socials, nav, impact stats, objectives, areas of focus, public URL, GA hint. |
| `src/data/projects.ts`        | Projects (by Avenue of Service) + the home-page featured set.           |
| `src/data/members.ts`         | Board, general members, committees, Past Presidents honor roll.         |
| `src/data/testimonials.ts`    | Testimonials slider.                                                     |
| `src/data/sponsors.ts`        | Sponsors/partners by tier (featured = sponsoring Rotary club).          |
| `src/data/gallery.ts`         | Gallery albums + images.                                                |
| `src/data/placeholder.ts`     | The single placeholder-image helper (`ph()`). Point it at real assets.  |

### Confirmed facts already wired in

- Club: **Rotaract Club of Metro City**
- Sponsor: **Rotary Club of Kathmandu Metro**
- Charter: **17 May 2012**, Charter President **Rtr. Sanjeep Maharjan**
- Location: **Kathmandu, Nepal** · Motto: **Service Above Self** · Ages **18–30**

Everything else is a clearly-labeled `[PLACEHOLDER]`.

### Swapping placeholder images for real photos

All stub images route through `ph()` in `src/data/placeholder.ts` (currently
[picsum.photos](https://picsum.photos)). To use local assets:

1. Drop files in `public/images/...`.
2. Replace the `ph(...)` calls in the data files with `/images/your-file.jpg`.
3. If you use a new external image host, add it to `images.remotePatterns` in
   `next.config.ts`.

### Wiring the contact / membership forms

`src/app/api/contact/route.ts` is a **stub** that validates with Zod and
`console.log`s the payload. Replace the `console.log` with your email provider
(Resend, SendGrid, Nodemailer, …) or a database write.

### Enabling analytics

Set `NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"` in `.env.local`. When unset, no analytics
script is injected.

### Video & map

- Home `VideoSection` uses a placeholder YouTube embed — set the real URL in
  `src/components/sections/VideoSection.tsx`.
- Contact map uses a generic Kathmandu embed — set `mapEmbedSrc` in
  `siteSettings.ts` to the club's exact pin.

---

## Design system

Tokens are defined in `src/app/globals.css` (`@theme`) and consumed as Tailwind
utilities (`bg-cranberry`, `text-ink`, …) and CSS variables.

| Token         | Hex       | Use                            |
| ------------- | --------- | ------------------------------ |
| `--cranberry` | `#D41B5A` | Primary accent, CTAs, links    |
| `--azure`     | `#0050A2` | Secondary brand, deep sections |
| `--gold`      | `#F7A81B` | Tertiary accent / highlights   |
| `--ink`       | `#123769` | Headings / dark text           |
| `--slate`     | `#6A6F77` | Body copy                      |
| `--cloud`     | `#F4F6FA` | Section backgrounds            |
| `--white`     | `#FFFFFF` | Base                           |

Primary gradient: `linear-gradient(90deg, cranberry, azure)` (helpers:
`.bg-gradient-primary`, `.text-gradient`). Signature asymmetric corners:
`.rounded-asym` / `.rounded-asym-sm`. Tinted shadows: `--shadow-cranberry-40/20/10`,
`--shadow-azure-40/20/10`.

---

## Accessibility & motion

- Semantic landmarks, skip-to-content link, visible focus rings, labelled
  controls, keyboard-operable nav / sliders / lightbox.
- **`prefers-reduced-motion`** is honored everywhere: the drifting backdrop,
  count-ups, preloader spin, autoplay sliders, and large entrances are disabled
  (final states render instantly) via Motion's `useReducedMotion` + CSS.

---

## Deploy to Vercel

1. Push the repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — defaults work
   (Next.js auto-detected).
3. Add env vars if needed (`NEXT_PUBLIC_GA_ID`).
4. Deploy. Pages are static/SSG; the contact API runs as a serverless function.

Update `siteSettings.url` to the production domain so metadata, Open Graph, and
the sitemap use the correct absolute URLs.
