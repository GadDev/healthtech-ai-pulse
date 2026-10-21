---
title: Epilepsy AI pilot tests patient feedback, with detector gains confined to replay
description: A 13-patient inpatient pilot separates live device interaction from offline detector
  adaptation; patient benefit remains unproven.
date: 2026-10-13
draft: false
category: clinical-ai
tags:
  - evaluation
  - implementation
  - medical-devices
type: pulse
depth: general
candidateId: 2026-10-13-epilepsy-feedback-replay
editorialDate: 2026-10-13
contractVersion: healthtech-1.0
evidence:
  publication_status: Peer-reviewed original research, version of record 13 October 2026
  study_design: Prospective inpatient feasibility pilot plus offline pseudoprospective replay of
    detector fine-tuning.
  validation_setting: Single University of Pennsylvania epilepsy monitoring unit; 13 patients (11
    scalp EEG, two intracranial).
  independent_validation: No independent replication established; patient feedback and expert EEG
    annotations have distinct roles.
  clinical_utility: not-assessed
  access_level: full-text
  funding:
    NIH/NINDS and NIH training awards; named philanthropic foundations; additional author NIH,
    Department of Defense and Burroughs Wellcome support.
  conflicts_of_interest: Zack Goldblum, Haoer Shi and Brian Litt report a pending University of
    Pennsylvania provisional patent on the system (63/932,309).
  corrections_retractions: No notice found on inspected publisher record or targeted DOI search;
    ongoing surveillance not claimed.
  contradictory_findings:
    - Reduced false alarms came from offline simulation; live outpatient seizure reduction and
      quality-of-life benefit remain unproven.
  limitations:
    - Small selected inpatient cohort in a supervised, artificial setting.
    - Detector improvements were replayed offline, not a live randomized adaptive-care trial.
    - Sensitivity did not improve; remaining false alarms may still burden patients.
  applicability: Feasibility of patient/device interaction and a detector adaptation strategy; does
    not establish safe autonomous care or outpatient patient benefit.
claims:
  - feedback-detector-replay
sources:
  - id: primary
    label: Nature Medicine
    url: https://www.nature.com/articles/s41591-026-04680-4
illustration:
  mode: generated
  image: /images/stories/2026-10-13-epilepsy-feedback-replay.webp
  width: 1672
  height: 941
  alt: An adult wearing an EEG electrode cap holds a handheld feedback button while monitoring screens glow in the background.
  caption: Illustrative EEG monitoring scene. The person, brain imagery and screen signals do not depict participants, measured data or clinical outcomes from the reported replay study.
  reviewPath: docs/editorial/illustrations/reviews/2026-10-13-epilepsy-feedback-replay.json
corrections: []
---

False alerts are more than a technical nuisance in seizure-monitoring research: each one asks a person to decide whether the system has detected something real.

A study published on **13 October 2026** explored whether feedback from patients could help an electroencephalogram (**EEG**, a recording of the brain's electrical activity) detector make fewer mistakes. **Thirteen patients** used a conversational interface during supervised hospital monitoring.

That sounds like a live test of adaptive AI. The distinction is that the **interface was used prospectively**, while the measured performance of the updated detector came from an **offline replay** of collected data. The system was not shown to improve treatment.

### Fewer false alarms in replay

In the analysis using patients' push-button labels, fine-tuning was associated with a **median 77.8% reduction** in false alarms per hour across patients. The reported absolute difference was **0.306 fewer false alarms per hour**, with a 95% confidence interval from **0.202 to 0.629 fewer**.

Those two figures describe a detector comparison, not a reduction in seizure frequency or patient harm. The study did **not** show improved sensitivity. Even with fewer false alerts in the replay, remaining alarms could still burden people using the system.

The evaluation came from one hospital's supervised inpatient setting. That is very different from someone using a device at home over months, with interruptions, changing conditions and no immediate clinical team nearby.

### What should be tested next

The useful next question is not only whether a detector's score improves. It is whether people can give feedback reliably, whether retraining introduces missed events, and whether the system remains manageable and safe in the intended care setting. Those are separate tests; the replay result cannot answer all of them.

The published _Nature Medicine_ article, including its figure and limitations, is the source for this account. The authors report NIH and philanthropic support, and three authors disclose a pending patent related to the system. This story was prepared retrospectively for the 19 October edition.
