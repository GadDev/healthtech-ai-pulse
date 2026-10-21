# HealthTech visual constitution

**Visual direction: Editorial Science Photography** — human-centred, cinematic, medically responsible photojournalism-inspired imagery for the Edition Front publication. The look may be dramatic, intimate and visually rich; the reporting must remain precise. A generated photograph is a _constructed editorial illustration_, never a documentary record of an investigation.

Contract: `healthtech-1.0`. Apply these visual authoring rules to generated HealthTech artwork. [Editorial policy](../EDITORIAL.md) controls evidence and medical claim boundaries. This document does not establish clinical validity or override that policy; [the illustration system](ILLUSTRATION_SYSTEM_V1.md) defines production, identity, review records and validation.

## Compose from verified context

**Images are mandatory for every newly prepared public story from the 2026-10-22 edition, never merely a nice-to-have.** Images may be visually ambitious, but cannot overclaim, fake documentary access or turn a limited study into a breakthrough. A failed or missing image withholds that story; ledger-only runs remain valid. Historical image-free stories need genuine backfill and review.

Build the brief from the story ID, two or three supported context sentences, one editorial point, intended placement and crop. State the question or tension the image should communicate: incomplete evidence, participant input, deployment friction or another supported angle. Naming the topic alone is insufficient. Use the actual HealthTech article renderer and stylesheet for composition: `src/pages/stories/[...id].astro` and `src/styles/publication.css`.

Before generating a new image, write three short, materially different photographic concepts. Vary the relationship or action, not just the props or colour. Select one with a story-specific rationale and reject the other two with a brief reason. This is concept exploration in text; it does not require three generated candidates. Reuse with unchanged inputs needs no new concept exercise, but still requires the editorial review below.

## The aesthetic: people, science and atmosphere

Keep Quiet Laboratory's clarity while giving the photography the human interest and visual confidence of a serious science magazine. Draw inspiration from editorial photography **as a genre**, not any publication's specific artwork or branded layout. Choose a visual approach because it illuminates the verified story:

- **Human-centred clinical context:** clinicians, researchers, consenting or fictional non-identifiable adult models, natural gestures and believable working relationships. A thoughtful portrait or observational-feeling moment can be meaningful without a literal science metaphor.
- **Research in action:** plausibly staged, generic research routines, instruments, clinical workstations, preparation, review and collaborative interpretation. Depict the _question or workflow_, not an invented trial scene or result.
- **Intimate technical detail:** close-ups of hands, ordinary equipment, materials or objects with a visible relationship to the problem.
- **Conceptual or environmental storytelling:** an unusually framed space, shadow, reflection or still life when a human scene would wrongly imply clinical use or actual study participation.

Give each composition a distinctive point of view, emotional tone or visual relationship. Rich context is welcome when it supports the story; empty desks and lone laptops are not the default. A scene should remain relevant to this particular article, not serve as interchangeable medical stock imagery.

A clinically plausible _fictional re-enactment of a general workflow_ is permitted if nothing falsely links it to the reported research, institution, real patients, device or outcome. Use a clearly illustrative caption and inspect the image **together with its headline and surrounding text**: plausible photography becomes misleading if that juxtaposition suggests a real study scene. Do not stage patient harm, clinical success, treatment or emergency intervention without a verified and editorially justified connection.

The publication palette is white `#FFFFFF`, ink `#424242`, teals `#51796E` and `#344F51`, pale sage `#E8EFEC`, mist `#D1E0E2`, with rose `#D4A298` and caramel `#BC8A5F` as sparing accents. It anchors the website; photographs may use natural scene colours and need not contain teal objects or white desks. Keep small website text in ink or dark teal. Avoid cream washes, neon, glowing interfaces and synthetic gradient backdrops.

Choose lighting, camera distance, viewpoint, texture and contrast to support the editorial point. Directional light, purposeful shadows, asymmetry, environmental depth, movement, tighter human framing and close documentary-style observation are welcome. Use natural skin tones and believable clinical environments; cinematic does not mean heightened drama, blue-glowing equipment or sensational illness imagery. Soft light and negative space are options, not mandatory treatments. Specify the focal point and what must survive each actual placement; do not require every object to sit inside an arbitrary central percentage. Test the real crops before acceptance.

**Magazine treatment belongs to the site, not the generated pixels.** Photographs should be standalone, text-free assets. Edition Front's Astro templates provide serif headlines, metadata, tags, excerpts, captions and any accessible contrast treatment. Do not generate a news card, collage, layout mockup, date, caption, logo or headline inside the image. Evaluate the combined finished card and article hero so the photography, headline and caption tell the same _accurate_ story.

Allow clearly staged fictional people, including clinicians and patients in plausible _generic_ settings, when human presence helps the reader connect with the problem. Full human faces and natural interaction are not automatically forbidden, but generated people must not resemble actual researchers, named officials, identifiable patients or study participants. Avoid recognisable real institutions, especially in generated medical and regulatory scenes. For children, neonatal care and vulnerable patients, prefer non-identifying and clinically neutral contextual scenes that avoid depicting patient suffering or implied medical outcomes. Do not present any constructed scene as the actual study, procedure or clinical encounter. Avoid invented study-specific apparatus, screens, anatomy or medical-looking accessories that could be mistaken for research hardware. A conceptual construction must not encode invented study counts, measurements or mechanisms.

