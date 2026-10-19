# HealthTech AI Pulse — Delivery roadmap

Status: implementation prepared for three stacked draft PRs. GitHub app access was verified on 19 October 2026. Bootstrap, evidence contracts/cards and orchestration/deployment configuration are implemented; default-branch adoption and hosted/browser/scheduled acceptance remain incomplete. Dependencies are sequential; dates are not promises. One maintainer owns technical acceptance and editorial approval.

## MVP boundary

A public static publication with home, five desk views, canonical English articles, daily issue archive, search, RSS, methodology and corrections/contact information. Evidence cards and claim-scoped sourcing are required. Daily research produces zero to two drafted stories and a full durable ledger, followed by one draft PR and human merge. Empty days need only the ledger. Images may explicitly be absent; generated images must pass the target review contract. No login, patient data, newsletter delivery, paid feeds, French publication, shared package or autonomous merge.

## PR 1 — Adopt the foundation and bootstrap a clean publication

Suggested title: `feat: bootstrap HealthTech AI Pulse publication foundations`.

Adopt CONSTITUTION.md, ROADMAP.md, TECHSTACK.md and EDITORIAL.md after maintainer review. Port the minimal Astro shell, typography, routing, search, RSS, sitemap, license notices and toolchain from the pinned source revision. Replace branding, metadata, icons, contact/repository links and eight engineering categories. Remove copied stories, issues, assets, ledgers, review records, subscribers/forms, preview deployments and source cloud identities. Ensure empty collections render meaningful empty states and build without placeholder stories. Do not make any target deployment use source defaults.

Keep one README navigation page instead of copying the reference's large docs collection. Keep the implementation-specific content model in docs/CONTENT_MODEL.md. Record copied files and source commit in TECHSTACK.md. Dormant translation code is optional; retain only if it is cheap to test and invisible until activated.

Acceptance: clean npm ci; lint/format/Astro/static-build checks; empty home/category/archive/search work; metadata and links name the target; no source publication domains or Firebase project/service account IDs remain in deployable files; fixture content excluded from public collections. Add pull_request CI for these checks, initially without privileged deployment. Changing the target main branch to add the initial skeleton is implementation work for this PR, not this assessment.

Boundary: no production deployment, real editorial batch, scheduler or healthcare schema claims without PR 2. If initial repository setup requires a seed commit before a PR can be opened, the maintainer explicitly performs or authorises that implementation step.

## PR 2 — Implement healthcare evidence contracts and publication gates

Suggested title: `feat: validate claim-scoped healthcare editorial evidence`.

Implement docs/editorial/ledger.schema.json and docs/editorial/TOPICS_V1.yml; update src/content.config.ts, docs/CONTENT_MODEL.md and content/evidence-card rendering. Implement selected/watch/rejected shapes, claim locators, research versus publication state, conditional evidence fields, strict unknown-field handling and explicit unknown/not-applicable values. Align categories and topic IDs everywhere. Implement optional imagery, optional MUST KNOW and consistent issue references. Keep one normative editorial policy; do not copy source decision-engine prose alongside it.

Implement editorial:check, illustration:check and verify. Validate all changed dated ledgers and their story/issue/assets relations. No success-by-skipping when a dated batch is present. Add fixtures outside publication collections and regressions for correct and invalid clinical studies, regulatory records, announcements, unavailable evidence, duplicate trials/cohorts, missing images, empty/all-withheld editions, human overrides and unknown dates. Schema checks do not certify scientific validity.

Run one controlled manual batch on a fixed editorial date, using at most two real selected stories: ideally one study with inspectable methods and one official regulatory/implementation development. If no suitable candidates exist, use fewer or none; never invent clinical data for the pilot. Include watch and rejection examples only when actually encountered. Use an explicitly separate fixture suite for synthetic edge cases. Persist queries, evidence extraction, source access, claim limits and decisions. The maintainer verifies all central claims and records actual review on the exact PR revision.

Acceptance: executable checks fail on missing relevant evidence and leaks, pass on valid ledger-only cases, render understandable evidence cards at 320/375/960/1280, and demonstrate exact-source correction handling. Controlled real batch reviewed; no false claim of independent clinical validation. Browser tests and manual keyboard/reading checks complete. Translation is not a blocker because English is the sole required locale.

