"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2, Phone } from "lucide-react";
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
      <div className="flex h-full flex-col items-center justify-center rounded-3xl border border-brand-200 bg-brand-50/60 p-10 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-white">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="mt-5 font-display text-2xl font-extrabold text-ink">
          Thanks — request received!
        </h3>
        <p className="mt-2 max-w-sm text-slate-600">
          We'll be in touch shortly to arrange your free quote. Need us sooner?
          Give us a call.
        </p>
        <a
          href={site.phone.href}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-bold text-ink transition hover:bg-accent-400"
        >
          <Phone className="h-4 w-4" />
          {site.phone.display}
        </a>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-brand-900/5 sm:p-8"
    >
      <h3 className="font-display text-xl font-extrabold text-ink">
        Request your free quote
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        Fill in the form and we'll get back to you, usually the same day.
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
        <Field
          label="Phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          required
        />
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
          <label
            htmlFor="service"
            className="text-sm font-semibold text-ink"
          >
            Service needed
          </label>
          <select
            id="service"
            name="service"
            defaultValue=""
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
          >
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
          <label
            htmlFor="message"
            className="text-sm font-semibold text-ink"
          >
            Tell us about your project
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="e.g. Regrout and reseal a leaking shower in the main bathroom."
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
          />
        </div>
      </div>

      {status === "error" && (
        <p
          role="alert"
          className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {error} You can also reach us on{" "}
          <a href={site.phone.href} className="font-bold underline">
            {site.phone.display}
          </a>
          .
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3.5 text-base font-bold text-ink shadow-lg shadow-accent-500/30 transition hover:bg-accent-400 disabled:cursor-not-allowed disabled:opacity-70"
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
      <p className="mt-3 text-center text-xs text-slate-400">
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
      <label htmlFor={name} className="text-sm font-semibold text-ink">
        {label}
        {props.required && <span className="text-accent-600"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-ink outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
        {...props}
      />
    </div>
  );
}
