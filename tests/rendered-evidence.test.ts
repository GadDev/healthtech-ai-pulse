import test from 'node:test';
import assert from 'node:assert/strict';
import {
  mkdtempSync,
  cpSync,
  symlinkSync,
  writeFileSync,
  readFileSync,
  rmSync,
  existsSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';
import { stringify } from 'yaml';
import { fixture } from './helpers/fixtures.ts';

test('actual Astro rendering keeps evidence limits visible without an image; fixtures stay isolated', () => {
  const root = process.cwd();
  const temporary = mkdtempSync(join(tmpdir(), 'healthtech-render-'));
  try {
    for (const path of ['src', 'public', 'astro.config.mjs', 'package.json', 'tsconfig.json'])
      cpSync(resolve(root, path), join(temporary, path), { recursive: true });
    symlinkSync(resolve(root, 'node_modules'), join(temporary, 'node_modules'), 'dir');
    const { story } = fixture();
    story.evidence.contradictory_findings = [
      'Synthetic contradictory evidence remains unresolved.',
    ];
    writeFileSync(
      join(temporary, `src/content/stories/${story.candidateId}.md`),
      `---\n${stringify(story)}---\nSYNTHETIC TEST DATA. Isolated rendering fixture, not a scientific finding.\n`,
    );
    execFileSync(
      process.execPath,
      [resolve(root, 'node_modules/astro/bin/astro.mjs'), 'build', '--root', temporary],
      { cwd: temporary, stdio: 'pipe', env: { ...process.env, SITE_URL: 'http://localhost:4321' } },
    );
    const html = readFileSync(
      join(temporary, `dist/stories/${story.candidateId}/index.html`),
      'utf8',
    );
    for (const expected of [
      'Evidence at a glance',
      'Clinical utility',
      'not assessed',
      'Source access',
      'artifact only',
      'No clinical claim or real tool is represented.',
      'Synthetic contradictory evidence remains unresolved.',
      'Source corrections and retractions:',
      'Synthetic fixture; no real source',
      'Edition date',
    ])
      assert.ok(html.includes(expected), expected);
    assert.ok(!html.includes('class="story-hero"'));
    assert.ok(!html.includes('Published <time'));
    const rss = readFileSync(join(temporary, 'dist/rss.xml'), 'utf8');
    assert.ok(rss.includes('Edition date: 2026-10-18.'));
    assert.ok(!rss.includes('<pubDate>'), 'edition date must not become a publication timestamp');
    assert.ok(!existsSync(resolve(root, `src/content/stories/${story.candidateId}.md`)));
    assert.ok(!existsSync(resolve(root, `dist/stories/${story.candidateId}/index.html`)));
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});

test('evening fixture renders separately, labels its date and leads without replacing the ordinary issue', () => {
  const root = process.cwd();
  const temporary = mkdtempSync(join(tmpdir(), 'healthtech-evening-render-'));
  try {
    for (const path of ['src', 'public', 'astro.config.mjs', 'package.json', 'tsconfig.json'])
      cpSync(resolve(root, path), join(temporary, path), { recursive: true });
    symlinkSync(resolve(root, 'node_modules'), join(temporary, 'node_modules'), 'dir');
    const { story } = fixture();
    const id = '2026-10-24-evening-synthetic-rendering';
    story.candidateId = id;
    story.date = '2026-10-24';
    story.editorialDate = '2026-10-24';
    story.edition = 'evening';
    story.title = 'Synthetic evening rendering fixture';
    // Rendering only, not a publishable evidence/illustration fixture.
    writeFileSync(
      join(temporary, `src/content/stories/${id}.md`),
      `---\n${stringify(story)}---\nSYNTHETIC TEST DATA, temporary renderer test only.\n`,
    );
    writeFileSync(
      join(temporary, 'src/content/pulse/2026-10-24-evening.md'),
      `---\n${stringify({ date: '2026-10-24', edition: 'evening', title: 'Synthetic evening edition', summary: 'Rendering regression only', sections: [{ key: 'tools', label: 'Synthetic', stories: [id] }] })}---\n`,
    );
    const ordinaryPath = join(temporary, 'src/content/pulse/2026-10-24.md');
    const ordinary = readFileSync(ordinaryPath);
    execFileSync(
      process.execPath,
      [resolve(root, 'node_modules/astro/bin/astro.mjs'), 'build', '--root', temporary],
      { cwd: temporary, stdio: 'pipe', env: { ...process.env, SITE_URL: 'http://localhost:4321' } },
    );
    assert.deepEqual(readFileSync(ordinaryPath), ordinary);
    for (const path of [
      'pulse/2026-10-24/index.html',
      'pulse/2026-10-24-evening/index.html',
      `stories/${id}/index.html`,
    ])
      assert.ok(existsSync(join(temporary, 'dist', path)), path);
    const home = readFileSync(join(temporary, 'dist/index.html'), 'utf8');
    assert.match(home, /class="lead-story"[\s\S]*?Synthetic evening rendering fixture/);
    assert.match(home, /Evening edition/);
    const archive = readFileSync(join(temporary, 'dist/pulse/index.html'), 'utf8');
    assert.ok(
      archive.indexOf('/pulse/2026-10-24-evening/') < archive.indexOf('/pulse/2026-10-24/'),
    );
    const html = readFileSync(join(temporary, `dist/stories/${id}/index.html`), 'utf8');
    assert.match(html, /Evening edition/);
    const rss = readFileSync(join(temporary, 'dist/rss.xml'), 'utf8');
    assert.ok(rss.includes('Edition date: 2026-10-24. Evening edition.'));
    assert.ok(!rss.includes('<pubDate>'));
    assert.ok(!existsSync(resolve(root, `src/content/stories/${id}.md`)));
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});
