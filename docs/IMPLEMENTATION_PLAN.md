# CalmDevLabs Website — Implementation Plan

**Status:** Phase 1 (repository audit) complete. Awaiting founder approval of this plan
plus answers to the open decisions in §1 before substantial implementation begins.

**Project directory:** `~/workspace/calmdevlabs-website/` (local; nothing pushed anywhere yet)

---

## 0. Phase 1 — Repository audit findings

- **GitHub account inspected:** `NileshGodase` (12 repositories). There is **no
  CalmDevLabs website repository**, no starter project, and no existing website
  code. Nothing to preserve, reuse, or avoid overwriting.
- **Production domain:** not established anywhere — no repo config, DNS record, or
  document states it. Per the brief it must come from the founder; nothing is invented.
- **Current branch / git status:** not applicable (greenfield; local dir only).
- **Cline rules / project instructions:** none found for this project.
- **Toolchain available here:** Node v24.20.0, npm 10.9.4, git 2.43.0. No emulator
  needed for this project. GitHub connection verified as `NileshGodase`
  (read access confirmed; write actions surface approval cards per tap).
- **Result:** greenfield build. All architecture choices below are proposals,
  made because there is no existing project to defer to.

## 1. Decisions (resolved 2026-10-10 — founder confirmed)

1. **Production domain:** `calmdevlabs.com` ✅ (apex is canonical; `www` redirects to apex)
2. **Repository:** new repo `NileshGodase/calmdevlabs-website` (founder: "go with your suggestion").
   Creation and pushes surface approval taps.
3. **Contact email:** `founders@calmdevlabs.com` — **provisioned 2026-10-11** (founder confirmed).
   Site config updated (`emailProvisioned: true`); the "being set up" notice is gone.
   Setup steps (for reference): `docs/EMAIL_SETUP_ZOHO.md`.
4. **Showcase material:** none yet — honest empty/experiment states throughout.
   **Service focus confirmed:** application development (Android + web apps),
   IT services, and ERP — with an **HR portal** as the concrete ERP offering.

## 2. Architecture decision

| Choice | Decision | Rationale |
|---|---|---|
| Build tool | Vite | Dev server + asset pipeline; `dist/` deploys cleanly to Pages |
| Language | TypeScript, strict | Catches errors; maintainable for solo founder |
| UI framework | **None (vanilla TS)** — *deviation from the brief's React preference, for approval* | Real per-page HTML URLs: better SEO, **no GitHub Pages SPA-routing hack**, near-zero JS, fastest load. The brief also says "prefer a simple static architecture over unnecessary enterprise complexity" — React adds ~140KB JS to a marketing site with almost no interactivity. |
| Styling | Hand-authored CSS design tokens (custom properties) | The brief explicitly requires reusable tokens (colors, type, spacing, radii, shadows, widths, breakpoints, focus, motion). No Tailwind dependency; exact control; smaller CSS. |
| Icons | Lucide, inline SVG sprite | No icon-font dependency, no extra request |
| Shared header/footer | Tiny Node include script at build time (partials → pages) | DRY source, SEO-clean static HTML output (no JS-rendered nav) |
| Routing | Multi-page, one HTML file per page | Every URL resolves on static hosting; `404.html` included |
| Contact form | Client-side validation + `mailto:` fallback guarded by config | No backend on Pages; upgrade path (Formspree etc.) documented, needs founder approval |
| Analytics | None by default | Brief: no unnecessary tracking |
| Secrets | None anywhere in the repo | Static site has nothing secret to hold |

Vite `base` will be `/` (domain-root deployment with custom domain). Verified in Phase 8.

## 3. Brand direction (Phase 3)

- **Personality:** calm, confident, technically competent, minimal, trustworthy.
- **Foundation:** deep navy/charcoal; **accent:** restrained teal (blue-violet reserved
  for rare highlights). AA contrast on all text pairs; `prefers-reduced-motion` honored.
- **Wordmark:** custom SVG (reusable component) + SVG favicon + OG social image.
- **Typography:** system-font stack with strong hierarchy (no webfont dependency =
  zero FOUT, fastest load); generous whitespace; max line lengths ~65ch.
- **No** generic AI illustrations, fake dashboards, stock testimonials, or decorative
  animation. Real diagrams/code illustrations only where they explain something.

