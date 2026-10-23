# HealthTech AI Pulse — Editorial Policy

**Contract:** `healthtech-1.0`  
**Status:** Adopted foundation  
**Owner:** Repository maintainer (accountable editor)

---

## 1. Mission & Audience

Help people building and evaluating healthcare and pharmaceutical AI understand what changed, what the evidence supports, and what deserves investigation next.

**Primary audience:** Technical product leads, healthcare AI engineers, translational researchers, clinical innovation teams.  
**Secondary audience:** Clinicians, policy specialists, investors — their needs must not pull the publication into treatment guidance, a comprehensive regulatory service, or investment advice.

Every story must help readers decide whether to investigate, evaluate locally, monitor, or reconsider a technology or assumption. A benchmark result, trial registration, product announcement, and demonstrated patient benefit are different developments.

---

## 2. Scope

Cover five desks:

| Desk                     | Focus                                                                                                      |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `clinical-ai`            | Clinical AI, diagnostics, imaging, CDS, EHR integration, validation                                        |
| `health-systems`         | Health-system operations, digital health, implementation, procurement, monitoring, rollback                |
| `pharma`                 | AI across the medicines lifecycle: discovery, development, trials, manufacturing, pharmacovigilance        |
| `biomedical-foundations` | Biomedical models, data, tools, multiomics, protein/molecule design, biological validation, research tools |
| `safety-policy`          | Safety, adoption, regulation, governance, recall, guidance, standards                                      |

**AI is the organising focus.** A non-AI development qualifies only when it materially changes the evidence, infrastructure, safety, access, or operating conditions of these covered workflows. General pharma earnings, routine funding, unrelated drug approvals, consumer wellness launches, and generic AI announcements are outside scope.

---

## 3. Core Principles

1. **Traceable claims** — Never invent sources, dates, findings, quotations, metrics, implementation details, reviewer identities, or approvals.
2. **Evidence vs. claim** — Source provenance, publication status, study design, validation setting, independence, and clinical utility are separate dimensions. Peer review and regulatory authorization are not universal quality seals.
3. **Separate categories** — Model performance ≠ patient benefit; association ≠ causation; sponsor claims ≠ independent findings. Do not generalise beyond the studied setting.
4. **Show uncertainty** — Missing information, limitations, conflicts of interest, access restrictions, contradictory findings, corrections, and retractions where relevant.
5. **Fewer, useful stories** — Empty desks and ledger-only days are valid. Selection scores support decisions and cannot override publication gates.
6. **Preserve the research record** — Selected, watch, and rejected decisions remain auditable; withholding a selected story is a separate publication outcome. Later decisions and explicit human overrides append history.
7. **Reader clarity** — Readers must find sources, understand claim boundaries, and distinguish reporting from editorial interpretation. Articles read as clear, engaging science journalism — not templated AI summaries.
8. **Mandatory imagery** — Every newly prepared article must carry a medically responsible, story-specific, reviewed photorealistic editorial image. A failed or unavailable image withholds the article; there is no decorative placeholder escape hatch. Legacy articles needing image backfill are documented openly.
9. **Human-reviewed publication** — Automation never writes editorial batches to main, merges, enables auto-merge, or marks publication PRs ready for review.
10. **No patient data** — Use public evidence and lawfully accessible material; do not bypass access controls or copy entire protected papers or datasets.
11. **Sustainable operations** — Automation must reduce review effort without concealing failures.

---

## 4. Discovery & Research

Follow the bounded five-lane plan in `docs/editorial/DISCOVERY_V1.md`:

| Lane                            | Concrete Work                                                                                            |
| ------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Research & evaluation           | PubMed/Europe PMC + direct journal/publisher checks                                                      |
| Safety & official actions       | European authorities + FDA records/notices; retain jurisdiction, exact action/status, dates              |
| Deployment & operations         | Two accessible specialist sources with different coverage; follow leads to hospitals, trials, artifacts  |
| Biomedical & pharma engineering | Models, datasets, repositories, biological validation, trial results; AI contribution must be documented |
| European & local-language       | Rotating French/German/regional query; Luxembourg and neighbours over the week without geographic quotas |

**Window semantics:** Initial 72-hour window, then last completed cutoff with 24-hour overlap, seven-day automatic catch-up cap. Longer gaps remain explicit.

**Coverage honesty:** Record queries, actual access time, outcome (hits/retrieved/screened/inspected). Unattempted lanes = coverage gaps. Completion = planned window done, not exhaustive surveillance.

---

## 5. Deduplication & Decision

1. **Identify underlying development** — Match canonical URLs, DOI/PMID, preprint, trial, cohort, product/version, regulatory decision, event identities. Do not remove URL parameters that distinguish records.
2. **Classify novelty** — `new`, `material-update`, `repeat`, `uncertain`. Material update needs previous IDs + specific substantive delta; renamed headline/syndication/unchanged journal publication is not sufficient.
3. **Extract bounded claims** — Score the actual supported claim, not a stronger marketing headline.
4. **Record decision** — `selected` / `watch` / `rejected`. Publication verification is a separate gate and may withhold a selected item without rewriting its research history.

