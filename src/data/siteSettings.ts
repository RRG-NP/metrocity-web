import type { NavLink, SocialLink, Stat } from "@/types";

/**
 * Global club facts and settings.
 *
 * CONFIRMED FACTS are real. Everything tagged [PLACEHOLDER] is a realistic
 * stub — edit this file first when dropping in real content.
 */
export const siteSettings = {
  // ---- Confirmed facts -----------------------------------------------------
  clubName: "Rotaract Club of Metro City",
  shortName: "RAC Metro City",
  sponsorClub: "Rotary Club of Kathmandu Metro",
  charterDate: "2012-05-17",
  charterDateDisplay: "17 May 2012",
  charterPresident: "Rtr. Sanjeep Maharjan",
  location: "Kathmandu, Nepal",
  motto: "Service Above Self",
  tagline: "Connect, Grow, Give",
  ageBand: "18–30",
  rotaractYear: "2025–26",

  valueProp:
    "A community of young changemakers in Kathmandu turning compassion into action — through service, fellowship, and leadership.",

  // ---- Contact [PLACEHOLDER] ----------------------------------------------
  email: "hello@rcmetrocity.org.np", // [PLACEHOLDER]
  phone: "+977 1 4XXXXXX", // [PLACEHOLDER]
  meetingVenue: "Hotel Himalaya, Kupondole, Lalitpur", // [PLACEHOLDER]
  meetingTime: "Every 2nd & 4th Thursday, 5:30 PM", // [PLACEHOLDER]
  address: "Kupondole, Kathmandu, Bagmati 44600, Nepal", // [PLACEHOLDER]

  // Google Maps embed (Kathmandu) — replace with the club's exact pin.
  mapEmbedSrc: "https://www.google.com/maps?q=Kathmandu,Nepal&output=embed", // [PLACEHOLDER]

  // ---- District / Rotary attribution --------------------------------------
  district: "Rotaract District 3292", // [PLACEHOLDER district number]
  riAttribution:
    "A Rotaract club sponsored by the Rotary Club of Kathmandu Metro, in affiliation with Rotary International.",

  // ---- Analytics ----------------------------------------------------------
  // GA4 measurement id is read from NEXT_PUBLIC_GA_ID at runtime; this is only
  // a documentation hint. Leave the env var unset to disable analytics.
  gaIdEnvVar: "NEXT_PUBLIC_GA_ID",

  // ---- Public site URL (for metadata / sitemap) ---------------------------
  url: "https://www.rcmetrocity.org.np", // [PLACEHOLDER]
} as const;

export const socials: SocialLink[] = [
  { label: "Facebook", href: "https://facebook.com/", icon: "facebook" }, // [PLACEHOLDER]
  { label: "Instagram", href: "https://instagram.com/", icon: "instagram" }, // [PLACEHOLDER]
  { label: "LinkedIn", href: "https://linkedin.com/", icon: "linkedin" }, // [PLACEHOLDER]
];

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Members", href: "/members" },
  { label: "Gallery", href: "/gallery" },
  { label: "Sponsors", href: "/sponsors" },
];

/** Impact stats band — all [PLACEHOLDER] numbers. */
export const stats: Stat[] = [
  { label: "Projects Completed", value: 120, suffix: "+" }, // [PLACEHOLDER]
  { label: "Active Members", value: 48 }, // [PLACEHOLDER]
  { label: "Volunteer Hours", value: 9500, suffix: "+" }, // [PLACEHOLDER]
  { label: "Lives Impacted", value: 25000, suffix: "+" }, // [PLACEHOLDER]
];

/** Rotary's 7 areas of focus (used on the About page). */
export const areasOfFocus: { title: string; description: string }[] = [
  {
    title: "Basic Education & Literacy",
    description:
      "Mentoring, scholarships, and reading programs that open doors for young learners.",
  },
  {
    title: "Water & Sanitation",
    description:
      "Clean water access and hygiene awareness for under-served communities.",
  },
  {
    title: "Disease Prevention",
    description:
      "Health camps, blood drives, and awareness campaigns that save lives.",
  },
  {
    title: "Community Economic Development",
    description:
      "Skill-building and entrepreneurship support for sustainable livelihoods.",
  },
  {
    title: "Environment",
    description:
      "Tree plantation, clean-ups, and climate-action drives for a greener Kathmandu.",
  },
  {
    title: "Peace & Conflict Resolution",
    description:
      "Dialogue, inclusion, and youth-leadership initiatives that build understanding.",
  },
];

export const objectives: {
  title: string;
  description: string;
  icon: "leadership" | "service" | "growth";
}[] = [
  {
    title: "Leadership Development",
    description:
      "Hands-on roles, training, and district events that grow confident, capable young leaders.",
    icon: "leadership",
  },
  {
    title: "Community Service",
    description:
      "Sustained, high-impact projects across health, education, and the environment.",
    icon: "service",
  },
  {
    title: "Professional Growth",
    description:
      "Networking, workshops, and mentorship that connect ambition with opportunity.",
    icon: "growth",
  },
];
