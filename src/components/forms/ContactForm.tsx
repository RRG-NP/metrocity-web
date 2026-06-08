"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { contactSchema, type ContactValues } from "@/lib/schemas";
import { Button } from "@/components/ui/Button";
import { event as trackEvent } from "@/lib/analytics";

const inputBase =
  "w-full rounded-xl border border-slate/25 bg-white px-4 py-3 text-ink outline-none transition-colors focus:border-cranberry focus-visible:outline-none";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (values: ContactValues) => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formType: "contact", ...values }),
    });
    if (!res.ok) throw new Error("Submission failed");
    trackEvent("contact_submit");
    reset();
  };

  if (isSubmitSuccessful) {
    return (
      <div className="rounded-asym-sm flex flex-col items-center gap-3 bg-white p-10 text-center shadow-[var(--shadow-soft)]">
        <CheckCircle2 className="text-cranberry h-14 w-14" />
        <h3 className="font-display text-ink text-xl font-bold">
          Message sent — thank you!
        </h3>
        <p className="text-slate">
          We&apos;ve received your message and will be in touch soon.
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
        <Field label="Name" error={errors.name?.message} htmlFor="c-name">
          <input id="c-name" className={inputBase} {...register("name")} />
        </Field>
        <Field label="Email" error={errors.email?.message} htmlFor="c-email">
          <input
            id="c-email"
            type="email"
            className={inputBase}
            {...register("email")}
          />
        </Field>
      </div>
      <Field
        label="Subject"
        optional
        error={errors.subject?.message}
        htmlFor="c-subject"
      >
        <input id="c-subject" className={inputBase} {...register("subject")} />
      </Field>
      <Field
        label="Message"
        error={errors.message?.message}
        htmlFor="c-message"
      >
        <textarea
          id="c-message"
          rows={5}
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
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            Send message <Send className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}

export function Field({
  label,
  htmlFor,
  error,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="text-ink mb-1.5 block text-sm font-semibold"
      >
        {label}{" "}
        {optional && <span className="text-slate font-normal">(optional)</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-cranberry mt-1.5 text-sm">
          {error}
        </p>
      )}
    </div>
  );
}
