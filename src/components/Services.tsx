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
    title: "Wall & floor tiling",
    description:
      "Precision tiling for bathrooms, kitchens, laundries and outdoor spaces — any size, any tile.",
  },
  {
    icon: Paintbrush,
    title: "Regrouting & resealing",
    description:
      "Bring tired, cracked or discoloured grout back to life and keep moisture out.",
  },
  {
    icon: ShowerHead,
    title: "Leaking shower repairs",
    description:
      "Fix leaking showers without ripping out tiles — fast, clean and guaranteed.",
  },
  {
    icon: Droplets,
    title: "Waterproofing",
    description:
      "Australian-standard waterproofing for showers, wet areas, balconies and laundries.",
  },
  {
    icon: Bath,
    title: "Bathroom renovations",
    description:
      "Complete makeovers, project-managed from demolition through to the final seal.",
  },
  {
    icon: UtensilsCrossed,
    title: "Kitchen splashbacks",
    description:
      "Statement splashbacks and feature walls — subway, herringbone or mosaic.",
  },
  {
    icon: Sparkles,
    title: "Tile & grout restoration",
    description:
      "Deep cleaning, repairs and recolouring to restore the original finish.",
  },
  {
    icon: Wrench,
    title: "Silicone reseal",
    description:
      "Old, mouldy silicone replaced with a crisp, hygienic, mould-resistant finish.",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Services"
          title="What we do"
          description="A small repair, a refresh or a full renovation — covered start to finish."
        />

        <div className="mt-16 grid grid-cols-1 border-l border-t border-stone-200 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <Reveal
              key={service.title}
              delay={(i % 4) * 60}
              className="border-b border-r border-stone-200"
            >
              <div className="h-full p-8 transition-colors hover:bg-brand-50">
                <service.icon
                  className="h-6 w-6 text-brand"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <h3 className="mt-5 text-base font-medium text-ink">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-500">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
