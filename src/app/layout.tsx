import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { site } from "@/lib/site";
import { servicePages } from "@/lib/content";
import { MobileCallBar } from "@/components/MobileCallBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "tiling Melbourne",
    "regrouting Melbourne",
    "tiler Melbourne",
    "leaking shower repairs",
    "bathroom renovations Melbourne",
    "waterproofing Melbourne",
    "shower regrouting Melbourne",
    "leaking shower repairs Melbourne",
    "kitchen splashback",
    "tile and grout restoration",
    "RM Tiling",
  ],
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "business",
};

/** LocalBusiness structured data — helps Google show RM Tiling in local search. */
function StructuredData() {
  const sameAs = Object.values(site.social).filter(Boolean);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.name,
    legalName: site.legalName,
    description: site.description,
    url: site.url,
    ...(site.phone.href ? { telephone: site.phone.href.replace("tel:", "") } : {}),
    email: site.email,
    image: `${site.url}${site.heroImage.src}`,
    logo: `${site.url}/icon.svg`,
    priceRange: "$$",
    areaServed: {
      "@type": "City",
      name: "Melbourne",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "16:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "RM Tiling services",
      itemListElement: servicePages.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          url: `${site.url}/services/${service.slug}`,
        },
      })),
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      data-scroll-behavior="smooth"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-white text-ink">
        {/* Without JS, reveal-on-scroll elements should still be visible. */}
        <noscript>
          <style>{`.reveal{opacity:1 !important;animation:none !important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        {children}
        <MobileCallBar />
        <StructuredData />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
