# 12-Week Roadmap — Pulse-Integrated Scientific Evidence Intelligence

> **Adoption status (Pulse PR 1): PROPOSED — documentation only.** No research route, API, repository, database, authentication provider, hosted workspace or model deployment is established by this document. The existing Pulse editorial policy and executable contracts remain authoritative for journalism and releases.

**Status:** Proposed hybrid v0.2 · **Capacity assumption:** 6–8 hours/week, one maintainer · **Budget:** fixture/local first; approve model/cloud spend explicitly.

## Delivery philosophy

Two repositories, two release paths, one user-facing experience. **Pulse always remains a usable news publication** even if the research API is disabled. First ship a safe fixture-based `/research/` shell, then add a contract-compatible API, then real Europe PMC retrieval, then model-based evidence synthesis. Prevent premature production billing and unreviewed research-to-news publishing.

## Milestones and acceptance

| Milestone                             | Time                         | Outcome and exit gate                                                                                                                                                           | Repo ownership            |
| ------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| **M0 — Integration design**           | Week 1                       | Inspect current Pulse `main`, approve docs/ADRs and integration contract; fixture-only route spike planned; no editorial CI break                                               | Pulse + planned API       |
| **M1 — Connected discovery shell**    | Weeks 2–3                    | Astro `/research/` with scoped React island + fixture API client, navigation, optional verified-ID deep-link proof and graceful unavailable state; Pulse CI/preview unchanged   | Pulse                     |
| **M2 — Independent Research API**     | Weeks 4–5                    | New backend repository, typed `/v1` schema, Europe PMC adapter, normalized provenance/rights, contract tests and local fixture usage                                            | API                       |
| **M3 — Evidence workspace**           | Weeks 6–7                    | Auth/ownership design accepted, Postgres migrations (if adopted), selected source sets, permitted evidence spans, lexical retrieval baseline and UI wiring                      | API + Pulse               |
| **M4 — Claude grounded synthesis**    | Weeks 8–9                    | Budgeted model call, typed claims, citation validator, abstention, reviewer flow, 25-question benchmark baseline/clinical overstatement gates                                   | API + Pulse               |
| **M5 — Hardening and portfolio demo** | Weeks 10–12                  | Security/privacy decisions, test isolation, no-patient-data checks, independent deploy/rollback trials **or** reproducible local demo, documented case study and measured costs | Both                      |
| **M6 — Monitoring**                   | After MVP, only if validated | PRD-003 decision and separate costing/notifications plan                                                                                                                        | API + Pulse (optional UI) |

## Week-by-week plan

| Week | Focus                    | Concrete tasks                                                                                                                              | Demonstrable exit                                        |
| ---- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| 1    | Inspect and decide       | Confirm story schema/links; adopt mission/constitution/ADRs; draft route design, React/version compatibility, API contract and data warning | Reviewed foundation plus dependency/cost decision log    |
| 2    | Static research shell    | Add `/research/` as Astro route + React island; header entry and accessible fixture states                                                  | Existing publication build/CI untouched; UI fixture demo |
| 3    | Reader journey           | Verify DOI/PMID link contract using one real reviewed source; search/selection fixture; API-offline experience and preview safety           | PRD-001 frontend acceptance and screenshot tests         |
| 4    | API foundations          | Create separately scoped backend repo (after approval); Fastify, Zod, OpenAPI/contract, tests, mock adapter, no cloud                       | Contract/e2e compatibility checked locally               |
| 5    | Real source adapter      | Europe PMC bounded search, provenance, dedup, errors, rights handling; bridge UI to localhost API                                           | Ten real/fixture queries, documented gaps                |
| 6    | Persistence & identity   | DB migration/ownership and sign-in provider decision; hosted account privacy assessment                                                     | Save/reload selected papers; two-user isolation tests    |
| 7    | Retrieval baseline       | Permitted abstract snapshots, locators, lexical search, versioned gold questions                                                            | Baseline recall recorded; no unknown-rights full text    |
| 8    | Bounded Claude API       | Configurable model, structured output, citation membership validation, abstention, usage ceilings                                           | Recorded evaluated run with no fabricated citations      |
| 9    | Human review             | Evidence passage UI, limitations, manual draft review, JSON/Markdown export                                                                 | PRD-002 demo and gold-set review                         |
| 10   | Reliability/privacy      | Injection, rate/cost limits, preview boundary, secrets, deletion and cross-user security                                                    | Separate Pulse/API release stop checks                   |
| 11   | Deployment decision      | If approved, deploy to isolated EU environment and test API failure/rollback; else local reproducible demo                                  | No forced spend, documented outcome                      |
| 12   | Portfolio and validation | Record video, architecture notes, failure cases, five optional customer interviews, next-phase backlog                                      | Evidence-led portfolio case study                        |

## First four proposed PRs (not created)

1. **Pulse PR 1:** `docs(research): adopt hybrid mission, PRDs and integration contract` — no build/hosting changes.
2. **Pulse PR 2:** `feat(research): add fixture-backed Astro/React research route` — feature isolated; ensure no editorial regressions.
3. **API repo PR 1 (after repo approval):** `chore: bootstrap typed research API and source adapter fixtures` — no cloud/keys.
4. **API repo PR 2:** `feat: bounded Europe PMC discovery and versioned HTTP contract` — source/rights/error tests.

Future PRs bridge real API, workspace persistence and Claude separately. Do not merge without maintainer approval; no public model call before cost review.

## Cross-repository readiness gates

**Pulse:** `npm run verify` + browser/a11y/geometry smoke, `/research/` route test, deep-link validation, no private information in article markup, no secret/bundle leakage, no static build-time backend call, articles accessible with API offline.

**API:** typed contract check, upstream adapter fixtures, rights/identity/citation assertions, auth ownership, redacted logs, rate/model budget gates, privacy/deletion review, evaluation evidence.

**Integration:** contract smoke against pinned API version; explicit prod/preview/local origin configuration; API failure fallback; no research-to-editorial write routes or credentials; independent release/rollback evidence.

## Portfolio-ready criteria

Researcher can move from a verified Pulse article into `/research/`, collect papers, inspect source-backed claims and review/export a brief; all caveats and costs disclosed. CI, design trade-offs, provenance/evaluations, screenshot/video and reproducible local setup exist. If hosted deployment is too expensive or unsafe, ship a **truthfully labelled local demo** instead.

## When schedule slips

Defer dynamic article link coverage, Crossref enrichment, embeddings, monitoring, advanced filters and deployment polish. Never compromise rights, provenance, scientific caveats, citation guards, secrets, auth on hosted workspaces, human review or cost ceilings.
