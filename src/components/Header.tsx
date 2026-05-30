"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { navLinks, site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`border-b transition-colors duration-300 ${
          scrolled
            ? "border-stone-200 bg-white/85 backdrop-blur"
            : "border-transparent bg-white"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <a href="#top" aria-label={`${site.name} home`}>
            <Logo />
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-stone-500 transition hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href={site.phone.href}
              className="hidden text-sm font-medium text-ink transition hover:text-stone-600 sm:block"
            >
              {site.phone.display}
            </a>
            <a
              href="#contact"
              className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700 sm:inline-block"
            >
              Get a quote
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-9 w-9 items-center justify-center text-ink md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 top-[65px] z-40 md:hidden">
          <div
            className="absolute inset-0 bg-white"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="relative border-t border-stone-200 bg-white px-6 py-6">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-stone-100 py-4 text-lg font-medium text-ink"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={site.phone.href}
                className="rounded-full border border-stone-300 px-5 py-3 text-center text-sm font-medium text-ink"
              >
                Call {site.phone.display}
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="rounded-full bg-ink px-5 py-3 text-center text-sm font-medium text-white"
              >
                Get a free quote
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
