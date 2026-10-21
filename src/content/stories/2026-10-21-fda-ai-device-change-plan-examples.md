---
title: FDA sketches change-control plans for localized and continuously learning medical AI
description: Two hypothetical cases translate existing PCCP concepts into validation gates, subgroup checks, audit trails and post-market monitoring—not a new rule or authorization.
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

The U.S. Food and Drug Administration has added two hypothetical examples showing how a medical-device sponsor might plan, validate and monitor future changes to an AI system under a predetermined change control plan, or PCCP.

The examples appeared on the agency's **20 October 2026** device-update list. They are practical illustrations of the existing framework—not a new rule, a binding guidance revision or the authorization of either device described.

### Two different update patterns

The first fictional case is a sepsis-alert system that a hospital wants to adapt to local data. The example separates the proposed modifications into site-specific input weighting, fine-tuning of the final model layer and adjustment of an alert threshold. The modified model would be locked before validation and tested on an independent, sequestered local set against the authorized device and clinical ground truth.

The second case is a continuously learning cardiac-arrhythmia detector. Here, retraining, validation and deployment are automated. The example calls for predefined overall and subgroup performance criteria, blocks deployment if any criterion fails, records versions and deployment dates, uses staggered rollout and monitors for drift after release.

The contrast matters. A bounded local update can be validated before a locked release. A continuously learning system needs controls around the update pipeline itself, including automated rejection, rollback and traceability.

### What the examples clarify

Across the two cases, FDA emphasizes several recurring controls:

- pre-specifying which parts of a model or threshold may change;
- keeping validation data independent from retraining data;
- comparing the modified system with the previously authorized version and an appropriate reference standard;
- checking performance across relevant subgroups rather than relying only on an overall metric;
- stopping deployment when acceptance criteria are missed;
- recording version, validation and deployment history; and
- monitoring performance and data drift after release.

For the hospital-localized example, the agency also highlights data provenance and de-identification. For the continuously learning example, it explicitly recognizes additional risk where deployment can occur without a human in the update loop.

### The boundary on interpretation

These are fictional and incomplete examples. They do not specify a universally sufficient sample size, performance threshold or monitoring interval, and they do not supersede statutes, regulations or current guidance. No clinical benefit or product safety outcome was measured because no real device was evaluated.

**Editorial interpretation:** the useful reading is as a design checklist for an evidence package, not as a template that guarantees clearance. Teams should be able to identify every permitted change, the data that can trigger it, an independent validation set, subgroup failure rules, who or what can approve deployment, how rollback works and what post-market signal stops further updates.

The examples apply to the U.S. regulatory context. They should not be represented as requirements in the European Union or Luxembourg without a separate jurisdiction-specific analysis.
