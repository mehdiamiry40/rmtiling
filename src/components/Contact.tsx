import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "./ContactForm";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

export function Contact() {
  const credentialText = site.abn
    ? `ABN ${site.abn} · ${site.serviceArea}`
    : site.serviceArea;

  return (
    <section id="contact" className="bg-porcelain py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Details */}
        <Reveal className="rounded-lg bg-charcoal p-7 text-white sm:p-9">
          <span className="text-xs font-medium uppercase text-white/50">
            Get in touch
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">
            Ready for a free quote?
          </h2>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-white/62">
            {site.phone.href ? "Call us or send" : "Send"} a quick message
            about your project. We'll get back to you with honest advice and a
            fixed price.
          </p>

          <dl className="mt-10 divide-y divide-white/12 border-y border-white/12">
            {site.phone.href && (
              <ContactRow
                icon={Phone}
                label="Call us"
                value={site.phone.display}
                href={site.phone.href}
              />
            )}
            <ContactRow icon={Mail} label="Email us" value={site.email} href={`mailto:${site.email}`} />
            <div className="flex items-start gap-4 py-5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-clay" strokeWidth={1.5} aria-hidden />
              <div>
                <dt className="text-xs uppercase text-white/65">
                  Opening hours
                </dt>
                <dd className="mt-1.5 space-y-0.5 text-sm text-white/65">
                  {site.hours.map((slot) => (
                    <div key={slot.days}>
                      <span className="text-white">{slot.days}:</span> {slot.time}
                    </div>
                  ))}
                </dd>
              </div>
            </div>
            <ContactRow icon={MapPin} label="Service area" value={site.serviceArea} />
          </dl>

          <p className="mt-6 text-sm text-white/50">
            {credentialText}
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
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-clay" strokeWidth={1.5} aria-hidden />
      <div>
        <dt className="text-xs uppercase text-white/65">
          {label}
        </dt>
        <dd className="mt-1 text-base font-medium text-white">
          {href ? (
            <a href={href} className="transition hover:text-white/75">
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
