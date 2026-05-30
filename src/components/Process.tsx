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
      "Our licensed tilers lay, grout and seal with precision — to the highest standards.",
  },
  {
    title: "Clean finish & guarantee",
    description:
      "We clean up, walk you through the work and back it with our workmanship guarantee.",
  },
];

export function Process() {
  return (
    <section id="process" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Process"
          title="A simple, stress-free process"
          description="From first call to final clean-up, we keep things clear, tidy and on schedule."
        />

        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, i) => (
            <Reveal
              key={step.title}
              delay={i * 80}
              className="border-t border-stone-200 pt-6"
            >
              <span className="font-display text-4xl font-light tracking-tight text-stone-300">
                0{i + 1}
              </span>
              <h3 className="mt-5 text-base font-medium text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-500">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
