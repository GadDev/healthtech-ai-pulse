// Synthetic, non-publishable data for validator tests; never a real source or finding.
import { candidateSchema, ledgerSchema, storySchema } from '../../src/lib/editorial-schema.ts';

export type SyntheticLedger = ReturnType<typeof ledgerSchema.parse>;
export type SyntheticCandidate = ReturnType<typeof candidateSchema.parse>;
export type SyntheticStory = Omit<ReturnType<typeof storySchema.parse>, 'date'> & { date: string };

export const now = '2026-10-18T19:00:00Z';
export const vocabulary = new Set(['research-tools']);
export function fixture() {
  const id = '2026-10-18-synthetic-tool';
  const verified = {
    status: 'verified-with-claim-scope',
    checked_at: now,
    checked_by: 'Synthetic test actor',
    supported_scope: 'Synthetic availability fixture only',
    reason: 'Test data, not a scientific finding',
  };
  const source = {
    id: 'source',
    url: 'https://example.invalid/synthetic-tool',
    canonical_url: 'https://example.invalid/synthetic-tool',
    publisher: 'Synthetic fixture publisher',
    role: 'primary',
    source_type: 'repository',
    publication_date: '2026-10-18',
    date_reason: 'Synthetic date',
    inspected_at: now,
    access_level: 'artifact-only',
    relationship_to_sponsor: 'Synthetic first party',
  };
  const evidence = {
    publication_status: 'company-announcement',
    study_design: 'not-applicable: availability claim',
    validation_setting: 'not-applicable: no study',
    independent_validation: 'None; availability only',
    clinical_utility: 'not-assessed',
    access_level: 'artifact-only',
    funding: 'Synthetic fixture',
    conflicts_of_interest: 'Synthetic first party',
    corrections_retractions: 'Synthetic fixture; no real source',
    contradictory_findings: [],
    limitations: ['No clinical claim or real tool is represented.'],
    applicability: 'Test fixture only',
  };
  const candidate = {
    id,
    decision: 'selected',
    title: 'Synthetic availability fixture',
    desk: 'biomedical-foundations',
    topics: ['research-tools'],
    entities: [],
    event_date: '2026-10-18',
    event_date_reason: 'Synthetic date',
    source_publication_date: '2026-10-18',
    source_date_reason: 'Synthetic date',
    discovered_at: now,
    what_changed: 'Synthetic artifact availability',
    why_now: 'A validator fixture',
    late_discovery: false,
    primary_source_url: source.url,
    sources: [source],
    underlying_identity: {
      event_key: 'synthetic-availability',
      doi: null,
      pmid: null,
      preprint: null,
      trial: null,
      cohort: null,
      product_version: 'synthetic-v1',
      regulatory_record: null,
    },
    scope_fit: {
      in_scope: true,
      ai_connection: 'Synthetic biomedical research tool',
      non_ai_exception: null,
      reader_consequence: 'Synthetic inspection consequence',
    },
    deduplication: {
      status: 'new',
      previous_candidate_ids: [],
      previous_story_ids: [],
      material_delta: null,
      archive_coverage: 'Synthetic empty archive',
      publication_status: 'new-confirmed',
    },
    reason: 'Synthetic selection to exercise gates',
    promote_when: [],
    next_review_at: null,
    format: 'briefing',
    depth: 'general',
    evidence,
    claims: [
      {
        id: 'availability',
        type: 'availability',
        supported_statement: 'Synthetic fixture represents availability only.',
        source_ids: ['source'],
        locators: ['Synthetic release record'],
        evidence_scope: 'No actual finding',
        limitations: ['Synthetic only'],
        verification: verified,
        availability: {
          version: 'synthetic-v1',
          artifact_source_id: 'source',
          intended_users: 'Synthetic researchers',
          access: 'Synthetic',
          license: 'Synthetic',
          limitations: 'No real artifact',
        },
      },
    ],
    editorial_score: {
      significance: 4,
      claim_support: 4,
      relevance: 4,
      material_change: 4,
      durability: 4,
      weighted_total: 100,
      rationales: {
        significance: 'Synthetic test input',
        claim_support: 'Synthetic test input',
        relevance: 'Synthetic test input',
        material_change: 'Synthetic test input',
        durability: 'Synthetic test input',
      },
    },
    publication_verification: verified,
    decision_history: [{ decision: 'selected', at: now, reason: 'Synthetic initial decision' }],
  };
  const ledger = {
    schema_version: 'healthtech-1.0',
    decision_engine_version: 'healthtech-1.0',
    editorial_date: '2026-10-18',
    timezone: 'Europe/Luxembourg',
    contract_ref: 'a'.repeat(40),
    kind: 'daily',
    research: {
      window_start: now,
      window_end: now,
      last_completed_cutoff: null,
      query_log: [
        {
          query: 'Synthetic test',
          source: 'Synthetic fixture',
          accessed_at: now,
          outcome: 'Synthetic test',
        },
      ],
      coverage_gaps: ['Synthetic test only'],
      completed_at: now,
    },
    candidates: [candidate],
    watchlist: [],
    exclusions: [],
    publication: {
      mode: 'publication',
      reason: 'Synthetic fixture',
      story_ids: [id],
      withheld_selected: [],
      must_know_story_id: null,
      issue_path: 'src/content/pulse/2026-10-18.md',
      checks: [],
    },
    attempts: [
      {
        run_id: 'synthetic',
        started_at: now,
        completed_at: now,
        phases: ['synthetic'],
        outcome: 'Synthetic fixture',
      },
    ],
    active_run: null,
    human_overrides: [],
  };
  const story = {
    title: candidate.title,
    description: 'Synthetic fixture for isolated tests.',
    date: '2026-10-18',
    draft: false,
    category: candidate.desk,
    tags: candidate.topics,
    type: candidate.format,
    depth: candidate.depth,
    candidateId: id,
    editorialDate: '2026-10-18',
    contractVersion: 'healthtech-1.0',
    evidence,
    claims: ['availability'],
    sources: [{ id: 'source', label: 'Synthetic fixture', url: source.url }],
    illustration: { mode: 'none' },
    corrections: [],
  };
  // Check fixture shape at the boundary, while preserving the frontmatter date string.
  // Tests deliberately mutate the returned data into invalid validator inputs.
  ledgerSchema.parse(ledger);
  storySchema.parse(story);
  return structuredClone({ ledger, candidate, story }) as {
    ledger: SyntheticLedger;
    candidate: SyntheticCandidate;
    story: SyntheticStory;
  };
}
