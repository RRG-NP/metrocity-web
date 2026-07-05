import nodemailer from "nodemailer";
import type { ContactValues, MembershipValues } from "@/lib/schemas";

export function isEmailConfigured(): boolean {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }
  return transporter;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Renders a `{ label: value }` map as an HTML definition list + plain text. */
function renderFields(fields: Array<[string, string | undefined]>): {
  html: string;
  text: string;
} {
  const present = fields.filter(
    (f): f is [string, string] => Boolean(f[1] && f[1].trim()),
  );
  const html = present
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#6C5C62;white-space:nowrap;vertical-align:top;"><strong>${escapeHtml(
          label,
        )}</strong></td><td style="padding:4px 0;color:#190A10;">${escapeHtml(
          value,
        ).replace(/\n/g, "<br/>")}</td></tr>`,
    )
    .join("");
  const text = present.map(([label, value]) => `${label}: ${value}`).join("\n");
  return { html: `<table cellpadding="0" cellspacing="0">${html}</table>`, text };
}

function wrapHtml(title: string, bodyHtml: string): string {
  return `<!doctype html><html><body style="font-family:ui-sans-serif,system-ui,sans-serif;background:#FCF2F7;padding:24px;">
    <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:16px;padding:24px;">
      <h2 style="color:#190A10;margin:0 0 16px;">${escapeHtml(title)}</h2>
      ${bodyHtml}
    </div>
  </body></html>`;
}

async function send(subject: string, html: string, text: string, replyTo: string) {
  const to = process.env.CONTACT_EMAIL_TO || process.env.GMAIL_USER!;
  await getTransporter().sendMail({
    from: `"RAC Metro City Website" <${process.env.GMAIL_USER}>`,
    to,
    replyTo,
    subject,
    html,
    text,
  });
}

export async function sendContactNotification(values: ContactValues) {
  const { html, text } = renderFields([
    ["Name", values.name],
    ["Email", values.email],
    ["Subject", values.subject],
  ]);
  const messageBlock = `<p style="white-space:pre-wrap;color:#190A10;">${escapeHtml(
    values.message,
  )}</p>`;
  await send(
    `New contact message from ${values.name}`,
    wrapHtml("New contact form message", `${html}<hr style="margin:16px 0;border:none;border-top:1px solid #eee;"/>${messageBlock}`),
    `${text}\n\n${values.message}`,
    values.email,
  );
}

export async function sendMembershipNotification(values: MembershipValues) {
  const { html, text } = renderFields([
    ["Name", values.name],
    ["Date of birth", values.dateOfBirth],
    ["Gender", values.gender === "Other" ? values.genderOther || "Other" : values.gender],
    ["Blood group", values.bloodGroup],
    ["Address", values.address],
    ["Email", values.email],
    ["Phone", values.phone],
    ["Previously in Rotaract/Interact?", values.previousClub],
    ["Former club", values.previousClubName],
    ["Heard about us via", values.referralSource],
    ["Referred by", values.referrerName],
    ["Area of interest", values.interest],
    ["Willing to pay membership fee?", values.willingToPayFee],
  ]);
  const extra = [
    values.goals && `<p><strong style="color:#6C5C62;">Goals:</strong><br/><span style="white-space:pre-wrap;">${escapeHtml(values.goals)}</span></p>`,
    values.message && `<p><strong style="color:#6C5C62;">Additional message:</strong><br/><span style="white-space:pre-wrap;">${escapeHtml(values.message)}</span></p>`,
  ]
    .filter(Boolean)
    .join("");
  await send(
    `New membership application from ${values.name}`,
    wrapHtml("New membership application", `${html}${extra}`),
    `${text}\n\nGoals: ${values.goals}\n${values.message ? `Message: ${values.message}` : ""}`,
    values.email,
  );
}
