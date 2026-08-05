import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { socialIconMap } from "@/components/ui/SocialIcons";
import { navLinks, siteSettings, socials } from "@/data/siteSettings";
import { cn } from "@/lib/utils";

// The footer is the only site-wide link to /membership, /sponsors and
// /contact — the header nav deliberately omits them, and orphan pages rank
// poorly. Keep all three here.
const quickLinks = [
  ...navLinks,
  { label: "Membership", href: "/membership" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/80">
      <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link
            href="/"
            className={"group inline-flex items-center gap-2"}
            aria-label={`${siteSettings.clubName} - home`}
          >
            <div className="mb-4 flex items-center gap-3">
              <Image
                src="/logo.png"
                alt=""
                width={40}
                height={40}
                className="shrink-0"
              />
              <div className="leading-tight">
                <p className="font-display font-extrabold text-white">
                  Rotaract Club
                </p>
                <p className="text-cranberry-100 text-sm font-semibold">
                  of Metro City
                </p>
              </div>
            </div>
          </Link>
          <p className="text-sm leading-relaxed text-white/70">
            {siteSettings.valueProp}
          </p>
          <p className="text-gold mt-4 text-xs font-semibold tracking-wide uppercase">
            {siteSettings.motto}
          </p>
          <p className="mt-4 text-sm text-white/70">
            President {siteSettings.rotaractYear} ·{" "}
            <Link
              href="/about"
              className="font-semibold text-white transition-colors hover:underline"
            >
              {siteSettings.president}
            </Link>
          </p>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer">
          <h2 className="font-display mb-4 text-sm font-bold tracking-wide text-white uppercase">
            Quick Links
          </h2>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <h2 className="font-display mb-4 text-sm font-bold tracking-wide text-white uppercase">
            Contact
          </h2>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="text-cranberry-100 mt-0.5 h-4 w-4 shrink-0" />
              <span>{siteSettings.address}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-cranberry-100 h-4 w-4 shrink-0" />
              <a
                href={`mailto:${siteSettings.email}`}
                className="transition-colors hover:text-white"
              >
                {siteSettings.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-cranberry-100 h-4 w-4 shrink-0" />
              <a
                href={`tel:${siteSettings.phone.replace(/\s/g, "")}`}
                className="transition-colors hover:text-white"
              >
                {siteSettings.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="text-cranberry-100 mt-0.5 h-4 w-4 shrink-0" />
              <span>{siteSettings.meetingTime}</span>
            </li>
          </ul>
        </div>

        {/* Social + sponsor */}
        <div>
          <h2 className="font-display mb-4 text-sm font-bold tracking-wide text-white uppercase">
            Follow Us
          </h2>
          <div className="mb-6 flex gap-3">
            {socials.map((s) => {
              const Icon = socialIconMap[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="hover:bg-gradient-primary inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Icon className="h-4 w-4 text-white" />
                </a>
              );
            })}
          </div>
          <p className="text-xs leading-relaxed text-white/60">
            Sponsored by{" "}
            <a
              href="https://www.rcktmmetro.org.np/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white/90 transition-colors hover:text-white"
            >
              {siteSettings.sponsorClub}
            </a>
            . Affiliated with Rotary International · {siteSettings.district}
          </p>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/60 sm:flex-row">
          <p>
            © {year} {siteSettings.clubName}. All rights reserved.
          </p>

          <div className="flex flex-col items-center gap-1 text-center sm:items-end sm:text-right">
            <p>
              Developed by{" "}
              <a
                href="https://rrg.com.np/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-white/90 transition-colors hover:text-white"
              >
                RRG Tech
              </a>
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
