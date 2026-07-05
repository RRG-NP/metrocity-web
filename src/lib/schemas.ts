import { z } from "zod";

/** Contact form (also reused for partner enquiries). */
export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  subject: z
    .string()
    .min(2, "Please add a subject.")
    .optional()
    .or(z.literal("")),
  message: z.string().min(10, "Please write at least 10 characters."),
});

export type ContactValues = z.infer<typeof contactSchema>;

/** Membership / "express interest" form. */
export const membershipSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z
    .string()
    .min(7, "Please enter a valid phone number.")
    .max(20, "That phone number looks too long."),
  age: z
    .number({ message: "Please enter your age." })
    .int("Enter a whole number.")
    .min(18, "Rotaract membership is for ages 18 and older."),
  occupation: z.string().min(2, "Tell us what you do (student / job)."),
  interest: z.string().min(1, "Please choose an area of interest."),
  message: z
    .string()
    .max(800, "Please keep it under 800 characters.")
    .optional()
    .or(z.literal("")),
});

export type MembershipValues = z.infer<typeof membershipSchema>;

export const interestAreas = [
  "Community Service",
  "Professional Development",
  "International Service",
  "Public Image / Media",
  "Membership & Fellowship",
  "Not sure yet",
] as const;
