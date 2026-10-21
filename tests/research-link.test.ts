import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseResearchLink } from '../src/lib/research/parse-public-id.ts';
import { researchFixtures, searchResearchFixtures } from '../src/lib/research/fixtures.ts';

test('neutral route or no query produces a neutral research page', () => {
  assert.deepEqual(parseResearchLink(''), { state: 'neutral' });
  assert.deepEqual(parseResearchLink('?'), { state: 'neutral' });
});

test('single syntactically valid public DOI, PMID and PMCID are accepted', () => {
  assert.deepEqual(parseResearchLink('?doi=10.1038%2Fs41591-026-04680-4'), {
    state: 'identifier',
    paper: { kind: 'doi', value: '10.1038/s41591-026-04680-4' },
  });
  assert.deepEqual(parseResearchLink('?pmid=42869994'), {
    state: 'identifier',
    paper: { kind: 'pmid', value: '42869994' },
  });
  assert.deepEqual(parseResearchLink('?pmcid=pmc1234'), {
    state: 'identifier',
    paper: { kind: 'pmcid', value: 'PMC1234' },
  });
});

test('rejects ambiguous, unknown, malformed, unsafe and excessive identifiers', () => {
  for (const value of [
    '?doi=',
    '?doi=10.1000%2Fabc&pmid=123',
    '?doi=10.1000%2Fabc&doi=10.1000%2Fdef',
    '?doi=10.1000%2Fabc&extra=1',
    '?source=https%3A%2F%2Fexample.org',
    '?doi=broken',
    '?doi=10.1000%2Fabc%ZZ',
    '?doi=10.1000%2Fabc%3Fredirect%3D1',
    '?doi=10.1000%2Fabc%0A',
    '?doi=10.1000%2F' + 'a'.repeat(201),
    '?pmid=0',
    '?pmid=' + '1'.repeat(13),
    '?pmcid=PMC0',
    '?pmcid=PMC1abc',
  ]) {
    assert.deepEqual(parseResearchLink(value), { state: 'invalid' }, value);
  }
});

test('fixtures contain no identifiers or actual clinical claims and search is deterministic', () => {
  assert.equal(researchFixtures.length, 4);
  assert.ok(researchFixtures.every((item) => item.id.startsWith('example-')));
  assert.equal(searchResearchFixtures('nonexistent-term').length, 0);
  assert.equal(searchResearchFixtures('workFLOW').length, 1);
  assert.equal(searchResearchFixtures('').length, researchFixtures.length);
});
