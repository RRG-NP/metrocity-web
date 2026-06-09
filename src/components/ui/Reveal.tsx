"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Tag = "div" | "section" | "li" | "article" | "span" | "ul";

/**
 * Scroll reveal - progressive enhancement.
 *
 * Content is VISIBLE by default (SSR / no-JS / reduced-motion). Only when JS is
 * active (the `js` class on <html>, set in layout) does CSS hide it, and an
 * IntersectionObserver adds `in-view` to fade + rise it in. This guarantees
 * content can never get stuck hidden - see globals.css `.reveal` rules.
 */
function useInViewClass(amount = 0.15) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: amount, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount]);

  return { ref, inView };
}

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: Tag;
}) {
  const { ref, inView } = useInViewClass();
  const Comp = as as React.ElementType;
  return (
    <Comp
      ref={ref}
      className={cn("reveal", inView && "in-view", className)}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Comp>
  );
}

export function RevealGroup({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** kept for API compatibility; stagger is handled in CSS via nth-child */
  stagger?: number;
  as?: Tag;
}) {
  const { ref, inView } = useInViewClass(0.1);
  const Comp = as as React.ElementType;
  return (
    <Comp
      ref={ref}
      className={cn("reveal-stagger", inView && "in-view", className)}
    >
      {children}
    </Comp>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const Comp = as as React.ElementType;
  // Visibility is driven by the parent RevealGroup's `.in-view` (see globals.css).
  return <Comp className={className}>{children}</Comp>;
}
