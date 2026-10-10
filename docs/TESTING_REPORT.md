# CalmDevLabs Website — Testing Report

**Build under test:** local production build (`npm run build`, Vite 6.4.4), verified 2026-10-10.
**Deployed site:** not yet — awaiting repo creation + push (see blockers).

## Build & static checks

| Check | Command / method | Result |
|---|---|---|
| Dependency install | `npm ci` equivalent (`npm install`) | ✅ pass (Node 24, npm 10) |
| Production build | `npm run build` | ✅ pass — 9 pages, CSS 12.2kB, JS 3.8kB; total page weight ~22kB max |
| TypeScript (strict) | `npm run typecheck` (`tsc --noEmit`) | ✅ pass (after adding `@types/node` for `vite.config.ts`) |
| Lint | `npm run lint` | n/a — no lint configured (small static site; TS strict + build serve as checks) |
| No secrets in repo | manual review + `git log` | ✅ pass — no secrets, tokens, or credentials anywhere in source |
| Workflow YAML valid | manual review against official actions docs | ✅ pass — checkout@v4, setup-node@v4, upload-pages-artifact@v3, deploy-pages@v4; least-privilege permissions |
| Icon sprite generation | `npm run build:icons` | ✅ pass — 22 authentic Lucide icons inlined as SVG symbols |

## Routes & links (local preview + `dist/`)

Automated static check over `dist/` (link/anchor/meta/JSON-LD/label/sitemap audit):

| Check | Result |
|---|---|
| 9 HTML pages emitted (index, about, services, process, work, products, contact, privacy, 404) | ✅ |
| No unresolved `<!--#include` partials in output | ✅ |
| No broken internal links (all `href`/`src` resolve within `dist/`) | ✅ |
| All `#anchor` links (e.g. `/services.html#erp`) match real element ids | ✅ |
| No broken asset references (CSS, JS, favicon, og-image.png) | ✅ |
| External links use https | ✅ (none external yet besides sitemap/OG absolutes) |
| Vite `base` correct for domain-root deploy | ✅ (`base: '/'`, CNAME = calmdevlabs.com) |
| 404 page intentionally has no canonical/OG (carries `noindex`) | ✅ intentional |

## Interactions

Verified 2026-10-10 with Playwright (headless Chromium) against the production
`dist/` build — 41/41 checks passed:

| Check | Result |
|---|---|
| Desktop nav links land on correct pages (Services, Process, Work, Products, About) | ✅ |
| Mobile nav at 390px (open/close, `aria-expanded`) | ✅ |
| All CTAs perform advertised action | ✅ (nav + in-page CTAs resolve) |
| Contact form: empty submit → 5 inline errors, focus moves to name field | ✅ |
| Contact form: invalid input (bad email, short description, no consent) → targeted errors, valid fields clean | ✅ |
| Contact form: valid input → success panel appears, mailto composed | ✅ |
| Email "being set up" notice visible on contact page | ✅ |
| Footer email link shows contact@calmdevlabs.com | ✅ |
| No console errors or page errors on any of the 9 pages | ✅ |
| No horizontal overflow at 1280px or 390px on any page | ✅ |
| Screenshots reviewed (desktop + mobile home, services, contact success) | ✅ no layout defects |

## Accessibility

| Check | Result |
|---|---|
| Automated axe-style check | ⚠️ not run — no axe runner installed; replaced by manual audit below |
| Keyboard-only navigation, visible focus | ✅ code-reviewed: skip link, `:focus-visible` ring, mobile menu is a real `<button>` with `aria-expanded` |
| Form labels associated, error announcements | ✅ code-reviewed + static check: every field has `<label for>`, errors use `role="alert"`, focus moves to first invalid field |
| Color contrast | ✅ checked by construction: ink #182234 on #f7f8fa (~14:1); #eef2f8 on #0a1120 (~15:1); teal-700 #0f766e on white (~5.9:1); teal-400 #2dd4bf on navy-950 used for large text/accents only |
| `prefers-reduced-motion` disables animation | ✅ in CSS |
| Images have alt text; decorative hidden | ✅ (OG image has `og:image:alt`; inline SVGs `aria-hidden`) |
| Semantic HTML | ✅ header/nav/main/section/footer, one h1 per page, heading hierarchy checked |

## SEO

| Check | Result |
|---|---|
| Unique title + meta description per page | ✅ static check |
| Canonical URLs consistent | ✅ all `https://calmdevlabs.com/*.html`; sitemap matches canonicals |
| Open Graph + Twitter cards per page; image loads | ✅ meta present; `og-image.png` (1200×630) generated and in `dist/` |
| `sitemap.xml` + `robots.txt` valid | ✅ |
| JSON-LD Organization: verified facts only | ✅ name/url/logo/description only — no address, dates, or ratings |
| Heading hierarchy correct per page | ✅ reviewed |

## Performance

| Check | Result |
|---|---|
| Total page weight | ✅ ~22kB HTML + 12kB CSS + 3.8kB JS (gzipped: ~11kB total for the heaviest page) |
| Images optimized | ✅ favicon + OG are the only images; OG PNG ~ (generated, 1200×630) |
| Webfonts | ✅ none — system stack, zero FOUT |
| Layout shift | ✅ no async-injected content; static HTML |

## Deployment (post-domain)

| Check | Result |
|---|---|
| GitHub repo created | ✅ `NileshGodase/calmdevlabs-website` (public, via web UI — connector `create_repository` is blocked for the app) |
| Source pushed | ✅ 37 files in 6 commits on `main` (3× `push_files` + workflow + OG image via browser; content integrity spot-checked) |
| Pages build from Actions succeeds | ⏳ runs on first push after Pages source is set to GitHub Actions (user-side setting) |
| Custom domain verifies, HTTPS enforced | ⏳ needs Pages settings + Cloudflare DNS (user-side, documented) |
| `dig`/`curl` checks pass | ⏳ after DNS |
| Live site spot-check | ⏳ only if authorized |

## Honesty review (Phase 8 gate)

- [x] No invented domain, email, dates, team, clients, testimonials, traction, revenue, funding, certs
- [x] Contact email visibly marked as being provisioned; setup documented in `docs/EMAIL_SETUP_ZOHO.md`
- [x] Work/Products pages use honest empty states; statuses limited to verified progress
- [x] Process page framed as proposed method, not past proof

## Defects found & fixed

| # | Description | Severity | Status |
|---|---|---|---|
| 1 | `tsc --noEmit` failed on `vite.config.ts` (missing `@types/node`) | low | ✅ fixed — added `@types/node` devDependency |
| 2 | `<script src="/main.ts">` injected via `transformIndexHtml` partial was not bundled (Vite discovers module scripts before that hook) | medium | ✅ fixed — partials now resolved in `transform` with `enforce: 'pre'`; JS bundles to `dist/assets/main-*.js` and is referenced on all pages |
