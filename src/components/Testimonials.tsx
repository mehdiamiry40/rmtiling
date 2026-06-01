import { BadgeCheck, ClipboardCheck, ShieldCheck, Sparkles } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Clear before we start",
    description:
      "Written scope, trade details and job expectations confirmed before work begins.",
  },
  {
    icon: ClipboardCheck,
    title: "Written fixed quotes",
    description:
      "Clear scope, clear price and practical advice before you commit to the job.",
  },
  {
    icon: BadgeCheck,
    title: "Careful workmanship",
    description:
      "Proper preparation, quality materials and a finish designed to hold up.",
  },
  {
    icon: Sparkles,
    title: "Clean handover",
    description:
      "Dust control, tidy work habits and a final walk-through before we leave.",
  },
];

export function Testimonials() {
  return (
    <section id="trust" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Trust"
          title="Built for low-stress trade work"
          description="Reliable communication, careful preparation and a clean finish from quote to handover."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustItems.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="flex h-full flex-col rounded-lg border border-zinc-200 bg-porcelain p-7">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-clay">
                  <item.icon
                    className="h-5 w-5"
                    strokeWidth={1.6}
                    aria-hidden
                  />
                </div>
                <h3 className="mt-5 text-base font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
