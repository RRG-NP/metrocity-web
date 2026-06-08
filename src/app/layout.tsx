import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "yet-another-react-lightbox/styles.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Preloader } from "@/components/layout/Preloader";
import { Analytics } from "@/lib/analytics";
import { siteSettings } from "@/data/siteSettings";

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
    default: `${siteSettings.clubName} — ${siteSettings.tagline}`,
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
  ],
  authors: [{ name: siteSettings.clubName }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteSettings.url,
    siteName: siteSettings.clubName,
    title: `${siteSettings.clubName} — ${siteSettings.tagline}`,
    description: siteSettings.valueProp,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteSettings.clubName} — ${siteSettings.tagline}`,
    description: siteSettings.valueProp,
  },
  alternates: { canonical: "/" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: siteSettings.clubName,
  alternateName: siteSettings.shortName,
  url: siteSettings.url,
  email: siteSettings.email,
  telephone: siteSettings.phone,
  slogan: siteSettings.motto,
  foundingDate: siteSettings.charterDate,
  founder: { "@type": "Person", name: siteSettings.charterPresident },
  parentOrganization: {
    "@type": "Organization",
    name: siteSettings.sponsorClub,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kathmandu",
    addressCountry: "NP",
  },
  sameAs: [
    "https://facebook.com/",
    "https://instagram.com/",
    "https://linkedin.com/",
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
      <body className="flex min-h-full flex-col bg-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
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
