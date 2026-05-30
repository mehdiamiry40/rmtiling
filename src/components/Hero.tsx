import { ArrowRight, Phone, ShieldCheck, Star } from "lucide-react";
import { site } from "@/lib/site";

const trustItems = [
  { icon: Star, label: "5.0 rating" },
  { icon: ShieldCheck, label: "Licensed & insured" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-brand-50/40">
      {/* Decorative background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 text-brand-900/[0.06] tile-grid"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-brand-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-accent-300/30 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        {/* Copy */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-700 shadow-sm">
            <span className="flex text-accent-500" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </span>
            Rated 5.0 by Melbourne homeowners
          </span>

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Beautiful tiling &amp; regrouting,{" "}
            <span className="relative whitespace-nowrap text-brand-700">
              done right
              <svg
                className="absolute -bottom-2 left-0 h-3 w-full text-accent-400"
                viewBox="0 0 200 12"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden
              >
                <path
                  d="M2 9C50 3 150 3 198 8"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            across Melbourne.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
            From leaking shower repairs and regrouting to full bathroom
            renovations, {site.name} delivers clean, durable and guaranteed
            workmanship — fully licensed, insured and always on time.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 text-base font-bold text-ink shadow-lg shadow-accent-500/30 transition hover:bg-accent-400"
            >
              Get a Free Quote
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={site.phone.href}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-base font-bold text-ink transition hover:border-brand-300 hover:bg-brand-50"
            >
              <Phone className="h-4 w-4 text-brand-600" />
              {site.phone.display}
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-slate-600">
            {trustItems.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2">
                <Icon className="h-4 w-4 text-brand-600" aria-hidden />
                {label}
              </span>
            ))}
            <span className="inline-flex items-center gap-2">
              <span className="font-display text-base font-extrabold text-brand-700">
                {site.yearsExperience}
              </span>
              years' experience
            </span>
          </div>
        </div>

        {/* Visual: stylised tiled wall + floor */}
        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  // Offset "subway" tile rows for the wall.
  const wallRows = [0, 1, 2, 3];
  // Large-format floor tiles; one amber accent tile.
  const floorTiles = Array.from({ length: 8 });

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white shadow-2xl shadow-brand-900/10 ring-1 ring-brand-900/5">
        {/* Wall */}
        <div className="space-y-2 bg-gradient-to-b from-brand-50 to-white p-5">
          {wallRows.map((row) => (
            <div
              key={row}
              className="flex gap-2"
              style={{ marginLeft: row % 2 ? "1.75rem" : 0 }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-9 flex-1 rounded-md bg-white shadow-sm ring-1 ring-brand-100"
                />
              ))}
            </div>
          ))}
        </div>
        {/* Floor */}
        <div className="grid grid-cols-4 gap-2 bg-brand-700 p-5">
          {floorTiles.map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-lg ${
                i === 5
                  ? "bg-accent-400 shadow-lg shadow-accent-500/40"
                  : i % 3 === 0
                    ? "bg-brand-500"
                    : "bg-brand-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Floating rating chip */}
      <div className="absolute -left-4 top-8 hidden rounded-2xl border border-slate-100 bg-white p-3.5 shadow-xl sm:block">
        <div className="flex text-accent-500" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current" />
          ))}
        </div>
        <p className="mt-1 text-xs font-semibold text-slate-500">
          <span className="font-display text-base font-extrabold text-ink">
            5.0
          </span>{" "}
          from local reviews
        </p>
      </div>

      {/* Floating guarantee chip */}
      <div className="absolute -bottom-5 -right-3 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3.5 shadow-xl sm:flex">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <div className="pr-1">
          <p className="font-display text-sm font-extrabold text-ink">
            Workmanship
          </p>
          <p className="text-xs font-medium text-slate-500">Guaranteed</p>
        </div>
      </div>
    </div>
  );
}
