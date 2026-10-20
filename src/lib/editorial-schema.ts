import { z } from 'astro/zod';

const text = z.string().trim().min(1);
export const httpUrl = z.url({ protocol: /^https?$/ });
export const date = z.iso.date();
const instant = z.iso.datetime({ offset: true });
const sha = z.string().regex(/^[a-f0-9]{40}$/);
const hash = z.string().regex(/^[a-f0-9]{64}$/);
const id = z.string().regex(/^\d{4}-\d{2}-\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*$/);
export const deskKeys = [
  'clinical-ai',
  'health-systems',
  'pharma',
  'biomedical-foundations',
  'safety-policy',
] as const;
const access = z.enum([
  'full-text',
  'abstract-only',
  'registry-only',
  'official-record-only',
  'artifact-only',
  'announcement-only',
  'unavailable',
]);
const verificationStatus = z.enum([
  'not-started',
  'verified',
  'verified-with-claim-scope',
  'conflict',
  'source-unavailable',
]);
const verification = z
  .object({
    status: verificationStatus,
    checked_at: instant.nullable(),
    checked_by: text.nullable(),
    supported_scope: text,
    reason: text,
  })
  .strict();
export const evidenceSchema = z
  .object({
    publication_status: text,
    study_design: text,
    validation_setting: text,
    independent_validation: text,
    clinical_utility: z.enum([
      'not-assessed',
      'measured-no-demonstrated-benefit',
      'demonstrated-in-studied-setting',
      'uncertain',
      'not-applicable',
    ]),
    access_level: access,
    funding: text,
    conflicts_of_interest: text,
    corrections_retractions: text,
    contradictory_findings: z.array(text),
    limitations: z.array(text).min(1),
    applicability: text,
  })
  .strict();
const source = z
  .object({
    id: text,
    url: httpUrl,
    canonical_url: httpUrl,
    publisher: text,
    role: z.enum(['primary', 'supporting', 'independent', 'context']),
    source_type: text,
    publication_date: date.nullable(),
    date_reason: text,
    inspected_at: instant.nullable(),
    access_level: access,
    relationship_to_sponsor: text,
  })
  .strict();
const study = z
  .object({
    design: text,
    setting: text,
    population_or_dataset: text,
    sample_sizes: z
      .array(
        z.object({ n: z.number().int().positive().nullable(), unit: text, reason: text }).strict(),
      )
      .min(1),
    comparator: text,
    primary_endpoints: z.array(text).min(1),
    secondary_exploratory_endpoints: z.array(text),
    results: z
      .array(
        z
          .object({
            endpoint: text,
            metric: text,
            value: text,
            units: text,
            comparator: text,
            uncertainty: text,
            source_id: text,
            locator: text,
          })
          .strict(),
      )
      .min(1),
    follow_up: text,
    harms: text,
    analysis_notes: text,
    applicability: text,
  })
  .strict();
const regulation = z
  .object({
    authority: text,
    jurisdiction: text,
    document_id: text,
    official_source_id: text,
    exact_status: text,
    product_and_version: text,
    intended_use: text,
    population: text,
    decision_date: date.nullable(),
    publication_date: date.nullable(),
    effective_date: date.nullable(),
    unknown_dates_reason: text,
    restrictions: text,
  })
  .strict();
const claimBase = {
  id: text,
  supported_statement: text,
  source_ids: z.array(text).min(1),
  locators: z.array(text).min(1),
  evidence_scope: text,
  limitations: z.array(text).min(1),
  verification,
};
const studyClaim = <T extends string>(type: T) =>
  z.object({ ...claimBase, type: z.literal(type), study }).strict();
const claim = z.discriminatedUnion('type', [
  studyClaim('model-performance'),
  studyClaim('workflow'),
  studyClaim('patient-benefit'),
  studyClaim('patient-outcome'),
  studyClaim('pharma-progress'),
  z.object({ ...claimBase, type: z.literal('regulatory'), regulation }).strict(),
  z
    .object({
      ...claimBase,
      type: z.literal('availability'),
      availability: z
        .object({
          version: text,
          artifact_source_id: text,
          intended_users: text,
          access: text,
          license: text,
          limitations: text,
        })
        .strict(),
    })
    .strict(),
  z
    .object({
      ...claimBase,
      type: z.literal('safety'),
      safety: z
        .object({
          report_type: text,
          exposure_denominator: text,
          causality_limits: text,
          duplicate_assessment: text,
        })
        .strict(),
    })
    .strict(),
]);
const scoreInput = z.number().int().min(0).max(4);
const score = z
  .object({
    significance: scoreInput,
    claim_support: scoreInput,
    relevance: scoreInput,
    material_change: scoreInput,
    durability: scoreInput,
    weighted_total: z.number().min(0).max(100),
    rationales: z
      .object({
        significance: text,
        claim_support: text,
        relevance: text,
        material_change: text,
        durability: text,
      })
      .strict(),
  })
  .strict();
