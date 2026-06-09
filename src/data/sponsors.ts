import type { Sponsor } from "@/types";

export const sponsors: Sponsor[] = [
  {
    name: "Rotary Club of Kathmandu Metro",
    logo: '/wheel.png',
    tier: "Patron",
    url: "https://www.rotary.org/",
    featured: true,
  },
  {
    name: "Patron Sponsor One",
    logo: '/wheel.png',
    tier: "Patron",
    url: "https://example.com",
  },
  {
    name: "Partner Brand A",
    logo: '/logo.png',
    tier: "Partner",
    url: "https://example.com",
  },
  {
    name: "Partner Brand B",
    logo: '/logo.png',
    tier: "Partner",
    url: "https://example.com",
  },
  {
    name: "Supporter One",
    logo: '/rrg.png',
    tier: "Supporter",
  },
  {
    name: "Supporter Two",
    logo: '/rrg.png',
    tier: "Supporter",
  },
  {
    name: "Supporter Three",
    logo: '/rrg.png',
    tier: "Supporter",
  },
];

export const sponsorTiers = ["Patron", "Partner", "Supporter"] as const;

export function sponsorsByTier(tier: Sponsor["tier"]): Sponsor[] {
  return sponsors.filter((s) => s.tier === tier);
}
