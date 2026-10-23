# HealthTech illustration briefs

This directory contains **acceptance briefs** for generated editorial images, written in JSON format matching the brief schema defined in [ILLUSTRATION_SYSTEM_V1.md](../ILLUSTRATION_SYSTEM_V1.md).

## Purpose

- For each story with `illustration.mode: generated`, a brief records the editorial concept, constraints, and generation parameters used to produce the final image.
- The brief is **separate from the article** to avoid a self-referential source hash.
- `brief_sha256` in the corresponding review JSON (`../reviews/<story-id>.json`) must match the exact bytes of this brief file.

## Format

```json
{
  "story_id": "YYYY-MM-DD-story-slug",
  "verified_context": "Two or three supported sentences from the final article.",
  "visual_idea": "Chosen photographic concept with one meaningful action or relationship",
  "placement": "article-hero",
  "crop": "wide",
  "constraints": "Editorial point and why this scene is specific to it; focal point and required crop relationships; lighting; limits on human presence; story-specific cliches to avoid; medical and illustrative-context safeguards.",
  "references": [{ "path": "relative/path/to/reference.asset", "sha256": "..." }]
}
```

All fields are required except `references` (optional). The `constraints` field must be a nonempty string containing the editorial direction.

## Historical backfill note

Four stories from the 2026-10-12, 2026-10-13, and 2026-10-21 editions originally used `illustration.mode: none`. Their images were backfilled via PR #46 with retrospective model-only reviews in PR #44. The briefs in this directory are **retrospective acceptance briefs** — not the original generation prompts — created to establish a verifiable `brief_sha256` for the review identity. Two of the four backfilled stories (2026-10-19, 2026-10-20) do not have brief files; their reviews store the brief hash directly without a separate brief file.

## Validation

Run `npm run illustration:check -- docs/editorial/ledgers/YYYY-MM-DD.json` to validate brief integrity against reviews and assets.
