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
    <section id="areas" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <SectionHeading
          eyebrow="Where we work"
          title="Proudly servicing greater Melbourne"
          description="Based in Melbourne, covering the CBD, inner city, bayside, eastern suburbs and beyond. Not sure if we reach you? Just ask."
        />

        <Reveal delay={80} className="mt-12 flex flex-wrap justify-center gap-2.5">
          {suburbs.map((suburb) => (
            <span
              key={suburb}
              className="rounded-full border border-zinc-200 bg-porcelain px-4 py-1.5 text-sm text-zinc-600 transition hover:border-clay/40 hover:text-ink"
            >
              {suburb}
            </span>
          ))}
          <span className="rounded-full bg-sage px-4 py-1.5 text-sm font-medium text-white">
            + all of greater Melbourne
          </span>
        </Reveal>
      </div>
    </section>
  );
}
