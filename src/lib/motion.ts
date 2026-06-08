import type { Variants, Transition } from "motion/react";

/**
 * Shared Motion variants & transitions.
 *
 * Components honor `prefers-reduced-motion` via Motion's `useReducedMotion`
 * (see `Reveal` and section components) — these variants describe full motion.
 */

export const easeOut: Transition["ease"] = [0.215, 0.61, 0.355, 1];

/** Fade + rise on scroll into view. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: easeOut } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

/** Container that staggers its children (~80ms). */
export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Hero entrance: larger rise, used for sequenced headline -> media. */
export const heroItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

/** Shared viewport config for whileInView. */
export const viewportOnce = { once: true, amount: 0.2 } as const;
