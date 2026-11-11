# Firebase operations

HealthTech uses the dedicated `healthtech-ai-pulse` Firebase project (number `293427463899`) and Hosting site `healthtech-ai-pulse`. The production origin is <https://healthtech-ai-pulse.web.app>. Cloud resources and IAM are configured separately from repository files.

## Workflow alignment

The reference is `GadDev/daily-ai-pulse` at `6269d2b7dbc01046cfcdaf7f204b8b6b14de9e64`. Deployment behavior is adapted to HealthTech's identities and healthcare publication checks.

| Workflow                   | Behavior                                                                                                                                              |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ci.yml`                   | Healthcare validation/build and browser/accessibility checks; one-day static artifact with run, attempt, PR, head, base and tested revision metadata. |
| `deploy.yml`               | Verified main revision to production; skip superseded revisions; the same pinned CLI command and endpoint retry policy as the reference.              |
| `verify-firebase-oidc.yml` | Manual, read-only authentication check for both environments.                                                                                         |
| `automatic-preview.yml`    | After successful PR CI, resolve and recheck the exact artifact using trusted main code, then deploy `pr-N`.                                           |
| `preview.yml`              | Manual fallback: build a selected same-repository PR head without cloud credentials, then deploy its static artifact using trusted main code.         |
| `preview-cleanup.yml`      | On PR closure, trusted code deletes only its derived `pr-N` channel.                                                                                  |
| `label-sync.yml`           | Synchronize repository labels from main.                                                                                                              |
| `pr-labeler.yml`           | Apply path labels using a pinned action and trusted configuration.                                                                                    |

Draft PRs are eligible for previews. Fork PRs are not. Automatic previews test the CI merge revision; the manual fallback builds the selected PR head. Both recheck that the PR remains open and its head is current before publishing. Automatic previews also reject a changed base, superseded attempt, failed browser/publication job, or inconsistent provenance. Privileged jobs never execute code from the PR artifact.

Templates, CODEOWNERS, dependency updates, labels and browser failure reports are included. `infra/iam/hosting-deployer-role.yaml` describes the custom preview role; its six permissions match the source preview YAML. It is not evidence of production permissions or the complete live preview policy. A YAML file describes a role; merging it does not change cloud IAM.

Healthcare validators remain authoritative. The four-file French translation skill is ported with healthcare terminology, exact-source review and non-public package output. Runtime translation scripts remain deferred because HealthTech currently has English-only schemas and routes. The illustration decision and contact-sheet helpers are adapted to HealthTech's identity, historical-image compatibility, mandatory imagery for new publications and one-candidate workflow; browser CI exercises actual sheet rendering. These are intentional adaptations, not compatible files to copy blindly.

## Deliberate differences from the reference

The CI job IDs/names (`validate` / **Verify project**, `browser` / **Browser smoke and accessibility**), concurrency key, named steps, artifact packaging and screenshot uploads follow Daily AI Pulse. The preview resolver requires those same job names. HealthTech retains 15-minute job limits and checks every changed ledger; its actual editorial, rendered-evidence, orchestration and preview tests replace source-only translation/illustration-export tests. No unsupported translation commands are added.

Production follows the reference's configuration → Node → install → verify → artifact check → OIDC → pinned `npx firebase-tools@15.30.2 deploy` → endpoint checks sequence. HealthTech adds its existing enable flag, superseded-main guard, exact provider check and default-project alias validation. The additional production browser job was removed; the browser suite runs in PR CI as in the reference. `.firebaserc` points to `healthtech-ai-pulse`; explicit `--project` remains in deployment commands.

The OIDC workflow was already present on HealthTech main before this PR. Its job structure, named steps and explicit token-issued check now follow the source. It retains HealthTech's two-environment matrix and authenticated read-only Hosting check because both service accounts trust environment-specific subjects. The provider/account checks and narrow token scope remain in place.

## Environments and identities

Repository flags independently gate writes:

- `HEALTHTECH_DEPLOY_ENABLED=true`: allow production on main pushes or manual dispatch.
- `HEALTHTECH_PREVIEW_ENABLED=true`: allow automatic/manual previews and cleanup. Keep false until the preview trial is authorized. If disabled, existing channels rely on expiry instead of event cleanup.

| Environment  | Variables                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `production` | `FIREBASE_PROJECT_ID`, `FIREBASE_SITE_URL`, `FIREBASE_WIF_PROVIDER`, `FIREBASE_SERVICE_ACCOUNT`                                |
| `preview`    | `PREVIEW_FIREBASE_PROJECT_ID`, `PREVIEW_FIREBASE_SITE_ID`, `PREVIEW_FIREBASE_WIF_PROVIDER`, `PREVIEW_FIREBASE_SERVICE_ACCOUNT` |

The project/site values are `healthtech-ai-pulse`; the production URL is the origin above. Both providers are `projects/293427463899/locations/global/workloadIdentityPools/github/providers/github`.

Production uses `healthtech-prod-deployer@healthtech-ai-pulse.iam.gserviceaccount.com`; preview operations require `healthtech-preview-deployer@healthtech-ai-pulse.iam.gserviceaccount.com`. No service account keys are used. The provider requires repository ID `1422703866`, owner ID `26112006`, and `refs/heads/main`.

The working Daily AI Pulse production account was inspected on October 19, 2026: its project roles are `roles/firebasehosting.admin` and `roles/serviceusage.apiKeysViewer`. The maintainer applied those same roles to HealthTech production before successful run [39245460558](https://github.com/GadDev/healthtech-ai-pulse/actions/runs/39245460558). The additional custom-role binding was still present at that verification; removing it requires a subsequent deployment check. The successful comparison does not isolate which individual permission resolved the failure. Preview has a separate account: inspect its live bindings against the reference preview account instead of assuming production's roles apply.

Each service account trusts its own environment subject through `roles/iam.workloadIdentityUser`:

```text
principal://iam.googleapis.com/projects/293427463899/locations/global/workloadIdentityPools/github/subject/repo:GadDev@26112006/healthtech-ai-pulse@1422703866:environment:production
principal://iam.googleapis.com/projects/293427463899/locations/global/workloadIdentityPools/github/subject/repo:GadDev@26112006/healthtech-ai-pulse@1422703866:environment:preview
```

The immutable ID-bearing subjects were verified against the repository OIDC configuration. Do not replace them with the legacy name-only format. The successful read-only OIDC run was `39227950685`, attempt 2; this proves authentication and Hosting reads, not deployment writes.

## First deployment and preview acceptance

Production run [39245460558](https://github.com/GadDev/healthtech-ai-pulse/actions/runs/39245460558) passed on October 19, 2026: 46 static files uploaded, the version finalized and released, and home/robots/RSS/sitemap endpoint checks passed. Earlier version-creation HTTP 500 failures stopped after matching the reference production IAM roles. This establishes deployment and endpoint acceptance, not a complete manual browser review. The temporary diagnostic workflow introduced in PRs #11 and #12 is removed; its historical run logs remain available.

### Preview reference and current acceptance

The reference automatic preview [39237867884](https://github.com/GadDev/daily-ai-pulse/actions/runs/39237867884) passed on October 19, 2026, including exact-artifact download, current-PR/provenance checks, preview WIF, channel deployment and endpoint/noindex checks. HealthTech follows that process, retaining its own numeric identities and enable flag:

1. Same-repository PR CI runs without cloud credentials and packages `dist/` plus the tested merge/head/base metadata.
2. After both CI jobs pass, trusted main code validates the current PR and the exact run-attempt artifact, its digest and provenance.
3. The preview identity publishes only the derived `pr-N` channel using Firebase CLI `15.30.2`, seven-day expiry and `--no-authorized-domains`.
4. The workflow checks home/robots/RSS/sitemap and the `X-Robots-Tag: noindex` directive. The Actions summary records the URL and tested commit.
5. Closing or merging the PR queues channel deletion in the same per-PR concurrency group. Expiry is the fallback.

The manual fallback builds the selected PR head with local verification and browser checks, then hands static files to a separate trusted deploy job. Both paths use the production origin as the default Astro site, matching the reference's absolute RSS/sitemap URL behavior; channel URLs remain the preview entry points and response headers prevent indexing. Explicit `SITE_URL` still overrides the origin.

At this review, all eight HealthTech preview/cleanup runs were skipped and no manual preview run existed. That is not live preview acceptance. The last operator-confirmed enable flag was false; read its current value before changing it. Do not reuse production deployment success as evidence that preview writes or cleanup work.

Before activation, inspect the live preview project roles in both projects:

```bash
gcloud projects get-iam-policy daily-ai-pulse-db253 \
  --flatten="bindings[].members" \
  --filter="bindings.members=serviceAccount:daily-ai-pulse-preview@daily-ai-pulse-db253.iam.gserviceaccount.com" \
  --format="yaml(bindings.role,bindings.condition)"

