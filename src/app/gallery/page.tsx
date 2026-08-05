import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/sections/PageHeader";
import { InstagramFeed } from "@/components/gallery/InstagramFeed";
import { getInstagramFeed } from "@/lib/instagram";
import { socials } from "@/data/siteSettings";
import { JsonLd } from "@/components/seo/JsonLd";
import { pageMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/gallery",
  title: "Gallery",
  description:
    "Photos from the Rotaract Club of Metro City in Kathmandu - moments from our service projects, events, and fellowship, pulled live from the club's Instagram feed.",
});

const breadcrumbs = breadcrumbSchema([{ name: "Gallery", path: "/gallery" }]);

const instagram = socials.find((s) => s.icon === "instagram");
const INSTAGRAM_URL =
  instagram?.href ?? "https://www.instagram.com/rac_metrocity/";
const INSTAGRAM_HANDLE = "@rac_metrocity";

export default async function GalleryPage() {
  const media = await getInstagramFeed();

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <PageHeader
        eyebrow="Gallery"
        title="Moments of service & fellowship"
        subtitle="We're active on Instagram! Browse our latest posts below - they update automatically straight from our feed. Tap any photo to view it larger."
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
