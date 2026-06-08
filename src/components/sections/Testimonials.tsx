import { MessageSquareQuote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TestimonialSlider } from "@/components/sliders/TestimonialSlider";

export function Testimonials() {
  return (
    <section className="bg-cloud py-20 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Voices"
            icon={MessageSquareQuote}
            align="center"
            title="What our community says"
            subtitle="Members, participants, and partners on what the club means to them."
          />
        </Reveal>
        <div className="mt-12">
          <TestimonialSlider />
        </div>
      </Container>
    </section>
  );
}
