# HealthTech candidate ledgers

Store each daily research/publication record at `docs/editorial/ledgers/YYYY-MM-DD.json`; its filename must equal `editorial_date`. The ledger preserves decisions that public articles cannot show: selection, watch/rejection, deduplication, evidence, downstream withholding, attempts and recovery state.

Read [the editorial policy](../../EDITORIAL.md), [content model](../../CONTENT_MODEL.md), [daily issue contract](../../DAILY_ISSUE.md), [schema guide](../EDITORIAL_SCHEMA_V1.md) and [machine schema](../ledger.schema.json), [topics](../TOPICS_V1.yml) and [orchestrator](../ORCHESTRATOR.md). These target contracts define the fields; do not copy the source publication's example ledger or scoring rubric.

## Preserve research and publication separately

- `candidates` contains selected records, `watchlist` contains watch records and `exclusions` contains rejected records. IDs are disjoint.
- A selected candidate that fails publication verification stays selected in research history. Record its downstream reason in `publication.withheld_selected`.
- Every selected record must map exactly once to a surviving story or explicit withholding. Watch/rejected records cannot enter a publication implicitly.
- No surviving stories means `publication.mode: ledger-only`, empty story IDs, no issue and no artificial MUST KNOW or artwork. A valid ledger-only day is useful output.
- Preserve missing-source observations and coverage gaps. A complete-looking JSON record is not proof of scientific correctness or comprehensive research.

## Write and recover safely

Persist research before drafting; use `publication.mode: in-progress` for checkpoints. An unfinished checkpoint can support recovery but cannot pass final publication validation. Acquire ownership and update the canonical date branch through the implemented create-only/compare-and-swap protocol; preserve human edits and prior attempts.

Reuse the existing date branch and draft PR after interruption. Inspect all PR states and the default-branch ledger before creating anything. If that date is already finalized on main, the ordinary daily run is a no-op. A closed-unmerged canonical PR requires maintainer direction, not a duplicate PR.

Merged ledgers are editorial history. Corrections require an explicit reviewed amendment that preserves prior decisions and explains what changed. Never rewrite history to conceal an unavailable source, a failed check or a withdrawn claim. Historical research/source snapshots retain their actual contract commit and observation times.

## Keep trials separate

Controlled source-inspection trials belong under `docs/editorial/trials/` with `kind: controlled-trial`; they cannot map into live stories. Synthetic fixtures belong in tests or isolated temporary directories. Do not import Daily AI Pulse's historical ledgers, retrospective backfills or review evidence into this directory.

## Validate the actual batch

```bash
npm run editorial:check -- docs/editorial/ledgers/YYYY-MM-DD.json
npm run illustration:check -- docs/editorial/ledgers/YYYY-MM-DD.json
npm run verify
```

Use the real dated file. Validators also inspect other dated ledgers so an older invalid batch cannot hide behind the newest one. PR CI and human editorial review remain separate gates; this directory does not launch research or authorize publication.

Adapted from the ledger guidance in `GadDev/daily-ai-pulse` at `6269d2b7dbc01046cfcdaf7f204b8b6b14de9e64`, using HealthTech's implemented `healthtech-1.0` contracts.
