"use client";

import { useEffect } from "react";

/**
 * Registers the PWA service worker (public/sw.js) — see docs/PWA.md.
 * Production-only: in dev a stale SW would mask hot reloads.
 * `updateViaCache: "none"` makes the browser revalidate sw.js on every
 * check, so new deploys are picked up promptly.
 */
export function ServiceWorkerManager() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker
      .register("/sw.js", { scope: "/", updateViaCache: "none" })
      .catch((err) => {
        console.warn("[pwa] service worker registration failed", err);
      });
  }, []);

  return null;
}
