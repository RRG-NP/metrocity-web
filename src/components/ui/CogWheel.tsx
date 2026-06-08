import { cn } from "@/lib/utils";

/**
 * Rotaract-style cogwheel SVG.
 * The outer gear and inner hub are separate groups so they can be animated
 * independently (used spinning in the Preloader).
 */
export function CogWheel({
  className,
  outerClassName,
  innerClassName,
  gradient = true,
}: {
  className?: string;
  outerClassName?: string;
  innerClassName?: string;
  gradient?: boolean;
}) {
  const teeth = 12;
  const cx = 50;
  const cy = 50;

  return (
    <svg
      viewBox="0 0 100 100"
      className={cn(className)}
      role="img"
      aria-label="Rotaract cogwheel"
    >
      <defs>
        <linearGradient id="cogGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-cranberry)" />
          <stop offset="100%" stopColor="var(--color-azure)" />
        </linearGradient>
      </defs>

      {/* Outer gear */}
      <g
        className={outerClassName}
        style={{ transformOrigin: "50% 50%" }}
        fill={gradient ? "url(#cogGrad)" : "currentColor"}
      >
        {Array.from({ length: teeth }).map((_, i) => {
          const angle = (i * 360) / teeth;
          return (
            <rect
              key={i}
              x={cx - 5}
              y={2}
              width={10}
              height={16}
              rx={2}
              transform={`rotate(${angle} ${cx} ${cy})`}
            />
          );
        })}
        <circle cx={cx} cy={cy} r={40} />
      </g>

      {/* Inner hub (white ring) */}
      <circle cx={cx} cy={cy} r={28} fill="var(--color-white)" />
      <circle
        cx={cx}
        cy={cy}
        r={28}
        fill="none"
        stroke={gradient ? "url(#cogGrad)" : "currentColor"}
        strokeWidth={3}
      />

      {/* Inner spokes */}
      <g
        className={innerClassName}
        style={{ transformOrigin: "50% 50%" }}
        stroke={gradient ? "url(#cogGrad)" : "currentColor"}
        strokeWidth={3}
        strokeLinecap="round"
      >
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 360) / 8 + 22.5;
          const rad = (angle * Math.PI) / 180;
          const x2 = cx + Math.cos(rad) * 22;
          const y2 = cy + Math.sin(rad) * 22;
          return <line key={i} x1={cx} y1={cy} x2={x2} y2={y2} />;
        })}
        <circle
          cx={cx}
          cy={cy}
          r={6}
          fill={gradient ? "url(#cogGrad)" : "currentColor"}
          stroke="none"
        />
      </g>
    </svg>
  );
}