A generated photograph is an editorial illustration of context. It must not be presented as documentary evidence of the reported study, identifiable investigators, a named institution, real patients or clinical results. Avoid readable medical records, personal data, identifying screens, and invented brand/regulatory marks. A generic staged hospital scene may look authentic; that is precisely why its _illustrative nature_ must be unambiguous in the caption wherever a reader might confuse it with real evidence. Alt text describes what is visible, not what supposedly happened in the study. If no truthful photographic concept survives the medical-implication and crop review, try a materially different story-specific concept. If no image passes, withhold the article and record the obstacle in the ledger. Never publish a new image-free story or an interchangeable filler photograph. Historical `mode: none` stories are tracked as image-backfill debt, not a precedent.

Reject unsupported medical implications before judging aesthetics. In particular:

- Do not invent anatomy, scans, molecular mechanisms, study results, patient outcomes or clinical endorsements.
- Do not use generated charts or numbers as factual evidence. Data graphics require source data and a reproducible method under editorial policy.
- Do not generate words, labels, logos, headlines, UI, screenshots, watermarks, borders, cards or frames. The website supplies its own text. An anonymous blurred or unreadable screen may provide scene context but must not encode invented readings or study results.
- Avoid generic robots, glowing brains, neon and stock AI imagery. A cinematic photograph must not imply it depicts the actual study, participants, institution, device performance or a clinical outcome absent from reporting. Prefer a truthful adjacent workflow or meaningful human question; withhold imagery when no safe concept survives.

Compare with up to five most recent approved HealthTech images, plus other candidates in the same edition, when available. Check repeated setting, prop group, angle and lighting. Reject an adjacent repeat of the same composition; explain any purposeful recurring treatment. Record compared story IDs and honestly disclose unavailable comparisons. Do not import source artwork, approvals or a supposed target reference archive.

## Review order and authority

Before medical review, read the _headline, description and lead_ beside the candidate. Ask whether the combined story could falsely suggest a working product, an official decision, improved clinical outcomes, a real patient or an actual study location. The image is not accepted simply because its pixels contain no overt false facts.

Reject unsupported medical implications and prohibited content before considering aesthetics. Then inspect the actual crop, contrast and reduced-size legibility. At each intended size, check whether the image or its juxtaposition with the headline implies a treatment outcome, measured benefit or actual study scene; verify that the illustrative caption remains legible on desktop and mobile. Review the crop in the real article and listing placements. Attractive artwork cannot compensate for a misleading clinical implication. Do not treat a high model confidence score as visual or scientific validation.

After the medical and technical checks, apply a separate editorial acceptance gate. Record pass/fail with a short observed reason for each question:

1. **Specificity:** Would this image fit several unrelated healthcare stories equally well? If yes, fail. Explain its connection to this article's central question; it need not communicate every detail without the headline.
2. **Meaning:** Does the image add a human question, relevant workflow, action, relationship or purposeful editorial point beyond naming healthcare or technology? A contextually specific clinician portrait can pass; an interchangeable posed doctor or decorative device fails.
3. **Clarity:** Is the focal idea still legible at a 160-pixel thumbnail and in the intended responsive crops, without overlaying words into the source image? A lost relationship fails even when individual props remain visible.
4. **Variety:** Does it avoid repeating the recent images' composition? Identify actual comparisons or record that none are available; absence alone is not a failure.

Withhold a candidate that fails any gate, even if it is attractive and passes automated validation. Do not downgrade a passable human-centred scene merely for being cinematic or having a face. Revise a failing claim implication, concept or composition before another generation; record the failure and actual candidate count. Do not fix generic imagery by adding arbitrary colour or props. Start with one generated candidate from the chosen concept; no multi-image competition or numerical aesthetic score is required.

Use the real HealthTech renderer; source-publication layouts and artwork are not target production evidence. Put concept selection, comparisons and editorial gate results in the publication PR body, keyed to story ID and the accepted asset SHA-256 from its strict review record. Report not-run checks explicitly; missing review evidence is not acceptance. Keep the existing review JSON schema unchanged. Validators enforce identity and integrity, not these editorial judgments.

## Backfill story boundaries (examples, not approvals)

For the four published articles without imagery, visual concepts may use a human-centred magazine treatment but must respect these precise distinctions:

| Article                                           | Editorial photography can evoke                                                                                                 | It must not claim                                                                                |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Clinical AI across non-English languages (12 Oct) | A multilingual clinical communication _question_, researcher reviewing anonymised language materials, cultural/language context | A clinically deployed translator, validated accuracy or an improved consultation                 |
| Epilepsy EEG feedback (13 Oct)                    | A staged EEG-monitoring environment or patient-feedback interaction, with anonymous adult presence where appropriate            | Live seizure prediction, reduced seizures, demonstrated treatment benefit or real study patients |
| Neonatal imaging / automation bias (21 Oct)       | A clinician's careful review of a generic diagnostic image _workflow_, with no invented anatomy                                 | Brain MRI, identified newborns, actual participant scenes or proven improved neonatal care       |
| FDA hypothetical change-control examples (21 Oct) | A medical software change awaiting checks, generic validation and approval workflow                                             | A new FDA rule, authorised product, official FDA building/logo or guaranteed clinical safety     |

These are **briefing guardrails** only: no photograph is approved until the actual asset passes medical, crop, specificity, meaning, clarity and variety reviews. Generated or referenced assets for backfill need real hashes and review records; never transplant prior collage headings or claims into articles.

Include material visual constraints in the exact final brief. Changes to this guide require reassessing that brief and the recorded review before reuse; updating a timestamp alone is not a new review. Record unresolved failures and withhold declared imagery until repaired.

Adapted from `GadDev/daily-ai-pulse/docs/editorial/VISUAL_CONSTITUTION_V1.md` at `6269d2b7dbc01046cfcdaf7f204b8b6b14de9e64`. The target retains its healthcare restrictions and `healthtech-1.0` identity rather than adopting the source's separate version hierarchy; from the 2026-10-22 edition an accepted image is mandatory for each story.
