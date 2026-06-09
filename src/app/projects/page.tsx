import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProjectsExplorer } from "@/components/sections/ProjectsExplorer";
import { JoinCTA } from "@/components/sections/JoinCTA";

export const metadata: Metadata = {
  title: "Projects & Events",
  description:
    "Explore the projects and events of the Rotaract Club of Metro City - service projects, installations, health camps, fellowships and more, browsable by Rotary year from 2023-24 onward.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects & Events"
        title="Service in action"
        subtitle="Browse our work by Rotary year. Every project is led by members and powered by partners and volunteers - from health camps and installations to fellowships and trainings."
      />
      <section className="py-16 lg:py-24">
        <Container>
          <ProjectsExplorer />
        </Container>
      </section>
      <JoinCTA />
    </>
  );
}
