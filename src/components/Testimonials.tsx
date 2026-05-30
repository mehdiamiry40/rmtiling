import { Quote, Star } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

/**
 * NOTE: These are sample reviews to show layout. Replace `reviews` with your
 * real customer testimonials (e.g. pulled from Google) before going live.
 */
const reviews = [
  {
    quote:
      "Reza regrouted and resealed our leaking shower without removing a single tile. No mess, no fuss and it's been bone dry ever since. Couldn't recommend RM Tiling more highly.",
    name: "Sarah M.",
    location: "Brighton",
    project: "Leaking shower repair",
  },
  {
    quote:
      "RM Tiling did our entire bathroom — waterproofing, floor and wall tiling. The finish is immaculate and they were tidy, on time and on budget the whole way through.",
    name: "James & Priya",
    location: "Brunswick",
    project: "Bathroom renovation",
  },
  {
    quote:
      "Fast, professional and genuinely lovely to deal with. Our kitchen splashback looks incredible and the quote was exactly what we paid. Highly recommend to anyone in Melbourne.",
    name: "Daniel K.",
    location: "Glen Waverley",
    project: "Kitchen splashback",
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Reviews"
          title="Loved by Melbourne homeowners"
          description="We've built our reputation one happy customer at a time. Here's what a few of them have to say."
        />

        <Reveal className="mt-6 flex items-center justify-center gap-3">
          <span className="flex text-accent-500" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </span>
          <span className="text-sm font-semibold text-slate-600">
            <span className="font-display text-base font-extrabold text-ink">
              5.0
            </span>{" "}
            average from 120+ reviews
          </span>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review.name} delay={i * 90}>
              <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-slate-50/60 p-7">
                <Quote className="h-8 w-8 text-brand-200" aria-hidden />
                <div className="mt-3 flex text-accent-500" aria-hidden>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-700">
                  “{review.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-slate-200 pt-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 font-display text-sm font-bold text-white">
                      {review.name.charAt(0)}
                    </span>
                    <div>
                      <p className="font-display text-sm font-bold text-ink">
                        {review.name}
                      </p>
                      <p className="text-xs font-medium text-slate-500">
                        {review.project} · {review.location}
                      </p>
                    </div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
