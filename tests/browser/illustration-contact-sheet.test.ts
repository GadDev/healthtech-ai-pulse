import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { renderContactSheet } from '../../scripts/build-illustration-contact-sheet.ts';

const png = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGPo8jb9DwAEdwIKJbSpBgAAAABJRU5ErkJggg==',
  'base64',
);
test('Chromium renders one candidate, optional references and a square crop without changing inputs', async (t) => {
  const root = mkdtempSync(join(tmpdir(), 'healthtech-sheet-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const candidate = join(root, 'candidate.png'),
    reference = join(root, 'reference.png'),
    output = join(root, 'sheet.png');
  writeFileSync(candidate, png);
  writeFileSync(reference, png);
  const options = {
    storyId: '2026-10-19-synthetic-sheet',
    candidates: [candidate],
    references: [],
    output,
    crop: 'square' as const,
  };
  await renderContactSheet(options);
  const result = readFileSync(output);
  assert.equal(result.subarray(1, 4).toString(), 'PNG');
  assert.equal(result.readUInt32BE(16), 1600);
  assert.ok(result.readUInt32BE(20) > 1000);
  assert.deepEqual(readFileSync(candidate), png);
  await assert.rejects(() => renderContactSheet(options), /overwrite/);
  await renderContactSheet({
    ...options,
    references: [reference],
    output: join(root, 'with-reference.png'),
    crop: 'wide',
  });
  assert.deepEqual(readFileSync(reference), png);
});
test('undecodable image fails without a review file or approval', async (t) => {
  const root = mkdtempSync(join(tmpdir(), 'healthtech-sheet-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const candidate = join(root, 'invalid.png'),
    output = join(root, 'sheet.png');
  writeFileSync(candidate, 'not PNG bytes');
  await assert.rejects(
    () =>
      renderContactSheet({
        storyId: '2026-10-19-synthetic-sheet',
        candidates: [candidate],
        references: [],
        output,
        crop: 'wide',
      }),
    /decoded/,
  );
  assert.equal(existsSync(output), false);
});
