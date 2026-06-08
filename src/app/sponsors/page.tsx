import type { Metadata } from "next";
import Image from "next/image";
import { Handshake, Star, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/sections/PageHeader";
import { sponsors, sponsorTiers, sponsorsByTier } from "@/data/sponsors";
import { siteSettings } from "@/data/siteSettings";

export const metadata: Metadata = {
  title: "Sponsors & Partners",
  description: `The sponsors and partners who support the Rotaract Club of Metro City — led by our sponsoring club, the ${siteSettings.sponsorClub}.`,
};

export default function SponsorsPage() {
  const featured = sponsors.find((s) => s.featured);

  return (
    <>
      <PageHeader
        eyebrow="Sponsors & Partners"
        title="Powered by partnership"
        subtitle="Our work is made possible by organisations and individuals who believe in young people and service."
      />

      {/* Featured sponsoring club */}
      {featured && (
        <section className="py-20 lg:py-28">
          <Container>
            <Reveal>
              <div className="rounded-asym bg-gradient-primary p-[2px] shadow-[var(--shadow-cranberry-40)]">
                <div className="rounded-asym grid items-center gap-8 bg-white p-8 sm:p-12 md:grid-cols-2">
                  <div>
                    <span className="eyebrow text-cranberry inline-flex items-center gap-2">
                      <Star className="h-4 w-4" /> Our Sponsoring Club
                    </span>
                    <h2 className="font-display text-ink mt-3 text-3xl font-bold">
                      {featured.name}
                    </h2>
                    <p className="text-slate mt-4 leading-relaxed">
                      As our sponsoring Rotary club, the {featured.name}{" "}
                      charters, mentors, and champions our club — anchoring
                      everything we do in the values of Rotary.
                    </p>
                    {featured.url && (
                      <Button
                        href={featured.url}
                        variant="outline"
                        className="mt-6"
                      >
                        Visit Rotary <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="bg-cloud rounded-asym-sm relative aspect-video overflow-hidden">
                    <Image
                      src={featured.logo}
                      alt={`${featured.name} logo [placeholder]`}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-contain p-8"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </Container>
        </section>
      )}

      {/* Tiered grid */}
      <section className="bg-cloud py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              eyebrow="Our Supporters"
              icon={Handshake}
              align="center"
              title="Sponsors by tier"
              subtitle="With gratitude to every Patron, Partner, and Supporter. All logos are placeholders."
            />
          </Reveal>

          <div className="mt-14 space-y-14">
            {sponsorTiers.map((tier) => {
              const list = sponsorsByTier(tier).filter((s) => !s.featured);
              if (list.length === 0) return null;
              return (
                <div key={tier}>
                  <h3 className="font-display text-ink mb-6 text-center text-xl font-bold">
                    {tier}s
                  </h3>
                  <RevealGroup className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                    {list.map((s) => (
                      <RevealItem key={s.name}>
                        <div className="rounded-asym-sm group flex aspect-video items-center justify-center bg-white p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-azure-20)]">
                          <div className="relative h-full w-full opacity-75 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0">
                            <Image
                              src={s.logo}
                              alt={`${s.name} logo [placeholder]`}
                              fill
                              sizes="200px"
                              className="object-contain"
                            />
                          </div>
                        </div>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Partner pitch */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal className="rounded-asym bg-ink overflow-hidden p-8 text-center sm:p-14">
            <h2 className="font-display mx-auto max-w-2xl text-3xl font-bold text-white sm:text-4xl">
              Partner with us
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Your support fuels education, health, and environment projects
              across Kathmandu — and helps young leaders grow. Let&apos;s create
              lasting impact together.
            </p>
            <Button
              href="/contact"
              className="!text-cranberry hover:!bg-cloud mt-8 !bg-white"
            >
              Become a partner
            </Button>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
