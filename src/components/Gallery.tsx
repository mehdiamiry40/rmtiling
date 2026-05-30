import {
  Bath,
  Flower2,
  LayoutGrid,
  type LucideIcon,
  ShowerHead,
  Trees,
  UtensilsCrossed,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Project = {
  title: string;
  area: string;
  tag: string;
  icon: LucideIcon;
  /** Tailwind gradient classes for the tile panel. */
  gradient: string;
  /** Grout grid size in px (varies the apparent tile scale). */
  tile: number;
};

const projects: Project[] = [
  {
    title: "Floor-to-ceiling bathroom",
    area: "Brighton",
    tag: "Full renovation",
    icon: Bath,
    gradient: "from-brand-600 to-brand-800",
    tile: 30,
  },
  {
    title: "Herringbone splashback",
    area: "Richmond",
    tag: "Kitchen",
    icon: UtensilsCrossed,
    gradient: "from-accent-500 to-accent-600",
    tile: 22,
  },
  {
    title: "Shower regrout & reseal",
    area: "Brunswick",
    tag: "Regrouting",
    icon: ShowerHead,
    gradient: "from-brand-700 to-brand-900",
    tile: 18,
  },
  {
    title: "Large-format floor tiling",
    area: "Hawthorn",
    tag: "Flooring",
    icon: LayoutGrid,
    gradient: "from-slate-600 to-slate-800",
    tile: 48,
  },
  {
    title: "Laundry renovation",
    area: "Box Hill",
    tag: "Renovation",
    icon: Flower2,
    gradient: "from-brand-500 to-brand-700",
    tile: 26,
  },
  {
    title: "Outdoor patio tiling",
    area: "St Kilda",
    tag: "Outdoor",
    icon: Trees,
    gradient: "from-brand-800 to-slate-900",
    tile: 40,
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="bg-slate-50 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Our work"
          title="Recent projects across Melbourne"
          description="A snapshot of the kind of tiling and regrouting we do every week — crisp lines, clean grout and a finish that lasts."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={(i % 3) * 80}>
              <figure className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm ring-1 ring-slate-900/5">
                {/* Tiled panel */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-70 transition-transform duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, rgba(255,255,255,0.16) 1.5px, transparent 1.5px), linear-gradient(to bottom, rgba(255,255,255,0.16) 1.5px, transparent 1.5px)",
                      backgroundSize: `${project.tile}px ${project.tile}px`,
                    }}
                  />
                  <project.icon
                    className="absolute right-4 top-4 h-12 w-12 text-white/25"
                    aria-hidden
                  />
                </div>

                {/* Gradient scrim for caption legibility */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent"
                />

                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <span className="inline-flex rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur">
                    {project.tag}
                  </span>
                  <p className="mt-2 font-display text-lg font-bold leading-tight text-white">
                    {project.title}
                  </p>
                  <p className="text-sm font-medium text-white/75">
                    {project.area}, VIC
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
