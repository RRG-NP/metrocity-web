import Image from "next/image";
import Link from "next/link";
import { siteSettings } from "@/data/siteSettings";
import { cn } from "@/lib/utils";

/** Brand mark: Rotary wheel + club name. */
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
      className={cn("group inline-flex items-center gap-2", className)}
      aria-label={`${siteSettings.clubName} - home`}
    >
      <Image
        src={!light ? "/wheel.png" : "/wheel-white.png"}
        alt=""
        width={36}
        height={36}
        preload
        className="h-9 w-9 shrink-0 transition-transform duration-500 group-hover:rotate-45"
      />
      <span className="flex flex-col gap-1 leading-none">
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
