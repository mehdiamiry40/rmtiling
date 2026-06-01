import { Reveal } from "./Reveal";

const suppliers = [
  { name: "BEAUMONT TILES", style: "beaumont" },
  { name: "BDW", style: "bdw" },
  { name: "Dribond", sub: "CONSTRUCTION CHEMICALS", style: "dribond" },
  { name: "reece", style: "reece" },
  { name: "the tile merchants", style: "tilemerchants" },
  { name: "Elite", sub: "Cabinetmakers Pty Ltd", style: "elite" },
  { name: "LATICRETE", style: "laticrete" },
  { name: "bayset", sub: "Waterproofing. Flooring. Concrete Repair.", style: "bayset" },
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
              Over our long history, we have built up a large network of major
              suppliers in the market with the highest quality products.
            </p>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="grid grid-cols-1 border-zinc-200 bg-white sm:grid-cols-2 lg:grid-cols-3">
            {suppliers.map((supplier) => (
              <div
                key={supplier.name}
                className="flex min-h-40 items-center justify-center overflow-hidden border-b border-zinc-200 px-5 py-8 text-center sm:border-r sm:[&:nth-child(2n)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-last-child(-n+3)]:border-b-0"
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

  if (style === "bdw") {
    return (
      <div className="relative px-3 pt-5 text-4xl font-black tracking-wide text-yellow-300">
        <span className="absolute left-1/2 top-1 h-12 w-20 -translate-x-1/2 rotate-45 border-l-[8px] border-t-[8px] border-yellow-300" />
        {name}
      </div>
    );
  }

  if (style === "dribond") {
    return (
      <div className="inline-flex items-stretch border border-red-200">
        <span className="bg-red-600 px-2.5 py-1 text-lg font-black text-white">
          {name}
        </span>
        <span className="bg-blue-800 px-1.5 py-1 text-left text-[9px] font-black leading-tight text-white">
          {sub}
        </span>
      </div>
    );
  }

  if (style === "reece") {
    return (
      <span className="rounded-[40%] bg-[#123d70] px-6 py-3 text-4xl font-black lowercase tracking-tight text-white">
        {name}
      </span>
    );
  }

  if (style === "tilemerchants") {
    return (
      <span className="bg-zinc-800 px-3 py-2 text-xl font-light lowercase tracking-tight text-white">
        <span className="text-lime-500">the</span>tile<span className="text-lime-500">merchants</span>
      </span>
    );
  }

  if (style === "elite") {
    return (
      <div className="relative inline-flex flex-col text-left">
        <span className="absolute -right-3 -top-5 h-10 w-10 rotate-45 border-r-[8px] border-t-[8px] border-red-600" />
        <span className="font-display text-5xl leading-none text-red-600">
          {name}
        </span>
        <span className="text-center text-lg leading-none text-sky-400">
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
