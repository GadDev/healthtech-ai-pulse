# PRD-002 — Source-Grounded Research Workspace

> **Adoption status (Pulse PR 1): PROPOSED — documentation only.** No research route, API, repository, database, authentication provider, hosted workspace or model deployment is established by this document. The existing Pulse editorial policy and executable contracts remain authoritative for journalism and releases.

**Release:** MVP after PRD-001 · **Status:** Proposed hybrid v0.2 · **Priority:** P0

## Problem
A reader needs more than a scientific paper list: they must distinguish source-stated findings from generated interpretation, inspect the actual text and prepare a reviewable research brief. This research experience is available inside HealthTech AI Pulse's `/research/` route, **not** as an independent frontend brand.

## End-to-end flow
1. From `/research/`, select 1–10 records (optionally starting with a verified article-linked ID).
2. Research API validates user ownership, rights and available source snapshots; no direct Claude credentials in the browser.
3. Choose a bounded question or comparison template. Do not submit personal health details.
4. API constructs identifiable `EvidenceSpan` records from permitted text and runs a lexical retrieval baseline over selected sources.
5. Claude produces structured claims, citations, qualifications, gaps and limitations.
6. API verifies schema, span existence, selected-corpus membership and rights. When absent/invalid, reject or abstain; *semantic scientific grounding remains a separate evaluation/review task*.
7. React research panel shows draft answer beside clickable original passage, publication status and limits; user accepts, edits or rejects the draft.
8. API issues JSON/Markdown research brief carrying run version and review status; **no write access to article content or publication automation**.

## Functional requirements
| ID | Requirement | Owner | Acceptance |
|---|---|---|---|
| EVID-01 | Research set scope | API | No unselected paper or unknown span can be cited as evidence |
| EVID-02 | Structured citation integrity | API | 100% citation IDs resolve in acceptance corpus; source-page/section locator shown |
| EVID-03 | Honest abstention | API + UI | Unsupported questions show 'evidence gap' rather than fabricated results |
| EVID-04 | Evidence-scope warning | UI | Abstract-only vs licensed full-text explicit on each answer |
| EVID-05 | Human review/export | Both | `draft` / `reviewed` state and reviewer action recorded; no auto-publish |
| EVID-06 | Run provenance and cost | API | Model, prompt, retriever, snapshot hashes, timestamps, token/cost estimate recorded |
| EVID-07 | Prompt-injection resistance | API | Malicious abstract cannot change tool permissions, evidence scope or instructions |
| EVID-08 | Comparison and conflict visibility | Both | Different validation settings not collapsed into false agreement |
| EVID-09 | Hosted access control | API | Unauthorized other-user workspace/run access blocked |
| EVID-10 | Graceful backend/model outage | UI | Safe retry/paused state; no stale draft displayed as newly generated |
| EVID-11 | Cost protection | API | Per-user, per-run and global server-side token/rate caps enforced |
| EVID-12 | Editorial firebreak | Both | Export is a research brief only; cannot create an article/daily issue or open publishing PR |

## UX and states
The Pulse research UI should display the selected corpus, question, answer state, citation/evidence panel and review/export controls. Clearly display `partial`, `conflicting`, `unsupported` and `not_assessed` as **machine-assessed**, not a medical evidence grade. Include loading, rights-unavailable, no-support, unauthenticated, rate-limited, budget-disabled and network-failure states.

## Authentication
No persistent research sets or paid Claude requests from unauthenticated browsers in a hosted rollout. Start local with fixture-backed single-user mode. Select an account provider in an explicit security ADR before beta; verify access tokens server-side and never trust a user ID from React or query parameters. Pulse's public reading remains unauthenticated.

## Quality gates
Deterministic structural citation checks are mandatory. Human scientific review on a labelled gold dataset checks whether claims match what the underlying passage actually says. Zero critical unsupported clinical-benefit assertions in release review; publish limitations and failures honestly. Refer to `../assurance/EVALUATION_PLAN.md`.

## Later opportunities
Topic monitoring; approved sharing to professional teams; retrieval improvements after benchmarks; an explicitly human-reviewed path that helps an editor *discover* potential sources (not auto-create stories). Any article publication remains controlled by the Pulse editorial repository and its PR review.

## Out of scope
Diagnosis, prescribing, patient-specific interpretation, clinical efficacy certification, systematic review, unlicensed full text, clinical user uploads, automated news publication.
