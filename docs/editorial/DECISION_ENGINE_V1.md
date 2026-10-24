# HealthTech editorial decision engine

Contract: `healthtech-1.0`. Apply this operational decision sequence under [the normative editorial policy](../EDITORIAL.md). The [schema guide](EDITORIAL_SCHEMA_V1.md) describes storage; `scripts/lib/editorial.ts` and the shared Zod schemas enforce structural and cross-file gates. Neither this workflow nor a score establishes scientific truth.

## Decide the development, then verify publication

1. Identify the underlying development and actual event/source dates. Inspect relevant primary evidence, not only headlines, abstracts or search snippets. Record access and research coverage limits.
2. Apply healthcare scope and audience fit. Assign one primary desk and controlled [topics](TOPICS_V1.yml); there is no desk quota. A non-AI story must satisfy the explicit exception in editorial policy.
3. Deduplicate against merged and relevant unmerged ledgers/stories, source URLs and underlying DOI/PMID, preprint, trial, cohort, product/version and regulatory identities. Preserve URL parameters that distinguish records.
4. Classify novelty as new, material update, repeat or uncertain. A material update needs previous IDs and a specific substantive delta; a renamed headline, syndication or unchanged journal publication is not sufficient.
5. Extract bounded claims, evidence dimensions and limitations. Score the actual supported claim, not a stronger marketing headline.
6. Record selected, watch or rejected research decisions. Later publication verification is a separate gate and may withhold a selected item without rewriting its research history.

Use the [bounded discovery plan](DISCOVERY_V1.md) for source lanes, query expansion,
retrieval limits and cutoff semantics. Separate incomplete inspection from low
editorial value. Use candidate-specific scoring rationales; a watch record may
have a null score while essential inspection is unfinished, with explicit
promotion conditions and a review date. Do not substitute identical default scores
for independent appraisal. Existing selected thresholds remain unchanged.

## Score and gate

The policy owns the rubric and worked examples. Its current implemented score fields are:

| Dimension                  | Ledger field                      | Weight |
| -------------------------- | --------------------------------- | ------ |
| Practical significance (S) | `editorial_score.significance`    | 30%    |
| Claim support (E)          | `editorial_score.claim_support`   | 30%    |
| Audience relevance (R)     | `editorial_score.relevance`       | 25%    |
| Material change (M)        | `editorial_score.material_change` | 10%    |
| Durability (D)             | `editorial_score.durability`      | 5%     |

Use integer inputs 0–4 with written rationales. `weightedScore` in `src/lib/editorial-schema.ts` computes a 0–100 total, rounded to one decimal: `25 × (0.30S + 0.30E + 0.25R + 0.10M + 0.05D)`. The validator recomputes it; a total is neither a probability nor a medical recommendation.

| Decision | Current policy boundary                                                                                               | Stored record                                                                      |
| -------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| Selected | Total at least 75, S/E/R at least 2, M at least 1, and all applicable scope/evidence/novelty gates clear              | `candidates`, `decision: selected`                                                 |
| Watch    | Normally 55–74.9, or unresolved evidence/novelty even with a higher score                                             | `watchlist`, `decision: watch`, concrete promotion conditions and next review date |
| Rejected | Out of scope, duplicate without a material delta, unsupported claim or inadequate value; lower scores normally reject | `exclusions`, `decision: rejected`, explicit reason                                |

A high score cannot repair a failed hard gate. An official decision may strongly support its exact regulatory status; it does not establish effectiveness. Availability evidence does not establish patient benefit. Study design, independence, access and demonstrated clinical utility remain separate evidence dimensions.

Use only the implemented story formats `pulse`, `briefing` and `deep-dive`, with depth `general` or `specialist`. Do not copy the source publication's engineering depth labels or unsupported formats.

## Publication gate and capacity

The separately authorised [24 October evening exception](EVENING_EDITION_2026_10_24.md)
allows an independent second ledger on that date only. Its two-story capacity is
separate from the immutable ordinary edition; all decisions and evidence gates
remain identical, and deduplication includes both editions. Do not infer a standing
second-edition allowance from this exception.

Recheck source status, contradictions and duplicate coverage during preparation. Publishable claims require actual inspections and `verified` or `verified-with-claim-scope` outcomes, with the reviewer, time and supported wording recorded. A source-unavailable/conflicting selected record remains in research history and is withheld downstream. Patient-benefit claims require demonstrated clinical utility in the studied setting; regulatory claims require the inspected official record and exact jurisdiction/status.

The pilot prepares at most two surviving articles per research date. Preserve selected overflow as capacity withholding, not a silent rejection. With no survivors, finalize ledger-only and omit the issue and artwork. [PR preparation](PR_PREPARATION_V1.md) accounts for every selected item and reports checks without granting publication approval.

## MUST KNOW and changes

At most one MUST KNOW per edition: total at least 90, S=4, E at least 3, an explicit consequential reason and no unresolved central uncertainty. It must be a surviving published mapping. It is optional and distinct from featured placement; if withheld, do not automatically promote a replacement.

Human overrides record the actual actor, timestamp, reason, previous state and scope. They never authorize invented evidence or bypass publication gates. Promote prior watch items through an auditable selected record linked to their history. Preserve merged ledgers; corrections use reviewed amendments rather than concealed rewrites.

Adapted from `GadDev/daily-ai-pulse/docs/editorial/DECISION_ENGINE_V1.md` at `6269d2b7dbc01046cfcdaf7f204b8b6b14de9e64`. Healthcare decisions, weights and implemented formats remain those of the target policy/schema.
