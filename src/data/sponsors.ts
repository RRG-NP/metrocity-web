import type { Sponsor } from "@/types";

export const sponsors: Sponsor[] = [
  {
    name: "Rotary Club of Kathmandu Metro",
    logo: '/logo.png',
    tier: "Patron",
    url: "https://www.rotary.org/",
    featured: true,
  },
  {
    name: "Patron Sponsor One",
    logo: '/logo.png',
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
    name: "Partner Brand C",
    logo: '/logo.png',
    tier: "Partner",
  },
  {
    name: "Supporter One",
    logo: '/logo.png',
    tier: "Supporter",
  },
  {
    name: "Supporter Two",
    logo: '/logo.png',
    tier: "Supporter",
  },
  {
    name: "Supporter Three",
    logo: '/logo.png',
    tier: "Supporter",
  },
  {
    name: "Supporter Four",
    logo: '/logo.png',
    tier: "Supporter",
  },
];

export const sponsorTiers = ["Patron", "Partner", "Supporter"] as const;

export function sponsorsByTier(tier: Sponsor["tier"]): Sponsor[] {
  return sponsors.filter((s) => s.tier === tier);
}
