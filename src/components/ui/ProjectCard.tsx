import Image from "next/image";
import { CalendarDays, MapPin, TrendingUp } from "lucide-react";
import type { Project } from "@/types";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const typeStyles: Record<Project["projectType"], string> = {
  Hosted: "bg-cranberry-50 text-cranberry",
  Collaborated: "bg-azure-50 text-azure",
  Participated: "bg-gold/15 text-gold",
};

export function ProjectCard({
  project,
  className,
  onOpen,
}: {
  project: Project;
  className?: string;
  onOpen?: () => void;
}) {
  return (
    <article
      className={cn(
        "rounded-asym-sm group flex h-full cursor-pointer flex-col overflow-hidden bg-white shadow-[var(--shadow-soft)] transition-all duration-[250ms] ease-out hover:shadow-[var(--shadow-cranberry-20)]",
        className,
      )}
      onClick={onOpen}
    >
      <div className="relative aspect-16/10 overflow-hidden">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500"
        />
        <span className="text-ink absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur">
          {project.avenue}
        </span>
        <span
          className={cn(
            "absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-bold",
            typeStyles[project.projectType],
          )}
        >
          {project.projectType}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="text-slate mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5" />
            {formatDate(project.date)}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {project.location}
          </span>
        </div>

        <h3 className="font-display text-ink text-lg leading-snug font-bold">
          {project.title}
        </h3>
        <p className="text-slate mt-2 flex-1 text-sm leading-relaxed">
          {project.excerpt}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          {project.metrics[0] && (
            <span className="text-cranberry inline-flex items-center gap-1.5 text-sm font-bold">
              <TrendingUp className="h-4 w-4" />
              {project.metrics[0].value} {project.metrics[0].label}
            </span>
          )}
          {onOpen && (
            <button
              type="button"
              onClick={onOpen}
              className="text-azure text-sm font-semibold hover:underline"
            >
              Read more →
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
