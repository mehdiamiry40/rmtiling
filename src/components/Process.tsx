import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const steps = [
  {
    title: "Free quote & consult",
    description:
      "Tell us about your project. We assess the space and give you a clear, fixed-price quote.",
  },
  {
    title: "Prep & protect",
    description:
      "We protect your home, remove old tiles or grout, then prepare and waterproof every surface.",
  },
  {
    title: "Expert installation",
    description:
      "Experienced tilers lay, grout and seal with precision — to the highest standards.",
  },
  {
    title: "Clean finish & handover",
    description:
      "We clean up, walk you through the work and make sure the finished area is ready to use.",
  },
];

export function Process() {
  return (
    <section id="process" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Process"
          title="From first message to final wipe-down"
          description="Every stage is designed to remove guesswork: scope, quote, preparation, installation and handover."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal
              key={step.title}
              delay={i * 80}
            >
              <div className="relative h-full rounded-lg border border-zinc-200 bg-porcelain p-6">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-charcoal text-sm font-semibold text-white">
                  0{i + 1}
                </span>
                <h3 className="mt-6 text-base font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
