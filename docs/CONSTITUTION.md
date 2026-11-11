# HealthTech AI Pulse — Constitution

Status: adopted foundation. Owner: the repository maintainer.

## Mission and audience

Help people building and evaluating healthcare and pharmaceutical AI understand what changed, what the evidence supports, and what deserves investigation next. The primary audience is technical product leads, healthcare AI engineers, translational researchers, and clinical innovation teams. Clinicians, policy specialists, and investors are secondary audiences; their needs must not pull the publication into treatment guidance, a comprehensive regulatory service, or investment advice.

Every story must help readers decide whether to investigate, evaluate locally, monitor, or reconsider a technology or assumption. A benchmark result, trial registration, product announcement, and demonstrated patient benefit are different developments.

## Scope

Cover clinical AI; health-system operations and digital health; AI across the medicines lifecycle; biomedical models, data, and tools; and safety, adoption, regulation, and governance. Lead with European relevance, including Luxembourg and neighbouring countries when material, and cover international evidence without geographic quotas.

AI is the organising focus. A non-AI development qualifies only when it materially changes the evidence, infrastructure, safety, access, or operating conditions of these covered workflows. General pharma earnings, routine funding, unrelated drug approvals, consumer wellness launches, and generic AI announcements are outside scope. Apply the explicit inclusion test in EDITORIAL.md.

## Principles

1. Claims must be traceable to inspected sources. Never invent sources, dates, findings, quotations, metrics, implementation details, reviewer identities, or approvals.
2. Judge evidence against the claim. Source provenance, publication status, study design, validation setting, independence, and clinical utility are separate dimensions. Peer review and regulatory authorization are not universal quality seals.
3. Separate reported model performance from patient benefit, association from causation, and sponsor claims from independent findings. Do not generalise beyond the studied setting.
4. Show uncertainty, missing information, limitations, conflicts of interest, access restrictions, contradictory findings, corrections, and retractions where relevant.
5. Prefer fewer useful stories. Empty desks and ledger-only days are valid. Selection scores support decisions and cannot override publication gates.
6. Preserve the research record. Selected, watch, and rejected decisions remain auditable; withholding a selected story is a separate publication outcome. Later decisions and explicit human overrides append history.
7. Readers must be able to find the sources, understand the claim boundary, and distinguish reporting from editorial interpretation. Articles must read as clear, engaging science journalism—not templated AI summaries; the story's evidence sets the narrative, never the other way around.
8. Every newly prepared article must carry a medically responsible, story-specific, reviewed scientific editorial illustration. A failed or unavailable image withholds the article; there is no decorative placeholder escape hatch. Legacy articles needing image backfill are documented openly.
9. Publish through human-reviewed Git changes. Automation never writes editorial batches to main, merges, enables auto-merge, or marks publication PRs ready for review.
10. Collect no patient information. Use public evidence and lawfully accessible material; do not bypass access controls or copy entire protected papers or datasets.
11. Keep operations sustainable for one maintainer. Automation must reduce review effort without concealing failures.

## Accountability

The maintainer is the accountable editor and final publication authority. Model research, extraction, drafting, translation, and self-review must be disclosed as such; they are not independent human validation. The maintainer checks the central claim, title, narrative clarity, evidence card, limitations, source access, visual specificity and honest captioning, and exact PR revision before merge. When a claim requires expertise the editor cannot adequately assess, narrow it to verifiable facts, obtain a suitable specialist review, or withhold it. No fabricated clinical endorsement is acceptable.

Visible corrections preserve a dated explanation of material changes. Retractions and serious source challenges trigger immediate assessment and a correction or withdrawal PR; do not erase history. Sponsored interests, affiliate relationships, and relevant editorial conflicts must be disclosed. Sponsorship cannot purchase selection or evidence ratings.

## Initial operating defaults

English canonical articles; French deferred until a medically appropriate glossary and review workflow are adopted. Daily research in Europe/Luxembourg, with zero to two drafted articles per date during the pilot. Publication occurs only when reviewed, with no guaranteed daily output. Review workload after ten research runs.

## Non-goals

No personalised medical advice, diagnosis, treatment recommendations, prescribing, patient chatbot, clinical decision-support product, systematic-review service, exhaustive newswire, automated investment recommendations, or unreviewed autonomous publication. No accounts, patient-data backend, newsletter subscriber database, or paid integrations in the initial MVP.

## Authority and change

This document governs purpose and non-negotiable principles. EDITORIAL.md owns editorial rules; TECHSTACK.md owns technical decisions; ROADMAP.md owns delivery sequencing. Machine contracts validate structure and cross-file relationships, not scientific truth. If a machine contract conflicts with policy, stop the affected publication and fix the inconsistency through a reviewed PR. Substantive policy changes require an explanatory PR and an explicit version change; daily runs cannot rewrite policy to pass checks.
