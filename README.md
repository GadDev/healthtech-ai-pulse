# HealthTech AI Pulse

Evidence-led intelligence for people building and evaluating healthcare and pharmaceutical AI.

The initial site is deliberately empty: no source-publication articles or historical decisions were imported. The dedicated Firebase target is configured; live deployment acceptance is still pending.

## Develop

Use Node 22.22.3 (`nvm use`), then:

```bash
npm ci
npm run dev
```

`npm run verify` runs lint, formatting, content integrity, Astro checks, build and Pagefind. `npm run test:e2e` checks public routes, accessibility, narrow navigation and search; install Chromium with `npx playwright install chromium` first.

Set `SITE_URL` to the real public HTTPS origin before deployment. Unconfigured local builds use localhost, omit canonical links and disallow indexing. No cloud credentials or source Firebase identities are included.

## Project contracts

- [CONSTITUTION.md](CONSTITUTION.md): mission and accountability.
- [docs/CONTENT_MODEL.md](docs/CONTENT_MODEL.md): implemented schemas and publication mappings.
- [EDITORIAL.md](EDITORIAL.md): claim-specific evidence, scope and publication policy.
- [TECHSTACK.md](TECHSTACK.md): architecture, reuse and operations.
- [ROADMAP.md](ROADMAP.md): PR boundaries and readiness gates.

The five desks are Clinical AI, Health systems, Pharma, Biomedical foundations, and Safety & policy. English is the public language. The repository’s `healthtech-ai-pulse-translate-fr` skill prepares reviewed French translation packages; French publication routes are not implemented. Images are explicitly optional; no patient data, account system, analytics or newsletter infrastructure is included.

Human review controls publication. Schema/validator checks cannot establish medical correctness. Healthcare evidence contracts and evidence cards are implemented; the orchestration state machine and target skills are implemented. The controlled ledger-only source-inspection trial is under `docs/editorial/trials/`; it is not a live edition.

## Reuse and licensing

Astro/tooling configuration and editorial CSS are adapted from GadDev/daily-ai-pulse at commit 6269d2b7dbc01046cfcdaf7f204b8b6b14de9e64. MIT software notices are retained. Articles, artwork, ledgers, translation approvals, domains and deployment identities were excluded.

## Operations status

Production deployment is gated by `HEALTHTECH_DEPLOY_ENABLED`. PR previews are separately gated by `HEALTHTECH_PREVIEW_ENABLED`. See [the deployment guide](docs/DEPLOYMENT.md) for identities, workflow behavior and acceptance steps. Scheduled-task activation is managed separately from deployment. See [trial coverage and blockers](docs/editorial/trials/orchestration-2026-10-18.md), [the orchestrator](docs/editorial/ORCHESTRATOR.md) and [TECHSTACK.md](TECHSTACK.md). `npm run orchestration:trial` runs isolated adapter/deployment tests; it does not claim a live integration or launch a task.
