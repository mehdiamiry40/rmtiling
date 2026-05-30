import { Reveal } from "./Reveal";

const stats = [
  { value: "1,000+", label: "Projects completed" },
  { value: "15+", label: "Years' experience" },
  { value: "5.0★", label: "Average review rating" },
  { value: "100%", label: "Workmanship guaranteed" },
];

export function Stats() {
  return (
    <section className="bg-brand-800">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-6 py-10 md:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 80}
            className="border-brand-700/60 text-center md:border-l md:first:border-l-0"
          >
            <div className="font-display text-3xl font-extrabold text-white sm:text-4xl">
              {stat.value}
            </div>
            <div className="mt-1 text-sm font-medium text-brand-100/80">
              {stat.label}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
