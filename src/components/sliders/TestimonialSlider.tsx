"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Quote } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { testimonials } from "@/data/testimonials";

export function TestimonialSlider() {
  const reduce = useReducedMotion();

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={24}
      slidesPerView={1}
      loop
      grabCursor
      autoplay={
        reduce
          ? false
          : {
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }
      }
      pagination={{ clickable: true }}
      breakpoints={{ 768: { slidesPerView: 2 } }}
      className="!pb-12"
      a11y={{ enabled: true }}
    >
      {testimonials.map((t) => (
        <SwiperSlide key={t.author} className="h-auto">
          <figure className="rounded-asym-sm flex h-full flex-col gap-5 bg-white p-8 shadow-[var(--shadow-soft)]">
            <Quote className="text-cranberry h-8 w-8" aria-hidden="true" />
            <blockquote className="text-ink flex-1 text-lg leading-relaxed">
              “{t.quote}”
            </blockquote>
            <figcaption className="flex items-center gap-4">
              <Image
                src={t.photo}
                alt={`${t.author} [placeholder]`}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-display text-ink font-bold">{t.author}</p>
                <p className="text-slate text-sm">{t.role}</p>
              </div>
            </figcaption>
          </figure>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
