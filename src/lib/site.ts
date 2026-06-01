/**
 * Central business configuration for RM Tiling.
 *
 * Edit the values below to update contact details, business info and links
 * across the whole site. These are the most commonly changed values, so they
 * live in one place. Section content (services, testimonials, gallery, etc.)
 * lives alongside each component in `src/components`.
 */

export const site = {
  name: "RM Tiling",
  legalName: "RM Tiling Pty Ltd",
  tagline: "Tiling | Bathroom Renovations",
  description:
    "RM Tiling are Melbourne-based tiling and regrouting specialists. Wall and floor tiling, regrouting, leaking shower repairs, waterproofing and bathroom renovations. Free quotes and careful workmanship.",

  // Contact details. Leave phone blank until the real number is confirmed.
  phone: {
    display: "" as string,
    href: "" as string,
  },
  email: "info@rmtiling.com.au",
  bookingHref: "/#contact",

  // Business details. Leave ABN blank until the real number is confirmed.
  abn: "",
  established: 2009,
  yearsExperience: "15+",
  serviceArea: "Melbourne & surrounding suburbs",
  hours: [
    { days: "Monday – Friday", time: "7:00am – 6:00pm" },
    { days: "Saturday", time: "8:00am – 4:00pm" },
    { days: "Sunday", time: "By appointment" },
  ],

  // Used for SEO/canonical/JSON-LD. Update to your real domain when live.
  url: "https://www.rmtiling.com.au",

  address: {
    locality: "Melbourne",
    region: "VIC",
    regionName: "Victoria",
    postalCode: "3000",
    country: "AU",
  },

  heroImage: {
    src: "/images/generated/bathroom-hero.webp",
    alt: "Modern bathroom with large-format tiles, a frameless shower and clean grout lines",
  },

  // Social links. Empty values are hidden from the footer and structured data.
  social: {
    facebook: "",
    instagram: "",
    google: "",
  },
} as const;

/** Top-level navigation links (root-relative so they work from any page). */
export const navLinks = [
  { label: "Tiling", href: "/services/tiling-melbourne" },
  { label: "Bathroom Renovations", href: "/services/bathroom-renovations-melbourne" },
  { label: "Waterproofing", href: "/services/waterproofing-melbourne" },
  { label: "Projects", href: "/#gallery" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

/** Footer-only legal links. */
export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
] as const;