Boundary: no recurring automation, cloud-identity reuse or automatic publication.

## PR 3 — Add safe orchestration and isolated deployment

Suggested title: `feat: add retry-safe editorial orchestration and target hosting`.

Adopt docs/editorial/ORCHESTRATOR.md and the target PR-preparation and illustration skills. They reference adopted policy rather than copying independent rules. Implement target-specific asset identity/review and optional-image behavior; no legacy review exemptions. Add durable run ownership, compare-and-swap commits, heartbeat/expiry, append-only attempts, partial recovery and idempotent all-state PR lookup. Document the actual write adapter: git or non-forced Git object/ref operations; prove that it rejects concurrent stale writes and uploads binary assets unchanged.

Create a dedicated Firebase project/site and target-scoped WIF trust and deployment identity after infrastructure authorisation. Remove all source hard-coded guards and replace with target guards. Configure production verification/deploy/smoke and rollback instructions in TECHSTACK.md. Add previews only if their setup fits this PR; otherwise defer them. Require checks and human review with available repository rules. Verify deployment against the exact merged target commit; a source-site green run is not evidence for target readiness.

Acceptance: successful GitHub read, draft-write trial and CI inspection; source browsing; local execution or CI-only execution path honestly demonstrated; zero-selected, all-withheld, missing optional/required asset, source-change, lost ownership, interrupted commit, PR-create timeout, pending/failed CI and already-merged rerun behavior. No duplicate branch/PR, main write or automatic merge. Binary hashes match when generated assets are used. Hosting smoke and rollback drill recorded. Preserve the original Daily AI Pulse automation unchanged.

After these prerequisites pass, privately recheck existing tasks for duplicate target name/repository. Create exactly one separate HealthTech task using the complete reviewed instructions and Europe/Luxembourg timezone. Proposed daily window: around 09:00 local, flexible within one hour. The exact time is a recommended default, not inherited source timing. Verify the returned task ID, timezone, enabled state and schedule. If a prerequisite fails, leave it uncreated and retain the full configuration with the blocker. Creation is not proof of a successful run.

## Pilot and launch gates

Run one authorised end-to-end scheduled trial, then ten daily research runs with manual review. Daily research is retained; publication is conditional on review capacity. If median maintenance exceeds the budget below, reduce draft capacity to one and consider three research runs per week through an explicit task change.

| Readiness  | Evidence required                                                                                                                                        |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Technical  | Target build/browser CI on exact revision; evidence rendering; no source identities; working target hosting and rollback; safe git writes                |
| Editorial  | Reviewed policy; two actual claim extractions when available; title/result fidelity; limitations and COI; correction procedure; named accountable editor |
| Automation | Installed dependencies; app reads; one draft trial and exact-head CI; recovery and concurrency fixtures; no duplicate task; verified schedule/timezone   |

Human responsibilities: assess central evidence and its limitations; resolve contradictions and specialist-review needs; check metadata, image implication and source freshness; inspect exact-head CI; merge only when acceptable; monitor actual deployment; review corrections and pause automation when necessary. Automation may prepare these materials but cannot record approval on the maintainer's behalf.

## Pilot measures and decision

Measure over the first ten runs, reporting numerators and denominators rather than invented coverage claims:

- Evidence: 100% of published material claims have inspected sources and locators; 100% of study stories identify design/access/utility; zero unsupported patient-benefit or regulatory-status claims in the reviewed sample.
- Usefulness: maintainer records a concrete investigate/evaluate/watch/reconsider consequence for every published story; seek feedback from three representative readers, with at least two finding the evidence card useful. Reader feedback is not clinical validation.
- Duplication: zero duplicate publication branches/PRs and zero repeated developments without recorded material deltas; fixture cases pass.
- Reliability: all ten runs produce a durable ledger or an explicit actionable blocker; no false green check reports; no auto-merge; failed runs are included in the denominator.
- Effort/cost: target median human review ≤20 minutes per publication batch and routine maintenance ≤60 minutes per week, excluding initial implementation. Record actual minutes, generated-asset attempts and any incremental cost/limit pressure. If exceeded, cut output before adding more automation.

Launch after the gates are met, not merely after ten dates pass. Defer French, newsletters, custom domain purchases, full-source-library mirroring, extensive illustration competitions and shared platform extraction. Revisit scope only using pilot evidence.
