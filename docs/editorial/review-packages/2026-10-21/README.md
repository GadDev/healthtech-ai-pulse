# Controlled on-demand editorial review — 21 October 2026

**Status:** Research and editorial-writing pilot; **not** a completed scheduled-orchestrator execution or a publishable daily issue. The canonical 21 October edition was already finalized on `main` before this work. No canonical 21 October branch, second ledger, issue or published story was created.

## Scope

This package preserves two credible, new biomedical-AI research leads and provides provisional, reader-facing articles for an editor to improve. It does **not** put these files in `src/content/stories/`, which would bypass the mandatory-photograph and publication-review requirements. It is intentionally separate from the dated daily ledger.

The current scheduler cannot be triggered immediately through the available connected task controls. The existing live automation remains enabled and was not changed. The repository's `docs/editorial/task-configuration.json` still claims "paused" and needs a separate operational reconciliation.

### Editorial candidates

1. **Clinical messages and AI metrics:** `clinical-ai-message-metrics.md`. Primary accepted research: [Hui et al., *npj Digital Medicine*, 21 October 2026](https://doi.org/10.1038/s41746-026-03211-2). New clinical-evaluation methods finding; abstract and publication/COI information inspected, but full methods were not accessible in this run.
2. **GUARD-LGG radiotherapy-response predictions:** `glioma-radiotherapy-model.md`. Primary accepted research: [Wang et al., *npj Digital Medicine*, 20 October 2026](https://doi.org/10.1038/s41746-026-03112-4). Multi-institution, prospective-test-cohort results reported; full methods/supplement could not be reviewed and no clinical benefit was established. An older 2025 conference abstract exists; publication represents a newer peer-reviewed research report rather than proof of a newly deployed system.

Both are **provisional editorial drafts**, not selected/published candidates in a canonical ledger. No fake research scores, verified claims, human sign-off, image review records or image hashes are supplied.

### Actual discovery work and source coverage

- Research/evaluation: inspected dated *npj Digital Medicine* listings and the accessible accepted-article abstracts, publication dates, DOI identifiers, funding/COI disclosures.
- Safety and regulation: checked FDA/EMA search listings and an October 21 MedTech Dive report on planned *draft* generative-AI-device guidance; no new rule or clearance can be inferred.
- Deployment: reviewed current Healthcare IT News and MedTech Dive AI coverage; the Oracle/AstraZeneca nonbinding partnership was already covered on the site and is a duplicate for publication.
- Biomedicine: evaluated GUARD-LGG and medical language metrics; earlier seizure-detector and neonatal-AI stories were found in existing merged ledgers.
- European/local-language: searched regional regulation and European-language sources, but this short pilot did not complete the repository's prescribed rotating/local-language source set or source-level method appraisal.
- Corrections/dedup: checked the existing 21 October ledger and the public paper landing pages; no exhaustive prior-history or correction search was completed.
- Access blocker: full text on the two new *Nature* pages redirected to an inaccessible login through the current web fetch; snippets/abstracts do not substitute for full method or supplement inspection.

**Research coverage is incomplete**; do not set a completed cutoff or present this as the scheduled five-lane discovery run.

### What remains before a publication PR

1. Read full methods/results/supplements from lawful accessible sources; recheck correction/retraction notices, cohort overlap, funding/COI, subgroup performance and uncertainty.
2. Reconcile the GUARD-LGG 2025 conference abstract with the final 2026 paper; distinguish preliminary and later cohorts, and assess any data leakage/external-validation limitations.
3. Re-run deduplication against all merged/open issue ledgers and official sources. Classify and score candidates under `EDITORIAL.md` and `DECISION_ENGINE_V1.md`; withhold any candidate still unverified.
4. Complete article editing and choose genuinely story-specific, medically honest photorealistic WebPs. **No artwork is approved or committed in this package.** Do not substitute illustrative screen numbers for medical results.
5. Let the canonical next edition's orchestrator or a separately approved human-led publication workflow create its one dated ledger/branch/draft PR with real image reviews, integrity SHA-256 identities and exact-head green CI.
6. Human review and merge remain mandatory.

## Operational outcome

**Partial pilot: discovery and writing completed; full end-to-end publication acceptance BLOCKED before canonical PR.** This review package is a manual, isolated handoff, not a synthetic passed CI claim or a second 21 October publication.
