/**
 * club.config.ts — the single source of truth for everything club-specific.
 *
 * This file is the "tenant definition" of the site. The long-term goal
 * (docs/ROADMAP.md) is that forking this repo for another Rotaract/Rotary club
 * means editing THIS file, the data files in `src/data/`, and the brand tokens
 * in `src/app/globals.css` — and nothing else. Components must never hardcode
 * club facts; they read them from here (usually via `src/data/siteSettings.ts`,
 * which derives its exports from this config).
 *
 * Yearly rotation: see docs/TENURE-HANDOVER.md. In short — add a new entry to
 * `tenures`, point `currentTenureId` at it, and add the new roster in
 * `src/data/members.ts`.
 */

/**
 * Rich presidential content for a tenure — theme, message, vision, and goals.
 * Optional per tenure; components must guard for `undefined` (older years have
 * none). Surfaced site-wide via `siteSettings.presidentTheme`.
 */
export interface PresidentialTheme {
  /** Full theme line, e.g. "Evolve. Empower. Execute." */
  title: string;
  /** The theme broken into words for the staggered hero reveal. */
  words: string[];
  /** Short message shown on the homepage theme section. */
  message: string;
  /** Long-form message for the About page President's Message. */
  extendedMessage: string;
  /** The president's vision statement for the year. */
  vision: string;
  /** The president's goals for the year. */
  goals: string[];
  /** The president's personal/professional site (optional). */
  presidentUrl?: string;
}

/** A Rotary year (1 July → 30 June). */
export interface TenureConfig {
  /** Canonical id used as a data key everywhere, e.g. "2026-27". */
  id: string;
  /** Display label (en dash), e.g. "2026–27". */
  label: string;
  president: string;
  /** Presidential theme line shown alongside the tenure (optional). */
  themeLine?: string;
  /** Full presidential theme, message, vision, and goals (optional). */
  theme?: PresidentialTheme;
  startDate: string; // ISO, 1 July
  endDate: string; // ISO, 30 June
}

export const tenures: TenureConfig[] = [
  {
    id: "2026-27",
    label: "2026–27",
    president: "Rtr. Rohan Raj Gautam",
    themeLine: "Evolve. Empower. Execute.",
    theme: {
      title: "Evolve. Empower. Execute.",
      words: ["Evolve", "Empower", "Execute"],
      message:
        "Our goal this year is to build a growth-driven community where we evolve as leaders, empower our members with vital life skills, and execute meaningful, sustainable service. By choosing to Evolve, Empower, and Execute, we will foster lifelong connections while creating a lasting impact.",
      extendedMessage:
        "True leadership is about building a team capable of running great projects independently. This year, the Rotaract Club of Metro City is committed to building a growth-driven community that empowers its members, delivers sustainable impact, and fosters lifelong connections. Through our core theme: Evolve. Empower. Execute. We will focus on professional development, enhancing our digital presence, and ensuring seamless leadership continuity. Our job is to set the vision, remove obstacles, and build a culture where every single member has the tools to thrive.",
      vision:
        "To build a growth-driven Rotaract community that empowers members, creates meaningful and sustainable impact, and fosters lifelong connections through service, leadership, and collaboration.",
      goals: [
        "Strengthen club identity and member engagement.",
        "Empower members through professional and life-skills development.",
        "Deliver meaningful and sustainable community impact.",
        "Enhance the club's digital presence and public image.",
        "Strengthen collaboration and partnerships.",
        "Strengthen club administration and leadership continuity.",
      ],
      presidentUrl: "https://www.rohanrajgautam.com.np/",
    },
    startDate: "2026-07-01",
    endDate: "2027-06-30",
  },
  {
    id: "2025-26",
    label: "2025–26",
    president: "Rtr. Anusha Pandey",
    startDate: "2025-07-01",
    endDate: "2026-06-30",
  },
  {
    id: "2024-25",
    label: "2024–25",
    president: "Rtr. Sweta Shrestha",
    startDate: "2024-07-01",
    endDate: "2025-06-30",
  },
  {
    id: "2023-24",
    label: "2023–24",
    president: "Rtr. Ashesha Mali",
    startDate: "2023-07-01",
    endDate: "2024-06-30",
  },
];

export const currentTenureId = "2026-27";

export const currentTenure: TenureConfig =
  tenures.find((t) => t.id === currentTenureId) ?? tenures[0];

export function getTenure(id: string): TenureConfig | undefined {
  return tenures.find((t) => t.id === id);
}

/**
 * Feature flags — sections/integrations render only when enabled.
 * A club without an Instagram token or portal import still gets a full site.
 * (Groundwork for the white-label boilerplate; see docs/ROADMAP.md Phase 2.)
 */
export const features = {
  instagramGallery: true,
  projectsPortalImport: true,
  sponsors: true,
  testimonials: true,
  pwa: true,
} as const;

/**
 * Canonical site origin — no trailing slash, so `${siteUrl}/about` never
 * doubles up. Consumed by `metadataBase`, every canonical, `sitemap.ts`,
 * `robots.ts`, `llms.txt` and the JSON-LD graph, so this is the only line to
 * touch if the domain changes again.
 *
 * `NEXT_PUBLIC_SITE_URL` overrides it at build time — set it on preview /
 * staging deploys so they canonicalise to themselves, not production.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.rotaractmetrocity.org"
).replace(/\/+$/, "");

/** Club identity — facts that do not change with the tenure. */
export const clubIdentity = {
  clubName: "Rotaract Club of Metro City",
  shortName: "RAC Metro City",
  sponsorClub: "Rotary Club of Kathmandu Metro",
  sponsorClubUrl: "https://www.rcktmmetro.org.np/",
  twinClub: "Rotaract Club of Durbarmarg",
  interactClub: "Interact Club of Adhayan School",
  zone: "Zone XII",
  district: "Rotaract District 3292",
  charterDate: "2012-05-17",
  charterDateDisplay: "17 May 2012",
  charterPresident: "Rtr. Sanjeep Maharjan",
  location: "Kathmandu, Nepal",
  motto: "Service Above Self",
  tagline: "Connect, Grow, Give",
  ageBand: "18 and older",
  email: "rcmetrocity@gmail.com",
  phone: "+977 9861828633",
  meetingType: "Morning",
  meetingDay: "Saturday",
  meetingVenue: "Kumaripati, Lalitpur",
  meetingTime: "Every Saturday, 10:00 AM",
  address: "Kumaripati, Lalitpur, Nepal",
  mapEmbedSrc:
    "https://www.google.com/maps?q=27.670449,85.3217545&z=16&output=embed",
  url: siteUrl,
  instagramHandle: "rac_metrocity",
} as const;
