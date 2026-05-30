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
  tagline: "Melbourne's Tiling & Regrouting Specialists",
  description:
    "RM Tiling are Melbourne-based tiling and regrouting specialists. Wall and floor tiling, regrouting, leaking shower repairs, waterproofing and bathroom renovations. Free quotes, fully licensed and insured.",

  // Contact details — update these with your real numbers.
  phone: {
    display: "0411 123 456",
    href: "tel:+61411123456",
  },
  email: "info@rmtiling.com.au",

  // Business details
  abn: "12 345 678 901",
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

  // Social links — replace # with your real profile URLs (or remove).
  social: {
    facebook: "#",
    instagram: "#",
    google: "#",
  },
} as const;

/** Top-level navigation links (in-page anchors). */
export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why-us" },
  { label: "How It Works", href: "#process" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Areas", href: "#areas" },
  { label: "FAQ", href: "#faq" },
] as const;
