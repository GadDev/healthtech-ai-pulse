---
title: Three-quarters of non-English medical AI evaluations lack an English-language comparison, review finds
description: A scoping review maps language-specific evaluation gaps; its proposed reporting
  checklist still needs validation.
date: 2026-10-12
draft: false
category: safety-policy
tags:
  - evaluation
  - fairness
  - implementation
type: pulse
depth: general
candidateId: 2026-10-12-clinical-ai-language-evidence
editorialDate: 2026-10-12
contractVersion: healthtech-1.0
evidence:
  publication_status: Peer-reviewed scoping review, published 12 October 2026
  study_design: Scoping review and descriptive meta-research; no risk-of-bias assessment or pooled
    effectiveness estimate.
  validation_setting: 806 published evaluations; PubMed, Scopus and Embase searched January
    2022–February 2026; English-indexed corpus.
  independent_validation:
    Second reviewer screened a random 25% sample; LINGUA was derived and scored
    in the same corpus, not independently validated.
  clinical_utility: not-assessed
  access_level: full-text
  funding: Authors report no external funding.
  conflicts_of_interest: Authors declare no competing interests.
  corrections_retractions:
    No correction/retraction notice identified on inspected publisher record or
    targeted DOI search as of this review; not exhaustive surveillance.
  contradictory_findings:
    - 'Regional repositories were excluded: missing indexed evidence does not prove no evaluation
      exists in those languages.'
  limitations:
    - Most extraction used titles/abstracts; only a 100-study sample received full-text assessment
      of translation and cultural adaptation.
    - Search ends February 2026; regional databases and citation chasing excluded.
    - LINGUA is a proposed instrument requiring prospective validation, not an adopted standard.
  applicability: Supports language- and task-specific evidence appraisal, not a claim that a
    particular model is unsafe or that all languages have the same gap.
claims:
  - language-evidence-coverage
sources:
  - id: primary
    label: Communications Health
    url: https://www.nature.com/articles/s44528-026-00042-1
illustration:
  mode: generated
  image: /images/stories/2026-10-12-clinical-ai-language-evidence.webp
  width: 1672
  height: 941
  alt: Two people compare illustrated health-information sheets with a world map spread across a table.
  caption: Staged illustration of multilingual health communication—not a study participant, evaluated AI translation tool or demonstrated clinical deployment.
  reviewPath: docs/editorial/illustrations/reviews/2026-10-12-clinical-ai-language-evidence.json
corrections: []
---

A medical AI tool that performs well in English may face a very different test in another language. That matters wherever patients and clinicians switch between languages—or work in one that receives little attention from technology developers.

A review published on **12 October 2026** examined **806 evaluations** of clinical language models spanning **62 non-English languages**. Just **202 studies** included an English-language comparison. The numbers describe the published evaluations the reviewers found, not a head-to-head ranking of languages or proof that a particular model is safe or unsafe.

### What the review could—and could not—find

The authors searched PubMed, Scopus and Embase through **February 2026**. Much of the information was extracted from titles and abstracts. They examined full texts for a smaller subset of **100 studies** to look more closely at translation methods and cultural adaptation.

There are important gaps in that map. The search did not include regional repositories, so local work may have been missed. The reviewers did not formally assess risk of bias or combine studies into a single measure of effectiveness. And studies that ask different questions, use different tasks or report results differently cannot be treated as interchangeable.

The authors also propose a reporting checklist called **LINGUA**. It could help researchers describe multilingual evaluations more consistently, but it was developed and assessed using the same body of literature. It still needs testing on independent future studies before it can be treated as an established standard.

### Why the language of evaluation matters

For a multilingual hospital, the practical question is narrower than “Does this model work in many languages?” It is whether the model has been evaluated in **the language, clinical task and care setting where it will actually be used**. A good result on an examination-style benchmark does not establish safe clinical deployment, and an English result cannot simply stand in for another language.

This briefing draws on the publisher's full-text review, especially its methods and limitations. The authors report no external funding or competing interests. The article was prepared retrospectively for the 19 October edition; the study itself was published on 12 October.
