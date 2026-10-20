import test from 'node:test';
import assert from 'node:assert/strict';
import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
  rmSync,
  symlinkSync,
  existsSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { stringify } from 'yaml';
import { fixture } from './helpers/fixtures.mjs';
import {
  buildGenerationIdentity,
  resolveRepositoryPath,
  sha256,
} from '../scripts/lib/illustration-generation-identity.ts';
import {
  resolveIllustrationGeneration,
  parseGenerationArguments,
} from '../scripts/resolve-illustration-generation.mjs';
import { validateIllustration } from '../scripts/lib/editorial.mjs';
import {
  parseContactSheetArguments,
  buildContactSheetHtml,
} from '../scripts/build-illustration-contact-sheet.mjs';

function setup(t, mode = 'generated') {
  const root = mkdtempSync(join(tmpdir(), 'healthtech-generation-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const dir of [
    'src/content/stories',
    'docs/editorial/illustrations/reviews',
    'public/images/stories',
  ])
    mkdirSync(join(root, dir), { recursive: true });
  const { story } = fixture();
  const id = story.candidateId;
  story.illustration =
    mode === 'none'
      ? { mode: 'none' }
      : {
          mode: 'generated',
          image: `/images/stories/${id}.webp`,
          alt: 'Synthetic metaphor',
          reviewPath: `docs/editorial/illustrations/reviews/${id}.json`,
        };
  const sourcePath = join(root, `src/content/stories/${id}.md`);
  const source = `---\n${stringify(story)}---\nSynthetic isolated fixture, not a scientific finding.\n`;
  writeFileSync(sourcePath, source);
  writeFileSync(
    join(root, 'docs/EDITORIAL.md'),
    'Synthetic policy fixture, not production policy.',
  );
  const brief = {
    story_id: id,
    verified_context: 'Synthetic fixture only. No medical claim.',
    visual_idea: 'One abstract form',
    placement: 'article-hero',
    crop: 'wide',
  };
  const briefPath = join(root, 'brief.json');
  writeFileSync(briefPath, JSON.stringify(brief));
  const options = { storyId: id, briefPath: 'brief.json', generatorSurface: 'synthetic-generator' };
  return { root, id, story, sourcePath, source, brief, briefPath, options };
}
function persist(f) {
  const identity = resolveIllustrationGeneration(f.root, f.options).expected_identity;
  // Isolated RIFF/WEBP container-header fixture; not generated or published artwork.
  const image = Buffer.from('RIFF0000WEBP');
  const review = {
    ...identity,
    asset_sha256: sha256(image),
    crop: 'wide',
    reviewed_by: 'Synthetic fixture, not approval',
    reviewed_at: new Date().toISOString(),
    review_type: 'model',
    unsupported_medical_implication: false,
    crop_passed: true,
  };
  const assetPath = join(f.root, `public${f.story.illustration.image}`);
  const reviewPath = join(f.root, f.story.illustration.reviewPath);
  writeFileSync(assetPath, image);
  writeFileSync(reviewPath, JSON.stringify(review));
  return { identity, review, image, assetPath, reviewPath };
}

