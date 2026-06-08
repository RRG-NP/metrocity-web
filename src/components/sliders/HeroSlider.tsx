"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { useReducedMotion } from "motion/react";
import { ph } from "@/data/placeholder";

const slides = [
  {
    src: ph("hero-1", 1200, 1400),
    alt: "Volunteers at a community service project [placeholder]",
  },
  {
    src: ph("hero-2", 1200, 1400),
    alt: "Members at a club fellowship event [placeholder]",
  },
  {
    src: ph("hero-3", 1200, 1400),
    alt: "Youth leaders at a workshop [placeholder]",
  },
];

export function HeroSlider() {
  const reduce = useReducedMotion();

  return (
    <Swiper
      modules={[Autoplay, EffectFade, Pagination]}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      loop
      autoplay={
        reduce
          ? false
          : {
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }
      }
      pagination={{ clickable: true }}
      className="h-full w-full"
      a11y={{ enabled: true }}
    >
      {slides.map((s, i) => (
        <SwiperSlide key={s.src}>
          <div className="relative h-full w-full">
            <Image
              src={s.src}
              alt={s.alt}
              fill
              priority={i === 0}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
