# HealthTech AI Pulse ↔ Research API Integration Contract

> **Adoption status (Pulse PR 1): PROPOSED — documentation only.** No research route, API, repository, database, authentication provider, hosted workspace or model deployment is established by this document. The existing Pulse editorial policy and executable contracts remain authoritative for journalism and releases.

**Status:** Proposed, not implemented · **Public link contract:** `research-link-v1` · **HTTP API contract:** `api-v1` on `/v1` · **Consumers:** future Pulse React research island · **Producer:** proposed independent Research API.

## Contract goals

The static news site and research backend evolve independently. Pulse never requires Research API at build time. The API never writes into editorial stories or ledgers. API changes are versioned; errors and downtime are part of the normal contract.

## Reader-facing URL contract

- Canonical public route: `https://healthtech-ai-pulse.web.app/research/` (route proposed, **not currently deployed**).
- Article deep links (when the article already has a verified public identifier): `GET /research/?doi=<percent-encoded-doi>`; optionally `?pmid=<numeric-id>` or `?pmcid=<validated-id>` after explicit parser tests.
- Max one primary identifier per deep link; reject conflicting combinations. Whitelist fields and constrain lengths. All values are public scientific identifiers; never put questions, user IDs, authentication secrets, private selected sets or model results in URLs.
- Fallback from unknown/missing DOI → open neutral search page, not an invented source mapping. Record source article only if an approved public story slug is needed, without private context.
- Keep article page, editorial search, Pagefind, RSS and sitemap semantics unchanged; `/research/` is a separate page and not a story.

### Exact `research-link-v1` grammar and fallback (proposal)

- Route `/research/` (static Astro route, not yet present) is valid with no query; that is the **neutral research landing state**.
- Allowed **one and only one** query key: `doi`, `pmid`, or `pmcid`. No duplicate key values and no additional query parameters in canonical links. Empty values, multiple keys, repeated keys, malformed percent encoding, control characters and overlong values are rejected to a **neutral invalid-link message** without remote lookups, never guessed into a source.
- URI decoding occurs once via `URLSearchParams`, then length/format checks on the decoded string. Upper limit: 200 characters for DOI, 12 digits for PMID, 16 characters for PMCID. Validate DOI as `10.` followed by 4–9 digits, `/`, and a non-whitespace suffix; reject control characters and URL-like unsafe fragments. Validate PMID as decimal positive digits; validate PMCID as `PMC` plus digits, case-normalized. These are _proposed parsing limits_ for implementation tests, not a claim to validate registry existence. Record DOI canonicalization without conflating two distinct versions.
- Query, authorization details, private account IDs, full prompts, workspace/run IDs and clinical data never appear in public research links, RSS, pagefrontmatter or analytics. Do not use free-form topic/query parameters until a separately reviewed public grammar exists.
- Browser navigation to an unrecognized DOI or an upstream failure must distinguish **invalid input**, **no record found**, **source unavailable** and **API offline**; failures never mean "no evidence exists." No API request occurs at static build time.

### Ledger-backed deep-link eligibility (future PR, not this PR)

1. Resolve only a **published, non-draft** `story.id` from the Astro stories collection. The stable public story URL is `/stories/${story.id}/`; `story.data.candidateId` is a second explicit identity.
2. Find exactly one corresponding selected candidate in the versioned editorial ledger, and confirm the ledger `publication.story_ids` lists the exact `story.id`, with publication verification `verified` or `verified-with-claim-scope` and no withholding. Ambiguous/duplicate/missing ledger mapping means no automatic link.
3. Evaluate `candidate.underlying_identity.doi` or `.pmid`; non-null is **not sufficient**. Cross-check identity against inspected primary bibliographic evidence and relevant corrections/versions. Prefer checked DOI; otherwise checked PMID. `PMCID` has no dedicated field in the inspected Pulse story/candidate schema and must not be fabricated or inferred.
4. Avoid story-schema additions, free-form headline matching, URL heuristics or inferred source IDs for the first integration. Source `id` values such as `primary`, `journal` and `manuscript` are local labels, not public bibliographic identifiers.
5. Examples from 2026-10-21 `main` to test later: `2026-10-13-epilepsy-feedback-replay` → candidate DOI `10.1038/s41591-026-04680-4`, PMID `42869994`; `2026-10-19-oncology-ai-ehr-handoff` → candidate DOI `10.1038/s41746-026-03396-6`, PMID absent. Neither is automatically linked by this docs PR.

## Browser → API contract

