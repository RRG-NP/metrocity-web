import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { siteSettings } from "@/data/siteSettings";

export function JoinCTA() {
  return (
    <section className="relative isolate overflow-hidden py-20 lg:py-28">
      <AnimatedBackground overlay="brand" />
      <Container className="relative text-center">
        <Reveal>
          <h2 className="mx-auto max-w-4xl text-[clamp(1.9rem,4vw,3rem)] font-extrabold text-white">
            Connect. Grow. Give Back.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/90">
            If you&rsquo;re aged {siteSettings.ageBand}, discover opportunities to
            build friendships, develop new skills, and make a lasting impact in
            Kathmandu.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/membership" size="lg" className="">
              Become a Member <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="!border-white !bg-transparent !text-white hover:!bg-white/10"
            >
              Get in touch
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
