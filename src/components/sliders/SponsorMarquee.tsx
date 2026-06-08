"use client";

import Image from "next/image";
import { sponsors } from "@/data/sponsors";

/**
 * Auto-scrolling sponsor logo strip (CSS marquee).
 * Logos are duplicated for a seamless loop; pauses on hover.
 * The marquee animation is disabled under prefers-reduced-motion (globals.css).
 */
export function SponsorMarquee() {
  const loop = [...sponsors, ...sponsors];

  return (
    <div
      className="group relative w-full overflow-hidden"
      role="img"
      aria-label="Our sponsors and partners"
    >
      {/* edge fades */}
      <div className="from-cloud pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent" />
      <div className="from-cloud pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l to-transparent" />

      <ul className="animate-marquee flex w-max items-center gap-10 group-hover:[animation-play-state:paused]">
        {loop.map((s, i) => (
          <li key={`${s.name}-${i}`} className="shrink-0">
            <div className="relative h-14 w-36 opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
              <Image
                src={s.logo}
                alt={`${s.name} logo [placeholder]`}
                fill
                sizes="144px"
                className="object-contain"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
