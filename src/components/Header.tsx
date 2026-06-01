"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { navLinks, site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-100 bg-white">
      <div>
        <nav className="mx-auto flex h-24 max-w-7xl items-center justify-between gap-5 px-4 sm:px-6">
          <Link href="/" aria-label={`${site.name} home`}>
            <Logo />
          </Link>

          <div className="hidden items-center gap-5 xl:flex">
            {navLinks.map((link) => (
              <Link
                key={`${link.label}-${link.href}`}
                href={link.href}
                className="text-[15px] font-medium text-zinc-700 transition hover:text-clay"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={site.bookingHref}
              className="hidden border border-clay bg-clay px-5 py-3 text-sm font-semibold text-white transition hover:bg-maroon md:inline-flex"
            >
              Get a Quote
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-11 w-11 items-center justify-center text-ink transition hover:text-clay xl:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="fixed inset-0 top-24 z-40 xl:hidden">
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="relative border-t border-zinc-200 bg-white px-6 py-6 shadow-xl">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <Link
                  key={`${link.label}-${link.href}`}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-zinc-100 py-4 text-lg font-medium text-ink transition hover:text-clay"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={site.bookingHref}
                onClick={() => setOpen(false)}
                className="bg-clay px-5 py-3 text-center text-sm font-medium text-white"
              >
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
