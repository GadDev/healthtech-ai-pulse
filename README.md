# HealthTech AI Pulse

**Evidence-led reporting on AI in healthcare and pharmaceutical research.**

[![PR checks](https://github.com/GadDev/healthtech-ai-pulse/actions/workflows/ci.yml/badge.svg?event=pull_request)](https://github.com/GadDev/healthtech-ai-pulse/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/github/license/GadDev/healthtech-ai-pulse?style=flat-square)](LICENSE)
[![Astro 7](https://img.shields.io/badge/Astro-7-BC52EE?logo=astro&logoColor=white&style=flat-square)](https://astro.build/)
[![TypeScript 6](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org/)
[![Node.js 24](https://img.shields.io/badge/Node.js-24-5FA04E?logo=nodedotjs&logoColor=white&style=flat-square)](https://nodejs.org/)
[![Pagefind 1](https://img.shields.io/badge/Pagefind-1-344F51?style=flat-square)](https://pagefind.app/)
[![Firebase Hosting](https://img.shields.io/badge/Firebase-Hosting-DD7B37?logo=firebase&logoColor=white&style=flat-square)](https://firebase.google.com/docs/hosting)

[**Read the publication**](https://healthtech-ai-pulse.web.app/) · [Browse editions](https://healthtech-ai-pulse.web.app/pulse/) · [Editorial methodology](https://healthtech-ai-pulse.web.app/methodology/)

HealthTech AI Pulse helps engineers, technical product leads, translational researchers and clinical innovation teams understand **what changed, what the evidence supports and what warrants further investigation**. Coverage prioritizes European relevance without excluding important international research.

## Contents

- [Editorial scope](#editorial-scope)
- [Getting started](#getting-started)
- [Quality checks](#quality-checks)
- [Publication workflow](#publication-workflow)
- [Technology](#technology)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [License and attribution](#license-and-attribution)

## Editorial scope

The five desks are **Clinical AI**, **Health systems**, **Pharma**, **Biomedical foundations** and **Safety & policy**. Stories distinguish announcements and benchmarks from clinical outcomes, with source links, evidence context and explicit limitations. English is the public language; French publication is not yet implemented.

This is research and industry intelligence, not personalized medical advice. Every publication requires human editorial review, even when automation assists with research or drafting.

## Getting started

Requires **Node.js 24.12.0 or later within 24.x** and npm. The repository's `.nvmrc` selects Node 24 for `nvm` users.

```bash
git clone https://github.com/GadDev/healthtech-ai-pulse.git
cd healthtech-ai-pulse
nvm install
nvm use
npm ci
npm run dev
```

Open <http://localhost:4321>. If Node 24 is already installed without `nvm`, skip the two `nvm` commands.

Local development requires no cloud credentials. Leave `SITE_URL` unset locally: the site omits canonical tags and signals **noindex**. For a production build, set `SITE_URL` to the public HTTPS origin (see [`.env.example`](.env.example) and [deployment guidance](docs/DEPLOYMENT.md)).

## Quality checks

| Command                | Purpose                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `npm run verify`       | Lint, format, TypeScript checks for scripts and tests, content validation, unit tests, Astro checks, build and Pagefind. |
| `npm run tests:check`  | Strict type-checking for Node tests and their shared fixtures.                                                           |
| `npm test`             | Run the TypeScript Node unit and regression tests directly, with no transpilation.                                       |
| `npm run test:e2e`     | Playwright browser, navigation and accessibility checks.                                                                 |
| `npm run deploy:check` | Validate supplied Firebase deployment variables; requires production environment configuration.                          |

Before the browser suite, install Chromium with `npx playwright install chromium` (use `--with-deps` on a fresh Linux environment). CI runs verification and browser checks on pull requests.

## Publication workflow

1. **Research:** Record source discovery, verification and selection decisions in dated [candidate ledgers](docs/editorial/ledgers/README.md).
2. **Prepare:** Write validated articles in `src/content/stories/`, reference them from dated `src/content/pulse/` editions, and attach reviewed imagery only where appropriate.
3. **Review and publish:** Use a draft pull request and validation checks. The maintainer reviews evidence and merges approved changes; deployment is separately gated.

Research-only or withheld days can have ledgers without a public edition. Repository orchestration contracts describe automation; their presence does not imply a scheduled run is active.

## Technology

| Layer       | Implementation                                                                       |
| ----------- | ------------------------------------------------------------------------------------ |
| Publication | Astro 7, TypeScript 6, Markdown content collections and CSS                          |
| Discovery   | Pagefind search, RSS, sitemap and dated edition archives                             |
| Validation  | Oxlint, Oxfmt, Astro checks, Node.js tests, Playwright and axe                       |
| Delivery    | Static Firebase Hosting site with GitHub Actions CI and gated deployment/PR previews |

There is no application database, user account system or patient-data backend.

## Deployment

The public site uses [Firebase Hosting](https://healthtech-ai-pulse.web.app/). Production deployment runs from `main` only when `HEALTHTECH_DEPLOY_ENABLED=true`; pull-request previews have an independent `HEALTHTECH_PREVIEW_ENABLED=true` gate. These are GitHub repository variables, not local development settings.

See [deployment and preview operations](docs/DEPLOYMENT.md) for configuration, identity checks, acceptance and rollback. Passing local checks does not prove cloud access or clinical correctness.

## Research intelligence (proposed)

[HealthTech Scientific Evidence Intelligence](docs/research/README.md) is a **proposed** research experience within this existing Astro publication. A later, isolated `/research/` route may offer fixture-first literature discovery; a separately authorized Research API would handle scientific retrieval, evidence validation and authenticated workspaces. **Neither the route nor the API is implemented by this documentation PR.** Existing stories, human-reviewed publication workflow, Firebase Hosting deployment and Pagefind remain independent of backend availability, accounts and AI model spending.

## Documentation

- [Constitution](docs/CONSTITUTION.md) — mission, audience and accountability.
- [Editorial policy](docs/EDITORIAL.md) — evidence standards, selection and corrections.
- [Content model](docs/CONTENT_MODEL.md) and [daily issue contract](docs/DAILY_ISSUE.md) — article, edition and ledger rules.
- [Editorial orchestrator](docs/editorial/ORCHESTRATOR.md) — research-to-review workflow.
- [Visual constitution](docs/editorial/VISUAL_CONSTITUTION_V1.md) — image standards and constraints.
- [Technical decisions](docs/TECHSTACK.md) — architecture and operational boundaries.
- [Security policy](SECURITY.md) — responsible vulnerability reporting.

## License and attribution

The software is licensed under [MIT](LICENSE). Parts of the tooling and editorial styles were adapted from [Daily AI Pulse](https://github.com/GadDev/daily-ai-pulse/tree/6269d2b7dbc01046cfcdaf7f204b8b6b14de9e64), with its software notices retained. Source articles, artwork and editorial decisions were not imported.
