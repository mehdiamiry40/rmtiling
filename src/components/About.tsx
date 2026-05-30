import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { LogoMark } from "./Logo";
import { site } from "@/lib/site";

const facts = [
  { k: "Established", v: String(site.established) },
  { k: "Based in", v: "Melbourne, VIC" },
  { k: "Experience", v: `${site.yearsExperience} years` },
  { k: "Workmanship", v: "Guaranteed" },
];

export function About() {
  return (
    <section id="about" className="bg-white py-24 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            align="left"
            eyebrow="About"
            title="A local team that treats your home like our own"
          />
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-stone-500">
            <p>
              {site.name} is a Melbourne-based tiling and regrouting business
              built on a simple idea: do honest, careful work and stand behind
              it. From a small regrout to a full bathroom renovation, we bring
              the same precision and tidy finish to every project.
            </p>
            <p>
              We're fully licensed and insured, quote upfront with no surprises,
              and turn up when we say we will — so your tiles look sharp, keep
              water where it belongs and last for years.
            </p>
          </div>
          <p className="mt-6 text-base font-medium text-ink">— Reza, Founder</p>
        </div>

        <Reveal delay={100}>
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-8">
            <div className="flex items-center gap-3">
              <LogoMark className="h-9 w-9" />
              <div>
                <p className="font-display text-base font-semibold text-ink">
                  {site.name}
                </p>
                <p className="text-sm text-stone-500">{site.tagline}</p>
              </div>
            </div>
            <dl className="mt-6 divide-y divide-stone-200 border-t border-stone-200">
              {facts.map((fact) => (
                <div
                  key={fact.k}
                  className="flex items-center justify-between py-3.5 text-sm"
                >
                  <dt className="text-stone-500">{fact.k}</dt>
                  <dd className="font-medium text-ink">{fact.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
