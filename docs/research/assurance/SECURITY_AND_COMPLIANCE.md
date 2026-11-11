# Security, Privacy and Healthcare AI Boundaries

> **Adoption status (Pulse PR 1): PROPOSED — documentation only.** No research route, API, repository, database, authentication provider, hosted workspace or model deployment is established by this document. The existing Pulse editorial policy and executable contracts remain authoritative for journalism and releases.

**Status:** Hybrid v0.2 design assumptions, not legal sign-off · **Review required before real users/data or commercial release.**

## Intended use and exclusions

This product supports **research intelligence from public scientific literature**. It does NOT diagnose, prescribe, triage, make clinical decisions, perform personalised risk prediction, or replace systematic evidence review. Its current intended purpose reduces but does not eliminate regulatory obligations; classification under EU AI Act and medical-device law depends on actual functions/claims and must be reassessed on scope change.

## MVP data policy

- Accept publication metadata and rights-permitted abstracts/OA excerpts only.
- No patient information, identifiable medical cases, employee records, private clinical data, or user-uploaded medical PDFs.
- Users must be informed not to enter personal health information into prompts; add front-end warning, field constraints and a documented incident response if data arrives anyway.
- User accounts, workspace questions, IPs, logs and analytics **may be personal data**. Define lawful basis, retention/deletion, privacy notice, processor agreements and transfer analysis prior to public accounts.
- Do not claim GDPR compliance just because hosting is EU-based; Claude API and other subprocessors require separate assessment.

## Hybrid architecture boundaries

- **Pulse static publication:** public content and Astro build; no Claude key, research DB credential, patient/health data, or server-side private research session; it continues to work during research outages.
- **Pulse `/research/` React client:** only public API origin and short-lived auth/session material handled through a reviewed authentication design. No research prompts or workspace data in canonical links, stories, Pagefind or analytics. Enforce safe error messages and avoid client persistence until retention/privacy decisions are made.
- **Research API:** authenticates and authorises each protected request; source fetches and Claude calls execute server-side; ownership, safe logging, rate limits and model ceilings are mandatory. Its service/deploy identity cannot update Pulse editorial repository, PRs, or Hosting.
- **Environments:** research PR previews default to fixtures or an isolated test backend; no production tokens or credentials in public PR builds. Explicit CORS allowlist and auth must both pass; CORS alone does not protect data.
- **Cloud deployment:** Cloud Run on Firebase Hosting rewrites requires Cloud Billing and may change project pricing. Do not activate this route by default; record a cost, processor, region, IAM, cache and rollback review first.

## Threat model / mandatory controls

| Threat                                              | Control                                                                                     | Test                                                  |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Source prompt injection                             | Source passages isolated as untrusted data; fixed tool permissions; no instruction adoption | Malicious abstract fixture                            |
| Fabricated citation                                 | Store span IDs; deterministic membership and locator validation                             | Unknown/mismatched ID rejected                        |
| SSRF through source URLs                            | Use provider API templates and allowlisted domains; reject arbitrary fetch URL              | URL fuzz/blocked private IP tests                     |
| Cross-workspace leakage                             | Server-side auth and ownership, Postgres RLS when applicable                                | Two-user isolation E2E                                |
| Leaked API secret                                   | Server-side calls only, git secret scanning, masked logs                                    | No key in web bundle/test output                      |
| Unauthorized full-text retention                    | License gate in storage service + DB constraints                                            | Unknown license body rejected                         |
| Cost explosion/abuse                                | Rate limiting, model token cap, spending ceiling, timeout, kill switch                      | Budget-exceeded integration test                      |
| Hallucinated clinical benefit                       | Scoped retrieval, limitations, abstain-on-no-evidence and manual review                     | Critical-claim release review                         |
| Data loss / drift                                   | Versioned migrations, backups, snapshot hashes, rollback                                    | Restore rehearsal before hosted beta                  |
| Research outage breaks news pages                   | Static Astro publication and isolated research UI error boundary                            | Turn Research API off and check articles/RSS/Pagefind |
| Preview leaks production research credentials/spend | Fixture-only UI previews and independent deploy roles                                       | Preview with unset secrets and deny prod API calls    |
| Research brief silently published as news           | No editor/write credentials or article creation API in Research service                     | Negative authorization/integration test               |

## Third-party processing decision

Before exposing hosted functionality: document model provider, model selected, API feature data retention, applicable terms/DPAs, hosting locations, account-provider terms, logged information and international data transfer. Anthropic's policies may vary by model and feature, including covered models. Avoid sending personal data to LLM in MVP.

## Minimal compliance tasks before private hosted beta

1. Publish privacy notice and acceptable-use warning with actual processors.
2. Verify region for each persistent store; document all cross-border transfers and lawful basis.
3. Implement deletion of workspace/questions/generated drafts and logs per retention schedule.
4. Test authentication, authorization, RLS (if used), rate limits and secrets handling.
5. Adopt incident report, dependency patching and security contact.
6. Re-evaluate AI Act / MDR classification if intended clinical functionality changes; obtain qualified advice.

## Official references

- EU special-category data: https://commission.europa.eu/law/law-topic/data-protection/information-individuals_en
- Claude API retention: https://platform.claude.com/docs/en/build-with-claude/api-and-data-retention
- EU AI Act official regulation: https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng
- EU GDPR: https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng

**No legal assurance is claimed by this document.**
