import test from 'node:test';
import assert from 'node:assert/strict';
import { cpSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { documents } from '../scripts/lib/content.ts';
import { validateIllustration } from '../scripts/lib/editorial.ts';
import { readIllustrationBrief } from '../scripts/lib/illustration-brief.ts';
import {
  sha256,
  buildGenerationIdentity,
} from '../scripts/lib/illustration-generation-identity.ts';
import { storySchema, reviewSchema } from '../src/lib/editorial-schema.ts';

test('sidebar removal preserves exact existing artwork records and rejects further drift', (t) => {
  const root = mkdtempSync(join(tmpdir(), 'healthtech-sidebar-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  for (const path of ['src', 'public', 'docs', '.agents'])
    cpSync(path, join(root, path), { recursive: true });
  const stories = documents(join(root, 'src/content/stories'));
  for (const document of stories) {
    const story = { id: document.id, data: storySchema.parse(document.data) };
    const source = readFileSync(join(root, `src/content/stories/${story.id}.md`));
    assert.doesNotThrow(() => validateIllustration(root, story, source), story.id);
  }

  const document = stories.find(({ id }) => id === '2026-10-24-head-ct-ai-advice-reliance')!;
  const story = { id: document.id, data: storySchema.parse(document.data) };
  assert.ok(story.data.illustration.mode === 'generated');
  const source = readFileSync(join(root, `src/content/stories/${story.id}.md`));
  const validate = () => validateIllustration(root, story, source);
  const reviewPath = join(root, story.data.illustration.reviewPath!);
  const reviewBytes = readFileSync(reviewPath);
  const review = reviewSchema.parse(JSON.parse(reviewBytes.toString()));
  const briefPath = join(root, review.brief_path!);

  // New generation decisions still require current reference bytes.
  assert.throws(
    () => readIllustrationBrief(root, review.brief_path!, story.id),
    /Reference changed/,
  );
  const tamper = (path: string, bytes: string | Buffer, error: RegExp) => {
    const original = readFileSync(path);
    try {
      writeFileSync(path, bytes);
      assert.throws(validate, error);
    } finally {
      writeFileSync(path, original);
    }
  };
  for (const path of [
    'src/pages/stories/[...id].astro',
    'src/styles/publication.css',
    'docs/editorial/VISUAL_CONSTITUTION_V1.md',
    'src/components/IllustrationCaption.astro',
  ])
    tamper(join(root, path), `${readFileSync(join(root, path), 'utf8')}\n`, /Reference changed/);
  tamper(reviewPath, `${reviewBytes.toString()}\n`, /Reference changed/);
  tamper(join(root, 'docs/EDITORIAL.md'), 'Changed policy', /illustration policy changed/);
  assert.throws(
    () => validateIllustration(root, story, Buffer.concat([source, Buffer.from('\n')])),
    /stale illustration/,
  );
  tamper(
    join(root, `public${story.data.illustration.image}`),
    Buffer.from('RIFFxxxxWEBPxxxx'),
    /stale illustration/,
  );

  // Even updating the brief hash and generation key cannot extend the exception.
  const originalBrief = readFileSync(briefPath);
  const changedBrief = Buffer.concat([originalBrief, Buffer.from('\n')]);
  try {
    writeFileSync(briefPath, changedBrief);
    const changedReview = {
      ...review,
      ...buildGenerationIdentity({ ...review, brief_sha256: sha256(changedBrief) }),
    };
    tamper(reviewPath, JSON.stringify(changedReview), /Reference changed/);
  } finally {
    writeFileSync(briefPath, originalBrief);
  }
  assert.doesNotThrow(validate);
});
