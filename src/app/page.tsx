import { Hero } from "@/components/sections/Hero";
import { Objectives } from "@/components/sections/Objectives";
import { Stats } from "@/components/sections/Stats";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { VideoSection } from "@/components/sections/VideoSection";
import { LeadershipPreview } from "@/components/sections/LeadershipPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { SponsorsStrip } from "@/components/sections/SponsorsStrip";
import { JoinCTA } from "@/components/sections/JoinCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Objectives />
      <Stats />
      <FeaturedProjects />
      <VideoSection />
      <LeadershipPreview />
      <Testimonials />
      <SponsorsStrip />
      <JoinCTA />
    </>
  );
}
