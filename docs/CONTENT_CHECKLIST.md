# CalmDevLabs Website — Content Checklist

Every item the site needs, who owns it, and its status.
**Legend:** ✅ have · ✏️ placeholder (visibly marked on site) · ❓ needs founder input ·
🔧 to be created in build.

## Global (all pages)

| Item | Status | Notes |
|---|---|---|
| Production domain (exact) | ✅ | `calmdevlabs.com` (apex canonical), confirmed 2026-10-10 |
| Contact email (verified) | ✏️ | Planned: `contact@calmdevlabs.com` via Zoho Mail — **not yet provisioned**; site shows visible "being set up" notice; setup steps in `docs/EMAIL_SETUP_ZOHO.md` |
| Company logo/wordmark | 🔧 | Custom SVG in Phase 3 |
| Favicon | 🔧 | SVG favicon, Phase 3 |
| Social sharing image (OG) | 🔧 | Generated, Phase 3 |
| Business location detail | ✅/❓ | "India" confirmed; city/state only if founder provides |
| Founding date, team, registration, GSTIN | ❓ | **Omit entirely** unless founder provides verified facts |

## Home (`/`)

| Item | Status | Notes |
|---|---|---|
| Headline + supporting copy | 🔧 | Honest, specific; no "world-class"/"revolutionary" |
| Capability summary | 🔧 | Android, web, ERP, backend — per brief |
| Services overview (6) | 🔧 | Links to `/services` anchors |
| Process teaser | 🔧 | Links to `/process` |
| Featured work/products teaser | ✏️ | Honest states until real items confirmed |
| Contact CTA | 🔧 | |

## Services (`/services`) — one section each

Android apps · Web apps · Custom ERP (**HR Portal** featured) · Backend & APIs ·
Database & integration · Maintenance & modernization — each with problem, use cases,
deliverables, process, "what to send us", CTA. Founder-confirmed focus: application
development, IT services, ERP/HR portal. Founder reviews tone in Phase 8.

## Process (`/process`)

| Item | Status | Notes |
|---|---|---|
| 7-step method | 🔧 | Framed as *proposed* working method, not past proof |

## Work (`/work`)

| Item | Status | Notes |
|---|---|---|
| Real client work | ❓ | None claimed unless founder provides evidence |
| Personal projects / experiments to feature | ❓ | e.g. existing builds — only with founder's OK on framing |
| Case-study detail (problem, approach, architecture, lessons) | ✏️ | Template ready; content only from verified facts |
| Screenshots | ❓ | Only real ones |

## Products (`/products`)

| Item | Status | Notes |
|---|---|---|
| Product entries (name, problem, users, status, stack, links) | ❓ | Statuses limited to Concept / In development / Prototype / Released |
| Empty state copy | 🔧 | Honest "building in the open" message if no products yet |

## About (`/about`)

| Item | Status | Notes |
|---|---|---|
| What we build, philosophy, collaboration approach | 🔧 | Founder-led tone; no invented history/team/office |

## Contact (`/contact`)

| Item | Status | Notes |
|---|---|---|
| Form fields (name, business email, company, category, budget, description, consent) | 🔧 | Validated client-side; guarded mailto fallback |
| Form backend / external service | ❓ | Needs founder approval before any signup |
| Spam protection | ✏️ | Honeypot; service-side CAPTCHA only if a service is chosen |

## Privacy (`/privacy`)

| Item | Status | Notes |
|---|---|---|
| Policy text | 🔧 | Accurate to actual site: no analytics, no cookies, form→mailto |
| Contact for privacy queries | ❓ | Same email decision as Contact |

## Claude for Startups application draft

| Item | Status | Notes |
|---|---|---|
| Company description draft (truthful) | 🔧 | Phase 9, from verified facts only |
| Official eligibility requirements | 🔧 | Re-verify via web in Phase 6; never hardcode |

## Founder-input summary (the ask)

1. Exact production domain
2. Repository choice (or approve creating `calmdevlabs-website`)
3. Verified contact email (or accept documented placeholder)
4. Any real projects/products/work to showcase (optional — honest empty states otherwise)
5. Anything about the company that *may* be stated (location detail, background)
