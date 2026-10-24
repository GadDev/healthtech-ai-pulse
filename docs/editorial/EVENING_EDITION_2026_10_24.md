# One-off evening edition — 24 October 2026

Identity extension: `evening-1`, backwards compatible with `healthtech-1.0`.

## Authority and scope

The maintainer explicitly requested a second edition for 24 October 2026 and
approved a separate draft PR for the required content-model/code support, while
preserving the first edition, the 75-point gate, two stories **per edition**, source
safeguards and mandatory human merge. This authorisation was observed in the
interactive request on 24 October 2026; it is not a recurring-task instruction.
The first edition was merged through PR #60 at
`45f94e7463883353304d1d3c216d8bd9705790f3`.

This is a narrowly authorised exception to the ordinary once-per-date/finalized
stop and daily capacity rules, not a general policy relaxation. No other date,
edition name, extra story allowance, autonomous publication or recurring run is
authorised. Do not edit `EDITORIAL.md` merely to activate the exception: its exact
bytes also bind historical illustration reviews. Existing ledgers, issues,
stories, artwork and review records remain unchanged.

The support PR is an implementation change, not an editorial run or an evening
publication. Human review and merge of this support must precede the separate
evening editorial batch. Resolve the resulting default-branch commit and read its
contracts before research/classification; record that actual `contract_ref`.
Never claim that this document or passing synthetic fixtures means research or
publication has occurred.

## Distinct identity; unchanged evidence gates

Use `editorial_date: 2026-10-24` and optional `edition: evening`. Omitting `edition`
retains the existing ordinary edition identity and every historical path.

| Item                | Ordinary edition, immutable              | Evening supplement                               |
| ------------------- | ---------------------------------------- | ------------------------------------------------ |
| Branch              | `content/healthtech-ai-pulse-2026-10-24` | `content/healthtech-ai-pulse-2026-10-24-evening` |
| Ledger              | `docs/editorial/ledgers/2026-10-24.json` | `docs/editorial/ledgers/2026-10-24-evening.json` |
| Issue               | `src/content/pulse/2026-10-24.md`        | `src/content/pulse/2026-10-24-evening.md`        |
| Route               | `/pulse/2026-10-24/`                     | `/pulse/2026-10-24-evening/`                     |
| Candidate/story IDs | `2026-10-24-<slug>`                      | `2026-10-24-evening-<slug>`                      |

The evening ledger must also have `edition_authorization`, a strict object with
`actor`, `recorded_at` (actual observation time), `reason` and
`scope: 2026-10-24-evening`. Attribute it to the real requesting maintainer and
describe the request; never invent an approval timestamp. This record is separate
from candidate-level `human_overrides`: it does not promote a watch/rejected story.
The ordinary edition cannot carry this exception field. Controlled trials cannot
use it. Both story and issue frontmatter must explicitly carry `edition: evening`.

The code restricts the suffix to this one date and requires a finalized ordinary
ledger first. Each ledger independently retains all selected/watch/rejected,
withholding, five-desk, 75-point, MUST KNOW, two-story, image, English and human
review requirements. Duplicate-development checks span **both** editions and all
other history. Do not republish the morning stories or inflate a pre-existing
result into new evidence. Quiet or all-withheld research still yields ledger-only,
no issue and no invented artwork.

## Ownership and recovery

All adapter calls use the full edition key. `isFinalized('2026-10-24-evening')`
checks the evening ledger/PR, not the merged ordinary edition. The adapter must
also confirm `isFinalized('2026-10-24')` before creating the supplement. Ordinary
runs continue to resolve only `2026-10-24` and stop after that edition is finalized.
Never enable evening automatically because the ordinary edition exists.

Acquire the existing 120-minute lease atomically on the distinct evening branch.
Expected-parent, create-only, non-forced compare-and-swap, closed-PR and
human-ready safeguards remain unchanged. A checkpoint cannot change its date,
edition or authorisation. Evening writes are confined to the evening-prefixed
story/issue/asset/brief/review paths and the evening ledger; they cannot replace
the ordinary issue or ledger. Once evening merges, its rerun also stops.

Search all PR states by the full evening branch, use title
`content: prepare HealthTech AI Pulse for 2026-10-24-evening`, and keep the one PR
draft. Preserve partial research and successful artwork on the same branch/PR.
No schedule, deployment, workflow, credential or auto-merge change is part of this
exception.

## Research, presentation and verification

### Preserve illustration provenance during the renderer migration

The ten already-merged scientific reviews bind exact renderer reference bytes.
Adding optional evening labels and same-day ordering changes three of those files
without changing image geometry, crop CSS, source Markdown or image pixels.
`scripts/lib/preserved-renderer-references.ts` therefore records their **original**
review fingerprints and the exact old-to-new hash pairs for those three renderer
files. It accepts that transition only while the original review, brief, story
source and asset hashes all match. Other reference changes still fail; any later
renderer change or new/changed output requires normal current-reference review.
This preserves provenance instead of rewriting historical briefs or claiming new
visual approval. All evening artwork must bind the new current files normally.

Apply the complete five-lane plan in `DISCOVERY_V1.md`, including the latest valid
completed cutoff with 24-hour overlap, due watch review and negative evidence.
For the first evening run the ordinary ledger's completed cutoff is
`2026-10-24T07:57:16.000Z`; inspect the live record rather than trusting this
historical note. Record actual access/window times; edition date is not event,
discovery or first-publication time. New evidence, not a second quota, determines
whether any story survives.

Evening sorts before the ordinary edition within the same date in the archive,
homepage, desk pages and RSS. Both issues remain separately accessible. Article,
listing, homepage and feed disclose “Evening edition”; no fabricated publication
timestamp is added. A ledger-only evening does not create a public edition.

Run the ordinary checks against the full evening key:

```bash
npm ci
npm run editorial:check -- docs/editorial/ledgers/2026-10-24-evening.json
npm run illustration:check -- docs/editorial/ledgers/2026-10-24-evening.json
npm run verify
npm run test:e2e
```

Inspect required exact-head CI jobs separately. Leave both publication and support
PRs draft for human review. Report the real outcome, per-edition counts, coverage
gaps and durable checkpoint; never say that schema support is a prepared edition.
