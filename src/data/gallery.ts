import type { GalleryAlbum } from "@/types";
import { ph } from "./placeholder";

/**
 * [PLACEHOLDER] gallery albums. Replace covers/images/captions with real photos.
 * Image dimensions feed the lightbox; keep width/height accurate per asset.
 */
function makeImages(seed: string, count: number, captionBase: string) {
  return Array.from({ length: count }).map((_, i) => ({
    src: ph(`${seed}-${i}`, 1200, 800),
    width: 1200,
    height: 800,
    alt: `${captionBase} — photo ${i + 1} [placeholder]`,
    caption: `${captionBase} (${i + 1})`,
  }));
}

export const albums: GalleryAlbum[] = [
  {
    title: "Winter Relief Drive",
    slug: "winter-relief-drive",
    date: "2025-12-20",
    year: "2025",
    cover: ph("g-relief", 800, 600),
    images: makeImages("g-relief", 6, "Winter Relief Drive"),
  },
  {
    title: "Clean Bagmati Campaign",
    slug: "clean-bagmati",
    date: "2025-09-06",
    year: "2025",
    cover: ph("g-river", 800, 600),
    images: makeImages("g-river", 5, "Clean Bagmati Campaign"),
  },
  {
    title: "Blood Donation Camp",
    slug: "blood-donation",
    date: "2025-07-12",
    year: "2025",
    cover: ph("g-blood", 800, 600),
    images: makeImages("g-blood", 4, "Blood Donation Camp"),
  },
  {
    title: "Charter Anniversary",
    slug: "charter-anniversary",
    date: "2024-05-17",
    year: "2024",
    cover: ph("g-charter", 800, 600),
    images: makeImages("g-charter", 6, "Charter Anniversary"),
  },
  {
    title: "Digital Literacy Workshop",
    slug: "digital-literacy",
    date: "2025-10-04",
    year: "2025",
    cover: ph("g-workshop", 800, 600),
    images: makeImages("g-workshop", 5, "Digital Literacy Workshop"),
  },
  {
    title: "Fellowship Night",
    slug: "fellowship-night",
    date: "2024-11-02",
    year: "2024",
    cover: ph("g-fellowship", 800, 600),
    images: makeImages("g-fellowship", 4, "Fellowship Night"),
  },
];

export const galleryYears = Array.from(new Set(albums.map((a) => a.year))).sort(
  (a, b) => Number(b) - Number(a),
);
