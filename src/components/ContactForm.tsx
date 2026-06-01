"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { servicePages } from "@/lib/content";
import { site } from "@/lib/site";

const serviceOptions = [
  ...servicePages.map((service) => service.navLabel),
  "Kitchen splashback",
  "Tile & grout restoration",
  "Silicone reseal",
  "Something else",
];

type Status = "idle" | "submitting" | "success" | "emailFallback" | "error";

const fieldClass =
  "w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-zinc-500 focus:border-clay focus:ring-1 focus:ring-clay/25";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setError(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) {
        throw new Error(body?.error ?? "Something went wrong.");
      }
      if (typeof body?.fallbackMailto === "string") {
        window.location.href = body.fallbackMailto;
        setStatus("emailFallback");
        form.reset();
        return;
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please contact us directly.",
      );
    }
  }

  if (status === "success" || status === "emailFallback") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-lg border border-zinc-200 bg-white p-10 text-center shadow-sm shadow-zinc-200/60">
        <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-sage text-white">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold text-ink">
          {status === "emailFallback" ? "Email draft opened" : "Thanks — request received"}
        </h3>
        <p className="mt-2 max-w-sm text-sm text-zinc-500">
          {status === "emailFallback"
            ? "Your email app should now contain the quote request. Please send it from there so we receive your details."
            : `We'll be in touch shortly to arrange your free quote. Need us sooner?${
                site.phone.href ? " Give us a call." : " Send us an email."
              }`}
        </p>
        <a
          href={site.phone.href || `mailto:${site.email}`}
          className="mt-6 inline-flex items-center justify-center rounded-lg border border-zinc-300 px-6 py-3 text-sm font-medium text-ink transition hover:bg-zinc-50"
        >
          {site.phone.href ? `Call ${site.phone.display}` : "Email us"}
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm shadow-zinc-200/60 sm:p-8"
    >
      <h3 className="font-display text-lg font-semibold text-ink">
        Request your free quote
      </h3>
      <p className="mt-1 text-sm text-zinc-500">
        We'll get back to you, usually the same day.
      </p>

      {/* Honeypot field — hidden from humans, catches bots. */}
      <div className="hidden" aria-hidden>
        <label>
          Leave this empty
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" required />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" required />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          className="sm:col-span-2"
          required
        />
        <Field
          label="Suburb"
          name="suburb"
          autoComplete="address-level2"
          placeholder="e.g. Brunswick"
        />
        <div className="flex flex-col gap-1.5">
          <label htmlFor="service" className="text-sm font-medium text-ink">
            Service needed
          </label>
          <select id="service" name="service" defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Select a service…
            </option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="message" className="text-sm font-medium text-ink">
            Tell us about your project
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="e.g. Regrout and reseal a leaking shower in the main bathroom."
            className={fieldClass}
          />
        </div>
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-zinc-300 bg-zinc-50 px-4 py-3 text-sm text-ink"
        >
          {error} You can also reach us at{" "}
          <a
            href={site.phone.href || `mailto:${site.email}`}
            className="font-medium underline"
          >
            {site.phone.href ? site.phone.display : site.email}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-clay px-6 py-3.5 text-base font-medium text-white transition hover:bg-maroon disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send my request
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </>
        )}
      </button>
      <p className="mt-3 text-center text-xs text-zinc-500">
        By submitting, you agree to be contacted about your enquiry.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  className = "",
  ...props
}: {
  label: string;
  name: string;
  type?: string;
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={name} className="text-sm font-medium text-ink">
        {label}
        {props.required && <span className="text-zinc-500"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-zinc-500 focus:border-clay focus:ring-1 focus:ring-clay/25"
        {...props}
      />
    </div>
  );
}
