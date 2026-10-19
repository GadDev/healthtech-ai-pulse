# HealthTech AI Pulse — Editorial policy

Version: healthtech-1.0. This is the single normative editorial rulebook. CONSTITUTION.md governs mission; docs/CONTENT_MODEL.md and machine contracts express these rules structurally. Daily runs cannot change this policy.

## Reader promise and scope

Answer: what changed, what supports it, where does it apply, what remains uncertain, and what should a professional investigate next? Recommendations are about research and evaluation, never patient-specific treatment.

Assign exactly one primary desk by the main new contribution; add controlled topics without duplicating a development across desks.

| Desk                   | Coverage                                                                                                  |
| ---------------------- | --------------------------------------------------------------------------------------------------------- |
| clinical-ai            | Diagnostics, imaging, prediction, clinical decision support and care delivery evidence                    |
| health-systems         | Operations, workflow, digital health, medical devices and implementation                                  |
| pharma                 | Discovery, preclinical development, clinical trials, manufacturing quality and pharmacovigilance using AI |
| biomedical-foundations | Biomedical models, datasets, benchmarks, methods and reusable research tools                              |
| safety-policy          | Safety signals, regulation, governance, evaluation requirements and consequential adoption constraints    |

One development is not multiple stories because it fits multiple desks. No desk quota. A safety withdrawal takes safety-policy as its primary desk, even if the underlying device is an imaging model.

For non-AI stories, require all three: (1) a direct connection to a named covered workflow or technology class; (2) a material change in evidence, safety, access, data infrastructure, or operating requirements; (3) a useful consequence for the primary audience. Record the connection and consequence. Examples in scope: an interoperability rule materially affecting clinical AI integration, or a validation failure of a drug developed using AI when the AI contribution is documented. Examples outside: an unrelated drug approval, generic hospital digitisation, a funding round without substantiated operational change, and a fashionable wellness gadget. General biomedical advances do not automatically qualify.

## Research windows, source portfolio and dates

Use Europe/Luxembourg for editorial_date and the runtime clock for actual timestamps. On the first run search the preceding 72 hours. Thereafter search from the last completed research cutoff with a 24-hour overlap, looking back at most seven days automatically. If the gap is longer, report incomplete catch-up and request a separately scoped catch-up; never claim comprehensive coverage. Sweep outstanding watch items and corrections/retractions from the preceding 30 days. Older evidence may supply context or justify a clearly labelled catch-up only when its late discovery is materially important; it is not new today. Record why_now and late_discovery separately. Never assign today's date to an old event.

Separate event_date, source_publication_date, source_updated_at when available, discovered_at and editorial_date. Unknown dates are null with a reason; imprecise dates retain their precision and are not silently converted to exact days. Exclude future scheduled events from completed-event claims.

Use PubMed and Europe PMC for discovery; inspect papers and supplements at publisher or lawful repositories. Check medRxiv, bioRxiv and relevant arXiv work with explicit preprint labels. Search ClinicalTrials.gov and EU CTIS when relevant; a registration proves a registered record, not completed recruitment, successful results, authorization or patient benefit. Consult FDA decision documents/databases and safety notices; EMA, European Commission/EUR-Lex and applicable national authorities; MHRA and other regulators for the stated jurisdiction. Device claims need the relevant device authority or documented conformity-assessment evidence, not an assumption that EMA authorizes devices. For adoption inspect hospital, health-system or trial-owner accounts; distinguish them from supplier publicity. For tools inspect versioned repositories, model/data cards, licenses and release documentation.

Secondary specialist reporting helps discover leads and contradictory findings. Social posts and search snippets are leads, not sufficient evidence for central claims. Search across clinical, operational, pharma and policy sources; log queries, time windows and coverage gaps, including unsuccessful searches. Do not promise exhaustive surveillance.

## Claim-specific evidence

Record multiple dimensions rather than assigning all developments one evidence rank:

| Claim                                 | Required evidence and boundary                                                                                                                                                                                                        |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Product/tool became available         | Inspect release/artifact and intended users, version, access, licensing and limitations. A vendor is a valid source for its announcement, not proof of effectiveness.                                                                 |
| Model predicts/classifies well        | Study design, dataset/population, evaluation unit, sample size, comparator, endpoints, metrics with denominators and uncertainty, leakage/split design, externality, calibration where relevant, bias and applicability.              |
| Workflow improves                     | Site/workflow, prospective versus retrospective design, comparator, time period, adoption/adherence, workload, operational endpoints, harms and causal limitations.                                                                   |
| Patients benefit                      | Evidence measuring a relevant patient outcome, comparator, follow-up, harms and design supporting the actual causal wording. Accuracy or time saved alone is insufficient.                                                            |
| Drug discovery/development progresses | AI contribution, biological validation stage, molecule/target identity, experimental comparator, reproducibility, clinical phase, registry/result alignment and endpoints as applicable. In silico success is not efficacy in humans. |
| Regulatory action occurred            | Issuing body, jurisdiction, official document ID/URL, exact status and wording, decision/publication/effective dates where relevant, product/version, intended use, population and restrictions.                                      |
| Safety event or contradiction         | Underlying report type, denominator/exposure if known, adjudication/causality limits, duplicates and contradictory evidence. Reports alone do not establish incidence or causation.                                                   |

