"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import {
  membershipSchema,
  interestAreas,
  genderOptions,
  bloodGroups,
  referralSources,
  MIN_MEMBERSHIP_AGE,
  type MembershipValues,
} from "@/lib/schemas";
import { Button } from "@/components/ui/Button";
import { Field } from "./ContactForm";
import { event as trackEvent } from "@/lib/analytics";

const inputBase =
  "w-full rounded-xl border border-slate/25 bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-cranberry focus-visible:outline-none";
const selectBase = inputBase;
const radioRow = "flex items-center gap-2";
const radioInput = "h-4 w-4 cursor-pointer accent-cranberry";
const radioLabel = "text-ink cursor-pointer";

const FALLBACK_ERROR =
  "Something went wrong sending your application. Please try again in a moment.";

export function MembershipForm() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<MembershipValues>({ resolver: zodResolver(membershipSchema) });

  const gender = watch("gender");
  const previousClub = watch("previousClub");
  const referralSource = watch("referralSource");

  const onSubmit = async (values: MembershipValues) => {
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "membership", ...values }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || FALLBACK_ERROR);
      }
      trackEvent("membership_submit");
      reset();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : FALLBACK_ERROR);
    }
  };

  if (isSubmitSuccessful) {
    return (
      <div className="rounded-asym-sm flex flex-col items-center gap-3 bg-white p-10 text-center shadow-[var(--shadow-soft)]">
        <CheckCircle2 className="text-cranberry h-14 w-14" />
        <h3 className="font-display text-ink text-xl font-bold">
          Application received - welcome aboard!
        </h3>
        <p className="text-slate max-w-md">
          Thank you for your interest in joining the Rotaract Club of Metro
          City. Our Membership Committee will review your application and
          reach out with next steps.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-asym-sm space-y-6 bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8"
    >
      {/* Personal Information */}
      <div>
        <h3 className="font-display text-ink mb-4 text-lg font-bold">
          Personal Information
        </h3>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Full Name"
            error={errors.name?.message}
            htmlFor="m-name"
          >
            <input id="m-name" className={inputBase} {...register("name")} />
          </Field>
          <Field
            label="Date of Birth"
            error={errors.dateOfBirth?.message}
            htmlFor="m-dob"
          >
            <input
              id="m-dob"
              type="date"
              className={inputBase}
              {...register("dateOfBirth")}
            />
            <p className="text-slate mt-1 text-xs">
              You must be {MIN_MEMBERSHIP_AGE}+ to join.
            </p>
          </Field>
          <Field
            label="Gender"
            error={errors.gender?.message}
            htmlFor="m-gender"
          >
            <select
              id="m-gender"
              className={selectBase}
              defaultValue=""
              {...register("gender")}
            >
              <option value="" disabled>
                Choose one…
              </option>
              {genderOptions.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </Field>
          <Field
            label="Blood Group"
            error={errors.bloodGroup?.message}
            htmlFor="m-blood"
          >
            <select
              id="m-blood"
              className={selectBase}
              defaultValue=""
              {...register("bloodGroup")}
            >
              <option value="" disabled>
                Choose one…
              </option>
              {bloodGroups.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </Field>

          {gender === "Other" && (
            <Field
              label="Please specify"
              error={errors.genderOther?.message}
              htmlFor="m-gender-other"
              className="sm:col-span-2"
            >
              <input
                id="m-gender-other"
                className={inputBase}
                {...register("genderOther")}
              />
            </Field>
          )}
        </div>
      </div>

      {/* Contact Information */}
      <div>
        <h3 className="font-display text-ink mb-4 text-lg font-bold">
          Contact Information
        </h3>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Email Address"
            error={errors.email?.message}
            htmlFor="m-email"
          >
            <input
              id="m-email"
              type="email"
              className={inputBase}
              {...register("email")}
            />
          </Field>
          <Field
            label="Phone Number"
            error={errors.phone?.message}
            htmlFor="m-phone"
          >
            <input
              id="m-phone"
              type="tel"
              className={inputBase}
              {...register("phone")}
            />
          </Field>
          <Field
            label="Full Address"
            error={errors.address?.message}
            htmlFor="m-address"
            className="sm:col-span-2"
          >
            <input
              id="m-address"
              className={inputBase}
              {...register("address")}
            />
          </Field>
        </div>
      </div>

      {/* Rotaract Background */}
      <div>
        <h3 className="font-display text-ink mb-4 text-lg font-bold">
          Rotaract Background
        </h3>
        <div className="space-y-5">
          <Field
            label="Have you previously been a member of a Rotaract or Interact club?"
            error={errors.previousClub?.message}
            htmlFor="m-prev-club"
          >
            <div className="space-y-2">
              <label className={radioRow}>
                <input
                  type="radio"
                  value="yes"
                  className={radioInput}
                  {...register("previousClub")}
                />
                <span className={radioLabel}>Yes</span>
              </label>
              <label className={radioRow}>
                <input
                  type="radio"
                  value="no"
                  className={radioInput}
                  {...register("previousClub")}
                />
                <span className={radioLabel}>No</span>
              </label>
            </div>
          </Field>

          {previousClub === "yes" && (
            <Field
              label="Name of your former club"
              error={errors.previousClubName?.message}
              htmlFor="m-prev-club-name"
            >
              <input
                id="m-prev-club-name"
                className={inputBase}
                {...register("previousClubName")}
              />
            </Field>
          )}
        </div>
      </div>

      {/* How you heard about us */}
      <div>
        <h3 className="font-display text-ink mb-4 text-lg font-bold">
          How did you hear about us?
        </h3>
        <div className="space-y-5">
          <Field
            label="How did you know about Rotaract Club of Metro City?"
            error={errors.referralSource?.message}
            htmlFor="m-referral"
          >
            <select
              id="m-referral"
              className={selectBase}
              defaultValue=""
              {...register("referralSource")}
            >
              <option value="" disabled>
                Choose one…
              </option>
              {referralSources.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </Field>

          {(referralSource === referralSources[0] ||
            referralSource === referralSources[1]) && (
            <Field
              label="Name of the person who referred you"
              error={errors.referrerName?.message}
              htmlFor="m-referrer"
            >
              <input
                id="m-referrer"
                className={inputBase}
                {...register("referrerName")}
              />
            </Field>
          )}
        </div>
      </div>

      {/* Interests & Goals */}
      <div>
        <h3 className="font-display text-ink mb-4 text-lg font-bold">
          Interests & Goals
        </h3>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Area of interest"
            error={errors.interest?.message}
            htmlFor="m-interest"
          >
            <select
              id="m-interest"
              className={selectBase}
              defaultValue=""
              {...register("interest")}
            >
              <option value="" disabled>
                Choose one…
              </option>
              {interestAreas.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="mt-5">
          <Field
            label="What do you want to do and accomplish by joining the Rotaract Club of Metro City?"
            error={errors.goals?.message}
            htmlFor="m-goals"
          >
            <textarea
              id="m-goals"
              rows={4}
              className={inputBase}
              {...register("goals")}
            />
          </Field>
        </div>
      </div>

      {/* Membership Fee */}
      <div>
        <h3 className="font-display text-ink mb-4 text-lg font-bold">
          Membership Commitment
        </h3>
        <div className="bg-cloud mb-5 space-y-3 rounded-lg p-4">
          <p className="text-slate text-sm">
            A membership fee will be charged in accordance with Rotary
            International guidelines. Additionally, members are expected to
            attend at least two club meetings and two club-organized events per
            year.
          </p>
        </div>
        <Field
          label="Are you willing to pay the membership fee?"
          error={errors.willingToPayFee?.message}
          htmlFor="m-fee"
        >
          <div className="space-y-2">
            <label className={radioRow}>
              <input
                type="radio"
                value="yes"
                className={radioInput}
                {...register("willingToPayFee")}
              />
              <span className={radioLabel}>Yes</span>
            </label>
            <label className={radioRow}>
              <input
                type="radio"
                value="no"
                className={radioInput}
                {...register("willingToPayFee")}
              />
              <span className={radioLabel}>No</span>
            </label>
          </div>
        </Field>
      </div>

      {/* Additional info */}
      <div>
        <Field
          label="Anything else you'd like to share?"
          optional
          error={errors.message?.message}
          htmlFor="m-message"
        >
          <textarea
            id="m-message"
            rows={3}
            className={inputBase}
            {...register("message")}
          />
        </Field>
      </div>

      {/* Privacy note */}
      <p className="text-slate text-xs leading-relaxed">
        The information you provide on this form will be shared with Rotary
        International and The Rotary Foundation, and the club&rsquo;s Rotary
        district and its leaders. Personal data collected through this form is
        subject to Rotary&rsquo;s privacy policy and will be used only for
        official Rotary business.
      </p>

      {submitError && (
        <p
          role="alert"
          className="text-cranberry flex items-start gap-2 text-sm"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {submitError}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
          </>
        ) : (
          <>
            Submit Application <Send className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
