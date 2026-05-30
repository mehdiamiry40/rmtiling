import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";

// A quiet tonal ramp of "tile samples" — minimal, monochrome, on-theme.
const swatches = ["bg-stone-100", "bg-stone-200", "bg-stone-400", "bg-stone-700", "bg-ink"];

export function Hero() {
  return (
    <section id="top" className="relative bg-white">
      <div className="mx-auto max-w-3xl px-6 pt-20 pb-14 text-center sm:pt-28">
        <span className="inline-block text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
          Melbourne · Tiling &amp; Regrouting
        </span>

        <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.04] tracking-tight text-ink sm:text-7xl">
          Tiling &amp; regrouting,
          <br />
          done right.
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-stone-500">
          From leaking shower repairs and regrouting to full bathroom
          renovations — clean, durable, guaranteed workmanship across Melbourne.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-base font-medium text-white transition hover:bg-stone-700"
          >
            Get a free quote
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href={site.phone.href}
            className="inline-flex items-center justify-center rounded-full border border-stone-300 px-7 py-3.5 text-base font-medium text-ink transition hover:bg-stone-50"
          >
            Call {site.phone.display}
          </a>
        </div>

        <p className="mt-8 text-sm text-stone-400">
          Licensed &amp; insured · {site.yearsExperience} years' experience ·
          Rated 5.0
        </p>
      </div>

      {/* Tile sample ramp */}
      <div className="mx-auto max-w-4xl px-6 pb-20 sm:pb-28">
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
          {swatches.map((bg, i) => (
            <div
              key={i}
              className={`aspect-square rounded-xl border border-stone-200 ${bg}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
