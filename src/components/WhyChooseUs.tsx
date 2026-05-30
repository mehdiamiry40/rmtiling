import {
  BadgeCheck,
  CalendarClock,
  type LucideIcon,
  MapPin,
  ReceiptText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ArrowRight, Phone } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

type Feature = { icon: LucideIcon; title: string; description: string };

const features: Feature[] = [
  {
    icon: ShieldCheck,
    title: "Licensed & insured",
    description: "Fully qualified tilers and complete public liability cover.",
  },
  {
    icon: BadgeCheck,
    title: "15+ years' experience",
    description: "Thousands of Melbourne bathrooms, kitchens and floors.",
  },
  {
    icon: ReceiptText,
    title: "Free, fixed quotes",
    description: "No-obligation, upfront pricing with no nasty surprises.",
  },
  {
    icon: Sparkles,
    title: "Clean & tidy",
    description: "We protect your home and leave it spotless every day.",
  },
  {
    icon: CalendarClock,
    title: "On time, every time",
    description: "We turn up when we say we will and finish on schedule.",
  },
  {
    icon: MapPin,
    title: "Melbourne-wide",
    description: "Servicing the CBD and suburbs right across greater Melbourne.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-start gap-12 px-6 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Why RM Tiling"
            title="Trades you can trust in your home"
            description="We treat every job like it's our own home — quality materials, proper preparation and a finish that lasts."
          />

          <div className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {features.map((feature, i) => (
              <Reveal
                key={feature.title}
                delay={(i % 2) * 80}
                className="flex gap-4"
              >
                <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                  <feature.icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Promise panel */}
        <Reveal delay={120}>
          <div className="relative overflow-hidden rounded-3xl bg-brand-800 p-8 text-white shadow-xl sm:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 text-white tile-grid opacity-[0.07]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-500/30 blur-2xl"
            />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-100">
                <ShieldCheck className="h-4 w-4 text-accent-400" />
                Our promise to you
              </span>
              <h3 className="mt-5 font-display text-2xl font-extrabold sm:text-3xl">
                Guaranteed workmanship, or we'll make it right.
              </h3>
              <ul className="mt-7 space-y-4">
                {[
                  "A written, fixed-price quote before we start.",
                  "Australian-standard waterproofing & materials.",
                  "Workmanship guarantee on every job we complete.",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" />
                    <span className="text-brand-50/90">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-6 py-3 text-sm font-bold text-ink transition hover:bg-accent-400"
                >
                  Get your free quote
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href={site.phone.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  <Phone className="h-4 w-4 text-accent-400" />
                  {site.phone.display}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
