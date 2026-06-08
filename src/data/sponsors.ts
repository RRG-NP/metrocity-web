import type { Sponsor } from "@/types";
import { ph } from "./placeholder";

/**
 * Sponsors & partners. The sponsoring Rotary club is a confirmed fact and is
 * featured prominently; all others are [PLACEHOLDER].
 */
export const sponsors: Sponsor[] = [
  {
    name: "Rotary Club of Kathmandu Metro",
    logo: ph("sponsor-rotary", 400, 200),
    tier: "Patron",
    url: "https://www.rotary.org/",
    featured: true,
  },
  {
    name: "Patron Sponsor One", // [PLACEHOLDER]
    logo: ph("sponsor-p1", 400, 200),
    tier: "Patron",
    url: "https://example.com",
  },
  {
    name: "Partner Brand A", // [PLACEHOLDER]
    logo: ph("sponsor-a", 400, 200),
    tier: "Partner",
    url: "https://example.com",
  },
  {
    name: "Partner Brand B", // [PLACEHOLDER]
    logo: ph("sponsor-b", 400, 200),
    tier: "Partner",
    url: "https://example.com",
  },
  {
    name: "Partner Brand C", // [PLACEHOLDER]
    logo: ph("sponsor-c", 400, 200),
    tier: "Partner",
  },
  {
    name: "Supporter One", // [PLACEHOLDER]
    logo: ph("sponsor-s1", 400, 200),
    tier: "Supporter",
  },
  {
    name: "Supporter Two", // [PLACEHOLDER]
    logo: ph("sponsor-s2", 400, 200),
    tier: "Supporter",
  },
  {
    name: "Supporter Three", // [PLACEHOLDER]
    logo: ph("sponsor-s3", 400, 200),
    tier: "Supporter",
  },
  {
    name: "Supporter Four", // [PLACEHOLDER]
    logo: ph("sponsor-s4", 400, 200),
    tier: "Supporter",
  },
];

export const sponsorTiers = ["Patron", "Partner", "Supporter"] as const;

export function sponsorsByTier(tier: Sponsor["tier"]): Sponsor[] {
  return sponsors.filter((s) => s.tier === tier);
}
