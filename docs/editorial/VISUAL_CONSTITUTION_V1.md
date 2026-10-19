# HealthTech visual constitution

Contract: `healthtech-1.0`. Apply these visual authoring rules to generated HealthTech artwork. [Editorial policy](../EDITORIAL.md) controls evidence and medical claim boundaries. This document does not establish clinical validity or override that policy; [the illustration system](ILLUSTRATION_SYSTEM_V1.md) defines production, identity, review records and validation.

## Compose from verified context

Build the brief from the story ID, two or three supported context sentences, one visual idea, intended placement and crop. Use the actual HealthTech article renderer and stylesheet for composition: `src/pages/stories/[...id].astro` and `src/styles/publication.css`. Do not claim that source reference-layout pages or additional image placements exist here.

Use Quiet Laboratory's photorealistic editorial direction. Choose a story-relevant setting or still life, soft light, restrained colours and generous negative space. The shared palette is white `#FFFFFF`, ink `#424242`, teals `#51796E` and `#344F51`, pale sage `#E8EFEC`, mist `#D1E0E2`, with rose `#D4A298` and caramel `#BC8A5F` as sparing accents. Keep small text in ink or dark teal. Avoid generic lab stock imagery. Generated photographs must be captioned as illustrative wherever a reader could mistake them for documentation of the study, people or institution.

Reject unsupported medical implications before judging aesthetics. In particular:

- Do not invent anatomy, scans, molecular mechanisms, study results, patient outcomes or clinical endorsements.
- Do not use generated charts or numbers as factual evidence. Data graphics require source data and a reproducible method under editorial policy.
- Do not generate words, labels, logos, headlines, UI, screenshots, watermarks, borders or frames. The website supplies its own text.
- Avoid generic robots, glowing brains, neon and stock AI imagery. A photographic setting must not imply it depicts the actual study, participants, institution or a clinical outcome absent from reporting. Use a neutral still life or withhold imagery when a literal scene would mislead.

Compare with approved HealthTech artwork when available. Do not import source artwork, approvals or a supposed target reference archive. Record honestly when no target comparison is available.

## Review order and authority

Reject unsupported medical implications and prohibited content before considering aesthetics. Then inspect the actual crop, contrast and reduced-size legibility. Attractive artwork cannot compensate for a misleading clinical implication. Do not treat a high model confidence score as visual or scientific validation.

Use the real HealthTech renderer and approved target references when available; source-publication layouts and artwork are not target production evidence. One candidate is sufficient under the target contract. No golden-reference archive, multi-candidate competition or numerical aesthetic scoring is required or implied here.

Include material visual constraints in the exact final brief. Changes to this guide require reassessing that brief and the recorded review before reuse; updating a timestamp alone is not a new review. Record unresolved failures and withhold declared imagery until repaired.

Adapted from `GadDev/daily-ai-pulse/docs/editorial/VISUAL_CONSTITUTION_V1.md` at `6269d2b7dbc01046cfcdaf7f204b8b6b14de9e64`. The target retains its healthcare restrictions, optional imagery and `healthtech-1.0` identity rather than adopting the source's separate version hierarchy.
