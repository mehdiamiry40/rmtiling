import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

export function Contact() {
  return (
    <section id="contact" className="bg-stone-50 py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        {/* Details */}
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
            Get in touch
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Ready for a free quote?
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-stone-500">
            Call us or send a quick message about your project. We'll get back to
            you fast with honest advice and a fixed price.
          </p>

          <dl className="mt-10 divide-y divide-stone-200 border-y border-stone-200">
            <ContactRow icon={Phone} label="Call us" value={site.phone.display} href={site.phone.href} />
            <ContactRow icon={Mail} label="Email us" value={site.email} href={`mailto:${site.email}`} />
            <div className="flex items-start gap-4 py-5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" strokeWidth={1.5} aria-hidden />
              <div>
                <dt className="text-xs uppercase tracking-[0.15em] text-stone-500">
                  Opening hours
                </dt>
                <dd className="mt-1.5 space-y-0.5 text-sm text-stone-600">
                  {site.hours.map((slot) => (
                    <div key={slot.days}>
                      <span className="text-ink">{slot.days}:</span> {slot.time}
                    </div>
                  ))}
                </dd>
              </div>
            </div>
            <ContactRow icon={MapPin} label="Service area" value={site.serviceArea} />
          </dl>

          <p className="mt-6 text-sm text-stone-500">
            ABN {site.abn} · Fully licensed &amp; insured
          </p>
        </Reveal>

        {/* Form */}
        <Reveal delay={100}>
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
  return (
    <div className="flex items-start gap-4 py-5">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-stone-500" strokeWidth={1.5} aria-hidden />
      <div>
        <dt className="text-xs uppercase tracking-[0.15em] text-stone-500">
          {label}
        </dt>
        <dd className="mt-1 text-base font-medium text-ink">
          {href ? (
            <a href={href} className="transition hover:text-stone-600">
              {value}
            </a>
          ) : (
            value
          )}
        </dd>
      </div>
    </div>
  );
}
