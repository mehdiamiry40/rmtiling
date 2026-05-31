import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const suburbs = [
  "Melbourne CBD",
  "Carlton",
  "Fitzroy",
  "Brunswick",
  "Coburg",
  "Northcote",
  "Preston",
  "Richmond",
  "Hawthorn",
  "Camberwell",
  "Kew",
  "Box Hill",
  "Doncaster",
  "Glen Waverley",
  "Brighton",
  "St Kilda",
  "Malvern",
  "Footscray",
  "Williamstown",
  "Essendon",
  "Moonee Ponds",
  "Frankston",
];

export function ServiceAreas() {
  return (
    <section id="areas" className="bg-stone-50 py-24 sm:py-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <SectionHeading
          eyebrow="Where we work"
          title="Proudly servicing greater Melbourne"
          description="Based in Melbourne, covering the CBD, inner city, bayside, eastern suburbs and beyond. Not sure if we reach you? Just ask."
        />

        <Reveal delay={80} className="mt-12 flex flex-wrap justify-center gap-2.5">
          {suburbs.map((suburb) => (
            <span
              key={suburb}
              className="rounded-full border border-stone-200 bg-white px-4 py-1.5 text-sm text-stone-600 transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand"
            >
              {suburb}
            </span>
          ))}
          <span className="rounded-full bg-brand px-4 py-1.5 text-sm font-medium text-white">
            + all of greater Melbourne
          </span>
        </Reveal>
      </div>
    </section>
  );
}
