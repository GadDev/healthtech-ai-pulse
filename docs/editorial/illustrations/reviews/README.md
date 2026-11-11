# HealthTech illustration reviews

This directory contains **strict review records** for generated editorial images, in JSON format matching the `reviewSchema` defined in `src/lib/editorial-schema.ts`.

## Purpose

- Each review binds a generated WebP asset to its exact source article, brief, and editorial policy at the time of review.
- The review is **separate from the article** and the asset to avoid self-referential hashes.
- Reviews are required for every story with `illustration.mode: generated` (mandatory for editions from 2026-10-22).
- Historical `mode: none` stories (pre-2026-10-22) have retrospective model-only reviews pending human approval.

## Schema (healthtech-1.0)

```typescript
{
  version: 'healthtech-1.0',
  story_id: string,              // Canonical story ID (e.g., "2026-10-19-oncology-ai-ehr-handoff")
  story_source_sha256: string,   // SHA-256 of exact article Markdown bytes
  brief_sha256: string,          // SHA-256 of exact brief JSON bytes
  policy_sha256: string,         // SHA-256 of exact docs/EDITORIAL.md bytes
  generation_key: string,        // SHA-256 of [story_id, story_source_sha256, brief_sha256, policy_sha256, version, candidate_count, generator, model_snapshot]
  candidate_count: number,       // Actual candidates generated (>= 1)
  generator: string,             // Actual generator surface identifier
  model_snapshot: string | null, // Reported model snapshot or null if unavailable
  asset_sha256: string,          // SHA-256 of the WebP asset bytes
  crop: 'wide' | 'square' | 'landscape',
  reviewed_by: string,           // Actual reviewer identity and type (e.g., "Codex (model visual review)")
  reviewed_at: string,           // UTC ISO datetime of review
  review_type: 'model' | 'human',
  unsupported_medical_implication: false,  // Must be false after medical review passes
  crop_passed: true              // Must be true after crop/clarity review passes
}
```

## Key integrity rules

1. `story_source_sha256` must match the current article file bytes
2. `brief_sha256` must match the brief file in `../briefs/<story-id>.json` (when brief exists)
3. `policy_sha256` must match current `docs/EDITORIAL.md` bytes (except bounded historical exception for 2 pre-revision images)
4. `generation_key` must equal the deterministic identity computed from the above fields
5. `asset_sha256` must match the WebP file at `public/images/stories/<story-id>.webp`
6. `unsupported_medical_implication: false` and `crop_passed: true` only after actual review

## Historical backfill exception

The 2026-10-21 EDITORIAL.md revision changed `policy_sha256`. Two pre-revision reviewed images (2026-10-19, 2026-10-20) retain the original `policy_sha256` via a bounded exception in `scripts/lib/editorial.ts` (`historicalPolicySha256` and `historicalReviewedImages`). This is **not a reusable publishing exception** — it is a one-time migration compatibility. Future policy changes require full re-review.

## Validation

Run `npm run illustration:check -- docs/editorial/ledgers/YYYY-MM-DD.json` or `npm run verify` to validate all reviews against assets, articles, briefs, and policy.
