"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { X, CalendarDays, MapPin, Users, Tag, Target } from "lucide-react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects, projectTypes } from "@/data/projects";
import { formatDate, cn } from "@/lib/utils";
import type { Project, ProjectType } from "@/types";

type TypeTab = "All" | ProjectType;

export function ProjectsExplorer() {
  const [type, setType] = useState<TypeTab>("All");
  const [active, setActive] = useState<Project | null>(null);

  const tabs: TypeTab[] = ["All", ...projectTypes];

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: projects.length };
    for (const t of projectTypes) {
      map[t] = projects.filter((p) => p.projectType === t).length;
    }
    return map;
  }, []);

  const filtered = useMemo(
    () =>
      projects.filter((p) => type === "All" || p.projectType === type),
    [type],
  );

  return (
    <div>
      {/* Project type tabs */}
      <div
        className="border-slate/15 flex flex-wrap gap-2 border-b pb-1"
        role="tablist"
        aria-label="Filter by how the club took part"
      >
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={type === t}
            onClick={() => setType(t)}
            className={cn(
              "relative rounded-t-lg px-4 py-3 text-sm font-semibold transition-colors",
              type === t ? "text-cranberry" : "text-slate hover:text-ink",
            )}
          >
            {t}
            <span className="text-slate/70 ml-1.5 text-xs font-normal">
              {counts[t]}
            </span>
            {type === t && (
              <motion.span
                layoutId="type-underline"
                className="bg-gradient-primary absolute inset-x-2 -bottom-px h-0.5 rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-slate mt-12 text-center">
          No projects match this filter yet.
        </p>
      ) : (
        <motion.div
          layout
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <ProjectCard
                  project={p}
                  className="h-full"
                  onOpen={() => setActive(p)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Detail modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="bg-ink/80 fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto p-4 py-10 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
          >
            <motion.div
              className="rounded-asym-sm w-full max-w-2xl overflow-hidden bg-white shadow-2xl"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-16/9">
                <Image
                  src={active.cover}
                  alt={active.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 42rem"
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="text-ink absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 hover:bg-white"
                >
                  <X className="h-5 w-5" />
                </button>
                <span className="bg-gradient-primary absolute bottom-4 left-4 rounded-full px-3 py-1 text-xs font-semibold text-white">
                  {active.avenue}
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <div className="text-slate flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <span className="bg-cranberry-50 text-cranberry rounded-full px-2.5 py-1">
                    {active.projectType}
                  </span>
                  {active.category && (
                    <span className="bg-cloud text-slate inline-flex items-center gap-1 rounded-full px-2.5 py-1">
                      <Tag className="h-3 w-3" /> {active.category}
                    </span>
                  )}
                </div>

                <h2 className="font-display text-ink mt-3 text-2xl font-bold">
                  {active.title}
                </h2>
                <div className="text-slate mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4" />{" "}
                    {formatDate(active.date)}
                    {active.endDate && active.endDate !== active.date
                      ? ` – ${formatDate(active.endDate)}`
                      : ""}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" /> {active.location}
                  </span>
                </div>

                <p className="text-slate mt-5 leading-relaxed">{active.body}</p>

                {active.metrics.length > 0 && (
                  <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {active.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="bg-cloud rounded-xl p-4 text-center"
                      >
                        <dt className="text-cranberry font-display text-xl font-extrabold">
                          {m.value}
                        </dt>
                        <dd className="text-slate mt-1 text-xs">{m.label}</dd>
                      </div>
                    ))}
                  </dl>
                )}

                {active.gallery.length > 1 && (
                  <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4">
                    {active.gallery.slice(1, 9).map((src, i) => (
                      <div
                        key={src}
                        className="relative aspect-square overflow-hidden rounded-lg"
                      >
                        <Image
                          src={src}
                          alt={`${active.title} photo ${i + 2}`}
                          fill
                          sizes="(max-width: 768px) 25vw, 10rem"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {active.goals && active.goals.length > 0 && (
                  <div className="mt-6">
                    <p className="text-ink flex items-center gap-1.5 text-sm font-semibold">
                      <Target className="text-azure h-4 w-4" /> Club goals
                      advanced
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {active.goals.map((g) => (
                        <span
                          key={g}
                          className="bg-azure-50 text-azure rounded-full px-3 py-1 text-xs font-medium"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {active.partners.length > 0 && (
                  <div className="text-slate mt-6 flex items-start gap-2 text-sm">
                    <Users className="text-azure mt-0.5 h-4 w-4 shrink-0" />
                    <span>
                      <span className="text-ink font-semibold">
                        Jointly with:
                      </span>{" "}
                      {active.partners.join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
