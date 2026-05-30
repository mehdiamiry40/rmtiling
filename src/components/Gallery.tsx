import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Project = {
  title: string;
  area: string;
  tag: string;
  /** Tiles per row — varies the apparent tile format (large format → mosaic). */
  grid: number;
  /** Indices rendered as dark "feature" tiles. */
  accents: number[];
};

const projects: Project[] = [
  { title: "Floor-to-ceiling bathroom", area: "Brighton", tag: "Full renovation", grid: 3, accents: [4] },
  { title: "Herringbone splashback", area: "Richmond", tag: "Kitchen", grid: 4, accents: [5, 10] },
  { title: "Shower regrout & reseal", area: "Brunswick", tag: "Regrouting", grid: 3, accents: [2, 6] },
  { title: "Large-format floor tiling", area: "Hawthorn", tag: "Flooring", grid: 2, accents: [3] },
  { title: "Laundry renovation", area: "Box Hill", tag: "Renovation", grid: 3, accents: [0, 8] },
  { title: "Outdoor patio tiling", area: "St Kilda", tag: "Outdoor", grid: 4, accents: [6, 9] },
];

export function Gallery() {
  return (
    <section id="gallery" className="bg-stone-50 py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Our work"
          title="Recent projects"
          description="Crisp lines, clean grout and a finish that lasts — across Melbourne."
        />

        <div className="mt-16 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={(i % 3) * 70}>
              <figure className="group">
                <div className="rounded-2xl border border-stone-200 bg-white p-4 transition-colors group-hover:border-stone-300">
                  <div
                    className="grid gap-1.5"
                    style={{
                      gridTemplateColumns: `repeat(${project.grid}, minmax(0, 1fr))`,
                    }}
                  >
                    {Array.from({ length: project.grid * project.grid }).map(
                      (_, k) => (
                        <div
                          key={k}
                          className={`aspect-square rounded-[3px] ${
                            project.accents.includes(k)
                              ? "bg-ink"
                              : "bg-stone-200/70"
                          }`}
                        />
                      ),
                    )}
                  </div>
                </div>
                <figcaption className="mt-4">
                  <span className="text-xs uppercase tracking-[0.15em] text-stone-400">
                    {project.tag}
                  </span>
                  <p className="mt-1.5 text-base font-medium text-ink">
                    {project.title}
                  </p>
                  <p className="text-sm text-stone-500">{project.area}, VIC</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
