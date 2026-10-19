# Firebase operations

HealthTech uses the dedicated `healthtech-ai-pulse` Firebase project (number `293427463899`) and Hosting site `healthtech-ai-pulse`. The production origin is <https://healthtech-ai-pulse.web.app>. Cloud resources and IAM are configured separately from repository files.

## Workflow alignment

The reference is `GadDev/daily-ai-pulse` at `6269d2b7dbc01046cfcdaf7f204b8b6b14de9e64`. Deployment behavior is adapted to HealthTech's identities and healthcare publication checks.

| Workflow                   | Behavior                                                                                                                                              |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ci.yml`                   | Healthcare validation/build and browser/accessibility checks; one-day static artifact with run, attempt, PR, head, base and tested revision metadata. |
| `deploy.yml`               | Verified main revision to production; skip superseded revisions; pinned CLI installed before authentication.                                          |
| `verify-firebase-oidc.yml` | Manual, read-only authentication check for both environments.                                                                                         |
| `automatic-preview.yml`    | After successful PR CI, resolve and recheck the exact artifact using trusted main code, then deploy `pr-N`.                                           |
| `preview.yml`              | Manual fallback: build a selected same-repository PR head without cloud credentials, then deploy its static artifact using trusted main code.         |
| `preview-cleanup.yml`      | On PR closure, trusted code deletes only its derived `pr-N` channel.                                                                                  |
| `label-sync.yml`           | Synchronize repository labels from main.                                                                                                              |
| `pr-labeler.yml`           | Apply path labels using a pinned action and trusted configuration.                                                                                    |

Draft PRs are eligible for previews. Fork PRs are not. Automatic previews test the CI merge revision; the manual fallback builds the selected PR head. Both recheck that the PR remains open and its head is current before publishing. Automatic previews also reject a changed base, superseded attempt, failed browser/publication job, or inconsistent provenance. Privileged jobs never execute code from the PR artifact.

Templates, CODEOWNERS, dependency updates, labels and browser failure reports are included. The existing shared role file `infra/iam/hosting-deployer-role.yaml` remains canonical: its six permissions match the source preview role, so a second role YAML is unnecessary. A YAML file describes the role; merging it does not change cloud IAM.

Healthcare validators remain authoritative. Source translation scripts are deferred because HealthTech currently has English-only schemas and routes. Source illustration export/contact-sheet helpers assume different ledger contracts; HealthTech retains its optional-image mappings and validation. These are intentional adaptations, not compatible files to copy blindly.

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

Each service account trusts its own environment subject through `roles/iam.workloadIdentityUser`:

```text
principal://iam.googleapis.com/projects/293427463899/locations/global/workloadIdentityPools/github/subject/repo:GadDev@26112006/healthtech-ai-pulse@1422703866:environment:production
principal://iam.googleapis.com/projects/293427463899/locations/global/workloadIdentityPools/github/subject/repo:GadDev@26112006/healthtech-ai-pulse@1422703866:environment:preview
```

The immutable ID-bearing subjects were verified against the repository OIDC configuration. Do not replace them with the legacy name-only format. The successful read-only OIDC run was `39227950685`, attempt 2; this proves authentication and Hosting reads, not deployment writes.

## First deployment and preview acceptance

Production run `39229486538` failed in both attempts while creating a Hosting version, with HTTP 500 from `firebasehosting.googleapis.com`. Publication and browser checks passed; no successful live release or smoke check was recorded. Diagnose that server response before treating deployment as accepted. Dependency deprecation warnings do not identify its cause. Do not broaden IAM without evidence of a denied permission.

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

Use Node `22.22.3`, `npm ci`, `npm run verify`, and `npm run test:e2e` with Chromium installed. `npm test` includes artifact provenance, manual request, cleanup routing and preview identity rejection cases. Local tests do not establish live cloud permissions or Hosting availability.
