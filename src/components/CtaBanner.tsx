import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

export function CtaBanner() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <Reveal className="relative isolate mx-auto max-w-7xl overflow-hidden bg-clay px-6 py-20 text-center text-white shadow-2xl shadow-zinc-300/70 sm:px-10">
        <div className="absolute inset-0 bg-[linear-gradient(160deg,transparent_0%,transparent_44%,rgba(49,0,5,0.22)_45%,rgba(49,0,5,0.22)_62%,transparent_63%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(20deg,transparent_0%,transparent_52%,rgba(49,0,5,0.18)_53%,rgba(49,0,5,0.18)_70%,transparent_71%)]" />
        <div className="relative">
          <h2 className="font-display text-4xl font-semibold text-white sm:text-5xl">
            Contact us today.
          </h2>
          <p className="mx-auto mt-7 max-w-2xl text-lg font-semibold leading-relaxed text-white">
            Whether you are looking for a new bathroom, tiling or waterproofing,
            we can help. Contact us for a free quote.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={site.phone.href || `mailto:${site.email}`}
              className="inline-flex items-center justify-center border border-white px-8 py-3 text-base font-semibold text-white transition hover:bg-white hover:text-clay"
            >
              {site.phone.href ? site.phone.display : "Email us"}
            </a>
            <a
              href={site.bookingHref}
              className="inline-flex items-center justify-center bg-white px-8 py-3 text-base font-semibold text-clay transition hover:bg-maroon hover:text-white"
            >
              Get a Quote
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
