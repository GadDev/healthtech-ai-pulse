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
import { fixture } from './helpers/fixtures.mjs';

test('actual Astro rendering keeps evidence limits visible without an image; fixtures stay isolated', () => {
  const root = process.cwd();
  const temporary = mkdtempSync(join(tmpdir(), 'healthtech-render-'));
  try {
    for (const path of ['src', 'public', 'astro.config.mjs', 'package.json', 'tsconfig.json'])
      cpSync(resolve(root, path), join(temporary, path), { recursive: true });
    symlinkSync(resolve(root, 'node_modules'), join(temporary, 'node_modules'), 'dir');
    const { story } = fixture();
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
    ])
      assert.ok(html.includes(expected), expected);
    assert.ok(!html.includes('class="story-hero"'));
    assert.ok(!existsSync(resolve(root, `src/content/stories/${story.candidateId}.md`)));
    assert.ok(!existsSync(resolve(root, `dist/stories/${story.candidateId}/index.html`)));
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});
