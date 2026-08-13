import { NextResponse } from "next/server";

const MAX_BODY_LENGTH = 20_000;
const MAX_LENGTHS = {
  name: 120,
  email: 254,
  phone: 40,
  service: 120,
  preferredContact: 40,
  availability: 300,
  referral: 300,
  message: 3_000,
} as const;

/**
 * Handles new-client intake form submissions.
 *
 * Validates a contact request and delivers it through Resend. Delivery is
 * fail-closed: the UI only reports success after Resend accepts the message.
 * See `.env.example` for the required server-only variables.
 */
export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    const rawBody = await request.text();
    if (rawBody.length > MAX_BODY_LENGTH) {
      return NextResponse.json(
        { error: "This request is too large. Please shorten your message." },
        { status: 413 },
      );
    }

    const parsed: unknown = JSON.parse(rawBody);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Expected an object");
    }
    data = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // A filled honeypot is treated like a successful submission so automated
  // spam does not learn how the form rejected it.
  if (String(data.website ?? "").trim()) {
    return NextResponse.json({ ok: true });
  }

  const fields = {
    name: readField(data, "name"),
    email: readField(data, "email"),
    phone: readField(data, "phone"),
    service: readField(data, "service"),
    preferredContact: readField(data, "preferredContact"),
    availability: readField(data, "availability"),
    referral: readField(data, "referral"),
    message: readField(data, "message"),
  };

  const fieldIsTooLong = Object.entries(MAX_LENGTHS).some(
    ([key, max]) => fields[key as keyof typeof fields].length > max,
  );
  if (fieldIsTooLong) {
    return NextResponse.json(
      { error: "One or more fields are too long. Please shorten your response." },
      { status: 400 },
    );
  }

  // Minimal validation for the required fields.
  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email);
  if (!fields.name || !emailLooksValid || !fields.message) {
    return NextResponse.json(
      { error: "Please provide your name, a valid email, and a message." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY?.trim();
  const toEmail = process.env.INTAKE_TO_EMAIL?.trim();
  const fromEmail = process.env.INTAKE_FROM_EMAIL?.trim();

  if (!apiKey || !toEmail || !fromEmail) {
    return NextResponse.json(
      {
        error:
          "Online contact delivery is still being configured. Please email the practice directly for now.",
      },
      { status: 503 },
    );
  }

  const submittedAt = new Date().toISOString();
  let delivery: Response;
  try {
    delivery = await fetch("https://api.resend.com/emails", {
      method: "POST",
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "above-all-else-website/1.0",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: fields.email,
        subject: `New website contact request from ${fields.name.replace(/[\r\n]/g, " ")}`,
        text: [
          `Name: ${fields.name}`,
          `Email: ${fields.email}`,
          `Phone: ${fields.phone || "Not provided"}`,
          `Preferred contact: ${fields.preferredContact || "Not provided"}`,
          `Service: ${fields.service || "Not selected"}`,
          `Availability: ${fields.availability || "Not provided"}`,
          `Referral source: ${fields.referral || "Not provided"}`,
          `Submitted: ${submittedAt}`,
          "",
          "Message:",
          fields.message,
        ].join("\n"),
      }),
    });
  } catch (error) {
    console.error(
      "Intake email delivery request failed",
      error instanceof Error ? error.message : "Unknown delivery error",
    );
    return NextResponse.json(
      {
        error:
          "Your request could not be sent. Please try again or email the practice directly.",
      },
      { status: 502 },
    );
  }

  if (!delivery.ok) {
    const providerError = await delivery.text();
    console.error("Intake email delivery failed", {
      status: delivery.status,
      error: providerError.slice(0, 500),
    });
    return NextResponse.json(
      {
        error:
          "Your request could not be sent. Please try again or email the practice directly.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

function readField(data: Record<string, unknown>, key: string) {
  const value = data[key];
  return typeof value === "string" ? value.trim() : "";
}
