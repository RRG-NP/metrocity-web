import type { Metadata } from "next";
import Image from "next/image";
import { Users, Briefcase, Crown, BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/sections/PageHeader";
import { BoardRoster } from "@/components/sections/BoardRoster";
import {
  board,
  committees,
  generalMembers,
  pastPresidents,
} from "@/data/members";
import { siteSettings } from "@/data/siteSettings";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  pageMetadata,
  breadcrumbSchema,
  schemaIds,
  absoluteUrl,
} from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/members",
  title: "Members & Board",
  description: `Meet the ${siteSettings.rotaractYear} executive board led by President ${siteSettings.president}, plus the committees, members, and Past Presidents of the Rotaract Club of Metro City, Kathmandu.`,
});

// The board as an ItemList of Person entries. The President reuses the
// site-wide `#president` @id so the two nodes merge into one entity rather
// than competing as duplicates.
const boardSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Executive Board ${siteSettings.rotaractYear} · ${siteSettings.clubName}`,
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: board.length,
  itemListElement: board.map((member, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Person",
      ...(member.role === "President" ? { "@id": schemaIds.president } : {}),
      name: member.name.replace(/^Rtr\.\s*/, ""),
      honorificPrefix: "Rtr.",
      jobTitle: member.role,
      image: absoluteUrl(member.photo),
      memberOf: { "@id": schemaIds.organization },
    },
  })),
};

const breadcrumbs = breadcrumbSchema([
  { name: "Members & Board", path: "/members" },
]);

export default function MembersPage() {
  return (
    <>
      <JsonLd data={boardSchema} />
      <JsonLd data={breadcrumbs} />
      <PageHeader
        eyebrow="Our People"
        title="Members & Board"
        subtitle={`The volunteers behind every project - leading the club through the ${siteSettings.rotaractYear} Rotary year.`}
      />

      {/* Board */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={`Board ${siteSettings.rotaractYear}`}
              icon={Crown}
              align="center"
              title="Executive board"
              subtitle={`Leading the club through the ${siteSettings.rotaractYear} Rotary year - or browse any past board.`}
            />
          </Reveal>
          <Reveal className="mt-12">
            <BoardRoster />
          </Reveal>
        </Container>
      </section>

      {/* Committees */}
      <section className="bg-cloud py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How We Organise"
              icon={Briefcase}
              title="Our committees"
              subtitle="Standing committees that plan and deliver the club's work year-round."
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {committees.map((c) => (
              <RevealItem key={c.name}>
                <div className="rounded-asym-sm border-cranberry h-full border-l-4 bg-white p-6 shadow-[var(--shadow-soft)]">
                  <h3 className="font-display text-ink text-lg font-bold">
                    {c.name}
                  </h3>
                  <p className="text-slate mt-2 text-sm leading-relaxed">
                    {c.duty}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* General members */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="The Club"
              icon={Users}
              title="Our members"
              subtitle="The changemakers who make it all happen."
            />
          </Reveal>
          {generalMembers.length > 0 ? (
            <RevealGroup className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {generalMembers.map((m) => (
                <RevealItem key={m.name}>
                  <figure className="rounded-asym-sm group overflow-hidden bg-white shadow-[var(--shadow-soft)]">
                    <div className="relative aspect-square overflow-hidden">
                      <Image
                        src={m.photo}
                        alt={m.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <figcaption className="text-ink p-3 text-center text-sm font-semibold">
                      {m.name}
                    </figcaption>
                  </figure>
                </RevealItem>
              ))}
            </RevealGroup>
          ) : (
            <Reveal className="rounded-asym-sm mt-12 bg-white p-10 text-center shadow-[var(--shadow-soft)]">
              <p className="text-slate">
                Our {siteSettings.rotaractYear} general member roster is being
                finalized - check back soon, or{" "}
                <a
                  href="/membership"
                  className="text-cranberry font-semibold hover:underline"
                >
                  join us
                </a>{" "}
                to be one of the first names on it.
              </p>
            </Reveal>
          )}
        </Container>
      </section>

      {/* Past presidents */}
      <section className="bg-cloud py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Honor Roll"
              icon={BadgeCheck}
              title="Past Presidents"
              subtitle="With gratitude to those who have led the club - beginning with our Charter President."
            />
          </Reveal>
          <RevealGroup
            as="ol"
            className="relative mt-12 max-w-2xl space-y-4 before:absolute before:top-2 before:bottom-2 before:left-6 before:w-px before:bg-gradient-to-b before:from-[var(--color-cranberry)] before:to-[var(--color-azure)] sm:space-y-6"
          >
            {pastPresidents.map((p) => (
              <RevealItem as="li" key={p.year} className="relative pl-16">
                <span className="bg-gradient-primary font-display absolute top-1/2 left-0 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-sm font-bold text-white shadow-[var(--shadow-cranberry-20)]">
                  {p.year.slice(2, 4) || p.year}
                </span>
                <div className="rounded-2xl bg-white p-5 shadow-[var(--shadow-soft)]">
                  <p className="font-display text-ink font-bold">{p.name}</p>
                  <p className="text-slate text-sm">
                    {p.year}
                    {p.note ? ` · ${p.note}` : ""}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>
    </>
  );
}
