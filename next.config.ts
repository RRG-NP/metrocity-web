import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?:www\\.)?rcmetrocity\\.org\\.np" }],
        destination: "https://www.rotaractmetrocity.org/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    // Placeholder images are served from picsum.photos.
    // Replace these patterns when wiring real assets / a CMS.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
      {
        protocol: "https",
        hostname: "my.rotaract3292.org",
      },
      // Instagram media is served from these CDNs (the Graph API returns
      // signed URLs on *.cdninstagram.com / *.fbcdn.net). Required for the
      // live Instagram gallery feed - see src/lib/instagram.ts.
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "**.fbcdn.net",
      },
    ],
  },
};

export default nextConfig;
