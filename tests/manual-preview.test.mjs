import assert from 'node:assert/strict';
import test from 'node:test';
import { validateManualRequest } from '../scripts/manual-preview.ts';
import { policy } from '../scripts/automatic-preview.ts';

const head = 'a'.repeat(40);
function fixture() {
  const repository = {
    id: policy.repositoryId,
    full_name: policy.repository,
    owner: { id: policy.ownerId },
  };
  return {
    number: 7,
    state: 'open',
    draft: true,
    base: { ref: 'main', repo: structuredClone(repository) },
    head: { sha: head, repo: structuredClone(repository) },
  };
}
test('manual preview accepts draft PRs and reuses their numbered channel', () => {
  assert.deepEqual(validateManualRequest(fixture(), '7', head), { headSha: head, channel: 'pr-7' });
});
for (const number of ['../live', 'live', '7\nchannel=live', '0', '-1', '9007199254740992']) {
  test(`manual preview rejects invalid channel input ${JSON.stringify(number)}`, () => {
    assert.throws(() => validateManualRequest(fixture(), number));
  });
}
const mutations = {
  'closed PR': (pr) => {
    pr.state = 'closed';
  },
  'different PR': (pr) => {
    pr.number = 8;
  },
  'retargeted PR': (pr) => {
    pr.base.ref = 'dev';
  },
  fork: (pr) => {
    pr.head.repo.id = 1;
  },
  'different owner': (pr) => {
    pr.base.repo.owner.id = 1;
  },
  'foreign base': (pr) => {
    pr.base.repo.full_name = 'GadDev/other';
  },
  'foreign head': (pr) => {
    pr.head.repo.full_name = 'GadDev/other';
  },
  'stale revision': (pr) => {
    pr.head.sha = 'b'.repeat(40);
  },
  'malformed revision': (pr) => {
    pr.head.sha = '../main';
  },
};
for (const [name, mutate] of Object.entries(mutations)) {
  test(`manual preview rejects ${name} before publishing`, () => {
    const pr = fixture();
    mutate(pr);
    assert.throws(() => validateManualRequest(pr, '7', head));
  });
}
