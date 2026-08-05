import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { ProjectsExplorer } from "@/components/sections/ProjectsExplorer";
import { JoinCTA } from "@/components/sections/JoinCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/projects",
  title: "Projects & Events",
  description:
    "Service projects and events by the Rotaract Club of Metro City, Kathmandu - health camps, blood drives, tree plantations, installations and fellowships, browsable by Rotary year from 2023-24 onward.",
});

const breadcrumbs = breadcrumbSchema([
  { name: "Projects & Events", path: "/projects" },
]);

export default function ProjectsPage() {
  return (
    <>
      <JsonLd data={breadcrumbs} />
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
