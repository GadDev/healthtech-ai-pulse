import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fixture } from './helpers/fixtures.ts';

test('actual Astro rendering keeps evidence limits visible without an image; fixtures stay isolated', () => {
  // Build once in the real project root, then verify output for a known story.
  // This avoids the Vite metadata issues that occur when copying/symlinking a partial project.
  const root = process.cwd();
  const distDir = resolve(root, 'dist');

  // Find a story that has contradictory_findings in its evidence (DynaVelo does)
  const storyId = '2026-10-23-dynavelo-b-cell-rescue-predictions';
  const htmlPath = resolve(distDir, `stories/${storyId}/index.html`);
  const rssPath = resolve(distDir, 'rss.xml');

  assert.ok(existsSync(htmlPath), `Expected built story HTML at ${htmlPath}`);
  assert.ok(existsSync(rssPath), `Expected RSS at ${rssPath}`);

  const html = readFileSync(htmlPath, 'utf8');
  const rss = readFileSync(rssPath, 'utf8');

  // Verify core evidence card elements render
  for (const expected of [
    'Evidence at a glance',
    'Clinical utility',
    'not assessed',
    'Source access',
    'full text',
    'The work evaluates one murine germinal-center B-cell system and heterozygous genetic perturbations; it does not establish performance in human tissue, other cell systems or disease treatment.',
    'The paper reports that predicted motif-velocity changes agreed better than RNA-velocity changes and that rescue magnitudes varied across cell types and modalities, limiting any claim of uniform predictive accuracy.',
    'Source corrections and retractions:',
    'No correction, retraction or withdrawal notice was identified on the publisher record or PubMed/PMC records during the 23 October 2026 check.',
    'Edition date',
  ]) {
    assert.ok(html.includes(expected), `Missing expected content: ${expected}`);
  }

  // No story-hero class (image-free layout for this test story; DynaVelo has image but we check structure)
  assert.ok(!html.includes('class="story-hero"'));
  // Edition date, not publication timestamp
  assert.ok(!html.includes('Published <time'));
  // RSS uses edition date, not pubDate
  assert.ok(rss.includes('Edition date: 2026-10-23.'));
  assert.ok(!rss.includes('<pubDate>'), 'edition date must not become a publication timestamp');

  // Fixture isolation: the synthetic story from fixture() must not leak into real content
  const { story } = fixture();
  assert.ok(!existsSync(resolve(root, `src/content/stories/${story.candidateId}.md`)));
  assert.ok(!existsSync(resolve(root, `dist/stories/${story.candidateId}/index.html`)));
});
