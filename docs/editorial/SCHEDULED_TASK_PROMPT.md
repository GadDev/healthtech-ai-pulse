Run the complete HealthTech AI Pulse editorial workflow for today's Europe/Luxembourg editorial date in `GadDev/healthtech-ai-pulse`. Research, verify and prepare **at most two** useful articles in **one draft PR**. Never merge, enable auto-merge, mark the PR ready or publish without human review.

## A. Read target contracts and existing run state

Resolve default branch and commit. Read these at that **same commit**, following referenced dependencies:

- `docs/CONSTITUTION.md`, `docs/EDITORIAL.md`, `docs/CONTENT_MODEL.md`, `docs/DAILY_ISSUE.md`, `docs/TECHSTACK.md`
- `docs/editorial/ORCHESTRATOR.md`, `DISCOVERY_PLAN.md`, `EDITORIAL_SCHEMA_V1.md`, `DECISION_ENGINE_V1.md`, `PR_PREPARATION_V1.md`, `TOPICS_V1.yml`, `ledger.schema.json`, `VISUAL_CONSTITUTION_V1.md`, `ILLUSTRATION_SYSTEM_V1.md` (under `docs/editorial/`)
- `.agents/skills/healthtech-ai-pulse-pr-preparation/SKILL.md` and `.agents/skills/healthtech-ai-pulse-illustration/SKILL.md`
- `src/content.config.ts`, `src/lib/editorial-schema.mjs`, `scripts/lib/orchestration.mjs`, `scripts/validate-content.mjs`, `scripts/validate-editorial-batch.mjs`, `scripts/validate-illustration-batch.mjs`, `package.json`, `.github/workflows/ci.yml`

The repository contracts are authoritative; external Daily AI Pulse skills or remembered policies are not substitutes. If core contracts cannot be read or conflict, stop affected preparation. If visual policies conflict, choose valid text-only mode **before declaring** generated imagery and report the conflict.

Record real timestamps, Europe/Luxembourg editorial date and `contract_ref`. Check canonical branch/PR **all states**, finalized default-branch ledgers, any active lease and previous phase checkpoints *before* research. Obey target finalized/no-op, closed-unmerged, non-draft, ownership and divergent human-edit stop conditions. Never create an alternate publication branch to bypass a blocker.

## B. Search a bounded five-lane window

Cover existing clinical-ai, health-systems, pharma, biomedical-foundations and safety-policy desks, without quotas. Scope non-AI developments through the adopted direct-consequence test. Initially search the preceding 72 hours; subsequently use the last **completed** cutoff with 24-hour overlap, no more than seven days automatic catch-up. Report longer gaps. Revisit due watch items and relevant notices/corrections in the 30-day policy horizon. Separate event, publication, indexing, discovery and editorial dates; older material requires an explicit late-discovery explanation.

Proposed operating budget: 30 minutes discovery and about 20 minutes routine verification per shortlisted lead. Budgets never certify incomplete evidence. Attempt these five lanes, logging failures or omissions:

1. Desk/workflow-specific PubMed/Europe PMC searches **plus** at least one direct journal/publisher listing. Rotate npj Digital Medicine, Nature Medicine, JAMIA, NEJM AI, Lancet Digital Health, JAMA, PLOS Digital Health and relevant imaging sources. Search beyond generic AI words: foundation/generative/language models, deep learning, transformers, NLP, diagnostics, decision support, EHR/ambient work and real-world evaluations.
2. Official healthcare-AI safety/regulatory records, including appropriate European and FDA sources. Keep authority/jurisdiction and status exact. FDA, MHRA, Commission/EUR-Lex/MDCG, national device authorities and EMA medicines work have distinct remits. Do not imply that a regulatory action establishes effectiveness.
3. Two accessible specialist reporting outlets with different coverage, following meaningful leads to primary records. Preserve user-requested Fierce Healthcare (AI/digital health), MedTech Dive, FirstWord HealthTech and Life Science Daily in a rotation with MobiHealthNews, Healthcare IT News, Digital Health and regional sources; not mandatory daily quotas. Identify syndicated, contributed, promotional and sponsored origins.
4. Relevant pharma/biomedical evidence or artifacts: trials, protein/molecule/target research, primary publications/preprints, versioned repositories, model/data cards and licenses. Availability claims require actual version/access inspection.
5. One rotating European/local-language French/German or neighbouring-country query, e.g. TICsanté, Health Data Hub, LIH/LCSB, Agence eSanté and national authorities. Local original texts matter; translations are not independent corroboration.

Intentionally search for negative and contradictory results: no benefit/null finding, failed external transfer, unsafe outputs, bias/drift, withdrawal, recall, retraction, abandoned deployment and rollback. A search term does not prove an incident.

Split large queries by desk/date/workflow/topic, set sorting and paginate/offset when supported. A first page of 100 from 1,862 hits is not complete discovery. Record **hits, retrieved, screened and primary inspected** separately *when actually observed*; preserve unscreened results, access failures, recovery page and time budget. Complement publication-date search with source entry/index dates when supported, then verify the original event date. A source named in the prompt is not a source successfully checked.

