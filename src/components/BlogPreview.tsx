import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/lib/content";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function BlogPreview() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            eyebrow=""
            title="Tiling and renovation advice"
            description="Useful planning notes before you book a tiler, regrout a shower or start a bathroom renovation."
          />
          <Link
            href="/blog"
            className="inline-flex self-start border border-clay px-6 py-3 text-base font-semibold text-clay transition hover:bg-clay hover:text-white sm:self-auto"
          >
            View all articles
          </Link>
        </div>

        <div className="mt-12 grid gap-7 md:grid-cols-3">
          {blogPosts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 70}>
              <article className="group">
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative aspect-[1.25] overflow-hidden bg-linen">
                    <Image
                      src={post.image}
                      alt={post.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <p className="mt-5 text-sm font-semibold text-clay">
                    {post.category}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-semibold leading-tight text-maroon">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-zinc-600">
                    {post.excerpt}
                  </p>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
