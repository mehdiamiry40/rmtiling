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
    <section id="faq" className="bg-white py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          description="The things Melbourne homeowners ask us most."
        />

        <div className="mt-14 divide-y divide-stone-200 border-t border-stone-200">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={(i % 3) * 60}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-base font-medium text-ink transition hover:text-stone-600 [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <Plus
                    className="h-5 w-5 shrink-0 text-stone-400 transition-transform duration-200 group-open:rotate-45"
                    aria-hidden
                  />
                </summary>
                <p className="pb-6 pr-8 text-[15px] leading-relaxed text-stone-500">
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