test('one identity formula stays compatible with existing healthtech-1.0 reviews', (t) => {
  const f = setup(t);
  const { identity } = persist(f);
  assert.equal(
    identity.generation_key,
    sha256(
      JSON.stringify([
        f.id,
        sha256(f.source),
        sha256(readFileSync(f.briefPath)),
        sha256(readFileSync(join(f.root, 'docs/EDITORIAL.md'))),
        'healthtech-1.0',
        1,
        'synthetic-generator',
        null,
      ]),
    ),
  );
  assert.equal(buildGenerationIdentity(identity).generation_key, identity.generation_key);
  assert.doesNotThrow(() =>
    validateIllustration(f.root, { id: f.id, data: f.story }, Buffer.from(f.source)),
  );
});
test('optional none requires neither a brief, generator, review nor asset', (t) => {
  const f = setup(t, 'none');
  rmSync(f.briefPath);
  assert.equal(resolveIllustrationGeneration(f.root, { storyId: f.id }).decision, 'NONE');
});
test('new generation is a read-only decision, not a fabricated review', (t) => {
  const f = setup(t);
  assert.equal(resolveIllustrationGeneration(f.root, f.options).reason, 'review-missing');
  assert.equal(existsSync(join(f.root, f.story.illustration.reviewPath)), false);
});
test('matching generation and reviewed bytes are reused across retries', (t) => {
  const f = setup(t);
  persist(f);
  assert.equal(resolveIllustrationGeneration(f.root, f.options).decision, 'REUSE');
  assert.deepEqual(
    resolveIllustrationGeneration(f.root, f.options),
    resolveIllustrationGeneration(f.root, f.options),
  );
});
for (const [name, change] of [
  ['source bytes', (f) => writeFileSync(f.sourcePath, f.source + '\n')],
  ['brief bytes', (f) => writeFileSync(f.briefPath, JSON.stringify(f.brief, null, 2))],
  [
    'policy bytes',
    (f) => writeFileSync(join(f.root, 'docs/EDITORIAL.md'), 'Changed synthetic policy'),
  ],
  ['generator', (f) => (f.options.generatorSurface = 'another-generator')],
  ['candidate count', (f) => (f.options.candidateCount = 2)],
  ['model snapshot', (f) => (f.options.modelSnapshot = 'reported-test-snapshot')],
  ['crop', (f) => writeFileSync(f.briefPath, JSON.stringify({ ...f.brief, crop: 'square' }))],
])
  test(`changed ${name} cannot reuse the old generation`, (t) => {
    const f = setup(t);
    persist(f);
    change(f);
    const result = resolveIllustrationGeneration(f.root, f.options);
    assert.equal(result.decision, 'GENERATE');
    assert.equal(result.reason, 'generation-inputs-changed');
  });
for (const [name, change, reason] of [
  ['missing asset', (r) => rmSync(r.assetPath), 'asset-missing'],
  [
    'altered asset',
    (r) => writeFileSync(r.assetPath, Buffer.from('RIFF1111WEBP')),
    'asset-bytes-changed',
  ],
])
  test(`${name} is not reusable`, (t) => {
    const f = setup(t);
    const r = persist(f);
    change(r);
    assert.equal(resolveIllustrationGeneration(f.root, f.options).reason, reason);
  });
for (const [name, change] of [
  ['malformed review', (r) => writeFileSync(r.reviewPath, '{')],
  [
    'forged identity',
    (r) =>
      writeFileSync(r.reviewPath, JSON.stringify({ ...r.review, generation_key: 'f'.repeat(64) })),
  ],
  [
    'foreign review',
    (r) =>
      writeFileSync(r.reviewPath, JSON.stringify({ ...r.review, story_id: '2026-10-18-foreign' })),
  ],
  [
    'unsupported version',
    (r) => writeFileSync(r.reviewPath, JSON.stringify({ ...r.review, version: '1.3' })),
  ],
  ['wrong file format', (r) => writeFileSync(r.assetPath, Buffer.from('not an image'))],
])
  test(`${name} blocks a trustworthy decision`, (t) => {
    const f = setup(t);
    const r = persist(f);
    change(r);
    assert.throws(() => resolveIllustrationGeneration(f.root, f.options));
  });
