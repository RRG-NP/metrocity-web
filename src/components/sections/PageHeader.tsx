import { Container } from "@/components/ui/Container";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { Reveal } from "@/components/ui/Reveal";

/** Inner-page hero band over the animated brand backdrop. */
export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-16 lg:pt-40 lg:pb-20">
      <AnimatedBackground overlay="brand" />
      <Container className="relative">
        <Reveal>
          <p className="eyebrow text-white/80">{eyebrow}</p>
          <h1 className="mt-3 max-w-3xl text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/85">
              {subtitle}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
