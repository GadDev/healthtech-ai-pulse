# Scientific Source Registry, Rights and Provenance

> **Adoption status (Pulse PR 1): PROPOSED — documentation only.** No research route, API, repository, database, authentication provider, hosted workspace or model deployment is established by this document. The existing Pulse editorial policy and executable contracts remain authoritative for journalism and releases.

**Status:** Proposed hybrid v0.2 · **Source and rights checks reviewed:** 2026-10-21 · **Owner:** Maintainer.

## Source policy
Primary source in MVP: **Europe PMC REST API**, read via server-side API adapter. It supports publication metadata, abstracts and full-text links. Europe PMC exposes Open Access subset full text as XML, but **open access is not a blanket authorization for all copying, redistribution or derived services**: check applicable license and terms for each item.

Secondary source (on-demand enrichment): **Crossref REST** for DOI metadata and update status, subject to provenance and abstract copyright limitations. Trial registry entries from **ClinicalTrials.gov API v2** are a later, separate entity type; a registered trial is not equivalent to a published paper or positive result.

## Source matrix
| Source | MVP use | Caveat / gate |
|---|---|---|
| Europe PMC `search` | Search + bibliographic metadata | Source identity, request timestamp, result caps, dedup; incomplete coverage disclosed |
| Europe PMC abstracts | Evidence passages **where rights permit** | Mark abstract-only; do not extrapolate beyond provided text |
| Europe PMC OA fullTextXML | Conditional, later | Inspect per-work license and downstream reuse permissions before storing body |
| Crossref | DOI, published metadata, corrections/updates on demand | Polite user agent/contact, caching, API headers/backoff; some abstracts are copyright-protected |
| ClinicalTrials.gov v2 | Post-MVP clinical trial discovery | Trial registry record is not a clinical outcome; dedicated schema and evaluation |
| Publisher PDFs/full text | Out of MVP | Never bypass paywalls or scrape/copy protected material |
| HealthTech AI Pulse article metadata | Read-only deep-link of **already verified public DOI/PMID/PMCID**, where present | Same user-facing site, **different authority**: editorial source IDs are navigation hints, not evidence approvals; no automated article creation |

## Cross-product provenance boundary
An existing editorial article can offer the new `/research/?doi=...` entry point if its existing verified metadata supports that identifier. The Research API must independently retrieve and check its own source records and rights before showing evidence. **Do not infer that a Pulse editorial claim is scientifically verified for AI synthesis merely because the publication linked to a paper.** The API has no editorial write access; a draft research brief cannot become a news article without the existing Pulse review process.

## Operational requirements
1. Persist original provider ID, source URL, retrieval time, access level, rights verdict, publication status and raw metadata hash.
2. Resolve canonical DOI/PMID/PMCID and aliases, preserve conflicts and version history.
3. Treat corrections/retractions as **unknown** unless specifically verified. No inference from missing source fields.
4. Rate-limit, paginate bounded results, identify the application via an appropriate contact, cache and honour 429 backoff; do not hardcode upstream quotas as permanent guarantees.
5. Do not store full text when license metadata is missing or undecided. For permitted text, retain the license identifier and an auditable basis for access.
6. Never show an API timeout as a scientifically meaningful zero result.
7. Store source-specific locators, and show whether a quotation comes from abstract, section or full text.
8. Validate that excerpts are reproducible from stored permitted snapshots and hashes.
9. Any externally shared research brief contains original source links, time inspected, scope/access caveat, model disclosure, and reviewer state.

## Evidence grading: separate dimensions
Record independently: publication/preprint status; study design; sampled population/dataset; internal vs external validation; intervention/comparator; endpoints; funding/conflicts; limitations; correction/retraction check. Do not collapse everything to one deceptive numerical 'scientific truth score'. If a field is not in inspected text, say `not reported in inspected material`.

## Rights decision flow
`metadata -> license/access inspection -> permitted snapshot -> passage extraction -> citation`. Unknown/prohibited rights -> metadata and source link only; do not create passage content from disallowed text. Domain and per-item terms are re-evaluated before commercial expansion.

## References
- https://europepmc.org/RestfulWebService
- https://europepmc.org/developers
- https://www.crossref.org/documentation/retrieve-metadata/rest-api/access-and-authentication/
- https://support.crossref.org/hc/en-us/articles/214320426-REST-API
- https://www.nlm.nih.gov/pubs/techbull/ma24/ma24_clinicaltrials_api.html
