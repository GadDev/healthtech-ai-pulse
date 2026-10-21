import test from 'node:test';
import assert from 'node:assert/strict';
import {
  acquireRun,
  checkpoint,
  ensureDraft,
  ciOutcome,
  OwnershipLost,
} from '../scripts/lib/orchestration.ts';
import type { EditorialAdapter, RunSession } from '../scripts/lib/orchestration.ts';
import { deploymentConfig } from '../scripts/lib/deployment.ts';
import { fixture, vocabulary, now } from './helpers/fixtures.ts';
import type { SyntheticLedger } from './helpers/fixtures.ts';
import { ledgerSchema } from '../src/lib/editorial-schema.ts';
const clock = Date.parse(now);
type EditorialPR = Awaited<ReturnType<EditorialAdapter['findPRs']>>[number];
function adapter() {
  let index = 0;
  const commits = new Map<string, { parent: string; ledger: SyntheticLedger }>();
  let branch: string | null = null;
  let prs: EditorialPR[] = [];
  let finalized = false;
  let timeout = false;
  return {
    setFinalized(value: boolean) {
      finalized = value;
    },
    setPRs(value: EditorialPR[]) {
      prs = value;
    },
    setTimeout(value: boolean) {
      timeout = value;
    },
    get prs() {
      return prs;
    },
    async findPRs() {
      return structuredClone(prs);
    },
    async isFinalized() {
      return finalized;
    },
    async readBranch() {
      return branch ? { sha: branch, ledger: structuredClone(commits.get(branch)!.ledger) } : null;
    },
    async defaultHead() {
      return { sha: 'a'.repeat(40) };
    },
    async commit({ parent, files }: Parameters<EditorialAdapter['commit']>[0]) {
      const sha = `commit-${++index}`;
      const path = Object.keys(files).find((p) => p.startsWith('docs/editorial/ledgers/'))!;
      const file = files[path];
      if (!file || file.encoding !== 'utf-8') throw new Error('Expected JSON ledger file');
      commits.set(sha, { parent, ledger: ledgerSchema.parse(JSON.parse(file.content)) });
      return sha;
    },
    async createRef({ sha }: { sha: string }) {
      if (branch) throw new Error('create-only conflict');
      branch = sha;
    },
    async updateRef({ sha, expectedSha, force }: Parameters<EditorialAdapter['updateRef']>[0]) {
      assert.equal(force, false);
      if (expectedSha !== branch || commits.get(sha)?.parent !== branch)
        throw new OwnershipLost('compare-and-swap conflict');
      branch = sha;
    },
    async createPR(pr: Parameters<EditorialAdapter['createPR']>[0]) {
      if (prs.length) throw new Error('already exists');
      const result = { ...pr, number: 1, state: 'open', merged: false };
      prs.push(result);
      if (timeout) throw new Error('synthetic timeout after server accepted');
      return result;
    },
    async updatePR(pr: EditorialPR, patch: { title: string; body: string }) {
      prs = [{ ...pr, ...patch }];
      return prs[0];
    },
  };
}
function seed() {
  const { ledger } = fixture();
  ledger.publication.mode = 'in-progress';
  return ledger;
}
const attemptAcquire = (a: EditorialAdapter, owner = 'run-one', time = clock) =>
  acquireRun(a, { date: '2026-10-18', owner, seed: seed(), vocabulary, now: time, ttl: 1000 });
async function acquire(a: EditorialAdapter, owner = 'run-one', time = clock): Promise<RunSession> {
  const result = await attemptAcquire(a, owner, time);
  if (result.outcome !== 'acquired') throw new Error('Expected acquired ownership');
  return result as RunSession;
}
async function finalLedger(a: ReturnType<typeof adapter>) {
  const state = await a.readBranch();
  assert.ok(state);
  const { ledger } = state;
  ledger.publication = {
    mode: 'ledger-only',
    reason: 'Synthetic all-withheld trial',
    story_ids: [],
    withheld_selected: ledger.candidates.map((c) => ({
      id: c.id,
      reason: 'Synthetic withholding',
      phase: 'verify',
      retry_condition: 'Synthetic fixture only',
    })),
    must_know_story_id: null,
    issue_path: null,
    checks: [],
  };
  return ledger;
}

