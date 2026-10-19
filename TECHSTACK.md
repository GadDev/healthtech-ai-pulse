# HealthTech AI Pulse — Technical decisions

Status: foundation implementation in progress. The local Astro bootstrap is implemented and verified; healthcare contracts, orchestration and hosted operations remain gated by the roadmap. Platform source: GadDev/daily-ai-pulse at 6269d2b7dbc01046cfcdaf7f204b8b6b14de9e64, 18 October 2026. No remote deployment is configured.

## Retain the static publication

Use Astro, TypeScript, Markdown content collections, plain Astro components and CSS, Pagefind, RSS, sitemap generation, ESLint, Prettier, Playwright, and axe. Keep one canonical article body and issue manifests containing references. Do not add React, a database, a CMS, a vector store, or a queue merely to transpose the publication.

Start from the inspected source lockfile and compatible Node/tool versions, then run an installation and compatibility check in the implementation PR. The source specifies Node 22.22.3, Astro ^7.3.8, TypeScript 6.0.3, and Pagefind 1.5.2. These are verified source settings, not a promise that an untested copy builds. Preserve the MIT notice for reused code. Do not import source articles, original artwork, historical ledgers, or translation review history.

Keep independent repositories. Copy an explicitly listed platform subset once, recording its source commit. Maintain a short ported-components list in this document and review upstream improvements monthly. Introduce a shared package only after at least three concrete duplicated maintenance changes justify its release and coordination cost. Separate editorial policy and content remain valuable boundaries.

## Content and contracts

Canonical paths after implementation:

| Path                                                       | Responsibility                                                    |
| ---------------------------------------------------------- | ----------------------------------------------------------------- |
| CONSTITUTION.md                                            | Mission and accountability                                        |
| EDITORIAL.md                                               | Sole normative editorial policy, including evidence and decisions |
| ROADMAP.md                                                 | Delivery gates and remaining work                                 |
| TECHSTACK.md                                               | Architecture and hosting operations                               |
| docs/CONTENT_MODEL.md                                      | Content and ledger field semantics and cross-file mapping         |
| docs/editorial/ledger.schema.json                          | Structural machine validation, version healthtech-1.0             |
| docs/editorial/topics.yml                                  | Controlled vocabulary, version healthtech-1.0                     |
| docs/editorial/ORCHESTRATOR.md                             | Canonical scheduled-run instructions                              |
| .agents/skills/healthtech-ai-pulse-pr-preparation/SKILL.md | Operational procedure referencing the policies                    |
| .agents/skills/healthtech-ai-pulse-illustration/SKILL.md   | Asset creation/reuse and medical visual restrictions              |
| src/content.config.ts                                      | Astro article and issue schemas                                   |
| docs/editorial/ledgers/YYYY-MM-DD.json                     | Full decisions, publication state, run provenance and recovery    |
| src/content/stories/YYYY-MM-DD-slug.md                     | Canonical English story                                           |
| src/content/pulse/YYYY-MM-DD.md                            | Issue, only when at least one story survives                      |
| public/images/stories/YYYY-MM-DD-slug.webp                 | Reviewed generated artwork when used                              |
| docs/editorial/illustrations/reviews/<story-id>.json       | Asset identity, integrity and review                              |

The proposed paths do not exist in the target yet. No scheduled task may assume otherwise. Consolidate the source's editorial schema prose, decision engine, and PR preparation policy into EDITORIAL.md plus these machine/content contracts; do not keep parallel normative copies.

Replace the scalar evidence label with structured, claim-specific evidence. Keep type values briefing/deep-dive/pulse initially; retire engineering-specific depth language in favour of general/specialist and define required concepts in the article. Use five categories from EDITORIAL.md. The content model must define an optional featured story separately from an optional MUST KNOW designation. Featured placement does not imply exceptional evidence.

## Visuals and languages

Reuse calm typography, readable measures, responsive layout, accessible focus states, reduced motion, search and archives. Replace masthead, icons, social previews and all publication destinations. Render source type, validation setting, clinical utility and access limitations as text, not one traffic-light badge.

Initial illustrations are optional: illustration.mode is none or generated. If generated, require a WebP asset, matching exact-story generation identity, integrity hash, crop checks, alt text and review record. A declared generated image with missing or invalid artifacts blocks that story; silently changing its mode is forbidden. The explicit none mode renders a clean text-led layout. This deliberate schema/UI adaptation prevents decorative generation from becoming an availability dependency. Do not copy the source's full three-candidate visual apparatus unless pilot quality demonstrates a need; start with one candidate and one review, with regeneration only after an actual failure. Adopt a target-specific, versioned identity contract rather than falsifying source v1.3 metadata.

Generated medical visuals are editorial metaphors. They cannot serve as clinical scans, patient photographs, anatomical instruction, molecular evidence, charts, or proof of mechanism. Exact figures use verified data and deterministic rendering, with rights and provenance checked.

Retain translation code only if it can remain dormant without confusing navigation or checks. English is the only required locale. Optional French later uses exact-source fingerprints, stale-copy suppression, medical terminology review, and honest reviewer identity; it must never delay an urgent English correction. No fabricated French placeholders or promise of automatic clinical translation quality.

## Build, validation and CI

Use npm and package-lock.json. Proposed commands, to be implemented before scheduler activation:

```bash
npm ci
npm run editorial:check -- docs/editorial/ledgers/YYYY-MM-DD.json
npm run illustration:check -- docs/editorial/ledgers/YYYY-MM-DD.json
npm run verify
npm run test:e2e
```

