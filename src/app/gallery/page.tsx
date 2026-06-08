import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { InstagramFeed } from "@/components/gallery/InstagramFeed";
import { getInstagramFeed } from "@/lib/instagram";
import { socials } from "@/data/siteSettings";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from the Rotaract Club of Metro City — moments from our projects, events, and fellowship, pulled live from our Instagram.",
};

const instagram = socials.find((s) => s.icon === "instagram");
const INSTAGRAM_URL =
  instagram?.href ?? "https://www.instagram.com/rac_metrocity/";
const INSTAGRAM_HANDLE = "@rac_metrocity";

export default async function GalleryPage() {
  const media = await getInstagramFeed();

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Moments of service & fellowship"
        subtitle="We're active on Instagram! Browse our latest posts below — they update automatically straight from our feed. Tap any photo to view it larger."
      />
      <section className="py-16 lg:py-24">
        <Container>
          <InstagramFeed
            media={media}
            profileUrl={INSTAGRAM_URL}
            handle={INSTAGRAM_HANDLE}
          />
        </Container>
      </section>
    </>
  );
}
