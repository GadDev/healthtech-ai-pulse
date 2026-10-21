# Two image candidates for PR #48

**Status: prepared, binary upload pending.** The generated image files are available in the ChatGPT conversation as the `healthtech-pr48-images-review.zip` package. This record does **not** claim the binary files have been pushed to GitHub, approved or published.

The branch's proposed **review-only** paths are:

| Provisional draft | Intended review asset | Source dimensions | WebP SHA-256 |
| --- | --- | --- | --- |
| Clinical AI message metrics | `docs/editorial/review-packages/2026-10-21/images/clinical-ai-message-metrics.webp` | 1672 × 941 | `d7052eae455a7148c62de65c66ccaca328487c7e539d6cbc7cc714381f965f99` |
| GUARD-LGG radiotherapy | `docs/editorial/review-packages/2026-10-21/images/glioma-radiotherapy-model.webp` | 1672 × 941 | `ae6719a4f6c50ce552a5b8b8577fa8a030d08689fd7abdc6917021ecd9b12b32` |

Both are WebP exports of the **two existing image-generation outputs**; no new study-derived image, result or factual dashboard has been produced. The package contains a `push-images.sh` helper that requires a clean checkout of this exact branch and pushes the binaries via Git rather than through GitHub's UTF-8 text file API. The images should be reviewed alongside the provisional article drafts *after* the binary push. No links to nonexistent repository images should be presented as working previews.

## Editorial candidate 1 — clinical AI messages

- Proposed alt: A clinician examines information on a computer screen in a sunlit healthcare workspace.
- Proposed caption: Staged editorial illustration of a clinician reviewing written information; not a participant or AI output from the reported study.
- Visual assessment: Plausible human-centred contextual photograph. It does not show actual patient messages or prove evaluation performance.

## Editorial candidate 2 — glioma radiotherapy prediction

- Proposed alt: Two clinicians inspect a simulated brain-imaging display in a clinical research setting.
- Proposed caption: Staged illustration containing fictional MRI screens and diagnostic annotations; not images, measurements or predictions from the GUARD-LGG study.
- **Visual safety blocker**: The image prominently shows invented MRI colour overlays, a numerical confidence score and diagnostic labels. These could misleadingly resemble real GUARD-LGG predictions when paired with the article. It must **not** become a public story illustration without independent medical/editorial evaluation or replacement with an image without fabricated results.

## Publication boundaries

The story Markdown files in this PR remain provisional under `docs/editorial/review-packages/`, not `src/content/stories/`. These review assets are **not** publication image approvals. When the stories become eligible, the editorial workflow must perform full primary-source verification, approve a scientifically responsible image, generate truthful image review records with hashes of the actual finalized article and image bytes, and validate the resulting canonical daily PR. Do not invent model generation metadata, human sign-off or a successful publication run.
