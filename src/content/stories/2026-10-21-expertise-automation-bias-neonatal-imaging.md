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
  mode: generated
  image: /images/stories/2026-10-21-expertise-automation-bias-neonatal-imaging.webp
  width: 1536
  height: 1024
  alt: A translucent tracing layer sits displaced above a smooth organic contour, leaving a clear gap between them.
  caption: A displaced tracing overlay evokes checking AI advice against an observation; it is not a radiograph, diagnostic finding, study interface or neonatal outcome.
  reviewPath: docs/editorial/illustrations/reviews/2026-10-21-expertise-automation-bias-neonatal-imaging.json
---

When a medical AI system gives the wrong answer, what matters next is whether the person reading it spots the mistake. In a study published on **20 October 2026**, researchers deliberately showed clinicians incorrect AI advice while they interpreted X-rays of newborns. The clinicians did not all respond in the same way.

That finding raises a practical question for hospitals: how should they test the _partnership_ between a clinician and an algorithm, not just the algorithm's accuracy?

### A wrong suggestion, by design

The researchers asked **14 clinicians**—six paediatric radiologists, three neonatologists and five radiology residents—to review 125 abdominal radiographs from 11 South Korean tertiary hospitals. They were looking for neonatal pneumoperitoneum, or air in the abdominal cavity.

The readers worked under three conditions: without AI, with reliable AI advice and with AI advice deliberately made wrong. Across the conditions, the researchers recorded **1,750 interpretations**. Those are readings of images, not 1,750 separate patients or clinicians.

In the wrong-advice condition, the five residents accepted **52%** of erroneous suggestions. The three neonatologists overrode **91.7%** of them. For that second figure, the reported 95% confidence interval ran from **83% to 96%**.

The difference is hard to ignore. It is also too early to turn into a rule about either profession.

### What the small study can tell us

Just **three neonatologists** took part. That makes their apparent resistance to incorrect advice interesting, but uncertain. The paper reports a statistical interaction between reader group and AI condition (_p_ = 0.020). Yet the individual comparisons after correction for multiple testing were imprecise and did not reach statistical significance. The authors treat the neonatologist pattern as hypothesis-generating.

Nor was this a trial of AI in routine care. The images were collected retrospectively, and the interpretations took place in a study interface. The experiment did not follow treatment choices, patient outcomes or clinical harms. All 125 images came from South Korean tertiary hospitals, so the findings may not carry over to other wards, devices or clinical teams.

The underlying research model performed well in external image testing, but model performance was not the main safety question here. Its author-maintained code is offered for research and education, not clinical use.

### The test hospitals still need

A hospital evaluating diagnostic AI could learn from this design by including **deliberately wrong suggestions** in supervised tests. Who notices them? Who accepts them? Does an uncertain recommendation look different from a confident one? What happens when the reader and the software disagree?

These are questions for a local evaluation, not recommendations to deploy this model. The study offers evidence that experience may shape reactions to AI errors. It does **not** show that AI improves outcomes for newborns.

The article and supplement in _npj Digital Medicine_ provide the methods and subgroup analyses. The authors report no competing interests; the study lists institutional and public research support. No correction or retraction notice was identified in the materials inspected for this edition.
