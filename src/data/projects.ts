import type { Project } from "@/types";
import { ph } from "./placeholder";

/**
 * [PLACEHOLDER] projects spread across the four Avenues of Service.
 * Replace titles/dates/metrics/images with real project records.
 */
export const projects: Project[] = [
  {
    title: "Project Sahayog — Winter Relief Drive",
    slug: "winter-relief-drive",
    avenue: "Community Service",
    status: "Completed",
    date: "2025-12-20",
    location: "Sindhupalchok, Nepal",
    cover: ph("relief", 800, 600),
    gallery: [ph("relief1", 800, 600), ph("relief2", 800, 600)],
    excerpt:
      "Distributed warm blankets, clothing, and essentials to families through a harsh mountain winter.",
    body: "Working with local ward offices, the club mobilised volunteers and donors to deliver winter kits to remote households. The drive combined fundraising, logistics, and on-ground distribution across two days.",
    metrics: [
      { label: "Families reached", value: "320" },
      { label: "Volunteers", value: "40" },
      { label: "Kits delivered", value: "320" },
    ],
    partners: ["Rotary Club of Kathmandu Metro", "Local Ward Office"],
  },
  {
    title: "Clean Bagmati Campaign",
    slug: "clean-bagmati-campaign",
    avenue: "Community Service",
    status: "Ongoing",
    date: "2025-09-06",
    location: "Bagmati Riverbank, Kathmandu",
    cover: ph("river", 800, 600),
    gallery: [ph("river1", 800, 600), ph("river2", 800, 600)],
    excerpt:
      "A recurring river clean-up and awareness initiative restoring the sacred Bagmati.",
    body: "Monthly clean-up mornings paired with school awareness sessions on waste segregation and river ecology. Volunteers, local clubs, and students join hands each cycle.",
    metrics: [
      { label: "Cleanups held", value: "8" },
      { label: "Waste collected", value: "5.2 tonnes" },
      { label: "Students engaged", value: "600+" },
    ],
    partners: ["Rotary Club of Kathmandu Metro", "Green Kathmandu"],
  },
  {
    title: "Blood Donation Camp",
    slug: "blood-donation-camp",
    avenue: "Community Service",
    status: "Completed",
    date: "2025-07-12",
    location: "Kupondole, Lalitpur",
    cover: ph("blood", 800, 600),
    gallery: [ph("blood1", 800, 600), ph("blood2", 800, 600)],
    excerpt:
      "An annual blood drive in partnership with the Nepal Red Cross Society.",
    body: "The camp combined donor recruitment, health screening, and post-donation care, addressing seasonal shortages at city blood banks.",
    metrics: [
      { label: "Units collected", value: "180" },
      { label: "First-time donors", value: "70" },
    ],
    partners: ["Nepal Red Cross Society"],
  },
  {
    title: "Skill-Up: Digital Literacy Workshop",
    slug: "digital-literacy-workshop",
    avenue: "Professional Development Service",
    status: "Completed",
    date: "2025-10-04",
    location: "Community Hall, Kathmandu",
    cover: ph("workshop", 800, 600),
    gallery: [ph("workshop1", 800, 600), ph("workshop2", 800, 600)],
    excerpt:
      "Free digital and employability training for young job-seekers and students.",
    body: "A weekend workshop series covering productivity tools, online safety, resume building, and interview skills — led by member professionals and guest mentors.",
    metrics: [
      { label: "Participants", value: "85" },
      { label: "Sessions", value: "6" },
    ],
    partners: ["Local College", "Industry Mentors"],
  },
  {
    title: "Young Leaders Bootcamp",
    slug: "young-leaders-bootcamp",
    avenue: "Professional Development Service",
    status: "Upcoming",
    date: "2026-08-22",
    location: "Kathmandu",
    cover: ph("leaders", 800, 600),
    gallery: [ph("leaders1", 800, 600)],
    excerpt:
      "An intensive leadership and public-speaking bootcamp for members and aspirants.",
    body: "A two-day immersive program with sessions on team leadership, project management, and communication, culminating in a mini-grant pitch.",
    metrics: [{ label: "Seats", value: "60" }],
    partners: ["Rotary Club of Kathmandu Metro"],
  },
  {
    title: "Fellowship & Club Assembly",
    slug: "club-assembly-fellowship",
    avenue: "Club Service",
    status: "Ongoing",
    date: "2025-08-14",
    location: "Hotel Himalaya, Lalitpur",
    cover: ph("fellowship", 800, 600),
    gallery: [ph("fellowship1", 800, 600)],
    excerpt:
      "Regular assemblies and fellowship nights that keep the club connected and energised.",
    body: "Member orientation, committee planning, and social fellowship that strengthen bonds and keep projects on track throughout the Rotary year.",
    metrics: [
      { label: "Meetings / year", value: "24" },
      { label: "Avg. attendance", value: "85%" },
    ],
    partners: [],
  },
  {
    title: "Global Friendship Exchange",
    slug: "global-friendship-exchange",
    avenue: "International Service",
    status: "Upcoming",
    date: "2026-11-10",
    location: "Kathmandu & Partner Club",
    cover: ph("global", 800, 600),
    gallery: [ph("global1", 800, 600)],
    excerpt:
      "A cultural and service exchange with a partner Rotaract club abroad.",
    body: "Joint virtual sessions and a planned in-person exchange to share service ideas, culture, and a collaborative international project.",
    metrics: [{ label: "Partner clubs", value: "2" }],
    partners: ["Partner Rotaract Club [PLACEHOLDER]"],
  },
  {
    title: "Books Beyond Borders",
    slug: "books-beyond-borders",
    avenue: "International Service",
    status: "Completed",
    date: "2025-06-01",
    location: "Rural School, Nepal",
    cover: ph("books", 800, 600),
    gallery: [ph("books1", 800, 600), ph("books2", 800, 600)],
    excerpt:
      "An international book and supplies donation building a library for a rural school.",
    body: "In collaboration with an overseas partner club, the project shipped and curated books, then set up a functioning library with trained student librarians.",
    metrics: [
      { label: "Books donated", value: "2,400" },
      { label: "Students served", value: "300" },
    ],
    partners: ["Partner Rotaract Club [PLACEHOLDER]"],
  },
];

export const projectAvenues = [
  "Club Service",
  "Community Service",
  "Professional Development Service",
  "International Service",
] as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** A small set highlighted on the home page. */
export const featuredProjects: Project[] = [
  projects[0],
  projects[1],
  projects[3],
  projects[7],
];
