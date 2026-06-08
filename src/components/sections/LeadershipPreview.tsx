import { Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { TeamSlider } from "@/components/sliders/TeamSlider";
import { board } from "@/data/members";
import { siteSettings } from "@/data/siteSettings";

export function LeadershipPreview() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Leadership"
            icon={Users}
            title={`Meet the ${siteSettings.rotaractYear} board`}
            subtitle="The volunteers steering the club this Rotary year."
          />
          <Button href="/members" variant="outline" className="shrink-0">
            All members
          </Button>
        </Reveal>

        <div className="mt-12">
          <TeamSlider members={board} />
        </div>
      </Container>
    </section>
  );
}
