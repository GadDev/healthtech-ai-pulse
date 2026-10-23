# HealthTech illustration system

Contract: `healthtech-1.0`; authoring direction: `scientific-1`. [Editorial policy](../EDITORIAL.md) controls claims, [the visual constitution](VISUAL_CONSTITUTION_V1.md) controls scientific abstraction and palette, and the [target skill](../../.agents/skills/healthtech-ai-pulse-illustration/SKILL.md) executes this workflow. Do not import Daily AI Pulse's identity formula, warm palette, candidate thresholds or approvals.

## Preflight in the executing runtime

Before drafting publication copy, record generation, pixel inspection, WebP conversion/decoding and binary-safe repository upload separately as available/unavailable/unverified, with observed evidence. A listed tool is not a successful call; this interactive session does not prove scheduler capabilities. Capability failure blocks affected artwork, not independent research.

Use the existing ledger/checkpoint mechanism's optional `artwork` extension (`healthtech-artwork-1`); do not create a second competing ledger. New runs acquire this extension before drafting. Historical ledgers remain parseable and are not rewritten. Its exact shape is in `src/lib/editorial-schema.ts` and generated `ledger.schema.json`.

Track per-story `pending` → `generated` → `reviewed` → `uploaded`, or `blocked` with failed stage, observed error and next action. Keep chronological history, the exact brief path/key, real candidate output IDs and prompt hashes, accepted review path and final asset details. Uploaded requires a Git blob ID and actual read-back revision. Save each stage under the existing owner lease and expected parent; resume the same branch/PR at the first unfinished stage. Preserve successful outputs on conversion/upload failure. Only material generation-input changes justify reopening generation. A retry, rebase or CI rerun alone does not.

## Brief, decision and generation

Prepare a factually stable selected story with final image path, alt, caption and review path before hashing its bytes. Use Scientific Editorial Abstraction and the exact Quiet Laboratory palette. Routine production: three written concepts, select one, start with one real candidate. Issue #52: three real compositions for one replacement article, then select one. Bound retries to one revised batch per invocation and checkpoint a blocker if none pass.

Persist the exact final brief at `docs/editorial/illustrations/briefs/<story-id>.json`. Required fields: `story_id`, `verified_context`, `visual_idea`, `placement`, `crop`; use `constraints` for scientific structure/simplification/metaphor, palette, focal relationship, prohibited implications, concepts and prompt construction. Include real repository-relative `{path, sha256}` references for constitution, skill, renderer, stylesheet and any supplied approved visual references. The shared brief reader checks exact reference bytes in both the decision CLI and batch validator.

Before any new image call:

```bash
npm run illustration:decision -- --story YYYY-MM-DD-slug --brief docs/editorial/illustrations/briefs/YYYY-MM-DD-slug.json --generator-surface ACTUAL_TOOL --candidate-count ACTUAL_COUNT --json
```

`REUSE` requires matching identity, valid review/asset and the ordinary visual/batch checks. `GENERATE` is not acceptance. `NONE` is historical backfill only, never a new-publication choice. Invalid inputs block the decision. Build each actual prompt from placement/crop → verified context → one scientific idea → composition → constitution/palette → full prohibitions. Retain actual prompts and output identifiers in the PR evidence, not fabricated production records.

## Inspect, compare and review

Open actual pixels and apply the constitution's medical/prohibition gate before its specificity, meaning, clarity and variety gates. Inspect beside the actual headline, lead and visible disclosure. Compare with recent target images without mistaking old photography for an approved scientific reference set. Use the target comparison-sheet builder:

```bash
npm run illustration:contact-sheet -- --story YYYY-MM-DD-slug --out /path/to/new-sheet.png --crop wide --reference /path/to/current.webp /path/to/a.png /path/to/b.png /path/to/c.png
```

Contact sheets and candidates are temporary aids. Review the selected image in actual article and listing contexts at desktop, narrow mobile and 160 pixels, including 16:9/3:2 cover crops. The builder needs Chromium; `PLAYWRIGHT_EXECUTABLE_PATH` may select an existing compatible browser. It writes no approval. Put concise concept/candidate decisions and observed gate reasons in the PR, keyed to story ID and accepted asset SHA-256. Do not pretend CI judges taste or scientific truth.

## Convert, persist and read back

Convert accepted artwork without stretching to a complete WebP, decode the final bytes and check dimensions/crops. Save under `public/images/stories/<story-id>.webp`; update image, alt, caption, dimensions and review metadata atomically. The reader must see a generated-editorial-illustration disclosure; alt alone is not disclosure.

Use the strict `healthtech-1.0` review schema with actual reviewer/type/time, candidate count, actual tool, nullable exposed model snapshot and exact hashes. New reviews include `brief_path`, a backwards-compatible optional field for historical reviews; batch validation reads that brief and verifies its hash, story, crop and all references. Never invent past prompts or rewrite historical approvals. `unsupported_medical_implication=false` and `crop_passed=true` require actual review.

Identity remains SHA-256 of UTF-8 JSON.stringify of the ordered array:

```text
[story_id, story_source_sha256, brief_sha256, policy_sha256,
 version, candidate_count, generator, model_snapshot]
```

Use the shared `scripts/lib/illustration-generation-identity.ts`; exact source/brief/policy bytes, no whitespace normalization. Reviewer, timestamps, branch, PR, selected candidate and output hash are not generation inputs. Reference hashes are included through the exact brief. New generation policy hash covers current `docs/EDITORIAL.md` bytes.

The scientific-direction migration retains seven exact unchanged historical review fingerprints from main `16d3519`; source and asset hashes must still match. This is historical compatibility, not approval under the new direction or automatic reuse. Changed/new source, asset or review bytes must use current inputs. The maintainer approved the DynaVelo scientific direction and explicitly requested replacing all remaining article images on 23 October 2026. Each deliberate replacement receives a genuine new brief/review; previous review bytes remain in Git history. The immutable compatibility allowlist recognizes original historical bytes only and never supplies approval for new artwork. The accepted DynaVelo image is now the first approved HealthTech scientific production reference.

Upload WebP through binary-safe Git operations. Read back the committed bytes or Git blob at the target revision, decode and match SHA-256/dimensions to frontmatter and review; only then record `uploaded`. An unreferenced blob, filename or upload-success response is not complete preparation. Run:

```bash
npm run illustration:check -- docs/editorial/ledgers/YYYY-MM-DD.json
npm run verify
```

A complete publication handoff requires uploaded artwork for every published story, no blocked capabilities, required checks and observed CI for the exact current head. Withhold affected stories when mandatory artwork fails; continue independent candidates where policy permits. A blocked checkpoint and a green build alone do not constitute publication approval. Keep the PR draft; human review/merge remain separate.
