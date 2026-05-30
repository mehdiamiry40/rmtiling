"use client";

import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { navLinks, site } from "@/lib/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="hidden bg-brand-800 text-brand-50 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-1.5 text-xs">
          <p className="font-medium">
            Servicing {site.serviceArea} · Free, no-obligation quotes
          </p>
          <div className="flex items-center gap-5">
            <a
              href={site.phone.href}
              className="inline-flex items-center gap-1.5 font-semibold transition hover:text-white"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden />
              {site.phone.display}
            </a>
            <span className="text-brand-200/70">
              Fully licensed &amp; insured
            </span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-slate-200 bg-white/90 shadow-sm backdrop-blur"
            : "border-transparent bg-white/70 backdrop-blur"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          <a href="#top" aria-label={`${site.name} home`}>
            <Logo />
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-slate-600 transition hover:text-brand-700"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={site.phone.href}
              className="hidden items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-ink transition hover:border-brand-300 hover:bg-brand-50 sm:inline-flex"
            >
              <Phone className="h-4 w-4 text-brand-600" aria-hidden />
              {site.phone.display}
            </a>
            <a
              href="#contact"
              className="hidden rounded-full bg-accent-500 px-5 py-2.5 text-sm font-bold text-ink shadow-sm shadow-accent-500/30 transition hover:bg-accent-400 sm:inline-block"
            >
              Get a Free Quote
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-ink lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 top-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-x-0 top-0 mt-[57px] border-t border-slate-100 bg-white p-6 shadow-xl">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-semibold text-slate-700 transition hover:bg-brand-50 hover:text-brand-700"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4">
              <a
                href={site.phone.href}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-ink"
              >
                <Phone className="h-4 w-4 text-brand-600" aria-hidden />
                Call {site.phone.display}
              </a>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="rounded-full bg-accent-500 px-5 py-3 text-center text-sm font-bold text-ink"
              >
                Get a Free Quote
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
