import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { stringify } from 'yaml';
import sharp from 'sharp';
import { fixture, vocabulary, now } from './helpers/fixtures.ts';
import { editionKey, newestEditionFirst } from '../src/lib/edition.ts';
import { validateLedger, checkEditorial } from '../scripts/lib/editorial.ts';
import {
  sha256,
  buildGenerationIdentity,
} from '../scripts/lib/illustration-generation-identity.ts';

const authorization = {
  actor: 'Synthetic test actor, not a real approval',
  recorded_at: now,
  reason: 'Isolated regression fixture only',
  scope: '2026-10-24-evening' as const,
};

function batch(evening = false) {
  const key = evening ? '2026-10-24-evening' : '2026-10-24';
  const f = JSON.parse(
    JSON.stringify(fixture())
      .replaceAll('2026-10-18-synthetic-tool', `${key}-synthetic-tool`)
      .replaceAll('2026-10-18', '2026-10-24'),
  ) as ReturnType<typeof fixture>;
  f.ledger.publication.issue_path = `src/content/pulse/${key}.md`;
  if (evening) {
    f.ledger.edition = 'evening';
    f.story.edition = 'evening';
    f.ledger.edition_authorization = structuredClone(authorization);
  }
  const c = f.ledger.candidates[0];
  c.primary_source_url = `https://example.invalid/${key}`;
  c.sources[0].url = c.primary_source_url;
  c.sources[0].canonical_url = c.primary_source_url;
  c.underlying_identity.event_key = key;
  c.underlying_identity.product_version = key;
  f.story.sources[0].url = c.primary_source_url;
  return f;
}

test('legacy identity is unchanged; only the explicitly scoped date supports evening', () => {
  assert.equal(editionKey('2026-10-24'), '2026-10-24');
  assert.equal(editionKey('2026-10-24', 'evening'), '2026-10-24-evening');
  assert.throws(() => editionKey('2026-10-25', 'evening'), /authorised only/);
  assert.throws(() => editionKey('2026-02-30'), /Invalid editorial date/);
  assert.doesNotThrow(() => validateLedger(fixture().ledger, vocabulary));
});

test('evening requires authorisation and retains score, prefix and two-story gates', () => {
  const { ledger } = batch(true);
  assert.doesNotThrow(() => validateLedger(ledger, vocabulary));
  delete ledger.edition_authorization;
  assert.throws(() => validateLedger(ledger, vocabulary), /authorisation/);
  ledger.edition_authorization = authorization;
  ledger.candidates[0].id = '2026-10-24-morning-item';
  assert.throws(() => validateLedger(ledger, vocabulary), /wrong editorial date/);
  const valid = batch(true).ledger;
  valid.publication.story_ids.push('2026-10-24-evening-second', '2026-10-24-evening-third');
  assert.throws(() => validateLedger(valid, vocabulary), /Pilot capacity exceeded/);
  const low = batch(true).ledger;
  low.candidates[0].editorial_score!.weighted_total = 74;
  assert.throws(() => validateLedger(low, vocabulary), /arithmetic|selection gate/);
  const ordinary = batch().ledger;
  ordinary.edition_authorization = authorization;
  assert.throws(() => validateLedger(ordinary, vocabulary), /authorisation/);
});

test('ordering prefers evening only within its real calendar date', () => {
  const ordinary = { data: { date: new Date('2026-10-24') } };
  const evening = { data: { date: new Date('2026-10-24'), edition: 'evening' as const } };
  const tomorrow = { data: { date: new Date('2026-10-25') } };
  assert.deepEqual([ordinary, tomorrow, evening].sort(newestEditionFirst), [
    tomorrow,
    evening,
    ordinary,
  ]);
});

