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
  Quote,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/sections/PageHeader";
import { LeadershipPreview } from "@/components/sections/LeadershipPreview";
import {
  areasOfFocus,
  presidentTheme,
  rotaractGoals,
  siteSettings,
} from "@/data/siteSettings";
import { board } from "@/data/members";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about the Rotaract Club of Metro City - sponsored by the Rotary Club of Kathmandu Metro, chartered 17 May 2012 - our story, motto, vision, and the 2026-27 presidential theme, Evolve. Empower. Execute.",
};

const focusIcons = [
  BookOpen,
  Droplets,
  HeartPulse,
  Building2,
  TreePine,
  Feather,
];

// Intro image. Placeholder for now — drop a real group photo at
// public/images/group-2026.jpg and point this at "/images/group-2026.jpg".
const GROUP_PHOTO = "/logo-white.png";

export default function AboutPage() {
  const president = board.find((m) => m.role === "President");

  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="A little about us"
        subtitle={`${siteSettings.clubName} - young changemakers serving ${siteSettings.location} since ${siteSettings.charterDateDisplay}.`}
      />

      {/* Intro */}
      <section className="py-20 lg:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-asym relative aspect-square overflow-hidden p-[3px] shadow-[var(--shadow-azure-40)]">
              <div className="rounded-asym relative h-full w-full overflow-hidden">
                <Image
                  src={GROUP_PHOTO}
                  alt={`Members of the ${siteSettings.clubName} together at an event`}
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
              subtitle={
                <>
                  The {siteSettings.clubName} is a Rotaract club sponsored by the{" "}
                  <a
                    href={siteSettings.sponsorClubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cranberry hover:underline"
                  >
                    {siteSettings.sponsorClub}
                  </a>
                  .
                </>
              }
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
                lasting friendships - all guided by the Rotary motto,{" "}
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
                  <a
                    href={siteSettings.sponsorClubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cranberry hover:underline"
                  >
                    {siteSettings.sponsorClub}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* President's Message */}
      {presidentTheme && (
        <section
          id="presidents-message"
          className="bg-ink relative isolate scroll-mt-24 overflow-hidden py-20 lg:py-28"
        >
          <div
            aria-hidden
            className="hero-motif pointer-events-none absolute top-1/2 right-[-8%] hidden h-[46rem] w-[34rem] -translate-y-1/2 opacity-[0.05] lg:block"
          />
          <div className="bg-cranberry/25 pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl" />

          <Container className="relative">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr]">
              {/* President portrait */}
              {president && (
                <Reveal className="mx-auto w-full max-w-sm lg:mx-0">
                  <div className="rounded-asym bg-gradient-primary p-[3px] shadow-[var(--shadow-cranberry-40)]">
                    <div className="rounded-asym relative aspect-[4/5] overflow-hidden">
                      <SmartImage
                        src={president.photo}
                        alt={president.name}
                        fill
                        // sizes="(max-width: 1024px) 24rem, 22rem"
                        className="object-cover"
                      />
                      <div className="from-ink/85 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                        <p className="font-display text-lg font-bold">
                          {president.name}
                        </p>
                        <p className="text-sm text-white/80">
                          President · {siteSettings.rotaractYear}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              )}

              {/* Message + theme */}
              <Reveal delay={0.1}>
                <SectionHeading
                  light
                  eyebrow={`President's Message · ${siteSettings.rotaractYear}`}
                  icon={Quote}
                  title={
                    <span className="flex flex-wrap gap-x-3 gap-y-1">
                      {presidentTheme.words.map((word) => (
                        <span
                          key={word}
                          className="from-gold bg-gradient-to-r to-white bg-clip-text text-transparent"
                        >
                          {word}.
                        </span>
                      ))}
                    </span>
                  }
                />
                <p className="mt-6 leading-relaxed text-white/85">
                  {presidentTheme.extendedMessage}
                </p>

                {/* Vision highlight */}
                <div className="rounded-asym-sm bg-cranberry/10 border-cranberry/30 mt-8 border p-6">
                  <span className="eyebrow text-gold flex items-center gap-2">
                    <Eye className="h-4 w-4" /> Our Vision
                  </span>
                  <p className="mt-3 leading-relaxed text-white/90">
                    {presidentTheme.vision}
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Presidential goals */}
            <div className="mt-14">
              <Reveal>
                <h3 className="font-display text-center text-2xl font-bold text-white sm:text-left">
                  Our goals this year
                </h3>
              </Reveal>
              <RevealGroup className="mt-8 grid gap-4 md:grid-cols-2">
                {presidentTheme.goals.map((goal, i) => (
                  <RevealItem key={i}>
                    <div className="rounded-asym-sm flex h-full items-start gap-4 bg-white/5 p-5 ring-1 ring-white/10">
                      <CheckCircle2 className="text-gold mt-0.5 h-6 w-6 shrink-0" />
                      <p className="leading-relaxed text-white/85">{goal}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </Container>
        </section>
      )}

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
                clubs are partners in service - sponsored by Rotary clubs and
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
