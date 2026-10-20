# Bounded news discovery

Operational guidance under [EDITORIAL.md](../EDITORIAL.md), contract `healthtech-1.0`.
This expands retrieval and makes unfinished research visible. It does not change
the five desks, 75-point selection threshold, evidence gates or two-story pilot cap.

## Plan before searching

Use the policy's initial 72-hour window, then the last completed research cutoff
with 24-hour overlap and at most seven days of automatic catch-up. Record longer
gaps. Review due watch items and relevant corrections within the 30-day horizon.
An older material discovery needs an explicit `why_now` and `late_discovery`;
index arrival, journal issue dates and a new headline do not make an old result new.

Plan 30 minutes for discovery, then up to 20 minutes of routine verification per
shortlisted candidate before checkpointing unresolved work. These are planning
budgets, not promises that execution can finish in that time. Renew ownership
before expiry. Stop expanding at the budget and report the unsearched remainder;
do not stop discovery just because one attractive story was found.

Attempt all five lanes. A lane needs a recorded query or direct inspection outcome,
including unsuccessful access; it never needs a selected story. A blocked lane does
not block an unrelated verified story. An unattempted lane remains a coverage gap.

| Lane                                  | Concrete work                                                                                                                                                                                             |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Research and evaluation               | Desk-specific PubMed/Europe PMC searches plus at least one direct journal or publisher listing check. Follow primary papers and relevant supplements.                                                     |
| Safety and official actions           | A European authority scan and relevant FDA records/notices; retain jurisdiction, exact action/status and dates. Use EMA for medicines-related work, not as the general EU device authorization authority. |
| Deployment and operations             | Two accessible specialist reporting sources with different coverage. Follow useful leads to hospitals, trial owners, original investigations or artifacts. Count multiple sections of one outlet once.    |
| Biomedical and pharma engineering     | Relevant models, datasets, repositories, biological validation and trial results. A sponsor milestone needs a documented AI contribution and support for its actual stage.                                |
| European and local-language discovery | One rotating French/German or other relevant regional query. Rotate Luxembourg and neighbouring-country sources over the week without geographic publication quotas.                                      |

## Queries and retrieval

Combine AI terms with desk/workflow terms instead of using only three generic
phrases. Query ingredients include:

- AI: artificial intelligence, machine learning, deep learning, foundation model,
  generative model, language model, transformer, NLP and clinical decision support.
- Clinical/operations: diagnostics, imaging, validation, EHR integration, ambient
  documentation, workflow, procurement, monitoring, rollback and implementation.
- Biomedical/pharma: protein/molecule design, target discovery, biological
  validation, preclinical evidence, trial results, biomedical data and research tools.
- French: intelligence artificielle, IA clinique, déploiement, évaluation, incident,
  données de santé. German: künstliche Intelligenz, Klinik, Validierung, Sicherheit,
  Gesundheitsdaten. Adapt syntax to the source; these are ingredients, not
  prevalidated database expressions.

Always attempt a negative/contradictory-evidence query: null results, no benefit,
failed external validation, harms, withdrawal, recall, retraction, bias, drift,
hallucination, automation bias or abandoned deployment. A query is not evidence
that an incident occurred. A negative finding needs the same denominator,
applicability and causality care as a positive one.

