"use client";

import { useState } from "react";
import { contactFormEndpoint } from "@/lib/content";

/**
 * The contact form. Many people looking for a therapist will not phone a
 * stranger, and a form is often the only channel they'll actually use — so this
 * is the highest-leverage conversion path on the site.
 *
 * Submits to an external form service (Formspree or equivalent) via fetch, so
 * the visitor stays on the page and gets an inline confirmation instead of being
 * bounced to a third-party thank-you screen.
 *
 * Deliberately asks for the minimum. It does NOT collect clinical detail: this
 * is an ordinary web form, not a HIPAA-secured channel, and the note below the
 * fields tells visitors so plainly.
 */
type Status = "idle" | "submitting" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");

    try {
      const response = await fetch(contactFormEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });

      if (!response.ok) throw new Error(`Form endpoint returned ${response.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-3xl bg-white p-8 text-center shadow-soft ring-1 ring-sage-900/5"
      >
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-sage-100 text-sage-600">
          <CheckIcon />
        </span>
        <h3 className="mt-4 font-display text-2xl font-semibold text-ocean-800">
          Thank you for reaching out
        </h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-sage-700">
          Your message is on its way to me. I answer personally, usually within
          one business day. If it&rsquo;s urgent, please call instead.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white p-7 shadow-soft ring-1 ring-sage-900/5 sm:p-9"
    >
      <h2 className="font-display text-2xl font-semibold text-ocean-800">
        Send me a message
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-sage-600">
        A few details are plenty — I&rsquo;ll take it from there.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" autoComplete="name" required />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <Field
          label="Phone (optional)"
          name="phone"
          type="tel"
          autoComplete="tel"
        />
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="contact-preference"
            className="text-sm font-semibold text-sage-800"
          >
            Best way to reach you
          </label>
          <select
            id="contact-preference"
            name="contact-preference"
            defaultValue="Email"
            className="rounded-2xl border border-sage-200 bg-sand-50 px-4 py-2.5 text-sage-900 outline-none transition-colors focus:border-ocean-400 focus:ring-2 focus:ring-ocean-200"
          >
            <option>Email</option>
            <option>Phone call</option>
            <option>Text message</option>
          </select>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-1.5">
        <label
          htmlFor="contact-message"
          className="text-sm font-semibold text-sage-800"
        >
          What would you like help with?
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          placeholder="A sentence or two is enough. You don't need to explain everything here."
          className="rounded-2xl border border-sage-200 bg-sand-50 px-4 py-3 text-sage-900 outline-none transition-colors placeholder:text-sage-400 focus:border-ocean-400 focus:ring-2 focus:ring-ocean-200"
        />
      </div>

      {/*
        Honeypot. Real visitors never see or fill this; most bots do, which
        lets the form service drop them without a CAPTCHA in anyone's way.
      */}
      <div aria-hidden className="hidden">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" type="text" name="_gotcha" tabIndex={-1} />
      </div>

      <p className="mt-5 rounded-2xl bg-sage-50 px-5 py-4 text-sm leading-relaxed text-sage-700">
        <strong className="font-semibold text-sage-800">
          Please keep it general.
        </strong>{" "}
        This form is not a secure or confidential channel, so don&rsquo;t include
        medical history or sensitive personal details — we&rsquo;ll cover those
        privately. It isn&rsquo;t monitored for emergencies: if you&rsquo;re in
        crisis, call or text{" "}
        <a
          href="tel:988"
          className="font-semibold text-ocean-600 underline underline-offset-2"
        >
          988
        </a>
        , or call 911 if you&rsquo;re in immediate danger.
      </p>

      {status === "error" && (
        <p
          role="alert"
          className="mt-5 rounded-2xl bg-red-50 px-5 py-4 text-sm leading-relaxed text-red-800 ring-1 ring-red-200"
        >
          Something went wrong sending that. Please try again, or email me
          directly — I don&rsquo;t want your message to get lost.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-ocean-600 px-7 py-3 text-base font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-ocean-700 hover:shadow-md active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 sm:w-auto"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  const id = `contact-${name}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-sage-800">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="rounded-2xl border border-sage-200 bg-sand-50 px-4 py-2.5 text-sage-900 outline-none transition-colors placeholder:text-sage-400 focus:border-ocean-400 focus:ring-2 focus:ring-ocean-200"
      />
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
