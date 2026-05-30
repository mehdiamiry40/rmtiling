import Link from "next/link";
import { Logo } from "./Logo";
import { legalLinks, navLinks, site } from "@/lib/site";

const services = [
  "Wall & floor tiling",
  "Regrouting & resealing",
  "Leaking shower repairs",
  "Waterproofing",
  "Bathroom renovations",
  "Kitchen splashbacks",
];

const socials = [
  { label: "Instagram", href: site.social.instagram },
  { label: "Facebook", href: site.social.facebook },
  { label: "Google", href: site.social.google },
];

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-stone-500">
              Melbourne's tiling and regrouting specialists. Clean, durable and
              guaranteed workmanship across the city.
            </p>
            <div className="mt-6 flex gap-4 text-sm">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-stone-500 transition hover:text-ink"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-stone-500">
              Explore
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-stone-600 transition hover:text-ink">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-stone-500">
              Services
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {services.map((service) => (
                <li key={service}>
                  <Link href="/#services" className="text-stone-600 transition hover:text-ink">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.15em] text-stone-500">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-stone-600">
              <li>
                <a href={site.phone.href} className="transition hover:text-ink">
                  {site.phone.display}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="transition hover:text-ink">
                  {site.email}
                </a>
              </li>
              <li>{site.serviceArea}</li>
            </ul>
            <Link
              href="/#contact"
              className="mt-5 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700"
            >
              Get a free quote
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-stone-100 pt-8 text-xs text-stone-500 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.legalName}. ABN {site.abn} ·
            Licensed &amp; insured
          </p>
          <div className="flex items-center gap-5">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
