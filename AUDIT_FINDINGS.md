# HealthTech AI Pulse — Repository Audit Findings

**Audit date:** 2026-10-23  
**Issue:** #50 — Audit repository for duplicated information, unused files, and unnecessary content  
**Auditor:** AI agent (OpenCode session)

---

## Executive Summary

The HealthTech AI Pulse repository is well-structured with clear editorial contracts, validation pipelines, and CI/CD infrastructure. The codebase follows a disciplined approach to healthcare evidence reporting with mandatory human review gates. This audit identified **12 findings** across 5 categories:

| Category                           | Count | Severity |
| ---------------------------------- | ----- | -------- |
| Unused/obsolete files              | 3     | Low      |
| Duplicated/conflicting information | 2     | Medium   |
| Missing authoritative references   | 2     | Medium   |
| Test infrastructure issues         | 1     | Low      |
| Navigation/documentation gaps      | 4     | Low      |

---

## Detailed Findings

### 1. Unused/Obsolete Files

#### 1.1 `.gitkeep` files in content directories (3 files)

**Paths:**

- `src/content/stories/.gitkeep`
- `src/content/pulse/.gitkeep`
- `docs/editorial/ledgers/.gitkeep`

**Evidence:** These empty files serve no purpose — Git tracks directories through their contents, and these directories already contain tracked files (8 stories, 7 pulse editions, 12 ledgers respectively).

**Recommendation:** **Delete** all three `.gitkeep` files. No references exist in code, CI, or documentation.

**Uncertainty:** None — confirmed unused via `grep -r "\.gitkeep" --include="*.json" --include="*.ts" --include="*.yml" --include="*.md" .`

---

#### 1.2 Missing illustration briefs for 2 historical stories (2 files)

**Paths (missing):**

- `docs/editorial/illustrations/briefs/2026-10-19-oncology-ai-ehr-handoff.json`
- `docs/editorial/illustrations/briefs/2026-10-20-astrazeneca-oracle-trials-agreement.json`

**Evidence:** The `HISTORICAL_BACKFILL_REVIEW_2026-10-21.md` documents 4 historical stories with backfilled images. All 4 have review JSON files in `docs/editorial/illustrations/reviews/`, but only 2 have corresponding briefs in `docs/editorial/illustrations/briefs/`. The other 2 stories (2026-10-19 and 2026-10-20) have reviews but no briefs.

**Impact:** The illustration system's `resolveIllustrationGeneration.ts` validates brief references against brief files (lines 62-65). Missing briefs would cause validation failures if the CLI were invoked for these stories.

**Recommendation:** **Create the two missing brief files** using the same retrospective brief pattern as the existing ones, or **document in `HISTORICAL_BACKFILL_REVIEW_2026-10-21.md`** that these two stories use a different review path (the review JSON directly stores the brief hash without a separate brief file).

**Uncertainty:** Medium — the briefs may have been intentionally omitted because these are historical backfill reviews using pre-existing WebP assets from PR #46. The review records store `brief_sha256` directly.

---

#### 1.3 `docs/editorial/trials/2026-10-18.json` — controlled trial ledger

**Path:** `docs/editorial/trials/2026-10-18.json`

**Evidence:** This file is a controlled trial ledger (`kind: "controlled-trial"`) from the initial orchestration trial. The `orchestration-2026-10-18.md` documents it as "not a comprehensive research run, clinical study review, human editorial approval or scheduled trial."

**Status:** This is explicitly documented as a trial artifact and is correctly excluded from publication validation (`checkEditorial.ts` line 265-266 skips controlled trials for story mapping). It serves as historical evidence of the trial.

**Recommendation:** **Retain** — this is documented trial evidence, not obsolete content. The `docs/editorial/ledgers/README.md` line 30 explicitly states: "Controlled source-inspection trials belong under `docs/editorial/trials/` with `kind: controlled-trial`; they cannot map into live stories."

---

### 2. Duplicated/Conflicting Information

#### 2.1 Desk definitions duplicated across 3 files

**Locations:**

1. `src/lib/editorial-schema.ts` lines 10-16 — `deskKeys` const array (source of truth for Zod validation)
2. `src/lib/categories.ts` lines 2-8 — re-exports `deskKeys` from schema, adds display metadata
3. `docs/editorial/TOPICS_V1.yml` lines 3-8 — YAML `desks` mapping for human-readable docs

**Evidence:** The `deskKeys` array in `editorial-schema.ts` is the authoritative source for validation. `categories.ts` correctly re-exports it. `TOPICS_V1.yml` duplicates the desk keys and labels for documentation purposes.

