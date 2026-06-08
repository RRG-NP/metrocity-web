import type { CommitteeInfo, Member, PastPresident } from "@/types";
import { ph } from "./placeholder";

/**
 * [PLACEHOLDER] roster for Rotary year 2025–26.
 * Replace names, roles, photos, and LinkedIn URLs with the real board & members.
 * The only confirmed name is the Charter President (see pastPresidents).
 */
export const board: Member[] = [
  {
    name: "Rtr. Aayush Shrestha", // [PLACEHOLDER]
    role: "President",
    photo: ph("pres", 600, 600),
    rotaryYear: "2025-26",
    order: 1,
    isBoard: true,
    linkedin: "https://linkedin.com/",
  },
  {
    name: "Rtr. Priya Tamang", // [PLACEHOLDER]
    role: "Vice President",
    photo: ph("vp", 600, 600),
    rotaryYear: "2025-26",
    order: 2,
    isBoard: true,
    linkedin: "https://linkedin.com/",
  },
  {
    name: "Rtr. Bibek Karki", // [PLACEHOLDER]
    role: "Secretary",
    photo: ph("sec", 600, 600),
    rotaryYear: "2025-26",
    order: 3,
    isBoard: true,
    linkedin: "https://linkedin.com/",
  },
  {
    name: "Rtr. Sneha Maharjan", // [PLACEHOLDER]
    role: "Treasurer",
    photo: ph("treas", 600, 600),
    rotaryYear: "2025-26",
    order: 4,
    isBoard: true,
    linkedin: "https://linkedin.com/",
  },
  {
    name: "Rtr. Nabin Gurung", // [PLACEHOLDER]
    role: "Sergeant-at-Arms",
    photo: ph("saa", 600, 600),
    rotaryYear: "2025-26",
    order: 5,
    isBoard: true,
  },
  {
    name: "Rtr. Anjali Rai", // [PLACEHOLDER]
    role: "Director — Community Service",
    photo: ph("dir1", 600, 600),
    rotaryYear: "2025-26",
    committee: "Community Service",
    order: 6,
    isBoard: true,
  },
  {
    name: "Rtr. Sujan Thapa", // [PLACEHOLDER]
    role: "Director — Professional Development",
    photo: ph("dir2", 600, 600),
    rotaryYear: "2025-26",
    committee: "Professional Development",
    order: 7,
    isBoard: true,
  },
  {
    name: "Rtr. Mina Lama", // [PLACEHOLDER]
    role: "Director — Public Image",
    photo: ph("dir3", 600, 600),
    rotaryYear: "2025-26",
    committee: "Public Image",
    order: 8,
    isBoard: true,
  },
];

/** A few general members for the photo grid. [PLACEHOLDER] */
export const generalMembers: Member[] = Array.from({ length: 8 }).map(
  (_, i) => ({
    name: `Rtr. Member ${i + 1}`, // [PLACEHOLDER]
    role: "Member",
    photo: ph(`gm${i}`, 500, 500),
    rotaryYear: "2025-26",
    order: 100 + i,
    isBoard: false,
  }),
);

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
];

/** Past Presidents honor roll — starts with the confirmed Charter President. */
export const pastPresidents: PastPresident[] = [
  {
    name: "Rtr. Sanjeep Maharjan",
    year: "2012",
    note: "Charter President",
  },
  { name: "Rtr. Past President 2013–14", year: "2013-14" }, // [PLACEHOLDER]
  { name: "Rtr. Past President 2014–15", year: "2014-15" }, // [PLACEHOLDER]
  { name: "Rtr. Past President 2015–16", year: "2015-16" }, // [PLACEHOLDER]
  { name: "Rtr. Past President 2016–17", year: "2016-17" }, // [PLACEHOLDER]
  { name: "Rtr. Past President 2017–18", year: "2017-18" }, // [PLACEHOLDER]
];
