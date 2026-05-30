import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-brand-900 py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 text-white tile-grid opacity-[0.05]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-brand-600/30 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-2">
        {/* Details */}
        <Reveal>
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-300">
            <span className="h-px w-6 bg-brand-400" />
            Get in touch
          </span>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Ready for a free, no-obligation quote?
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-brand-100/80">
            Call us or send a quick message about your project. We'll get back
            to you fast with honest advice and a fixed price.
          </p>

          <div className="mt-10 space-y-5">
            <ContactRow
              icon={Phone}
              label="Call us"
              value={site.phone.display}
              href={site.phone.href}
            />
            <ContactRow
              icon={Mail}
              label="Email us"
              value={site.email}
              href={`mailto:${site.email}`}
            />
            <ContactRow
              icon={MapPin}
              label="Service area"
              value={site.serviceArea}
            />
            <div className="flex gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent-400">
                <Clock className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-brand-300">
                  Opening hours
                </p>
                <ul className="mt-1 space-y-0.5 text-brand-50/90">
                  {site.hours.map((slot) => (
                    <li key={slot.days} className="text-sm">
                      <span className="font-semibold">{slot.days}:</span>{" "}
                      {slot.time}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <p className="mt-8 text-sm text-brand-200/70">
            ABN {site.abn} · Fully licensed &amp; insured
          </p>
        </Reveal>

        {/* Form */}
        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-accent-400">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-brand-300">
          {label}
        </p>
        <p className="font-display text-lg font-bold text-white">{value}</p>
      </div>
    </div>
  );

  return href ? (
    <a href={href} className="block transition hover:opacity-80">
      {content}
    </a>
  ) : (
    content
  );
}
