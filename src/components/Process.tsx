import {
  ClipboardCheck,
  HardHat,
  type LucideIcon,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Step = { icon: LucideIcon; title: string; description: string };

const steps: Step[] = [
  {
    icon: PhoneCall,
    title: "Free quote & consult",
    description:
      "Tell us about your project. We assess the space, talk through options and give you a clear, fixed-price quote.",
  },
  {
    icon: ClipboardCheck,
    title: "Prep & protect",
    description:
      "We protect your home, remove old tiles or grout, then prepare and waterproof every surface properly.",
  },
  {
    icon: HardHat,
    title: "Expert installation",
    description:
      "Our licensed tilers lay, grout and seal with precision — to the highest Australian standards.",
  },
  {
    icon: Sparkles,
    title: "Clean finish & guarantee",
    description:
      "We clean up, walk you through the finished work and back it with our workmanship guarantee.",
  },
];

export function Process() {
  return (
    <section id="process" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="How it works"
          title="A simple, stress-free process"
          description="From first call to final clean-up, we keep things clear, tidy and on schedule."
        />

        <div className="relative mt-16">
          {/* Connector line (desktop) */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-brand-100 via-brand-300 to-brand-100 lg:block"
          />
          <ol className="grid gap-10 lg:grid-cols-4 lg:gap-6">
            {steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 90} className="relative">
                <div className="flex items-center gap-4 lg:flex-col lg:items-start">
                  <span className="relative inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/25">
                    <step.icon className="h-6 w-6" aria-hidden />
                    <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent-500 font-display text-xs font-extrabold text-ink ring-2 ring-white">
                      {i + 1}
                    </span>
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
