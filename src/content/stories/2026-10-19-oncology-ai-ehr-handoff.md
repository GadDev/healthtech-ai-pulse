---
title: 'Oncology AI summary changed unknown allergies to "no known allergies" in two cases'
description: A Dutch consultation-preparation study reports perceived workload gains alongside an integration error that turned unknown allergy information into a negative statement.
date: 2026-10-19
draft: false
category: health-systems
tags:
  - implementation
  - interoperability
  - safety
  - evaluation
type: briefing
depth: specialist
candidateId: 2026-10-19-oncology-ai-ehr-handoff
editorialDate: 2026-10-19
contractVersion: healthtech-1.0
evidence:
  publication_status: Peer-reviewed accepted manuscript; article in press, published 17 October 2026.
  study_design: Prospective single-group pre/post usability evaluation; non-randomised.
  validation_setting: One Dutch head-and-neck oncology department; six clinicians and three supervisors.
  independent_validation: Developer-affiliated authors; primary analysis separated institutionally. No independent multisite replication established.
  clinical_utility: not-assessed
  access_level: full-text
  funding: Health~Holland grant 50545-3.
  conflicts_of_interest: Three authors employed by kaiko.ai; one former employee. Institutional team performed primary outcome analysis; supplier-affiliated physician contributed to secondary discrepancy review.
  corrections_retractions: No correction/retraction notice identified in inspected publisher records or targeted DOI search at extraction time; not continuous surveillance.
  contradictory_findings:
    - Earlier conference abstract reports 30.1% workload reduction and no observed hallucinations; journal report uses a different estimate and details downstream discrepancies. Use journal definitions and results; do not merge the estimates.
  limitations:
    - Single group, small sample and self-reported outcomes; baseline and follow-up refer to different measurement contexts.
    - 33 analysed consultations from 72 eligible; incomplete capture may favour successful use.
    - No prespecified prospective safety endpoint or systematic review of every summary; discrepancy frequency cannot be estimated.
    - Proprietary implementation/prompts and restricted underlying data limit independent reproduction.
  applicability: Early workflow evaluation in one specialised Dutch department. No demonstrated patient benefit, general safety claim, efficacy comparison or EU market-authorisation conclusion.
claims:
  - workflow-usability
  - ehr-handoff-discrepancies
sources:
  - id: journal
    label: Accepted journal record — publication status and disclosures
    url: https://www.nature.com/articles/s41746-026-03396-6
  - id: manuscript
    label: van Koevorden and colleagues — accepted manuscript, methods and Table 1a
    url: https://www.nature.com/articles/s41746-026-03396-6_reference.pdf
  - id: supplement
    label: Study supplement — consultation flow and workload analysis
    url: https://media.springernature.com/original/springer-static/esm/art%3A10.1038%2Fs41746-026-03396-6/MediaObjects/41746_2026_3396_MOESM1_ESM.pdf
  - id: conference
    label: Earlier IFHNOS conference abstract — context, not the current estimate
    url: https://ifhnos2026.org/au/talks/ai-supported-consultation-preparation-in-oncology-a-real-world-clinical-usability-study
illustration:
  mode: generated
  image: /images/stories/2026-10-19-oncology-ai-ehr-handoff.webp
  width: 1536
  height: 1024
  alt: Two blank translucent record leaves overlap, with an open aperture above a solid patch at their seam.
  caption: An open aperture becoming a solid patch represents uncertainty lost during a record handoff; it is not an actual medical record, allergy finding or measured error rate.
  reviewPath: docs/editorial/illustrations/reviews/2026-10-19-oncology-ai-ehr-handoff.json
---

An AI summary can preserve uncertainty and still lose it on the way into the record. That is the practical finding in a Dutch oncology usability report published on 17 October. The study concerns consultation preparation, rather than automated diagnosis or treatment.

### What the handoff changed

In two participant-reported cases, the model output retained “No information available” for allergies. Downstream processing and EHR integration produced “No known allergies” instead. The authors locate that change after the primary summary generation. These were two separate occurrences, not a measured system-wide error rate. See the accepted manuscript, page 4, Table 1a.

That distinction matters for evaluation. Reviewing the generated text alone would miss a change introduced later. A test should therefore follow information through the complete path: extraction, transformation, display and the final record. Responsibility for checking each boundary needs an owner, even when several suppliers maintain different stages.

### Usability is a separate result

The prospective, single-group study involved nine professionals and analysed 33 consultations from 72 eligible encounters. It reported a 12.3-point lower perceived workload on the Raw NASA-TLX scale, with a 95% confidence interval from 3.3 to 21.7 points lower. Participants rated 21 of the 33 summaries complete. These findings describe reported experience in one department; they do not establish patient benefit.

The supplement helps interpret those denominators. Missing observations and operational failures can make successful-use experiences more visible than unsuccessful ones. Baseline and intervention workload ratings also used different reference contexts. The estimate is useful for planning a better evaluation, rather than forecasting the return from a rollout elsewhere.

### What a local evaluation should ask

**Editorial interpretation:** preserve the difference between an unknown value and an explicitly documented negative. A practical test case can start with a source document that omits a field and check what survives in the saved record. Repeat it after each transformation, including any apparently harmless default or display rule.

Keep operational and safety questions separate. Measure whether people can finish preparation, what they must verify, and how often they return to source documents. Assess source attribution and missing information independently of perceived convenience. Define escalation and correction routes before using a time-saving estimate to justify broader deployment.

This study did not systematically audit every summary or prespecify a prospective safety endpoint. Its discrepancy reports therefore cannot establish incidence or general safety. Human verification remains part of the evaluated workflow; the paper is not an endorsement of autonomous clinical use.

### Access, independence and prior reporting

This briefing used the accepted manuscript and supplement, including the methods and discrepancy table. The earlier conference abstract is linked for context; its workload estimate and hallucination wording differ, so they are not combined with the journal findings. No correction or retraction notice was identified in the inspected materials and targeted search at preparation time.

Health~Holland funded the study. Several authors have current or former kaiko.ai employment; the authors describe separation of primary outcome analysis from development. Proprietary pipeline details and restricted underlying data constrain reproduction. See the evidence card and the paper’s disclosures before treating this as independent validation.
