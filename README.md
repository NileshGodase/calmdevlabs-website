# CalmDevLabs Website

The official website of **CalmDevLabs** — a software development studio in India.
Live at [https://calmdevlabs.com](https://calmdevlabs.com), hosted on GitHub Pages
(free), DNS via Cloudflare.

## Stack

- **Vite** + **TypeScript (strict)** — multi-page static site, no UI framework.
  Every page is real HTML: best SEO, no client-side routing, near-zero JavaScript.
- **Hand-authored CSS design tokens** (`src/styles/tokens.css`) — no CSS framework.
- **Lucide icons** as an inline SVG sprite (generated from `lucide-static`).
- Shared header/footer via a tiny Vite plugin (`<!--#include … -->` partials).

## Development

```bash
npm install     # install dependencies
npm run dev     # local dev server
npm run typecheck
npm run build   # production build → dist/
npm run preview # preview the production build
```

Regenerate the icon sprite after changing the icon list in `scripts/build-icons.mjs`:

```bash
npm run build:icons
```

## Project layout

```
src/
  index.html, about.html, services.html, ai-solutions.html, …   # pages (one real HTML file each)
  partials/      # header.html, footer.html, sprite.html (generated)
  styles/        # tokens.css (design system), main.css
  main.ts        # nav toggle, form validation, mailto fallback, AI demo widget
  config.ts      # domain, contact email, emailProvisioned flag
public/          # CNAME, logo.png, og-image.png, robots.txt, sitemap.xml
  images/        # generated illustrations (hero, AI, education, concept)
scripts/         # build-icons.mjs
docs/            # implementation plan, deployment guide, content checklist, testing report, AI capabilities
```

## Deployment

Push to `main` → GitHub Actions builds and deploys to GitHub Pages automatically.
One-time setup (Pages source = GitHub Actions, custom domain, Cloudflare DNS) is
documented step-by-step in [`docs/DEPLOYMENT_GUIDE.md`](docs/DEPLOYMENT_GUIDE.md).

Company email provisioning (Zoho Mail): [`docs/EMAIL_SETUP_ZOHO.md`](docs/EMAIL_SETUP_ZOHO.md).
When the mailbox is live, set `emailProvisioned: true` in `src/config.ts`.

## Content honesty

This site deliberately contains **no invented claims**: no fake clients,
testimonials, founding dates, team bios, traction, or products. Placeholders are
tracked in [`docs/CONTENT_CHECKLIST.md`](docs/CONTENT_CHECKLIST.md). Keep it that way.
