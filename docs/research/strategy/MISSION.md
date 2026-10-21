# Mission — HealthTech Scientific Evidence Intelligence

> **Adoption status (Pulse PR 1): PROPOSED — documentation only.** No research route, API, repository, database, authentication provider, hosted workspace or model deployment is established by this document. The existing Pulse editorial policy and executable contracts remain authoritative for journalism and releases.

**Status:** Proposed hybrid foundation v0.2 · **Date:** 2026-10-21 · **Owner:** Solo maintainer

## Why this exists
Scientific discoveries about AI in healthcare are fragmented across scientific databases, studies, preprints, regulators, and vendor announcements. HealthTech AI Pulse helps readers understand news and editorially reviewed developments; a reader who wants to assess the underlying evidence must currently leave the publication and build their own paper comparison. This product closes that research workflow gap.

## Mission
Turn **HealthTech AI Pulse** into a connected path from **read → investigate → inspect evidence → assemble a reviewable research brief**, without turning editorial news into unreviewed model output or implying clinical validity.

## Product shape: one experience, two systems
- **HealthTech AI Pulse (existing repository and site):** One user-facing brand, navigation, discoverability, article pages, methodology, and new `/research/` pages with a client-side interactive research workspace. Publication remains statically generated with Astro and deployed via the existing Firebase Hosting process.
- **Research API (proposed independent repository/service):** Dedicated, independently deployed TypeScript/Fastify backend for Europe PMC search/normalization, research sets, permitted evidence spans, retrieval, Claude synthesis, audits, evaluations and controlled persistence.
- **Link, not editorial takeover:** Articles may show an optional 'Explore the evidence' link carrying public DOI/PMID/PMCID or controlled topic identifiers. No news article, daily issue, editorial ledger, or publication decision is modified by research model outputs. No unattended publication or editorial write token is available to the research API.

**Repository proposal:** retain `GadDev/healthtech-ai-pulse`; create `GadDev/healthtech-evidence-api` only after design acceptance. Names are proposals, not claims of creation. The frontend may be developed in Pulse repo; a *separate frontend repository is not part of the proposal*.

## Primary users / jobs
1. **Healthcare AI engineer and technical lead:** Follow a news development into inspected papers to understand evaluation settings and limitations.
2. **Biomedical or translational researcher:** Find and compare relevant papers for a narrowly scoped question and inspect exact locators.
3. **Pharma/biotech intelligence analyst:** Save a bounded set of public scientific sources and prepare a source-grounded report for human review.

Not targeted: patients seeking medical advice, clinicians making patient-specific treatment decisions, or customers requiring validated systematic reviews.

## MVP promise
1. `/research/` is discoverable from the Pulse header and evidence-related articles without impacting static article performance.
2. Search Europe PMC with date/status/coverage disclosure; create a research set from up to 10 papers.
3. Ask a narrowly scoped question; view evidence-backed claims, exact permitted passages, limitations and missing information.
4. Review and export a research brief with provenance, machine-assessment warning, model/run metadata and review status.
5. Unavailable backend and budget-exhausted states fail gracefully, keeping all public editorial pages readable.

## Scope and boundaries
- Public literature metadata, permitted abstracts, and licensed OA text where explicit rights permit. No patient data, private clinical uploads, or arbitrary URL ingestion.
- Research assistant, **not** clinical decision support, systematic review, automated regulatory determination, or claim of comprehensive literature coverage.
- Zero- or low-cost local/fixture-first pilot. Paid API/cloud use only after explicit spend approval, risk check and a working kill switch.
- Topic monitoring and subscriptions are post-MVP, not promised in the initial release.

## Success hypotheses (test rather than assume)
- A reader can move from an eligible article to `/research/`, inspect the referenced publication, and return to the article through a stable link.
- No editorial route or publication workflow depends on Research API availability; editorial CI/release remains independently runnable.
- 100% of rendered citation IDs resolve to persisted selected-source passage locators on the evaluated demo corpus; *semantic support is a separate human-assessed metric*.
- Search errors, missing rights, contradictory results, or missing evidence lead to visible uncertainty or abstention.
- A reproducible demo, automated evaluation suite, architecture trade-off record and measured costs support the AI engineering portfolio.

## Business hypothesis (unvalidated)
The publication may drive discovery of an evidence workspace and, eventually, demand for research briefs or monitored scientific intelligence. The news desk must remain editorially independent; any commercial offering requires independent customer discovery, licensed use, privacy terms and operational support.

## Non-goals
A second content/news website; an independent research brand in MVP; automated article generation/publication; patient-level clinical decisions; full-text scraping; multi-tenant enterprise SaaS; a generic autonomous-agent framework.
