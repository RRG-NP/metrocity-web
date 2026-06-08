/**
 * Shared content types for the Rotaract Club of Metro City site.
 * All page content is modeled here and populated from `src/data/*`.
 * Swapping placeholders -> real content (or a CMS) requires no UI changes.
 */

/**
 * Rotaract Avenues of Service, as recorded in the District 3292 club portal.
 * Each project report is filed under exactly one avenue.
 */
export type Avenue =
  | "Club Administration"
  | "Service Project"
  | "International Service"
  | "Public Image"
  | "Finance"
  | "The Rotary Foundation"
  | "Membership Development";

/** How the club took part in the project. Primary filter on the Projects page. */
export type ProjectType = "Hosted" | "Collaborated" | "Participated";

export type ProjectStatus = "Completed" | "Upcoming" | "Ongoing";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  /** Source report id from the club portal (stable, unique). */
  id: string;
  title: string;
  slug: string;
  avenue: Avenue;
  projectType: ProjectType;
  status: ProjectStatus;
  /** ISO date string, e.g. "2025-08-14" (project start). */
  date: string;
  /** ISO date string of the project end, when it differs from the start. */
  endDate?: string;
  location: string;
  /** Portal "Project Category", e.g. "Health Camp", "Installation". */
  category?: string;
  cover: string;
  gallery: string[];
  excerpt: string;
  body: string;
  /** The project's stated objectives, when recorded. */
  objectives?: string;
  metrics: ProjectMetric[];
  /** Clubs/partners the project was run jointly with. */
  partners: string[];
  /** Club annual goals this project contributed to. */
  goals?: string[];
  /** Members who coordinated the project. */
  coordinators?: string[];
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
