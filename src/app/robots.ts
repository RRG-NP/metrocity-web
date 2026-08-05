import type { MetadataRoute } from "next";
import { siteSettings } from "@/data/siteSettings";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // API routes are transactional (contact form, Instagram token refresh)
      // and have nothing to index.
      disallow: ["/api/"],
    },
    sitemap: `${siteSettings.url}/sitemap.xml`,
    // Names the preferred host during the move off rcmetrocity.org.np.
    host: siteSettings.url,
  };
}
