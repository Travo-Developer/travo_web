"use client";

import { useActionState } from "react";
import { initialContactState, sendEnquiry } from "./actions";

const fieldBase =
  "w-full rounded-md border bg-white px-4 py-3 text-base text-ink placeholder:text-ink/35 transition-colors focus:border-laterite focus:outline-2 focus:outline-offset-2 focus:outline-laterite";

function Field({
  id,
  label,
  hint,
  errors,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  errors?: string[];
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-xs uppercase tracking-[0.16em] text-ink/50"
      >
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {errors?.length ? (
        <p id={`${id}-error`} className="form-error mt-2 text-sm">
          {errors[0]}
        </p>
      ) : hint ? (
        <p className="mt-2 text-xs text-ink/40">{hint}</p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    sendEnquiry,
    initialContactState,
  );

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-canopy/15 bg-canopy px-8 py-12 text-mist"
      >
        <p className="text-xs uppercase tracking-[0.28em] text-laterite">
          Message sent
        </p>
        <h2 className="wordmark-serif mt-5 text-2xl leading-tight tracking-tight sm:text-3xl">
          {state.message}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-mist/70">
          We usually reply within a few hours. If it&apos;s urgent, calling or
          WhatsApp is faster.
        </p>
      </div>
    );
  }

  const err = state.errors;

  return (
    <form action={formAction} noValidate className="flex flex-col gap-6">
      {state.status === "error" && state.message && (
        <p
          role="alert"
          className="form-error form-error-border rounded-md border bg-black/3 px-4 py-3 text-sm"
        >
          {state.message}
        </p>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Name" errors={err?.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            defaultValue={state.values?.name}
            aria-invalid={err?.name ? true : undefined}
            aria-describedby={err?.name ? "name-error" : undefined}
            placeholder="Your full name"
            className={`${fieldBase} ${
              err?.name ? "form-error-border" : "border-ink/15"
            }`}
          />
        </Field>

        <Field id="phone" label="Phone" errors={err?.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            defaultValue={state.values?.phone}
            aria-invalid={err?.phone ? true : undefined}
            aria-describedby={err?.phone ? "phone-error" : undefined}
            placeholder="+91 00000 00000"
            className={`${fieldBase} ${
              err?.phone ? "form-error-border" : "border-ink/15"
            }`}
          />
        </Field>
      </div>

      <Field id="email" label="Email" errors={err?.email}>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.values?.email}
          aria-invalid={err?.email ? true : undefined}
          aria-describedby={err?.email ? "email-error" : undefined}
          placeholder="you@example.com"
          className={`${fieldBase} ${
            err?.email ? "form-error-border" : "border-ink/15"
          }`}
        />
      </Field>

      <Field
        id="message"
        label="Message"
        hint="Dates, group size, and which trip you're after."
        errors={err?.message}
      >
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          defaultValue={state.values?.message}
          aria-invalid={err?.message ? true : undefined}
          aria-describedby={err?.message ? "message-error" : undefined}
          placeholder="We're 4 people in Munnar from the 12th and would like the Kolukkumalai sunrise trip…"
          className={`${fieldBase} resize-y ${
            err?.message ? "form-error-border" : "border-ink/15"
          }`}
        />
      </Field>

      {/* Honeypot — hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-full bg-canopy px-8 py-3.5 text-sm font-medium tracking-wide text-mist transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-laterite disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {pending ? "Sending…" : "Send enquiry"}
        </button>
        <p className="text-xs text-ink/45">
          We reply by email, usually within a few hours.
        </p>
      </div>
    </form>
  );
}
