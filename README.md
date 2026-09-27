# Shree Ram Bakers Website

A production-ready, fully responsive website for Shree Ram Bakers — an artisan bakery in Chandigarh.

## Tech Stack

- **Framework**: Next.js 14 (App Router, TypeScript)
- **Styling**: Tailwind CSS + CSS Custom Properties
- **Animation**: Framer Motion (hero sequence only)
- **CMS**: Sanity.io (free tier)
- **Email**: Resend + React Email
- **Forms**: React Hook Form + Zod
- **Spam Protection**: Cloudflare Turnstile + honeypot
- **Hosting**: Vercel

## Features

- ✅ Responsive design (375px - 1536px+)
- ✅ Semantic HTML, WCAG AA accessible
- ✅ SEO optimized with JSON-LD schemas
- ✅ Automated email notifications (owner + customer auto-reply)
- ✅ Content managed via Sanity Studio
- ✅ ISR revalidation on content changes
- ✅ Performance optimized (LCP < 2s target)
- ✅ No layout shift (CLS < 0.05)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Sanity.io account (free tier)
- Resend account (for emails)
- Cloudflare Turnstile account (for spam protection)

### Installation

```bash
# Clone and install
cd shree-ram-bakers
npm install

# Copy environment variables
cp .env.example .env.local

# Fill in your environment variables
# See .env.example for required values
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Sanity Studio

Access the CMS at `/studio` (e.g., http://localhost:3000/studio)

### Build

```bash
npm run build
npm run start
```

### Lint & Type Check

```bash
npm run lint
npm run typecheck
```

## Project Structure

```
bakery-website/
├─ app/
│  ├─ (site)/              # Public pages
│  │  ├─ page.tsx          # Home
│  │  ├─ menu/             # Menu pages
│  │  ├─ about/            # About page
│  │  ├─ gallery/          # Gallery page
│  │  ├─ custom-orders/    # Custom orders page
│  │  └─ contact/          # Contact page
│  ├─ api/
│  │  ├─ inquiry/          # Form submission endpoint
│  │  └─ revalidate/       # Sanity webhook endpoint
│  ├─ studio/[[...tool]]/  # Sanity Studio
│  ├─ layout.tsx
│  └─ globals.css
├─ components/
│  ├─ ui/                  # Base UI components
│  ├─ layout/              # Navbar, Footer, Section
│  ├─ product/             # ProductCard, ProductGrid
│  ├─ forms/               # InquiryForm
│  └─ marketing/           # Hero, TestimonialCarousel, GalleryLightbox
├─ lib/
│  ├─ sanity/              # Sanity client & schemas
│  ├─ email/               # Resend + React Email templates
│  ├─ validation/          # Zod schemas
│  ├─ utils.ts
│  ├─ types.ts
│  ├─ content.ts           # Fallback content
│  └─ content-service.ts   # Content abstraction layer
├─ public/images/          # Fallback images
├─ styles/design-tokens.css
├─ .env.example
└─ README.md
```

## Design System

### Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--ink` | `#28221D` | Text on light surfaces |
| `--counter` | `#3A2E23` | Header, footer, hero overlay |
| `--parchment` | `#FAF5E9` | Primary background |
| `--parchment-alt` | `#F1E6CC` | Alternating sections |
| `--jam` | `#6B2737` | Primary CTAs, links, highlights |
| `--butter` | `#E8B94A` | Secondary highlights |

### Typography

- **Display**: Fraunces (variable, optical-size, soft/wonk axes)
- **Body**: Public Sans

### Motion

- **One deliberate moment**: Hero load-in sequence
- **Action-triggered only**: Menu filter, lightbox, form submit, toast
- **Respects**: `prefers-reduced-motion`

## Content Management

### Option A: Sanity.io (Recommended)

1. Create a Sanity project at [sanity.io](https://sanity.io)
2. Add your project ID and dataset to `.env.local`
3. Deploy Sanity Studio: `npx sanity deploy`
4. Configure webhook: `https://your-domain.com/api/revalidate`

### Option B: Fallback Content (Faster MVP)

Content lives in `lib/content.ts` with images in `public/images/`.
Changes require code edit + git push (Vercel auto-deploys).

## Email Setup (Resend)

1. Sign up at [resend.com](https://resend.com)
2. Verify your sending domain
3. Create API key
4. Add `RESEND_API_KEY`, `OWNER_EMAIL`, `FROM_EMAIL` to `.env.local`

## Spam Protection (Turnstile)

1. Create a site at [Cloudflare Turnstile](https://dash.cloudflare.com/?to=/:account/turnstile)
2. Add site key to `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
3. Add secret key to `TURNSTILE_SECRET_KEY`

## Deployment (Vercel)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

Vercel handles:
- Automatic HTTPS
- Global CDN
- Image optimization
- ISR revalidation
- Preview URLs per PR

## Accessibility Checklist

- [ ] Semantic landmarks (`header`, `nav`, `main`, `footer`)
- [ ] One `<h1>` per page
- [ ] Keyboard navigation with visible focus
- [ ] Form labels + `aria-describedby` for errors
- [ ] `aria-live` status for form submissions
- [ ] Alt text required in CMS
- [ ] Skip-to-content link
- [ ] `prefers-reduced-motion` respected

## SEO Checklist

- [ ] Per-page metadata via Next.js Metadata API
- [ ] JSON-LD: `Bakery`/`LocalBusiness` schema
- [ ] JSON-LD: `Menu`/`MenuItem` schema
- [ ] Auto-generated `sitemap.xml` and `robots.txt`
- [ ] Canonical URLs
- [ ] Open Graph + Twitter cards
- [ ] Descriptive alt text

## Performance Targets

| Metric | Target |
|--------|--------|
| LCP | < 2.0s (throttled 4G) |
| CLS | < 0.05 |
| INP | < 200ms |
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse SEO | ≥ 95 |

## License

MIT License - feel free to use for your own bakery!