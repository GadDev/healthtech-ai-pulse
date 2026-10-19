# HealthTech illustration system

Contract: `healthtech-1.0`. This guide adapts the source publication's visual constitution, production workflow and generation-identity guidance to HealthTech's implemented optional-image contract. [Editorial policy](../EDITORIAL.md) governs medical claims; [the content model](../CONTENT_MODEL.md), `src/lib/editorial-schema.mjs` and `scripts/lib/editorial.mjs` define the stored fields and executable checks. Use the [target illustration skill](../../.agents/skills/healthtech-ai-pulse-illustration/SKILL.md) for execution.

## Choose the image mode first

`illustration.mode: none` is a complete, valid choice. A ledger-only batch creates no artwork. Generate only for a selected, verified story whose final article bytes and image/alt/review paths are fixed. If a declared generated asset fails, withhold that story until repaired; do not silently change its mode or research decision.

Start with one candidate. Record the actual candidate count; the source publication's three-candidate competition and production-reference archive are not requirements for this target.

## Compose from verified context

Build the brief from the story ID, two or three supported context sentences, one visual idea, intended placement and crop. Use the actual HealthTech article renderer and stylesheet for composition: `src/pages/stories/[...id].astro` and `src/styles/publication.css`. Do not claim that source reference-layout pages or additional image placements exist here.

Prefer a restrained editorial illustration with a scientific or architectural sensibility: one physical/spatial metaphor, deliberate geometry, subtle material texture, readable silhouette and generous negative space. Technical lines may support the image; they should not turn it into a bare flowchart, wireframe or diagram. Use the publication's warm canvas `#F3EBDD`, paper `#FAF6EE`, ink `#171B1A`, muted gray `#575D5B` and restrained terracotta `#8A4B35`.

Reject unsupported medical implications before judging aesthetics. In particular:

- Do not invent anatomy, scans, molecular mechanisms, study results, patient outcomes or clinical endorsements.
- Do not use generated charts or numbers as factual evidence. Data graphics require source data and a reproducible method under editorial policy.
- Do not generate words, labels, logos, headlines, UI, screenshots, watermarks, borders or frames. The website supplies its own text.
- Avoid generic robots, glowing brains, neon and stock AI imagery. Use abstraction when a literal depiction would imply more than the evidence establishes.

Compare with approved HealthTech artwork when available. Do not import source artwork, approvals or a supposed target reference archive. Record honestly when no target comparison is available.

## Review the actual asset

Inspect the image at intended article size, a narrow viewport and reduced thumbnail size. Check focal-point survival, crop, contrast and faithful alt text; the crop field accepts `wide`, `square` or `landscape`. The validator does not prove aesthetic quality, clinical fidelity or successful visual inspection.

Keep a rejected candidate rejected. Record `unsupported_medical_implication: false` and `crop_passed: true` only after the corresponding review actually occurred. Record the real reviewer, `model` or `human` review type, and actual UTC review time. A model's self-review is not independent clinical validation.

## Bind generation to exact inputs

Include all material generation instructions in the final brief. If this guide or a supplied reference changes, reassess and update the brief before deciding reuse.

Use SHA-256 over exact final article bytes for `story_source_sha256`, exact brief bytes for `brief_sha256`, and exact `docs/EDITORIAL.md` bytes for `policy_sha256`. Do not normalize whitespace or line endings. Keep hashes/reviews outside the article they fingerprint.

Compute `generation_key` as SHA-256 of UTF-8 `JSON.stringify` of this ordered array:

```text
[story_id, story_source_sha256, brief_sha256, policy_sha256,
 version, candidate_count, generator, model_snapshot]
```

Use `version: healthtech-1.0`, the actual generator and candidate count, and `null` when the model snapshot is unavailable. Do not import the source's nested version-1.3 identity, canonical-JSON object formula, legacy exceptions or reference-input hashes into the strict target review.

Reuse requires matching current inputs, a valid review, matching final asset bytes and an acceptable crop. A retry or CI rerun alone does not justify regeneration. Source, brief, policy, generator, candidate-count or model-snapshot changes require reassessment. Asset changes invalidate its recorded integrity. Do not refresh timestamps or invent hashes to conceal a mismatch.

The current validator recomputes article/policy/asset integrity and the stored identity key. The supplied brief still needs an exact-byte comparison during preparation; a stored brief hash alone does not prove that comparison occurred. HealthTech does not yet provide the source's separate generation/reuse decision CLI.

## Persist and validate

Save accepted WebP bytes at `public/images/stories/<story-id>.webp` and the strict review JSON at `docs/editorial/illustrations/reviews/<story-id>.json`. Use the actual asset SHA-256 and schema field names. Stage related source, asset, review and ledger changes atomically under the orchestrator's ownership rules. Upload binary bytes through binary-safe Git operations.

Run:

```bash
npm run illustration:check -- docs/editorial/ledgers/YYYY-MM-DD.json
npm run verify
```

Replace the date with the actual batch date. Report command execution separately from source/visual inspection. No generated-image production acceptance is claimed by this guide.

Adapted from `GadDev/daily-ai-pulse` at `6269d2b7dbc01046cfcdaf7f204b8b6b14de9e64`: `VISUAL_CONSTITUTION_V1.md`, `ILLUSTRATION_SYSTEM_V1.md` and `ILLUSTRATION_GENERATION_IDENTITY_V1.md`. Their useful guidance is consolidated here; their historical approvals and incompatible contracts are excluded.
