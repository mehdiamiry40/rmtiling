import {
  Bath,
  Droplets,
  LayoutGrid,
  type LucideIcon,
  Paintbrush,
  ShowerHead,
  Sparkles,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    icon: LayoutGrid,
    title: "Wall & Floor Tiling",
    description:
      "Precision tiling for bathrooms, kitchens, laundries, living areas and outdoor spaces — any size, any tile.",
  },
  {
    icon: Paintbrush,
    title: "Regrouting & Resealing",
    description:
      "Bring tired, cracked or discoloured grout back to life and stop moisture getting behind your tiles.",
  },
  {
    icon: ShowerHead,
    title: "Leaking Shower Repairs",
    description:
      "Fix leaking showers without ripping out the tiles — fast, clean, mess-free and fully guaranteed.",
  },
  {
    icon: Droplets,
    title: "Waterproofing",
    description:
      "Australian-standard waterproofing for showers, wet areas, balconies and laundries you can rely on.",
  },
  {
    icon: Bath,
    title: "Bathroom Renovations",
    description:
      "Complete bathroom makeovers, project-managed from demolition through to the very last seal.",
  },
  {
    icon: UtensilsCrossed,
    title: "Kitchen Splashbacks",
    description:
      "Statement splashbacks and feature walls — subway, herringbone, mosaic or large format, laid perfectly.",
  },
  {
    icon: Sparkles,
    title: "Tile & Grout Restoration",
    description:
      "Deep cleaning, repairs and recolouring to restore the original look of tired tiles and grout lines.",
  },
  {
    icon: Wrench,
    title: "Silicone Reseal",
    description:
      "Old, mouldy silicone replaced with a crisp, hygienic, mould-resistant finish around wet areas.",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="What we do"
          title="Tiling & regrouting services"
          description="Whatever your tiles need — a small repair, a refresh or a full renovation — RM Tiling has it covered, start to finish."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 4) * 70}>
              <article className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-900/5">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition group-hover:bg-brand-600 group-hover:text-white">
                  <service.icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-lg font-bold text-ink">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {service.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center">
          <p className="text-slate-600">
            Not sure what you need?{" "}
            <a
              href="#contact"
              className="font-semibold text-brand-700 underline-offset-4 hover:underline"
            >
              Get in touch for free advice and a quote
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
