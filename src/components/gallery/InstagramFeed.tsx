"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import { Play, ExternalLink } from "lucide-react";
import { InstagramIcon } from "@/components/ui/SocialIcons";
import type { InstagramMedia } from "@/lib/instagram";

/** First line of a caption, trimmed for use as a short label. */
function shortCaption(caption: string): string {
  const firstLine = caption.split("\n")[0]?.trim() ?? "";
  return firstLine.length > 80 ? `${firstLine.slice(0, 77)}…` : firstLine;
}

export function InstagramFeed({
  media,
  profileUrl,
  handle,
}: {
  media: InstagramMedia[];
  /** Link to the club's Instagram profile (for the header + CTA). */
  profileUrl: string;
  /** Display handle, e.g. "@rac_metrocity". */
  handle: string;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  // Not connected yet (no token) or nothing returned — show a follow-us CTA.
  if (media.length === 0) {
    return (
      <div className="rounded-asym-sm bg-cloud flex flex-col items-center gap-4 px-6 py-16 text-center">
        <span className="bg-gradient-primary inline-flex h-16 w-16 items-center justify-center rounded-full text-white">
          <InstagramIcon className="h-8 w-8" />
        </span>
        <h2 className="font-display text-ink text-xl font-bold">
          Our gallery lives on Instagram
        </h2>
        <p className="text-ink/70 max-w-md text-sm">
          We share photos from every project and event on Instagram. Follow{" "}
          <span className="font-semibold">{handle}</span> to see them all — the
          latest posts will appear here automatically once the feed is
          connected.
        </p>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-primary inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[var(--shadow-cranberry-20)] transition-transform hover:scale-105"
        >
          <InstagramIcon className="h-4 w-4" />
          Follow {handle}
        </a>
      </div>
    );
  }

  const slides = media.map((m) => ({
    src: m.imageUrl,
    alt: shortCaption(m.caption) || "Instagram post",
    title: shortCaption(m.caption),
    description: m.isVideo ? "Video post · open on Instagram" : undefined,
  }));

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <div>
      {/* Feed header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="bg-gradient-primary inline-flex h-11 w-11 items-center justify-center rounded-full text-white">
            <InstagramIcon className="h-5 w-5" />
          </span>
          <div>
            <p className="font-display text-ink font-bold">Latest from {handle}</p>
            <p className="text-ink/60 text-sm">Straight from our Instagram</p>
          </div>
        </div>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-cranberry inline-flex items-center gap-1.5 text-sm font-semibold hover:underline"
        >
          View profile
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>

      {/* Photo grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {media.map((m, i) => (
          <button
            key={m.id}
            type="button"
            onClick={() => openAt(i)}
            className="group rounded-asym-sm relative aspect-square overflow-hidden text-left shadow-[var(--shadow-soft)] focus-visible:outline-3"
            aria-label={shortCaption(m.caption) || "Open Instagram post"}
          >
            <Image
              src={m.imageUrl}
              alt={shortCaption(m.caption) || "Instagram post"}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="from-ink/70 absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            {m.isVideo && (
              <span className="absolute top-2 right-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm">
                <Play className="h-3.5 w-3.5 fill-current" />
              </span>
            )}
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
