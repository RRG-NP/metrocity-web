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
      </Container>
    </section>
  );
}
