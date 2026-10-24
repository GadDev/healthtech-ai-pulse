# HealthTech daily issue contract

Contract: `healthtech-1.0`. A daily issue is an ordered index into canonical English articles, not a second copy of their bodies. [Editorial policy](EDITORIAL.md) governs selection and claim verification; [the content model](CONTENT_MODEL.md) governs ledger/story relationships. The executable issue schema is the `pulse` collection in `src/content.config.ts`.

## Files and routes

One explicitly authorised exception exists for the
[24 October evening edition](editorial/EVENING_EDITION_2026_10_24.md):
`edition: evening` keeps the real `date: 2026-10-24` but uses the full filename/key
`2026-10-24-evening` and route `/pulse/2026-10-24-evening/`. The ordinary issue is
unchanged. No other date or suffix is supported. All story references must resolve
to the evening ledger, with at most two surviving stories for that edition.

| Item                              | Repository path                          | Public route                |
| --------------------------------- | ---------------------------------------- | --------------------------- |
| Canonical article                 | `src/content/stories/YYYY-MM-DD-slug.md` | `/stories/YYYY-MM-DD-slug/` |
| Daily issue                       | `src/content/pulse/YYYY-MM-DD.md`        | `/pulse/YYYY-MM-DD/`        |
| Edition archive                   | `src/pages/pulse/index.astro`            | `/pulse/`                   |
| Daily research/publication record | `docs/editorial/ledgers/YYYY-MM-DD.json` | Not a public edition        |

Use the Europe/Luxembourg editorial date. The issue filename, frontmatter `date` and associated ledger's `editorial_date` must agree. Source/event dates remain on their own evidence records; do not relabel old evidence with the issue date.

Article and listing dates identify the edition, not the first-publication time.
Retrospective preparation must remain explicit in article prose. RSS entries state
the edition date in their description and omit optional publication timestamps
rather than relabelling an old edition date as `pubDate`.

## Issue frontmatter

| Field                | Meaning                                                                   |
| -------------------- | ------------------------------------------------------------------------- |
| `date`               | Valid date matching the issue filename                                    |
| `title`              | Nonempty issue title                                                      |
| `summary`            | Nonempty edition-level summary, bounded by the included stories           |
| `sections`           | Nonempty ordered array of editorial groupings                             |
| `sections[].key`     | Nonempty key, unique within this issue                                    |
| `sections[].label`   | Nonempty reader-facing heading                                            |
| `sections[].stories` | Nonempty ordered list of canonical story IDs without extensions           |
| `featured`           | Optional reference to an included story; not an evidence rating           |
| `mustKnow`           | Optional reference matching the ledger's `publication.must_know_story_id` |

Omit absent optional references rather than using empty strings or placeholders. `featured` and `mustKnow` are distinct and neither is required. MUST KNOW must satisfy the stricter editorial criteria; a lead reading position does not establish exceptional evidence.

This is a contract illustration, not a published edition. Its example story does not exist and must not be copied into a live collection:

```yaml
---
date: 2026-10-19
title: 'HealthTech AI Pulse — 19 October 2026'
summary: 'Illustrative edition metadata, not a report of actual findings.'
sections:
  - key: 'clinical-ai'
    label: 'Clinical AI'
    stories:
      - '2026-10-19-example-evidence-brief'
---
```

The current renderer uses frontmatter, not the issue Markdown body. Do not place an introduction, correction or substantive claim only in the body and assume it will be displayed. Story text, evidence cards, sources and dated corrections belong on canonical article pages.

## References, taxonomy and ordering

A story has exactly one healthcare desk in its own metadata: `clinical-ai`, `health-systems`, `pharma`, `biomedical-foundations` or `safety-policy`. Edition sections are editorial groupings; they do not change that classification or create duplicate stories across desks.

Render sections in their declared order and stories in each section's declared order. A story may appear only once across the entire issue. All references must resolve to existing non-draft stories and match the associated daily ledger's surviving `publication.story_ids` exactly. Watch, rejected, withheld and draft stories cannot enter an issue.

Omit empty sections; no desk quota applies. Neither `featured` nor `mustKnow` implicitly reorders the manifest. The current issue page renders section headings and article links; it does not provide a separate featured/MUST KNOW visual treatment.

The archive lists issues newest first. Each article body exists once, even when linked from an edition, desk page and the latest-stories view.

## Empty and all-withheld days

When no verified stories survive, persist a `publication.mode: ledger-only` ledger with empty `story_ids`, `issue_path: null` and `must_know_story_id: null`. Do not create an empty issue, artificial story, artwork or MUST KNOW entry. Retain the actual research decisions and downstream withholding reasons.

When stories survive, use `publication.mode: publication`, set the ledger's `issue_path` to the actual dated issue, and include only those surviving stories. The pilot's zero-to-two-story capacity remains an editorial rule, not a requirement to fill two slots. Controlled trials cannot create live issue mappings.

## Validation and publication

The Astro schema, content checker and editorial validator together check dates/required fields, nonempty sections, unique section keys, repeated references, missing/draft stories, included optional references, ledger existence, exact story coverage and MUST KNOW correspondence. Run against the actual dated batch:

```bash
npm run content:check
npm run editorial:check -- docs/editorial/ledgers/YYYY-MM-DD.json
npm run illustration:check -- docs/editorial/ledgers/YYYY-MM-DD.json
npm run verify
```

These checks do not establish scientific correctness or approve a story. An absent or failed required image blocks a new story. `illustration.mode: none` remains historical-only through the 2026-10-21 edition. English is the required public locale; French translation packages do not create French edition routes.

The [orchestrator](editorial/ORCHESTRATOR.md) persists research, verifies selected claims, prepares canonical articles and any declared assets, writes the issue and final ledger, and opens or updates one draft PR. `draft: false` on a publication-ready article is separate from the mandatory draft status of that GitHub PR. Human review/merge and a successful gated deployment control live publication. GitHub Actions does not perform research or schedule editorial runs.

Adapted from `GadDev/daily-ai-pulse/docs/DAILY_ISSUE.md` at `6269d2b7dbc01046cfcdaf7f204b8b6b14de9e64`, using HealthTech's implemented schema, optional references and ledger-only behavior. No source edition or historical publication claim is imported.