test('referenced bytes must match the fingerprint embedded in the brief', (t) => {
  const f = setup(t);
  const ref = join(f.root, 'reference.txt');
  writeFileSync(ref, 'Synthetic reference');
  f.brief.references = [{ path: 'reference.txt', sha256: sha256('Synthetic reference') }];
  writeFileSync(f.briefPath, JSON.stringify(f.brief));
  persist(f);
  assert.equal(resolveIllustrationGeneration(f.root, f.options).decision, 'REUSE');
  writeFileSync(ref, 'Changed reference');
  assert.throws(() => resolveIllustrationGeneration(f.root, f.options), /Reference changed/);
});
test('draft, mismatched and malformed brief inputs do not silently generate', (t) => {
  const f = setup(t);
  writeFileSync(f.briefPath, JSON.stringify({ ...f.brief, story_id: 'another-story' }));
  assert.throws(() => resolveIllustrationGeneration(f.root, f.options), /another story/);
  writeFileSync(f.briefPath, '{}');
  assert.throws(() => resolveIllustrationGeneration(f.root, f.options));
  writeFileSync(f.sourcePath, f.source.replace('draft: false', 'draft: true'));
  assert.throws(() => resolveIllustrationGeneration(f.root, f.options), /Finalize/);
});
test('path traversal, absolute paths and escaping symlinks are rejected', (t) => {
  const f = setup(t);
  assert.throws(() => resolveRepositoryPath(f.root, '../outside'));
  assert.throws(() => resolveRepositoryPath(f.root, '/etc/passwd'));
  symlinkSync(tmpdir(), join(f.root, 'escape'), 'dir');
  assert.throws(() => resolveRepositoryPath(f.root, 'escape/file-that-is-not-present'), /Symlink/);
  assert.throws(() => resolveIllustrationGeneration(f.root, { storyId: '../escape' }));
});
test('CLI reports decisions as JSON and uses a failing exit code for blocked input', (t) => {
  const f = setup(t);
  const path = resolve('scripts/resolve-illustration-generation.mjs');
  const call = (args) =>
    spawnSync(process.execPath, ['--no-warnings', path, ...args], {
      cwd: f.root,
      encoding: 'utf8',
    });
  const good = call([
    '--story',
    f.id,
    '--brief',
    'brief.json',
    '--generator-surface',
    'synthetic-generator',
    '--json',
  ]);
  assert.equal(good.status, 0, good.stderr);
  assert.equal(JSON.parse(good.stdout).decision, 'GENERATE');
  const bad = call(['--story', '../escape', '--json']);
  assert.equal(bad.status, 2);
  assert.equal(JSON.parse(bad.stderr).error, 'decision-blocked');
});
for (const args of [
  ['--candidate-count', '0'],
  ['--candidate-count', '1.5'],
  ['--candidate-count', '9007199254740992'],
  ['--story'],
  ['--unknown', 'x'],
  ['--story', 'x', '--story', 'y'],
])
  test(`reject bad generation arguments ${args.join(' ')}`, () =>
    assert.throws(() => parseGenerationArguments(args)));

test('contact sheet accepts one candidate without inventing golden references', (t) => {
  const f = setup(t);
  const image = join(f.root, 'candidate.png');
  writeFileSync(image, 'Synthetic image bytes');
  const options = parseContactSheetArguments([
    '--story',
    f.id,
    '--out',
    join(f.root, 'review.png'),
    image,
  ]);
  const html = buildContactSheetHtml(options);
  assert.match(html, /HealthTech AI Pulse/);
  assert.match(html, /No comparison references supplied/);
  assert.match(html, /C1/);
  assert.doesNotMatch(html, /Daily AI Pulse/);
  assert.match(html, /default-src 'none'/);
});
test('sheet escapes filename markup and preserves input/output ownership', (t) => {
  const f = setup(t);
  const image = join(f.root, '<img onerror=alert(1)>.png');
  writeFileSync(image, 'Synthetic image bytes');
  const options = parseContactSheetArguments([
    '--story',
    f.id,
    '--out',
    join(f.root, 'review.png'),
    '--crop',
    'square',
    image,
  ]);
  const html = buildContactSheetHtml(options);
  assert.match(html, /&lt;img onerror=alert\(1\)&gt;/);
  assert.doesNotMatch(html, /<img onerror/);
  assert.throws(
    () => parseContactSheetArguments(['--story', f.id, '--out', image, image]),
    /overwrite/,
  );
  assert.throws(
    () => parseContactSheetArguments(['--story', f.id, '--out', join(f.root, 'review.jpg'), image]),
    /PNG/,
  );
  assert.throws(
    () =>
      parseContactSheetArguments([
        '--story',
        f.id,
        '--out',
        join(f.root, 'review.png'),
        '--crop',
        'unknown',
        image,
      ]),
    /crop/,
  );
});