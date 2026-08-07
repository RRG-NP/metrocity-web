import Image from "next/image";

/**
 * Full-screen preloader with a spinning Rotary wheel.
 *
 * Deliberately static, server-rendered markup. It sits in the initial HTML so
 * it covers the page from the very first paint, and everything it *does* -
 * spin, hold, lift - is driven by CSS plus the pre-hydration script in
 * `layout.tsx` (see the "Preloader coordination" block in globals.css).
 *
 * Nothing here depends on React state or hydration, which is the point: as a
 * client component it re-rendered once hydration caught up, and on slower
 * phones that showed as the overlay appearing a second time. Static markup
 * React never re-renders is painted once and lifts once.
 *
 * Reduced motion is handled by the global `prefers-reduced-motion` rule, which
 * collapses both the spin and the lift; the script shortens the hold to match.
 */
export function Preloader() {
  return (
    <div
      data-preloader
      className="bg-ink fixed inset-0 z-[100] flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-6">
        <div className="preloader-wheel h-24 w-24">
          <Image
            src="/wheel-white.png"
            alt=""
            width={100}
            height={100}
            preload
            className="h-24 w-24"
          />
        </div>
        <p className="font-display text-sm font-semibold tracking-[0.25em] text-white/80 uppercase">
          Service Above Self
        </p>
      </div>
    </div>
  );
}