---

## 6. Scoring & Selection Gate

**Dimensions (0–4 integer, written rationales required):**

| Dimension                  | Field                             | Weight |
| -------------------------- | --------------------------------- | ------ |
| Practical significance (S) | `editorial_score.significance`    | 30%    |
| Claim support (E)          | `editorial_score.claim_support`   | 30%    |
| Audience relevance (R)     | `editorial_score.relevance`       | 25%    |
| Material change (M)        | `editorial_score.material_change` | 10%    |
| Durability (D)             | `editorial_score.durability`      | 5%     |

**Formula:** `weightedScore = round((0.30×S + 0.30×E + 0.25×R + 0.10×M + 0.05×D) × 100, 1)` — implemented in `src/lib/editorial-schema.ts`.

**Decision boundaries:**

| Decision     | Policy Boundary                                                                                                   | Stored As                                                                        |
| ------------ | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **Selected** | Total ≥ 75, S/E/R ≥ 2, M ≥ 1, all scope/evidence/novelty gates clear                                              | `candidates`, `decision: selected`                                               |
| **Watch**    | Normally 55–74.9, or unresolved evidence/novelty even with higher score                                           | `watchlist`, `decision: watch`, concrete promotion conditions + next review date |
| **Rejected** | Out of scope, duplicate without material delta, unsupported claim, inadequate value; lower scores normally reject | `exclusions`, `decision: rejected`, explicit reason                              |

**Hard gates:** A high score cannot repair a failed hard gate. Official decisions support exact regulatory status only; they do not establish effectiveness. Availability evidence does not establish patient benefit.

**Watch records:** May have `editorial_score: null` when essential inspection is unfinished; concrete `promote_when` conditions and `next_review_at` date remain required.

**MUST KNOW:** At most one per edition: total ≥ 90, S=4, E≥3, explicit consequential reason, no unresolved central uncertainty. Must be a surviving published mapping. Optional and distinct from featured placement.

---

## 7. Evidence Requirements

Every selected candidate records:

- **Publication status** (peer-reviewed, preprint, announcement, etc.)
- **Study design** (methods, population, dataset, sample sizes with units/reasons)
- **Validation setting** (in-silico, retrospective, prospective, multi-site, independent)
- **Independent validation** (external replication, internal screening — distinguish clearly)
- **Clinical utility** (`not-assessed` | `measured-no-demonstrated-benefit` | `demonstrated-in-studied-setting` | `uncertain` | `not-applicable`)
- **Access level** (`full-text` | `abstract-only` | `registry-only` | `official-record-only` | `artifact-only` | `announcement-only` | `unavailable`)
- **Funding & conflicts of interest** (explicit `unavailable` if not extracted — not inferred)
- **Corrections/retractions** (checked at publisher/PubMed/PMC)
- **Contradictory findings** (array, explicit)
- **Limitations** (array, minimum 1)
- **Applicability** (who this helps, what it does not establish)

**Claim types & required payloads:**

| Claim Type                                                                               | Required Interpretation                                                                                                                                        |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `model-performance`, `workflow`, `patient-benefit`, `patient-outcome`, `pharma-progress` | Study design, setting, population/dataset, sample sizes, comparator, endpoints, results with scale/uncertainty/source locator, follow-up, harms, applicability |
| `regulatory`                                                                             | Authority, jurisdiction, official record ID/source, exact status, product/version, intended use/population, dates, restrictions                                |
| `availability`                                                                           | Artifact source, version, intended users, access, license, limitations                                                                                         |
| `safety`                                                                                 | Report type, exposure denominator or explicit unknown, causal limits, duplicate assessment                                                                     |

**Patient-benefit claims require `clinical_utility: demonstrated-in-studied-setting`** — model accuracy alone cannot satisfy it. Regulatory claims require the inspected official record and exact jurisdiction/status.

---

## 8. Publication Gate

**Re-verification before publish:** Recheck primary evidence, corrections/retractions, contradictory findings, publication-time deduplication. Record `publication_verification` as `verified` / `verified-with-claim-scope` / `conflict` / `source-unavailable` with actual observation time, reviewer/type, supported scope. Keep research decision unchanged.

**Withholding:** Untraceable/conflicting central claims, unverified deduplication, unsafe extrapolation → withhold downstream. A blocked candidate need not block unrelated verified stories or valid ledger-only recovery.

**Capacity:** Pilot prepares at most two surviving articles per research date. Preserve selected overflow as capacity withholding, not silent rejection. With no survivors, finalize ledger-only (no issue, no assets).

---

## 9. Article Production

