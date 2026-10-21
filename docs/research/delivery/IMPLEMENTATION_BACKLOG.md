# Implementation Backlog — Hybrid Frontend and Independent API

> **Adoption status (Pulse PR 1): PROPOSED — documentation only.** No research route, API, repository, database, authentication provider, hosted workspace or model deployment is established by this document. The existing Pulse editorial policy and executable contracts remain authoritative for journalism and releases.

**Status:** Proposed v0.2 · **Estimates:** S (≤ half-day), M (1–2 days), L (3–5 days). Estimates are planning guesses, not commitments.

## Epic PULSE — Existing publication integration
| ID | Work | Size | Dependency | Acceptance evidence |
|---|---|---|---|---|
| PULSE-01 | Inspect current Pulse source/story schemas, routing, tests and visual conventions | S | None | Explicit verified fields/routes, no imagined DOI support |
| PULSE-02 | Adopt hybrid docs and integration contract via draft PR | S | PULSE-01 | Reviewed PR; no direct main merge |
| PULSE-03 | Add Astro `/research/` shell and `@astrojs/react` island with fixture adapter | M | PULSE-02 | Static build green; React only on research pages |
| PULSE-04 | Accessible nav / search / result / API offline states | M | PULSE-03 | Keyboard, 320/375/960/1280 smoke + Playwright |
| PULSE-05 | Verified paper ID deep link from eligible story, not global link injection | M | PULSE-01,PULSE-03 | Correct parser, safe fallback; no private URL content |
| PULSE-06 | Pin typed API-v1 consumer; preview uses fixtures/test API | M | API-02 | Compatibility/no-prod-calls checks |
| PULSE-07 | Research evidence panel, review/export UI | L | API-07 | Citation passages clear; disclaimer/review state visible |
| PULSE-08 | Regression and fallback tests | M | PULSE-03 | All editorial build, RSS, Pagefind and article smoke still green when API off |

## Epic API — New independently operated backend
| ID | Work | Size | Dependency | Acceptance evidence |
|---|---|---|---|---|
| API-01 | Approve/initialize new API repository and CI skeleton (no paid hosting) | S | PULSE-02 | Strict TS, Fastify, Vitest, no secrets in repo |
| API-02 | Publish `/v1` OpenAPI/Zod contract, typed errors, mock handlers | M | API-01 | Consumer contract test against fixture UI |
| API-03 | Europe PMC adapter with bounds/retries/fixtures | M | API-02 | Search successes, 429 and timeout tests |
| API-04 | DOI/PMID/PMCID identity, rights-aware normalization | M | API-03 | No unsafe merge/unknown-rights full text |
| API-05 | Auth provider/region/privacy ADR and protected workspace model | M | API-02 | Verified identities, two-user isolation tests |
| API-06 | Snapshot/`EvidenceSpan` store and lexical retrieval | M | API-04,API-05 | Source-membership and retrieval baseline |
| API-07 | Claude structured synthesis, abstention and deterministic citation validator | L | API-06 | No foreign/unknown span accepted; budget max respected |
| API-08 | Reviews/exports and audit/usage ledger | M | API-07 | Explicit `draft`/`reviewed`, provenance, cost recorded |
| API-09 | Security and healthcare safety tests | M | API-05,API-07 | Prompt injection, auth, rights and cost gates |
| API-10 | Independently deploy or publish reproducible local demo | M | API-09 | Explicit risk/cost go/no-go and rollback |

## Epic EVAL/PORTFOLIO
| ID | Work | Size | Dependency | Acceptance evidence |
|---|---|---|---|---|
| EVAL-01 | Gold 25 questions, 30–50 rights-safe records, 10 attacks | L | API-04 | Versioned corpus, source rights and annotations |
| EVAL-02 | Lexical baseline, recall@K and errors | M | API-06,EVAL-01 | Measured report without fictional benchmarks |
| EVAL-03 | Human claim grounding review and failures | M | API-07,EVAL-01 | No unreported serious overstatement in release sample |
| PORT-01 | Architecture case study and README demo instructions | M | API-10,PULSE-08 | Honest deployment status, costs, video and limits |
| FUT-01 | Monitoring/business decision | S | PORT-01 + interviews | Phase-2 ADR only if justified |

## Proposed PR cadence
- **Pulse PR1:** Docs/architecture only. **Pulse PR2:** Fixture UI route. **Pulse PR3:** Public ID links and typed client. **Pulse PR4:** Evidence workspace UI.
- **API PR1:** Repo/CI/contract scaffolding. **API PR2:** Europe PMC source + provenance. **API PR3:** Auth/DB/retrieval. **API PR4:** Claude synthesis/evaluation/review.
- Do not block Pulse editorial deployments on unfinished backend features. Do not let API deploy identities write to Pulse.

## Week 1 checklist
- [ ] Verify current Pulse `main` and story schema; list source IDs actually present.
- [ ] Review Mission, Constitution, both MVP PRDs and the new Integration Contract.
- [ ] Choose `GadDev/healthtech-evidence-api` name or record alternative (not yet created).
- [ ] Draw route wireframe and choose fixture-first React island integration.
- [ ] Decide exact `?doi` / `?pmid` parser and invalid-identifier UI fallback.
- [ ] Open a **draft Pulse docs PR** for review; do not merge.
- [ ] Record local CI commands and baseline before code modification.
- [ ] Keep external API/model/billing disabled until cost and provider review.
