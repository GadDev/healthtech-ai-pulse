/**
 * research-link-v1: deliberately curated publisher-checked link eligibility.
 *
 * These are public bibliographic identifiers, not study-quality endorsements.
 * This module is server-side/build-time only; never imported by the React island.
 * No matching DOI can be inferred from an article title or source URL.
 */

export interface PublishedResearchStory {
  id: string;
  data: {
    draft: boolean;
    candidateId: string;
    sources: readonly { url: string }[];
  };
}

export interface ResearchLedger {
  kind: string;
  publication: {
    mode: string;
    story_ids: readonly string[];
    withheld_selected: readonly { id: string }[];
  };
  candidates: readonly ResearchCandidate[];
  watchlist?: readonly { id: string }[];
  exclusions?: readonly { id: string }[];
}

export interface ResearchCandidate {
  id: string;
  decision: string;
  underlying_identity: { doi: string | null; pmid: string | null };
  publication_verification: {
    status: string;
    checked_at: string | null;
    checked_by: string | null;
  };
  deduplication: { publication_status: string };
  sources: readonly {
    role: string;
    canonical_url: string;
    inspected_at: string | null;
    access_level: string;
  }[];
}

/**
 * Explicitly inspected publisher records and exact DOI identity.
 * External bibliographic rechecking occurred on 2026-10-21.
 * This is AI-assisted bibliographic verification, not independent clinical review.
 * See docs/research/engineering/VERIFIED_STORY_LINKS_V1.md.
 */
export const approvedPublisherLinks = [
  {
    storyId: '2026-10-12-clinical-ai-language-evidence',
    candidateId: '2026-10-12-clinical-ai-language-evidence',
    doi: '10.1038/s44528-026-00042-1',
    publisherUrl: 'https://www.nature.com/articles/s44528-026-00042-1',
  },
  {
    storyId: '2026-10-13-epilepsy-feedback-replay',
    candidateId: '2026-10-13-epilepsy-feedback-replay',
    doi: '10.1038/s41591-026-04680-4',
    publisherUrl: 'https://www.nature.com/articles/s41591-026-04680-4',
  },
  {
    storyId: '2026-10-19-oncology-ai-ehr-handoff',
    candidateId: '2026-10-19-oncology-ai-ehr-handoff',
    doi: '10.1038/s41746-026-03396-6',
    publisherUrl: 'https://www.nature.com/articles/s41746-026-03396-6',
  },
  {
    storyId: '2026-10-21-expertise-automation-bias-neonatal-imaging',
    candidateId: '2026-10-21-expertise-automation-bias-neonatal-imaging',
    doi: '10.1038/s41746-026-03399-3',
    publisherUrl: 'https://www.nature.com/articles/s41746-026-03399-3',
  },
] as const;

const verified = new Set(['verified', 'verified-with-claim-scope']);
const confirmed = new Set(['new-confirmed', 'material-update-confirmed']);

/** Return a link only if editorial publication and inspected publisher identity still agree. */
export function verifiedPaperResearchHref(
  story: PublishedResearchStory,
  ledgers: readonly ResearchLedger[],
): string | null {
  if (story.data.draft) return null;
  const approved = approvedPublisherLinks.filter((item) => item.storyId === story.id);
  if (approved.length !== 1) return null;
  const expected = approved[0];
  if (story.data.candidateId !== expected.candidateId) return null;
  if (!story.data.sources.some((source) => source.url === expected.publisherUrl)) return null;

  // Scan all research histories, not just today's ledger. Any identity conflict
  // or duplicate candidate is ambiguous and must suppress the link.
  const matches = ledgers.flatMap((ledger) =>
    [...ledger.candidates, ...(ledger.watchlist ?? []), ...(ledger.exclusions ?? [])]
      .filter((candidate) => candidate.id === expected.candidateId)
      .map((candidate) => ({ ledger, candidate })),
  );
  if (matches.length !== 1) return null;
  const { ledger, candidate } = matches[0];
  if (
    ledger.kind !== 'daily' ||
    ledger.publication.mode !== 'publication' ||
    !ledger.publication.story_ids.includes(story.id) ||
    ledger.publication.story_ids.filter((id) => id === story.id).length !== 1 ||
    ledger.publication.withheld_selected.some((item) => item.id === story.id) ||
    !('decision' in candidate) ||
    candidate.decision !== 'selected' ||
    !('underlying_identity' in candidate) ||
    candidate.underlying_identity.doi !== expected.doi ||
    !('publication_verification' in candidate) ||
    !verified.has(candidate.publication_verification.status) ||
    !candidate.publication_verification.checked_at ||
    !candidate.publication_verification.checked_by ||
    !('deduplication' in candidate) ||
    !confirmed.has(candidate.deduplication.publication_status) ||
    !('sources' in candidate) ||
    !candidate.sources.some(
      (source) =>
        source.role === 'primary' &&
        source.canonical_url === expected.publisherUrl &&
        source.inspected_at &&
        source.access_level !== 'unavailable',
    )
  ) {
    return null;
  }

  return `/research/?doi=${encodeURIComponent(expected.doi)}`;
}
