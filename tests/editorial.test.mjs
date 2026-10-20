import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { stringify } from 'yaml';
import { fixture, vocabulary } from './helpers/fixtures.mjs';
import { validateLedger, checkEditorial, validateIllustration } from '../scripts/lib/editorial.ts';
import { weightedScore } from '../src/lib/editorial-schema.ts';

test('bounded availability can pass without a patient-benefit claim', () =>
  assert.equal(validateLedger(fixture().ledger, vocabulary).candidates.length, 1));
test('pilot capacity allows selected overflow only with explicit withholding', () => {
  const { ledger, candidate } = fixture();
  ledger.candidates = ['first', 'second', 'third'].map((suffix) => ({
    ...structuredClone(candidate),
    id: `2026-10-18-synthetic-${suffix}`,
  }));
  ledger.publication.story_ids = ledger.candidates.map((c) => c.id);
  assert.throws(() => validateLedger(ledger, vocabulary), /Pilot capacity exceeded/);
  const overflow = ledger.publication.story_ids.pop();
  ledger.publication.withheld_selected = [
    {
      id: overflow,
      phase: 'capacity',
      reason: 'Two stronger stories fill the pilot capacity',
      retry_condition: 'Reconsider under the next eligible edition with current verification',
    },
  ];
  assert.equal(validateLedger(ledger, vocabulary).candidates.length, 3);
  ledger.publication.withheld_selected = [];
  assert.throws(() => validateLedger(ledger, vocabulary), /not accounted for/);
});
test('scoring matches published examples and rejects tampered totals', () => {
  const { ledger, candidate } = fixture();
  candidate.editorial_score.significance = 3;
  assert.equal(weightedScore(candidate.editorial_score), 92.5);
  ledger.candidates = [candidate];
  assert.throws(() => validateLedger(ledger, vocabulary), /arithmetic/);
});
test('selected record cannot silently become a watch bucket or duplicate', () => {
  const { ledger } = fixture();
  ledger.watchlist.push(structuredClone(ledger.candidates[0]));
  assert.throws(() => validateLedger(ledger, vocabulary), /bucket|duplicate/);
});
test('publication withholding preserves research selection and allows ledger-only', () => {
  const { ledger } = fixture();
  const c = ledger.candidates[0];
  c.publication_verification.status = 'conflict';
  ledger.publication = {
    mode: 'ledger-only',
    reason: 'Conflicting primary evidence',
    story_ids: [],
    withheld_selected: [
      { id: c.id, reason: 'conflict', phase: 'verify', retry_condition: 'Resolve conflict' },
    ],
    must_know_story_id: null,
    issue_path: null,
    checks: [],
  };
  assert.equal(validateLedger(ledger, vocabulary).candidates[0].decision, 'selected');
  ledger.publication.withheld_selected = [];
  assert.throws(() => validateLedger(ledger, vocabulary), /accounted/);
});
test('watch needs a concrete promotion condition and cannot leak into publication', () => {
  const { ledger } = fixture();
  const c = ledger.candidates.pop();
  c.decision = 'watch';
  ledger.watchlist = [c];
  assert.throws(() => validateLedger(ledger, vocabulary), /promotion/);
  c.promote_when = ['Inspect independent evidence'];
  c.next_review_at = '2026-10-25';
  assert.throws(() => validateLedger(ledger, vocabulary), /Only selected/);
});
test('unfinished watch is valid with a null score and actionable next inspection', () => {
  const { ledger, candidate } = fixture();
  ledger.candidates = [];
  ledger.watchlist = [
    {
      ...structuredClone(candidate),
      decision: 'watch',
      editorial_score: null,
      promote_when: ['Inspect versioned artifact and external evaluation'],
      next_review_at: '2026-10-25',
    },
  ];
  ledger.publication = {
    mode: 'ledger-only',
    reason: 'Artifact assessment unfinished',
    story_ids: [],
    withheld_selected: [],
    must_know_story_id: null,
    issue_path: null,
    checks: [],
  };
  assert.doesNotThrow(() => validateLedger(ledger, vocabulary));
  ledger.watchlist[0].promote_when = [];
  assert.throws(() => validateLedger(ledger, vocabulary), /promotion/);
});
test('uninspected source, unsupported topic and false MUST KNOW block publication', () => {
  for (const change of [
    (l) => (l.candidates[0].sources[0].inspected_at = null),
    (l) => (l.candidates[0].topics = ['unknown']),
    (l) => {
      l.candidates[0].editorial_score.significance = 3;
      l.candidates[0].editorial_score.weighted_total = 92.5;
      l.publication.must_know_story_id = l.candidates[0].id;
    },
  ]) {
    const { ledger } = fixture();
    change(ledger);
    assert.throws(() => validateLedger(ledger, vocabulary));
  }
});
test('medical claims require study design/results rather than a renamed announcement', () => {
  const { ledger } = fixture();
  ledger.candidates[0].claims[0].type = 'patient-benefit';
  assert.throws(() => validateLedger(ledger, vocabulary));
  ledger.candidates[0].claims[0].type = 'regulatory';
  assert.throws(() => validateLedger(ledger, vocabulary));
});
test('ledger-only with no selection has no issue or artificial MUST KNOW', () => {
  const { ledger } = fixture();
  ledger.candidates = [];
  ledger.publication = {
    ...ledger.publication,
    mode: 'ledger-only',
    story_ids: [],
    issue_path: null,
  };
  assert.doesNotThrow(() => validateLedger(ledger, vocabulary));
  ledger.publication.issue_path = 'src/content/pulse/2026-10-18.md';
  assert.throws(() => validateLedger(ledger, vocabulary), /Ledger-only/);
});
function tempPublication() {
  const root = mkdtempSync(join(tmpdir(), 'healthtech-editorial-'));
  for (const dir of [
    'src/content/stories',
    'src/content/pulse',
    'docs/editorial/ledgers',
    'docs/editorial/trials',
  ])
    mkdirSync(join(root, dir), { recursive: true });
  writeFileSync(
    join(root, 'docs/editorial/TOPICS_V1.yml'),
    stringify({ topics: { 'research-tools': 'Synthetic' } }),
  );
  const { ledger, story } = fixture();
  writeFileSync(join(root, 'docs/editorial/ledgers/2026-10-18.json'), JSON.stringify(ledger));
  writeFileSync(
    join(root, `src/content/stories/${story.candidateId}.md`),
    `---\n${stringify(story)}---\nSynthetic isolated test content.\n`,
  );
  writeFileSync(
    join(root, 'src/content/pulse/2026-10-18.md'),
    `---\n${stringify({ date: '2026-10-18', title: 'Synthetic', summary: 'Synthetic', sections: [{ key: 'tools', label: 'Tools', stories: [story.candidateId] }] })}---\n`,
  );
  return root;
}
test('cross-file gate checks evidence, exclusions and every dated ledger', () => {
  const root = tempPublication();
  try {
    assert.equal(checkEditorial(root).stories, 1);
    const p = join(root, 'docs/editorial/ledgers/2026-10-18.json');
    const ledger = JSON.parse(readFileSync(p, 'utf8'));
    ledger.candidates[0].evidence.clinical_utility = 'uncertain';
    writeFileSync(p, JSON.stringify(ledger));
    assert.throws(() => checkEditorial(root), /mapping mismatch/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
test('a second record for the same underlying development needs a material delta', () => {
  const root = tempPublication();
  try {
    const p = join(root, 'docs/editorial/ledgers/2026-10-18.json');
    const ledger = JSON.parse(readFileSync(p, 'utf8'));
    const text = JSON.stringify(ledger).replaceAll('2026-10-18', '2026-10-19');
    writeFileSync(join(root, 'docs/editorial/ledgers/2026-10-19.json'), text);
    assert.throws(() => checkEditorial(root), /already covered/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
test('declared generated image cannot silently pass without asset/review', () => {
  const { story } = fixture();
  story.illustration = {
    mode: 'generated',
    image: '/images/stories/synthetic.webp',
    alt: 'Synthetic metaphor',
    reviewPath: 'docs/editorial/illustrations/reviews/synthetic.json',
  };
  assert.throws(() =>
    validateIllustration(
      '/missing-root',
      { id: story.candidateId, data: story },
      Buffer.from('Synthetic'),
    ),
  );
});

test('an explicit ledger is checked and unrelated JSON is never reported as validated', () => {
  const root = tempPublication();
  try {
    assert.equal(checkEditorial(root, 'docs/editorial/ledgers/2026-10-18.json').ledgers, 1);
    writeFileSync(join(root, 'unrelated.json'), '{invalid');
    assert.throws(() => checkEditorial(root, 'unrelated.json'), /dated ledger directory/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