test('simultaneous creates yield one owner on the one canonical branch', async () => {
  const a = adapter();
  const result = await Promise.allSettled([acquire(a, 'one'), acquire(a, 'two')]);
  assert.equal(result.filter((r) => r.status === 'fulfilled').length, 1);
  assert.ok((await a.readBranch())?.ledger.active_run);
});
test('fresh lease blocks a second run, expired takeover invalidates late worker', async () => {
  const a = adapter();
  const first = await acquire(a);
  await assert.rejects(() => acquire(a, 'second', clock + 1));
  const second = await acquire(a, 'second', clock + 1001);
  await assert.rejects(
    () => checkpoint(a, first, { ledger: seed(), now: clock + 1002 }),
    OwnershipLost,
  );
  assert.equal(second.owner, 'second');
});
test('checkpoint preserves selection, original decisions and binary safety', async () => {
  const a = adapter();
  const session = await acquire(a);
  const ledger = await finalLedger(a);
  await assert.rejects(
    () =>
      checkpoint(a, session, {
        ledger,
        files: { '.github/workflows/ci.yml': { encoding: 'utf-8', content: 'unsafe' } },
        now: clock + 2,
      }),
    /cannot modify/,
  );
  await assert.rejects(
    () =>
      checkpoint(a, session, {
        ledger,
        files: {
          'public/images/stories/2026-10-18-synthetic.webp': {
            encoding: 'utf-8',
            content: 'binary',
          },
        },
        now: clock + 2,
      }),
    /base64/,
  );
  const changed = structuredClone(ledger);
  assert.ok(changed.candidates[0].editorial_score);
  changed.candidates[0].editorial_score.relevance = 0;
  await assert.rejects(
    () => checkpoint(a, session, { ledger: changed, now: clock + 2 }),
    /silently rewritten/,
  );
  const next = await checkpoint(a, session, { ledger, now: clock + 2 });
  assert.notEqual(next.sha, session.sha);
  assert.equal((await a.readBranch())?.ledger.candidates[0]?.decision, 'selected');
});
test('merged date and closed-unmerged PR never create replacement PRs', async () => {
  const a = adapter();
  a.setFinalized(true);
  assert.equal((await attemptAcquire(a)).outcome, 'already-finalized');
  assert.equal(await a.readBranch(), null);
  a.setFinalized(false);
  a.setPRs([{ state: 'closed', merged: false, draft: true }]);
  await assert.rejects(() => acquire(a), /closed unmerged/);
});
test('ambiguous duplicate PRs and human-ready PRs stop the automated writer', async () => {
  const a = adapter();
  a.setPRs([{ draft: true }, { draft: true }]);
  await assert.rejects(() => acquire(a), /Multiple/);
  a.setPRs([{ state: 'open', draft: false }]);
  await assert.rejects(() => acquire(a), /no longer draft/);
});
test('PR timeout recovers the accepted draft without creating a second', async () => {
  const a = adapter();
  let session = await acquire(a);
  session = await checkpoint(a, session, { ledger: await finalLedger(a), now: clock + 2 });
  a.setTimeout(true);
  const result = await ensureDraft(a, session, {
    preflightHead: session.sha,
    body: 'Synthetic trial',
    now: clock + 3,
  });
  assert.equal(result.outcome, 'draft-recovered');
  assert.equal(a.prs.length, 1);
  assert.equal(a.prs[0]?.draft, true);
  assert.equal(
    (
      await ensureDraft(a, session, {
        preflightHead: session.sha,
        body: 'Updated report',
        now: clock + 4,
      })
    ).outcome,
    'draft-existing',
  );
  assert.equal(a.prs.length, 1);
});
test('stale preflight and in-progress records cannot open a PR', async () => {
  const a = adapter();
  const session = await acquire(a);
  await assert.rejects(
    () => ensureDraft(a, session, { preflightHead: 'older', body: 'Synthetic', now: clock + 1 }),
    OwnershipLost,
  );
  await assert.rejects(
    () =>
      ensureDraft(a, session, { preflightHead: session.sha, body: 'Synthetic', now: clock + 1 }),
    /Finalise/,
  );
  assert.equal(a.prs.length, 0);
});
test('CI reports exact-head required-job results and never treats stale green as passed', () => {
  const green = {
    headSha: 'head',
    status: 'completed',
    conclusion: 'success',
    requiredJobs: [
      { name: 'Verify project', conclusion: 'success' },
      { name: 'Browser smoke and accessibility', conclusion: 'success' },
    ],
  };
  assert.equal(
    ciOutcome({ mode: 'publication', headSha: 'head', run: green }).outcome,
    'review-ready',
  );
  assert.equal(ciOutcome({ mode: 'publication', headSha: 'newer', run: green }).ci, 'stale');
  assert.equal(
    ciOutcome({ mode: 'publication', headSha: 'head', run: { ...green, conclusion: 'failure' } })
      .outcome,
    'ci-failed',
  );
  assert.equal(
    ciOutcome({ mode: 'publication', headSha: 'head', run: { ...green, requiredJobs: [] } })
      .outcome,
    'ci-failed',
  );
  assert.equal(ciOutcome({ mode: 'publication', headSha: 'head', run: null }).ci, 'unavailable');
  assert.equal(
    ciOutcome({ mode: 'ledger-only', headSha: 'head', run: null }).outcome,
    'ledger-only',
  );
});
test('deployment rejects missing, cross-project and non-HTTPS configuration', () => {
  const env = {
    FIREBASE_PROJECT_ID: 'healthtech-ai-pulse',
    FIREBASE_SITE_URL: 'https://healthtech-ai-pulse.web.app',
    FIREBASE_WIF_PROVIDER:
      'projects/293427463899/locations/global/workloadIdentityPools/test/providers/test',
    FIREBASE_SERVICE_ACCOUNT: 'deployer@healthtech-ai-pulse.iam.gserviceaccount.com',
  };
  assert.equal(deploymentConfig(env).project, env.FIREBASE_PROJECT_ID);
  for (const patch of [
    { FIREBASE_PROJECT_ID: '' },
    { FIREBASE_PROJECT_ID: 'other-publication' },
    { FIREBASE_PROJECT_ID: 'healthtech-ai-pulse-test' },
    { FIREBASE_SITE_URL: 'http://healthtech-ai-pulse.web.app' },
    { FIREBASE_SITE_URL: 'https://healthtech-ai-pulse-test.web.app' },
    { FIREBASE_SERVICE_ACCOUNT: 'deployer@different-project.iam.gserviceaccount.com' },
    { FIREBASE_WIF_PROVIDER: 'not-a-provider' },
    {
      FIREBASE_WIF_PROVIDER:
        'projects/123/locations/global/workloadIdentityPools/test/providers/test',
    },
  ])
    assert.throws(() => deploymentConfig({ ...env, ...patch }));
});
