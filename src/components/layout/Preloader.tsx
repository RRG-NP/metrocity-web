"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * Full-screen preloader with a spinning Rotary wheel.
 *
 * Rendered in the initial HTML (`visible` starts true) so it covers the page
 * from the very first paint - no flash of the homepage. It shows once per
 * session, then removes the `preloading` class (releasing the hero entrance,
 * which is held paused by CSS until then) and lifts away.
 *
 * Honors prefers-reduced-motion (no spin, instant dismiss). Returning visitors
 * are hidden instantly via the `html.preloaded` CSS rule, then unmounted here.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const root = document.documentElement;

    let seen: string | null = null;
    try {
      seen = sessionStorage.getItem("rcmc-preloaded");
    } catch {
      seen = null;
    }

    // Returning visitor: the inline script already kept the hero visible
    // (`preloaded`); just unmount the overlay.
    if (seen) {
      root.classList.remove("preloading");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(false);
      return;
    }

    const minDelay = reduce ? 200 : 1800;
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem("rcmc-preloaded", "1");
      } catch {
        // sessionStorage unavailable (e.g. privacy mode) - still dismiss.
      }
      // Release the hero entrance first, then lift the overlay away.
      root.classList.remove("preloading");
      setVisible(false);
    }, minDelay);

    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          data-preloader
          className="bg-ink fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={
            reduce
              ? { opacity: 0 }
              : {
                  opacity: 0,
                  y: "-100%",
                  transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] },
                }
          }
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              className="h-24 w-24"
              animate={reduce ? undefined : { rotate: 360 }}
              transition={
                reduce
                  ? undefined
                  : { duration: 2.5, ease: "linear", repeat: Infinity }
              }
            >
              <Image
                src="/wheel-white.png"
                alt=""
                width={100}
                height={100}
                priority
                className="h-24 w-24"
              />
            </motion.div>
            <p className="font-display text-sm font-semibold tracking-[0.25em] text-white/80 uppercase">
              Service Above Self
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
