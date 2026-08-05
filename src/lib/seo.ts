import type { Metadata } from "next";
import { siteUrl } from "@/config/club.config";
import { siteSettings } from "@/data/siteSettings";

/**
 * seo.ts — page-level metadata + structured-data helpers.
 *
 * Every route should build its `metadata` export through `pageMetadata()` so
 * that the self-referencing canonical, the page-scoped Open Graph block and the
 * Twitter card stay in lockstep. Site-wide defaults (metadataBase, title
 * template, OG/Twitter images, verification) live in `src/app/layout.tsx` and
 * are inherited — this helper only supplies what varies per page.
 */

/** Absolute URL for a site-relative path. `"/"` collapses to the bare origin. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const clean = path === "/" ? "" : `/${path.replace(/^\/+/, "")}`;
  return `${siteUrl}${clean}`;
}

type PageMetadataInput = {
  /** Site-relative path, e.g. "/projects". Used for the canonical + OG url. */
  path: string;
  /** Page title, fed through the root `%s · RAC Metro City` template. */
  title: string;
  /** Meta description. Aim for ~150-160 characters. */
  description: string;
  /** Open Graph type — "profile" for people-centric pages, else "website". */
  ogType?: "website" | "profile" | "article";
};

/**
 * Build a page's `Metadata` with a self-referencing canonical and matching
 * OG/Twitter text. Images are intentionally omitted so the generated card from
 * `app/opengraph-image.tsx` is inherited by every route.
 */
export function pageMetadata({
  path,
  title,
  description,
  ogType = "website",
}: PageMetadataInput): Metadata {
  const fullTitle = `${title} · ${siteSettings.clubName}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: ogType,
      url: absoluteUrl(path),
      siteName: siteSettings.clubName,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/** Stable JSON-LD node ids, shared between the root graph and page-level nodes. */
export const schemaIds = {
  organization: `${siteUrl}/#organization`,
  website: `${siteUrl}/#website`,
  president: `${siteUrl}/#president`,
} as const;

/**
 * A BreadcrumbList rooted at Home. Google renders this as the URL breadcrumb in
 * search results instead of the raw path.
 */
export function breadcrumbSchema(
  trail: Array<{ name: string; path: string }>,
): Record<string, unknown> {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