verify includes lint, format, all-ledger schema and relationship validation, content integrity, Astro check, static build, and Pagefind. PR CI validates every changed dated ledger explicitly, not only the lexicographically latest file. Regression tests cover selection/withholding, every claim type's conditional evidence fields, evidence-card rendering, fixture leakage, deduplication identities, empty/all-withheld batches, concurrent ownership, reruns, and source-update handling. Browser checks cover home, article, issue, search, keyboard/focus, evidence-card overflow, and representative 320/375/960/1280 widths. Passing axe does not establish complete accessibility.

No network URL availability test should make routine builds flaky. Syntax and claim locators are deterministic checks; source accessibility is a dated editorial observation with manual retries. A URL returning HTTP 200 does not validate its claims. CI must reject publishable source/claim errors and leaked watch/rejected/withheld records. A ledger-only recovery batch may contain explicit source failures but no story or issue.

## Hosting and operational dependencies

Recommend a dedicated Firebase project and Hosting site, using short-lived GitHub OIDC/WIF credentials and a target-scoped deployment service account. Reuse the deployment pattern after changing every hard-coded source identity and verifying repository/branch restrictions. Do not infer that an existing Google Cloud trust policy grants the new repository access. Configure SITE_URL, FIREBASE_PROJECT_ID, FIREBASE_SITE_URL, FIREBASE_WIF_PROVIDER and FIREBASE_SERVICE_ACCOUNT for the new target; no real target values are established yet.

Deploy only from main after human merge, successful verification and artifact checks. Retain production smoke checks. Add PR previews only after the basic deployment works; preserve the source's separation of untrusted PR build output from privileged deployment. Never execute untrusted PR code with deployment credentials. Require target CI and human review via repository rules where available. Content automation has no deployment or merge requirement.

Rollback: pause publication task, restore the previous known-good Hosting release using the documented provider mechanism, then reconcile Git with a reviewed revert/correction PR. Record the actual rollback release and follow with endpoint checks. Never delete source evidence or overwrite historical ledgers to conceal a failure.

Aim for no incremental hosting cost within the provider's no-cost quotas, not guaranteed zero cost. Hosting storage and transfer quotas apply at project level; retaining release assets consumes storage. Verify account eligibility, billing plan and current quotas at setup. Keep images small and release retention bounded. GitHub Actions, scheduled assistant execution, source subscriptions and image generation have separate limits or costs; existing subscriptions do not prove spare capacity. Start without paid APIs, analytics or newsletter infrastructure. See https://firebase.google.com/docs/hosting/usage-quotas-pricing for current conditions.

## Activation requirements

Target contracts and scripts merged; build and browser CI green on the exact target revision; supported GitHub read/write and binary upload path demonstrated by an authorized draft trial; source browsing works; safe branch ownership and recovery work; hosting identity separated and smoke-tested; maintainer can inspect evidence and pause the task. Each external integration requires an actual successful read, not tool discovery alone. Image generation is required only when generated assets are selected. Do not activate until the controlled trial in ROADMAP.md passes.

## Implemented foundation and activation state

The clean site, shared healthcare schemas, evidence card, ledger/story/issue checks, optional-image validation and isolated source-inspection trial are implemented locally. `scripts/lib/orchestration.mjs` implements the tested writer/session state machine; its adapter requires authenticated target GitHub operations and a live write/read-back trial before scheduling. No independent queue or database is introduced. The adapter simulator is not a live integration.

`firebase.json` serves `dist/`. `.github/workflows/deploy.yml` is disabled by default: it runs only on main with `HEALTHTECH_DEPLOY_ENABLED=true`. It validates target variables, runs verification and browser checks, authenticates by OIDC, deploys and smoke-checks. `npm run deploy:check` checks syntax and cross-project isolation; it does not verify cloud IAM. No `.firebaserc`, stored service-account key or source project identity is copied.

For the initial deployment, create or select a dedicated `healthtech-ai-pulse-*` Firebase project whose ID is at most 30 characters. Configure its own Hosting site and deployment service account. Configure a WIF provider with GitHub token audience/mapping and an attribute condition restricted to repository ID `1422703866`, owner ID `26112006` and `refs/heads/main`; verify these against the actual token. The production environment subject may differ from a branch subject, so do not blindly copy a subject binding. Grant only the current documented Hosting deployment permissions and target-scoped workload-identity impersonation, then demonstrate the OIDC exchange and deployment with no stored JSON key.

Set the four FIREBASE_* variables in the production environment to verified target values. The initial site must be `https://<target-project-id>.web.app`; the deployment script checks that relationship and service-account ownership. Before enabling deployment, complete target browser/CI checks, a live Hosting smoke test and rollback verification. Only then set HEALTHTECH_DEPLOY_ENABLED=true. The task itself never edits deployment configuration.

Rollback procedure: pause the HealthTech task if active; choose the last known-good release in the dedicated target Hosting release history and roll back there; confirm home/RSS/robots/sitemap and affected article URLs; then prepare the matching Git revert/correction PR and verify the subsequent deployment. Record the actual release/revision; no rollback drill is claimed yet.

See docs/editorial/trials/orchestration-2026-10-18.md for executed versus blocked trial coverage. The complete task request lives in docs/editorial/task-configuration.json and remains uncreated. Recheck duplicates, integration reads and current target default-branch dependencies before task creation.
