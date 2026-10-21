## HealthTech AI Pulse — YYYY-MM-DD

<!-- Keep automated editions draft. Describe actual checks and review; never precheck approval. -->

- Contract ref:
- Batch mode: publication / ledger-only
- Search window, completed cutoff and coverage gaps:
- Selected / drafted / withheld / watch / rejected counts:

### Selected and publication outcomes

| Candidate / story | Desk | Format / depth | Score and rationale | Verification | Drafted / withheld reason |
| ----------------- | ---- | -------------- | ------------------- | ------------ | ------------------------- |

### Evidence and applicability

For each drafted story: inspected primary sources and claim locators, access limits,
study/validation setting, clinical-utility boundary, limitations, funding/COI,
contradictions and correction/retraction observations. Distinguish model performance,
workflow outcomes, patient benefit, regulatory status and availability.

### Deduplication and research memory

- New development or material delta with prior IDs:
- Watch items and promotion conditions:
- Rejections / already covered:
- Withheld selected candidates, preserving the research decisions:
- Human overrides: actor, actual time, reason and scope, or none:

### Publication files

- Full ledger: `docs/editorial/ledgers/YYYY-MM-DD.json`
- Candidate → story → issue mappings, or ledger-only reason:
- Mandatory image for every surviving new story: asset/review paths and exact identity (or withhold reason):
- Featured and MUST KNOW: separately justified, or none:
- Locale coverage: English; French is not configured:

### Narrative and imagery review

- Does the lead communicate a real, supported question or consequence before jargon?
- Are key numbers, study context and uncertainty understandable without specialist background?
- Cut stock AI phrasing, template headings, redundant caveats, unsupported drama and jargon.
- Image concepts, why the chosen **human-centred or conceptual** photograph is story-specific, actual crop/thumbnail findings and four editorial gate results:
- Headline + photograph medical accuracy; where fictional people/scenes appear, confirm an explicit illustrative caption:
- Verify that the delivered WebP is standalone and text-free, with all headlines, dates and labels supplied by Astro:
- Four historical image-free stories remain a backfill item, not an acceptable mode for new editions.

### Validation and handoff

Report passed / failed / not run, environment, exact revision and evidence for:

- `npm run editorial:check -- docs/editorial/ledgers/YYYY-MM-DD.json`
- `npm run illustration:check -- docs/editorial/ledgers/YYYY-MM-DD.json`
- `npm run verify`
- `npm run test:e2e`
- Source verification and relevant human/model inspection
- Latest-head CI, actual tested merge revision and run URL
- Preview URL and tested revision, when available

A ledger-only batch has no article, issue or artwork. Builds and preview availability
do not establish scientific correctness. Human review and merge control publication.
