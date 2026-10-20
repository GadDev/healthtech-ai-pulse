# HealthTech illustration system

Contract: `healthtech-1.0`. This guide adapts the source publication's visual constitution, production workflow and generation-identity guidance to HealthTech's implemented optional-image contract. [Editorial policy](../EDITORIAL.md) governs medical claims; [the content model](../CONTENT_MODEL.md), `src/lib/editorial-schema.mjs` and `scripts/lib/editorial.mjs` define the stored fields and executable checks. Use the [target illustration skill](../../.agents/skills/healthtech-ai-pulse-illustration/SKILL.md) for execution.

## Choose the image mode first

`illustration.mode: none` is a complete, valid choice. A ledger-only batch creates no artwork. Generate only for a selected, verified story whose final article bytes and image/alt/review paths are fixed. If a declared generated asset fails, withhold that story until repaired; do not silently change its mode or research decision.

Explore three written photographic concepts and choose one before new generation. Start with one generated candidate from that choice and record the actual candidate count, excluding text concepts. Revise a failed concept or composition before generating a replacement. A three-image competition and production-reference archive are not requirements for this target.

## Compose from verified context

Read [the visual constitution](VISUAL_CONSTITUTION_V1.md) before preparing a brief or reviewing a candidate. Record the actual story ID, two or three supported context sentences, the chosen visual idea, intended placement and crop. Use `constraints` for the editorial point, meaningful action/relationship, composition and focal point, lighting, human-presence limits and anti-cliches specific to the story. Natural photographic colour, purposeful contrast and anonymous gestures are allowed within the medical safeguards. Inspect the current HealthTech renderer and stylesheet; do not assume source-publication layouts or image placements have been implemented here.

## Review the actual asset

Inspect the image at intended article size, a narrow viewport and reduced thumbnail size. Check focal-point survival, crop, contrast and faithful alt text; the crop field accepts `wide`, `square` or `landscape`. The validator does not prove aesthetic quality, clinical fidelity or successful visual inspection.

Keep a rejected candidate rejected. Record `unsupported_medical_implication: false` and `crop_passed: true` only after the corresponding review actually occurred. Record the real reviewer, `model` or `human` review type, and actual UTC review time. A model's self-review is not independent clinical validation.

After medical and technical review, apply the visual constitution's four editorial gates: specificity to the story, meaningful action/relationship/metaphor, clarity at a 160-pixel thumbnail and responsive crops, and variety against recent approved images/current edition. A generic desk-and-device photograph can pass technical validation and still fail editorial review. Withhold any candidate that fails; identity reuse does not bypass these gates.

In the publication PR body, record the three concepts and selection rationale, compared story IDs (or unavailable comparisons), and pass/fail with a brief observed reason for each gate. Key accepted-image evidence to story ID and final asset SHA-256. Record rejected attempts and their actual failures; do not invent review outcomes. Keep these editorial judgments out of the unchanged strict `healthtech-1.0` review JSON. Automated validation does not enforce their presence or prove their truth; the PR reviewer must inspect them.

## Bind generation to exact inputs

Include all material generation instructions in the final brief. If this guide or a supplied reference changes, reassess and update the brief before deciding reuse.

Use SHA-256 over exact final article bytes for `story_source_sha256`, exact brief bytes for `brief_sha256`, and exact `docs/EDITORIAL.md` bytes for `policy_sha256`. Do not normalize whitespace or line endings. Keep hashes/reviews outside the article they fingerprint.

**Identity limitation:** unrelated edits to `docs/EDITORIAL.md` invalidate existing reviewed images, whereas changes to the visual constitution/skill are not in that hash. A versioned composite fingerprint requires a separate helper/schema/CLI/validator migration with explicit compatibility and genuine asset re-review; never silently rehash historic approvals. The repository's photorealistic Quiet Laboratory constitution and target illustration skill already align. Do not import warm-paper/terracotta rules from an external Pulse skill.

Compute `generation_key` as SHA-256 of UTF-8 `JSON.stringify` of this ordered array:

```text
[story_id, story_source_sha256, brief_sha256, policy_sha256,
 version, candidate_count, generator, model_snapshot]
```

Use `version: healthtech-1.0`, the actual generator and candidate count, and `null` when the model snapshot is unavailable. Do not import the source's nested version-1.3 identity, canonical-JSON object formula, legacy exceptions or reference-input hashes into the strict target review.