Source publication_status distinguishes preprint, peer-reviewed original research, systematic review, trial registry, posted trial results, regulatory record, company announcement and implementation report. Systematic reviews require search cutoff, eligibility, included studies, heterogeneity and relevant risk-of-bias limitations; pooling weak/incompatible studies does not make a claim strong. Trial registration, conference abstract, interim results, full results and peer-reviewed report are separate states of the same research identity.

study_design distinguishes retrospective evaluation, external validation, prospective silent evaluation, prospective interventional study, randomised trial, systematic review and nonclinical experiments as relevant. External validation records whether it is temporal, geographic, institutional or otherwise independent; it is not synonymous with an independent research team. Record independent_validation separately. clinical_utility is not-assessed, measured-no-demonstrated-benefit, demonstrated-in-studied-setting or uncertain, with its endpoint and rationale. No study design automatically guarantees benefit or portability.

For research, capture design, setting, population/dataset, patients and other evaluation units separately, sample sizes, comparator, prespecified primary endpoints, secondary/exploratory endpoints, results, effect scale, absolute/relative changes where reported, uncertainty, follow-up, adverse outcomes, limitations and applicability. Use not-reported or unavailable with a reason; use not-applicable only when genuinely irrelevant. Do not infer denominators from images or combine patient and encounter counts.

Check subgroup coverage, exclusions, label/reference standard quality, missing data, patient/site overlap, threshold selection, training/test contamination and protocol/analysis changes when relevant. For generative models examine task construction, human evaluation, factual errors, unsafe outputs and deployment constraints. For implementation consider automation bias, workflow dependence and monitoring. For pharma separate target identification, experimental confirmation, preclinical results, clinical outcomes and postmarketing evidence. Avoid attribution of a drug's entire success to AI from a company slogan.

For each material claim, store a source ID and section/page/table or registry/decision field locator, what was actually inspected, supported wording, and limitations. Record funding and conflicts as reported, unknown or unavailable; no declaration found does not mean no conflict. Check source correction/retraction notices and related trial identifiers. Report contradictory evidence with its design and relevance; do not average incompatible findings into a confidence score.

Access is full-text, abstract-only, registry-only, official-record-only, artifact-only, announcement-only or unavailable. Record the specific page/artifact and missing underlying documents. Say so visibly in the article. An abstract may support a narrowly attributed abstract-level finding if the reported information is sufficient for that bounded claim; do not imply a methods audit or clinical utility assessment. If missing details make even that statement misleading, watch or withhold. An official regulatory record or launch notice can adequately support the action/availability claim without a research paper.

Use TRIPOD+AI and DECIDE-AI as relevant extraction/reporting aids, not certification or automatic quality scores. They address prediction-model reporting and early live clinical evaluation respectively. Check the applicable current guidance at use time.

## Scoring and gates

Score each dimension 0–4 with a written rationale. Weights: practical significance S=30%, claim support E=30%, audience relevance R=25%, material change M=10%, durability D=5%. Total = 25 × (0.30S + 0.30E + 0.25R + 0.10M + 0.05D), rounded to one decimal. Keep the five inputs; the total is a ranking aid, not a probability or clinical recommendation.

| Dimension              | 0                         | 2                                               | 4                                                               |
| ---------------------- | ------------------------- | ----------------------------------------------- | --------------------------------------------------------------- |
| Practical significance | No meaningful consequence | Useful narrow evaluation/monitoring consequence | Consequential safety, evidence or operating change              |
| Claim support          | Central claim unsupported | Traceable but materially limited                | Directly inspectable evidence well matched to the bounded claim |
| Relevance              | Outside audience/scope    | Relevant subgroup                               | Clear decision consequence for primary readers                  |
| Material change        | Duplicate/no delta        | Incremental useful change                       | Important new evidence or decisive change                       |
| Durability             | Fleeting attention        | Useful for weeks                                | Persistent evaluation or operating consequence                  |

Scores 1 and 3 sit between adjacent anchors. A regulator's official record may score E=4 for a decision-status claim; a vendor announcement can score E=4 for artifact availability and E=0 for an unsupported patient-benefit claim. Peer review, large sample size, benchmark leadership, fundraising and prestige receive no automatic points.

Selection requires scope fit, material novelty, traceable central claims, bounded language, adequate evidence to interpret the claim, and cleared contradiction/deduplication gates. Default selected threshold: 75 with S≥2, E≥2, R≥2 and M≥1. 55–74.9 is normally watch; lower is normally reject. A failed hard gate overrides any score. A high-scoring candidate can still be watch if essential methods or contradictory evidence remain unresolved. Every watch record has a concrete promotion condition and next review date, normally seven days; expire after 30 days without progress while preserving the record. Reject duplicates, unsupported efficacy marketing, untraceable metrics, irrelevant funding and speculative conclusions. Do not select rumours for variety.

