import { NextResponse } from "next/server";

/**
 * Handles new-client intake form submissions.
 *
 * Right now this validates the submission and logs it server-side so the
 * site works end-to-end out of the box. Before launch, wire up ONE of:
 *
 *   1. Email delivery — e.g. Resend (https://resend.com). Add `resend` to
 *      package.json, set RESEND_API_KEY + INTAKE_TO_EMAIL in your env, then
 *      send the `payload` below to the practice's inbox.
 *   2. A form service — e.g. Formspree, which needs no backend code; in that
 *      case point the form's action at Formspree and delete this route.
 *   3. A database / EHR integration if records need to be stored.
 *
 * See `.env.example` for the variables referenced here.
 */
export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();

  // Minimal validation for the required fields.
  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name || !emailLooksValid || !message) {
    return NextResponse.json(
      { error: "Please provide your name, a valid email, and a message." },
      { status: 400 },
    );
  }

  const payload = {
    name,
    email,
    phone: String(data.phone ?? "").trim(),
    service: String(data.service ?? "").trim(),
    preferredContact: String(data.preferredContact ?? "").trim(),
    availability: String(data.availability ?? "").trim(),
    referral: String(data.referral ?? "").trim(),
    message,
    submittedAt: new Date().toISOString(),
  };

  // TODO: replace this log with real delivery (see the note at the top).
  console.log("New client intake submission:", payload);

  return NextResponse.json({ ok: true });
}
