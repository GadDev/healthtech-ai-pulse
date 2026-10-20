# HealthTech AI Pulse — Delivery roadmap

Status observed on 20 October 2026: the publication foundation, healthcare evidence
contracts, browser CI and dedicated Hosting deployment are implemented. The
existing editorial task is paused. This file separates completed implementation
from remaining operational acceptance; it does not activate the task.

## Implemented baseline

- Static Astro publication: five desks, English articles, issue archive, search,
  RSS, evidence cards, methodology and corrections/contact information.
- Shared schemas and validators for decisions, claim-specific evidence, source
  mappings, deduplication, withholding, issue references and optional imagery.
- Canonical dated branch/PR identity, ownership/checkpoint state machine and
  synthetic recovery/concurrency tests. These do not prove live concurrent writes.
- Real publication preparation and human merges: [PR #15](https://github.com/GadDev/healthtech-ai-pulse/pull/15),
  [#21](https://github.com/GadDev/healthtech-ai-pulse/pull/21) and
  [#22](https://github.com/GadDev/healthtech-ai-pulse/pull/22).
- Both required PR CI jobs passed for [run 39319118714](https://github.com/GadDev/healthtech-ai-pulse/actions/runs/39319118714),
  PR #22 head `73ca7b0eed2f295f35f438a4accca804cb9b4697`.
- [Production run 39320066987](https://github.com/GadDev/healthtech-ai-pulse/actions/runs/39320066987)
  deployed main `280f07d9709d32ce7b0d200875eb4418fe158a41`, including OIDC,
  Hosting deployment and endpoint checks. Preview and cleanup workflows also exist.

These are historical execution observations, not validation of every future head.
The [18 October trial](editorial/trials/orchestration-2026-10-18.md) records initial
limitations; its old setup blockers are not the current task/deployment status.

## Current improvement batch

Adopt the [bounded discovery plan](editorial/DISCOVERY_V1.md): five source lanes,
expanded workflow vocabulary, deliberate negative-evidence search, European
language rotation and explicit retrieval/screening limits. Distinguish completed
bounded research from unfinished coverage without rewriting historical cutoffs.

Use individual scoring rationales, with a null watch score when appraisal remains
unfinished. Preserve the current 75-point threshold, five desks, two surviving
stories per date and human merge. Make edition-date semantics and stored evidence
warnings visible to readers. Keep imagery instructions under the visual contracts.

The source catalogue and detailed operating procedure belong in the repository;
[task-configuration.json](editorial/task-configuration.json) records the compact
bootstrap installed on the existing task on 20 October 2026 while paused.
Merge this PR and complete live readiness checks before enabling that same task.
Never create a duplicate task to apply it.

## Remaining acceptance

| Area                  | Evidence still needed                                                                                                                   |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Recurring operation   | One authorized scheduled run with its actual window, ledger or actionable blocker, single draft PR and latest-head CI evidence          |
| Safe live writes      | A documented stale-head rejection/write-read-back trial using the actual bound adapter; simulator passes alone are insufficient         |
| Recovery              | An observed interrupted-run recovery on the same canonical branch/PR without lost human edits or duplicate output                       |
| Rollback              | A recorded known-good Hosting release restoration and affected-route checks, followed by Git reconciliation                             |
| Editorial calibration | Matched seven-day discovery comparison, accepted usefulness, actual review minutes and scientific error assessment                      |
| Historical scope      | Account for the requested 11 October backfill; no source-grounded ledger for that date was found in the inspected archive/PR collection |

The maintainer remains responsible for assessing central evidence, specialist
questions, source freshness, images and exact-revision checks before merge, and
for inspecting deployment/corrections afterward. Model review is not independent
clinical validation.

## Pilot measures and decisions

Measure the first ten research runs, including failed/blocked runs:

- Every published central claim has inspected evidence and a locator; study
  stories identify design/access/utility. Count material title, denominator,
  causal, regulatory and independence errors; target zero unsupported claims.
- Record useful investigate/evaluate/watch/reconsider consequences and feedback
  from representative readers. Reader feedback is not clinical validation.
- Count duplicate branches/PRs and repeated developments without material deltas;
  target zero. Report actual exact-revision checks rather than inferred passes.
- Every run produces a durable ledger or an explicit actionable blocker. A
  no-publication day is valid; a quiet output is not proof of comprehensive search.
- Measure hands-on review minutes: target median ≤20 minutes per publication
  batch and routine maintenance ≤60 minutes/week, excluding initial implementation.
  Record actual image attempts and incremental costs/limits.

Run the read-only seven-day experiment in DISCOVERY_V1.md before relaxing selection
or expanding capacity. If effort exceeds budget, reduce output through an explicit
reviewed policy/task change. No automatic threshold, capacity or cadence change.

Defer French publication, newsletters, paid feeds, new permanent desks and a more
complex agent architecture until measured reader value and operational effort
justify them. No patient-data backend or autonomous publication is planned.
