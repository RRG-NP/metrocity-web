import Link from "next/link";
import { Handshake, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SponsorMarquee } from "@/components/sliders/SponsorMarquee";

export function SponsorsStrip() {
  return (
    <section className="bg-cloud py-16 lg:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Our Supporters"
            icon={Handshake}
            align="center"
            title="Proudly supported by"
            subtitle="Partners and sponsors who make our service possible."
          />
        </Reveal>
      </Container>
      <div className="mt-12">
        <SponsorMarquee />
      </div>
      <Container className="mt-10 text-center">
        <Link
          href="/sponsors"
          className="text-azure inline-flex items-center gap-2 font-semibold transition-all hover:gap-3"
        >
          Become a partner <ArrowRight className="h-4 w-4" />
        </Link>
      </Container>
    </section>
  );
}
