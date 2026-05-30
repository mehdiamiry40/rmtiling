import { Reveal } from "./Reveal";

const stats = [
  { value: "1,000+", label: "Projects completed" },
  { value: "15+", label: "Years' experience" },
  { value: "5.0", label: "Average review rating" },
  { value: "100%", label: "Workmanship guaranteed" },
];

export function Stats() {
  return (
    <section className="border-y border-stone-200 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 px-6 sm:grid-cols-4 sm:divide-x sm:divide-stone-200">
        {stats.map((stat, i) => (
          <Reveal
            key={stat.label}
            delay={i * 70}
            className="px-2 py-10 text-center sm:px-6"
          >
            <div className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              {stat.value}
            </div>
            <div className="mt-2 text-sm text-stone-500">{stat.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
