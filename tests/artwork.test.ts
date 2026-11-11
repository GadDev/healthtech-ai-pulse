import test from 'node:test';
import assert from 'node:assert/strict';
import { fixture, vocabulary, now } from './helpers/fixtures.ts';
import { validateLedger } from '../scripts/lib/editorial.ts';
import { preserveArtwork } from '../scripts/lib/artwork.ts';

function progress() {
  const { ledger, story } = fixture();
  const capability = {
    status: 'available' as const,
    evidence: 'Synthetic observed tool call, not a real capability.',
  };
  ledger.artwork = {
    version: 'healthtech-artwork-1',
    runtime: 'Synthetic isolated test',
    checked_at: now,
    capabilities: {
      generation: capability,
      inspection: capability,
      conversion: capability,
      upload: capability,
    },
    stories: [
      {
        story_id: story.candidateId,
        stage: 'uploaded',
        brief_path: 'synthetic-brief.json',
        generation_key: 'a'.repeat(64),
        candidates: [{ output_id: 'synthetic-output', prompt_sha256: 'b'.repeat(64) }],
        review_path: 'synthetic-review.json',
        asset: {
          path: '/images/stories/synthetic.webp',
          sha256: 'c'.repeat(64),
          width: 16,
          height: 16,
          git_blob_sha: 'd'.repeat(40),
          read_back_revision: 'e'.repeat(40),
        },
        history: ['pending', 'generated', 'reviewed', 'uploaded'].map((stage) => ({
          stage: stage as 'pending' | 'generated' | 'reviewed' | 'uploaded',
          at: now,
          evidence: 'Synthetic stage observation.',
        })),
      },
    ],
  };
  return ledger;
}
test('stored historical ledgers remain valid; new complete artwork is explicit', () => {
  validateLedger(fixture().ledger, vocabulary);
  validateLedger(progress(), vocabulary);
});
for (const [name, change] of [
  [
    'unverified capability',
    (l: ReturnType<typeof progress>) => {
      l.artwork!.capabilities.upload.status = 'unverified';
    },
  ],
  [
    'missing read-back',
    (l: ReturnType<typeof progress>) => {
      delete l.artwork!.stories[0].asset!.read_back_revision;
    },
  ],
  [
    'missing generated output',
    (l: ReturnType<typeof progress>) => {
      l.artwork!.stories[0].candidates = [];
    },
  ],
  [
    'false stage history',
    (l: ReturnType<typeof progress>) => {
      l.artwork!.stories[0].history.pop();
    },
  ],
  [
    'missing published story',
    (l: ReturnType<typeof progress>) => {
      l.artwork!.stories = [];
    },
  ],
] as const)
  test(`publication rejects ${name}`, () => {
    const l = progress();
    change(l);
    assert.throws(() => validateLedger(l, vocabulary));
  });
test('blocked recovery preserves successful pixels and resumes at upload', () => {
  const old = progress();
  const story = old.artwork!.stories[0];
  story.stage = 'reviewed';
  story.history.pop();
  delete story.asset!.git_blob_sha;
  delete story.asset!.read_back_revision;
  const blocked = structuredClone(old);
  blocked.artwork!.stories[0].stage = 'blocked';
  blocked.artwork!.stories[0].blocker = {
    stage: 'uploaded',
    error: 'Synthetic binary write failure',
    next_action: 'Retry upload of existing reviewed bytes.',
  };
  blocked.artwork!.stories[0].history.push({
    stage: 'blocked',
    at: now,
    evidence: 'Synthetic upload failure.',
  });
  preserveArtwork(old, blocked);
  const resumed = structuredClone(blocked);
  resumed.artwork!.stories[0].stage = 'uploaded';
  delete resumed.artwork!.stories[0].blocker;
  Object.assign(resumed.artwork!.stories[0].asset!, {
    git_blob_sha: 'd'.repeat(40),
    read_back_revision: 'e'.repeat(40),
  });
  resumed.artwork!.stories[0].history.push({
    stage: 'uploaded',
    at: now,
    evidence: 'Synthetic verified read-back.',
  });
  preserveArtwork(blocked, resumed);
  validateLedger(resumed, vocabulary);
  const lost = structuredClone(blocked);
  lost.artwork!.stories[0].candidates = [];
  assert.throws(() => preserveArtwork(blocked, lost), /Preserve generated/);
  const changed = structuredClone(resumed);
  changed.artwork!.stories[0].asset!.sha256 = 'f'.repeat(64);
  assert.throws(() => preserveArtwork(blocked, changed), /Preserve reviewed bytes/);
});
