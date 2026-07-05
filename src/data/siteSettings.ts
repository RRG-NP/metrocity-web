import type { NavLink, SocialLink, Stat } from "@/types";
import {
  clubIdentity,
  currentTenure,
  currentTenureId,
} from "@/config/club.config";

/**
 * Global club facts and settings.
 *
 * Identity + tenure now live in `src/config/club.config.ts` (single source of
 * truth — edit THERE, not here). This module derives the flat `siteSettings`
 * shape the components consume, and keeps page-copy style content (stats,
 * goals, objectives) that is data rather than configuration.
 */
export const siteSettings = {
  ...clubIdentity,

  // ---- Derived from the active tenure (club.config.ts) ---------------------
  /** Canonical tenure id, e.g. "2026-27" — used as a data key. */
  tenureId: currentTenureId,
  /** Display label, e.g. "2026–27". */
  rotaractYear: currentTenure.label,
  president: currentTenure.president,
  presidentThemeLine: currentTenure.themeLine,

  valueProp:
    "A community of young changemakers in Kathmandu turning compassion into action - through service, fellowship, and leadership.",

  vision:
    "To inspire and unite young leaders in creating lasting change through service, personal growth, and strong local and global connections.",
  mission:
    "To develop young leaders through impactful service, professional growth, and fellowship that strengthens our community.",

  riAttribution:
    "A Rotaract club sponsored by the Rotary Club of Kathmandu Metro, in affiliation with Rotary International.",

  // ---- Analytics ----------------------------------------------------------
  // GA4 measurement id is read from NEXT_PUBLIC_GA_ID at runtime; this is only
  // a documentation hint. Leave the env var unset to disable analytics.
  gaIdEnvVar: "NEXT_PUBLIC_GA_ID",
} as const;

export const socials: SocialLink[] = [
  { label: "Facebook", href: "https://www.facebook.com/RotaractClubOfMetroCity/", icon: "facebook" },
  { label: "Instagram", href: "https://www.instagram.com/rac_metrocity/", icon: "instagram" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
];

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Members", href: "/members" },
  { label: "Gallery", href: "/gallery" },
  // { label: "Sponsors", href: "/sponsors" },
];

/** Impact stats band. */
export const stats: Stat[] = [
  { label: "Active Members", value: 16 },
  { label: "Total Members", value: 81 },
  { label: "Years of Service", value: 14 },
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
