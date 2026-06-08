import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProjectsExplorer } from "@/components/sections/ProjectsExplorer";
import { JoinCTA } from "@/components/sections/JoinCTA";

export const metadata: Metadata = {
  title: "Projects & Events",
  description:
    "Explore the projects and events of the Rotaract Club of Metro City, organised by Avenue of Service — Club, Community, Professional Development, and International Service.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Projects & Events"
        title="Service in action"
        subtitle="Browse our work by Avenue of Service. Every project is led by members and powered by partners and volunteers."
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