- **Default mode for PR 2, local builds and previews: `fixtures`**. Do not provide a production API URL by default. A future explicit, gated API mode may use `PUBLIC_RESEARCH_API_BASE_URL` for an approved `https://<configured-api-host>/v1` endpoint or localhost in dev. This variable is a **public address**, never a credential. Build-time environment alone cannot opt a preview into production requests. Block production endpoints in preview at runtime and CI; do not trust misconfigured local/preview production variables.
- Cross-origin requests: explicit CORS allowlist for production origin and designated isolated previews; reject wildcard `*` for credentialed operations. Enforce server-side JWT/token verification and object ownership; CORS is not a security boundary.
- HTTP API version: `api-v1` under `/v1` (**independent** of `research-link-v1`). Generate typed responses and OpenAPI/JSON Schema from the future API build. Pulse pins a generated client/contract revision; compatibility tests and additive-change checks precede activation. No direct shared code package required.
- Public search in a hosted app must be guarded against scraping and cost abuse, or made sign-in-only until controlled limits exist.
- Readiness: `GET /v1/health` is safe, public and contains no sensitive configuration.

## Initial API actions

| Action           | API contract                                           | Authorization                                              |
| ---------------- | ------------------------------------------------------ | ---------------------------------------------------------- |
| Search           | `GET /v1/articles/search` with q, filters, page        | Local mock; hosted public only after explicit abuse review |
| View paper       | `GET /v1/articles/:id`                                 | Public, allowed metadata only                              |
| Create workspace | `POST /v1/workspaces`                                  | Auth required                                              |
| Select papers    | `PUT /v1/workspaces/:id/papers`                        | Auth + owner; 1–10                                         |
| Generate brief   | `POST /v1/workspaces/:id/questions`                    | Auth + owner + server budget                               |
| Inspect run      | `GET /v1/runs/:id`                                     | Auth + owner                                               |
| Review / export  | `POST /v1/runs/:id/reviews`, `GET /v1/runs/:id/export` | Auth + owner                                               |

Future successful API payloads must describe `requestId`, `sourceCoverage`, `fetchedAt`, relevant access/retrieval limits and `partialErrors` when needed. Typed errors include `requestId`, `code`, `message`, `retryable` and optional `retryAfterSeconds`; research UIs must distinguish `SOURCE_UNAVAILABLE`, `RATE_LIMITED`, `BUDGET_EXCEEDED`, `AUTH_REQUIRED`, `RIGHTS_UNKNOWN`, `CITATION_INTEGRITY_FAILURE` and `API_UNAVAILABLE`.

### Fail-closed boundary and contract acceptance

- No Research API/service account/deploy identity has any ability to write Pulse `src/content/`, `docs/editorial/ledgers/`, publications/issues/assets, pull requests, Firebase Hosting, secrets or scheduled editorial tasks. No model result automatically becomes an editorial article.
- Pulse builds, Pagefind, RSS, sitemap and published routes cannot import or fetch research API clients at build time. All runtime outages are isolated to the research feature.
- API responses, abstracts and model drafts are untrusted text. Reject arbitrary HTML, unsafe redirects, non-allowlisted source URLs and injected instructions. Validate `EvidenceSpan` membership/rights on the API side, not in React.
- Public research search may be rate-limited or auth-gated until abuse costs are reviewed. Workspace writes, model inference, review and export require server-verifiable identity, per-object ownership and budget limits; CORS is never authorization.
- API breaking change → new version or an explicit compatibility migration; Pulse client and API independently release and roll back. Emergency API disable leaves editorial publication intact.

## Route and contract examples (illustrative, not deployed)

```ts
// Pulse article component — verified identifiers from reviewed story metadata only
const researchHref = doi ? `/research/?doi=${encodeURIComponent(doi)}` : '/research/';
// Browser fetches through a typed API client at PUBLIC_RESEARCH_API_BASE_URL.
// No model key, provider secret, workspace ID, or research query in editorial HTML.
```

## Preview and operational safety

- Pulse PR preview **must default to fixtures**; any isolated test API is a separate reviewed opt-in with endpoint and billing gates, never production by default. Without preview auth/secrets, preview demonstrates a disabled or fixture-mode research UI.
- API deploys from its own CI and role-scoped identity. No API service account can deploy Pulse Hosting or update editorial GitHub content.
- UI checks verify fallback states and test a release against a pinned compatible `/v1` fixture/contract. API CI runs contract tests against supported consumers.
- Initial deployment path uses an external HTTPS API origin. A Hosting rewrite to Cloud Run can be considered with an ADR and validated rewrite path, auth, cache-control and billing settings; no wildcard catch-all rewrite over editorial paths.

## Change policy

Breaking API fields/routes or deep-link query interpretation requires a major contract revision and dual-release migration. Additive compatible changes may ship independently after tests. Editorial publication rules cannot be changed by the research API contract.
