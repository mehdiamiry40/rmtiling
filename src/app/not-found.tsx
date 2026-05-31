import type { Metadata } from "next";
import Link from "next/link";
import { LogoMark } from "@/components/Logo";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <LogoMark className="h-12 w-12" />
      <p className="mt-8 font-display text-6xl font-semibold tracking-tight text-ink">
        404
      </p>
      <h1 className="mt-3 text-xl font-medium text-ink">Page not found</h1>
      <p className="mt-2 max-w-sm text-stone-500">
        Sorry, we couldn't find that page. It may have moved or no longer exists.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-brand px-6 py-3 text-sm font-medium text-white transition hover:bg-brand-700"
        >
          Back to home
        </Link>
        <a
          href={site.phone.href}
          className="rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-ink transition hover:bg-stone-50"
        >
          Call {site.phone.display}
        </a>
      </div>
    </main>
  );
}
