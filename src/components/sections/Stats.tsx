import { Container } from "@/components/ui/Container";
import { StatCounter } from "@/components/ui/StatCounter";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { stats } from "@/data/siteSettings";

export function Stats() {
  return (
    <section
      className="relative isolate overflow-hidden py-16 lg:py-20"
      aria-label="Our impact"
    >
      <div className="bg-gradient-primary-135 absolute inset-0 -z-10" />
      <Container>
        <RevealGroup className="grid grid-cols-2 gap-8 text-center lg:grid-cols-4">
          {stats.map((s) => (
            <RevealItem key={s.label}>
              <div>
                <p className="font-display text-4xl font-extrabold text-white sm:text-5xl">
                  <StatCounter
                    value={s.value}
                    prefix={s.prefix}
                    suffix={s.suffix}
                  />
                </p>
                <p className="mt-2 text-sm font-semibold tracking-wide text-white/85 uppercase">
                  {s.label}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mt-8 text-center text-xs text-white/70">
          Impact figures are placeholders — update them in{" "}
          <code className="rounded bg-white/15 px-1.5 py-0.5">
            src/data/siteSettings.ts
          </code>
          .
        </p>
      </Container>
    </section>
  );
}
