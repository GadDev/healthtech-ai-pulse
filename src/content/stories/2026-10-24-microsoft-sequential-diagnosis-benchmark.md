---
title: Microsoft diagnostic orchestrator beat generalist physicians in two text simulations
description: MAI-DxO produced more correct final diagnoses than individual generalists in two controlled benchmarks. The study did not test patient care.
date: 2026-10-24
draft: false
category: clinical-ai
tags:
  - diagnostics
  - decision-support
  - evaluation
  - reproducibility
type: briefing
depth: specialist
candidateId: 2026-10-24-microsoft-sequential-diagnosis-benchmark
editorialDate: 2026-10-24
contractVersion: healthtech-1.0
evidence:
  publication_status: Peer-reviewed Science paper published 22 October 2026; prior preprint first appeared in June 2025.
  study_design: Controlled sequential-diagnosis benchmark comparison of language-model agents and individual generalist physicians using text-derived cases.
  validation_setting: Held-out sets of 56 difficult NEJM clinicopathological cases and 71 clinician-reviewed MIMIC-IV emergency-department encounters, presented through a simulated text gatekeeper.
  independent_validation: No independent prospective validation was found. The second dataset broadens the setting but was constructed and evaluated by the same Microsoft team.
  clinical_utility: not-assessed
  access_level: full-text
  funding: The accessible manuscript did not expose a formal funding declaration. The work was conducted by Microsoft-affiliated authors; no separate funder is inferred.
  conflicts_of_interest: All listed authors are affiliated with Microsoft. A complete final-paper competing-interest declaration did not surface in the accessible manuscript and is recorded as unavailable.
  corrections_retractions: No correction, retraction or expression of concern was identified in the publisher, DOI, PubMed-style or artifact checks on 24 October 2026.
  contradictory_findings:
    - The public NEJM cases may have appeared in model training data, and the paper does not report a direct contamination test.
    - The gatekeeper can synthesize plausible findings when source cases lack requested details, so the interaction is not a faithful replay of a clinical encounter.
    - Reported cost figures standardize test prices and do not measure actual care spending.
  limitations:
    - Both evaluations are text-only simulations; they exclude direct patient interaction, imaging and waveforms, treatment decisions, longitudinal management and clinical outcomes.
    - The physician comparison used individual generalists in the same artificial interface, not specialist teams or real clinical workflows.
    - NEJM clinicopathological cases are unusually difficult and selected for educational interest; the MIMIC set excludes healthy and benign presentations.
    - A model gatekeeper controls information release and may synthesize absent details.
    - No external prospective validation, regulatory assessment or deployment evidence was identified.
  applicability: Useful for developers evaluating interactive diagnostic agents and test-selection behavior. It does not support autonomous diagnosis or procurement for patient care.
claims:
  - mai-dxo-two-simulation-accuracy
sources:
  - id: science-sequential-diagnosis
    label: Science — peer-reviewed version of record
    url: https://doi.org/10.1126/science.aeh7930
  - id: author-sequential-diagnosis-manuscript
    label: Author-hosted full manuscript
    url: https://erichorvitz.com/sequential_diagnosis_LM.pdf
  - id: physionet-sdbench
    label: PhysioNet — versioned SDBench artifact
    url: https://physionet.org/content/mimic-iv-ext-sdbench/1.0.0/
illustration:
  mode: generated
  image: /images/stories/2026-10-24-microsoft-sequential-diagnosis-benchmark.webp
  width: 1536
  height: 1024
  alt: A blank clinical record unfolds into branching teal paths beside a separate human profile contour.
  caption: A record, branching requests and a separate human contour evoke a text-only diagnostic simulation; they are not a patient encounter, clinical workflow or proof of better care.
  reviewPath: docs/editorial/illustrations/reviews/2026-10-24-microsoft-sequential-diagnosis-benchmark.json
---

A Microsoft diagnostic orchestrator produced more correct final diagnoses than individual generalist physicians in two controlled, text-only simulations. That is a notable benchmark result, but it is not a clinical trial and it does not show that the system improves patient care.

The peer-reviewed study, published in _Science_ on **22 October 2026**, evaluates a system called MAI-DxO. Rather than asking one language model for a diagnosis, the orchestrator assigns the model several roles: proposing a differential, choosing questions and tests, challenging hypotheses and combining repeated runs into a final answer.

Its test environment, SDBench, begins with a short case summary. A physician or model asks for additional history, examination findings or tests. A separate gatekeeper model reveals information from the source case, and can create a plausible answer when the source does not contain the requested detail.

### Two held-out comparisons

The first benchmark turned 304 _New England Journal of Medicine_ clinicopathological conference cases into sequential encounters. These cases are intentionally difficult and educationally selected. In the 56-case held-out comparison, GPT-5 with MAI-DxO reached **83.2% diagnostic accuracy**. Nineteen generalist physicians who could use external references averaged **36.1%**; a separate closed-book group scored lower.

The second benchmark used 325 encounters derived from MIMIC-IV emergency-department records. Clinicians reviewed the final diagnoses before inclusion. On the 71-case held-out set, the same orchestrator configuration scored **80.3%**, compared with **46.8%** for 16 generalist physicians.

Those numbers describe final-answer agreement within the benchmark. They do not compare the system with multidisciplinary teams, specialists who know a patient, or clinicians working with images, waveforms and a live electronic record. The study also did not measure treatment decisions, follow-up, safety events or patient outcomes.

### What the second dataset adds

Microsoft first promoted MAI-DxO from a 2025 preprint using the public NEJM cases. The Science paper matters because it adds peer review, newer model configurations, the second emergency-department-derived dataset and a versioned public SDBench artifact on PhysioNet.

The MIMIC evaluation reduces reliance on one collection of polished diagnostic puzzles. It does not make the work independent: the same Microsoft team constructed the benchmark, ran the models and authored the paper. All listed authors are affiliated with Microsoft, and no external prospective validation was identified.

The public NEJM cases also create a possible contamination problem. A frontier model may have encountered them during training. The paper does not report a direct contamination test, so the NEJM result cannot isolate reasoning from recall. The MIMIC-derived cases are a useful counterweight, but still pass through a model-mediated text interface.

### A benchmark, not a deployment claim

The paper reports estimated diagnostic costs alongside accuracy. These estimates apply standardized US price proxies to requested tests. They are not invoices, utilization data or evidence of healthcare savings. The gatekeeper can also synthesize absent details, a convenience that real clinicians do not have when information is missing.

SDBench is nevertheless more demanding than a static multiple-choice exam. It exposes what an agent asks next, how quickly it commits to a hypothesis and whether an orchestration strategy changes test selection. The PhysioNet release gives other researchers a defined artifact to inspect and, where access permits, reproduce.

The responsible conclusion is therefore narrow: in two author-constructed text simulations, one MAI-DxO configuration outperformed the participating individual generalists on final diagnostic accuracy. Whether that advantage survives real prevalence, incomplete records, multimodal evidence, clinical teamwork and safety monitoring remains unanswered.
