import Link from "next/link";
import {
  Award,
  HeartHandshake,
  Briefcase,
  ArrowRight,
  Target,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { objectives } from "@/data/siteSettings";

const iconMap = {
  leadership: Award,
  service: HeartHandshake,
  growth: Briefcase,
} as const;

export function Objectives() {
  return (
    <section className="py-20 lg:py-28" id="objectives">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Our Objectives"
            icon={Target}
            align="center"
            title="What we stand for"
            subtitle="Three pillars guide everything we do as a Rotaract club — developing leaders, serving our community, and growing together."
          />
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 md:grid-cols-3">
          {objectives.map((o) => {
            const Icon = iconMap[o.icon];
            return (
              <RevealItem key={o.title}>
                <div className="rounded-asym-sm group h-full bg-white p-8 shadow-[var(--shadow-soft)] transition-all duration-[250ms] ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-cranberry-20)]">
                  <span className="bg-gradient-primary mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-[var(--shadow-cranberry-20)] transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="font-display text-ink text-xl font-bold">
                    {o.title}
                  </h3>
                  <p className="text-slate mt-3 leading-relaxed">
                    {o.description}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal className="mt-10 text-center">
          <Link
            href="/about"
            className="text-azure inline-flex items-center gap-2 font-semibold transition-all hover:gap-3"
          >
            Learn more about us <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
