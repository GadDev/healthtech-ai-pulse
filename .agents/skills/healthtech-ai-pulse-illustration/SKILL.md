---
name: healthtech-ai-pulse-illustration
description: Prepare, reuse and review optional HealthTech AI Pulse editorial artwork from factually stable selected stories, with exact-source identity, binary integrity, crop and unsupported-medical-implication checks.
---

# Optional editorial illustration

Read target EDITORIAL.md, docs/CONTENT_MODEL.md and the story/ledger first. Never change research classifications. mode=none is a valid explicit choice and needs no generation. A declared generated image requires the complete review and asset; do not silently change mode after a generation failure.

Generate only for a verified, selected, factually stable story. Use a brief containing the actual story ID, verified context, one metaphor, placement and crop. Prefer calm geometry/material forms with warm paper, dark ink and restrained terracotta. It is artwork for the existing website, not a screenshot or labelled diagram. No invented charts, statistics, logos, unsupported anatomy, scans, mechanisms, molecular evidence or patient outcomes. Use abstraction when factual depiction would imply knowledge the evidence does not support.

Fix final article bytes, image path, alt text and review path before computing the exact-source SHA-256. Hash exact EDITORIAL.md bytes for policy_sha256 and exact brief bytes for brief_sha256. The review is separate from the article to avoid a self-referential source hash. Target review version is healthtech-1.0; do not copy a source-publication v1.3 approval or identity.

Compute generation_key as SHA-256 over UTF-8 JSON.stringify of `[story_id, story_source_sha256, brief_sha256, policy_sha256, version, candidate_count, generator, model_snapshot]` using the same ordered array as the validator. Use null for an unavailable model snapshot, never a guessed model name. Reuse only when identity, review, asset bytes and crop remain valid. A retry alone does not justify regeneration.

Start with one actual candidate. Review unsupported medical implication before aesthetics; reject failures. Inspect thumbnail and intended responsive crops, contrast and alt text. No claim that the image depicts clinical evidence. Save accepted WebP bytes under public/images/stories/<story-id>.webp and a review under docs/editorial/illustrations/reviews/<story-id>.json. Record actual candidate count, generator, asset hash, crop, real reviewer/type/time, unsupported_medical_implication=false and crop_passed=true only after those checks actually occur.

The strict review schema and illustration validator define exact field names. Use binary-safe blobs or git commits. Run npm run illustration:check -- docs/editorial/ledgers/YYYY-MM-DD.json. Report generation/asset/access failures as blockers for that story. Never invent a review, transform a failed candidate into a pass, publish factual charts with generated data, or invoke this workflow for watch/rejected items.
