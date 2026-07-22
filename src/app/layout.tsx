import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "yet-another-react-lightbox/styles.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";
import { ServiceWorkerManager } from "@/components/pwa/ServiceWorkerManager";
import { Analytics } from "@/lib/analytics";
import { presidentTheme, siteSettings, socials } from "@/data/siteSettings";
import { currentTenure } from "@/config/club.config";
import { board } from "@/data/members";

/** Developer credit — surfaced in metadata + structured data for attribution. */
const developer = { name: "RRG Tech", url: "https://rrg.com.np/" } as const;

const presidentMember = board.find((m) => m.role === "President");
/** Clean display name without the "Rtr." honorific, for schema.org. */
const presidentName = siteSettings.president.replace(/^Rtr\.\s*/, "");

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteSettings.url),
  title: {
    default: `${siteSettings.clubName} - ${siteSettings.tagline}`,
    template: `%s · ${siteSettings.shortName}`,
  },
  description: siteSettings.valueProp,
  keywords: [
    "Rotaract",
    "Rotary",
    "Kathmandu",
    "Nepal",
    "youth service club",
    "volunteering",
    "community service",
    siteSettings.clubName,
    siteSettings.shortName,
    presidentName,
    `${presidentName} Rotaract`,
    `${siteSettings.clubName} president`,
    ...(presidentTheme ? [presidentTheme.title] : []),
    siteSettings.sponsorClub,
    siteSettings.district,
  ],
  authors: [{ name: siteSettings.clubName, url: siteSettings.url }],
  creator: developer.name,
  publisher: siteSettings.clubName,
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/icons/apple-touch-icon.png",
  },
  appleWebApp: {
    title: siteSettings.shortName,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteSettings.url,
    siteName: siteSettings.clubName,
    title: `${siteSettings.clubName} - ${siteSettings.tagline}`,
    description: siteSettings.valueProp,
    images: [
      {
        url: "/logo-full.png",
        width: 800,
        height: 320,
        alt: siteSettings.clubName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteSettings.clubName} - ${siteSettings.tagline}`,
    description: siteSettings.valueProp,
    images: ["/logo-full.png"],
  },
  alternates: { canonical: "/" },
};

// themeColor/viewport must live in the `viewport` export in this Next version
// (deprecated inside `metadata`) — see docs/PWA.md.
export const viewport: Viewport = {
  themeColor: "#de1675",
  width: "device-width",
  initialScale: 1,
  // Let the brand gradient extend under notches/dynamic islands; the hero
  // pads itself with safe-area insets.
  viewportFit: "cover",
};

const orgId = `${siteSettings.url}/#organization`;
const websiteId = `${siteSettings.url}/#website`;
const presidentId = `${siteSettings.url}/#president`;

// A schema.org @graph: the club (NGO), its current President (emphasised as a
// linked Person + OrganizationRole), and the WebSite with its developer credit.
// This is what Google's knowledge panel and LLM crawlers read.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "NGO",
      "@id": orgId,
      name: siteSettings.clubName,
      alternateName: siteSettings.shortName,
      url: siteSettings.url,
      email: siteSettings.email,
      telephone: siteSettings.phone,
      slogan: siteSettings.motto,
      description: siteSettings.valueProp,
      foundingDate: siteSettings.charterDate,
      logo: `${siteSettings.url}/logo-full.png`,
      image: `${siteSettings.url}/logo-full.png`,
      founder: { "@type": "Person", name: siteSettings.charterPresident },
      parentOrganization: {
        "@type": "Organization",
        name: siteSettings.sponsorClub,
        url: siteSettings.sponsorClubUrl,
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: siteSettings.meetingVenue,
        addressLocality: "Kathmandu",
        addressRegion: "Bagmati",
        addressCountry: "NP",
      },
      areaServed: siteSettings.location,
      member: {
        "@type": "OrganizationRole",
        roleName: "President",
        startDate: currentTenure.startDate,
        endDate: currentTenure.endDate,
        member: { "@id": presidentId },
      },
      sameAs: socials
        .map((s) => s.href)
        .filter((href) => href.startsWith("http")),
    },
    {
      "@type": "Person",
      "@id": presidentId,
      name: presidentName,
      honorificPrefix: "Rtr.",
      jobTitle: `President ${siteSettings.rotaractYear}`,
      ...(presidentTheme?.presidentUrl
        ? { url: presidentTheme.presidentUrl }
        : {}),
      ...(presidentMember ? { image: presidentMember.photo } : {}),
      worksFor: { "@id": orgId },
      memberOf: { "@id": orgId },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteSettings.url,
      name: siteSettings.clubName,
      inLanguage: "en",
      publisher: { "@id": orgId },
      creator: {
        "@type": "Organization",
        name: developer.name,
        url: developer.url,
      },
      maintainer: {
        "@type": "Organization",
        name: developer.name,
        url: developer.url,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} h-full`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-full flex-col bg-white antialiased"
        suppressHydrationWarning
      >
        {/* Runs before paint so the page starts in the right state:
            - `js`         → enables scroll-reveal hiding (no-JS keeps content visible).
            - `preloading` → first visit this session; holds the hero entrance
                             paused and covered until the Preloader lifts.
            - `preloaded`  → already seen this session; skip the preloader.
            The 4s fallback releases the hero even if hydration never runs, so
            content is never gated on JS. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');" +
              "try{document.documentElement.classList.add(sessionStorage.getItem('rcmc-preloaded')?'preloaded':'preloading')}catch(e){document.documentElement.classList.add('preloading')}" +
              "setTimeout(function(){document.documentElement.classList.remove('preloading');var p=document.querySelector('[data-preloader]');if(p){p.style.display='none'}},4000);",
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <ServiceWorkerManager />
        <Preloader />
        <a
          href="#main"
          className="bg-cranberry sr-only z-[110] rounded-br-lg px-4 py-2 font-semibold text-white focus:not-sr-only focus:absolute focus:top-0 focus:left-0"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
