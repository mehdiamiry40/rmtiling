# RM Tiling — Business Landing Website

Marketing landing site for **RM Tiling**, a tiling and regrouting business based
in Melbourne, Australia. Built with **Next.js (App Router)**, **TypeScript** and
**Tailwind CSS v4**.

## Features

- Super-minimalist, modern, fully responsive design (warm monochrome theme)
- Sections: hero, stats, services, about, why-us, process, gallery,
  testimonials, service areas, FAQ and a contact / quote-request form
- Working quote form (`/api/contact`) with optional email or webhook delivery
- Legal pages (`/privacy`, `/terms`), custom 404 and error pages
- Floating mobile call / quote bar for high-converting mobile UX
- Privacy-friendly analytics + Speed Insights (Vercel)
- SEO-ready: metadata, Open Graph + Apple touch icon (auto-generated), sitemap,
  robots, web manifest and `LocalBusiness` + `FAQ` structured data
- Accessible: skip-to-content link, keyboard-friendly, respects reduced-motion
- No external image dependencies — works offline and deploys anywhere

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
```

## Customising for the business

Almost everything you'll want to change lives in a single file:

- **`src/lib/site.ts`** — business name, phone, email, ABN, hours, address,
  service area, social links and the navigation. **Update the phone number,
  email, ABN and address with the real details before going live.**

Section content lives next to each component in `src/components/`:

| Edit this file | To change |
| --- | --- |
| `components/Services.tsx` | The list of services |
| `components/Gallery.tsx` | Project showcase (see "Adding photos" below) |
| `components/Testimonials.tsx` | Customer reviews (currently sample text) |
| `components/ServiceAreas.tsx` | Suburbs served |
| `components/Faq.tsx` | Frequently asked questions |
| `components/About.tsx` | About / founder story |

> ⚠️ The testimonials and review counts are **placeholder samples** to show the
> layout. Replace them with real customer reviews before publishing.

### Theme

The design uses a warm monochrome palette — near-black `--color-ink` plus
Tailwind's `stone` neutrals — defined in `src/app/globals.css` under `@theme`.
Change `--color-ink` (and swap `stone-*` for another neutral) to re-tone the
whole site.

### Adding real project photos

The gallery uses styled CSS panels so the site looks great with zero
dependencies. To use real photos instead, drop images into `public/` and swap
the panel markup in `components/Gallery.tsx` for Next's `<Image>` component.

## Contact form delivery

The quote form works immediately — submissions are validated and logged on the
server. To actually **receive** enquiries, set one of the following (e.g. in
`.env.local` for local dev, or your host's environment variables). See
`.env.example`.

**Option A — Webhook** (Zapier, Make, Slack/Discord incoming webhook, etc.):

```
CONTACT_WEBHOOK_URL=https://...
```

**Option B — Email via [Resend](https://resend.com):**

```
RESEND_API_KEY=re_...
CONTACT_TO_EMAIL=info@rmtiling.com.au      # where enquiries are sent
CONTACT_FROM_EMAIL="RM Tiling <quotes@yourdomain.com>"   # a verified sender
```

If neither is set, enquiries are logged to the server console (handy in dev).

## Deploy

This is a standard Next.js app and deploys anywhere that supports Node. The
simplest option is [Vercel](https://vercel.com/new): import the repo, add any
environment variables from above, and deploy.

After deploying, update `site.url` in `src/lib/site.ts` to your live domain so
canonical URLs, the sitemap and structured data are correct.

Analytics and Speed Insights are enabled automatically on Vercel — just turn
them on in the project's **Analytics** tab. No code changes needed.

## Launch checklist

- [ ] Replace placeholder **phone, email, ABN and address** in `src/lib/site.ts`
- [ ] Set `site.url` to your real domain
- [ ] Replace the **sample testimonials** with real reviews
- [ ] Add real **social media links** in `src/lib/site.ts`
- [ ] Configure contact-form delivery (`CONTACT_WEBHOOK_URL` or Resend) — see above
- [ ] Review the **Privacy Policy** and **Terms** (`src/app/privacy`, `src/app/terms`)
      — they are sensible templates for an Australian business, but should be
      checked against your actual practices (and ideally by a professional)
- [ ] (Optional) Swap the gallery's CSS motifs for real project photos
- [ ] Enable Analytics in the Vercel dashboard
