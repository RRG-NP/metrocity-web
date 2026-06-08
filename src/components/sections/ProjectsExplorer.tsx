"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { X, CalendarDays, MapPin, Users } from "lucide-react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects, projectAvenues } from "@/data/projects";
import { formatDate, cn } from "@/lib/utils";
import type { Avenue, Project, ProjectStatus } from "@/types";

type AvenueTab = "All" | Avenue;
type StatusFilter = "All" | ProjectStatus;

const statusFilters: StatusFilter[] = [
  "All",
  "Completed",
  "Ongoing",
  "Upcoming",
];

export function ProjectsExplorer() {
  const [avenue, setAvenue] = useState<AvenueTab>("All");
  const [status, setStatus] = useState<StatusFilter>("All");
  const [active, setActive] = useState<Project | null>(null);

  const tabs: AvenueTab[] = ["All", ...projectAvenues];

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (avenue === "All" || p.avenue === avenue) &&
          (status === "All" || p.status === status),
      ),
    [avenue, status],
  );

  return (
    <div>
      {/* Avenue tabs */}
      <div
        className="border-slate/15 flex flex-wrap gap-2 border-b pb-1"
        role="tablist"
        aria-label="Filter by Avenue of Service"
      >
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={avenue === t}
            onClick={() => setAvenue(t)}
            className={cn(
              "relative rounded-t-lg px-4 py-3 text-sm font-semibold transition-colors",
              avenue === t ? "text-cranberry" : "text-slate hover:text-ink",
            )}
          >
            {t}
            {avenue === t && (
              <motion.span
                layoutId="avenue-underline"
                className="bg-gradient-primary absolute inset-x-2 -bottom-px h-0.5 rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Status toggle */}
      <div className="mt-6 flex flex-wrap gap-2">
        {statusFilters.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={status === s}
            onClick={() => setStatus(s)}
            className={cn(
              "rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
              status === s
                ? "bg-ink text-white"
                : "bg-cloud text-slate hover:text-ink",
            )}
          >
            {s}
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
                  alt={`${active.title} [placeholder]`}
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
                <h2 className="font-display text-ink text-2xl font-bold">
                  {active.title}
                </h2>
                <div className="text-slate mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="h-4 w-4" />{" "}
                    {formatDate(active.date)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" /> {active.location}
                  </span>
                  <span className="text-cranberry font-semibold">
                    {active.status}
                  </span>
                </div>

                <p className="text-slate mt-5 leading-relaxed">{active.body}</p>

                {active.metrics.length > 0 && (
                  <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
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

                {active.partners.length > 0 && (
                  <div className="text-slate mt-6 flex items-center gap-2 text-sm">
                    <Users className="text-azure h-4 w-4" />
                    <span className="text-ink font-semibold">
                      Partners:
                    </span>{" "}
                    {active.partners.join(", ")}
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
