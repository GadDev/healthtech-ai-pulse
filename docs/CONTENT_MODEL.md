# Content and evidence contracts

Version: healthtech-1.0. [EDITORIAL.md](../EDITORIAL.md) owns editorial policy. This file documents the implemented storage and validation boundaries.

## One shared schema

`src/lib/editorial-schema.mjs` defines strict Zod schemas for ledgers, candidate records, claims, evidence summaries, stories and image reviews. Astro uses the same story schema as executable editorial validation. `npm run schema:generate` derives `docs/editorial/ledger.schema.json`; `npm run schema:check` prevents drift. The JSON schema checks structure; executable checks add scoring, selection, cross-file and publication rules. Neither establishes scientific truth.

`docs/editorial/topics.yml` owns the controlled topics. Desk IDs are defined once in the shared schema and checked against the vocabulary. Stories use exactly one primary desk and controlled tags. No historical source-publication content is imported.

## Files and identity

| Path                                                   | Meaning                                                               |
| ------------------------------------------------------ | --------------------------------------------------------------------- |
| `docs/editorial/ledgers/YYYY-MM-DD.json`               | Final or in-progress daily research and publication record            |
| `docs/editorial/trials/YYYY-MM-DD.json`                | Explicit controlled trial; cannot map into live stories               |
| `src/content/stories/YYYY-MM-DD-slug.md`               | Canonical English article, bijectively mapped to a selected candidate |
| `src/content/pulse/YYYY-MM-DD.md`                      | Ordered references to surviving stories; no empty issue               |
| `public/images/stories/<story-id>.webp`                | Generated editorial image when declared                               |
| `docs/editorial/illustrations/reviews/<story-id>.json` | Exact-source asset identity, integrity and review                     |

`contract_ref` is a real 40-character Git commit. A controlled local trial may reference its real local foundation commit; it is not proof the contracts exist on remote main. Automated publication must resolve and read current target default-branch contracts before a daily run. `kind: controlled-trial` prevents a test source inspection from being presented as a completed daily edition.

The ledger envelope contains editorial date/timezone, contract versions/ref, research window/queries/gaps, disjoint selected/watch/rejected arrays, publication state, attempts, active run ownership and human overrides. Source dates and event dates can be null with reasons. Actual timestamps come from the runtime clock. A synthetic test timestamp belongs only in isolated test fixtures.

## Claim-specific fields

Every candidate identifies its underlying event and available DOI/PMID, preprint, trial, cohort, product/version and regulatory record. Sources carry canonical URLs, source type, role, sponsor relationship, publication date/reason, actual inspection time and access level. Watch records require a promotion condition and review date. Rejected records may omit detailed study extraction and scoring when a clear rejection gate is decisive.

Selected records require score inputs/rationales, format/depth, evidence summary and nonempty claims. Evidence separately records publication status, design, validation setting, independence, clinical utility, access, limitations/applicability, funding/COI, corrections/retractions and contradictions. The rendered evidence card is compared against the ledger rather than independently assigned a stronger label.

Claims carry supported wording, source IDs, locators, evidence scope, limitations and verification. Conditional payloads are:

- `model-performance`, `workflow`, `patient-benefit`, `patient-outcome`, `pharma-progress`: study design/setting, population/dataset, sample counts with units/reasons, comparator, primary and exploratory endpoints, results with scale/units/uncertainty and source locator, follow-up, harms and applicability. A positive patient-benefit claim requires demonstrated utility in the studied setting. Negative or uncertain patient outcomes remain eligible under patient-outcome with appropriate evidence.
- `regulatory`: authority, jurisdiction, official record ID/source, exact status, product/version, intended use/population, decision/publication/effective dates with reasons for unknown dates, and restrictions.
- `availability`: artifact source, version, intended users, access, license and limitations. Availability evidence does not establish effectiveness.
- `safety`: report type, exposure denominator or explicit unknown, causality limitations and duplicate assessment. This is not an incidence estimator.

Explicit unknown, unavailable and not-applicable statements must explain what is missing. A populated string is not an automated assessment of its scientific adequacy; the editor still verifies the source and claim scope.

## Publication rules

Research selection and downstream verification are separate. Final ledgers account for every selected item as drafted or withheld. Published mappings require verified or verified-with-claim-scope outcomes, actual inspection/reviewer timestamps, cleared duplicate checks and inspected relevant evidence. Claims in conflict or source-unavailable state are withheld without rewriting the research decision. No watch/rejected item can enter story mappings; a human promotion creates an auditable selected record with prior decision/override references.

Scores are recomputed from 0–4 inputs at 30/30/25/10/5 weights. Selection thresholds and MUST KNOW criteria follow EDITORIAL.md. Matching underlying IDs or primary URLs across published daily ledgers requires an explicit material-update delta and linked prior story. Machine checks cannot determine whether the claimed delta is substantively adequate; human/source verification remains necessary. Unmerged remote ledgers and archive access must also be inspected by orchestration before publication.

Zero selected, or every selected item withheld, means `publication.mode: ledger-only`, no story IDs, no issue path and no MUST KNOW. In-progress checkpoints can be persisted for recovery but cannot pass final `verify`. A final ledger-only record may truthfully retain source conflicts or failures. Explicit validator paths must exist, and all dated ledgers are checked so an older invalid batch cannot hide behind a newer valid one.

Article `draft` defaults to true. Public routes use non-draft stories only; issue references reject missing/private stories. A prepared publication PR may contain `draft: false` article metadata, but remains a draft GitHub PR and does not deploy before human merge. Source mappings, evidence, category, tags, claim IDs, type and depth must agree with its selected candidate. Issues contain unique nonempty sections and exactly the batch's surviving references; featured and MUST KNOW are optional and distinct.

## Optional imagery and translations

`illustration.mode: none` is valid and renders a text-led article. Generated mode requires an asset, alt text and a review path. The separate review stores the exact final article SHA-256, brief/policy hashes, generator/candidate count, generation key, actual WebP hash, crop and truthful reviewer/type/time. No hash is stored inside the source file it hashes. Identity uses SHA-256 of the JSON array `[story_id, story_source_sha256, brief_sha256, policy_sha256, version, candidate_count, generator, model_snapshot]`. The policy hash covers exact EDITORIAL.md bytes; policy/source changes require review/reuse reassessment. Do not invent an unavailable model snapshot.

Validation checks WebP header, byte hash, source/policy identity, review schema and generation key. The human/model visual review must separately assess crop and unsupported medical implications. Binary-safe Git operations are mandatory. A missing declared generated asset fails validation; it is not silently changed to none.

English is the sole required locale. The repository includes `healthtech-ai-pulse-translate-fr` for explicitly requested, source-matched French translation packages under `docs/editorial/translations/fr/`. Its reviewed article and companion report remain outside public content; a successful linguistic review is not clinical validation. No French collection, route, runtime translation schema or stale-copy suppression is implemented. No placeholders or historical translation approvals are imported.

## Controlled trial and validation coverage

The 18 October 2026 trial inspects an actual EMA landing page, rejects its old reflection paper as current news, records access/coverage limitations and produces no public article or issue. It is not a comprehensive research run, clinical study review, human editorial approval or scheduled trial.

Synthetic positive and negative fixtures live under `tests/` and temporary test directories, never live collections. Tests cover schema requirements, score arithmetic, source access, withholding, watch/exclusion leakage, empty batches, story/ledger drift, duplicate developments and declared missing imagery. Required browser checks remain separate; passing build/unit checks must not be reported as completed visual/accessibility review.
