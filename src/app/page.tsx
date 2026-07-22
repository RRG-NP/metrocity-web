import { Hero } from "@/components/sections/Hero";
import { PresidentialTheme } from "@/components/sections/PresidentialTheme";
import { Objectives } from "@/components/sections/Objectives";
import { Stats } from "@/components/sections/Stats";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { LeadershipPreview } from "@/components/sections/LeadershipPreview";
import { JoinCTA } from "@/components/sections/JoinCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <span id="after-hero" aria-hidden className="block" />
      <PresidentialTheme />
      <Objectives />
      <Stats />
      <FeaturedProjects />
      {/* <VideoSection /> — re-enable once a real club video replaces the
          placeholder embed in components/sections/VideoSection.tsx */}
      <LeadershipPreview />
      {/* <Testimonials /> */}
      {/* <SponsorsStrip /> */}
      <JoinCTA />
    </>
  );
}
