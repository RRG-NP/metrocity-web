"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import { ImageIcon } from "lucide-react";
import { albums, galleryYears } from "@/data/gallery";
import { cn } from "@/lib/utils";

export function GalleryGrid() {
  const [year, setYear] = useState<string>("All");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [activeAlbum, setActiveAlbum] = useState(0);

  const filtered = useMemo(
    () => (year === "All" ? albums : albums.filter((a) => a.year === year)),
    [year],
  );

  const slides = useMemo(
    () =>
      filtered[activeAlbum]?.images.map((img) => ({
        src: img.src,
        width: img.width,
        height: img.height,
        alt: img.alt,
        title: img.caption,
      })) ?? [],
    [filtered, activeAlbum],
  );

  const openAlbum = (albumIdx: number) => {
    setActiveAlbum(albumIdx);
    setIndex(0);
    setOpen(true);
  };

  const filters = ["All", ...galleryYears];

  return (
    <div>
      {/* Year filter */}
      <div
        className="mb-8 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter gallery by year"
      >
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={year === f}
            onClick={() => setYear(f)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200",
              year === f
                ? "bg-gradient-primary text-white shadow-[var(--shadow-cranberry-20)]"
                : "text-ink bg-cloud hover:bg-azure-50",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Album grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((album, i) => (
          <button
            key={album.slug}
            type="button"
            onClick={() => openAlbum(i)}
            className="group rounded-asym-sm relative aspect-4/3 overflow-hidden text-left shadow-[var(--shadow-soft)] focus-visible:outline-3"
            aria-label={`Open ${album.title} album, ${album.images.length} photos`}
          >
            <Image
              src={album.cover}
              alt={`${album.title} cover [placeholder]`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="from-ink/85 via-ink/20 absolute inset-0 bg-gradient-to-t to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 text-white">
              <p className="font-display text-lg font-bold">{album.title}</p>
              <p className="flex items-center gap-1.5 text-sm text-white/80">
                <ImageIcon className="h-3.5 w-3.5" />
                {album.images.length} photos · {album.year}
              </p>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Captions]}
        on={{ view: ({ index: i }) => setIndex(i) }}
        captions={{ descriptionTextAlign: "center" }}
      />
    </div>
  );
}
