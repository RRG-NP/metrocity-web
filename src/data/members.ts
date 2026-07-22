import type { CommitteeInfo, Member, PastPresident } from "@/types";
import { currentTenureId } from "@/config/club.config";

const PHOTO_BASE = "https://my.rotaract3292.org/storage/profile_images";

export const rosters: Record<string, Member[]> = {
  "2026-27": [
    {
      name: "Rtr. Rohan Raj Gautam",
      role: "President",
      photo: `${PHOTO_BASE}/rotaract-2481560641783264676.jpg`,
      rotaryYear: "2026-27",
      order: 1,
      isBoard: true,
    },
    {
      name: "Rtr. Ninamma Rai",
      role: "Vice President (Operations)",
      photo: `${PHOTO_BASE}/rotaract-8786252481691577448.jpg`,
      rotaryYear: "2026-27",
      order: 2,
      isBoard: true,
    },
    {
      name: "Rtr. Bhumika Bhandari",
      role: "Vice President (Service)",
      photo: `${PHOTO_BASE}/12829_RTR12130_Rtr_Bhumika_Bhandari_20191123073318.jpg`,
      rotaryYear: "2026-27",
      order: 3,
      isBoard: true,
    },
    {
      name: "Rtr. Samiksha Sharma",
      role: "Secretary",
      photo: `${PHOTO_BASE}/rotaract-5692823421724767010.jpg`,
      rotaryYear: "2026-27",
      order: 4,
      isBoard: true,
    },
    {
      name: "Rtr. Nirogya Prasain",
      role: "Treasurer",
      photo: `${PHOTO_BASE}/rotaract-1494917621724766329.jpg`,
      rotaryYear: "2026-27",
      order: 5,
      isBoard: true,
    },
    {
      name: "Rtr. Anusha Pandey",
      role: "Immediate Past President",
      photo: `${PHOTO_BASE}/rotaract-15479308431661700675.jpg`,
      rotaryYear: "2026-27",
      order: 6,
      isBoard: true,
    },
    {
      name: "Rtr. Hridaey Raya",
      role: "Club Administration Director / Sergeant-at-Arms",
      photo: `${PHOTO_BASE}/rotaract-4687758261783614563.jpg`,
      rotaryYear: "2026-27",
      committee: "Club Administration",
      order: 7,
      isBoard: true,
    },
    {
      name: "Rtr. Kristina Dahal",
      role: "Public Image Director",
      photo: `${PHOTO_BASE}/rotaract-15783173871755611048.jpg`,
      rotaryYear: "2026-27",
      committee: "Public Image",
      order: 8,
      isBoard: true,
    },
    {
      name: "Rtr. Prabesh Poudel",
      role: "Community Service Director",
      photo: `${PHOTO_BASE}/rotaract-18951145081755611839.jpg`,
      rotaryYear: "2026-27",
      committee: "Community Service",
      order: 9,
      isBoard: true,
    },
    {
      name: "Rtr. Avinash Sinha",
      role: "International Service Director",
      photo: `${PHOTO_BASE}/rotaract-8400519321735655913.jpg`,
      rotaryYear: "2026-27",
      committee: "International Service",
      order: 10,
      isBoard: true,
    },
    {
      name: "Rtr. Niruta Giri",
      role: "Professional Development Director",
      photo: `${PHOTO_BASE}/rotaract-14277363861725086680.jpg`,
      rotaryYear: "2026-27",
      committee: "Professional Development",
      order: 11,
      isBoard: true,
    },
    {
      name: "Rtr. Ashesha Mali",
      role: "Club Advisor",
      photo: `${PHOTO_BASE}/rotaract-10523819191784182103.jpg`,
      rotaryYear: "2026-27",
      order: 12,
      isBoard: true,
    },
    {
      name: "Rtr. Utsav Shrestha",
      role: "Club Advisor",
      photo: `${PHOTO_BASE}/rotaract-15899003651747583493.jpg`,
      rotaryYear: "2026-27",
      order: 13,
      isBoard: true,
    },
    {
      name: "Rtr. Rajan Maharjan",
      role: "Past President",
      photo: `${PHOTO_BASE}/1406690027899396481.jpg`,
      rotaryYear: "2026-27",
      order: 15,
      isBoard: true,
    },
  ],
};

/** Tenures that have a roster, newest first. */
export const rosterTenures = Object.keys(rosters).sort().reverse();

export function boardForTenure(tenureId: string): Member[] {
  return (rosters[tenureId] ?? []).filter((m) => m.isBoard);
}

/** The current tenure's board — what most of the site renders. */
export const board: Member[] = boardForTenure(currentTenureId);

export const generalMembers: Member[] = [
  {
    name: "Rtr. Uday Lamichhane",
    role: "General Member",
    photo: `${PHOTO_BASE}/rotaract-21263170211706373204.jpg`,
    rotaryYear: "2026-27",
    order: 16,
    isBoard: false,
  },
];

export const committees: CommitteeInfo[] = [
  {
    name: "Membership",
    duty: "Recruits, onboards, and retains members; runs orientation and fellowship.",
  },
  {
    name: "Community Service",
    duty: "Plans and delivers local service projects across health, education, and environment.",
  },
  {
    name: "Professional Development",
    duty: "Organises workshops, mentorship, and networking for members' careers.",
  },
  {
    name: "International Service",
    duty: "Builds partnerships and exchanges with clubs and causes beyond Nepal.",
  },
  {
    name: "Public Image",
    duty: "Tells the club's story across social media, press, and the website.",
  },
  {
    name: "Club Administration",
    duty: "Runs club operations, meetings, and records to keep everything on track.",
  },
];

/** Past Presidents honor roll (newest first). */
export const pastPresidents: PastPresident[] = [
  {
    name: "Rtr. Anusha Pandey",
    year: "2025-26",
    note: "Immediate Past President",
  },
  {
    name: "Rtr. Sweta Shrestha",
    year: "2024-25",
    note: "Past President",
  },
  {
    name: "Rtr. Ashesha Mali",
    year: "2023-24",
    note: "Past President",
  },
  {
    name: "Rtr. Sanjeep Maharjan",
    year: "2012",
    note: "Charter President",
  },
];
