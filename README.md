# RM Tiling — Business Landing Website

Marketing landing site for **RM Tiling**, a tiling and regrouting business based
in Melbourne, Australia. Built with **Next.js (App Router)**, **TypeScript** and
**Tailwind CSS v4**.

## Features

- Cavell-inspired local trade design with burgundy headings, direct service
  messaging, search-style service area prompt and strong quote CTAs
- Homepage sections: hero, about, services, materials, projects, blog preview,
  CTA and contact / quote-request form
- SEO service pages for tiling, bathroom renovations, waterproofing,
  regrouting and leaking shower repairs in Melbourne
- Blog index and article pages with article metadata and internal links
- Working quote form (`/api/contact`) with webhook/Resend delivery support and
  a production mailto fallback
- Legal pages (`/privacy`, `/terms`), custom 404 and error pages
- Floating mobile call / quote bar for high-converting mobile UX
- Privacy-friendly analytics + Speed Insights (Vercel)
- SEO-ready: per-page metadata, canonical URLs, Open Graph + Apple touch icon,
  sitemap, robots, web manifest, `LocalBusiness`, service, FAQ and article
  structured data
- Accessible: skip-to-content link, keyboard-friendly, respects reduced-motion
- Optimised local generated imagery — no external image dependency

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # lint
npm run launch-check # fail fast on missing launch-critical business config
```

## Customising for the business

Almost everything you'll want to change lives in a single file:

- **`src/lib/site.ts`** — business name, phone, email, ABN, hours, address,
  service area, social links and the navigation. Phone and ABN can stay blank
  until verified; the site will run as email-first.

SEO service and blog content lives in `src/lib/content.ts`. Homepage section
layout lives in `src/components/`.

| Edit this file | To change |
| --- | --- |
| `lib/content.ts` | SEO service pages and blog posts |
| `components/Services.tsx` | Homepage service cards |
| `components/Gallery.tsx` | Project showcase (see "Adding photos" below) |
| `components/Suppliers.tsx` | Materials / supplier-style trust grid |
| `components/About.tsx` | About / founder story |
| `components/Contact.tsx` | Contact panel and quote form placement |

Only publish review counts or customer quotes after replacing the trust section
with verified reviews you have permission to use.

### Theme

The design uses a pale porcelain / burgundy / navy palette defined in
`src/app/globals.css` under `@theme`. The key tokens are `--color-ink`,
`--color-charcoal`, `--color-porcelain`, `--color-linen`, `--color-clay`,
`--color-maroon`, `--color-navy` and `--color-oxide`; keep generated icon and
Open Graph colors in sync when retinting the brand.

### Images and real project photos

The service, project and blog sections use generated, project-style WebP images
stored in `public/images/generated/`. The public copy describes them as
representative visuals, not completed RM Tiling jobs. When verified project
photos are available, add them to `public/images/` and update the `image` and
`alt` fields in `src/lib/content.ts`, `components/Gallery.tsx` and
`site.heroImage` in `src/lib/site.ts`.

## Contact form delivery

In development, the quote form validates submissions and logs them on the
server if delivery is not configured. In production, the form uses a prefilled
mailto fallback when no delivery service is configured, so enquiries are not
silently lost. For a smoother launch, set one of the following in `.env.local`
for local testing or your host's environment variables for production. See
`.env.example`.

**Option A — Webhook** (Zapier, Make, Slack/Discord incoming webhook, etc.):

```
CONTACT_WEBHOOK_URL=https://...
```

The launch check requires this to be a production `https://` URL, not localhost
or a placeholder.

**Option B — Email via [Resend](https://resend.com):**

```
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=info@rmtiling.com.au      # where enquiries are sent
CONTACT_FROM_EMAIL="RM Tiling <quotes@rmtiling.com.au>"  # a verified sender
```

If neither is set, enquiries are logged to the server console in development and
production users are prompted to send the enquiry through their email app.
Production deploys should still use a webhook or Resend with a verified sender
when available.

## Launch check

Run `npm run launch-check` before pointing the public domain at the site. It
fails on broken launch-critical configuration and warns on optional details such
as a missing phone number, ABN, social links or direct contact-form delivery.

## Deploy

This is a standard Next.js app and deploys anywhere that supports Node. The
simplest option is [Vercel](https://vercel.com/new): import the repo, add any
environment variables from above, and deploy.

After deploying, update `site.url` in `src/lib/site.ts` to your live domain so
canonical URLs, the sitemap and structured data are correct.

Analytics and Speed Insights are enabled automatically on Vercel — just turn
them on in the project's **Analytics** tab. No code changes needed.

## Launch checklist

- [ ] Confirm the public **email, service area and address** in `src/lib/site.ts`
- [ ] Add the real **phone and ABN** in `src/lib/site.ts` if they should be shown
- [ ] Set `site.url` to your real domain
- [ ] Confirm every claim is true: licence/insurance, experience, guarantee and service area
- [ ] Add real **social media links** in `src/lib/site.ts` or leave them blank
- [ ] Add verified customer reviews only if you have permission to publish them
- [ ] Configure contact-form delivery (`CONTACT_WEBHOOK_URL` or Resend) for the best UX, or rely on the mailto fallback
- [ ] Review the **Privacy Policy** and **Terms** (`src/app/privacy`, `src/app/terms`)
      — they are sensible templates for an Australian business, but should be
      checked against your actual practices (and ideally by a professional)
- [ ] Replace generated representative visuals with verified real project
      photos when available
- [ ] Enable Analytics in the Vercel dashboard
- [ ] Run `npm run lint`, `npm run build` and `npm run launch-check` before connecting the public domain
