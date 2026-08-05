/**
 * Renders a schema.org JSON-LD block. Server component — the script is emitted
 * into the static HTML so crawlers that don't run JavaScript still read it.
 *
 * Node ids come from `schemaIds` in `src/lib/seo.ts`, so page-level nodes merge
 * with the site-wide `@graph` in `src/app/layout.tsx` rather than duplicating
 * the club and president entities.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
