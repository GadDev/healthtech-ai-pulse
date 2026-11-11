# Data and API Contracts — Research Backend (Hybrid Draft)

> **Adoption status (Pulse PR 1): PROPOSED — documentation only.** No research route, API, repository, database, authentication provider, hosted workspace or model deployment is established by this document. The existing Pulse editorial policy and executable contracts remain authoritative for journalism and releases.

**Status:** Target v0.2, not deployed. **Ownership:** API repo only. Pulse does not own this database or expose saved research as static files. All IDs server-issued, all timestamps UTC; source timestamps kept separately.

## Research relational entities

| Entity               | Fields and invariants                                                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `articles`           | `id`, `canonical_doi?`, `pmid?`, `pmcid?`, `title`, `abstract?`, `publication_date?`, `publication_status` (preprint/peer_reviewed/unknown), `first_seen_at`, `last_checked_at` |
| `source_records`     | `id`, `article_id`, provider/source key/URL, retrieved timestamp, metadata hash, access scope, version and correction notes                                                     |
| `content_snapshots`  | `id`, source record, `scope` (metadata/abstract/licensed_full_text), rights/license status, retrieval/hash, `body?` only when authorized, retention expiry                      |
| `evidence_spans`     | `id`, snapshot ID, text/section locator, offset/excerpt hash; permanent provenance                                                                                              |
| `workspaces`         | `id`, verified `owner_user_id`, title, timestamps; no article record is a workspace owner                                                                                       |
| `workspace_papers`   | workspace/article link, uniqueness; 1–10 selected for synthesis                                                                                                                 |
| `research_questions` | workspace, scoped question, created timestamp, query signature                                                                                                                  |
| `synthesis_runs`     | question, model/prompt/retrieval versions, snapshot hashes, status, cost/tokens, error code, created timestamp                                                                  |
| `claims`             | run, claim text, machine support-status, qualifications, `review_status`                                                                                                        |
| `claim_spans`        | claim/span relation (supports/qualifies/conflicts); only in permitted selected corpus                                                                                           |
| `reviews`            | run, verified reviewer, action, timestamp, optional rationale                                                                                                                   |
| `audit_events`       | actor, target/action/request ID, UTC time, minimal safe metadata                                                                                                                |

No foreign key exists to a Pulse article database: Pulse has static story files. An optional **public** `pulse_story_slug` association is a navigation hint only, not an editorial approval or write channel.

## Identity and rights

DOI normalized consistently while retaining original; PMID/PMCID aliases tracked. Do not merge solely on fuzzy titles. Keep `publication_date`, `indexed_at`, `retrieved_at`, `correction_checked_at` separate. Unknown-rights full text cannot persist. Evidence ID checks must include selected workspaces and content rights, not just ID existence.

## HTTP API (proposed at `/v1` on Research API origin)

| Method | Route                                    | Contract                                                                     |
| ------ | ---------------------------------------- | ---------------------------------------------------------------------------- |
| `GET`  | `/v1/health`                             | Safe service version/readiness, no secrets                                   |
| `GET`  | `/v1/articles/search?q=&page=&from=&to=` | Bounded metadata, `sourceCoverage`, `fetchedAt`, `partialErrors`, request ID |
| `GET`  | `/v1/articles/:id`                       | Safe metadata and permitted abstract/excerpts only                           |
| `POST` | `/v1/workspaces`                         | Authenticated user creates owned set                                         |
| `PUT`  | `/v1/workspaces/:id/papers`              | Atomic replace of up to ten selected IDs after owner check                   |
| `POST` | `/v1/workspaces/:id/questions`           | Idempotency key; authenticated question and bounded synthesis                |
| `GET`  | `/v1/runs/:id`                           | Owner-only status/claims/evidence and budget metadata                        |
| `POST` | `/v1/runs/:id/reviews`                   | Append owner/reviewer action, no implicit scientific endorsement             |
| `GET`  | `/v1/runs/:id/export?format=json         | md`                                                                          | Owner-only brief with provenance and review status |

**Error envelope (illustrative):** `{ "requestId": "uuid", "error": { "code": "SOURCE_UNAVAILABLE", "message": "Temporarily unavailable", "retryable": true } }`. Never return a successful empty search when the upstream API failed.

## UI-only deep-link contract

Pulse article links to `/research/?doi=<encoded-public-id>` or approved `pmid/pmcid` variant; no private user queries, run IDs, patient data or authentication in URLs. Parse and validate in browser, then fetch the API. See [integration contract](PULSE_INTEGRATION_CONTRACT.md).

## Representative research output (illustrative only)

```json
{
  "runId": "uuid",
  "status": "draft",
  "scope": "abstract_only",
  "claims": [
    {
      "claimId": "uuid",
      "text": "Placeholder claim, not a published scientific result",
      "supportStatus": "partial",
      "evidenceSpanIds": ["uuid"],
      "limitation": "Abstract-only evidence; no full study evaluated"
    }
  ],
  "gaps": ["No comparative validation found in the inspected passages"],
  "disclaimer": "Research intelligence only; not clinical advice or a systematic review."
}
```

## Security, versioning and compatibility

All hosted workspace, generation and export routes require verified identity and per-object server-side authorisation; frontend IDs cannot grant access. Maintain rate limits, redacted logs, token ceilings and retention/deletion support. Generate versioned OpenAPI/JSON Schema from runtime contracts; pin/check API-v1 consumer types in Pulse. No browser Claude keys, no editorial publishing endpoints, no build-time API call from Astro.
