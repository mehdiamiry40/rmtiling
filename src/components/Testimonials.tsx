import { Star } from "lucide-react";
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
      "Fast, professional and genuinely lovely to deal with. Our kitchen splashback looks incredible and the quote was exactly what we paid. Highly recommend.",
    name: "Daniel K.",
    location: "Glen Waverley",
    project: "Kitchen splashback",
  },
];

export function Testimonials() {
  return (
    <section id="reviews" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Reviews"
          title="Loved by Melbourne homeowners"
          description="Rated 5.0 from 120+ reviews."
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-stone-200 bg-stone-200 sm:grid-cols-3">
          {reviews.map((review, i) => (
            <Reveal key={review.name} delay={i * 80}>
              <figure className="flex h-full flex-col bg-white p-8">
                <div className="flex gap-0.5 text-ink" aria-hidden>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-current" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-5 flex-1 text-[15px] leading-relaxed text-stone-700">
                  “{review.quote}”
                </blockquote>
                <figcaption className="mt-6 text-sm">
                  <span className="font-medium text-ink">{review.name}</span>
                  <span className="text-stone-500">
                    {" "}
                    · {review.project}, {review.location}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
