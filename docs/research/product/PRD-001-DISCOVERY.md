# PRD-001 — Literature Discovery in HealthTech AI Pulse

> **Adoption status (Pulse PR 1): PROPOSED — documentation only.** No research route, API, repository, database, authentication provider, hosted workspace or model deployment is established by this document. The existing Pulse editorial policy and executable contracts remain authoritative for journalism and releases.

**Release:** MVP · **Status:** Proposed hybrid v0.2 · **Priority:** P0

## Problem and primary journey

A Pulse reader encounters a scientific claim and wants to inspect underlying literature without switching products. From an article's optional **Explore the evidence** link (or the Pulse navigation), the user reaches `/research/`, runs a source-attributed search, inspects papers and selects up to ten for a research set.

## Frontend responsibilities (Pulse repository)

- Add a static Astro `/research/` entry page using a narrowly hydrated React research island. Keep unrelated editorial routes static; no global SPA conversion.
- Add a responsive, accessible research navigation entry and an optional article-level deep link **only when an existing verified DOI/PMID/PMCID or approved topic mapping is available**. Never infer identifiers from a title, or add external research links to all stories by default.
- Show public source metadata, abstract/access status, origin, retrieval timestamp, errors, result cap and warnings as sent by the API.
- Accept typed deep link `?doi=...` or other allowlisted public identifier form per the integration contract; avoid passing free-text article text, private data or API tokens in URLs.
- When Research API is offline, show graceful unavailable guidance and preserve article navigation. Do not present the service failure as 'no relevant research'.

## Backend responsibilities (independent Research API)

- Server-side bounded Europe PMC search, `resultType=core` when appropriate, polite retries/backoff, typed normalization and provenance snapshots.
- Canonicalize DOI -> PMID/PMCID -> provider identity; preserve aliases and conflicting identity data, never deduplicate on fuzzy titles alone.
- Provide allowlisted structured query and page limits, source coverage/count disclosure and typed `partialErrors`.
- Store only rights-permitted evidence bodies; do not scrape arbitrary URLs or inaccessible full texts.
- Enforce authenticated selection/persistence for hosted workspaces; public/demo search requires its own explicit abuse/cost risk review.

## Functional requirements

| ID      | Requirement                                     | Owner    | Acceptance                                                                                   |
| ------- | ----------------------------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| DISC-01 | `/research/` is reachable from Pulse navigation | Pulse UI | Existing article, home, news and sitemap tests still pass                                    |
| DISC-02 | Optional article → research deep link           | Pulse UI | Only verified public IDs, canonical URL and safe query encoding; invalid IDs fail gently     |
| DISC-03 | Search yields source-attributed bounded records | API + UI | Query, fetched timestamp, coverage and result cap visible                                    |
| DISC-04 | DOI/PMID/PMCID dedup and revision identity      | API      | Fixture aliases group correctly; conflicting IDs preserved                                   |
| DISC-05 | Honest statuses, rights and errors              | API + UI | Unknown abstract, preprint, 429 and timeout shown distinctly                                 |
| DISC-06 | 1–10 paper selection and reopen                 | API + UI | Authenticated research set persists; unauthorized access denied                              |
| DISC-07 | Site is resilient when API is down              | Pulse UI | Article routes unaffected; research panel shows retry/help state                             |
| DISC-08 | Rights/secret safety                            | API + CI | Unknown-rights full-text blocked; no keys/client secrets in browser                          |
| DISC-09 | Visual/keyboard consistency                     | Pulse UI | Existing visual language, focus/labels, 320/375/960/1280 smoke checks                        |
| DISC-10 | Preview isolation                               | Both     | PR preview defaults to fixture or isolated test API; never sends test data to production API |

## Experience design

`Article (optional) → Explore evidence → /research/?doi=<public-id> → paper detail → add to research set` OR `Pulse navigation → /research/ → search → details → selection`.

The research page will be labelled research intelligence and must not imply that editorial content is automatically endorsed by an LLM or that one selected paper represents all evidence.

## Non-functional boundaries

- Static Pulse build and SEO remain independent of API/network uptime.
- No API calls during Astro static build. React hydrates on the research route only.
- Client requests use a versioned external API with explicit request timeout and recoverable states.
- No private searches or workspace content in canonical links, search engine index, editorial article metadata, or Pagefind corpus.

## Excluded

Article rewriting, autonomous scientific scouting, unrestricted user uploads, patient health data, embedded clinical recommendations, automatic research-to-news publishing.
