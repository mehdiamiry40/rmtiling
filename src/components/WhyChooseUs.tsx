import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  type LucideIcon,
  MapPin,
  ReceiptText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

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
    description: "Servicing the CBD and suburbs across greater Melbourne.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-stone-50 py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="Why RM Tiling"
            title="Trades you can trust in your home"
            description="We treat every job like it's our own — quality materials, proper preparation and a finish that lasts."
          />
          <Reveal delay={100} className="mt-8">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
            >
              Get a free quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="divide-y divide-stone-200 border-y border-stone-200">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 3) * 70}>
              <div className="flex gap-5 py-6">
                <feature.icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-ink"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <div>
                  <h3 className="text-base font-medium text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-stone-500">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
