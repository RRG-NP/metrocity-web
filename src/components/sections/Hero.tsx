"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, HandHeart } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { HeroSlider } from "@/components/sliders/HeroSlider";
import { heroItem, staggerContainer } from "@/lib/motion";
import { siteSettings } from "@/data/siteSettings";

export function Hero() {
  const reduce = useReducedMotion();

  const container = reduce ? undefined : staggerContainer(0.12, 0.1);
  const item = reduce ? undefined : heroItem;
  const initial = reduce ? false : "hidden";

  return (
    <section className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-36 lg:pb-24">
      <AnimatedBackground overlay="brand" />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Text column */}
        <motion.div
          variants={container}
          initial={initial}
          animate="show"
          className="text-white"
        >
          <motion.span
            variants={item}
            className="eyebrow inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-white backdrop-blur"
          >
            <HandHeart className="h-4 w-4" />
            {siteSettings.tagline}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-5 text-[clamp(2.5rem,6vw,4rem)] font-extrabold text-white"
          >
            Rotaract Club of{" "}
            <span className="from-gold block bg-gradient-to-r to-white bg-clip-text text-transparent">
              Metro City
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-3 text-lg font-semibold tracking-wide text-white/90"
          >
            “{siteSettings.motto}”
          </motion.p>

          <motion.p
            variants={item}
            className="mt-4 max-w-xl text-base leading-relaxed text-white/85"
          >
            {siteSettings.valueProp}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
            <Button
              href="/membership"
              size="lg"
              className="!text-cranberry hover:!bg-cloud !bg-white shadow-lg"
            >
              Join Us <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              href="/projects"
              variant="outline"
              size="lg"
              className="!border-white !bg-transparent !text-white hover:!bg-white/10"
            >
              Our Projects
            </Button>
          </motion.div>

          <motion.dl
            variants={item}
            className="mt-10 flex flex-wrap gap-8 border-t border-white/20 pt-6"
          >
            <div>
              <dt className="text-xs tracking-wide text-white/70 uppercase">
                Chartered
              </dt>
              <dd className="font-display text-xl font-bold text-white">
                {siteSettings.charterDateDisplay}
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-wide text-white/70 uppercase">
                Based in
              </dt>
              <dd className="font-display text-xl font-bold text-white">
                {siteSettings.location}
              </dd>
            </div>
            <div>
              <dt className="text-xs tracking-wide text-white/70 uppercase">
                Ages
              </dt>
              <dd className="font-display text-xl font-bold text-white">
                {siteSettings.ageBand}
              </dd>
            </div>
          </motion.dl>
        </motion.div>

        {/* Media column */}
        <motion.div
          variants={item}
          initial={initial}
          animate="show"
          className="relative"
        >
          <div className="bg-gradient-primary rounded-asym animate-float-slow relative aspect-4/5 overflow-hidden p-[3px] shadow-[var(--shadow-cranberry-40)]">
            <div className="rounded-asym h-full w-full overflow-hidden">
              <HeroSlider />
            </div>
          </div>
          {/* Decorative gold blob */}
          <div className="bg-gold/30 absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-full blur-2xl" />
        </motion.div>
      </Container>
    </section>
  );
}