**Formats:** `pulse` | `briefing` | `deep-dive`  
**Depths:** `general` | `specialist`  
(Do not copy source publication's engineering depth labels or unsupported formats.)

**Structure follows evidence:** Lead with why this specific development matters in 1–2 plain sentences. Evidence spine: what happened → what researchers/authorities did → what they found/said → what evidence cannot tell us → what deserves attention next. This is narrative progression, not five compulsory subheadings.

**Voice (from `SCIENCE_WRITING_STANDARD.md`):**

- Specific rather than promotional
- Human-readable rather than simplified into inaccuracy
- Concrete rather than padded
- Curious, not breathless
- Independent rather than corporate
- Confident about facts, frank about gaps

**Avoid machine markers:** "In a rapidly evolving landscape", "game changer", "delve into", "it is worth noting", "the implications are profound", "a pivotal moment", rigid "What this does—and does not—show" titles for every story, obligatory "Editorial interpretation:" paragraphs.

**Image requirement (from `VISUAL_CONSTITUTION_V1.md` & `ILLUSTRATION_SYSTEM_V1.md`):**

- From editorial date 2026-10-22, every public story requires `illustration.mode: generated` with reviewed WebP, alt text, caption, and review record
- `mode: none` is not a production choice for new stories — withhold instead
- Three written photographic concepts before generation; choose one with story-specific rationale
- Editorial Science Photography direction: credible, cinematic, human-centred, photojournalism-inspired
- Medical/illustrative safeguards: no invented anatomy, scans, mechanisms, patient outcomes, study hardware, charts-as-evidence, words/logos/UI in image
- Four editorial gates: specificity, meaning, thumbnail/crop clarity, variety against recent approved images
- Review with actual headline + lead + caption alongside image; then real article/listing crops

---

## 10. Corrections & Retractions

Visible corrections preserve a dated explanation of material changes. Retractions and serious source challenges trigger immediate assessment and a correction or withdrawal PR; do not erase history. Sponsored interests, affiliate relationships, and relevant editorial conflicts must be disclosed. Sponsorship cannot purchase selection or evidence ratings.

---

## 11. Accountability

The maintainer is the accountable editor and final publication authority. Model research, extraction, drafting, translation, and self-review must be disclosed as such; they are not independent human validation. The maintainer checks the central claim, title, narrative clarity, evidence card, limitations, source access, visual specificity and honest captioning, and exact PR revision before merge. When a claim requires expertise the editor cannot adequately assess, narrow it to verifiable facts, obtain a suitable specialist review, or withhold it. No fabricated clinical endorsement is acceptable.

---

## 12. Non-Goals

No personalised medical advice, diagnosis, treatment recommendations, prescribing, patient chatbot, clinical decision-support product, systematic-review service, exhaustive newswire, automated investment recommendations, or unreviewed autonomous publication. No accounts, patient-data backend, newsletter subscriber database, or paid integrations in the initial MVP.

---

## 13. Authority & Change

This document governs editorial rules. `TECHSTACK.md` owns technical decisions; `ROADMAP.md` owns delivery sequencing. Machine contracts (`editorial-schema.ts`, validators) validate structure and cross-file relationships, not scientific truth. If a machine contract conflicts with policy, stop the affected publication and fix the inconsistency through a reviewed PR. Substantive policy changes require an explanatory PR and an explicit version change; daily runs cannot rewrite policy to pass checks.

---

## 14. Reference Documents (Contract `healthtech-1.0`)

| Document                                     | Purpose                                                        |
| -------------------------------------------- | -------------------------------------------------------------- |
| `CONSTITUTION.md`                            | Mission, scope, principles, accountability                     |
| `CONTENT_MODEL.md`                           | Storage/validation boundaries, file identities                 |
| `DAILY_ISSUE.md`                             | Edition contract, routes, empty-day behavior                   |
| `TECHSTACK.md`                               | Technical stack decisions                                      |
| `ROADMAP.md`                                 | Delivery sequencing                                            |
| `docs/editorial/DECISION_ENGINE_V1.md`       | Operational decision sequence, scoring, gates                  |
| `docs/editorial/EDITORIAL_SCHEMA_V1.md`      | Schema map, ledger envelope, claims, cross-file mappings       |
| `docs/editorial/DISCOVERY_V1.md`             | Bounded five-lane plan, queries, coverage recording            |
| `docs/editorial/PR_PREPARATION_V1.md`        | Publication handoff, safe writes, validation, PR evidence      |
| `docs/editorial/VISUAL_CONSTITUTION_V1.md`   | Editorial Science Photography direction, review gates          |
| `docs/editorial/ILLUSTRATION_SYSTEM_V1.md`   | Mandatory image gate, generation identity, review, persistence |
| `docs/editorial/SCIENCE_WRITING_STANDARD.md` | Reader-first reporting, voice, structure, acceptance checklist |
| `docs/editorial/ORCHESTRATOR.md`             | 8-phase run protocol, ownership, checkpoints, CI handoff       |
| `docs/editorial/ledgers/README.md`           | Ledger lifecycle guidance                                      |
| `docs/editorial/TOPICS_V1.yml`               | Controlled topic vocabulary                                    |
| `src/lib/editorial-schema.ts`                | Executable Zod schemas (source of truth for validation)        |
| `scripts/lib/editorial.ts`                   | `validateLedger`, `validateIllustration`, `checkEditorial`     |
| `scripts/lib/orchestration.ts`               | `acquireRun`, `checkpoint`, `ensureDraft`, `ciOutcome`         |

---

_Adopted 21 October 2026. This is the authoritative editorial policy for HealthTech AI Pulse under contract `healthtech-1.0`._
