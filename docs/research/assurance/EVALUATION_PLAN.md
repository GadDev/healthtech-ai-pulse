# AI & Retrieval Evaluation Plan

> **Adoption status (Pulse PR 1): PROPOSED — documentation only.** No research route, API, repository, database, authentication provider, hosted workspace or model deployment is established by this document. The existing Pulse editorial policy and executable contracts remain authoritative for journalism and releases.

**Status:** Required for MVP release · **Version:** 0.2 (hybrid) · **Owner:** Maintainer.

## What we evaluate
1. **Source correctness:** metadata identity, deduplication, publication status and abstract-vs-full-text labelling.
2. **Retrieval quality:** can the system recover relevant evidence from a *fixed permitted corpus*?
3. **Citation integrity:** do all cited evidence IDs exist, belong to selected papers and link to correct passages?
4. **Semantic grounding:** does a source support the wording of the claim, including setting, numbers and limitations?
5. **Abstention and uncertainty:** does the system avoid ungrounded answers when evidence is absent/inaccessible/conflicting?
6. **Safety and prompt injection:** do malicious source passages fail to override system instructions or expose secrets?
7. **Cost, latency, reproducibility:** model/version, prompt, retrieved context, token use, estimated cost, retries and error outcomes.

## Benchmark datasets (proposed)
- **Fixtures:** 30–50 public, rights-permitted papers/abstracts spanning clinical AI, biomedical models, pharmaceutical methods and safety/governance, with documented source links, preprints and ambiguous metadata.
- **Gold queries:** minimum 25 questions designed by maintainer with 1–5 manually judged relevant sources/spans per query. Include at least 5 `no support` questions and 5 conflicting/limited-evidence questions.
- **Adversarial corpus:** at least 10 cases with tool-instruction injection, fabricated DOI, retraction ambiguity, duplicate versions, bad date and inaccessible text.
- **Review annotations:** use `grounded`, `partially_grounded`, `unsupported`, `cannot_judge` labels with rationale and source locator. When scientific expertise is required beyond maintainer capacity, mark `cannot_judge` and avoid release claims.

## Metrics and release thresholds (provisional engineering gates, refine with evidence)
| Dimension | Measurement | Pilot exit |
|---|---|---|
| Citation integrity | Valid cited span IDs / all cited IDs | 100% in automated tests and pilot runs |
| Corpus isolation | Source IDs outside selected corpus | 0 in tests |
| Rights gate | Unauthorized full-text snapshots | 0 in tests |
| Metadata normalization | DOI/PMID identity correct on labelled fixtures | 100% on core fixture set |
| Retrieval | Recall@10 and MRR on gold corpus | Record lexical baseline; target Recall@10 >= 0.80 before portfolio release, or disclose miss |
| Grounding | Unsupported claims in reviewed claim sample | 0 critical clinical overstatements; all other errors counted and disclosed |
| Abstention | Correct refusal/gap handling on `no support` cases | All explicitly defined blocker cases must abstain |
| Security | Cross-tenant disclosure, secrets in output, injection successes | 0 critical defects |
| Operability | Median/P95 latency, cost per completed brief, error rate | Publish measurements and maximum spend, no invented SLA |

**Important:** citation integrity is machine-checkable; scientific support/quality is not established merely because citation IDs exist. Evaluate claim-to-passage semantics with independent human checks and stratified failures.

## Baseline-to-model experiment
1. Save fixed corpus and question judgments with licensing evidence.
2. Run keyword/FTS retrieval baseline. Record top-K sources, latency and errors.
3. Add bounded Claude synthesis; evaluate semantic claim support and abstention.
4. Only then prototype pgvector/hybrid retrieval under same questions and compare Recall@K, precision, latency, costs and versioned settings.
5. Consider agent orchestration only after a failing use case is measured and its success criterion written.

## Hybrid integration evaluation (additional gates)
- Pulse smoke tests: existing article, edition, RSS, Pagefind and sitemap routes render with Research API unreachable; `/research/` displays a clear service-unavailable state.
- Deep-link tests: an actual verified article identifier routes safely to `/research/`; missing/invalid/publication-unverified IDs do not create false paper attribution. Link values are public identifiers only.
- Frontend/API contract tests: fixed `/v1` schema from API repo matches the pinned Pulse client, including auth/429/partial-error responses. Preview UI defaults to fixture or non-production API and never triggers billable production calls.
- No research output is included in Pulse static content or published automatically. Test absence of any editorial write credential in the API runtime and CI.
- Measure research island JS size, accessibility, and error states without degrading static publishing quality; avoid claiming global performance improvements without measurements.

## CI versus manual release checks
**CI blocking:** schema tests, source-ID/rights gates, deterministic expected output fixtures, malicious inputs, source adapters, endpoint auth and build. **Manual reviewer gate:** semantic correctness, evidence scope, study design labels, claim limitations, absence of patient-advice wording. Store reviewer initials/date and a link to the evaluated release candidate, not an invented approval.

## Evaluation evidence artifacts
`eval/fixtures/`, `eval/questions.jsonl`, `eval/judgments.jsonl`, `eval/README.md`, `eval/results/<date>-<commit>.json` (proposed paths; implement in code repo). Never commit forbidden article content or patient records.