export const candidateSchema = z
  .object({
    id,
    decision: z.enum(['selected', 'watch', 'rejected']),
    title: text,
    desk: z.enum(deskKeys),
    topics: z.array(text).min(1),
    entities: z.array(text),
    event_date: date.nullable(),
    event_date_reason: text,
    source_publication_date: date.nullable(),
    source_date_reason: text,
    discovered_at: instant,
    what_changed: text,
    why_now: text,
    late_discovery: z.boolean(),
    primary_source_url: httpUrl,
    sources: z.array(source).min(1),
    underlying_identity: z
      .object({
        event_key: text,
        doi: text.nullable(),
        pmid: text.nullable(),
        preprint: text.nullable(),
        trial: text.nullable(),
        cohort: text.nullable(),
        product_version: text.nullable(),
        regulatory_record: text.nullable(),
      })
      .strict(),
    scope_fit: z
      .object({
        in_scope: z.boolean(),
        ai_connection: text,
        non_ai_exception: text.nullable(),
        reader_consequence: text,
      })
      .strict(),
    deduplication: z
      .object({
        status: z.enum(['new', 'material-update', 'repeat', 'uncertain']),
        previous_candidate_ids: z.array(text),
        previous_story_ids: z.array(text),
        material_delta: text.nullable(),
        archive_coverage: text,
        publication_status: z.enum([
          'not-started',
          'new-confirmed',
          'material-update-confirmed',
          'duplicate-conflict',
          'dedup-unverified',
        ]),
      })
      .strict(),
    reason: text,
    promote_when: z.array(text).default([]),
    next_review_at: date.nullable().default(null),
    format: z.enum(['pulse', 'briefing', 'deep-dive']).optional(),
    depth: z.enum(['general', 'specialist']).optional(),
    evidence: evidenceSchema.optional(),
    claims: z.array(claim).default([]),
    editorial_score: score.nullable(),
    publication_verification: verification,
    decision_history: z
      .array(
        z
          .object({
            decision: z.enum(['selected', 'watch', 'rejected']),
            at: instant,
            reason: text,
          })
          .strict(),
      )
      .min(1),
  })
  .strict();
export const illustrationSchema = z.discriminatedUnion('mode', [
  z.object({ mode: z.literal('none') }).strict(),
  z
    .object({
      mode: z.literal('generated'),
      image: z.string().regex(/^\/images\/stories\/[a-z0-9-]+\.webp$/),
      alt: text,
      reviewPath: z.string().regex(/^docs\/editorial\/illustrations\/reviews\/[a-z0-9-]+\.json$/),
    })
    .strict(),
]);
export const storySchema = z
  .object({
    title: text,
    description: text,
    date: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(true),
    category: z.enum(deskKeys),
    tags: z.array(text).min(1),
    type: z.enum(['pulse', 'briefing', 'deep-dive']),
    depth: z.enum(['general', 'specialist']),
    candidateId: id,
    editorialDate: z.preprocess(
      (value) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
      date,
    ),
    contractVersion: z.literal('healthtech-1.0'),
    evidence: evidenceSchema,
    claims: z.array(text).min(1),
    sources: z.array(z.object({ id: text, label: text, url: httpUrl }).strict()).min(1),
    illustration: illustrationSchema,
    corrections: z.array(z.object({ date: z.coerce.date(), note: text }).strict()).default([]),
  })
  .strict();
export const reviewSchema = z
  .object({
    version: z.literal('healthtech-1.0'),
    story_id: id,
    story_source_sha256: hash,
    brief_sha256: hash,
    policy_sha256: hash,
    generation_key: hash,
    candidate_count: z.number().int().positive(),
    generator: text,
    model_snapshot: text.nullable(),
    asset_sha256: hash,
    crop: z.enum(['wide', 'square', 'landscape']),
    reviewed_by: text,
    reviewed_at: instant,
    review_type: z.enum(['model', 'human']),
    unsupported_medical_implication: z.literal(false),
    crop_passed: z.literal(true),
  })
  .strict();
export const ledgerSchema = z
  .object({
    schema_version: z.literal('healthtech-1.0'),
    decision_engine_version: z.literal('healthtech-1.0'),
    editorial_date: date,
    timezone: z.literal('Europe/Luxembourg'),
    contract_ref: sha,
    kind: z.enum(['daily', 'controlled-trial']),
    research: z
      .object({
        window_start: instant,
        window_end: instant,
        last_completed_cutoff: instant.nullable(),
        query_log: z
          .array(
            z.object({ query: text, source: text, accessed_at: instant, outcome: text }).strict(),
          )
          .min(1),
        coverage_gaps: z.array(text),
        completed_at: instant.nullable(),
      })
      .strict(),
    candidates: z.array(candidateSchema),
    watchlist: z.array(candidateSchema),
    exclusions: z.array(candidateSchema),
    publication: z
      .object({
        mode: z.enum(['in-progress', 'publication', 'ledger-only']),
        reason: text,
        story_ids: z.array(id),
        withheld_selected: z.array(
          z.object({ id, reason: text, phase: text, retry_condition: text }).strict(),
        ),
        must_know_story_id: id.nullable(),
        issue_path: z.string().nullable(),
        checks: z.array(
          z
            .object({
              command: text,
              status: z.enum(['passed', 'failed', 'not-run']),
              tested_revision: text,
              execution: text,
              evidence: text,
            })
            .strict(),
        ),
      })
      .strict(),
    attempts: z
      .array(
        z
          .object({
            run_id: text,
            started_at: instant,
            completed_at: instant.nullable(),
            phases: z.array(text),
            outcome: text,
          })
          .strict(),
      )
      .min(1),
    active_run: z
      .object({
        owner_token: text,
        acquired_at: instant,
        heartbeat_at: instant,
        expires_at: instant,
      })
      .strict()
      .nullable(),
    human_overrides: z.array(
      z
        .object({
          candidate_id: id,
          actor: text,
          at: instant,
          previous_decision: z.enum(['selected', 'watch', 'rejected']),
          instruction: text,
          reason: text,
        })
        .strict(),
    ),
  })
  .strict();

export function weightedScore(s: {
  significance: number;
  claim_support: number;
  relevance: number;
  material_change: number;
  durability: number;
}) {
  // Integer weights avoid rounding artifacts; round half-up to one decimal.
  return (
    Math.round(
      (30 * s.significance +
        30 * s.claim_support +
        25 * s.relevance +
        10 * s.material_change +
        5 * s.durability) *
        2.5,
    ) / 10
  );
}
