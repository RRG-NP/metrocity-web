/*
 * Service worker for rcmetrocity.org.np — hand-written, no build step.
 * Strategy (docs/PWA.md):
 *   - static assets (hashed /_next/static, images, fonts): cache-first
 *   - page navigations: network-first, cache fallback, then /offline.html
 *   - /api/* and cross-origin: never intercepted
 * Bump VERSION whenever the caching strategy or precache list changes;
 * activate() drops every cache that isn't in the current allowlist.
 */

const VERSION = "v1";
const STATIC_CACHE = `rcmc-static-${VERSION}`;
const PAGE_CACHE = `rcmc-pages-${VERSION}`;
const OFFLINE_URL = "/offline.html";

const PRECACHE = [
  OFFLINE_URL,
  "/logo.png",
  "/wheel.png",
  "/wheel-white.png",
  "/icons/icon-192.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  const keep = [STATIC_CACHE, PAGE_CACHE];
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => !keep.includes(k)).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

const STATIC_DESTINATIONS = ["style", "script", "font", "image"];

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // cross-origin: browser handles it
  if (url.pathname.startsWith("/api/")) return; // APIs are never cached

  // Page navigations: fresh when online, cached page or offline fallback otherwise.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches
            .open(PAGE_CACHE)
            .then((cache) => cache.put(request, copy))
            .catch(() => {});
          return response;
        })
        .catch(() =>
          caches
            .match(request)
            .then((cached) => cached || caches.match(OFFLINE_URL)),
        ),
    );
    return;
  }

  // Static assets: cache-first (Next fingerprints /_next/static, so stale is impossible).
  const isStatic =
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/_next/image") ||
    url.pathname.startsWith("/icons/") ||
    STATIC_DESTINATIONS.includes(request.destination);

  if (isStatic) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((response) => {
            if (response.ok) {
              const copy = response.clone();
              caches
                .open(STATIC_CACHE)
                .then((cache) => cache.put(request, copy))
                .catch(() => {});
            }
            return response;
          }),
      ),
    );
  }
});
