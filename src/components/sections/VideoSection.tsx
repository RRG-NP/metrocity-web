import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { VideoLightbox } from "@/components/gallery/VideoLightbox";
import { ph } from "@/data/placeholder";
import { PlayCircle } from "lucide-react";

export function VideoSection() {
  return (
    <section className="relative isolate overflow-hidden py-20 lg:py-28">
      <AnimatedBackground overlay="ink" />
      <Container className="relative grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <SectionHeading
            light
            eyebrow="Service Above Self"
            icon={PlayCircle}
            title="See service in motion"
            subtitle="From riverbanks to classrooms, watch how our members turn an afternoon of effort into lasting change for the community."
          />
          <p className="mt-6 text-sm text-white/70">
            Video is a placeholder embed — set the real URL on the{" "}
            <code className="rounded bg-white/15 px-1.5 py-0.5">
              VideoSection
            </code>{" "}
            component.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {/* [PLACEHOLDER] video — replace with the club's real embed URL */}
          <VideoLightbox
            poster={ph("video-poster", 1280, 720)}
            videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Rotaract Club of Metro City — Service Above Self"
          />
        </Reveal>
      </Container>
    </section>
  );
}
