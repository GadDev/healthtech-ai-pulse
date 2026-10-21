---
title: Expertise changed how clinicians responded to wrong neonatal-imaging AI advice
description: A 14-reader simulation found sharply different responses to deliberately wrong AI suggestions, but small subgroups and wide uncertainty limit what can be generalized.
date: 2026-10-21
draft: false
category: clinical-ai
tags:
  - diagnostics
  - medical-imaging
  - decision-support
  - evaluation
  - safety
  - implementation
type: briefing
depth: specialist
candidateId: 2026-10-21-expertise-automation-bias-neonatal-imaging
editorialDate: 2026-10-21
contractVersion: healthtech-1.0
evidence:
  publication_status: Peer-reviewed npj Digital Medicine article published online 20 October 2026; accepted early version inspected with a full supplementary PDF.
  study_design: Multi-reader crossover diagnostic study with unaided, reliable-AI and deliberately error-injected AI conditions; 1,750 interpretations across 14 readers and 125 radiographs.
  validation_setting: Retrospective external radiographs from 11 South Korean tertiary hospitals, interpreted in a study interface rather than live clinical care.
  independent_validation: The reader set and images were external to model training, but the evaluation was author-run; no independent replication or live-site implementation study was reported.
  clinical_utility: measured-no-demonstrated-benefit
  access_level: full-text
  funding: Reported support from Asan Medical Center, the Korea Health Industry Development Institute and the National Research Foundation of Korea; funders were reported to have no role in study conduct or reporting.
  conflicts_of_interest: The article reports no competing interests. The inspected code repository is author-maintained and marked for research/education, not clinical use.
  corrections_retractions: No correction or retraction notice was identified on the inspected article, supplement or repository during the bounded 21 October review.
  contradictory_findings:
    - Adjusted interaction tests support different condition effects by reader group, but individual post-hoc contrasts were wide and not significant after multiplicity correction.
    - The study found expertise-related resistance to erroneous AI advice, not proof that any AI-assisted workflow improves neonatal outcomes or routine diagnostic safety.
  limitations:
    - 'Only 14 readers participated: six paediatric radiologists, three neonatologists and five radiology residents; subgroup estimates are imprecise and the neonatologist finding is hypothesis-generating.'
    - The study was retrospective and simulated, with 125 selected images and no measurement of downstream treatment decisions, patient outcomes or harms.
    - All images came from South Korean tertiary hospitals; generalisability to other settings, devices, prevalence and reader mixes is unknown.
    - The error-injection condition isolates automation bias but does not reproduce the full pattern of failures or interface constraints of a deployed product.
  applicability: Useful for designing training, interfaces and escalation around diagnostic AI. It does not justify deploying the research model or extrapolating the observed reader behaviour to other specialties.
claims:
  - expertise-modulates-response-to-wrong-ai-advice
sources:
  - id: article
    label: npj Digital Medicine — accepted article and study results
    url: https://www.nature.com/articles/s41746-026-03399-3
  - id: supplement
    label: npj Digital Medicine — supplementary analyses
    url: https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41746-026-03399-3/MediaObjects/41746_2026_3399_MOESM1_ESM.pdf
  - id: code
    label: Author repository — research code and non-clinical-use notice
    url: https://github.com/junjslee/neonatal-ai-reliability
illustration:
  mode: none
---

A diagnostic-AI system can be highly accurate and still be unsafe if clinicians defer to it at the wrong moment. A study published in _npj Digital Medicine_ on **20 October 2026** tested that problem directly by giving clinicians both reliable and deliberately incorrect AI suggestions while they interpreted neonatal abdominal radiographs.

The result was not a simple contest between people and a model. It was a test of whether different readers acted as a safety backstop when the model was wrong.

### What the researchers tested

Fourteen readers—six paediatric radiologists, three neonatologists and five radiology residents—reviewed 125 radiographs for neonatal pneumoperitoneum. The cases came from 11 South Korean tertiary hospitals and were external to the model's training data. Across unaided, reliable-AI and error-injected conditions, the study recorded 1,750 interpretations.

In the deliberately wrong condition, the five residents accepted **52.0%** of erroneous suggestions. The three neonatologists overrode **91.7%** of them, with a reported Wilson 95% confidence interval of 83.0% to 96.0%.

That contrast is striking, but it is not a stable estimate of how whole professions behave. There were only three neonatologists and five residents. The authors describe the neonatologist pattern as hypothesis-generating, and multiplicity-adjusted post-hoc comparisons were imprecise and not statistically significant even though the adjusted group-by-condition interaction was reported at _p_=0.020.

### What the study does—and does not—show

The experiment supports a specific human-factors point: reader expertise can change how people respond to incorrect AI advice. It also shows why an aggregate model metric cannot stand in for evaluation of the full human–AI system.

It does **not** show that the research model improves routine care. The study was retrospective and simulated. It measured diagnostic decisions, not treatment, patient outcomes or clinical harms. The reader groups were small, and the selected cases do not reproduce the prevalence, interruptions or interface constraints of a live service.

The underlying high-reliability model had strong external test performance, but that is background to the safety question rather than evidence of deployment readiness. The authors' code repository is marked for research and education, not clinical use.

### The operational implication

**Editorial interpretation:** teams evaluating diagnostic AI should deliberately test wrong-answer scenarios by user group, not only average accuracy under normal model operation. Useful measures include when clinicians override the model, when they accept an erroneous suggestion, whether uncertainty is visible, and how escalation or second-reading changes those responses.

This study does not establish the right interface or training programme. It does make the failure mode measurable. Before deployment, a health system would still need a representative local evaluation, predefined stop criteria, monitoring for reader–model interaction and a clear route for resolving disagreement.
