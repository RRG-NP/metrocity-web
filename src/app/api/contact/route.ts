import { NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema, membershipSchema } from "@/lib/schemas";
import {
  isEmailConfigured,
  sendContactNotification,
  sendMembershipNotification,
} from "@/lib/email";

/**
 * Handles both the contact and membership forms (distinguished by
 * `formType`), validates the payload with Zod, and emails it to the club
 * inbox via Gmail SMTP (see src/lib/email.ts + .env.example for setup).
 *
 * If GMAIL_USER/GMAIL_APP_PASSWORD aren't configured (e.g. local dev without
 * .env.local), submissions are logged server-side instead of emailed - the
 * route never 500s just because email isn't set up.
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
      {
        ok: false,
        error: "Validation failed",
        issues: z.flattenError(parsed.error),
      },
      { status: 422 },
    );
  }

  const { data } = parsed;

  if (!isEmailConfigured()) {
    console.log(
      `[contact] email not configured - logging ${data.formType} submission:`,
      JSON.stringify(data, null, 2),
    );
    return NextResponse.json({ ok: true });
  }

  try {
    if (data.formType === "contact") {
      await sendContactNotification(data);
    } else {
      await sendMembershipNotification(data);
    }
  } catch (err) {
    console.error(`[contact] failed to email ${data.formType} submission:`, err);
    return NextResponse.json(
      {
        ok: false,
        error:
          "We couldn't send your submission right now. Please try again or email us directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
