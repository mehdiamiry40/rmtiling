"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { site } from "@/lib/site";

const serviceOptions = [
  "Wall & floor tiling",
  "Regrouting & resealing",
  "Leaking shower repair",
  "Waterproofing",
  "Bathroom renovation",
  "Kitchen splashback",
  "Tile & grout restoration",
  "Silicone reseal",
  "Something else",
];

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-stone-500 focus:border-brand focus:ring-1 focus:ring-brand/30";

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
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please call us instead.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-stone-200 bg-white p-10 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold text-ink">
          Thanks — request received
        </h3>
        <p className="mt-2 max-w-sm text-sm text-stone-500">
          We'll be in touch shortly to arrange your free quote. Need us sooner?
          Give us a call.
        </p>
        <a
          href={site.phone.href}
          className="mt-6 inline-flex items-center justify-center rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-ink transition hover:bg-stone-50"
        >
          Call {site.phone.display}
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8"
    >
      <h3 className="font-display text-lg font-semibold text-ink">
        Request your free quote
      </h3>
      <p className="mt-1 text-sm text-stone-500">
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
          className="mt-4 rounded-lg border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-ink"
        >
          {error} You can also reach us on{" "}
          <a href={site.phone.href} className="font-medium underline">
            {site.phone.display}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-base font-medium text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
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
      <p className="mt-3 text-center text-xs text-stone-500">
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
        {props.required && <span className="text-stone-500"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-stone-500 focus:border-brand focus:ring-1 focus:ring-brand/30"
        {...props}
      />
    </div>
  );
}
