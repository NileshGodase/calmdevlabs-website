# AI Capabilities — CalmDevLabs

**Created:** 2026-10-11. **Page:** `ai-solutions.html` (linked in primary nav).

This document records what the website claims about CalmDevLabs' AI work, what is
actually implemented, and what remains. It exists so future edits keep the site
honest: no invented clients, testimonials, statistics, certifications, or case studies.

## AI services (as presented on the site)

Six service categories, each with an explicit status label:

| Service | Status on site | Meaning |
|---|---|---|
| AI-powered web & mobile apps | Offering now | Ready to scope; builds on our existing app practice |
| LLM integrations (Claude & other models) | Offering now | Ready to scope; model chosen per use case |
| AI chatbots & customer-support assistants | Offering now | Ready to scope |
| RAG & document question-answering | Piloting | Early engagements while we harden the approach |
| Business workflow automation & AI agents | Piloting | Early engagements; human review on consequential steps |
| AI-enabled ERP & internal tools | In development | Capability being built alongside ERP work |

**Actual implementation status:** these are service *offerings*, not past deployments.
The site says this explicitly ("Where we are, plainly" notice). Do not reword the
page to imply shipped AI client work unless it has actually happened.

## Product concept: AI Business Assistant

- **Status:** `Concept` — early-stage idea, nothing built, no users, no revenue, no live integrations.
- **Described on:** `ai-solutions.html#concept`, cross-linked from `products.html`.
- **Content:** customer problem, target customers, proposed features, Claude's intended role,
  potential integrations, and a 4-phase MVP roadmap (pilot → summarization/extraction →
  workflow automation → hardening).
- **Rule:** the status pill only moves to `Prototype`/`In development` when real work exists.

## Interactive demo

- **Location:** `ai-solutions.html#demo`, implemented in `src/main.ts` (`[data-ai-demo]`).
- **What it is:** a frontend-only Q&A widget over a fixed fictional sample document
  (GreenLeaf Organics store policy). Keyword matching against canned answers; fallback
  message when the question is not in the sample.
- **Labeling:** the page, the demo header, every answer ("Sample answer (illustrative)"),
  and the demo footnote all state it is an illustrative demo with sample data and
  **no live AI model**. Never remove or soften these labels without replacing the
  demo with a real backend.
- **Secrets:** none. No API keys exist in frontend code or the repo. If a real AI
  backend is added later, keys must live server-side (or in a backend service), never
  in this static site's code.

## Claude integration status

- **Intended uses (documented on site):** natural-language interfaces, document
  understanding & summarization, structured information extraction, AI-assisted
  workflow automation.
- **Current:** prototyping with LLM APIs (including Claude) plus building the
  surrounding software (ingestion, retrieval pipelines, review UIs, integrations).
- **Planned:** production retrieval systems with evaluation harnesses, access
  controls, and audit logging.
- **Explicit non-claims on the site:** not an Anthropic partner, no Claude
  certification, no startup-credits application. Do not add such claims without
  written confirmation.

## Remaining work / blockers

1. **Pilot customer:** the RAG "Piloting" label needs a real first engagement to be meaningful.
2. **Concept → prototype:** the AI Business Assistant needs a Phase-1 build (document upload + sourced Q&A) before the status can move.
3. **Evaluation harness:** planned before any business-critical deployment; not started.
4. **Startup programs:** the Claude for Startups application was never submitted (see
   READINESS_REPORT.md). If pursued, recheck Anthropic's current eligibility first.

## Changelog

- 2026-10-11: AI Solutions page created (services, honesty notice, illustrative demo,
  product concept, Claude section, CTAs); nav + sitemap + cross-links added; this doc created.
