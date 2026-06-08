import { ArrowRight, HandHeart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CogWheel } from "@/components/ui/CogWheel";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { siteSettings } from "@/data/siteSettings";

/**
 * Hero — minimal, centered, brand-gradient backdrop.
 * Entrance is CSS-driven (`.rise-in`) so content is never gated on JS;
 * `prefers-reduced-motion` collapses it to the final visible state.
 */
export function Hero() {
  const facts = [
    { label: "Chartered", value: siteSettings.charterDateDisplay },
    { label: "Based in", value: siteSettings.location },
    { label: "Members aged", value: siteSettings.ageBand },
  ];

  return (
    <section className="relative isolate overflow-hidden">
      <AnimatedBackground overlay="brand" />

      {/* soft depth glows */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="bg-gold/20 pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full blur-3xl" />

      <Container className="relative flex flex-col items-center pt-36 pb-24 text-center lg:pt-44 lg:pb-32">
        <div className="rise-in mb-6">
          <CogWheel className="h-14 w-14" />
        </div>

        <span
          className="rise-in eyebrow inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-white/90 backdrop-blur"
          style={{ animationDelay: "0.06s" }}
        >
          <HandHeart className="h-4 w-4" />
          {siteSettings.tagline}
        </span>

        <h1
          className="rise-in mt-6 max-w-4xl text-[clamp(2.4rem,6vw,4.25rem)] leading-[1.05] font-extrabold text-white"
          style={{ animationDelay: "0.14s" }}
        >
          Rotaract Club of{" "}
          <span className="from-gold bg-gradient-to-r to-white bg-clip-text text-transparent">
            Metro City
          </span>
        </h1>

        <p
          className="rise-in mt-5 text-lg font-semibold tracking-wide text-white/90"
          style={{ animationDelay: "0.22s" }}
        >
          “{siteSettings.motto}”
        </p>

        <p
          className="rise-in mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80"
          style={{ animationDelay: "0.3s" }}
        >
          {siteSettings.valueProp}
        </p>

        <div
          className="rise-in mt-9 flex flex-wrap justify-center gap-4"
          style={{ animationDelay: "0.38s" }}
        >
          <Button
            href="/membership"
            size="lg"
            className="!text-cranberry hover:!bg-cloud !bg-white shadow-lg"
          >
            Join Us <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            href="/projects"
            variant="outline"
            size="lg"
            className="!border-white/70 !bg-transparent !text-white hover:!bg-white/10"
          >
            Our Projects
          </Button>
        </div>

        <dl
          className="rise-in mx-auto mt-14 grid w-full max-w-2xl grid-cols-3 gap-4 border-t border-white/15 pt-8"
          style={{ animationDelay: "0.46s" }}
        >
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="text-[0.68rem] tracking-wide text-white/65 uppercase">
                {f.label}
              </dt>
              <dd className="font-display mt-1 text-base font-bold text-white sm:text-lg">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