Use explicit ordering and pagination where the source supports them. Europe PMC's
[REST documentation](https://europepmc.org/RestfulWebService) describes relevance as
the default ordering; the first page is not a chronological or representative
sample. Split oversized searches by desk/date/topic or page within budget.
Record the unscreened remainder and a recoverable query/page position.

Use complementary indexing/entry-date discovery where supported, then inspect the
original publication date. [PubMed date fields](https://pubmed.ncbi.nlm.nih.gov/help/)
distinguish publication, entry and creation. A newly indexed old paper may justify
late discovery; it does not acquire a new event date. Inspect current API syntax
before constructing a query; do not invent fields or RSS endpoints.

## Record coverage using the existing schema

Use `research.query_log` entries with exact query/source, actual access time and
an outcome stating the lane, sort/page or cap, and work completed. When measured,
separate hits, retrieved records, screened records and primary inspections. Use
`unknown` with a reason when a count was not measured. Never equate retrieval with
screening or methods appraisal. Keep unattempted lanes and unfinished pages in
`coverage_gaps`; do not add unsupported fields to the strict ledger.

`research.completed_at` is the actual time the bounded planned search finished.
A completed plan accounts for each lane/window with a search/access outcome and
its declared bounds; it does not require exhaustive literature surveillance or
full verification of every discovered lead. If a planned lane/window was not
attempted or an agreed page sequence is unfinished, completion remains null.
Reported access failures and intentionally bounded retrieval can complete the
plan while remaining explicit gaps. Do not advance the cutoff across unattempted
coverage. Preserve historical null cutoffs rather than fabricating past completion.

`last_completed_cutoff` records the previously completed window end used to start
this run, not this run's completion time. A later run uses the latest valid
completed record's `window_end`, including relevant unmerged ledgers, with overlap.
Check actual completion and gaps; a finalized publication is not automatically a
completed research window. If no usable completed record exists, use the initial
window and explicitly name any older uncovered interval instead of silently
claiming catch-up. Per-lane machine cursors require a separate schema change.

Keep unresolved evidence, access failure, unclear novelty, low value and capacity
as distinct reasons. Use candidate-specific score rationales. Watch records may
have `editorial_score: null` when essential inspection is unfinished; concrete
promotion conditions and next-review dates remain required. Do not copy a default
57.5 score into unrelated records to imply completed appraisal.

Internal double screening, external validation data and independent replication
are different facts. State replication/independence first in its evidence field;
put internal screening procedures in study-design/methods context. Use the existing
short `pulse` format when sufficient; do not inflate it to reach a word target.

## Seven-day shadow comparison

Before changing eligibility, replay 13–19 October 2026 read-only with equal recorded
discovery and verification budgets. A uses the captured current process; B uses
these source lanes and retrieval rules with the same 75-point gate. Separately
compare the same adequately inspected candidate union with a hypothetical ≥65
short-pulse threshold and E≥3, retaining all hard gates. That third comparison is
not permission to write selected records that fail the current validator.

The inspected baseline contains two selected/drafted stories, twelve watch records
and six exclusions (twenty records, eighteen stored event keys). It is not twenty
unique news developments. The review found four additional traceable leads:
[EHR transparency](https://www.nature.com/articles/s41746-026-03152-w),
[foundation-model bias](https://www.nature.com/articles/s44528-026-00041-2),
[FedFound](https://www.nature.com/articles/s41746-026-03281-2) and
[ActiNet](https://www.nature.com/articles/s41598-026-65900-y).
Their absence from inspected ledgers is not proof that no worker ever saw them.
No additional article was certified publishable and no controlled A/B replay or
human effort measurement has been completed.

Measure distinct developments/source lanes, accepted useful stories, relative
misses between arms, material claim errors, actual maintainer review minutes and
failure reasons. Keep A and B search and verification budgets comparable, document
their actual durations, source snapshots/access failures, and search order or
shared-knowledge effects. Have the maintainer assess anonymized candidate summaries
and source support before adopting any threshold change. A provisional signal that
the broader rotation merits adoption is two or more additional useful leads across
the seven days without losing baseline strong stories or introducing material
unsupported claims. Record the fully inspected denominator: more leads alone do
not prove more publishable stories. Do not invent total-news recall, publication
yield or a review-time speedup percentage.

## Source catalogue

The following catalogue is the single repository home for the discovery entry
points previously embedded only in the installed task. It is non-exclusive,
not an allowlist, not a fetch quota and not a quality guarantee. Apply the bounded
rotation above; source-specific provenance/access rules below remain in force.

### Catalogue use

Use the following non-exclusive source catalogue. The user-supplied regular entry points are Life Science Daily, Fierce Healthcare (homepage plus https://www.fiercehealthcare.com/ai-and-machine-learning and https://www.fiercehealthcare.com/digital-health), FirstWord HealthTech and MedTech Dive (https://www.medtechdive.com/, scope at https://www.medtechdive.com/about/). Continue independently finding additional suitable sources; this catalogue is not an allowlist, a guarantee of article quality, or a quota.

Prioritise targeted PubMed/Europe PMC searches, relevant official safety/regulatory updates and a manageable mix of specialist reporting (Fierce Healthcare, MedTech Dive, FirstWord, MobiHealthNews, Healthcare IT News, Digital Health and TICsanté). Use the remaining journal, specialist, technical and regional sources according to the desks, live leads and available budget; rotate secondary discovery coverage rather than requiring every site to be fetched on every run. Record actual coverage and unsearched areas. Do not broaden the editorial scope or increase the existing story capacity to fill source quotas.

### Specialist reporting

- Fierce Healthcare: https://www.fiercehealthcare.com/ — Healthcare AI, care delivery and digital-health reporting; also inspect /ai-and-machine-learning and /digital-health; one outlet.
- FirstWord HealthTech: https://firstwordhealthtech.com/ — Health technology reporting and analysis; distinguish journalism from syndicated announcements; check article access.
- MedTech Dive: https://www.medtechdive.com/ — Devices, diagnostics, AI, recalls and regulation; publisher scope: https://www.medtechdive.com/about/; distinguish editorial, Studio and press releases.
- Healthcare Dive: https://www.healthcaredive.com/ — Provider/payer operations and health IT; require a consequential AI/workflow connection.
- BioPharma Dive: https://www.biopharmadive.com/ — Drug-development and trial reporting; restrict to relevant AI-enabled developments.
- MobiHealthNews: https://www.mobihealthnews.com/ — Digital health and clinical AI; include EMEA coverage.
- Healthcare IT News: https://www.healthcareitnews.com/ — Clinical systems, implementation and interoperability; include EMEA coverage.
- Digital Health: https://www.digitalhealth.net/ — UK/NHS health IT, implementation, policy and AI.
- STAT: https://www.statnews.com/ — Health-tech, biotech and investigative reporting; some content requires subscription.
- Reuters: https://www.reuters.com/ — International original reporting, investigations and major regulatory developments; assess access per article.
- Fierce Biotech: https://www.fiercebiotech.com/ — AI drug discovery, research tools and trial developments; filter out unrelated funding.
- Fierce Pharma: https://www.fiercepharma.com/ — AI in pharma operations and development; filter unrelated business coverage.
- TICsanté: https://www.ticsante.com/ — French health IT, implementation and public policy; access may be limited.
- MedCity News: https://medcitynews.com/ — Health innovation and adoption; distinguish reporting, contributed opinion and promotional material.

### Research discovery, journals and synthesis

- PubMed: https://pubmed.ncbi.nlm.nih.gov/ — Bibliographic discovery; indexing/abstracts do not imply free full text or certify study quality.
- Europe PMC: https://europepmc.org/ — Literature and available full text; distinguish indexed preprints from journal publications.
- npj Digital Medicine: https://www.nature.com/npjdigitalmed/ — Digital medicine, clinical AI validation and implementation.
- The Lancet Digital Health: https://www.thelancet.com/journals/landig/home — Digital-health research, evaluation and clinical evidence.
- NEJM AI: https://ai.nejm.org/ — Clinical AI research and evaluation; check full-text access.
- JAMA Network: https://jamanetwork.com/ — Clinical trials, health services and AI evaluations; distinguish original research from editorials/news.
- BMJ Digital Health & AI: https://bmjdigitalhealth.bmj.com/ — Digital-health and AI research, governance and implementation.
- Radiology: Artificial Intelligence: https://pubs.rsna.org/journal/ai — Medical imaging AI evaluation and methods.
- Nature Medicine: https://www.nature.com/nm/ — Translational and clinical evidence.
- Nature Biotechnology: https://www.nature.com/nbt/ — Biomedical methods, models and biotechnology.
- Journal of Medical Internet Research: https://www.jmir.org/ — Digital-health intervention and implementation research; classify study type.
- JAMIA: https://academic.oup.com/jamia — Clinical informatics, EHR integration and evaluation.
- PLOS Digital Health: https://journals.plos.org/digitalhealth/ — Digital-health research, equity and evaluation.
- Cochrane: https://www.cochranelibrary.com/ — Systematic reviews and evidence synthesis; examine review date and underlying studies.

### Early research and trial records

- medRxiv: https://www.medrxiv.org/ — Unreviewed health-science preprints; inspect version, later publication, withdrawals and caveats.
- bioRxiv: https://www.biorxiv.org/ — Unreviewed life-science preprints; same version/withdrawal checks.
- arXiv: https://arxiv.org/ — Early ML/biomedical methods; not peer-reviewed by arXiv; methods/benchmarks do not establish patient benefit.
- ClinicalTrials.gov: https://clinicaltrials.gov/ — Registered protocols, status and posted results when present; registration is not evidence of benefit.
- CTIS public portal: https://euclinicaltrials.eu/ — EU/EEA medicinal-product trial records/results when available; not a comprehensive standalone-device trial registry.
- ISRCTN: https://www.isrctn.com/ — Clinical-study registration and linked results; check actual results and reporting status.

### Public authorities, assessment and governance

- FDA: https://www.fda.gov/medical-devices/artificial-intelligence-enabled-medical-devices/list-artificial-intelligence-enabled-medical-devices — AI-device records, underlying authorization summaries, guidance, safety notices and recalls; distinguish clearance/approval/designation and reported events from established causation.
- EMA: https://www.ema.europa.eu/ — Medicines, AI in medicines development, safety and trial-related records; do not present EMA as the general EU medical-device market authorization body.
- European Commission DG SANTE: https://health.ec.europa.eu/ — eHealth/EHDS and medical-device/MDCG policy: /ehealth-digital-health-and-care_en and /medical-devices-sector_en.
- EUR-Lex: https://eur-lex.europa.eu/ — Authoritative EU legislative texts; distinguish proposal, adoption, entry into force and application dates.
- MHRA: https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency — UK device/medicine regulation, software guidance and safety notices.
- NICE: https://www.nice.org.uk/ — HealthTech assessments and recommendations; distinguish conditional early use, evidence generation and routine adoption.
- HAS: https://www.has-sante.fr/ — French health-technology assessments and AI evaluation guidance.
- ANSM: https://ansm.sante.fr/ — French medicine/device safety and regulatory information.
- BfArM / official DiGA directory: https://diga.bfarm.de/de/ — German digital-health application listing and assessment; retain exact listing status, date and indication; not all DiGA use AI.
- WHO: https://www.who.int/health-topics/digital-health — Global digital-health and AI governance guidance; guidance is not product authorization or trial evidence.
- IMDRF: https://www.imdrf.org/ — Medical-device/software regulatory convergence documents; not jurisdiction-specific product authorization.
- EDPB: https://www.edpb.europa.eu/ — EU data-protection guidance, opinions and decisions relevant to health data/AI; retain document's legal status.

### Engineering, data and regional first-party sources

- HL7 FHIR: https://hl7.org/fhir/ — Interoperability specifications; record actual version/status; a specification is not evidence of successful deployment.
- OHDSI: https://www.ohdsi.org/ — Observational health-data methods, OMOP ecosystem and reproducible studies.
- PhysioNet: https://physionet.org/ — Biomedical datasets, models, software and benchmarks; inspect provenance/licence and respect credential requirements; no patient-data acquisition for editorial work.
- Health Data Hub: https://www.health-data-hub.fr/ — French health-data projects and infrastructure; first-party project announcements require study-level corroboration for outcome claims.
- Luxembourg Institute of Health: https://www.lih.lu/en/ — Luxembourg biomedical research; trace institutional claims to papers, methods and results.
- University of Luxembourg LCSB: https://www.uni.lu/lcsb-en/ — Luxembourg systems biomedicine and research artifacts; first-party institutional evidence, not independent validation.
- Agence eSanté Luxembourg: https://www.esante.lu/ — Local digital-health infrastructure and interoperability; verify deployment scope and actual evidence.

### Conditional discovery only

- Life Science Daily: https://lifesciencedaily.news/ — Contributor and editorial material, including paid promotional formats per https://lifesciencedaily.news/faqs/. Retain as a user-requested lead source, inspect article type/author/COI and verify underlying evidence independently; not an independent-validation source merely by publication.

### Source handling

- Follow scientific/clinical leads to the underlying paper, trial results, regulatory record or artifact. Inspect primary evidence before substantive claims. Original reporting may support attributed interviews/events within its actual scope; it does not replace unavailable study results.
- Retain the discovery URL and underlying evidence URL/identifier using the existing ledger fields. Distinguish research, review, protocol, editorial, news, opinion, contributor material, sponsored content and press release. Read methods, limitations, funding/COI, corrections/retractions and relevant contradictory findings.
- A respected outlet or journal is not an automatic pass. A company/hospital/university announcement is first-party evidence of its announcement and independently verifiable actions; it is not independent validation of clinical benefit.
- Deduplicate by underlying development and original evidence. Three Fierce Healthcare entry points are one outlet. Shared press releases, syndication, common publisher groups and separate write-ups of the same paper do not constitute independent clinical validation.
- Treat Life Science Daily as conditional discovery because its FAQ describes paid promotional contribution formats. Inspect each item's provenance and use independently traceable evidence before advancing claims.
- Log inspection/access time, queries, windows and coverage gaps. Some sources are paywalled, JavaScript-dependent or intermittently inaccessible to automated browsing. Use legitimately accessible primary/full-text alternatives when available; never bypass access controls or infer results from snippets. Do not claim a site was read merely because a URL exists.
- A failed discovery entry point alone does not block unrelated verified stories. Missing central evidence, unverified deduplication or unsupported implications still require withholding under the existing gates.
- The catalogue is not a new ledger schema. Use adopted fields and honest coverage notes. Do not invent RSS/API endpoints; inspect official documentation and availability before using feeds/APIs.