**Conflict risk:** If a desk is added/removed/renamed in one location but not others, validation and documentation diverge.

**Recommendation:** **Consolidate to single source of truth.** Keep `deskKeys` in `editorial-schema.ts` as the authoritative definition. Update `categories.ts` to import from there (already done). Update `TOPICS_V1.yml` to reference the schema or add a generation step, or at minimum add a comment in `TOPICS_V1.yml` stating: "Desk keys must match `src/lib/editorial-schema.ts:deskKeys`."

**Uncertainty:** Low — the current synchronization appears correct, but no automated check exists.

---

#### 2.2 Editorial policy version referenced inconsistently

**Locations:**

- `docs/EDITORIAL.md` line 3: "Version: healthtech-1.0 (editorial revision: 2026-10-21)"
- `docs/CONTENT_MODEL.md` line 3: "Version: healthtech-1.0."
- `docs/editorial/EDITORIAL_SCHEMA_V1.md` line 3: "Contract: `healthtech-1.0`."
- `docs/editorial/DECISION_ENGINE_V1.md` line 3: "Contract: `healthtech-1.0`."
- `docs/editorial/ILLUSTRATION_SYSTEM_V1.md` line 3: "Contract: `healthtech-1.0`."
- `docs/editorial/VISUAL_CONSTITUTION_V1.md` line 5: "Contract: `healthtech-1.0`."
- `src/lib/editorial-schema.ts` line 309, 339: `contractVersion: z.literal('healthtech-1.0')`, `schema_version: z.literal('healthtech-1.0')`

**Evidence:** Multiple files declare `healthtech-1.0` as the contract version. `EDITORIAL.md` adds a date suffix "(editorial revision: 2026-10-21)" which is not reflected elsewhere.

**Recommendation:** **Standardize version references.** Either:

- Use `healthtech-1.0` everywhere without date suffixes, with the date only in `EDITORIAL.md` as the policy revision date, OR
- Add a `version` field to `TOPICS_V1.yml` and `ledger.schema.json` and reference it consistently.

**Uncertainty:** Low — this is a documentation consistency issue, not a functional bug.

---

### 3. Missing Authoritative References

#### 3.1 `README.md` references non-existent `.env.example`

**Location:** `README.md` line 49: "see [`.env.example`](.env.example)"

**Evidence:** No `.env.example` file exists in the repository root.

**Recommendation:** **Either create `.env.example`** with documented environment variables (SITE_URL, FIREBASE_* vars) **or update the README link** to point to `docs/DEPLOYMENT.md` which contains deployment configuration guidance.

**Uncertainty:** None — file does not exist.

---

#### 3.2 `README.md` references `docs/editorial/ORCHESTRATOR.md` but not `docs/editorial/DISCOVERY_V1.md`

**Location:** `README.md` line 93: links to ORCHESTRATOR but not DISCOVERY_V1

**Evidence:** The orchestrator explicitly loads `DISCOVERY_V1.md` as a prerequisite (ORCHESTRATOR.md line 37). The discovery plan is a core operational contract.

**Recommendation:** **Add link to `docs/editorial/DISCOVERY_V1.md`** in the Documentation section of README.md alongside the Orchestrator link.

---

### 4. Test Infrastructure Issues

#### 4.1 `tests/rendered-evidence.test.ts` fails due to symlink/copy strategy

**Path:** `tests/rendered-evidence.test.ts`

**Evidence:** The test copies the entire source tree to a temp directory and symlinks `node_modules`. This breaks Astro's virtual module resolution (error: "No cached compile metadata found for EvidenceCard.astro").

**Failure output:**

```
No cached compile metadata found for "/private/var/folders/.../EvidenceCard.astro?astro&type=style&index=0&lang.css"
The main Astro module ".../EvidenceCard.astro" should have compiled and filled the metadata first
```

**Recommendation:** **Refactor the test** to either:

- Run `astro build` in the actual repo (with a unique output dir), or
- Use `astro check` for type validation without full build, or
- Properly isolate the test by copying only necessary files and installing deps in the temp dir.

**Severity:** Low — this is a test infrastructure issue, not a production bug. All other 135 tests pass.

---

### 5. Navigation/Documentation Gaps

#### 5.1 No link from `docs/editorial/ledgers/README.md` to `docs/editorial/ILLUSTRATION_SYSTEM_V1.md`

**Evidence:** The ledgers README references EDITORIAL.md, CONTENT_MODEL.md, DAILY_ISSUE.md, EDITORIAL_SCHEMA_V1.md, TOPICS_V1.yml, ORCHESTRATOR.md, and ledger.schema.json — but not ILLUSTRATION_SYSTEM_V1.md which governs mandatory imagery for stories from 2026-10-22.

