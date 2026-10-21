# Historical image backfill — recorded editorial model review

**Status:** Provisional model-only visual and source-context review on 21 October 2026, at 18:03:52 UTC. **Human scientific/editorial approval still required before merge.**

## Provenance and integrity

- PR #46 merged four standalone WebP files into `main`. The assets were **not regenerated** here. The exact Git blobs of all four were matched to generated candidate **B** files already available from the preceding conversation; SHA-256 was computed from those identical binary bytes and cross-checked against the bytes fetched from GitHub.
- These are generated editorial photographs, not original clinical records. The generator used was `image_gen.text2im` and two candidates per story were produced in the immediate selection round; full original model-prompt bytes and model snapshot were not retained.
- The four `docs/editorial/illustrations/briefs/<story-id>.json` files are **retrospective acceptance briefs**, explicitly not the original image-generation prompts. `brief_sha256` is the exact current acceptance-brief hash, and `generation_key` is the repository's deterministic identity computed from that brief, final story, current policy, recorded generator/candidate count and null snapshot. This authenticates the **accepted record**, **not reproducibility of the original generation prompt**.
- `story_source_sha256` fingerprints exact Markdown bytes **after** the new `generated` frontmatter, alt, caption and intrinsic dimensions. `asset_sha256` fingerprints the **unchanged** merged WebP bytes. The review records do not sit inside the files they hash.
- Model inspection covered the full-size actual merged WebPs and reconstructed 16:9 article and centred 3:2 responsive card crops based on `publication.css`, plus reduced 160 px preview. **No live PR preview/browser screenshot or independent clinical interpretation was performed**. The actual Astro layouts should receive human review, especially the generated medical displays and thumbnails.

## Per-story observations

| Article | Asset SHA-256 | Exact story SHA-256 | Model editorial observations and restrictions |
| --- | --- | --- | --- |
| Multilingual clinical evidence | `adf67caf119a17846a43494157b713903030239b02e7c4070346c32bc740e2bf` | `734b887c97dd18980379bcf903280ffc2c4c0ac7967c7bf59f3efe2c59dc5371` | The collaborative review of language/health handouts relates to assessing language-specific coverage, not deploying a translator. Two people compare contextual information; the picture frames the communication question, not a measured patient benefit. **Caution:** Tiny printed flags and stylised words may be synthetic or inaccurate; they are background props, not research or translated patient content. |
| EEG patient feedback | `a3f226f221253c3c5e1148b37cea472161d36215fc792b71f60595b847f9fdd5` | `85ffa520b62d8cb0e44e53d8478e6a4fbebb8dd90a37fc32347014a190a7df67` | An adult with an EEG cap and a handheld input device is specific to the article's feedback-replay question. The relationship between feedback button, monitored patient and reviewer foregrounds human agency. **Caution:** Brain imagery on background screens and waveforms are fabricated context, not study EEG data, actual MRI findings or live seizure prediction. |
| Neonatal imaging automation bias | `e6b90ecdd90b0afd9e663467c499ea1ffd50cd44768e40ac7dccdd6735372340` | `909e735234c6088d3e382b0215e5705cd9e8d2ea48d97df5230f68ac903781fd` | A clinician considering a neonatal abdominal radiograph addresses the human response to diagnostic advice. The pause before relying on a diagnostic image suggests the central uncertainty in the simulated reader experiment. **Caution:** The radiograph and incubator scene are synthetic; the image may contain clinically inaccurate anatomical details and must never be presented as a real diagnostic scan. |
| FDA hypothetical change-control examples | `e64b6d050d255bfe36ee2eaa22de55f7d8c15ec061a7282cf96a54915eeb4564` | `2c0008b0df991cf93754778be5dc7794b3535eda7747b425345c4176da8c1d9d` | A software evaluation workflow relates to the FDA's hypothetical testing, thresholds and version-control scenarios. A reviewer examines a dashboard and approval-like workflow rather than a dramatic treatment scene. **Caution:** Dashboard checks, apparent graphs and background brain scans are invented. They do not demonstrate tested software, validated performance, FDA authorisation or a binding new rule. |

## Four editorial gates (model observations, not clinical certification)

1. **Specificity:** Each shows a different question relevant to its article, not just a generic AI robot or machine. The expected relationships are documented in the retrospective briefs and the table above.
2. **Meaning:** The visual editorial points (language-context review, feedback, diagnostic scrutiny, software validation) are recognizable, but do not prove the findings.
3. **Clarity:** Visual focal points survived 16:9 and centred 3:2 crops and 160 px previews constructed from exact merged pixels. Cropping was simulated using the published CSS ratios, **not** inspected in a deployed browser.
4. **Variety:** The four use two human collaboration settings, EEG monitoring, a neonatal reading environment and software validation. Two medical-monitoring scenes share cool lighting but their actions and focal subjects differ. Other previously approved HealthTech images were not included in this direct comparison; full cross-edition visual comparison remains for the maintainer.

The article captions must remain visible in desktop/mobile contexts. Their wording explicitly separates invented screens, individuals, radiographs and dashboards from **real** participants, results and regulator-approved devices. Alt text describes visible content only. Model-only records can pass structural validators while still needing human scrutiny of anatomical plausibility and the resulting page impression.

## Review and release blockers

- Before merge, inspect the **real** article/listing pages alongside each title, lead, caption and image. Pay particular attention to the synthetic brain images on the epilepsy and FDA illustrations and the synthetic radiograph on the neonatal illustration.
- The manuscript has no new measured clinical benefit from these photographs; no images may be used as evidence or labelled a sourced medical scan.
- Recompute the exact article-source hash and review identity **if any article metadata, body text or editorial policy bytes change again**. Unrelated PR updates must not mutate the accepted WebP bytes.
- Run `npm run format:check`, `npm run illustration:check`, `npm run verify` and browser tests against the PR head. **No successful test run is claimed in this review memo.**
