---
name: healthtech-ai-pulse-pr-preparation
description: Prepare one HealthTech AI Pulse daily draft PR from its normalized target ledger, with claim verification, complete withholding accounting, safe ownership, atomic checkpoints and exact-revision CI reporting. Never merge or configure recurring tasks.
---

# Prepare a daily publication

Operate only in GadDev/healthtech-ai-pulse. Read current target CONSTITUTION.md, EDITORIAL.md, docs/CONTENT_MODEL.md, docs/editorial/ORCHESTRATOR.md, ledger.schema.json, topics.yml, source schemas, validators and CI before work. Missing contracts block publication; do not use Daily AI Pulse contracts as a fallback.

Use the ledger as the handoff. Preserve research decisions and their evidence/scoring; publication verification, supported scope and withholding are separate. A narrowed article claim must remain within inspected source support. Recheck source status, access, contradictions, date precision and deduplication across merged and open daily ledgers. Never draft watch/rejected records implicitly. Human promotion must be auditable in a selected record and never bypass source gates.

## Safe writes

Use the semantics implemented in scripts/lib/orchestration.mjs. Bind the adapter only to authenticated, already-authorised target GitHub operations. Required adapter methods are findPRs (all states for canonical head/base), isFinalized (default-branch ledger/merged PR), readBranch (head plus current ledger), defaultHead, commit (tree/commit from exact parent), createRef (create-only), updateRef (expected head and non-forced), createPR (draft) and updatePR (body/title only). Use the connected GitHub application's Git object and expected-sha ref tools when available. No new stored token is required by this skill; never scrape credentials from the environment or copy deployment credentials.

A bound adapter and live write/read-back trial are prerequisites, not something a simulator proves. If the execution surface cannot bind these operations or reject a stale ref, report the exact blocker. Do not approximate concurrency with a boolean or unconditional file writes.

Acquire/create the canonical date branch with the full ledger and 120-minute lease in one atomic ref operation. Existing branches reuse the actual head and ledger; a fresh foreign lease, multiple PRs, non-draft PR or closed-unmerged canonical PR stops the writer. Expired takeover re-reads everything and uses expected-head update. On head/ownership changes stop; inspect human edits before any retry. Never force-push or create an alternate branch. No daily writes after that date has merged.

Persist research first. Checkpoint all related files in one tree/commit/ref update. New binary assets use base64 blobs or binary-safe git, never UTF-8 content APIs. Only dated ledger/story/issue/image/review paths may change. Do not modify policy, code, CI or deployment from an editorial run. Preserve previous attempt/override history and human edits. Retain branch/commit evidence if later preparation fails.

## Publication and checks

Use current conditional evidence fields, true reviewer identity/type/time, source locators and per-claim verification. No anonymous approval, guessed metric or invented independence. Map each selected item exactly once to drafted or withheld. Default capacity is two stories. If none survive, finalise ledger-only with no issue, MUST KNOW or manufactured artwork.

English is required; French publication is not configured. For an explicitly requested translation handoff, invoke ../healthtech-ai-pulse-translate-fr/SKILL.md after committing final English bytes; keep its reviewed packages outside public content. Do not add translation work to a scheduled batch implicitly. mode=none is valid imagery. Generated mode invokes the target illustration skill after final article bytes and paths are fixed. Missing declared imagery withholds the story.

Run npm run editorial:check with the explicit dated ledger, npm run illustration:check with that ledger, npm run verify and prescribed browser checks when execution is available. Inspect source support separately. If execution is unavailable report not-run and use draft CI for executable checks; do not bypass evidence/deduplication gates. A valid ledger-only draft can expose source failures, while an invalid ledger blocks any PR.

Before opening/updating the one draft, confirm preflight still describes the current head and ownership is valid. Re-query all PR states after timeouts. Opening a draft is not approval. Release ownership through a new atomic checkpoint, then inspect CI on the resulting latest PR head/tested revision. Report stale/missing/cancelled/failed checks honestly. Keep draft, never merge/auto-merge/mark ready. Follow the orchestrator's explicit failed-CI and already-finalized exception outcomes.
