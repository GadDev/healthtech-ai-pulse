import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync, cpSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { readIllustrationBrief } from '../scripts/lib/illustration-brief.ts';
import { resolveIllustrationGeneration } from '../scripts/resolve-illustration-generation.ts';

test('exact published inputs retain provenance; altered renderer/source/asset/brief/review cannot use the exception', () => {
  const root = mkdtempSync(join(tmpdir(), 'healthtech-preserved-references-'));
  const id = '2026-10-24-head-ct-ai-advice-reliance';
  const briefPath = `docs/editorial/illustrations/briefs/${id}.json`;
  const original = JSON.parse(readFileSync(briefPath, 'utf8'));
  const renderer = 'src/pages/stories/[...id].astro';
  const inputs = [
    briefPath,
    `docs/editorial/illustrations/reviews/${id}.json`,
    `src/content/stories/${id}.md`,
    `public/images/stories/${id}.webp`,
    'docs/EDITORIAL.md',
    ...original.references.map((r: { path: string }) => r.path),
  ];
  try {
    for (const path of inputs) {
      mkdirSync(dirname(join(root, path)), { recursive: true });
      cpSync(path, join(root, path));
    }
    const readBrief = () => readIllustrationBrief(root, briefPath, id);
    assert.doesNotThrow(readBrief);
    const decision = () =>
      resolveIllustrationGeneration(root, {
        storyId: id,
        briefPath,
        generatorSurface: 'image_gen.imagegen',
        candidateCount: 1,
      });
    assert.equal(decision().decision, 'REUSE');
    for (const path of [
      renderer,
      briefPath,
      `docs/editorial/illustrations/reviews/${id}.json`,
      `src/content/stories/${id}.md`,
      `public/images/stories/${id}.webp`,
    ]) {
      const bytes = readFileSync(join(root, path));
      writeFileSync(join(root, path), Buffer.concat([bytes, Buffer.from(' ')]));
      assert.throws(readBrief, /Reference changed/);
      writeFileSync(join(root, path), bytes);
      assert.doesNotThrow(readBrief);
    }
    const constitution = 'docs/editorial/VISUAL_CONSTITUTION_V1.md';
    writeFileSync(join(root, constitution), 'Changed constitution');
    assert.throws(readBrief, /Reference changed/);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
