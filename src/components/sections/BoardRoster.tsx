"use client";

import { useState } from "react";
import { MemberCard } from "@/components/ui/MemberCard";
import { rosters, rosterTenures } from "@/data/members";
import { getTenure, currentTenureId } from "@/config/club.config";
import { cn } from "@/lib/utils";

/**
 * Board grid with a Rotary-year switcher. The site's "handbook" promise:
 * past boards stay browsable, the current tenure is the default.
 * Data is the local `rosters` map, so switching is instant (no fetch).
 */
export function BoardRoster() {
  const [tenureId, setTenureId] = useState(currentTenureId);
  const roster = rosters[tenureId] ?? [];
  const tenure = getTenure(tenureId);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Rotary year"
        className="flex flex-wrap items-center justify-center gap-2"
      >
        {rosterTenures.map((id) => {
          const active = id === tenureId;
          const label = getTenure(id)?.label ?? id;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={active}
              onClick={() => setTenureId(id)}
              className={cn(
                "cursor-pointer rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                active
                  ? "bg-gradient-primary text-white shadow-[var(--shadow-cranberry-20)]"
                  : "text-slate hover:text-cranberry bg-white shadow-[var(--shadow-soft)]",
              )}
            >
              RY {label}
              {id === currentTenureId && (
                <span className="sr-only"> (current year)</span>
              )}
            </button>
          );
        })}
      </div>


      <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {roster.map((m) => (
          <MemberCard key={`${tenureId}-${m.role}-${m.name}`} member={m} />
        ))}
      </div>
    </div>
  );
}
