import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PageHeader } from "@/components/sections/PageHeader";
import { ContactForm } from "@/components/forms/ContactForm";
import { socialIconMap } from "@/components/ui/SocialIcons";
import { siteSettings, socials } from "@/data/siteSettings";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the Rotaract Club of Metro City in ${siteSettings.location}. Reach us by email, phone, or visit one of our meetings.`,
};

const details = [
  {
    icon: Mail,
    label: "Email",
    value: siteSettings.email,
    href: `mailto:${siteSettings.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteSettings.phone,
    href: `tel:${siteSettings.phone.replace(/\s/g, "")}`,
  },
  { icon: MapPin, label: "Address", value: siteSettings.address },
  {
    icon: Clock,
    label: "Meetings",
    value: `${siteSettings.meetingTime} · ${siteSettings.meetingVenue}`,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        subtitle="Questions, partnership ideas, or just want to say hello? We'd love to hear from you."
      />

      <section className="py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-2">
          {/* Details */}
          <Reveal>
            <SectionHeading
              eyebrow="Reach Us"
              icon={Send}
              title="Club details"
              subtitle="Reach us by email or phone, or join us at one of our meetings."
            />

            <ul className="mt-8 space-y-5">
              {details.map((d) => (
                <li key={d.label} className="flex items-start gap-4">
                  <span className="bg-cranberry-50 text-cranberry inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                    <d.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-slate text-xs tracking-wide uppercase">
                      {d.label}
                    </p>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="text-ink hover:text-cranberry font-semibold"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="text-ink font-semibold">{d.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* Socials */}
            <div className="mt-8">
              <p className="text-slate mb-3 text-xs tracking-wide uppercase">
                Follow us
              </p>
              <div className="flex gap-3">
                {socials.map((s) => {
                  const Icon = socialIconMap[s.icon];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="bg-cloud text-ink hover:bg-gradient-primary inline-flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:text-white"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Map */}
            <div className="rounded-asym-sm mt-8 overflow-hidden shadow-[var(--shadow-soft)]">
              <iframe
                src={siteSettings.mapEmbedSrc}
                title={`Map of ${siteSettings.location}`}
                className="h-64 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <SectionHeading
              eyebrow="Send a Message"
              icon={Mail}
              title="Drop us a line"
            />
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
