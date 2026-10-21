import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';
import { parse } from 'yaml';
import {
  approvedPublisherLinks,
  verifiedPaperResearchHref,
  type PublishedResearchStory,
  type ResearchLedger,
} from '../src/lib/research/verified-paper-links.ts';

const ledgerFiles = readdirSync('docs/editorial/ledgers')
  .filter((name) => /^2026-\d\d-\d\d\.json$/.test(name))
  .sort();
const ledgers = ledgerFiles.map(
  (name) => JSON.parse(readFileSync(`docs/editorial/ledgers/${name}`, 'utf8')) as ResearchLedger,
);

function storyFixture(id: string): PublishedResearchStory {
  const source = readFileSync(`src/content/stories/${id}.md`, 'utf8');
  const frontmatter = source.split('---')[1];
  assert.ok(frontmatter, id);
  return { id, data: parse(frontmatter) as PublishedResearchStory['data'] };
}

function deepClone<T>(data: T): T {
  return JSON.parse(JSON.stringify(data)) as T;
}

test('real published stories only link to four publisher-checked primary DOIs', () => {
  assert.equal(approvedPublisherLinks.length, 4);
  for (const expected of approvedPublisherLinks) {
    const story = storyFixture(expected.storyId);
    assert.equal(
      verifiedPaperResearchHref(story, ledgers),
      `/research/?doi=${encodeURIComponent(expected.doi)}`,
      expected.storyId,
    );
  }
});

test('announcement and regulatory news without paper IDs never get paper deep links', () => {
  for (const id of [
    '2026-10-20-astrazeneca-oracle-trials-agreement',
    '2026-10-21-fda-ai-device-change-plan-examples',
  ]) {
    assert.equal(verifiedPaperResearchHref(storyFixture(id), ledgers), null);
  }
});

test('unlisted story and draft stories cannot receive deep links', () => {
  const story = deepClone(storyFixture(approvedPublisherLinks[0].storyId));
  story.data.draft = true;
  assert.equal(verifiedPaperResearchHref(story, ledgers), null);
  story.data.draft = false;
  story.id = '2026-10-17-unlisted-story';
  assert.equal(verifiedPaperResearchHref(story, ledgers), null);
});

test('story mapping and source publisher identity are required', () => {
  const story = deepClone(storyFixture(approvedPublisherLinks[0].storyId));
  story.data.candidateId = '2026-10-20-other-candidate';
  assert.equal(verifiedPaperResearchHref(story, ledgers), null);
  story.data.candidateId = approvedPublisherLinks[0].candidateId;
  story.data.sources = [{ url: 'https://example.org/not-a-primary-paper' }];
  assert.equal(verifiedPaperResearchHref(story, ledgers), null);
});

test('missing, duplicated, conflicting, trial or nonpublication ledger suppresses links', () => {
  const story = storyFixture(approvedPublisherLinks[0].storyId);
  assert.equal(verifiedPaperResearchHref(story, []), null);
  const original = ledgers.find((l) => l.candidates.some((c) => c.id === story.id));
  assert.ok(original);
  assert.equal(verifiedPaperResearchHref(story, [original, deepClone(original)]), null);
  const duplicate = deepClone(original);
  duplicate.watchlist = [{ id: story.id }];
  assert.equal(verifiedPaperResearchHref(story, [duplicate]), null);

  const unpublished = deepClone(original);
  unpublished.publication.mode = 'ledger-only';
  assert.equal(verifiedPaperResearchHref(story, [unpublished]), null);
  const missing = deepClone(original);
  missing.publication.story_ids = [];
  assert.equal(verifiedPaperResearchHref(story, [missing]), null);
  const withheld = deepClone(original);
  withheld.publication.withheld_selected = [{ id: story.id }];
  assert.equal(verifiedPaperResearchHref(story, [withheld]), null);
  const trial = deepClone(original);
  trial.kind = 'controlled-trial';
  assert.equal(verifiedPaperResearchHref(story, [trial]), null);
});

test('missing source inspection, changed DOI, unverified status or dedup conflict suppresses links', () => {
  const story = storyFixture(approvedPublisherLinks[1].storyId);
  const original = ledgers.find((l) => l.candidates.some((c) => c.id === story.id));
  assert.ok(original);
  const changes: Array<(ledger: ResearchLedger) => void> = [
    (l) => { l.candidates[0].underlying_identity.doi = '10.1000/other-paper'; },
    (l) => { l.candidates[0].publication_verification.status = 'conflict'; },
    (l) => { l.candidates[0].publication_verification.checked_at = null; },
    (l) => { l.candidates[0].publication_verification.checked_by = null; },
    (l) => { l.candidates[0].deduplication.publication_status = 'dedup-unverified'; },
    (l) => { l.candidates[0].sources.forEach((s) => { s.inspected_at = null; }); },
    (l) => { l.candidates[0].sources.forEach((s) => { s.canonical_url = 'https://example.org/elsewhere'; }); },
  ];
  for (const change of changes) {
    const altered = deepClone(original);
    change(altered);
    assert.equal(verifiedPaperResearchHref(story, [altered]), null);
  }
});
