import { NextResponse } from "next/server";
import { site } from "@/lib/site";

/**
 * Contact / quote-request handler.
 *
 * Out of the box this validates submissions and logs them during development.
 * In production, configure delivery for direct submissions. If delivery is not
 * configured yet, the API returns a prefilled mailto fallback so enquiries are
 * not silently dropped. Set ONE of:
 *
 *   CONTACT_WEBHOOK_URL  – any URL to POST the JSON payload to (Zapier, Make,
 *                          a Slack/Discord incoming webhook, etc.)
 *   RESEND_API_KEY       – a Resend API key. Also set CONTACT_TO_EMAIL (where
 *                          enquiries are sent) and CONTACT_FROM_EMAIL (a
 *                          verified sender).
 *
 * See README.md for details.
 */

type Payload = {
  name?: string;
  phone?: string;
  email?: string;
  suburb?: string;
  service?: string;
  message?: string;
  company?: string; // honeypot
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_BODY_BYTES = 20_000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;
const rateLimits = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "Your message is too large. Please contact us directly." },
      { status: 413 },
    );
  }

  if (isRateLimited(request)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute and try again." },
      { status: 429 },
    );
  }

  let data: Payload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!data || typeof data !== "object") {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a real user never fills this hidden field.
  if (clean(data.company)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(data.name);
  const phone = clean(data.phone);
  const email = clean(data.email).toLowerCase();
  const suburb = clean(data.suburb);
  const service = clean(data.service);
  const message = clean(data.message);

  if (!name || !phone || !email) {
    return NextResponse.json(
      { error: "Please provide your name, phone and email." },
      { status: 400 },
    );
  }
  if (name.length > 120 || suburb.length > 120 || service.length > 120) {
    return NextResponse.json(
      { error: "Please shorten your details and try again." },
      { status: 400 },
    );
  }
  if (message.length > 1600) {
    return NextResponse.json(
      { error: "Please shorten your message and try again." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  const phoneDigits = phone.replace(/\D/g, "");
  if (phoneDigits.length < 8 || phoneDigits.length > 15) {
    return NextResponse.json(
      { error: "Please enter a valid phone number." },
      { status: 400 },
    );
  }

  const enquiry = {
    name,
    phone,
    email,
    suburb: suburb || "—",
    service: service || "—",
    message: message || "—",
    receivedAt: new Date().toISOString(),
    referrer: request.headers.get("referer") || "direct",
    userAgent: request.headers.get("user-agent") || "unknown",
  };

  try {
    const delivery = await deliver(enquiry);
    return NextResponse.json({ ok: true, ...delivery });
  } catch (error) {
    console.error("[contact] delivery failed:", error);
    return NextResponse.json(
      { error: "We couldn't send your message. Please contact us directly." },
      { status: 502 },
    );
  }

}

type Enquiry = {
  name: string;
  phone: string;
  email: string;
  suburb: string;
  service: string;
  message: string;
  receivedAt: string;
  referrer: string;
  userAgent: string;
};

async function deliver(enquiry: Enquiry): Promise<{ fallbackMailto?: string } | void> {
  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enquiry),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return;
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const to = process.env.CONTACT_TO_EMAIL;
    if (!to && process.env.NODE_ENV === "production") {
      throw new Error("CONTACT_TO_EMAIL is required when RESEND_API_KEY is set.");
    }

    const from =
      process.env.CONTACT_FROM_EMAIL ||
      (process.env.NODE_ENV === "production"
        ? ""
        : `${site.name} <onboarding@resend.dev>`);

    if (!from) {
      throw new Error(
        "CONTACT_FROM_EMAIL must be set to a verified sender in production.",
      );
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: to || site.email,
        reply_to: enquiry.email,
        subject: `New quote request — ${enquiry.name} (${enquiry.service})`,
        text: [
          `Name:    ${enquiry.name}`,
          `Phone:   ${enquiry.phone}`,
          `Email:   ${enquiry.email}`,
          `Suburb:  ${enquiry.suburb}`,
          `Service: ${enquiry.service}`,
          ``,
          enquiry.message,
          ``,
          `Referrer: ${enquiry.referrer}`,
          `Browser:  ${enquiry.userAgent}`,
          `Received: ${enquiry.receivedAt}`,
        ].join("\n"),
      }),
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Resend responded ${res.status}: ${body}`);
    }
    return;
  }

  if (process.env.NODE_ENV === "production") {
    return { fallbackMailto: mailtoFor(enquiry) };
  }

  // No delivery configured yet — log so nothing is lost in development.
  console.info("[contact] New enquiry (no delivery configured):", enquiry);
}

function mailtoFor(enquiry: Enquiry) {
  const subject = `Quote request from ${enquiry.name} (${enquiry.service})`;
  const body = [
    `Name: ${enquiry.name}`,
    `Phone: ${enquiry.phone}`,
    `Email: ${enquiry.email}`,
    `Suburb: ${enquiry.suburb}`,
    `Service: ${enquiry.service}`,
    "",
    enquiry.message,
  ].join("\n");

  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isRateLimited(request: Request) {
  const now = Date.now();
  const id = getClientId(request);
  const current = rateLimits.get(id);

  if (!current || current.resetAt <= now) {
    rateLimits.set(id, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    cleanupRateLimits(now);
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX;
}

function getClientId(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0];
  return (
    forwardedFor?.trim() ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "unknown"
  );
}

function cleanupRateLimits(now: number) {
  for (const [id, limit] of rateLimits) {
    if (limit.resetAt <= now) rateLimits.delete(id);
  }
}
