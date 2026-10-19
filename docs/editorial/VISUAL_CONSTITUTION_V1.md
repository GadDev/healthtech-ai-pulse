# HealthTech visual constitution

Contract: `healthtech-1.0`. Apply these visual authoring rules to generated HealthTech artwork. [Editorial policy](../EDITORIAL.md) controls evidence and medical claim boundaries. This document does not establish clinical validity or override that policy; [the illustration system](ILLUSTRATION_SYSTEM_V1.md) defines production, identity, review records and validation.

## Compose from verified context

Build the brief from the story ID, two or three supported context sentences, one visual idea, intended placement and crop. Use the actual HealthTech article renderer and stylesheet for composition: `src/pages/stories/[...id].astro` and `src/styles/publication.css`. Do not claim that source reference-layout pages or additional image placements exist here.

Prefer a restrained editorial illustration with a scientific or architectural sensibility: one physical/spatial metaphor, deliberate geometry, subtle material texture, readable silhouette and generous negative space. Technical lines may support the image; they should not turn it into a bare flowchart, wireframe or diagram. Use the publication's warm canvas `#F3EBDD`, paper `#FAF6EE`, ink `#171B1A`, muted gray `#575D5B` and restrained terracotta `#8A4B35`.

Reject unsupported medical implications before judging aesthetics. In particular:

- Do not invent anatomy, scans, molecular mechanisms, study results, patient outcomes or clinical endorsements.
- Do not use generated charts or numbers as factual evidence. Data graphics require source data and a reproducible method under editorial policy.
- Do not generate words, labels, logos, headlines, UI, screenshots, watermarks, borders or frames. The website supplies its own text.
- Avoid generic robots, glowing brains, neon and stock AI imagery. Use abstraction when a literal depiction would imply more than the evidence establishes.

Compare with approved HealthTech artwork when available. Do not import source artwork, approvals or a supposed target reference archive. Record honestly when no target comparison is available.

## Review order and authority

Reject unsupported medical implications and prohibited content before considering aesthetics. Then inspect the actual crop, contrast and reduced-size legibility. Attractive artwork cannot compensate for a misleading clinical implication. Do not treat a high model confidence score as visual or scientific validation.

Use the real HealthTech renderer and approved target references when available; source-publication layouts and artwork are not target production evidence. One candidate is sufficient under the target contract. No golden-reference archive, multi-candidate competition or numerical aesthetic scoring is required or implied here.

Include material visual constraints in the exact final brief. Changes to this guide require reassessing that brief and the recorded review before reuse; updating a timestamp alone is not a new review. Record unresolved failures and withhold declared imagery until repaired.

Adapted from `GadDev/daily-ai-pulse/docs/editorial/VISUAL_CONSTITUTION_V1.md` at `6269d2b7dbc01046cfcdaf7f204b8b6b14de9e64`. The target retains its healthcare restrictions, optional imagery and `healthtech-1.0` identity rather than adopting the source's separate version hierarchy.
