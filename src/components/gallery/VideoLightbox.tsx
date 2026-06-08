"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Play, X } from "lucide-react";

/**
 * Poster with a gradient-shadowed frame + center play button.
 * Click opens a modal embedding the video.
 */
export function VideoLightbox({
  poster,
  videoUrl,
  title = "Service Above Self",
}: {
  poster: string;
  /** YouTube/Vimeo embed URL [PLACEHOLDER by default] */
  videoUrl: string;
  title?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Play video: ${title}`}
        className="group rounded-asym shadow-cranberry-40 relative block aspect-video w-full overflow-hidden shadow-[var(--shadow-cranberry-40)] focus-visible:outline-3"
      >
        <Image
          src={poster}
          alt={`${title} video poster [placeholder]`}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="bg-ink/30 group-hover:bg-ink/20 absolute inset-0 transition-colors" />
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="bg-gradient-primary inline-flex h-20 w-20 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-1 h-8 w-8 fill-current" />
          </span>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="bg-ink/90 fixed inset-0 z-[120] flex items-center justify-center p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label={title}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close video"
              className="absolute top-5 right-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X />
            </button>
            <motion.div
              className="aspect-video w-full max-w-4xl overflow-hidden rounded-2xl bg-black"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={videoUrl}
                title={title}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
