"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { MemberCard } from "@/components/ui/MemberCard";
import type { Member } from "@/types";

export function TeamSlider({ members }: { members: Member[] }) {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={24}
      slidesPerView={1.15}
      grabCursor
      loop
      autoplay={false}
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 2.2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
      className="!pb-12"
      a11y={{ enabled: true }}
    >
      {members.map((m) => (
        <SwiperSlide key={m.name}>
          <div className="p-2">
            <MemberCard member={m} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
