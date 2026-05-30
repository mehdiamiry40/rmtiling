import { Plus } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const faqs = [
  {
    question: "Do you offer free quotes?",
    answer:
      "Yes. Every quote is free, no-obligation and fixed-price. We'll assess your space, talk through your options and give you a clear written quote with no hidden extras.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Absolutely. RM Tiling are fully qualified, licensed tilers and we carry full public liability insurance, so you're completely covered while we work in your home.",
  },
  {
    question: "Can you fix a leaking shower without removing the tiles?",
    answer:
      "In most cases, yes. We can regrout, reseal and re-waterproof leaking showers without a full demolition — saving you time, mess and money. If a tile-out is needed, we'll tell you upfront.",
  },
  {
    question: "How long does regrouting take?",
    answer:
      "Most regrouting and resealing jobs are completed within a day. Larger areas or full bathrooms may take a little longer — we'll give you an accurate timeframe with your quote.",
  },
  {
    question: "Do you guarantee your work?",
    answer:
      "Every job is backed by our workmanship guarantee. We use quality, Australian-standard materials and proper waterproofing so your tiles look great and last for years.",
  },
  {
    question: "Which areas of Melbourne do you service?",
    answer:
      "We service the Melbourne CBD and suburbs right across greater Melbourne — inner city, bayside, eastern and northern suburbs and beyond. Not sure if we reach you? Just ask.",
  },
];

export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <section id="faq" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          description="The things Melbourne homeowners ask us most. Can't find what you're after? Get in touch."
        />

        <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={(i % 3) * 70}>
              <details className="group py-2">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-display text-lg font-bold text-ink transition hover:text-brand-700 [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700 transition group-open:rotate-45 group-open:bg-brand-600 group-open:text-white">
                    <Plus className="h-4 w-4" aria-hidden />
                  </span>
                </summary>
                <p className="pb-5 pr-12 text-[15px] leading-relaxed text-slate-600">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
