import Image from "next/image";
import { Mail, Search } from "lucide-react";
import { site } from "@/lib/site";

const serviceOptions = ["Tiling", "Bathroom Renovations", "Waterproofing"];

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-maroon text-white">
      <Image
        src={site.heroImage.src}
        alt={site.heroImage.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-maroon/94 via-maroon/74 to-maroon/28" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15" />

      <div className="relative mx-auto flex min-h-[620px] max-w-6xl flex-col items-start justify-center px-4 py-20 text-left sm:px-6 sm:py-24">
        <h1 className="max-w-[22rem] break-words font-display text-5xl font-semibold leading-[0.98] text-white drop-shadow-sm sm:max-w-4xl sm:text-6xl lg:text-7xl">
          Melbourne Bathroom Renovations &amp; Tiling
        </h1>

        <p className="mt-7 max-w-[21rem] break-words text-lg font-medium leading-relaxed text-white/88 sm:max-w-2xl sm:text-xl">
          {site.name} provides high quality tiling, regrouting, bathroom
          renovations and waterproofing across Melbourne.
        </p>

        <div className="mt-12 flex flex-col items-start justify-center gap-5 sm:flex-row sm:items-center">
          <a
            href={site.phone.href || `mailto:${site.email}`}
            className="inline-flex min-w-44 items-center justify-center gap-2 bg-clay px-8 py-4 text-base font-semibold text-white shadow-lg shadow-black/20 transition hover:bg-white hover:text-maroon"
          >
            {!site.phone.href && <Mail className="h-4 w-4" aria-hidden />}
            {site.phone.href ? site.phone.display : "Email us"}
          </a>
          <span className="text-base text-white/88">
            or{" "}
            <a href={site.bookingHref} className="underline decoration-white underline-offset-2 hover:text-white">
              request a free quote
            </a>
          </span>
        </div>

        <form
          action="/#areas"
          className="mt-10 grid w-full max-w-3xl grid-cols-1 border border-white/35 bg-white text-left shadow-2xl shadow-black/20 sm:grid-cols-[12rem_1fr_3.5rem]"
        >
          <label className="sr-only" htmlFor="service-search-service">
            Service
          </label>
          <select
            id="service-search-service"
            name="service"
            className="h-14 border-b border-zinc-300 bg-white px-4 text-base text-ink outline-none sm:border-b-0 sm:border-r"
            defaultValue="Tiling"
          >
            {serviceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <label className="sr-only" htmlFor="service-search-suburb">
            Suburb or postcode
          </label>
          <input
            id="service-search-suburb"
            name="suburb"
            className="h-14 border-b border-zinc-300 px-4 text-base text-ink outline-none placeholder:text-zinc-500 sm:border-b-0"
            placeholder="Suburb or Postcode"
          />
          <button
            type="submit"
            aria-label="Search service area"
            className="flex h-14 items-center justify-center bg-clay text-white transition hover:bg-maroon"
          >
            <Search className="h-7 w-7" strokeWidth={1.8} aria-hidden />
          </button>
        </form>
        <p className="mt-4 text-base text-white/72">
          Search to see if we service your area
        </p>
      </div>
    </section>
  );
}
