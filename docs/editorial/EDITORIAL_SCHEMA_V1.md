# HealthTech editorial schema guide

Contract: `healthtech-1.0`. This is the human-readable map of the implemented ledger, evidence and publication records. [Editorial policy](../EDITORIAL.md) owns editorial meaning; [the decision engine](DECISION_ENGINE_V1.md) explains classification. The executable source is `src/lib/editorial-schema.ts`; [ledger.schema.json](ledger.schema.json) is generated from it. Do not maintain a second schema in this document.

## Ledger envelope

Compatible identity extension `evening-1` adds optional `edition: evening` and
`edition_authorization` for only the
[authorised 24 October supplement](EVENING_EDITION_2026_10_24.md). Its filename is
`2026-10-24-evening.json`; story/issue frontmatter must carry the same `edition`.
Absent fields retain all historical schema and mapping behavior. This exception
does not change candidate scoring, evidence, artwork or capacity gates.

| Fields                                      | Responsibility                                                                                                         |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `schema_version`, `decision_engine_version` | Target contract version `healthtech-1.0`                                                                               |
| `editorial_date`, `timezone`                | Dated batch identity; timezone is `Europe/Luxembourg`                                                                  |
| `contract_ref`                              | Actual 40-character target Git commit containing the contracts used                                                    |
| `kind`                                      | `daily` or isolated `controlled-trial`                                                                                 |
| `research`                                  | Window/cutoff, queries, actual access observations, coverage gaps and completion                                       |
| `candidates`, `watchlist`, `exclusions`     | Disjoint selected/watch/rejected records                                                                               |
| `publication`                               | `in-progress`, `publication` or `ledger-only`; surviving IDs, withholding, issue and MUST KNOW mappings, actual checks |
| `attempts`                                  | Preserved run/phase/outcome records with actual timestamps                                                             |
| `active_run`                                | Current lease owner/acquisition/heartbeat/expiry, or null                                                              |
| `human_overrides`                           | Explicit actor/time/reason/scope and prior state; no anonymous approvals                                               |

The filename must equal `editorial_date`. Final records account for every selected ID exactly once as drafted or withheld. In-progress checkpoints support recovery but cannot pass final publication validation. Ledger-only has no surviving stories, issue or MUST KNOW. Controlled trials cannot map into live articles. See [ledger lifecycle guidance](ledgers/README.md).

## Candidate and source identity

Each candidate records its dated ID, research decision, title, desk/topics/entities, event/source/discovery dates and precision reasons, what changed, why now, scope fit, deduplication, source portfolio and underlying development identity. Selected records require score inputs/rationales, implemented format/depth, evidence and claims. Watch records need promotion conditions and a review date; `editorial_score: null` is permitted when essential source or methods inspection is unfinished. Do not assign a low numeric score to unfinished research merely to make the record look assessed. Rejected records may omit detailed study extraction when a decisive rejection gate is already documented.

Use one of the five healthcare desks and controlled topic IDs from [TOPICS_V1.yml](TOPICS_V1.yml). Do not substitute source-publication categories or classify a development as several stories because it spans desks.

Underlying identity includes available DOI/PMID, preprint, trial, cohort, product/version and regulatory records. Sources have stable IDs, canonical URLs, publisher/type/role, sponsor relationship, publication-date precision, actual inspection time and access level. Missing dates stay null with reasons; an unavailable source is not an inspected source.

## Evidence and claims

Evidence stores publication status, study design, validation setting, independent validation, clinical utility, access, limitations/applicability, funding/COI, corrections/retractions and contradictions. These dimensions cannot be collapsed into a scalar evidence badge or inferred from prestige.

Every claim has supported wording, source IDs, exact locators, evidence scope, limitations and verification. The conditional payloads are:

| Claim type                                                                               | Required interpretation                                                                                                                                                |
| ---------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `model-performance`, `workflow`, `patient-benefit`, `patient-outcome`, `pharma-progress` | Study/setting, population/dataset and units, sample sizes, comparator/endpoints, results with scale/uncertainty and source locator, follow-up, harms and applicability |
| `regulatory`                                                                             | Issuing authority/jurisdiction, official record/source, exact status, product/version, intended use/population, dates and restrictions                                 |
| `availability`                                                                           | Actual artifact source/version, intended users, access, license and limitations                                                                                        |
| `safety`                                                                                 | Report type, exposure denominator or explicit unknown, causal limits and duplicate assessment                                                                          |

Keep explicit unknown/not-reported/unavailable/not-applicable statements with reasons. A positive patient-benefit claim requires `demonstrated-in-studied-setting`; model accuracy alone cannot satisfy it. Negative or uncertain patient outcomes remain distinct from benefit claims. Regulatory source IDs must point to the inspected official record; safety reports alone do not establish incidence or causality.

Research decisions and later `publication_verification` remain separate. Verification states are `not-started`, `verified`, `verified-with-claim-scope`, `conflict` and `source-unavailable`, with actual reviewer/time and supported scope. A populated record is not proof of scientific adequacy or independent review.

## Cross-file publication mappings

Canonical stories use the shared strict story schema and reference their candidate/date/version, desk/topics, claims, evidence and primary sources. Public stories are non-draft; a draft GitHub PR is a separate review state. Story/ledger metadata must agree. Repeated underlying developments need an explicit material delta and prior references.

[Daily issues](../DAILY_ISSUE.md) contain only the surviving story IDs, in declared order, with optional featured and MUST KNOW references. No issue exists for an all-withheld or zero-selected day. [PR preparation](PR_PREPARATION_V1.md) owns the artifact handoff and exact-revision check report.

Generated imagery uses the strict `healthtech-1.0` review and [illustration system](ILLUSTRATION_SYSTEM_V1.md); `mode: none` remains in the parsing schema for historical stories only; publication validation rejects it for editions from 2026-10-22. Each new public story needs a reviewed generated image or must be withheld. English is required. Optional reviewed French packages remain outside public collections until a runtime locale schema and publication integration exist.

## Generation and checks

```bash
npm run schema:generate
npm run schema:check
npm run editorial:check -- docs/editorial/ledgers/YYYY-MM-DD.json
npm run illustration:check -- docs/editorial/ledgers/YYYY-MM-DD.json
npm run verify
```

Generate JSON schema only after an authorized shared-schema change; CI checks for drift. Executable validation adds arithmetic, decision/verification gates, duplicate and cross-file mappings beyond JSON shape. Source interpretation, medical relevance, visual review and actual human approval remain separate from deterministic checks. Never weaken a schema to make an editorial batch green.

Adapted from `GadDev/daily-ai-pulse/docs/editorial/EDITORIAL_SCHEMA_V1.md` at `6269d2b7dbc01046cfcdaf7f204b8b6b14de9e64`, describing the target's implemented healthcare contracts rather than the source's engineering fields.
