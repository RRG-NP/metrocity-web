/**
 * Branded, self-contained placeholder image generator.
 *
 * Returns an inline SVG data-URI (no network request) so the site renders
 * fully offline and never shows a broken image. Each placeholder is an
 * on-brand gradient tile (logo colors) with a faint cogwheel motif and a
 * small label derived from the seed — clearly a placeholder, but themed.
 *
 * TO USE REAL PHOTOS: replace the `ph(...)` calls in the data files with real
 * paths (e.g. "/images/winter-drive.jpg") and add any external host to
 * `images.remotePatterns` in next.config.ts.
 */

// Logo-derived color pairs for variety across tiles.
const PAIRS: [string, string][] = [
  ["#DE1675", "#902D2C"], // fuchsia -> brown red
  ["#902D2C", "#190A10"], // brown red -> near black
  ["#BC1361", "#DE1675"], // deep fuchsia -> fuchsia
  ["#DE1675", "#5E1E1D"], // fuchsia -> dark brown
  ["#A8224E", "#902D2C"], // berry -> brown red
];

function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

/** Turn a seed like "winter-relief-2" into a readable label "Winter Relief". */
function labelFromSeed(seed: string): string {
  const cleaned = seed
    .replace(/[-_]+/g, " ")
    .replace(/\d+/g, " ")
    .replace(/\b(g|t|gm|dir|p|s|a|b|c)\b/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned) return "Rotaract";
  return cleaned
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function ph(seed: string, width: number, height: number): string {
  const h = hash(seed);
  const [c1, c2] = PAIRS[h % PAIRS.length];
  const angle = h % 180;
  const label = labelFromSeed(seed);
  const cx = width * 0.5;
  const cy = height * 0.5;
  const r = Math.min(width, height) * 0.32;
  // Approximate font size relative to tile width.
  const fs = Math.max(14, Math.round(Math.min(width, height) * 0.06));

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" gradientTransform="rotate(${angle})">
      <stop offset="0%" stop-color="${c1}"/>
      <stop offset="100%" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
  <g fill="none" stroke="#ffffff" stroke-opacity="0.10">
    <circle cx="${cx}" cy="${cy}" r="${r}" stroke-width="${Math.max(2, r * 0.06)}"/>
    <circle cx="${cx}" cy="${cy}" r="${r * 0.62}" stroke-width="${Math.max(2, r * 0.05)}"/>
  </g>
  <g fill="#ffffff" fill-opacity="0.14">
    ${Array.from({ length: 8 })
      .map((_, i) => {
        const a = (i * Math.PI) / 4;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r * 0.08).toFixed(1)}"/>`;
      })
      .join("")}
  </g>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle"
    font-family="Segoe UI, Roboto, Helvetica, Arial, sans-serif"
    font-size="${fs}" font-weight="700" fill="#ffffff" fill-opacity="0.92">${escapeXml(
      label,
    )}</text>
  <text x="50%" y="${cy + fs * 1.3}" text-anchor="middle" dominant-baseline="middle"
    font-family="Segoe UI, Roboto, Helvetica, Arial, sans-serif"
    font-size="${Math.round(fs * 0.42)}" letter-spacing="2" fill="#ffffff" fill-opacity="0.6">PLACEHOLDER</text>
</svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
