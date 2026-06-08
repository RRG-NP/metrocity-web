import type { MetadataRoute } from "next";
import { siteSettings } from "@/data/siteSettings";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteSettings.url;
  const routes = [
    "",
    "/about",
    "/projects",
    "/members",
    "/gallery",
    "/sponsors",
    "/membership",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
