import { MapPin, Phone } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

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
    <section id="areas" className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Where we work"
            title="Proudly servicing greater Melbourne"
            description="Based in Melbourne and covering the CBD, inner city, bayside, east and beyond. If you're not sure we reach you, just ask."
          />
          <Reveal delay={120} className="mt-8">
            <a
              href={site.phone.href}
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
            >
              <Phone className="h-4 w-4" />
              Call {site.phone.display}
            </a>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="flex flex-wrap gap-2.5">
            {suburbs.map((suburb) => (
              <span
                key={suburb}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:text-brand-700"
              >
                <MapPin className="h-3.5 w-3.5 text-brand-500" aria-hidden />
                {suburb}
              </span>
            ))}
            <span className="inline-flex items-center rounded-full bg-brand-600 px-3.5 py-2 text-sm font-bold text-white">
              + all of greater Melbourne
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
