import type { MetadataRoute } from "next";
import { siteSettings } from "@/data/siteSettings";

/**
 * Per-route `lastModified`, hand-maintained.
 *
 * Deliberately NOT `new Date()` for every entry: that marks all eight pages as
 * freshly changed on every deploy, which crawlers learn to discount. Bump a
 * route's date here when its content actually changes.
 *
 * `/gallery` is the exception — it renders the live Instagram feed, so it
 * genuinely does change without a code edit.
 */
const LAST_MODIFIED: Record<string, string> = {
  "": "2026-08-05",
  "/about": "2026-08-05",
  "/projects": "2026-08-05",
  "/members": "2026-08-05",
  "/sponsors": "2026-07-01",
  "/membership": "2026-07-01",
  "/contact": "2026-07-01",
};

const ROUTES = [
  "",
  "/about",
  "/projects",
  "/members",
  "/gallery",
  "/sponsors",
  "/membership",
  "/contact",
] as const;

const PRIORITY: Record<string, number> = {
  "": 1,
  "/about": 0.9,
  "/projects": 0.9,
  "/members": 0.8,
  "/membership": 0.8,
  "/gallery": 0.7,
  "/contact": 0.6,
  "/sponsors": 0.6,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteSettings.url;

  return ROUTES.map((route) => ({
    url: `${base}${route}`,
    lastModified: LAST_MODIFIED[route]
      ? new Date(LAST_MODIFIED[route])
      : new Date(),
    changeFrequency:
      route === "/gallery" ? "weekly" : route === "" ? "monthly" : "yearly",
    priority: PRIORITY[route] ?? 0.6,
  }));
}
