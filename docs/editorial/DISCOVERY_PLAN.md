# Bounded editorial discovery and calibration

This five-lane rotation implements the existing `healthtech-1.0` research policy without changing selection thresholds, desk IDs, evidence gates or ledger schema. [EDITORIAL.md](../EDITORIAL.md) remains normative; [ORCHESTRATOR.md](ORCHESTRATOR.md) governs safe writing and recovery.

## Five attempts per editorial run

Define the search window before retrieval: initially preceding 72 hours, then a 24-hour overlap from the last **completed** research cutoff, with a seven-day automatic catch-up maximum. Sweep due watch items and relevant corrections/retractions inside the policy horizon. Budget approximately 30 minutes for discovery and 20 minutes per shortlisted lead for routine follow-up, then record actual time and unfinished work. Budgets never turn unknown evidence into verified evidence.

| Lane | Required attempt and rotation | Search vocabulary |
| --- | --- | --- |
| Research/evaluation | Desk-specific PubMed or Europe PMC queries **and** a direct journal listing. Rotate npj Digital Medicine, Nature Medicine, JAMIA, NEJM AI, Lancet Digital Health, JAMA, PLOS Digital Health and imaging journals | Foundation/generative models, LLM, deep learning, transformers, NLP, diagnostics, decision support, external validation |
| Official safety/policy | FDA official notices/records and appropriate European actions: Commission/EUR-Lex/MDCG, MHRA, HAS/ANSM or BfArM; EMA only for relevant medicines remit | Guidance, incidents, recall, withdrawal, bias, monitoring, regulation, cybersecurity |
| Deployment/operations | Two accessible specialist reporting routes with different coverage, followed to primary hospital/health-system accounts | EHR/ambient documentation, implementation, monitoring, procurement, workload, rollback, abandoned pilots |
| Pharma/biomedical artifacts | Relevant trial, research, preprint or primary engineering source; inspect versioned repositories, models/data cards and licensing before availability claims | Molecule/protein/target design, biological validation, data/model releases, trial results, pharmacovigilance |
| European/local-language | One rotating French/German or neighbouring-region search, e.g. TICsanté, Health Data Hub, LIH/LCSB, Agence eSanté, regional authorities | IA clinique, déploiement, évaluation, incident; künstliche Intelligenz, Klinik, Validierung, Sicherheit |

Retain Fierce Healthcare (AI/digital-health), MedTech Dive, FirstWord HealthTech and Life Science Daily as user-requested **discovery entry points**, rotated with MobiHealthNews, Healthcare IT News, Digital Health and other relevant outlets. They are not daily fetch quotas or independent clinical validation. Trace important claims to the original records, identifying contributed, syndicated, promotional and sponsored material.

Make at least one intentional **negative/contradictory evidence** search for no benefit/null results, failed external transfer, harm, unsafe outputs, retraction, drift, recall, withdrawal, implementation failure or rollback. A search phrase does not prove an incident.

## Retrieval and cutoff accounting

Avoid a single broad first-page query. Split literature searches by desk, workflow, subject or date and use explicit sort order and pagination when supported. Search publication **and** complementary entry/index-date routes where possible, then verify underlying source/event dates. When a database reports more results than can be screened, preserve the exact unscreened remainder and recovery page. Distinguish **hits, retrieved, screened and primary records inspected**, using counts only where observed.

The strict ledger already has `research.query_log[]` (`query`, `source`, `accessed_at`, `outcome`), `coverage_gaps[]`, `completed_at` and `last_completed_cutoff`. Record each lane, query/window, actual source access, sort, page/offset, hit/retrieval/screen/inspection numbers, budget stop and next recovery point in these **existing fields**; do not add undeclared JSON keys. A complete cutoff means the five **bounded lane attempts for that window** were executed/closed with honest logged outcomes, **not** that all search hits were reviewed. If a planned lane/window was never attempted, leave completion/cutoff null and name the gap. Never advance across an unsearched window.

For example, `1,862 hits, first 100 retrieved, 22 titles screened, 3 originals inspected, 1,762 uncollected; page 2 next` illustrates how to report counts; it is **not** evidence of a newly executed search.

## Candidate calibration

Score only an **adequately inspected, bounded claim**, with five candidate-specific S/E/R/M/D rationales. A watch item awaiting essential methods, artifact/version comparison or access is unfinished research, not automatically a 57.5-point story. Use the existing `editorial_score: null` permission for unresolved watch items with a precise promotion condition and next review date. Distinguish evidence unresolved, access failure, unclear novelty, low significance, duplicate and capacity in reasons. Do not discard high-value watches solely because the run's time limit was reached.

Keep five desks, ≥75 selection with the existing hard gates, two surviving articles/day, no desk quotas and optional `pulse` articles (often 150–300 words for narrow developments). No threshold or capacity change is authorized by this document.

## Read-only seven-day evaluation

Replay **13–19 October 2026** without publishing, editing historical ledgers or claiming live-run acceptance:

1. **A — current baseline:** captured original discovery, unchanged ≥75 gate.
2. **B — improved discovery:** five lanes, pagination, query expansion and watch prioritization, with the *same* ≥75 gate and two-story cap.
3. **C — ranking sensitivity only:** on the adequately inspected union of A/B, **shadow-test** ≥65 for `pulse` with E≥3 and unchanged hard gates. This is not eligible for live publication.

Give A and B equivalent actual search/verification budgets (e.g. 30 minutes discovery plus up to 30 minutes verification per arm), vary or document order and shared-knowledge effects, and preserve source snapshots/access failures. Ask the maintainer to review anonymized candidate summaries. Record relative missed/added useful leads, fully assessed denominator, material errors in claims/design/dates/regulatory status/COI, lane completion, and actual human review minutes. Proposed adoption signal for B is at least two useful additional leads across the seven days without losing A's strong stories and with zero material unsupported claims; change thresholds only after separate review.

The October audit found four additional **leads**, not approved articles. It measured neither increased publication yield nor reduced human review time.
