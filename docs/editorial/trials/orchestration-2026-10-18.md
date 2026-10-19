# Orchestration trial — 18 October 2026

Type: isolated simulated adapter tests, not a scheduled run or live GitHub write trial.

`npm run orchestration:trial` exercises create-only ownership races, fresh lease exclusion, expired takeover, stale-worker rejection, checkpoint preservation, binary/path restrictions, already-merged and closed-unmerged behavior, duplicate PR conflicts, PR-create timeout recovery, stale preflight and exact-head CI reporting. Deployment tests reject missing, non-HTTPS and cross-project identities. The tests use clearly synthetic records in memory and never open a PR, invoke a task, access clinical data or deploy.

The source-inspection trial at `2026-10-18.json` separately records a real EMA contextual source, rejected as current news. It is a ledger-only controlled trial; no issue or article was manufactured.

The following records the initial 18 October trial. GitHub app access was verified on 19 October; current PR CI is the source of truth for subsequent executable validation. Live adapter and hosted/scheduled acceptance remain unverified:

- The GitHub installation is scoped to selected repositories and excludes GadDev/healthtech-ai-pulse. Repository read succeeds publicly, but the authenticated initial write returned 403, Resource not accessible by integration. At that initial trial no target content or PR had been written. The repository was subsequently enabled for the app on 19 October and remote draft preparation resumed.
- Target default-branch contracts remain pending foundation PR review and merge. A real scheduler would correctly stop at prerequisite reading, before research/publication writes.
- No authenticated adapter write/read-back, remote concurrency trial, exact-head target CI, hosted smoke test or rollback drill has run.
- Normal Chromium download produced an unusable archive in this environment. A separately staged fallback executable was empty. Browser/accessibility tests could not execute; they are not reported as passed. Astro render tests cover actual generated evidence-card HTML, not visual layout or keyboard behavior.
- Firebase is available as an optional integration but was not installed/connected at the time of this report. No target project/site, WIF provider, service account, billing setting or deployment variable was created or inferred from Daily AI Pulse.
- The separate HealthTech scheduled task was not created or activated. Existing Daily AI Pulse task configuration was not changed.

Next live trial after access and adoption: inspect current default contracts; use one canonical dated branch with an actual source-based ledger; prove rejected stale ref updates; finalise no-publication when appropriate; open exactly one draft; release ownership; inspect both required CI jobs on the latest head. Do not mark a simulator pass as evidence that any of those external operations succeeded.
