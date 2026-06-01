import { Reveal } from "./Reveal";

const suppliers = [
  { name: "BEAUMONT TILES", style: "beaumont" },
  { name: "NATIONAL TILES", style: "national" },
  { name: "Bunnings", sub: "Tile Adhesive & Grout", style: "bunnings" },
  { name: "Reece", sub: "Bathrooms", style: "reece" },
  { name: "MAPEI", sub: "Adhesives / Grouts / Sealants", style: "mapei" },
  { name: "LATICRETE", style: "laticrete" },
  { name: "ARDEX", sub: "Tile & Stone Systems", style: "ardex" },
  { name: "Davco", sub: "A Sika brand", style: "davco" },
];

export function Suppliers() {
  return (
    <section id="suppliers" className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-24">
        <Reveal>
          <div className="lg:pt-8">
            <h2 className="font-display text-4xl font-semibold leading-tight text-maroon sm:text-5xl">
              Our Suppliers
            </h2>
            <p className="mt-7 max-w-md text-lg font-medium leading-relaxed text-zinc-600">
              A practical mix of widely used Australian tile retailers and
              professional grout, adhesive and waterproofing brands.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid grid-cols-1 border-l border-t border-zinc-200 bg-white sm:grid-cols-2 xl:grid-cols-4">
            {suppliers.map((supplier) => (
              <div
                key={supplier.name}
                className="flex min-h-40 items-center justify-center overflow-hidden border-b border-r border-zinc-200 px-5 py-8 text-center"
              >
                <div data-supplier-mark>
                  <SupplierMark {...supplier} />
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SupplierMark({
  name,
  sub,
  style,
}: {
  name: string;
  sub?: string;
  style: string;
}) {
  if (style === "beaumont") {
    return (
      <div className="relative inline-flex rotate-[-2deg] items-center gap-2">
        <span className="h-12 w-12 rotate-12 bg-red-600" aria-hidden />
        <span className="text-xl font-extrabold tracking-tight text-red-600">
          {name}
        </span>
      </div>
    );
  }

  if (style === "national") {
    return (
      <div className="inline-flex flex-col items-center">
        <span className="text-[1.7rem] font-black tracking-[-0.04em] text-[#253c74]">
          NATIONAL
        </span>
        <span className="-mt-1 text-xl font-semibold tracking-[0.24em] text-[#c22128]">
          TILES
        </span>
      </div>
    );
  }

  if (style === "bunnings") {
    return (
      <div className="inline-flex flex-col items-center">
        <span className="bg-[#0b7d3b] px-5 py-2 text-2xl font-black tracking-tight text-white">
          {name}
        </span>
        <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
          {sub}
        </span>
      </div>
    );
  }

  if (style === "reece") {
    return (
      <div className="inline-flex flex-col items-center">
        <span className="rounded-[40%] bg-[#123d70] px-6 py-3 text-4xl font-black tracking-tight text-white">
          {name}
        </span>
        <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
          {sub}
        </span>
      </div>
    );
  }

  if (style === "mapei") {
    return (
      <div className="inline-flex flex-col items-center">
        <span className="border-4 border-[#244f9e] px-4 py-1 text-3xl font-black tracking-[0.08em] text-[#244f9e]">
          {name}
        </span>
        <span className="mt-2 max-w-36 text-[10px] font-semibold uppercase leading-tight tracking-[0.1em] text-zinc-500">
          {sub}
        </span>
      </div>
    );
  }

  if (style === "laticrete") {
    return (
      <div className="border border-zinc-300 bg-white p-2 shadow-sm">
        <div className="grid grid-cols-4 gap-1">
          {Array.from({ length: 8 }).map((_, index) => (
            <span key={index} className="h-7 w-7 bg-sky-400" />
          ))}
        </div>
        <div className="mt-1 bg-zinc-900 px-2 py-1 text-xl font-black tracking-wide text-white">
          {name}
        </div>
      </div>
    );
  }

  if (style === "ardex") {
    return (
      <div className="inline-flex flex-col items-center">
        <span className="bg-[#e32f25] px-5 py-2 text-3xl font-black tracking-[0.12em] text-white">
          {name}
        </span>
        <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
          {sub}
        </span>
      </div>
    );
  }

  if (style === "davco") {
    return (
      <div className="inline-flex flex-col items-center">
        <span className="text-4xl font-black italic tracking-tight text-[#14427d]">
          {name}
        </span>
        <span className="mt-1 border-t-2 border-[#f2c230] pt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
          {sub}
        </span>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col items-center">
      <span className="rounded bg-slate-700 px-5 py-1 text-3xl font-black italic tracking-tight text-white">
        {name}
      </span>
      <span className="mt-1 max-w-40 text-[10px] font-semibold leading-tight text-slate-500">
        {sub}
      </span>
    </div>
  );
}
