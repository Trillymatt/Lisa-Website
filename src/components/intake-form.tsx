"use client";

import { useState } from "react";
import { services } from "@/lib/content";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "mt-1.5 w-full rounded-xl border border-sage-200 bg-white px-4 py-2.5 text-sage-900 shadow-sm outline-none transition-colors focus:border-ocean-400 focus:ring-2 focus:ring-ocean-200";
const labelClass = "block text-sm font-semibold text-sage-800";

export function IntakeForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError("");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-sage-200 bg-sage-50 p-8 text-center">
        <h2 className="font-display text-2xl font-semibold text-ocean-800">
          Thank you for reaching out
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sage-700">
          I&rsquo;ve received your information and will be in touch soon. If
          your need is urgent, please call me directly or, in a crisis, call or
          text 988.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Your name <span className="text-gold-500">*</span>
          </label>
          <input id="name" name="name" required className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email <span className="text-gold-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className={fieldClass}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="preferredContact">
            Preferred way to reach you
          </label>
          <select
            id="preferredContact"
            name="preferredContact"
            defaultValue="Email"
            className={fieldClass}
          >
            <option>Email</option>
            <option>Phone call</option>
            <option>Text message</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="service">
          Which service are you interested in?
        </label>
        <select
          id="service"
          name="service"
          defaultValue=""
          className={fieldClass}
        >
          <option value="">I&rsquo;m not sure yet</option>
          {services.map((s) => (
            <option key={s.name} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          What brings you in? How can I help?{" "}
          <span className="text-gold-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Share as much or as little as you feel comfortable with."
          className={fieldClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="availability">
          When are you generally available?
        </label>
        <input
          id="availability"
          name="availability"
          placeholder="e.g. weekday mornings, evenings after 6pm"
          className={fieldClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="referral">
          How did you hear about my practice?
        </label>
        <input id="referral" name="referral" className={fieldClass} />
      </div>

      {status === "error" && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-full bg-ocean-600 px-7 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-ocean-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Submit Intake Form"}
      </button>

      <p className="text-xs leading-relaxed text-sage-500">
        Your information is kept private and used only to contact you about
        care. This form is not for emergencies — if you are in crisis, call or
        text 988.
      </p>
    </form>
  );
}
