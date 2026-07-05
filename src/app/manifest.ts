import type { MetadataRoute } from "next";
import { siteSettings } from "@/data/siteSettings";

/**
 * PWA web app manifest (served at /manifest.webmanifest, linked automatically
 * by Next). Icons are generated from the club logo — see docs/PWA.md.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteSettings.clubName,
    short_name: siteSettings.shortName,
    description: siteSettings.valueProp,
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#de1675",
    categories: ["social", "lifestyle", "education"],
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
