import { ArrowRight, Phone } from "lucide-react";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

export function CtaBanner() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 px-8 py-12 shadow-xl sm:px-12 sm:py-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 text-white tile-grid opacity-10"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-accent-400/20 blur-3xl"
            />
            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
              <div className="max-w-xl">
                <h2 className="font-display text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                  Like what you see? Let's get your tiling sorted.
                </h2>
                <p className="mt-3 text-lg text-brand-50/85">
                  Book your free, no-obligation quote today — fast, friendly and
                  fixed-price.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent-500 px-7 py-3.5 text-base font-bold text-ink shadow-lg transition hover:bg-accent-400"
                >
                  Get a free quote
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href={site.phone.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-base font-bold text-white transition hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" />
                  {site.phone.display}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
