import type { CommitteeInfo, Member, PastPresident } from "@/types";

const PHOTO_BASE = "https://my.rotaract3292.org/storage/profile_images";

/**
 * Roster for Rotary year 2025–26.
 * Photos are served from the District 3292 member portal.
 */
export const board: Member[] = [
  {
    name: "Rtr. Anusha Pandey",
    role: "President",
    photo: `${PHOTO_BASE}/rotaract-15479308431661700675.jpg`,
    rotaryYear: "2025-26",
    order: 1,
    isBoard: true,
  },
  {
    name: "Rtr. Rohan Raj Gautam",
    role: "Vice President",
    photo: `${PHOTO_BASE}/rotaract-16947073421689150382.jpg`,
    rotaryYear: "2025-26",
    order: 2,
    isBoard: true,
  },
  {
    name: "Rtr. Ninamma Rai",
    role: "Secretary",
    photo: `${PHOTO_BASE}/rotaract-8786252481691577448.jpg`,
    rotaryYear: "2025-26",
    order: 3,
    isBoard: true,
  },
  {
    name: "Rtr. Samiksha Sharma",
    role: "Treasurer",
    photo: `${PHOTO_BASE}/rotaract-5692823421724767010.jpg`,
    rotaryYear: "2025-26",
    order: 4,
    isBoard: true,
  },
  {
    name: "Rtr. Sweta Shrestha",
    role: "Immediate Past President",
    photo: `${PHOTO_BASE}/rotaract-12967910641598097277.jpg`,
    rotaryYear: "2025-26",
    order: 5,
    isBoard: true,
  },
  {
    name: "Rtr. Nirogya Prasain",
    role: "Club Administration Chair",
    photo: `${PHOTO_BASE}/rotaract-1494917621724766329.jpg`,
    rotaryYear: "2025-26",
    committee: "Club Administration",
    order: 6,
    isBoard: true,
  },
  {
    name: "Rtr. Avinash Sinha",
    role: "Service Project Chair",
    photo: `${PHOTO_BASE}/rotaract-8400519321735655913.jpg`,
    rotaryYear: "2025-26",
    committee: "Community Service",
    order: 7,
    isBoard: true,
  },
  {
    name: "Rtr. Hridaey Raya",
    role: "Professional Development Chair",
    photo: `${PHOTO_BASE}/rotaract-5056385641691657143.jpg`,
    rotaryYear: "2025-26",
    committee: "Professional Development",
    order: 8,
    isBoard: true,
  },
  {
    name: "Rtr. Bhumika Bhandari",
    role: "International Service Chair",
    photo: `${PHOTO_BASE}/12829_RTR12130_Rtr_Bhumika_Bhandari_20191123073318.jpg`,
    rotaryYear: "2025-26",
    committee: "International Service",
    order: 9,
    isBoard: true,
  },
  {
    name: "Rtr. Niruta Giri",
    role: "Public Image Chair",
    photo: `${PHOTO_BASE}/rotaract-14277363861725086680.jpg`,
    rotaryYear: "2025-26",
    committee: "Public Image",
    order: 10,
    isBoard: true,
  },
  {
    name: "Rtr. Utsav Shrestha",
    role: "Club Advisor",
    photo: `${PHOTO_BASE}/rotaract-15899003651747583493.jpg`,
    rotaryYear: "2025-26",
    order: 11,
    isBoard: true,
  },
  {
    name: "Rtr. Ashesha Mali",
    role: "Club Advisor",
    photo: `${PHOTO_BASE}/rotaract-19737311861689150533.jpg`,
    rotaryYear: "2025-26",
    order: 12,
    isBoard: true,
  },
  {
    name: "Rtr. Rajan Maharjan",
    role: "Young Leaders Contact",
    photo: `${PHOTO_BASE}/1406690027899396481.jpg`,
    rotaryYear: "2025-26",
    order: 13,
    isBoard: true,
  },
];

/** General members. */
export const generalMembers: Member[] = [
  {
    name: "Rtr. Uday Lamichhane",
    role: "Member",
    photo: `${PHOTO_BASE}/rotaract-21263170211706373204.jpg`,
    rotaryYear: "2025-26",
    order: 100,
    isBoard: false,
  },
  {
    name: "Rtr. Kristina Dahal",
    role: "Member",
    photo: `${PHOTO_BASE}/rotaract-15783173871755611048.jpg`,
    rotaryYear: "2025-26",
    order: 101,
    isBoard: false,
  },
  {
    name: "Rtr. Prabesh Poudel",
    role: "Member",
    photo: `${PHOTO_BASE}/rotaract-18951145081755611839.jpg`,
    rotaryYear: "2025-26",
    order: 102,
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

/** Past Presidents honor roll. */
export const pastPresidents: PastPresident[] = [
  {
    name: "Rtr. Sanjeep Maharjan",
    year: "2012",
    note: "Charter President",
  },
  {
    name: "Rtr. Sweta Shrestha",
    year: "2024-25",
    note: "Immediate Past President",
  },
];
