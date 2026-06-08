import type { Metadata } from "next";
import Image from "next/image";
import { Users, Briefcase, Crown, BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MemberCard } from "@/components/ui/MemberCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/sections/PageHeader";
import {
  board,
  committees,
  generalMembers,
  pastPresidents,
} from "@/data/members";
import { siteSettings } from "@/data/siteSettings";

export const metadata: Metadata = {
  title: "Members & Board",
  description: `Meet the ${siteSettings.rotaractYear} board, committees, and members of the Rotaract Club of Metro City, plus our Past Presidents honor roll.`,
};

export default function MembersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our People"
        title="Members & Board"
        subtitle={`The volunteers behind every project — leading the club through the ${siteSettings.rotaractYear} Rotary year.`}
      />

      {/* Board */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow={`Board ${siteSettings.rotaractYear}`}
              icon={Crown}
              title="Executive board"
              subtitle="Names and photos are placeholders — update the roster in src/data/members.ts."
            />
          </Reveal>
          <RevealGroup className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {board.map((m) => (
              <RevealItem key={m.name} className="h-full">
                <MemberCard member={m} />
              </RevealItem>
            ))}
          </RevealGroup>
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
              subtitle="A few of the changemakers who make it all happen. [PLACEHOLDER]"
            />
          </Reveal>
          <RevealGroup className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {generalMembers.map((m) => (
              <RevealItem key={m.name}>
                <figure className="rounded-asym-sm group overflow-hidden bg-white shadow-[var(--shadow-soft)]">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={m.photo}
                      alt={`${m.name} [placeholder]`}
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
              subtitle="With gratitude to those who have led the club — beginning with our Charter President."
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pastPresidents.map((p) => (
              <RevealItem key={p.year}>
                <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-[var(--shadow-soft)]">
                  <span className="bg-gradient-primary font-display inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white">
                    {p.year.slice(2, 4) || p.year}
                  </span>
                  <div>
                    <p className="font-display text-ink font-bold">{p.name}</p>
                    <p className="text-slate text-sm">
                      {p.year}
                      {p.note ? ` · ${p.note}` : ""}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>
    </>
  );
}