## 4. Information architecture

| Page | URL | Purpose |
|---|---|---|
| Home | `/` | Hero, capabilities, services overview, process teaser, work/products teaser, contact CTA |
| Services | `/services` | 6 services (Android, web apps, ERP, backend/APIs, DB & integration, maintenance) — problem, use cases, deliverables, process, "what to send us", CTA each |
| Process | `/process` | 7-step working method, framed as *proposed* method, not past proof |
| Work | `/work` | Case-study cards + detail layout; honest labels (experiment / personal project / open source) |
| Products | `/products` | Catalogue with status values (Concept → Released); honest empty state if none |
| About | `/about` | What we build, engineering philosophy; **no** invented history/team/dates |
| Contact | `/contact` | Inquiry form (validated, guarded mailto), spam note, privacy acknowledgment |
| Privacy | `/privacy` | Accurate to actual site behavior; placeholders flagged |
| 404 | `/404.html` | GitHub Pages fallback page |

## 5. Phases and acceptance criteria

- **Phase 1 — Repository audit & requirements.** ✅ Done (§0 above).
- **Phase 2 — Implementation plan & content inventory.** This document +
  `docs/CONTENT_CHECKLIST.md`. AC: plan approved; every content gap listed with owner.
- **Phase 3 — Brand identity & design system.** Tokens, wordmark, favicon, OG image,
  base layout, reduced-motion + focus states. AC: token file covers all required
  categories; text contrast ≥ 4.5:1; animations disabled under reduced-motion.
- **Phase 4 — Website structure & core pages.** Layout, Home, About, Process,
  Privacy, 404. AC: `npm run build` green; `tsc --noEmit` clean; semantic HTML;
  all internal links resolve in local preview.
- **Phase 5 — Services, portfolio, products, contact.** AC: every claim passes the
  honesty review (§6); form validates good/bad input; mailto guard behaves correctly
  with and without a configured email.
- **Phase 6 — SEO, accessibility, performance.** Titles/meta/OG/canonical per page,
  sitemap, robots, favicon, manifest, JSON-LD (verified facts only), optimized assets.
  AC: automated a11y check clean on all pages; no console errors; keyboard navigable.
- **Phase 7 — GitHub Pages & Cloudflare.** Actions workflow, `CNAME` (parameterized
  until domain known), `docs/DEPLOYMENT_GUIDE.md` finalized. AC: workflow YAML
  validated; Pages artifact path correct; guide reviewed against current official docs.
- **Phase 8 — Testing & defect fixing.** Fill `docs/TESTING_REPORT.md`. AC: build,
  typecheck, link/route checks, a11y, responsive, form, asset, and Pages-path checks
  all green or explicitly documented as unverifiable.
- **Phase 9 — Deployment preparation & final readiness report.** AC: final report
  distinguishes **completed / tested / deployed / unverified**; founder-input list;
  Claude-for-Startups readiness checklist; nothing pushed without approval.

## 6. Binding honesty guardrails

- Never invent: domain, email, founding date, history, team bios, headcount, office,
  certifications, registration numbers, GSTIN, awards, funding, partnerships, clients,
  testimonials, traction, revenue, product names/dates/users, AI capabilities.
- Every placeholder is visibly marked and listed in `docs/CONTENT_CHECKLIST.md`.
- Work/products carry only statuses supported by verified progress.
- The site must read as a credible *small/founder-led* studio — no inflated claims.

## 7. Claude for Startups readiness (tracked, not submitted)

- Phase 2: draft truthful company description from verified facts only.
- Phase 6: verify current official Anthropic eligibility/application docs via web;
  never hardcode benefits, deadlines, or approval guarantees.
- Phase 9: readiness checklist (identity, real services, genuine product direction,
  working contact, authentic work, consistent branding/domain, no misleading claims).
- **No application is ever submitted automatically.**

## 8. Definition of done

Complete only when: all pages implemented with consistent professional design;
responsive layouts checked; production build succeeds; typecheck/lint/tests pass;
critical links and interactions tested; contact method functional *or* its setup
documented; Pages workflow prepared and validated as far as possible; domain
configuration documented; no unsupported claims or fake functionality remain;
outstanding manual steps listed; final report separates completed/tested/deployed/unverified.
