"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";
import { site } from "@/lib/site";

/**
 * A sticky call / quote bar that slides up on mobile after the user scrolls
 * past the hero — a modern, high-converting pattern for trade businesses.
 */
export function MobileCallBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-stone-200 bg-white/95 backdrop-blur transition-transform duration-300 sm:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div
        className="flex gap-2 px-3 pt-3"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <a
          href={site.phone.href}
          className="flex flex-1 items-center justify-center gap-2 rounded-full border border-stone-300 px-4 py-3 text-sm font-medium text-ink"
        >
          <Phone className="h-4 w-4" aria-hidden />
          Call
        </a>
        <Link
          href="/#contact"
          className="flex flex-[1.4] items-center justify-center rounded-full bg-brand px-4 py-3 text-sm font-medium text-white"
        >
          Get a free quote
        </Link>
      </div>
    </div>
  );
}
