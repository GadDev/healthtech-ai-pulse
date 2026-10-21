# Verified article → paper links (research-link-v1)

Status: **proposed PR 3 implementation**. This file records the *finite, explicitly checked* paper-identity allowlist; it does not establish clinical validity, a current retraction-surveillance service, or the existence of a Research API. The authoritative Pulse [editorial rules](../../EDITORIAL.md) and [content model](../../CONTENT_MODEL.md) remain unchanged.

## Why this is a curated allowlist

The strict Pulse story frontmatter has `candidateId` and human-readable source URLs, but not a dedicated DOI/PMID/PMCID property. Selected editorial ledger candidates carry optional DOI and PMID values, publication verification, and source-inspection records. **A non-null ledger DOI alone is insufficient.** Automatic URL/title matching would be unsafe for preprints, versions, supplements and regulatory notices.

The build-only resolver in `src/lib/research/verified-paper-links.ts` therefore checks each approved record against **all daily ledgers**: published/non-draft `story.id`; exact `story.data.candidateId`; one matching selected candidate (no duplicate across watch/excluded records); `publication.mode: publication`; the published story list; absence of withholding; verified publication status/date/reviewer; confirmed deduplication; exact DOI match; and an inspected primary publisher canonical URL that is also listed on the public story. Any change or ambiguity suppresses the link. No API calls or live scraping occur at static build time.

## Initial externally checked publisher records

All four publisher landing pages were examined on **21 October 2026** using AI-assisted source inspection. This is **bibliographic identifier verification only**, not independent human scientific review. The reviewer should recheck identity/versions/corrections before acceptance. DOI links point to the existing fixture-only Research UI; no actual paper is fetched there.

| Published Pulse story | Ledger DOI | Publisher identifier record |
| --- | --- | --- |
| `2026-10-12-clinical-ai-language-evidence` | `10.1038/s44528-026-00042-1` | [Ariel & Laban, Communications Health, 12 Oct 2026](https://www.nature.com/articles/s44528-026-00042-1) |
| `2026-10-13-epilepsy-feedback-replay` | `10.1038/s41591-026-04680-4` | [Goldblum et al., Nature Medicine, 13 Oct 2026](https://www.nature.com/articles/s41591-026-04680-4) |
| `2026-10-19-oncology-ai-ehr-handoff` | `10.1038/s41746-026-03396-6` | [van Koevorden et al., npj Digital Medicine, 17 Oct 2026](https://www.nature.com/articles/s41746-026-03396-6) |
| `2026-10-21-expertise-automation-bias-neonatal-imaging` | `10.1038/s41746-026-03399-3` | [Lee et al., npj Digital Medicine, 20 Oct 2026](https://www.nature.com/articles/s41746-026-03399-3) |

The epilepsy identity also appears in [PubMed PMID 42869994](https://pubmed.ncbi.nlm.nih.gov/42869994/), matching its DOI. PMID is not added as a second query key: the current version deliberately emits one checked DOI per link.

## Deliberate exclusions and retractions/corrections policy

- `2026-10-20-astrazeneca-oracle-trials-agreement`: announcement, not a paper DOI in the selected ledger.
- `2026-10-21-fda-ai-device-change-plan-examples`: official regulatory guidance; no paper DOI in the selected ledger.
- Unknown/missing ID, draft/withheld/unpublished story, dedup conflict, unverifiable publisher mapping or duplicated ledger candidate: **no deep-link UI**. Standard source references remain visible.
- These checks use *stored* correction/retraction observations from Pulse's editorial process and do not claim continual surveillance. A newly identified identity/correction problem requires removing or revising the allowlist entry in a human-reviewed PR.
- Do not infer PMCID or attach papers automatically to a future workspace. The Research UI remains fixture-only and describes syntactically valid input without pretending it loaded that paper.

## Release and independence gates

Run `npm run verify` and `npm run test:e2e`, including the new real-ledger failure-mode tests. Browser tests assert eligible and excluded articles, navigable public DOI-only links, offline Research UI and unchanged RSS behavior. No script changes article frontmatter, editorial ledgers, content schemas, publication automation, Firebase configuration, or Cloud Run. Changes to the allowlist require explicit primary-record review with truthful reviewer provenance.

Later API work must separately pin `api-v1`, validate bibliographic records and rights, and preserve an honest source-unavailable/abstention state.
