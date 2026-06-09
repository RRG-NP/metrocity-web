import type { Metadata } from "next";
import {
  Award,
  Users,
  Globe,
  Network,
  Heart,
  Lightbulb,
  UserPlus,
  CalendarCheck,
  BadgeCheck,
  ChevronRight,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/sections/PageHeader";
import { MembershipForm } from "@/components/forms/MembershipForm";
import { siteSettings } from "@/data/siteSettings";

export const metadata: Metadata = {
  title: "Become a Member",
  description: `Join the Rotaract Club of Metro City. Open to young people aged ${siteSettings.ageBand} in Kathmandu who want to serve, lead, and grow.`,
};

const benefits = [
  {
    icon: Heart,
    title: "Make real impact",
    text: "Lead and join projects that change lives across Kathmandu.",
  },
  {
    icon: Award,
    title: "Grow as a leader",
    text: "Take on roles, run committees, and build real-world skills.",
  },
  {
    icon: Network,
    title: "Expand your network",
    text: "Meet driven peers, mentors, and professionals.",
  },
  {
    icon: Globe,
    title: "Go global",
    text: "Connect with Rotaract and Rotary clubs worldwide.",
  },
  {
    icon: Lightbulb,
    title: "Learn by doing",
    text: "Workshops, training, and hands-on experience.",
  },
  {
    icon: Users,
    title: "Find your people",
    text: "Fellowship and friendships that last a lifetime.",
  },
];

const steps = [
  {
    icon: UserPlus,
    title: "Express interest",
    text: "Fill out the form below and tell us a bit about yourself.",
  },
  {
    icon: CalendarCheck,
    title: "Attend a meeting",
    text: "Join us at a club meeting or project to see what we're about.",
  },
  {
    icon: BadgeCheck,
    title: "Get inducted",
    text: "Complete a short orientation and become an official member.",
  },
];

export default function MembershipPage() {
  return (
    <>
      <PageHeader
        eyebrow="Join Us"
        title="Become a member"
        subtitle={`If you're aged ${siteSettings.ageBand} and ready to connect, grow, and give - there's a place for you in our club.`}
      />

      {/* Why join */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Why Join"
              icon={Heart}
              align="center"
              title="What you'll gain"
              subtitle="Membership is about giving back - and growing while you do it."
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <RevealItem key={b.title}>
                <div className="rounded-asym-sm group h-full bg-white p-6 shadow-[var(--shadow-soft)] transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-[var(--shadow-cranberry-20)]">
                  <span className="bg-gradient-primary mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-white transition-transform duration-300 group-hover:scale-110">
                    <b.icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-display text-ink font-bold">{b.title}</h3>
                  <p className="text-slate mt-2 text-sm leading-relaxed">
                    {b.text}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Eligibility */}
      <section className="bg-cloud py-16 lg:py-20">
        <Container>
          <Reveal className="rounded-asym bg-gradient-primary p-[2px]">
            <div className="rounded-asym flex flex-col items-center gap-4 bg-white p-8 text-center sm:p-12">
              <span className="bg-azure-50 text-azure eyebrow rounded-full px-4 py-1.5">
                Eligibility
              </span>
              <h2 className="font-display text-ink text-2xl font-bold sm:text-3xl">
                Open to young people aged {siteSettings.ageBand}
              </h2>
              <p className="text-slate max-w-2xl">
                Rotaract welcomes anyone aged {siteSettings.ageBand} - students
                and professionals alike - who shares our commitment to{" "}
                <em>“{siteSettings.motto}.”</em> No prior experience needed,
                just the willingness to show up and serve.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* How to join */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="How to Join"
              icon={ChevronRight}
              align="center"
              title="Three simple steps"
            />
          </Reveal>
          <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <RevealItem key={s.title}>
                <div className="rounded-asym-sm relative h-full bg-white p-8 shadow-[var(--shadow-soft)]">
                  <span className="bg-gradient-primary font-display absolute -top-4 left-8 inline-flex h-9 items-center justify-center rounded-full px-3 text-sm font-bold text-white">
                    Step {i + 1}
                  </span>
                  <span className="text-cranberry bg-cranberry-50 mt-2 inline-flex h-12 w-12 items-center justify-center rounded-xl">
                    <s.icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-display text-ink mt-4 text-lg font-bold">
                    {s.title}
                  </h3>
                  <p className="text-slate mt-2 text-sm leading-relaxed">
                    {s.text}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </Container>
      </section>

      {/* Form */}
      <section className="bg-cloud py-20 lg:py-28">
        <Container className="max-w-3xl">
          <Reveal>
            <SectionHeading
              eyebrow="Express Interest"
              icon={UserPlus}
              align="center"
              title="Start your journey"
              subtitle="Fill in the form and our Membership Committee will be in touch. (Submissions are logged by a stub handler - wire a real email/provider later.)"
            />
          </Reveal>
          <div className="mt-10">
            <MembershipForm />
          </div>
        </Container>
      </section>
    </>
  );
}
