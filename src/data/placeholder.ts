/**
 * Placeholder image helper.
 *
 * Every stub photo on the site routes through here so it is trivial to
 * swap the placeholder service for real assets (point `ph` at `/images/...`).
 * Uses picsum.photos with a deterministic seed for stable images.
 *
 * NOTE: All images returned here are clearly placeholders.
 */
export function ph(seed: string, width: number, height: number): string {
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/${width}/${height}`;
}
