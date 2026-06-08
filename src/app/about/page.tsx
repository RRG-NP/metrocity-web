import type { Metadata } from "next";
import Image from "next/image";
import {
  BookOpen,
  Droplets,
  HeartPulse,
  Building2,
  TreePine,
  Feather,
  Target,
  Eye,
  Compass,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/sections/PageHeader";
import { LeadershipPreview } from "@/components/sections/LeadershipPreview";
import { areasOfFocus, rotaractGoals, siteSettings } from "@/data/siteSettings";
import { ph } from "@/data/placeholder";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the Rotaract Club of Metro City — sponsored by the Rotary Club of Kathmandu Metro, chartered 17 May 2012 — our story, motto, vision, and mission.",
};

const focusIcons = [
  BookOpen,
  Droplets,
  HeartPulse,
  Building2,
  TreePine,
  Feather,
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="A little about us"
        subtitle={`${siteSettings.clubName} — young changemakers serving ${siteSettings.location} since ${siteSettings.charterDateDisplay}.`}
      />

      {/* Intro */}
      <section className="py-20 lg:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="bg-gradient-primary rounded-asym relative aspect-4/3 overflow-hidden p-[3px] shadow-[var(--shadow-azure-40)]">
              <div className="rounded-asym relative h-full w-full overflow-hidden">
                <Image
                  src={ph("about-team", 900, 700)}
                  alt="Club members together at an event"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <Reveal>
            <SectionHeading
              eyebrow="Who we are"
              title="Service, fellowship & leadership"
              subtitle={`The ${siteSettings.clubName} is a Rotaract club sponsored by the ${siteSettings.sponsorClub}.`}
            />
            <div className="text-slate mt-6 space-y-4 leading-relaxed">
              <p>
                Chartered on{" "}
                <strong className="text-ink">
                  {siteSettings.charterDateDisplay}
                </strong>{" "}
                under our charter president{" "}
                <strong className="text-ink">
                  {siteSettings.charterPresident}
                </strong>
                , our club brings together young people aged{" "}
                <strong className="text-ink">{siteSettings.ageBand}</strong> who
                are passionate about service and personal growth.
              </p>
              <p>
                Based in {siteSettings.location}, we plan and deliver
                community-focused projects, build professional skills, and form
                lasting friendships — all guided by the Rotary motto,{" "}
                <em>“{siteSettings.motto}.”</em>
              </p>
            </div>
            <dl className="mt-8 grid grid-cols-2 gap-6">
              <div className="rounded-asym-sm bg-cloud p-5">
                <dt className="text-slate text-xs tracking-wide uppercase">
                  Charter Date
                </dt>
                <dd className="font-display text-ink mt-1 text-lg font-bold">
                  {siteSettings.charterDateDisplay}
                </dd>
              </div>
              <div className="rounded-asym-sm bg-cloud p-5">
                <dt className="text-slate text-xs tracking-wide uppercase">
                  Sponsoring Club
                </dt>
                <dd className="font-display text-ink mt-1 text-sm font-bold">
                  {siteSettings.sponsorClub}
                </dd>
              </div>
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* What is Rotary / Rotaract */}
      <section className="bg-cloud py-20 lg:py-28">
        <Container className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="rounded-asym-sm h-full bg-white p-8 shadow-[var(--shadow-soft)]">
              <SectionHeading
                eyebrow="The Movement"
                icon={Sparkles}
                title="What is Rotary?"
              />
              <p className="text-slate mt-5 leading-relaxed">
                Rotary is a global network of 1.4 million neighbours, friends,
                and problem-solvers who see a world where people unite and take
                action to create lasting change. Rotary clubs bring together
                community leaders to exchange ideas and turn them into
                meaningful service.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-asym-sm h-full bg-white p-8 shadow-[var(--shadow-soft)]">
              <SectionHeading
                eyebrow="For Young Leaders"
                icon={Sparkles}
                title="What is Rotaract?"
              />
              <p className="text-slate mt-5 leading-relaxed">
                Rotaract brings together people ages {siteSettings.ageBand} to
                exchange ideas with leaders in the community, develop leadership
                and professional skills, and have fun through service. Rotaract
                clubs are partners in service — sponsored by Rotary clubs and
                shaping the next generation of changemakers.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Motto / Vision / Mission */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Our Compass"
              icon={Compass}
              align="center"
              title="Motto, Vision & Mission"
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Target,
                label: "Our Motto",
                text: `“${siteSettings.motto}.” We put the needs of our community before our own.`,
              },
              {
                icon: Eye,
                label: "Our Vision",
                text: siteSettings.vision,
              },
              {
                icon: Compass,
                label: "Our Mission",
                text: siteSettings.mission,
              },
            ].map((b) => (
              <RevealItem key={b.label}>
                <div className="rounded-asym-sm bg-gradient-primary h-full p-[2px] shadow-[var(--shadow-cranberry-20)]">
                  <div className="rounded-asym-sm h-full bg-white p-8">
                    <span className="bg-gradient-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-white">
                      <b.icon className="h-6 w-6" />
                    </span>
                    <h3 className="font-display text-ink text-xl font-bold">
                      {b.label}
                    </h3>
                    <p className="text-slate mt-3 leading-relaxed">{b.text}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Areas of focus */}
      <section className="bg-cloud py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Where We Serve"
              icon={Target}
              align="center"
              title="Our areas of focus"
              subtitle="Aligned with Rotary's causes, our projects concentrate where they make the greatest difference."
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {areasOfFocus.map((a, i) => {
              const Icon = focusIcons[i % focusIcons.length];
              return (
                <RevealItem key={a.title}>
                  <div className="rounded-asym-sm group flex h-full gap-4 bg-white p-6 shadow-[var(--shadow-soft)] transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-[var(--shadow-azure-20)]">
                    <span className="bg-azure-50 text-azure group-hover:bg-gradient-primary inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <div>
                      <h3 className="font-display text-ink font-bold">
                        {a.title}
                      </h3>
                      <p className="text-slate mt-1 text-sm leading-relaxed">
                        {a.description}
                      </p>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </Container>
      </section>

      {/* The six goals of Rotaract */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="What Guides Us"
              icon={Sparkles}
              align="center"
              title="The six goals of Rotaract"
              subtitle="Every Rotaract club is chartered to develop responsible citizens who serve their community and uphold high standards in working life."
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2">
            {rotaractGoals.map((goal, i) => (
              <RevealItem key={i}>
                <div className="rounded-asym-sm flex h-full gap-4 bg-white p-6 shadow-[var(--shadow-soft)]">
                  <span className="bg-gradient-primary font-display inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="text-slate leading-relaxed">{goal}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      <LeadershipPreview />
    </>
  );
}
