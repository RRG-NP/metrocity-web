# PWA — design & implementation notes

Goal (PRD R16–R19): the site installs to a home screen and behaves like an
app — standalone window, brand splash colors, offline fallback — without
compromising the plain-web experience.

This repo runs the bundled custom **Next.js 16.2.7**; conventions below were
taken from `node_modules/next/dist/docs/` (the authoritative source — public
Next.js docs do NOT apply).

## Pieces

| Piece | Where | Convention |
|---|---|---|
| Manifest | `src/app/manifest.ts` | Metadata route returning `MetadataRoute.Manifest`; served at `/manifest.webmanifest`, linked automatically. |
| Theme color | `src/app/layout.tsx` → `export const viewport: Viewport` | `themeColor` is **not allowed in `metadata`** in this Next version. |
| iOS install metadata | `metadata.appleWebApp` (`title`, `statusBarStyle`) + `icons.apple` | Emits `mobile-web-app-capable`. |
| Icons | `public/icons/icon-192.png`, `icon-512.png`, `icon-maskable-512.png` | Generated from `public/logo.png`; maskable = logo on brand-color safe-zone canvas. |
| Service worker | `public/sw.js` (plain JS, no build step) | No framework SW support — registered manually. |
| SW registration | `src/components/pwa/ServiceWorkerManager.tsx` (`"use client"`, rendered in root layout) | `navigator.serviceWorker.register("/sw.js", { scope: "/", updateViaCache: "none" })` per the bundled docs. Registers only in production. |
| Offline fallback | `public/offline.html` | Self-contained (inline CSS/brand mark), precached by the SW. |

## Service worker strategy (`public/sw.js`)

Deliberately small and hand-written — auditable, no workbox dependency.

- **Versioned caches**: `rcmc-static-v<N>` + `rcmc-pages-v<N>`. Bump `N` on
  strategy changes; `activate` deletes caches not in the allowlist (PRD R19:
  no stale-forever traps).
- **Precache** on `install`: `/offline.html`, logo/wheel marks, manifest.
- **Fetch routing**:
  - Non-GET → network, untouched.
  - `/api/*` → **never intercepted** (contact form, Instagram refresh cron).
  - `_next/static/*`, images, fonts → **cache-first** (hashed/immutable).
  - Documents (navigations) → **network-first** with cache fallback, then
    `/offline.html` when both miss.
  - Cross-origin (Instagram CDN, portal photos) → network only; opaque
    responses are not cached (cache-quota safety).
- **Update flow**: `skipWaiting` + `clients.claim` on activate — deploys take
  over on the next navigation; acceptable for a content site (no long-lived
  in-page state to invalidate).

## Explicitly not done (and why)

- **Serwist/Workbox**: the bundled docs note Serwist is webpack-only; this
  project builds with Turbopack (Next 16 default). Hand-rolled SW avoids that
  conflict entirely.
- **Web push**: needs a persistent subscription store + VAPID keys; deferred
  to the minutes-digitization phase (`ROADMAP.md` Phase 3) where members log in.
- **Caching Next.js page HTML aggressively**: pages are network-first so
  content edits (a new tenure!) appear immediately; only true offline falls
  back to cache.

## Testing checklist

1. `npm run build && npm start` (SW registration is production-only).
2. Chrome DevTools → Application → Manifest: installable, icons render,
   maskable icon passes the safe-zone preview.
3. Application → Service Workers: activated; reload → static assets from SW.
4. Network → Offline → navigate to `/about`: cached page or offline fallback
   renders with brand styling.
5. Lighthouse PWA/installability audit passes.
6. iOS Safari: Share → Add to Home Screen → opens standalone with correct
   title/icon/status-bar style.
