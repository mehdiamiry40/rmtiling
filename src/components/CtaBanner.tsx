import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { site } from "@/lib/site";

export function CtaBanner() {
  return (
    <section className="bg-ink py-24 sm:py-28">
      <Reveal className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Ready to get your tiling sorted?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
          Book a free, no-obligation quote today — fast, friendly and
          fixed-price.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-medium text-ink transition hover:bg-stone-200"
          >
            Get a free quote
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href={site.phone.href}
            className="inline-flex items-center justify-center rounded-full border border-white/25 px-7 py-3.5 text-base font-medium text-white transition hover:bg-white/10"
          >
            Call {site.phone.display}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
