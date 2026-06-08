import Image from "next/image";
import { LinkedinIcon } from "@/components/ui/SocialIcons";
import type { Member } from "@/types";
import { cn } from "@/lib/utils";

export function MemberCard({
  member,
  className,
}: {
  member: Member;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "group rounded-asym-sm overflow-hidden bg-white shadow-[var(--shadow-soft)] transition-all duration-[250ms] ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-cranberry-20)]",
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={member.photo}
          alt={`${member.name}, ${member.role}`}
          fill
          sizes="(max-width: 640px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
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
        <p className="font-display text-ink font-bold">{member.name}</p>
        <p className="text-cranberry text-sm font-semibold">{member.role}</p>
      </figcaption>
    </figure>
  );
}
