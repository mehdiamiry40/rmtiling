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
      <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">
        Something went wrong
      </h1>
      <p className="mt-2 max-w-sm text-stone-500">
        Sorry about that — please try again. If it keeps happening, give us a
        call and we'll help out.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
        >
          Try again
        </button>
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
