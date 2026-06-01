import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { servicePages, getServicePage } from "@/lib/content";
import { site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return servicePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) return {};

  const path = `/services/${page.slug}`;
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: `${site.url}${path}`,
      title: page.metaTitle,
      description: page.metaDescription,
      siteName: site.name,
      locale: "en_AU",
      images: [
        {
          url: page.image,
          width: 1200,
          height: 800,
          alt: page.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [page.image],
    },
  };
}

export default async function ServiceSeoPage({ params }: Props) {
  const { slug } = await params;
  const page = getServicePage(slug);
  if (!page) notFound();

  const related = servicePages.filter((item) => item.slug !== page.slug).slice(0, 3);
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    description: page.metaDescription,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: site.name,
      url: site.url,
      email: site.email,
      ...(site.phone.href ? { telephone: site.phone.href.replace("tel:", "") } : {}),
    },
    areaServed: {
      "@type": "City",
      name: site.address.locality,
    },
    serviceType: page.navLabel,
    url: `${site.url}/services/${page.slug}`,
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: page.title,
        item: `${site.url}/services/${page.slug}`,
      },
    ],
  };

  return (
    <>
      <Header />
      <main id="main">
        <section className="bg-porcelain">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <nav aria-label="Breadcrumb" className="text-sm text-zinc-600">
                <Link href="/" className="transition hover:text-clay">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <span>{page.title}</span>
              </nav>

              <h1 className="mt-8 max-w-full break-words font-display text-4xl font-semibold leading-tight text-maroon sm:text-6xl sm:leading-[0.98]">
                {page.title}
              </h1>
              <p className="mt-7 text-lg leading-relaxed text-ink sm:text-xl">
                {page.intro}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 bg-clay px-7 py-4 text-base font-semibold text-white transition hover:bg-maroon"
                >
                  Request a free quote
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
                <a
                  href={site.phone.href || `mailto:${site.email}`}
                  className="inline-flex items-center justify-center border border-clay px-7 py-4 text-base font-semibold text-clay transition hover:bg-white"
                >
                  {site.phone.href ? site.phone.display : "Email us"}
                </a>
              </div>
            </div>

            <div className="relative aspect-[1.2] overflow-hidden bg-linen shadow-sm">
              <Image
                src={page.image}
                alt={page.alt}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="bg-white py-18 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.75fr_1.25fr]">
            <aside>
              <h2 className="font-display text-3xl font-semibold text-maroon">
                What is included
              </h2>
              <ul className="mt-7 space-y-4">
                {page.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-base text-ink">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-clay text-white">
                      <Check className="h-4 w-4" aria-hidden />
                    </span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </aside>

            <div className="grid gap-8">
              {page.sections.map((section) => (
                <article key={section.heading} className="border-t border-zinc-200 pt-7">
                  <h2 className="font-display text-3xl font-semibold leading-tight text-maroon">
                    {section.heading}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-zinc-700">
                    {section.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-porcelain py-18 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="font-display text-4xl font-semibold text-maroon">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-zinc-600">
                A quick guide before requesting a quote for {page.navLabel.toLowerCase()} in
                Melbourne.
              </p>
            </div>
            <div className="divide-y divide-zinc-200 border-y border-zinc-200">
              {page.faq.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="cursor-pointer list-none font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {item.question}
                  </summary>
                  <p className="mt-3 text-base leading-relaxed text-zinc-600">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-18 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="font-display text-4xl font-semibold text-maroon">
              Related services
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="group border border-zinc-200 bg-white p-6 transition hover:border-clay"
                >
                  <h3 className="font-display text-2xl font-semibold text-maroon">
                    {item.navLabel}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                    {item.metaDescription}
                  </p>
                  <span className="mt-5 inline-flex text-sm font-semibold text-clay underline underline-offset-2">
                    Learn more
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([serviceJsonLd, faqJsonLd, breadcrumbJsonLd]),
        }}
      />
    </>
  );
}
