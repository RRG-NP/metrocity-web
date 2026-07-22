import { ArrowRight, Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { presidentTheme, siteSettings } from "@/data/siteSettings";
import { board } from "@/data/members";

/**
 * Homepage banner for the year's presidential theme + short message.
 * Renders only when the active tenure defines a theme (see club.config.ts).
 */
export function PresidentialTheme() {
  if (!presidentTheme) return null;

  const president = board.find((m) => m.role === "President");

  return (
    <section className="bg-ink relative isolate overflow-hidden py-20 lg:py-28">
      {/* faint brand motif */}
      <div
        aria-hidden
        className="hero-motif pointer-events-none absolute top-1/2 left-[-10%] hidden h-[46rem] w-[34rem] -translate-y-1/2 opacity-[0.05] lg:block"
      />
      <div className="bg-cranberry/25 pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full blur-3xl" />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <span className="eyebrow text-white/60">
            Presidential Theme · {siteSettings.rotaractYear}
          </span>

          <p className="font-display mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] font-extrabold">
            {presidentTheme.words.map((word) => (
              <span
                key={word}
                className="from-gold bg-gradient-to-r to-white bg-clip-text text-transparent"
              >
                {word}.
              </span>
            ))}
          </p>

          <div className="mt-7 max-w-2xl">
            <Quote
              aria-hidden
              className="text-cranberry mb-3 h-8 w-8 opacity-80"
            />
            <p className="text-lg leading-relaxed text-white/85">
              {presidentTheme.message}
            </p>
          </div>

          <p className="mt-6 text-sm text-white/60">
            — {siteSettings.president}, President {siteSettings.rotaractYear}
          </p>

          <div className="mt-8">
            <Button href="/about#presidents-message" size="lg">
              Read the President&rsquo;s vision <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>

        {president && (
          <Reveal className="mx-auto w-full max-w-sm lg:max-w-none">
            <div className="rounded-asym bg-gradient-primary p-[3px] shadow-[var(--shadow-cranberry-40)]">
              <div className="rounded-asym relative aspect-[4/5] overflow-hidden">
                <SmartImage
                  src={president.photo}
                  alt={president.name}
                  fill
                  sizes="(max-width: 1024px) 24rem, 22rem"
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
      </Container>
    </section>
  );
}
