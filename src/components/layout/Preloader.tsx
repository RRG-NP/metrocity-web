"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CogWheel } from "@/components/ui/CogWheel";

/**
 * Full-screen preloader with a spinning Rotaract cogwheel.
 * Shows only on first load (per session), then fades + slides away.
 * Honors prefers-reduced-motion (no spin, instant dismiss).
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only on first load of the session.
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("rcmc-preloaded");
    if (seen) return;

    // Show the preloader only on first load (after reading sessionStorage,
    // which is unavailable during SSR).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    const minDelay = reduce ? 200 : 1400;

    const dismiss = () => {
      sessionStorage.setItem("rcmc-preloaded", "1");
      setVisible(false);
    };

    const t = setTimeout(dismiss, minDelay);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
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
            <CogWheel
              className="h-24 w-24"
              outerClassName={
                reduce
                  ? undefined
                  : "animate-[spin-half_1s_cubic-bezier(0.215,0.61,0.355,1)_infinite]"
              }
              innerClassName={
                reduce
                  ? undefined
                  : "animate-[spin-half_1.4s_cubic-bezier(0.215,0.61,0.355,1)_infinite_reverse]"
              }
            />
            <p className="font-display text-sm font-semibold tracking-[0.25em] text-white/80 uppercase">
              Service Above Self
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
