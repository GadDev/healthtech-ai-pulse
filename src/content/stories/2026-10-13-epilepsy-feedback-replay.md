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
  mode: none
corrections: []
---

A 13 October study connected inpatient EEG monitoring to a conversational interface used by 13 patients. Its detector results need a careful label: patients used the interface prospectively, while adaptive detector performance was evaluated through offline, pseudoprospective replay.

In the push-button-label analysis, fine-tuning reduced false alarms per hour by a median 77.8% across patients: an absolute difference of −0.306, with a 95% confidence interval from −0.629 to −0.202. This is a detector comparison, not evidence of fewer seizures.

The single-site, supervised monitoring setting differs from outpatient life. Sensitivity did not improve, and remaining alarms could still burden patients. The study does not establish autonomous-care safety or long-term clinical benefit.

**Editorial interpretation:** assess the patient interface, detector updates and clinical outcomes as separate components. Replay gains justify further evaluation, not a claim that treatment improved.

Source access: publisher full text inspected, including Figure 5 and the limitations and safeguards. Funding included NIH and philanthropic support; three authors disclose a pending system patent. Prepared retrospectively on 19 October for human editorial review.
