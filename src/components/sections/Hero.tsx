import { ArrowRight, ChevronDown, HandHeart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { siteSettings } from "@/data/siteSettings";
import Image from "next/image";

export function Hero() {
  // const facts = [
  //   { label: "Chartered", value: siteSettings.charterDateDisplay },
  //   { label: "Based in", value: siteSettings.location },
  //   { label: "Members aged", value: siteSettings.ageBand },
  //   { label: "District", value: "3292" },
  // ];

  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden supports-[min-height:100dvh]:min-h-dvh">
      <AnimatedBackground overlay="brand" />

      {/* soft depth glows */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="bg-gold/20 pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full blur-3xl" />

      <Container className="relative flex flex-1 flex-col items-center justify-center pt-[max(6.5rem,env(safe-area-inset-top))] pb-6 text-center">
        <div className="rise-in mb-[clamp(0.75rem,2vh,1.5rem)]">
          <Image
            src="/wheel-white.png"
            alt=""
            width={50}
            height={50}
            preload
            className="h-[clamp(2.5rem,5vh,3.25rem)] w-auto"
          />
        </div>

        <span
          className="rise-in eyebrow inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-white/90 backdrop-blur"
          style={{ animationDelay: "0.06s" }}
        >
          <HandHeart className="h-4 w-4" />
          {siteSettings.tagline}
        </span>

        <h1
          className="rise-in mt-[clamp(1rem,2.5vh,1.5rem)] max-w-6xl text-[clamp(2.5rem,5vw+1.5rem,4.75rem)] leading-[1.04] font-extrabold text-white"
          style={{ animationDelay: "0.14s" }}
        >
          Rotaract Club of{" "}
          <span className="from-gold bg-gradient-to-r to-white bg-clip-text text-transparent">
            Metro City
          </span>
        </h1>

        <p
          className="rise-in mt-[clamp(0.9rem,2vh,1.25rem)] text-[clamp(1rem,1.5vw+0.5rem,1.25rem)] font-semibold tracking-wide text-white/90"
          style={{ animationDelay: "0.22s" }}
        >
          “{siteSettings.motto}”
        </p>

        <p
          className="rise-in mx-auto mt-[clamp(0.75rem,2vh,1rem)] max-w-2xl text-[clamp(0.95rem,1vw+0.6rem,1.1rem)] leading-relaxed text-white/80"
          style={{ animationDelay: "0.3s" }}
        >
          {siteSettings.valueProp}
        </p>

        <div
          className="rise-in mt-[clamp(1.5rem,3.5vh,2.25rem)] flex flex-wrap justify-center gap-4"
          style={{ animationDelay: "0.38s" }}
        >
          <Button href="/membership" size="lg">
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

        <p
          className="rise-in mt-[clamp(1.25rem,3vh,2rem)] text-sm text-white/70"
          style={{ animationDelay: "0.46s" }}
        >
          Led this year by{" "}
          <a
            href="https://www.rohanrajgautam.com.np/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white hover:underline"
          >
            {siteSettings.president}
          </a>
          , President {siteSettings.rotaractYear}
        </p>
      </Container>

      <Container className="relative pb-[max(1.25rem,env(safe-area-inset-bottom))]">
        <a
          href="#after-hero"
          aria-label="Scroll to content"
          className="scroll-cue mx-auto mt-[clamp(0.75rem,2vh,1.5rem)] flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
        >
          <ChevronDown className="h-5 w-5" />
        </a>
      </Container>
    </section>
  );
}
