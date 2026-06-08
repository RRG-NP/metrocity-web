/**
 * Shared content types for the Rotaract Club of Metro City site.
 * All page content is modeled here and populated from `src/data/*`.
 * Swapping placeholders -> real content (or a CMS) requires no UI changes.
 */

export type Avenue =
  | "Club Service"
  | "Community Service"
  | "Professional Development Service"
  | "International Service";

export type ProjectStatus = "Completed" | "Upcoming" | "Ongoing";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  title: string;
  slug: string;
  avenue: Avenue;
  status: ProjectStatus;
  /** ISO date string, e.g. "2025-08-14" */
  date: string;
  location: string;
  cover: string;
  gallery: string[];
  excerpt: string;
  body: string;
  metrics: ProjectMetric[];
  partners: string[];
}

export type Committee =
  | "Membership"
  | "Community Service"
  | "Professional Development"
  | "International Service"
  | "Public Image"
  | "Club Administration";

export interface Member {
  name: string;
  role: string;
  photo: string;
  /** e.g. "2025-26" */
  rotaryYear: string;
  committee?: Committee;
  /** sort order within a list */
  order: number;
  linkedin?: string;
  isBoard: boolean;
}

export interface PastPresident {
  name: string;
  year: string;
  note?: string;
}

export interface CommitteeInfo {
  name: Committee;
  duty: string;
}

export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
}

export interface GalleryAlbum {
  title: string;
  slug: string;
  /** ISO date string */
  date: string;
  year: string;
  cover: string;
  images: GalleryImage[];
}

export type SponsorTier = "Patron" | "Partner" | "Supporter";

export interface Sponsor {
  name: string;
  logo: string;
  tier: SponsorTier;
  url?: string;
  featured?: boolean;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  photo: string;
}

export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  /** lucide icon name handled in the component */
  icon: "facebook" | "instagram" | "linkedin" | "twitter" | "youtube";
}
