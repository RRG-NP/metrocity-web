import { z } from "zod";
import { clubIdentity } from "@/config/club.config";

/** Contact form (also reused for partner enquiries). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z
    .string()
    .trim()
    .pipe(z.email("Please enter a valid email address.")),
  subject: z
    .string()
    .trim()
    .min(2, "Please add a subject.")
    .optional()
    .or(z.literal("")),
  message: z.string().trim().min(10, "Please write at least 10 characters."),
});

export type ContactValues = z.infer<typeof contactSchema>;

/**
 * Rotaract eligibility age. `clubIdentity.ageBand` is a display string
 * ("18 and older") - this numeric constant is what the date-of-birth check
 * below actually enforces, so keep the two in sync if the club's age policy
 * ever changes.
 */
export const MIN_MEMBERSHIP_AGE = 18;

function ageFromDateOfBirth(isoDate: string): number {
  const dob = new Date(isoDate);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const hadBirthdayThisYear =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
  if (!hadBirthdayThisYear) age -= 1;
  return age;
}

export const genderOptions = [
  "Male",
  "Female",
  "Prefer not to say",
  "Other",
] as const;

export const bloodGroups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "O+",
  "O-",
  "AB+",
  "AB-",
  "Not sure",
] as const;

/**
 * Mirrors the club's standing committees (see `committees` in
 * src/data/members.ts) so a prospective member's stated interest maps to a
 * real committee they could actually join.
 */
export const interestAreas = [
  "Community Service",
  "Professional Development",
  "International Service",
  "Public Image",
  "Club Administration",
  "Membership",
  "Not sure yet",
] as const;

/** Built from club.config so a rename of the club/sponsor never drifts. */
export const referralSources = [
  `Rotary member of ${clubIdentity.sponsorClub}`,
  `Rotaract member of ${clubIdentity.clubName}`,
  "Social media",
  "Other",
] as const;

const YES_NO = ["yes", "no"] as const;

/**
 * Membership application - modelled on Rotary's standard prospective-member
 * intake. Cross-field rules (superRefine below) require a former-club name,
 * referrer name, or "please specify" gender only when the earlier answer
 * actually calls for it - see the privacy note rendered under the form for
 * how this data is shared with Rotary.
 */
export const membershipSchema = z
  .object({
    name: z.string().trim().min(2, "Please enter your full name."),
    dateOfBirth: z
      .string()
      .min(1, "Please enter your date of birth.")
      .refine(
        (val) => !Number.isNaN(new Date(val).getTime()),
        "Please enter a valid date.",
      )
      .refine(
        (val) => new Date(val).getTime() <= Date.now(),
        "Date of birth can't be in the future.",
      )
      .refine(
        (val) => ageFromDateOfBirth(val) >= MIN_MEMBERSHIP_AGE,
        `Rotaract membership at ${clubIdentity.clubName} is open to ages ${MIN_MEMBERSHIP_AGE} and older.`,
      ),
    gender: z.enum(genderOptions, { message: "Please select your gender." }),
    genderOther: z.string().trim().max(60).optional().or(z.literal("")),
    address: z.string().trim().min(5, "Please enter your full address."),
    email: z
    .string()
    .trim()
    .pipe(z.email("Please enter a valid email address.")),
    phone: z
      .string()
      .trim()
      .min(7, "Please enter a valid phone number.")
      .max(20, "That phone number looks too long.")
      .regex(
        /^[0-9+\-\s()]+$/,
        "Use digits, spaces, +, and - only.",
      ),
    bloodGroup: z.enum(bloodGroups, {
      message: "Please select your blood group.",
    }),
    previousClub: z.enum(YES_NO, {
      message:
        "Please tell us if you've been a Rotaract or Interact member before.",
    }),
    previousClubName: z.string().trim().max(120).optional().or(z.literal("")),
    referralSource: z.enum(referralSources, {
      message: "Please select how you heard about us.",
    }),
    referrerName: z.string().trim().max(120).optional().or(z.literal("")),
    interest: z.enum(interestAreas, {
      message: "Please choose an area of interest.",
    }),
    goals: z
      .string()
      .trim()
      .min(10, "Tell us a little more (at least 10 characters).")
      .max(800, "Please keep it under 800 characters."),
    willingToPayFee: z.enum(YES_NO, {
      message: "Please tell us whether you can support the membership fee.",
    }),
    message: z
      .string()
      .trim()
      .max(800, "Please keep it under 800 characters.")
      .optional()
      .or(z.literal("")),
  })
  .superRefine((values, ctx) => {
    if (values.gender === "Other" && !values.genderOther?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["genderOther"],
        message: "Please tell us how you'd like your gender recorded.",
      });
    }
    if (values.previousClub === "yes" && !values.previousClubName?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["previousClubName"],
        message: "Please tell us the name of your former club.",
      });
    }
    const referredByMember =
      values.referralSource === referralSources[0] ||
      values.referralSource === referralSources[1];
    if (referredByMember && !values.referrerName?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["referrerName"],
        message: "Please tell us who referred you.",
      });
    }
  });

export type MembershipValues = z.infer<typeof membershipSchema>;
