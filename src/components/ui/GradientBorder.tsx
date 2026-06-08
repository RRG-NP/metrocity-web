import { cn } from "@/lib/utils";

type GradientBorderProps = {
  children: React.ReactNode;
  className?: string;
  /** inner background color class (default white) */
  innerClassName?: string;
  /** rounding utility for both layers */
  rounded?: string;
};

/**
 * Wraps content in a gradient (cranberry -> azure) border.
 * The gradient is a thin padded layer behind an inner surface.
 */
export function GradientBorder({
  children,
  className,
  innerClassName,
  rounded = "rounded-asym",
}: GradientBorderProps) {
  return (
    <div className={cn("bg-gradient-primary p-[2px]", rounded, className)}>
      <div className={cn("h-full w-full bg-white", rounded, innerClassName)}>
        {children}
      </div>
    </div>
  );
}
