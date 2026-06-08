"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

/**
 * Tiled textured backdrop that slowly drifts horizontally (GSAP, ~20s linear,
 * infinite). A gradient overlay sits on top to keep foreground text legible.
 *
 * Honors prefers-reduced-motion: the drift is disabled (static texture).
 * Decorative only (aria-hidden, pointer-events-none).
 */

// Subtle repeating dot/ring texture as an inline SVG data URI.
const TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%23ffffff' stroke-opacity='0.12'%3E%3Ccircle cx='20' cy='20' r='6'/%3E%3Ccircle cx='60' cy='60' r='6'/%3E%3Ccircle cx='60' cy='20' r='2'/%3E%3Ccircle cx='20' cy='60' r='2'/%3E%3C/g%3E%3C/svg%3E\")";

type AnimatedBackgroundProps = {
  className?: string;
  /** overlay tint: 'brand' uses cranberry->azure, 'ink' uses deep navy */
  overlay?: "brand" | "ink";
};

export function AnimatedBackground({
  className,
  overlay = "brand",
}: AnimatedBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const tween = gsap.to(el, {
      backgroundPositionX: "+=800",
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden="true"
    >
      {/* Drifting texture */}
      <div
        ref={ref}
        className="absolute inset-0"
        style={{
          backgroundImage: TEXTURE,
          backgroundRepeat: "repeat",
          backgroundSize: "80px 80px",
        }}
      />
      {/* Gradient overlay for legibility */}
      <div
        className={cn(
          "absolute inset-0",
          overlay === "brand"
            ? "from-cranberry/95 via-azure/90 to-ink/95 bg-gradient-to-br"
            : "from-ink/95 via-azure/90 to-ink/95 bg-gradient-to-br",
        )}
      />
    </div>
  );
}