In the existing strict ledger `research.query_log[].outcome` and `coverage_gaps[]`, record every lane's actual attempt/window/query, sort/page, access, limits and remaining work; do not invent schema fields. `completed_at`/`last_completed_cutoff` indicate the **bounded planned window** was actually searched, not exhaustive global surveillance. If a required lane/window was never attempted, keep completion/cutoff null and name what remains. Do not silently roll an unfinished backlog forward.

## C. Deduplicate and score only inspected claims

Inspect merged and pending ledgers/issues/stories. Deduplicate by original DOI/PMID/preprint version, trial/cohort, product/release, regulatory decision and underlying event, not only URL. Distinguish published, pending, prior watch and previous rejection. For a peer-reviewed publication of an older preprint, name what is old and what materially changed; unchanged journal status is not automatically a new scientific result.

Use existing S/E/R/M/D 0–4 inputs weighted 30/30/25/10/5. **Keep ≥75**, S/E/R≥2 and M≥1 for selection, all scientific hard gates, current optional MUST KNOW rule and two-story limit. Do not apply experimental ≥65 threshold. Write **candidate-specific, evidence-grounded rationales** for sufficiently assessed claims. If essential methods, artifact, version comparison or access remain unresolved, put the lead on watch with `editorial_score: null`, a concrete unresolved-evidence/access/novelty reason, promotion condition and next review date. Do not manufacture identical low scores for unfinished candidates, or exclusions for unscreened search results.

## D. Persist research, verify and draft

Use the repository's implemented owner lease, expected-head atomic commit and safe retry adapter, not a prompt-only lock. Canonical branch `content/healthtech-ai-pulse-YYYY-MM-DD`; ledger `docs/editorial/ledgers/YYYY-MM-DD.json`; PR title `content: prepare HealthTech AI Pulse for YYYY-MM-DD`. Reuse eligible branch/PR and lease checkpoints, renew ownership before mutation, stop on loss of ownership/divergence and preserve human edits. Do not write directly to main or edit policy, schema, application, CI or deployment from an editorial run. Binary images need binary-safe operations. Persist research decisions and phase checkpoints before drafting; selected decisions are never silently rewritten by publication verification.

Recheck central source/claim locators, methods, study setting, comparators, denominators, units, uncertainty, validation externality, COI, contradictions and correction status. Distinguish model accuracy, workflow changes, patient outcomes, biological progress, artifact availability and regulatory status. Vendor/hospital announcements substantiate their own announcement, not independent clinical replication. A sufficient abstract may support **only** a carefully attributed abstract-level claim. Record actual review identity/type/time and evidence accessed; withhold unsupported central claims. Blocked selected stories remain selected in research history and need not block independent verified work.

Draft verified survivors in `src/content/stories/` in English using `pulse`, `briefing` or `deep-dive`. Favor a **150–300-word pulse** for narrow news; no filler. State change, evidence, population/setting, limitations and reader evaluation consequence. Place material contradictions and corrections **in visible prose**, not only metadata. For backfills label edition date separately from real first publication, and never invent a historical publication timestamp.

Make an explicit image choice. `illustration.mode: none` is valid. For generated photos, follow the target Quiet Laboratory visual constitution/illustration skill and exact byte identity after final article text is stable: three distinct written concepts, one selected with rationale, one first candidate, genuine medical/context/crop/160px/variety review, illustration caption, hashes and review record. Never imply invented anatomy, patients, experimental hardware, measured outcomes or factual generated charts. Missing/failed declared generated imagery withholds the story; do not silently downgrade image mode. No implicit French publication.

Create the daily issue only if at least one article survives, omit empty desks, reference each story once and keep featured separate from MUST KNOW. Otherwise finalize an honest ledger-only batch with every selected record accounted for as drafted or withheld (including capacity overflow).

## E. Validate, open one draft and report exact state

Use current package scripts, run where executable: `npm ci`; `npm run editorial:check -- docs/editorial/ledgers/YYYY-MM-DD.json`; `npm run illustration:check -- docs/editorial/ledgers/YYYY-MM-DD.json`; `npm run verify`; `npm run test:e2e`. Record exact tested revision, passed/failed/not-run and evidence. Local execution unavailable is not an invented pass; structural validation never certifies source claims. Invalid core contracts or unsafe ledgers block PR creation.

Create/update **one** eligible canonical draft PR, re-querying after uncertain outcomes. Report local date/window/contract ref, lane attempts and unscreened gaps, selected/drafted/withheld/watch/rejected counts, each surviving claim's source scope and individualized score, historical duplicates/material delta, watch conditions, issue/assets/illustration decisions, overrides and actual checks. Keep ledger-only PRs under the present policy. Never mark ready or merge.

Release ownership via the contracted checkpoint; inspect exact latest-head GitHub CI (required **Verify project** and **Browser smoke and accessibility** jobs). Missing, stale, pending, cancelled and failed checks are not passes. Bounded authorized repairs stay on the same branch. Report only the real outcome: draft ready for human review; draft awaiting/unavailable checks; ledger-only draft; draft blocked by CI; blocked before PR with recoverable checkpoint; or already finalized/no-op. Human review and merge remain mandatory.
