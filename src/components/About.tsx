import { Check } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

const trustPoints = [
  "On time and reliable",
  "Local friendly business",
  `${site.yearsExperience} years of experience`,
  "Free fixed-price quotes",
];

export function About() {
  return (
    <section id="about" className="bg-white py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-24">
        <div>
          <SectionHeading
            align="left"
            eyebrow=""
            title="About RM Tiling and Bathroom Renovations"
          />
          <div className="mt-8 space-y-4 text-lg leading-relaxed text-ink">
            <p>
              Whether it is bathroom renovations, leaking shower bases,
              regrouting tiles or new silicone, you can be confident that we
              bring the practical experience and care needed for detailed wet
              area work.
            </p>
            <p>
              Every job starts with a clear quote and honest preparation advice,
              then moves through waterproofing, set-out, tiling, grouting and
              sealing with tidy site habits from start to finish.
            </p>
          </div>
          <a
            href="#services"
            className="mt-10 inline-flex border border-clay px-6 py-3 text-base font-semibold text-clay transition hover:bg-clay hover:text-white"
          >
            Learn More
          </a>
        </div>

        <Reveal delay={100} className="lg:pt-20">
          <ul className="space-y-9">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-clay text-white">
                  <Check className="h-6 w-6" strokeWidth={2.4} aria-hidden />
                </span>
                <span className="text-lg font-medium text-ink">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
