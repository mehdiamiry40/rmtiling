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
    question: "What details do you provide before work starts?",
    answer:
      "We provide a written quote with scope, price, timing and practical preparation notes. We can also confirm the business and trade details relevant to your job before booking.",
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
    question: "How do you stand behind the work?",
    answer:
      "We stand behind careful workmanship and use quality, Australian-standard materials and proper waterproofing practices so your tiles look great and last for years.",
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
    <section id="faq" className="bg-porcelain py-24 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered"
          description="The things Melbourne homeowners ask us most."
        />

        <div className="mt-14 overflow-hidden rounded-lg border border-zinc-200 bg-white">
          {faqs.map((faq, i) => (
            <Reveal key={faq.question} delay={(i % 3) * 60}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 border-b border-zinc-100 px-5 py-5 text-base font-medium text-ink transition hover:text-clay [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <Plus
                    className="h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-200 group-open:rotate-45"
                    aria-hidden
                  />
                </summary>
                <p className="border-b border-zinc-100 px-5 pb-6 pr-10 text-[15px] leading-relaxed text-zinc-500">
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