test('ordinary and evening issue/story/ledger mappings coexist without cross-edition leakage', async () => {
  const root = mkdtempSync(join(tmpdir(), 'healthtech-evening-'));
  try {
    for (const dir of [
      'src/content/stories',
      'src/content/pulse',
      'docs/editorial/ledgers',
      'docs/editorial/illustrations/briefs',
      'docs/editorial/illustrations/reviews',
      'public/images/stories',
    ])
      mkdirSync(join(root, dir), { recursive: true });
    const policy = 'Synthetic policy for isolated fixtures only.\n';
    writeFileSync(join(root, 'docs/EDITORIAL.md'), policy);
    writeFileSync(
      join(root, 'docs/editorial/TOPICS_V1.yml'),
      stringify({ topics: { 'research-tools': 'Synthetic' } }),
    );
    for (const evening of [false, true]) {
      const { ledger, story } = batch(evening);
      const key = editionKey(ledger.editorial_date, ledger.edition);
      const id = story.candidateId;
      const briefPath = `docs/editorial/illustrations/briefs/${id}.json`;
      const reviewPath = `docs/editorial/illustrations/reviews/${id}.json`;
      const pixels = await sharp({
        create: { width: 16, height: 16, channels: 3, background: '#FFFFFF' },
      })
        .webp()
        .toBuffer();
      story.illustration = {
        mode: 'generated',
        image: `/images/stories/${id}.webp`,
        alt: 'Synthetic white test pixels',
        width: 16,
        height: 16,
        reviewPath,
      };
      const source = `---\n${stringify(story)}---\nSynthetic isolated regression, not editorial output.\n`;
      const brief = JSON.stringify({
        story_id: id,
        verified_context: 'Synthetic only',
        visual_idea: 'Synthetic white pixels',
        placement: 'article-hero',
        crop: 'wide',
      });
      const identity = buildGenerationIdentity({
        story_id: id,
        story_source_sha256: sha256(source),
        brief_sha256: sha256(brief),
        policy_sha256: sha256(policy),
        version: 'healthtech-1.0',
        candidate_count: 1,
        generator: 'synthetic-fixture',
        model_snapshot: null,
      });
      const review = {
        ...identity,
        brief_path: briefPath,
        asset_sha256: sha256(pixels),
        crop: 'wide',
        reviewed_by: 'Synthetic fixture, no approval',
        reviewed_at: now,
        review_type: 'model',
        unsupported_medical_implication: false,
        crop_passed: true,
      };
      writeFileSync(join(root, `src/content/stories/${id}.md`), source);
      writeFileSync(join(root, `public/images/stories/${id}.webp`), pixels);
      writeFileSync(join(root, briefPath), brief);
      writeFileSync(join(root, reviewPath), JSON.stringify(review));
      writeFileSync(join(root, `docs/editorial/ledgers/${key}.json`), JSON.stringify(ledger));
      writeFileSync(
        join(root, `src/content/pulse/${key}.md`),
        `---\n${stringify({ date: ledger.editorial_date, ...(evening ? { edition: 'evening' } : {}), title: 'Synthetic', summary: 'Synthetic', sections: [{ key: 'tools', label: 'Synthetic', stories: [id] }] })}---\n`,
      );
    }
    const morningPath = join(root, 'docs/editorial/ledgers/2026-10-24.json');
    const morningBytes = readFileSync(morningPath);
    assert.deepEqual(checkEditorial(root), { ledgers: 2, stories: 2 });
    assert.deepEqual(readFileSync(morningPath), morningBytes);
    const eveningPath = join(root, 'docs/editorial/ledgers/2026-10-24-evening.json');
    const eveningBytes = readFileSync(eveningPath, 'utf8');
    const duplicate = JSON.parse(eveningBytes);
    duplicate.candidates[0].primary_source_url = 'https://example.invalid/2026-10-24';
    duplicate.candidates[0].sources[0].url = 'https://example.invalid/2026-10-24';
    writeFileSync(eveningPath, JSON.stringify(duplicate));
    assert.throws(() => checkEditorial(root), /already covered/);
    writeFileSync(eveningPath, eveningBytes);
    const ordinary = JSON.parse(morningBytes.toString());
    ordinary.publication.mode = 'in-progress';
    writeFileSync(morningPath, JSON.stringify(ordinary));
    assert.throws(
      () => checkEditorial(root, undefined, { allowInProgress: true }),
      /finalized ordinary/,
    );
    writeFileSync(morningPath, morningBytes);
    const issuePath = join(root, 'src/content/pulse/2026-10-24-evening.md');
    const issue = readFileSync(issuePath, 'utf8');
    writeFileSync(
      issuePath,
      issue.replace('2026-10-24-evening-synthetic-tool', '2026-10-24-synthetic-tool'),
    );
    assert.throws(() => checkEditorial(root), /issue\/ledger mapping mismatch/);
    writeFileSync(issuePath, issue.replace('edition: evening\n', ''));
    assert.throws(() => checkEditorial(root), /date must match filename/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
