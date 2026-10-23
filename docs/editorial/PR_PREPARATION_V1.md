# HealthTech PR preparation contract

Contract: `healthtech-1.0`. This is the publication handoff from a normalized research ledger to one human-reviewable draft PR. [Editorial policy](../EDITORIAL.md) owns publication decisions; [the orchestrator](ORCHESTRATOR.md) owns the detailed run, ownership and recovery protocol. The [preparation skill](../../.agents/skills/healthtech-ai-pulse-pr-preparation/SKILL.md) executes this handoff; this document does not authorize a scheduler or merge.

## Inputs and readiness

Read the target contracts at the resolved default-branch commit: [schema guide](EDITORIAL_SCHEMA_V1.md), [decision engine](DECISION_ENGINE_V1.md), [topics](TOPICS_V1.yml), [content model](../CONTENT_MODEL.md), [daily issue](../DAILY_ISSUE.md), the applicable skills, validators and CI. Record that actual commit as the contract reference. Missing required contracts or unsupported safe writes block preparation; source-publication files are not a fallback.

Use the full dated ledger as the handoff, including research coverage, selected/watch/rejected decisions, evidence and claim locators, deduplication, verification outcomes and previous attempts. Inspect current source status and relevant merged/unmerged publication history. Research selection alone is not permission to publish.

## Batch identity and safe writes

| Item       | Target identity                                       |
| ---------- | ----------------------------------------------------- |
| Repository | `GadDev/healthtech-ai-pulse`                          |
| Branch     | `content/healthtech-ai-pulse-YYYY-MM-DD`              |
| PR title   | `content: prepare HealthTech AI Pulse for YYYY-MM-DD` |
| Ledger     | `docs/editorial/ledgers/YYYY-MM-DD.json`              |
| Base       | Resolved current default branch                       |
| PR state   | Draft, including after green CI                       |

Before creating anything, inspect the branch, all PR states and the finalized default-branch ledger. Reuse an existing eligible draft. A merged/finalized date is a no-op; a closed-unmerged canonical PR or conflicting matches requires maintainer direction. After a create timeout, re-query before retrying.

Acquire and renew the implemented run lease. Commit against the expected parent and use non-forced compare-and-swap ref updates. On ownership/head changes, stop writes and preserve human edits. Persist the research checkpoint before publication work and all related artifacts atomically. Use binary-safe Git operations for assets. Follow the orchestrator for lease duration, takeover, checkpoint and exception semantics.

An editorial run may change its dated ledger, surviving story/issue files and declared assets/reviews. It must not change policy, schema, application code, CI, cloud configuration or research decisions to make a batch pass.

## Prepare the publication

1. Reverify selected claims against inspected primary evidence, corrections/retractions, contradictions and publication-time duplicates. Record the actual reviewer/time and supported scope.
2. Draft only surviving selected records. Keep later conflicts or inaccessible evidence as downstream withholding; do not erase the research selection. Account for every selected record exactly once as drafted or withheld.
3. Finalize canonical English article bytes, evidence metadata, source mappings and any declared image paths. For new editions from 2026-10-22, an accepted image is mandatory; `mode: none` withholds the article, not a fallback. Generated imagery must follow [the illustration system](ILLUSTRATION_SYSTEM_V1.md) and target skill: explore three written concepts before new generation, choose one and review both medical implications and editorial quality. Failed or missing imagery withholds the affected story.
4. Create the [daily issue](../DAILY_ISSUE.md) only when at least one story survives. Otherwise finalize ledger-only with no issue, story IDs or MUST KNOW. Do not manufacture output to fill capacity.
5. Keep explicitly requested French translation packages outside public collections until a runtime locale contract exists. Do not add translation or recurring work implicitly.
6. Persist final mappings, withholding reasons, checks and attempt outcomes before the PR handoff. Opening a draft is not approval.

## Validation and PR evidence

Run the target commands on the actual batch/revision:

```bash
npm run editorial:check -- docs/editorial/ledgers/YYYY-MM-DD.json
npm run illustration:check -- docs/editorial/ledgers/YYYY-MM-DD.json
npm run verify
npm run test:e2e
```

Report passed, failed and not-run checks honestly. Unavailable local execution can use the draft's CI for executable checks; it cannot waive source, evidence or deduplication gates. A valid ledger-only recovery PR may expose source failures. An unsafe/invalid ledger blocks a new publication PR.

Include in the PR body: editorial date and contract ref; batch mode; research window and coverage gaps; selected/drafted/withheld/watch/rejected counts; per-story evidence/access/clinical-utility boundaries and source locators; score and material delta; issue/image/review/locale mappings; MUST KNOW rationale or none; actual overrides; exact-revision checks, unresolved blockers and recovery evidence.

For each generated image, include the concept selection (or unchanged-input reuse), actual candidate count and rejected-attempt reasons, compared recent story IDs or unavailable comparisons, and pass/fail reasons for specificity, meaning, thumbnail/crop clarity and variety. Bind this evidence to story ID and accepted asset SHA-256. Report not-run review honestly and withhold imagery without a completed pass. CI validates the stored contract, not these editorial judgments.

Inspect CI for the latest PR head and tested merge revision. Both `Verify project` and `Browser smoke and accessibility` must pass before reporting executable validation complete. Missing, pending, cancelled, stale or failed runs are not a pass. Keep the PR draft, make bounded repairs on the same branch and report the orchestrator's actual operational outcome. Human review, merge and production deployment are separate steps.

Adapted from `GadDev/daily-ai-pulse/docs/editorial/PR_PREPARATION_V1.md` at `6269d2b7dbc01046cfcdaf7f204b8b6b14de9e64`, using the target's evidence, ownership and optional-asset contracts.

## Artwork evidence and recovery

Before publication drafting, checkpoint runtime capabilities and per-story stages in the existing ledger.artwork extension; follow ILLUSTRATION_SYSTEM_V1.md. Final preparation requires uploaded, reviewed WebP bytes with a matching strict review/brief and committed read-back evidence. Resume the same branch/PR at the unfinished stage; do not regenerate valid outputs to repair upload. Preserve historical records. New briefs bind constitution, skill, renderer/CSS and supplied references; new reviews record brief_path. CI checks integrity and progress, not aesthetic/scientific truth.
