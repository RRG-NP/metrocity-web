import Link from "next/link";
import { CogWheel } from "./CogWheel";
import { siteSettings } from "@/data/siteSettings";
import { cn } from "@/lib/utils";

/** Brand mark: cogwheel + club name. */
export function Logo({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label={`${siteSettings.clubName} — home`}
    >
      <CogWheel className="h-9 w-9 shrink-0 transition-transform duration-500 group-hover:rotate-45" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[0.95rem] font-extrabold tracking-tight",
            light ? "text-white" : "text-ink",
          )}
        >
          Rotaract Club
        </span>
        <span
          className={cn(
            "text-[0.7rem] font-semibold tracking-wide",
            light ? "text-white/75" : "text-cranberry",
          )}
        >
          of Metro City
        </span>
      </span>
    </Link>
  );
}
