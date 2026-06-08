import type { LucideIcon } from "lucide-react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: LucideIcon;
  align?: "left" | "center";
  /** light text for dark/colored backgrounds */
  light?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3";
};

/**
 * Eyebrow (with a small gradient icon) + title + optional subtitle.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  icon: Icon = Sparkles,
  align = "left",
  light = false,
  className,
  as: Heading = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <span
        className={cn(
          "eyebrow inline-flex items-center gap-2",
          light ? "text-white/80" : "text-cranberry",
        )}
      >
        <span className="bg-gradient-primary inline-flex h-6 w-6 items-center justify-center rounded-md text-white shadow-[var(--shadow-cranberry-20)]">
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        {eyebrow}
      </span>
      <Heading
        className={cn(
          "text-3xl sm:text-4xl",
          light ? "text-white" : "text-ink",
        )}
      >
        {title}
      </Heading>
      {subtitle && (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed",
            align === "center" && "mx-auto",
            light ? "text-white/85" : "text-slate",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
