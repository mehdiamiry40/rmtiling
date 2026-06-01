import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

const stats = [
  { value: "Free", label: "Fixed-price quotes" },
  { value: site.yearsExperience, label: "Years' experience" },
  { value: "Local", label: "Melbourne-wide" },
  { value: "Careful", label: "Workmanship" },
];

export function Stats() {
  return (
    <section className="bg-charcoal text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 border-x border-white/10 px-4 sm:grid-cols-4 sm:divide-x sm:divide-white/10 sm:px-6">
        {stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 70}
            className="px-2 py-8 text-center sm:px-6 sm:py-10"
          >
            <div className="font-display text-3xl font-semibold text-white sm:text-5xl">
              {stat.value}
            </div>
            <div className="mt-2 text-sm text-white/58">{stat.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
