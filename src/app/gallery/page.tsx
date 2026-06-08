import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photo gallery of the Rotaract Club of Metro City — moments from our projects, events, and fellowship, organised into albums by year.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Moments of service & fellowship"
        subtitle="Browse albums from our projects and events. Click any album to open the lightbox. All photos are placeholders."
      />
      <section className="py-16 lg:py-24">
        <Container>
          <GalleryGrid />
        </Container>
      </section>
    </>
  );
}
