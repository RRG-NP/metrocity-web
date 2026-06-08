import { NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema, membershipSchema } from "@/lib/schemas";

/**
 * Form handler STUB.
 *
 * Accepts both the contact and membership forms (distinguished by `formType`),
 * validates the payload with Zod, and logs it server-side. No email is sent.
 *
 * TO WIRE A REAL PROVIDER: replace the `console.log` below with a call to your
 * email service (e.g. Resend, SendGrid, Nodemailer) or persistence layer.
 */
const payloadSchema = z.discriminatedUnion("formType", [
  contactSchema.extend({ formType: z.literal("contact") }),
  membershipSchema.extend({ formType: z.literal("membership") }),
]);

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const parsed = payloadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  // --- STUB: log the payload. Replace with email/provider integration. ---
  console.log(
    `[contact-stub] ${parsed.data.formType} submission:`,
    JSON.stringify(parsed.data, null, 2),
  );

  return NextResponse.json({ ok: true });
}
