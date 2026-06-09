"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import {
  membershipSchema,
  interestAreas,
  type MembershipValues,
} from "@/lib/schemas";
import { Button } from "@/components/ui/Button";
import { Field } from "./ContactForm";
import { event as trackEvent } from "@/lib/analytics";

const inputBase =
  "w-full rounded-xl border border-slate/25 bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-cranberry focus-visible:outline-none";

export function MembershipForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<MembershipValues>({ resolver: zodResolver(membershipSchema) });

  const onSubmit = async (values: MembershipValues) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formType: "membership", ...values }),
    });
    if (!res.ok) throw new Error("Submission failed");
    trackEvent("membership_submit");
    reset();
  };

  if (isSubmitSuccessful) {
    return (
      <div className="rounded-asym-sm flex flex-col items-center gap-3 bg-white p-10 text-center shadow-[var(--shadow-soft)]">
        <CheckCircle2 className="text-cranberry h-14 w-14" />
        <h3 className="font-display text-ink text-xl font-bold">
          Interest received - welcome aboard!
        </h3>
        <p className="text-slate max-w-md">
          Thank you for your interest in joining the club. A member of our
          Membership Committee will reach out with next steps.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-asym-sm space-y-5 bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" error={errors.name?.message} htmlFor="m-name">
          <input id="m-name" className={inputBase} {...register("name")} />
        </Field>
        <Field label="Email" error={errors.email?.message} htmlFor="m-email">
          <input
            id="m-email"
            type="email"
            className={inputBase}
            {...register("email")}
          />
        </Field>
        <Field label="Phone" error={errors.phone?.message} htmlFor="m-phone">
          <input
            id="m-phone"
            type="tel"
            className={inputBase}
            {...register("phone")}
          />
        </Field>
        <Field label="Age" error={errors.age?.message} htmlFor="m-age">
          <input
            id="m-age"
            type="number"
            min={18}
            max={30}
            className={inputBase}
            {...register("age", { valueAsNumber: true })}
          />
        </Field>
        <Field
          label="Occupation / Student"
          error={errors.occupation?.message}
          htmlFor="m-occ"
        >
          <input
            id="m-occ"
            className={inputBase}
            placeholder="e.g. Student, Engineer"
            {...register("occupation")}
          />
        </Field>
        <Field
          label="Area of interest"
          error={errors.interest?.message}
          htmlFor="m-interest"
        >
          <select
            id="m-interest"
            className={inputBase}
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

      <Field
        label="Anything you'd like to share?"
        optional
        error={errors.message?.message}
        htmlFor="m-message"
      >
        <textarea
          id="m-message"
          rows={4}
          className={inputBase}
          {...register("message")}
        />
      </Field>

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
            Express interest <Send className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
