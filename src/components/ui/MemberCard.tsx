import Image from "next/image";
import { Crown, UserRound } from "lucide-react";
import { LinkedinIcon } from "@/components/ui/SocialIcons";
import type { Member } from "@/types";
import { cn } from "@/lib/utils";

/** "Rtr. Rohan Raj Gautam" → "RG" (first + last word, titles stripped). */
function initials(name: string): string {
  const words = name
    .replace(/^(Rtr|Rtn|PP|IPP)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "?";
  return (words[0][0] + (words[words.length - 1][0] ?? "")).toUpperCase();
}

export function MemberCard({
  member,
  className,
}: {
  member: Member;
  className?: string;
}) {
  const isPresident = member.role === "President";
  const isVacant = !member.photo && /to be announced/i.test(member.name);

  return (
    <figure
      className={cn(
        "group rounded-asym-sm relative overflow-hidden bg-white",
        "transition-all duration-300 ease-out",
        "shadow-lg",
        isPresident && "ring-cranberry ring-2",
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={`${member.name}, ${member.role}`}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            aria-hidden
            className="bg-gradient-primary-135 flex h-full w-full items-center justify-center"
          >
            {isVacant ? (
              <UserRound className="h-1/3 w-1/3 text-white/60" />
            ) : (
              <span className="font-display text-[clamp(2rem,8vw,3rem)] font-bold text-white/90">
                {initials(member.name)}
              </span>
            )}
          </div>
        )}
        {isPresident && (
          <span className="bg-gradient-primary absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white shadow-[var(--shadow-cranberry-40)]">
            <Crown className="h-3.5 w-3.5" /> President
          </span>
        )}
        <div className="from-ink/70 absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="text-azure absolute top-3 right-3 inline-flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white/90 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 hover:bg-white"
          >
            <LinkedinIcon className="h-4 w-4" />
          </a>
        )}
      </div>
      <figcaption className="p-4 text-center">
        <p
          className={cn(
            "font-display font-bold",
            isVacant ? "text-slate italic" : "text-ink",
          )}
        >
          {member.name}
        </p>
        <p className="text-cranberry text-sm font-semibold">{member.role}</p>
      </figcaption>
    </figure>
  );
}
