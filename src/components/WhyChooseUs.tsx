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
import { site } from "@/lib/site";

type Feature = { icon: LucideIcon; title: string; description: string };

const features: Feature[] = [
  {
    icon: ShieldCheck,
    title: "Prepared properly",
    description: "Clear scope, protected surfaces and the right materials for the job.",
  },
  {
    icon: BadgeCheck,
    title: `${site.yearsExperience} years' experience`,
    description: "Practical experience across Melbourne bathrooms, kitchens and floors.",
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
    title: "Clear scheduling",
    description: "We agree timing before work begins and keep you updated as the job moves.",
  },
  {
    icon: MapPin,
    title: "Melbourne-wide",
    description: "Servicing the CBD and suburbs across greater Melbourne.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-charcoal py-24 text-white sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            align="left"
            eyebrow="Why RM Tiling"
            tone="light"
            title="Quiet confidence, not trade-site chaos"
            description="You get a clear quote, tidy site habits, practical material choices and workmanship that respects the room around it."
          />
          <Reveal delay={100} className="mt-8">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 rounded-lg bg-clay px-6 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-ink"
            >
              Get a free quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </Reveal>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 3) * 70}>
              <div className="h-full rounded-lg border border-white/10 bg-white/[0.06] p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-clay">
                  <feature.icon
                    className="h-5 w-5 shrink-0"
                    strokeWidth={1.6}
                    aria-hidden
                  />
                </div>
                <div>
                  <h3 className="mt-5 text-base font-medium text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/58">
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
