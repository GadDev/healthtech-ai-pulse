# HealthTech visual constitution

Contract: `healthtech-1.0`. Apply these visual authoring rules to generated HealthTech artwork. [Editorial policy](../EDITORIAL.md) controls evidence and medical claim boundaries. This document does not establish clinical validity or override that policy; [the illustration system](ILLUSTRATION_SYSTEM_V1.md) defines production, identity, review records and validation.

## Compose from verified context

Build the brief from the story ID, two or three supported context sentences, one editorial point, intended placement and crop. State the question or tension the image should communicate: incomplete evidence, participant input, deployment friction or another supported angle. Naming the topic alone is insufficient. Use the actual HealthTech article renderer and stylesheet for composition: `src/pages/stories/[...id].astro` and `src/styles/publication.css`.

Before generating a new image, write three short, materially different photographic concepts. Vary the relationship or action, not just the props or colour. Select one with a story-specific rationale and reject the other two with a brief reason. This is concept exploration in text; it does not require three generated candidates. Reuse with unchanged inputs needs no new concept exercise, but still requires the editorial review below.

Use Quiet Laboratory's photorealistic editorial direction. Choose among contextual photography, an anonymous human gesture, conceptual still life or a tactile close-up according to the story. Give the scene one legible relationship, action or visual metaphor. A laptop, phone, headset, blank form or laboratory is not a sufficient idea by itself. Reject interchangeable office stock compositions and decorative props without editorial purpose.

The publication palette is white `#FFFFFF`, ink `#424242`, teals `#51796E` and `#344F51`, pale sage `#E8EFEC`, mist `#D1E0E2`, with rose `#D4A298` and caramel `#BC8A5F` as sparing accents. It anchors the website; photographs may use natural scene colours and need not contain teal objects or white desks. Keep small website text in ink or dark teal. Avoid cream washes, neon, glowing interfaces and synthetic gradient backdrops.

Choose lighting, camera distance, viewpoint, texture and contrast to support the editorial point. Directional light, purposeful shadows, asymmetry and close framing are allowed. Soft light and negative space are options, not mandatory treatments. Specify the focal point and what must survive each actual placement; do not require every object to sit inside an arbitrary central percentage. Test the real crops before acceptance.

Allow fictional, non-identifiable human presence, such as hands or an anonymous contextual gesture, when it adds meaning. Do not present it as an actual participant, investigator or observed clinical encounter. Avoid invented medical-looking accessories that could be mistaken for study hardware. A conceptual construction must not encode invented study counts, measurements or mechanisms.

A generated photograph is an editorial illustration of context. It must not resemble documentary evidence of the reported study, identifiable investigators, a named institution, real patients or clinical results. Avoid readable records, identifying screens and brand marks. Caption it as illustrative at every placement where that distinction might otherwise be lost. Alt text describes visible content without claiming that the depicted scene occurred. If no truthful photographic concept survives the medical-implication and crop review, try a materially different story-specific concept. If no image passes, withhold the article and record the obstacle in the ledger. Never publish a new image-free story or an interchangeable filler photograph. Historical `mode: none` stories are tracked as image-backfill debt, not a precedent.

Reject unsupported medical implications before judging aesthetics. In particular:

- Do not invent anatomy, scans, molecular mechanisms, study results, patient outcomes or clinical endorsements.
- Do not use generated charts or numbers as factual evidence. Data graphics require source data and a reproducible method under editorial policy.
- Do not generate words, labels, logos, headlines, UI, screenshots, watermarks, borders or frames. The website supplies its own text.
- Avoid generic robots, glowing brains, neon and stock AI imagery. A photographic setting must not imply it depicts the actual study, participants, institution or a clinical outcome absent from reporting. Use an explicitly illustrative conceptual photograph or withhold imagery when a literal scene would mislead.

Compare with up to five most recent approved HealthTech images, plus other candidates in the same edition, when available. Check repeated setting, prop group, angle and lighting. Reject an adjacent repeat of the same composition; explain any purposeful recurring treatment. Record compared story IDs and honestly disclose unavailable comparisons. Do not import source artwork, approvals or a supposed target reference archive.

## Review order and authority

Reject unsupported medical implications and prohibited content before considering aesthetics. Then inspect the actual crop, contrast and reduced-size legibility. At each intended size, check whether the image or its juxtaposition with the headline implies a treatment outcome, measured benefit or actual study scene; verify that the illustrative caption remains legible on desktop and mobile. Review the crop in the real article and listing placements. Attractive artwork cannot compensate for a misleading clinical implication. Do not treat a high model confidence score as visual or scientific validation.

After the medical and technical checks, apply a separate editorial acceptance gate. Record pass/fail with a short observed reason for each question:

1. **Specificity:** Would this image fit several unrelated healthcare stories equally well? If yes, fail. Explain its connection to this article's central question; it need not communicate every detail without the headline.
2. **Meaning:** Does the image add an action, relationship or metaphor beyond naming healthcare or technology? Decorative equipment alone fails.
3. **Clarity:** Is that focal idea still legible at a 160-pixel thumbnail and in the intended responsive crops? A lost relationship fails even when individual props remain visible.
4. **Variety:** Does it avoid repeating the recent images' composition? Identify actual comparisons or record that none are available; absence alone is not a failure.

Withhold a candidate that fails any gate, even if it is attractive and passes automated validation. Revise the concept or composition before another generation; record the failure and actual candidate count. Do not fix generic imagery by adding arbitrary colour or props. Start with one generated candidate from the chosen concept; no multi-image competition or numerical aesthetic score is required.

Use the real HealthTech renderer; source-publication layouts and artwork are not target production evidence. Put concept selection, comparisons and editorial gate results in the publication PR body, keyed to story ID and the accepted asset SHA-256 from its strict review record. Report not-run checks explicitly; missing review evidence is not acceptance. Keep the existing review JSON schema unchanged. Validators enforce identity and integrity, not these editorial judgments.

Include material visual constraints in the exact final brief. Changes to this guide require reassessing that brief and the recorded review before reuse; updating a timestamp alone is not a new review. Record unresolved failures and withhold declared imagery until repaired.

Adapted from `GadDev/daily-ai-pulse/docs/editorial/VISUAL_CONSTITUTION_V1.md` at `6269d2b7dbc01046cfcdaf7f204b8b6b14de9e64`. The target retains its healthcare restrictions and `healthtech-1.0` identity rather than adopting the source's separate version hierarchy; from the 2026-10-22 edition an accepted image is mandatory for each story.
