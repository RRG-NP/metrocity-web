"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  X,
  CalendarDays,
  MapPin,
  Users,
  Tag,
  Target,
  ChevronLeft,
  ChevronRight,
  Expand,
} from "lucide-react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SmartImage } from "@/components/ui/SmartImage";
import { projects, projectTenures } from "@/data/projects";
import { formatDate, cn } from "@/lib/utils";
import type { Project } from "@/types";

type TenureTab = "All" | string;

/** Projects shown per page. */
const PAGE_SIZE = 9;

/** Build a compact pager model: first, last, a window around current, with gaps. */
function pageModel(current: number, total: number): Array<number | "gap"> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out: Array<number | "gap"> = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) out.push("gap");
    out.push(p);
    prev = p;
  }
  return out;
}

export function ProjectsExplorer() {
  const [tenure, setTenure] = useState<TenureTab>("All");
  const [page, setPage] = useState(1);
  const [active, setActive] = useState<Project | null>(null);
  /** Index into `active.gallery` for the fullscreen viewer, or null when closed. */
  const [lightbox, setLightbox] = useState<number | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const didMount = useRef(false);

  const tabs: TenureTab[] = ["All", ...projectTenures];

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: projects.length };
    for (const t of projectTenures) {
      map[t] = projects.filter((p) => p.tenure === t).length;
    }
    return map;
  }, []);

  const filtered = useMemo(
    () => projects.filter((p) => tenure === "All" || p.tenure === tenure),
    [tenure],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const rangeStart = filtered.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(safePage * PAGE_SIZE, filtered.length);

  const selectTenure = useCallback((t: TenureTab) => {
    setTenure(t);
    setPage(1);
  }, []);

  // Scroll the grid back into view when the page changes (but not on first render).
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [safePage, tenure]);

  const closeModal = useCallback(() => {
    setActive(null);
    setLightbox(null);
  }, []);

  const galleryLen = active?.gallery.length ?? 0;
  const showPrev = useCallback(
    () => setLightbox((i) => (i === null ? i : (i - 1 + galleryLen) % galleryLen)),
    [galleryLen],
  );
  const showNext = useCallback(
    () => setLightbox((i) => (i === null ? i : (i + 1) % galleryLen)),
    [galleryLen],
  );

  // Keyboard controls for the fullscreen viewer.
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      else if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, showPrev, showNext]);

  const pages = pageModel(safePage, totalPages);

  return (
    <div>
      <div ref={topRef} className="scroll-mt-24" />

      {/* Tenure (Rota year) tabs */}
      <div
        className="border-slate/15 flex flex-wrap gap-2 border-b pb-1"
        role="tablist"
        aria-label="Filter by Rotary year"
      >
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tenure === t}
            onClick={() => selectTenure(t)}
            className={cn(
              "relative rounded-t-lg px-4 py-3 text-sm font-semibold transition-colors",
              tenure === t ? "text-cranberry" : "text-slate hover:text-ink",
            )}
          >
            {t === "All" ? "All" : `RY ${t}`}
            <span className="text-slate/70 ml-1.5 text-xs font-normal">
              {counts[t]}
            </span>
            {tenure === t && (
              <motion.span
                layoutId="tenure-underline"
                className="bg-gradient-primary absolute inset-x-2 -bottom-px h-0.5 rounded-full"
              />
            )}
          </button>
        ))}
      </div>

      {/* Result count */}
      {filtered.length > 0 && (
        <p className="text-slate mt-6 text-sm">
          Showing <span className="text-ink font-semibold">{rangeStart}-{rangeEnd}</span> of{" "}
          <span className="text-ink font-semibold">{filtered.length}</span>{" "}
          {filtered.length === 1 ? "project" : "projects"}
        </p>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-slate mt-12 text-center">
          No projects in this Rotary year yet.
        </p>
      ) : (
        <motion.div
          key={`${tenure}-${safePage}`}
          className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {pageItems.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.18) }}
              className="h-full"
            >
              <ProjectCard
                project={p}
                className="h-full"
                onOpen={() => setActive(p)}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav
          className="mt-12 flex items-center justify-center gap-1.5"
          aria-label="Pagination"
        >
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={safePage === 1}
            aria-label="Previous page"
            className="text-slate hover:bg-cloud hover:text-ink inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {pages.map((p, i) =>
            p === "gap" ? (
              <span
                key={`gap-${i}`}
                className="text-slate/60 inline-flex h-10 w-10 items-center justify-center"
              >
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                aria-label={`Page ${p}`}
                aria-current={p === safePage ? "page" : undefined}
                className={cn(
                  "inline-flex h-10 min-w-10 items-center justify-center rounded-lg px-2 text-sm font-semibold transition-colors",
                  p === safePage
                    ? "bg-gradient-primary text-white"
                    : "text-slate hover:bg-cloud hover:text-ink",
                )}
              >
                {p}
              </button>
            ),
          )}

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={safePage === totalPages}
            aria-label="Next page"
            className="text-slate hover:bg-cloud hover:text-ink inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </nav>
      )}

      {/* Detail modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="bg-ink/80 fixed inset-0 z-120 flex items-start justify-center overflow-y-auto p-4 py-10 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
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
              <div className="group/cover relative aspect-video">
                <button
                  type="button"
                  onClick={() => setLightbox(0)}
                  aria-label="View photo fullscreen"
                  className="absolute inset-0 cursor-zoom-in"
                >
                  <SmartImage
                    src={active.cover}
                    alt={active.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 42rem"
                    className="object-cover"
                  />
                  <span className="absolute right-4 bottom-4 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white opacity-0 transition-opacity group-hover/cover:opacity-100">
                    <Expand className="h-3.5 w-3.5" /> View
                  </span>
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close"
                  className="text-ink absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 hover:bg-white"
                >
                  <X className="h-5 w-5" />
                </button>
                <span className="bg-gradient-primary pointer-events-none absolute bottom-4 left-4 rounded-full px-3 py-1 text-xs font-semibold text-white">
                  {active.avenue}
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <div className="text-slate flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <span className="bg-cranberry-50 text-cranberry rounded-full px-2.5 py-1">
                    {active.projectType}
                  </span>
                  <span className="bg-cloud text-slate rounded-full px-2.5 py-1">
                    RY {active.tenure}
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
                      ? ` - ${formatDate(active.endDate)}`
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
                      <button
                        key={src}
                        type="button"
                        onClick={() => setLightbox(i + 1)}
                        aria-label={`View photo ${i + 2} fullscreen`}
                        className="group/thumb focus-visible:ring-cranberry relative aspect-square cursor-zoom-in overflow-hidden rounded-lg focus:outline-none focus-visible:ring-2"
                      >
                        <SmartImage
                          src={src}
                          alt={`${active.title} photo ${i + 2}`}
                          fill
                          sizes="(max-width: 768px) 25vw, 10rem"
                          className="object-cover transition-transform duration-300 group-hover/thumb:scale-105"
                        />
                        {i === 7 && active.gallery.length > 9 && (
                          <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-sm font-bold text-white">
                            +{active.gallery.length - 9}
                          </span>
                        )}
                      </button>
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

      {/* Fullscreen photo viewer */}
      <AnimatePresence>
        {active && lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-130 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`${active.title} - photo ${lightbox + 1} of ${active.gallery.length}`}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close fullscreen"
              className="absolute top-4 right-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </button>

            {active.gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showPrev();
                  }}
                  aria-label="Previous photo"
                  className="absolute left-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showNext();
                  }}
                  aria-label="Next photo"
                  className="absolute right-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <motion.div
              key={lightbox}
              className="relative h-[82vh] w-[92vw] max-w-6xl"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <SmartImage
                src={active.gallery[lightbox]}
                alt={`${active.title} - photo ${lightbox + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                preload
              />
            </motion.div>

            {active.gallery.length > 1 && (
              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white">
                {lightbox + 1} / {active.gallery.length}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
