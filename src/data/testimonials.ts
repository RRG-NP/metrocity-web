import type { Testimonial } from "@/types";
import { ph } from "./placeholder";

/** [PLACEHOLDER] testimonials. Replace quotes, names, roles, and photos. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Joining the club gave me a second family and the confidence to lead. Every project teaches me something new.",
    author: "Rtr. Aastha K.", // [PLACEHOLDER]
    role: "Member since 2023",
    photo: ph("t1", 200, 200),
  },
  {
    quote:
      "From riverside clean-ups to winter relief, the impact is real and immediate. This is service you can see and feel.",
    author: "Rtr. Rohan B.", // [PLACEHOLDER]
    role: "Community Service Committee",
    photo: ph("t2", 200, 200),
  },
  {
    quote:
      "The professional workshops opened doors I didn't know existed. I found mentors, friends, and a path forward.",
    author: "Aaradhya S.", // [PLACEHOLDER]
    role: "Workshop Participant",
    photo: ph("t3", 200, 200),
  },
  {
    quote:
      "As a sponsor, we've watched these young leaders deliver with heart and rigour. Proud to stand behind them.",
    author: "Partner Representative", // [PLACEHOLDER]
    role: "Sponsor",
    photo: ph("t4", 200, 200),
  },
];
