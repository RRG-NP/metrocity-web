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
  twinClub: "Rotaract Club of Durbarmarg",
  interactClub: "Interact Club of Adhayan School",
  zone: "Zone XII",
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

  vision:
    "To inspire and unite young leaders in creating lasting change through service, personal growth, and strong local and global connections.",
  mission:
    "To develop young leaders through impactful service, professional growth, and fellowship that strengthens our community.",

  // ---- Contact ------------------------------------------------------------
  email: "rcmetrocity@gmail.com",
  phone: "+977 9861828633",
  meetingType: "Morning",
  meetingDay: "Saturday",
  meetingVenue: "Kumaripati, Lalitpur",
  meetingTime: "Every Saturday, 10:00 AM",
  address: "Kumaripati, Lalitpur, Bagmati, Nepal",

  // Google Maps embed (Kumaripati, Lalitpur).
  mapEmbedSrc:
    "https://www.google.com/maps?q=27.670449,85.3217545&z=16&output=embed",

  // ---- District / Rotary attribution --------------------------------------
  district: "Rotaract District 3292",
  riAttribution:
    "A Rotaract club sponsored by the Rotary Club of Kathmandu Metro, in affiliation with Rotary International.",

  // ---- Analytics ----------------------------------------------------------
  // GA4 measurement id is read from NEXT_PUBLIC_GA_ID at runtime; this is only
  // a documentation hint. Leave the env var unset to disable analytics.
  gaIdEnvVar: "NEXT_PUBLIC_GA_ID",

  // ---- Public site URL (for metadata / sitemap) ---------------------------
  url: "https://www.rcmetrocity.org.np",
} as const;

export const socials: SocialLink[] = [
  { label: "Facebook", href: "https://facebook.com/", icon: "facebook" },
  { label: "Instagram", href: "https://instagram.com/", icon: "instagram" },
  { label: "LinkedIn", href: "https://linkedin.com/", icon: "linkedin" },
];

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Members", href: "/members" },
  { label: "Gallery", href: "/gallery" },
  { label: "Sponsors", href: "/sponsors" },
];

/** Impact stats band. */
export const stats: Stat[] = [
  { label: "Active Members", value: 16 },
  { label: "Total Members", value: 81 },
  { label: "Events", value: 7 },
  { label: "Reports Filed", value: 238 },
];

/** The six official goals of Rotaract (shown on the About page). */
export const rotaractGoals: string[] = [
  "To develop professional and leadership skills.",
  "To emphasize respect for the rights of others, based on the recognition of the worth of each individual.",
  "To recognize the dignity and value of all useful occupations as opportunities to serve.",
  "To recognize, practice and promote ethical standards as leadership qualities and vocational responsibilities.",
  "To develop knowledge and understanding of the needs, problems and opportunities in the community and worldwide.",
  "To provide opportunities for personal and group activities to serve the community and promote international understanding and good will toward all people.",
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