gcloud projects get-iam-policy healthtech-ai-pulse \
  --flatten="bindings[].members" \
  --filter="bindings.members=serviceAccount:healthtech-preview-deployer@healthtech-ai-pulse.iam.gserviceaccount.com" \
  --format="yaml(bindings.role,bindings.condition)"

gh variable list --repo GadDev/healthtech-ai-pulse --env preview --json name,value
gh variable list --repo GadDev/healthtech-ai-pulse --json name,value
```

The reference uses a separate preview pool/provider with workflow/event restrictions. HealthTech retains its working provider with numeric owner/repository/main restrictions and a separate immutable environment subject on each account. Provider names and subject formats must match their own repositories; copying the reference principal literally would break trust. Verify the preview account's current `roles/iam.workloadIdentityUser` binding and environment branch restrictions before the trial. Hosting permissions remain site-level, so the generated-channel checks are workflow controls, not IAM channel isolation.

### Live preview trial

After reviewing and merging the workflow changes:

1. Confirm production deployment and endpoint smoke checks succeed. Review the resulting Hosting release before recording live acceptance. An enabled production flag means merging changes to main triggers deployment.
2. Enable previews only when ready for a public trial:

   ```bash
   gh variable set HEALTHTECH_PREVIEW_ENABLED --body true --repo GadDev/healthtech-ai-pulse
   ```

3. Open or update a same-repository draft PR after the new workflows are on main. Both CI jobs must succeed. Automatic previews consume the exact successful CI artifact and publish the URL and tested SHA in the Actions summary. A new CI run avoids artifacts produced before provenance packaging existed.
4. If needed, dispatch the manual fallback from main with the numeric PR number:

   ```bash
   gh workflow run preview.yml --ref main --repo GadDev/healthtech-ai-pulse -f pr_number=N
   ```

5. Confirm the URL, intended revision, public routes and `X-Robots-Tag: noindex` header. Update the PR and check that its channel refreshes; close it and verify cleanup. Record observed results rather than marking these checks complete in advance.

Preview channels expire after seven days. They are publicly accessible; `noindex` is not access control. Do not include confidential information. Preview publishing does not approve or merge editorial content.

For a production rollback, use an approved previous release in Firebase Hosting or revert the reviewed source change through a PR and let main redeploy. Confirm endpoints afterward. A rollback has not yet been exercised for this project.

## Local checks

Use Node.js 24 LTS (`nvm install && nvm use`, using `.nvmrc`), `npm ci`, `npm run verify`, and `npm run test:e2e` with Chromium installed. `npm test` includes artifact provenance, manual request, cleanup routing and preview identity rejection cases. Local tests do not establish live cloud permissions or Hosting availability.