**Recommendation:** **Add reference** to ILLUSTRATION_SYSTEM_V1.md in the ledgers README "Read" section.

---

#### 5.2 `docs/editorial/illustrations/briefs/` directory lacks README

**Evidence:** The briefs directory contains 6 JSON files but no README explaining their purpose, format, or relationship to reviews/assets.

**Recommendation:** **Add a brief README.md** in `docs/editorial/illustrations/briefs/` explaining:

- Purpose: acceptance briefs for generated images (retrospective for historical stories)
- Format: matches the brief schema in ILLUSTRATION_SYSTEM_V1.md
- Relationship: `brief_sha256` in review JSON must match the brief file content

---

#### 5.3 `docs/editorial/illustrations/reviews/` directory lacks README

**Evidence:** Same as above — 8 review JSON files, no documentation.

**Recommendation:** **Add a brief README.md** in `docs/editorial/illustrations/reviews/` explaining:

- Purpose: strict review records for generated images
- Schema: defined in `src/lib/editorial-schema.ts` (`reviewSchema`)
- Validation: checked by `illustration:check` and `editorial:check`

---

#### 5.4 `src/pages/robots.txt.ts` and `src/pages/rss.xml.ts` lack inline documentation

**Evidence:** These are Astro endpoint files generating static assets. No comments explain their behavior or configuration.

**Recommendation:** **Add brief header comments** to each file describing:

- What they generate
- Key configuration (e.g., `SITE_URL` dependency for canonical URLs)
- Any editorial policy constraints (e.g., RSS omits `pubDate` per DAILY_ISSUE.md)

---

## Recommended Actions Summary

| #   | Action                                                     | Type          | Effort  |
| --- | ---------------------------------------------------------- | ------------- | ------- |
| 1   | Delete 3 `.gitkeep` files                                  | Cleanup       | Trivial |
| 2   | Create 2 missing illustration briefs OR document exception | Cleanup       | Low     |
| 3   | Add desk synchronization comment to TOPICS_V1.yml          | Documentation | Trivial |
| 4   | Standardize contract version references                    | Documentation | Low     |
| 5   | Fix/remove `.env.example` link in README                   | Documentation | Trivial |
| 6   | Add DISCOVERY_V1.md link to README                         | Documentation | Trivial |
| 7   | Refactor rendered-evidence test                            | Test fix      | Medium  |
| 8   | Add ILLUSTRATION_SYSTEM_V1.md reference to ledgers README  | Documentation | Trivial |
| 9   | Add README to briefs directory                             | Documentation | Trivial |
| 10  | Add README to reviews directory                            | Documentation | Trivial |
| 11  | Add header comments to robots.txt.ts and rss.xml.ts        | Documentation | Trivial |

---

## Items NOT Recommended for Removal

The following were investigated but **retained** with justification:

| Path                                                                                                | Reason                                                                               |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `docs/editorial/trials/2026-10-18.json`                                                             | Documented controlled trial artifact; excluded from publication validation by design |
| `docs/editorial/illustrations/briefs/2026-10-19-oncology-ai-ehr-handoff.json` (missing)             | May be intentional for historical backfill — review stores brief hash directly       |
| `docs/editorial/illustrations/briefs/2026-10-20-astrazeneca-oracle-trials-agreement.json` (missing) | Same as above                                                                        |
| `scripts/generate-icons.mjs`                                                                        | Used by `npm run icons:generate` — generates favicon/ICO from master SVG             |
| `public/icons/`, `public/apple-touch-icon.png`, `public/favicon.ico`                                | Generated assets; committed for CI/CD convenience                                    |
| `.oxlintrc.json`, `.oxfmtrc.json`                                                                   | Oxlint/Oxfmt configuration — actively used by CI                                     |
| `.github/labeler.yml`, `.github/labels.json`, `.github/dependabot.yml`                              | GitHub automation config — actively used                                             |
| All ledger files in `docs/editorial/ledgers/`                                                       | Required for editorial validation and cross-file deduplication checks                |
| All trial files in `docs/editorial/trials/`                                                         | Documented isolation boundary for controlled trials                                  |

---

## Validation Status

All core validation passes except the known test infrastructure issue:

```
npm run verify
→ lint: PASS
→ format:check: PASS
→ scripts:check: PASS
→ tests:check: PASS
→ schema:check: PASS
→ content:check: PASS
→ editorial:check: PASS (13 ledgers, 8 stories validated)
→ illustration:check: PASS (13 ledgers, 8 stories validated)
→ test: 135 pass, 1 fail (rendered-evidence test infrastructure)
→ build: PASS
```
