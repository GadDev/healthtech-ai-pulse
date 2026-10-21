---
title: FDA shows how medical AI updates could be checked before release
description: Two fictional FDA examples show how hospitals and manufacturers might validate changing AI devices. They are not a new rule or product approval.
date: 2026-10-21
draft: false
category: safety-policy
tags:
  - medical-devices
  - regulation
  - governance
  - safety
  - evaluation
type: briefing
depth: specialist
candidateId: 2026-10-21-fda-ai-device-change-plan-examples
editorialDate: 2026-10-21
contractVersion: healthtech-1.0
evidence:
  publication_status: Official FDA webpage added 20 October 2026 with hypothetical PCCP case examples; it is an educational regulatory record, not a binding guidance change or device authorization.
  study_design: No research study. Official hypothetical examples illustrating how predetermined change control plans could describe, validate and monitor future AI-device modifications.
  validation_setting: 'Two fictional AI-device cases: a hospital-localized sepsis alert and a continuously learning cardiac-arrhythmia detector.'
  independent_validation: Not applicable to an official interpretive example. No product, sponsor submission or outcome study is evaluated.
  clinical_utility: not-applicable
  access_level: official-record-only
  funding: FDA publication; no separate funding disclosure on the inspected pages.
  conflicts_of_interest: Issuing regulator authored the examples. They illustrate FDA expectations but are explicitly hypothetical and incomplete.
  corrections_retractions: No correction or withdrawal notice identified on the inspected FDA pages during the bounded 21 October review.
  contradictory_findings:
    - The page offers implementation detail but explicitly says the cases are hypothetical, illustrative and incomplete; it does not create a new binding requirement.
  limitations:
    - The examples do not replace applicable statutes, regulations, guidance or sponsor-specific review.
    - No real device, authorization, safety event or measured clinical benefit is described.
    - The examples are U.S.-specific and should not be treated as EU or Luxembourg regulatory requirements.
  applicability: Useful to medical-device teams designing update protocols, sequestered validation, subgroup thresholds, audit trails and post-market monitoring. Legal and regulatory review remains product- and jurisdiction-specific.
claims:
  - fda-hypothetical-ai-pccp-controls
sources:
  - id: examples
    label: FDA — hypothetical PCCP case examples
    url: https://www.fda.gov/medical-devices/premarket-submissions-selecting-and-preparing-correct-submission/novel-medical-devices-predetermined-change-control-plans-hypothetical-case-examples
  - id: pccp-overview
    label: FDA — predetermined change control plan overview
    url: https://www.fda.gov/medical-devices/premarket-submissions-selecting-and-preparing-correct-submission/predetermined-change-control-plans
  - id: cdrh-updates
    label: FDA CDRH — 20 October 2026 update index
    url: https://www.fda.gov/medical-devices/medical-devices-news-and-events/cdrh-new-news-and-updates
illustration:
  mode: none
---

Medical AI can change after it reaches a hospital. A model may be adapted to local patients, or it may learn from new data. But how do you tell whether an update is safe enough to release?

On **20 October 2026**, the U.S. Food and Drug Administration published two fictional examples intended to make that question easier to discuss. They illustrate a **predetermined change control plan** (PCCP): a description of which future changes a device maker proposes, how each change would be checked and how performance would be watched afterwards.

This was **not** a new regulation, an approval of a medical device or evidence that either imagined system works in patients.

### Two ways an AI system could change

In the first example, a hospital wants to adapt a **sepsis alert** to its local data. The fictional device maker proposes adjusting input weights, refining the final layer of the model and changing an alert threshold. Before any modified version is used, the model would be locked and tested on an independent local dataset kept apart from the data used to train it. The comparison includes the previously authorised version and a clinical reference standard.

The second example is a **heart-rhythm detector** that learns continuously. Here, the system may retrain and deploy updates through an automated pipeline. That requires a different kind of safeguard: predefined checks on overall and subgroup performance, a block on deployment when a threshold is missed, version records, a staged rollout and monitoring for changes in performance after release.

The key distinction is not simply how often an algorithm changes. It is **where the safety decision happens**. In one case a team validates a fixed local update; in the other, the update process itself needs reliable stop and rollback controls.

### What is useful—and what remains hypothetical

Both examples make a strong case for keeping training and validation data separate, checking whether performance differs between patient groups and recording what changed and when. The sepsis scenario also addresses where data came from and how identifying information is removed. The continuously learning scenario draws attention to the risks of releasing updates without a person approving each one.

But these are illustrative scenarios, not clinical studies. They provide **no measured patient benefit**, no universally acceptable sample size and no one-size-fits-all performance threshold. The agency itself describes the cases as incomplete. They do not replace existing laws, regulations, guidance or product-specific review.

For teams building medical-device software, the immediate value is a better set of questions: Which parts of the system may change? What independent evidence permits a new release? What makes the update stop? Who can roll it back? What signal would trigger a post-release investigation?

Those questions follow from the examples; answering them for an actual device still requires its own evidence and regulatory assessment. And the FDA examples concern the **United States**, not the legal requirements for the European Union or Luxembourg.

The linked FDA case examples and PCCP overview are the primary sources for this briefing.