Reuse requires matching current inputs, a valid review, matching final asset bytes and an acceptable crop. A retry or CI rerun alone does not justify regeneration. Source, brief, policy, generator, candidate-count or model-snapshot changes require reassessment. Asset changes invalidate its recorded integrity. Do not refresh timestamps or invent hashes to conceal a mismatch.

The shared identity helper in `scripts/lib/illustration-generation-identity.mjs` implements the same ordered-array formula used by the batch validator and decision CLI. The batch validator checks article/policy/asset integrity and the stored key; the CLI additionally compares the currently supplied brief and any declared reference fingerprints.

### Read-only generation decision

Prepare an explicit local JSON brief with these fields:

```json
{
  "story_id": "YYYY-MM-DD-story-slug",
  "verified_context": "Two or three supported sentences from the final article.",
  "visual_idea": "Chosen photographic concept with one meaningful action or relationship",
  "placement": "article-hero",
  "crop": "wide",
  "constraints": "Editorial point and why this scene is specific to it; focal point and required crop relationships; lighting; limits on human presence; story-specific cliches to avoid; medical and illustrative-context safeguards."
}
```

This is a format example, not a real story or review. Replace its values with the actual source. The CLI retains optional `constraints` for existing brief compatibility; new briefs must use that nonempty string for the editorial direction above. Optional `references` contains repository-relative `{ "path": "...", "sha256": "..." }` records. Include material layout/style/reference inputs and their real hashes in the brief. The CLI rejects stale reference bytes and unknown brief fields. Local briefs may be temporary; the command does not commit them or add new editorial write paths.

```bash
npm run illustration:decision -- --story YYYY-MM-DD-story-slug --brief /path/to/brief.json --generator-surface ACTUAL_TOOL --candidate-count 1 --json
```

Use the actual tool, count and optional `--model-snapshot` value; absent snapshot means null. The command reads the canonical non-draft English story and reports `NONE`, `GENERATE` or `REUSE`. It does not generate an image, alter the ledger or write an approval. Invalid/malformed inputs, foreign/forged reviews and unsupported contracts exit with code 2. Valid changed inputs or missing/changed asset bytes require generation rather than reuse. A `REUSE` decision still requires the normal batch and visual checks.

### Optional comparison sheet

```bash
npm run illustration:contact-sheet -- --story YYYY-MM-DD-story-slug --out /path/to/new-review.png --crop wide /path/to/candidate.webp
```

The builder accepts at least one candidate, optional repeated `--reference <image>` arguments and `wide`, `square` or `landscape` preview crops. It embeds local PNG/JPEG/WebP inputs and writes a new PNG sheet without changing them or overwriting an existing file. No supplied references is recorded honestly; no production reference archive is invented. Preview ratios are 16:9, 1:1 and 3:2 respectively; inspect the real page as well. The sheet does not normalize the production image, create review JSON or certify medical fidelity.

Chromium is required (`npx playwright install chromium`). `npm run illustration:contact-sheet:test` exercises actual rendering and invalid-image failure in the browser CI job, after Chromium installation. Unit tests run under the ordinary `npm test` gate. No new dependency is introduced.

## Persist and validate

Save accepted WebP bytes at `public/images/stories/<story-id>.webp` and the strict review JSON at `docs/editorial/illustrations/reviews/<story-id>.json`. Use the actual asset SHA-256 and schema field names. Stage related source, asset, review and ledger changes atomically under the orchestrator's ownership rules. Upload binary bytes through binary-safe Git operations.

Run:

```bash
npm run illustration:check -- docs/editorial/ledgers/YYYY-MM-DD.json
npm run verify
```

Replace the date with the actual batch date. Report command execution separately from source/visual inspection. No generated-image production acceptance is claimed by this guide.

Adapted from `GadDev/daily-ai-pulse` at `6269d2b7dbc01046cfcdaf7f204b8b6b14de9e64`: `VISUAL_CONSTITUTION_V1.md`, `ILLUSTRATION_SYSTEM_V1.md` and `ILLUSTRATION_GENERATION_IDENTITY_V1.md`. Visual authoring rules are in the target visual constitution; production and identity guidance are consolidated here; their historical approvals and incompatible contracts are excluded.
