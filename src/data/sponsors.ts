import type { Sponsor, SponsorTierBenefits } from "@/types";

/**
 * Sponsors for the current tenure (a sponsorship runs one Rotary year;
 * long-running patrons carry a `since` year).
 *
 * TODO(sponsors 2026-27): entries marked [PLACEHOLDER] are layout stubs —
 * replace with confirmed sponsors + real logos (drop files in /public/sponsors/)
 * as agreements are signed. Delete unfilled stubs before campaigns.
 */
export const sponsors: Sponsor[] = [
  {
    name: "Rotary Club of Kathmandu Metro",
    logo: "/wheel.png",
    tier: "Patron",
    url: "https://www.rcktmmetro.org.np/",
    featured: true,
    since: "2012-13",
    blurb:
      "Our sponsoring Rotary club — mentoring, guiding, and backing Metro City Rotaractors since our charter in 2012.",
  },
  {
    name: "Patron Sponsor [PLACEHOLDER]",
    logo: "/wheel.png",
    tier: "Patron",
    url: "https://example.com",
    blurb: "Your organisation, front and centre on every campaign we run.",
  },
  {
    name: "Partner Brand A [PLACEHOLDER]",
    logo: "/logo.png",
    tier: "Partner",
    url: "https://example.com",
  },
  {
    name: "Partner Brand B [PLACEHOLDER]",
    logo: "/logo.png",
    tier: "Partner",
    url: "https://example.com",
  },
  {
    name: "Supporter One [PLACEHOLDER]",
    logo: "/rrg.png",
    tier: "Supporter",
  },
  {
    name: "Supporter Two [PLACEHOLDER]",
    logo: "/rrg.png",
    tier: "Supporter",
  },
];

export const sponsorTiers = ["Patron", "Partner", "Supporter"] as const;

export function sponsorsByTier(tier: Sponsor["tier"]): Sponsor[] {
  return sponsors.filter((s) => s.tier === tier);
}

/**
 * What each tier gets — rendered on the Sponsors page pitch section.
 * Contributions are indicative; the board confirms figures each tenure.
 */
export const sponsorTierBenefits: SponsorTierBenefits[] = [
  {
    tier: "Patron",
    contribution: "NPR 50,000+ / year",
    benefits: [
      "Logo + profile on the website home page and every project banner",
      "Named partner on one flagship project of the year",
      "Social media features across all club campaigns",
      "Speaking slot at the club's installation & annual events",
    ],
  },
  {
    tier: "Partner",
    contribution: "NPR 20,000+ / year",
    benefits: [
      "Logo on the website sponsors showcase",
      "Branding at supported project venues",
      "Social media mentions on supported projects",
    ],
  },
  {
    tier: "Supporter",
    contribution: "In-kind or NPR 5,000+ / year",
    benefits: [
      "Name/logo in the website supporters strip",
      "Acknowledgement in project reports",
    ],
  },
];
