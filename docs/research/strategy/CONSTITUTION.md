# Engineering, Editorial Boundary & Scientific Constitution

> **Adoption status (Pulse PR 1): PROPOSED — documentation only.** No research route, API, repository, database, authentication provider, hosted workspace or model deployment is established by this document. The existing Pulse editorial policy and executable contracts remain authoritative for journalism and releases.

**Status:** Proposed hybrid v0.2. Governs both the proposed Research API and any HealthTech AI Pulse changes made for this feature. Formal adoption requires maintainer review. Amend via an explicit decision record and reviewed PR.

## Non-negotiable principles

1. **One reader-facing identity, two separate operational domains.** Pulse owns public pages, UI, article navigation, editorial policies and editorial releases. Research API owns search, retrieval, model execution, persistence, privacy and research-workspace authorization. Neither service can silently change the other's data or permissions.
2. **The publication must stand alone.** Astro editorial pages, Pagefind, RSS, sitemap, article routes and content validation work when Research API, Postgres or Claude is unavailable. Research failure is an isolated `/research/` error state, not an editorial outage.
3. **Evidence before prose.** Model claims must reference permitted inspected `EvidenceSpan` records in a selected research set. Invalid or out-of-scope spans fail closed; absence of evidence means abstain or clearly labelled knowledge gap.
4. **Do not inflate meaning.** Publication and peer-review status, benchmark performance, validation setting, patient benefit, author assertions and independent replication are different concepts. Abstract-only analysis is visibly limited.
5. **Preserve provenance and rights.** Keep source identifiers, DOI/PMID/PMCID, access/license decisions, retrieval time, source version/hashes, locator and model/prompt versions. Never use unknown-rights full texts in a stored corpus.
6. **No patient or other sensitive data in V1.** Do not upload clinical records, accept private medical documents or allow personal health information in user research prompts. Build detection/minimisation and incident handling; warn users explicitly.
7. **Research output is not editorial approval.** A generated brief is always research output, not a HealthTech AI Pulse article. There is no research-to-editorial auto-publish API, token, GitHub write credential or unattended merge path.
8. **Human scientific judgment is required.** Schema validity and citation existence do not prove factual support. Clearly identify model-generated drafts, limitations, conflicts, reviewed/unreviewed status and accountable reviewer action.
9. **A narrow interface contract controls coupling.** Query parameters contain only public IDs/topic tokens; no prompt text, authentication token, or private workspace data enters canonical links, article frontmatter, analytics, RSS or build artefacts. Contract changes need compatibility tests on both sides.
10. **Auth, secret and tenant boundaries are server-enforced.** API credentials remain server-side; hosted workspaces and Claude operations require protected identities, ownership tests, rate limiting and usage budgets. Client-side controls alone are not authorization.
11. **Source and model content are untrusted.** Defend prompt injection, SSRF, data exfiltration, unsafe HTML, tool escalation and malformed external responses; prefer fixed source adapters and deterministically validated output.
12. **Evaluation before complexity.** Version fixed fixtures and golden questions, lexical retrieval baseline, grounding/citation checks and injection cases. No vectors, agent orchestration or MCP until a measured case and ADR justify them.
13. **Cost and deployment decisions are explicit.** API tokens are not included in subscriptions. Local fixtures precede model calls; cloud billing, quota, region, processors and kill switch must be reviewed before hosted activation.
14. **Separate deployment authority.** Pulse CI/hosting and Research API CI/deployment operate independently. Research service credentials do not grant permission to alter Pulse editorial content or production hosting. Any new secrets or IAM roles require scoped review.
15. **Accessible, resilient user experience.** Research UI must work with keyboard/screen readers, label provisional assessments, handle no-result/restricted-source/timeout/backend-offline states and never degrade unrelated static pages.
16. **Truthful evidence of completion.** Never invent deploy URLs, tests, scientific approvals, licenses, provider terms, cost figures or operational status. Record precise measurements and honest gaps.

## Ownership and authority

- `strategy/MISSION.md`: product purpose and limits.
- `product/PRD-001-*`, `PRD-002-*`: MVP workflows and acceptance.
- `product/PRD-003-*`: opportunity only, requires later approval.
- `engineering/PULSE_INTEGRATION_CONTRACT.md`: frontend-backend and article-entry interface; versioned consumer/producer contract.
- `engineering/ARCHITECTURE.md`, `TECHSTACK.md`, `DATA_AND_API_CONTRACTS.md`: target design, subject to ADR.
- `assurance/*`: evidence, security and release blockers.
- **Existing Pulse repository contracts remain authoritative** for editorial policy, article schema, publication CI, and deployment. This kit cannot override them.

## Release gates and stop conditions

Stop a release on any unauthorized text retention; critical invalid or fabricated evidence link; unsafe clinical claim; unauthorized access; secret or personal-data leak; unaudited model cost; or attempts to turn research output into publication automatically. **Pulse feature rollout gate:** no impact on existing article/publication tests and static performance/accessibility smoke checks. **API gate:** auth/ownership, cost ceilings, rights tests and groundedness review. Do not combine these approvals into one opaque green status.

## Assistant/agent working agreement

Read actual `main` of Pulse before code changes. Propose scoped PRs in the appropriate repositories. Do not assume research repo exists; do not alter editorial pipelines unless expressly approved. Report exact commands/results, request paid-spend approval, and leave merges to the maintainer.
