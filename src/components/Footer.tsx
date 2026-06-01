import Link from "next/link";
import { Logo } from "./Logo";
import { servicePages } from "@/lib/content";
import { legalLinks, navLinks, site } from "@/lib/site";

const serviceAreas = [
  "Melbourne CBD",
  "Northern suburbs",
  "Eastern suburbs",
  "Bayside",
  "Western suburbs",
  "Greater Melbourne",
];

const socials = [
  { label: "Instagram", href: site.social.instagram },
  { label: "Facebook", href: site.social.facebook },
  { label: "Google", href: site.social.google },
].filter((social) => social.href.startsWith("http"));

export function Footer() {
  const credentialText = site.abn ? `ABN ${site.abn}` : site.serviceArea;

  return (
    <footer className="border-t-4 border-clay bg-maroon text-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_0.8fr]">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/70">
              Contact Information
            </h3>
            <ul className="mt-6 space-y-3 text-base text-white/85">
              {site.phone.href && (
                <li>
                  <span className="font-semibold text-white">Mobile:</span>{" "}
                  <a href={site.phone.href} className="transition hover:text-white/70">
                    {site.phone.display}
                  </a>
                </li>
              )}
              <li>
                <span className="font-semibold text-white">Email:</span>{" "}
                <a href={`mailto:${site.email}`} className="transition hover:text-white/70">
                  {site.email}
                </a>
              </li>
              {site.abn && (
                <li>
                  <span className="font-semibold text-white">ABN:</span>{" "}
                  {site.abn}
                </li>
              )}
              <li>
                <span className="font-semibold text-white">Open Hours:</span>{" "}
                7am - 6pm | Mon - Fri
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/70">
              Services
            </h3>
            <ul className="mt-6 space-y-3 text-base">
              {servicePages.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className="text-white/85 transition hover:text-white/70">
                    {service.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div id="areas">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/70">
              Service Areas
            </h3>
            <ul className="mt-6 space-y-3 text-base text-white/85">
              {serviceAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>

          <nav aria-label="Company">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white/70">
              Company
            </h3>
            <ul className="mt-6 space-y-3 text-base">
              {navLinks
                .filter((link) => ["Projects", "Blog", "About", "Contact"].includes(link.label))
                .map((link) => (
                  <li key={`${link.label}-${link.href}`}>
                    <Link href={link.href} className="text-white/85 transition hover:text-white/70">
                      {link.label === "Projects" ? "Our Projects" : link.label}
                    </Link>
                  </li>
                ))}
              <li>
                <Link href="/#contact" className="text-white/85 transition hover:text-white/70">
                  Leave Feedback
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-2 lg:col-span-4">
            <div className="mt-4 flex flex-col gap-6 border-t border-white/15 pt-10 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Logo tone="light" />
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/55">
                  Melbourne tiling, bathroom renovation and waterproofing
                  services with clean workmanship and practical quote advice.
                </p>
                {socials.length > 0 && (
                  <div className="mt-5 flex gap-4 text-sm">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 transition hover:text-white"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/55">
                {legalLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="transition hover:text-white">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-8 text-sm text-white/55">
          <p>
            © {new Date().getFullYear()} {site.legalName}. {credentialText}
          </p>
        </div>
      </div>
    </footer>
  );
}
