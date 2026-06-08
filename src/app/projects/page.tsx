import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProjectsExplorer } from "@/components/sections/ProjectsExplorer";
import { JoinCTA } from "@/components/sections/JoinCTA";

export const metadata: Metadata = {
  title: "Projects & Events",
  description:
    "Explore the projects and events of the Rotaract Club of Metro City — service projects, installations, health camps, fellowships and more, hosted, collaborated on, and participated in across the 2025-26 Rotary year.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects & Events"
        title="Service in action"
        subtitle="Browse our work by how we took part — projects we hosted, collaborated on, and participated in. Every one is led by members and powered by partners and volunteers."
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
