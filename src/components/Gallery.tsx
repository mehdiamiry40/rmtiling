import Image from "next/image";
import Link from "next/link";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Project = {
  title: string;
  tag: string;
  description: string;
  image: string;
  alt: string;
};

const projects: Project[] = [
  {
    title: "Bathroom Tiling and Waterproofing",
    tag: "Bathroom Renovation",
    description: "Large-format walls, frameless shower detailing and clean grout alignment for a modern wet-area finish.",
    image: "/images/generated/bathroom-hero.webp",
    alt: "Modern bathroom with large-format tiles and frameless shower glass",
  },
  {
    title: "Kitchen Splashback Rework",
    tag: "Kitchen Renovation",
    description: "Warm ceramic splashbacks with tidy edges, neat outlet cuts and easy-clean surfaces.",
    image: "/images/generated/kitchen-splashback.webp",
    alt: "Warm off-white tiled kitchen splashback with timber shelving",
  },
  {
    title: "Complete Shower Regrout and Reseal",
    tag: "Bathroom Maintenance",
    description: "Fresh grout and silicone lines for a cleaner shower finish and better moisture control.",
    image: "/images/generated/shower-regrout.webp",
    alt: "Clean shower corner with fresh grout and silicone sealing",
  },
  {
    title: "Large Format Floor Tiling",
    tag: "House Tiling",
    description: "Level stone-look floors for bathrooms, laundries and open-plan living areas.",
    image: "/images/generated/large-format-floor.webp",
    alt: "Large-format stone-look floor tiles in a modern Australian home",
  },
];

export function Gallery() {
  return (
    <section id="gallery" className="bg-porcelain py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow=""
          title="Our Projects"
          description="Representative project-style visuals to help plan your quote. Verified RM Tiling project photos can be added as the portfolio grows."
        />

        <div className="mt-16 grid gap-x-16 gap-y-14 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={(i % 3) * 70}>
              <article className="group">
                <div className="relative aspect-[1.45] overflow-hidden bg-linen">
                  <Image
                    src={project.image}
                    alt={project.alt}
                    fill
                    loading="eager"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5">
                  <p className="text-sm font-medium text-clay">{project.tag}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-maroon">
                    {project.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-ink">
                    {project.description}
                  </p>
                  <Link
                    href="/#contact"
                    className="mt-5 inline-flex text-base font-medium text-clay underline underline-offset-2 transition hover:text-maroon"
                  >
                    Request similar work
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/#contact"
            className="inline-flex border border-clay px-7 py-4 text-base font-semibold text-clay transition hover:bg-clay hover:text-white"
          >
            Discuss your project
          </Link>
        </div>
      </div>
    </section>
  );
}
