"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

/**
 * next/image with a built-in loading skeleton.
 *
 * Shows a pulsing placeholder until the image finishes loading, then fades the
 * image in. Designed for `fill` usage inside a `relative` parent (the skeleton
 * is positioned absolutely to cover it). Falls back gracefully on error so the
 * skeleton never lingers forever.
 */
export function SmartImage({ alt, className, onLoad, onError, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && (
        <span
          aria-hidden
          className="bg-slate/10 absolute inset-0 animate-pulse"
        />
      )}
      <Image
        {...props}
        alt={alt}
        className={cn(
          "transition-opacity duration-500 ease-out",
          loaded ? "opacity-100" : "opacity-0",
          className,
        )}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        onError={(e) => {
          setLoaded(true);
          onError?.(e);
        }}
      />
    </>
  );
}
