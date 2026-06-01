"use client";

import { useEffect } from "react";
import { site } from "@/lib/site";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="font-display text-2xl font-semibold text-ink">
        Something went wrong
      </h1>
      <p className="mt-2 max-w-sm text-zinc-500">
        Sorry about that — please try again. If it keeps happening, contact us
        directly and we'll help out.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
        className="rounded-lg bg-clay px-6 py-3 text-sm font-medium text-white transition hover:bg-charcoal"
        >
          Try again
        </button>
        <a
          href={site.phone.href || `mailto:${site.email}`}
          className="rounded-lg border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-ink transition hover:bg-zinc-50"
        >
          {site.phone.href ? `Call ${site.phone.display}` : "Email us"}
        </a>
      </div>
    </main>
  );
}
