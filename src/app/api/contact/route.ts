import { NextResponse } from "next/server";
import { site } from "@/lib/site";

/**
 * Contact / quote-request handler.
 *
 * Out of the box this validates the submission and logs it on the server so
 * the form works immediately. To actually receive enquiries, set ONE of:
 *
 *   CONTACT_WEBHOOK_URL  – any URL to POST the JSON payload to (Zapier, Make,
 *                          a Slack/Discord incoming webhook, etc.)
 *   RESEND_API_KEY       – a Resend API key. Also set CONTACT_TO_EMAIL (where
 *                          enquiries are sent) and optionally CONTACT_FROM_EMAIL
 *                          (a verified sender; defaults to Resend's test sender).
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

export async function POST(request: Request) {
  let data: Payload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: a real user never fills this hidden field.
  if (data.company) {
    return NextResponse.json({ ok: true });
  }

  const name = data.name?.trim();
  const phone = data.phone?.trim();
  const email = data.email?.trim();

  if (!name || !phone || !email) {
    return NextResponse.json(
      { error: "Please provide your name, phone and email." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const enquiry = {
    name,
    phone,
    email,
    suburb: data.suburb?.trim() || "—",
    service: data.service?.trim() || "—",
    message: data.message?.trim() || "—",
    receivedAt: new Date().toISOString(),
  };

  try {
    await deliver(enquiry);
  } catch (error) {
    console.error("[contact] delivery failed:", error);
    return NextResponse.json(
      { error: "We couldn't send your message. Please call us instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

type Enquiry = {
  name: string;
  phone: string;
  email: string;
  suburb: string;
  service: string;
  message: string;
  receivedAt: string;
};

async function deliver(enquiry: Enquiry) {
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
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  if (resendKey) {
    const from =
      process.env.CONTACT_FROM_EMAIL || `${site.name} <onboarding@resend.dev>`;
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to,
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

  // No delivery configured yet — log so nothing is lost in development.
  console.info("[contact] New enquiry (no delivery configured):", enquiry);
}
