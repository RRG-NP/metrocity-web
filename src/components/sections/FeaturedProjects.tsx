import { FolderHeart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { featuredProjects } from "@/data/projects";

export function FeaturedProjects() {
  return (
    <section className="bg-cloud py-20 lg:py-28">
      <Container>
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Featured Work"
            icon={FolderHeart}
            title="Projects making a difference"
            subtitle="A glimpse of the initiatives our members lead across Kathmandu and beyond."
          />
          <Button href="/projects" variant="outline" className="shrink-0">
            View all projects
          </Button>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProjects.map((p) => (
            <RevealItem key={p.slug} className="h-full">
              <ProjectCard project={p} className="h-full" />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