Illustrative scores, not real scientific findings:

| Example                                                                  | S/E/R/M/D | Total | Decision                                                                 |
| ------------------------------------------------------------------------ | --------- | ----: | ------------------------------------------------------------------------ |
| Official withdrawal affecting a covered tool, exact record inspected     | 4/4/4/3/4 |  97.5 | Selected; possible MUST KNOW                                             |
| Transparent useful retrospective benchmark, restricted to that dataset   | 2/3/3/2/3 |  65.0 | Watch under pilot capacity; not dismissed merely for being retrospective |
| Vendor launch with inspectable artifacts and material workflow relevance | 3/4/3/2/2 |  78.8 | Selected for availability only                                           |
| Same launch plus unsupported patient-benefit headline                    | 4/0/4/3/3 |  66.3 | Reject that claim; score never repairs absent support                    |
| Funding announcement without verified workflow/evidence change           | 1/3/1/1/1 |  40.0 | Reject as low significance                                               |

At most one MUST KNOW per edition: total≥90, S=4, E≥3, an explicit consequential reason and no unresolved central uncertainty. Preliminary efficacy claims cannot acquire MUST KNOW merely through novelty. A verified urgent safety notice can qualify without a clinical trial. If the designated story is withheld, clear its publication mapping without promoting a replacement automatically.

## Deduplication and decisions

Check all merged ledgers, current and older unmerged daily PR ledgers, canonical stories, issue manifests and candidate history. Match canonical URLs plus DOI/PMID, preprint versions, trial IDs, regulator decision IDs, product/version, underlying cohort and event. Preserve meaningful URL parameters; remove tracking, not identity. A press release, paper, registry update and news report may describe one development. Watch/rejected mentions do not count as already published, but remain research history.

Material deltas include a genuinely new population/endpoint, external validation, full results replacing an abstract, an actual regulatory decision, a safety correction, or verified deployment outcomes. Journal publication of the same unchanged preprint is a status update, usually watch/context, not automatically a new article. Record previous candidate/story IDs and the exact new consequence. A changed headline, URL or syndication is not novelty.

Store selected in candidates, watch in watchlist and rejected in exclusions, with disjoint IDs. Publication verification records verified, verified-with-claim-scope, conflict or source-unavailable separately from research decision. A selected item later contradicted stays selected in research history and is withheld downstream. Human overrides are explicit events with actor, real timestamp, scope, reason and previous state; no override permits fabricated claims or bypasses evidence gates. Promoting a prior watch record creates a new dated selected record with links to its prior decision, rather than rewriting the old ledger.

## Article structure and presentation

Default 400–700 words, shorter when enough. Title states the bounded development, not an unsupported outcome. Include:

1. What changed, dated and attributed.
2. Evidence at a glance: publication/source type, study design, validation setting, clinical utility, independence and access.
3. Findings in context: population/dataset, comparator, endpoints and results, with units/uncertainty when relevant.
4. What this does not establish: central limitations, applicability and contradictory findings.
5. Practical significance: what a professional should inspect, evaluate locally, or watch; editorial interpretation labelled.
6. Primary sources and exact claim locators, funding/COI and update/correction notes.

For regulation substitute action, jurisdiction, status, intended use and dates for inapplicable clinical study fields. For software include availability, version and license. No filler headings or repeated boilerplate. Source labels must not disguise sponsor relationships. Charts use source data and methods; illustrations have no evidentiary status.

## Publication, corrections and readiness

Pilot: zero to two articles per daily research run. Selected overflow is held for capacity with the decision preserved; it is not silently rejected. Publication requires cleared source/deduplication gates, complete relevant evidence fields, consistent metadata, and assets/locales required by the actual target contracts. English-only with illustration.mode=none is valid. Missing declared generated assets withhold the affected story; no broken references. Optional French may be absent with a recorded reason. A required locale introduced later blocks only the applicable story until satisfied.

If no stories survive, create a ledger-only draft PR; no issue or artificial featured story. All selected records must be accounted for as drafted or withheld. Blocked candidates do not prevent a valid ledger-only recovery PR when the ledger truthfully records the failures and itself validates. Unsafe or unverifiable ledger structure blocks any PR; preserve the checkpoint separately and report its location.

Human merge is final publication approval and requires passing target checks. Automated runs always leave PRs draft. Source changes before merge require renewed verification of the affected claims and stale-image/translation checks. Recheck source notices during preparation and on the next scheduled run while the PR awaits review. Before merging an older PR, the maintainer rechecks material source status.

After publication, a meaningful error receives a correction PR, updatedAt, visible dated correction and linked ledger amendment; do not overwrite the original research history. A retraction or material safety conflict requires a prominent caution or withdrawal assessment; preserve the URL and explanation where possible. Confirmed serious errors take precedence over routine output. Record actual review and response times; the daily task does not provide continuous safety surveillance.
