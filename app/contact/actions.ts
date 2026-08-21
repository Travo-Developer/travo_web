"use server";

import { Resend } from "resend";
import { z } from "zod";
import { EMAIL } from "@/lib/site";

/* Server Actions are reachable by direct POST, not just through the form, so
   everything below re-validates on the server regardless of the HTML
   constraints on the inputs. */

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "That name is too long."),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email.")
    .max(200, "That email is too long.")
    .pipe(z.email("Please enter a valid email address.")),
  phone: z
    .string()
    .trim()
    .min(6, "Please enter your phone number.")
    .max(30, "That phone number is too long.")
    // Digits, spaces and the usual dialling punctuation. Deliberately loose:
    // visitors write numbers in many formats and we only need to call back.
    .regex(/^[+\d][\d\s\-().]*$/, "Please enter a valid phone number."),
  message: z
    .string()
    .trim()
    .min(10, "Please tell us a little more (at least 10 characters).")
    .max(4000, "That message is too long."),
});

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<keyof z.infer<typeof schema>, string[]>>;
  /** Echoed back so a failed submit doesn't wipe what the visitor typed. */
  values?: { name: string; email: string; phone: string; message: string };
};

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendEnquiry(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: a field hidden from humans. Bots fill it in. Report success so
  // the bot doesn't retry with a different shape.
  if (typeof formData.get("company") === "string" && formData.get("company")) {
    return { status: "success", message: "Thanks — we'll be in touch shortly." };
  }

  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Please check the fields below and try again.",
      errors: z.flattenError(parsed.error).fieldErrors,
      values: raw,
    };
  }

  const { name, email, phone, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — enquiry was not sent.");
    return {
      status: "error",
      message:
        "We couldn't send that just now. Please call or WhatsApp us instead.",
      values: raw,
    };
  }

  // Must be a domain verified in Resend. The fallback is Resend's shared
  // onboarding sender, which delivers ONLY to the account owner's address —
  // fine for a local smoke test, never correct in production.
  const from = process.env.CONTACT_FROM_EMAIL || "Travo <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO_EMAIL || EMAIL;

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to,
      // Replying in the inbox goes to the visitor, not to Travo.
      replyTo: email,
      subject: `New enquiry from ${name}`,
      text: [
        "New enquiry from the Travo website",
        "",
        `Name:    ${name}`,
        `Email:   ${email}`,
        `Phone:   ${phone}`,
        "",
        "Message:",
        message,
      ].join("\n"),
      html: `
        <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;max-width:560px;color:#0b0f0c">
          <p style="font-size:12px;letter-spacing:.18em;text-transform:uppercase;color:#c2703d;margin:0 0 6px">
            Travo website
          </p>
          <h2 style="margin:0 0 20px;font-size:20px">New enquiry from ${escapeHtml(name)}</h2>
          <table cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.7">
            <tr><td style="color:#6b706c;padding-right:16px">Name</td><td>${escapeHtml(name)}</td></tr>
            <tr><td style="color:#6b706c;padding-right:16px">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            <tr><td style="color:#6b706c;padding-right:16px">Phone</td><td><a href="tel:${escapeHtml(phone)}">${escapeHtml(phone)}</a></td></tr>
          </table>
          <p style="color:#6b706c;font-size:13px;margin:24px 0 6px">Message</p>
          <div style="white-space:pre-wrap;border-left:2px solid #c2703d;padding-left:14px;font-size:14px;line-height:1.7">${escapeHtml(
            message,
          )}</div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend returned an error:", error);
      return {
        status: "error",
        message:
          "We couldn't send that just now. Please call or WhatsApp us instead.",
        values: raw,
      };
    }

    return {
      status: "success",
      message: "Thanks — we've got your message and will reply shortly.",
    };
  } catch (cause) {
    console.error("Failed to send enquiry:", cause);
    return {
      status: "error",
      message:
        "We couldn't send that just now. Please call or WhatsApp us instead.",
      values: raw,
    };
  }
}
