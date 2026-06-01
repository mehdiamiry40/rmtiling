import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { blogPosts, getBlogPost, servicePages } from "@/lib/content";
import { site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const path = `/blog/${post.slug}`;
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: `${site.url}${path}`,
      title: post.metaTitle,
      description: post.metaDescription,
      siteName: site.name,
      locale: "en_AU",
      publishedTime: post.date,
      authors: [site.name],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 800,
          alt: post.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const relatedPosts = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: `${site.url}${post.image}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: {
        "@type": "ImageObject",
        url: `${site.url}/icon.svg`,
      },
    },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <Header />
      <main id="main">
        <article>
          <section className="bg-porcelain py-16 sm:py-20">
            <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
              <nav aria-label="Breadcrumb" className="text-sm text-zinc-600">
                <Link href="/" className="transition hover:text-clay">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <Link href="/blog" className="transition hover:text-clay">
                  Blog
                </Link>
              </nav>
              <p className="mt-8 text-sm font-semibold text-clay">
                {post.category} · {post.readTime}
              </p>
              <h1 className="mt-4 max-w-full break-words font-display text-4xl font-semibold leading-[1.06] text-maroon sm:text-6xl sm:leading-[1.02]">
                {post.title}
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-ink">
                {post.excerpt}
              </p>
            </div>
          </section>

          <div className="relative mx-auto aspect-[1.9] max-w-7xl overflow-hidden bg-linen">
            <Image
              src={post.image}
              alt={post.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          <section className="bg-white py-16 sm:py-20">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.7fr_1fr]">
              <aside className="lg:sticky lg:top-32 lg:self-start">
                <h2 className="font-display text-3xl font-semibold text-maroon">
                  In this guide
                </h2>
                <ol className="mt-6 space-y-3 text-base text-zinc-700">
                  {post.sections.map((section) => (
                    <li key={section.heading}>{section.heading}</li>
                  ))}
                </ol>
              </aside>

              <div className="space-y-12">
                {post.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="font-display text-3xl font-semibold leading-tight text-maroon">
                      {section.heading}
                    </h2>
                    <div className="mt-4 space-y-4 text-lg leading-relaxed text-zinc-700">
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </section>
        </article>

        <section className="bg-porcelain py-18 sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-4xl font-semibold text-maroon">
                Keep reading
              </h2>
              <div className="mt-8 grid gap-4">
                {relatedPosts.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/blog/${item.slug}`}
                    className="border border-zinc-200 bg-white p-5 transition hover:border-clay"
                  >
                    <p className="text-sm font-semibold text-clay">
                      {item.category}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-maroon">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                      {item.excerpt}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-display text-4xl font-semibold text-maroon">
                Related services
              </h2>
              <div className="mt-8 grid gap-4">
                {servicePages.slice(0, 3).map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="border border-zinc-200 bg-white p-5 transition hover:border-clay"
                  >
                    <h3 className="font-display text-2xl font-semibold text-maroon">
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

        <Contact />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </>
  );
}
