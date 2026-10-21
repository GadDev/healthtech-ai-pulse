# Architecture Decision Log — Hybrid Revision

> **Adoption status (Pulse PR 1): PROPOSED — documentation only.** No research route, API, repository, database, authentication provider, hosted workspace or model deployment is established by this document. The existing Pulse editorial policy and executable contracts remain authoritative for journalism and releases.

**Status:** All decisions proposed for maintainer approval; no code or deployed service implied. Supersedes v0.1 standalone assumptions in the original kit.

| ID | Status | Proposed choice | Rationale / reopen trigger |
|---|---|---|---|
| D-001 | Proposed — **revised** | **One Pulse public frontend; separate Research API repo and independent deployment** | Shared brand and readers without coupling secrets, persistence, performance or releases. Revisit if independent commercial branding is validated. |
| D-002 | Proposed — **revised** | Astro static page + `@astrojs/react` island under `/research/` | Existing site already Astro; no redundant separate Vite SPA. Revisit for complex client requirements. |
| D-003 | Proposed | Europe PMC as P0 scientific source | Metadata and public coverage; Crossref enrichment optional. |
| D-004 | Proposed | Rights-aware abstract-first evidence corpus | Prevent full-text licensing mistakes. |
| D-005 | Proposed | Deterministic retrieval + bounded Claude structured synthesis | More testable than generic agents. |
| D-006 | Proposed | Lexical baseline before embeddings/pgvector | Measure rather than assume vector quality gain. |
| D-007 | Proposed — **revised** | Local fixture mode → explicit API origin → auth-secured hosted beta | Avoid production costs/security exposure before evidence. |
| D-008 | Proposed | Human review for research exports; never auto-publish Pulse stories | Scientific and editorial boundary. |
| D-009 | Proposed | No patient records, advice or systematic-review claim | Safety / product-purpose boundary. |
| D-010 | Proposed | Topic monitoring after MVP and user discovery | Avoid unproven operational load. |
| D-011 | Proposed — **new** | Versioned `/v1` HTTP/OpenAPI contract; no cross-repo build dependency | Separate deploy/rollback, compatibility verification. |
| D-012 | Proposed — **new** | Verified public paper IDs only in article deep links | No private data or inferred evidence claims on editorial pages. |
| D-013 | Proposed — **new** | API available directly via HTTPS initially; optional Hosting rewrite later | Avoid premature Firebase/Cloud Run billing and routing coupling. |
| D-014 | Proposed — **new** | Research API cannot write to Pulse editorial repository or deploy Pulse | Enforce technical ownership, not only policy. |
| D-015 | Proposed — **new** | Auth provider and host region decided by priced privacy/security ADR before beta | Supabase Auth/Postgres EU and Cloud Run are candidates, not commitments. |

## Open questions before coding
1. Is `/research/` the chosen public path? Proposed default yes.
2. Which Pulse article metadata field provides DOI/PMID/PMCID reliably? Inspect current actual story contracts before code; **do not invent a new field or bulk-edit all stories without verification**.
3. How will local frontend call fixtures vs localhost API, and how will preview builds avoid production billing?
4. What is the staged deployment budget/limit and approved auth/region/provider choice?
5. Are modifications to the current publication visual constitution needed for research-only UI, or is reusing existing tokens enough?

## Change record template
`YYYY-MM-DD — D-XXX — Decision/adoption status — alternatives/evidence — affected repositories/docs — reviewer/PR`.

## M0 adoption addendum — 21 October 2026 (proposed, pending PR review)
- **D-08 public link identity:** version `research-link-v1` independently from `api-v1`; only public DOI, PMID, PMCID links, strict one-key grammar. DOI/PMID are currently in candidate ledgers, not published story frontmatter. No automatic PMCID generation or URL heuristics.
- **D-09 Pulse compatibility:** existing `docs/TECHSTACK.md` no-React/no-accounts decision remains valid for public editorial pages; a feature-local `/research/` React island is a proposed narrow exception requiring separate code PR and performance/CI review.
- **D-10 deployment/cost:** fixture preview is mandatory by default, no preview production model API calls. No new API repo, cloud billing, hosting, auth provider, or secret scope is adopted by this docs change.
- **D-11 verified source:** Pulse `main` checked 2026-10-21: `astro.config.mjs` MDX/sitemap, `firebase.json` static Hosting, story Zod schema strict; `src/layouts/BaseLayout.astro` owns navigation and `tests/e2e/publication.spec.ts` covers width/a11y. Recheck precise revisions and successful tests in implementation PR.
