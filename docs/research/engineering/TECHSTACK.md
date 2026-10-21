# Technology Stack — Hybrid Pulse + Research API

> **Adoption status (Pulse PR 1): PROPOSED — documentation only.** No research route, API, repository, database, authentication provider, hosted workspace or model deployment is established by this document. The existing Pulse editorial policy and executable contracts remain authoritative for journalism and releases.

**Status:** Proposed v0.2; verify exact version compatibility, quotas and vendor terms before committing infrastructure. This document differentiates **existing Pulse code** from **planned research additions**.

## Existing application (verified in `GadDev/healthtech-ai-pulse`, main, 2026-10-21)

- Astro 7, TypeScript 6, Node.js 24, Markdown/content collections, Pagefind, Oxlint/Oxfmt, Node tests, Playwright/axe.
- Statically built to `dist/`, deployed to Firebase Hosting `https://healthtech-ai-pulse.web.app/`; editorial content is PR-reviewed with independent release gates.
- `astro.config.mjs` uses MDX and sitemap; no React integration is currently configured. `firebase.json` hosts `dist` and does not currently declare research API rewrites.
- No reader authentication, research persistence or interactive scientific backend is implemented in Pulse. **Do not pretend the proposed capabilities already exist.**

## Target implementation by ownership

| Layer         | Pulse repo — reader-facing                                                                                         | Research API repo — independently deployed                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Codebase      | Extend existing Astro application; scoped `@astrojs/react` integration + React components **on `/research/` only** | Proposed new `GadDev/healthtech-evidence-api` (not created); Node.js 24 + TypeScript strict ESM                |
| Pages         | Static news/SEO and `/research/` shell with hydrated research island                                               | No independent public frontend; machine-readable HTTP API only                                                 |
| Components    | Reuse Pulse design tokens/accessible UX; React for search/results/evidence workspace                               | Fastify + Zod contracts and deterministic validation                                                           |
| Model         | No model tokens/keys in browser                                                                                    | Anthropic official TypeScript SDK, model chosen after eval and cost analysis                                   |
| Research      | Browser calls typed search/workspace endpoints                                                                     | Europe PMC REST adapter; Crossref enrichment post-P0                                                           |
| Storage       | No DB in publication build; no private data in static files                                                        | PostgreSQL; EU-region hosted Supabase is **candidate**, subject to privacy/cost review                         |
| Retrieval     | Evidence UI and selection                                                                                          | Remote Europe PMC discovery; lexical/local Postgres FTS baseline; pgvector only with benchmark justification   |
| Auth          | Public editorial site remains anonymous; research features prompt for sign-in only when necessary                  | Hosted workspace/LLM routes require identity verification and ownership; Supabase Auth candidate, adopt by ADR |
| Tests         | Existing `npm run verify`, Playwright/axe + new isolated research-route tests                                      | Vitest + fixtures, integration/auth isolation, citation/evaluation tests                                       |
| CI/CD         | Existing Pulse Firebase Hosting deploy, no backend credentials                                                     | New workflow/identity scoped only to Research API deploy; not coupled to Pulse merge or deploy                 |
| Hosting       | Existing Firebase Hosting; no server-side Astro conversion                                                         | Local first; potential EU Cloud Run with billing approval, or a lower-cost compatible host after comparison    |
| Observability | UI error boundary, anonymous-safe request IDs/health state                                                         | Structured logs, audit, model token & spend ledger, request/trace IDs, redaction                               |

## Integration choices and trade-offs

- **Choose Astro + React island, not a new Vite SPA** in MVP. It preserves one site/header and static editorial performance while enabling interactive controls. Add `@astrojs/react` only to Pulse PR that introduces `/research/`, and verify Astro/React versions.
- **Initial API access:** browser calls a separately hosted API origin configured by a public build-time `PUBLIC_RESEARCH_API_BASE_URL` (never a secret). Strict CORS allowlist and validated auth tokens; production/preview/local origins listed explicitly. For local UI dev use a fixture adapter or localhost API.
- **Possible later simplification:** Firebase Hosting `/research-api/**` rewrite to Cloud Run for a same-origin endpoint. This requires a measured compatibility/security test, Cloud Run billing and IAM, correct rewrite ordering, routing, auth, response headers, cache settings, and an ADR. Not assumed by MVP.
- **Static-site boundary:** no database or Claude requests during Astro build, content generation, article rendering, RSS, sitemap, or editorial validation.
- **Preview safety:** PR preview defaults to fixtures or a **distinct non-production test API**; production API, billing and private workspaces must not be silently called by previews.

## Planned source layout

```text
GadDev/healthtech-ai-pulse/             # existing, static public frontend
  src/pages/research/index.astro       # new static shell
  src/components/research/*            # new hydrated React island
  src/lib/research/*                   # typed client, URL/query parsing, fixtures
  tests/*                              # existing checks + research smoke tests

GadDev/healthtech-evidence-api/        # proposed new backend repo
  src/modules/sources/*                # Europe PMC + rights policy
  src/modules/catalog/*                # records/dedup
  src/modules/workspace/*              # auth-scoped research sets
  src/modules/evidence/*               # spans/lexical retrieval
  src/modules/ai/*                     # bounded Claude synthesis
  src/modules/observability/*          # logs/cost/audit
  src/routes/v1/*
  migrations/
  eval/{fixtures,questions,judgments,results}/
  tests/
  .github/workflows/
```

Avoid shared build-time workspace packages across repos initially. Publish a **versioned OpenAPI/JSON Schema contract** from API repo and generate/check a pinned client in Pulse. A breaking contract change must trigger a compatibility verification before deployment.

## Cost and privacy gates

- Existing Firebase static Hosting remains the baseline; using Cloud Run requires **Cloud Billing / potentially Firebase Blaze** and may incur fees even if free usage allowances exist. Hosting Cloud Run is a **proposal**, not deployed today.
- ChatGPT subscription does not include Anthropic API calls. Design with static fixtures and a central model-disable setting; approval required before any spending.
- Research prompt/history and user IDs may be personal data. EU hosting alone does not establish GDPR compliance; review provider retention, regions, cross-border processing, DPAs, lawful basis and deletion before hosted accounts.

## References

- Existing application: https://github.com/GadDev/healthtech-ai-pulse
- Astro React: https://docs.astro.build/en/guides/integrations-guide/react/
- Firebase rewrites: https://firebase.google.com/docs/hosting/full-config
- Firebase Cloud Run integration/billing: https://firebase.google.com/docs/hosting/cloud-run
- Europe PMC: https://europepmc.org/RestfulWebService
- Claude structured output: https://platform.claude.com/docs/en/build-with-claude/structured-outputs
