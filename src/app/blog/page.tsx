import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { blogPosts, servicePages } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Tiling & Bathroom Renovation Blog Melbourne",
  description:
    "Practical tiling, regrouting, waterproofing and bathroom renovation advice for Melbourne homeowners from RM Tiling.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: `${site.url}/blog`,
    title: "Tiling & Bathroom Renovation Blog Melbourne",
    description:
      "Practical tiling, regrouting, waterproofing and bathroom renovation advice for Melbourne homeowners from RM Tiling.",
    siteName: site.name,
    locale: "en_AU",
  },
};

export default function BlogPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="bg-porcelain py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
            <h1 className="max-w-full break-words font-display text-4xl font-semibold leading-tight text-maroon sm:text-6xl">
              Tiling and Bathroom Renovation Advice
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-ink sm:text-xl">
              Practical guides for Melbourne homeowners planning tiling,
              regrouting, waterproofing or a bathroom renovation.
            </p>
          </div>
        </section>

        <section className="bg-white py-18 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 md:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative aspect-[1.25] overflow-hidden bg-linen">
                    <Image
                      src={post.image}
                      alt={post.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-5">
                    <p className="text-sm font-semibold text-clay">
                      {post.category} · {post.readTime}
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-maroon">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-zinc-600">
                      {post.excerpt}
                    </p>
                    <span className="mt-5 inline-flex text-base font-medium text-clay underline underline-offset-2">
                      Read article
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-porcelain py-18 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
              <div>
                <h2 className="font-display text-4xl font-semibold text-maroon">
                  Need a quote instead?
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-zinc-600">
                  If you already know what needs work, jump straight to the
                  relevant service page and send the details through.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {servicePages.slice(0, 4).map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="border border-zinc-200 bg-white p-5 transition hover:border-clay"
                  >
                    <h3 className="font-display text-xl font-semibold text-maroon">
                      {service.navLabel}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                      {service.metaDescription}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
