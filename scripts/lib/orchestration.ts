import { isDeepStrictEqual } from 'node:util';
import { validateLedger } from './editorial.ts';

type Ledger = ReturnType<typeof validateLedger>;
type EditorialFile = { encoding: 'utf-8' | 'base64'; content: string } | null;
type EditorialFiles = Record<string, EditorialFile>;
type PublicationPR = { merged?: boolean; state?: string; draft?: boolean };
type BranchState = { sha: string; ledger: Ledger };
type OwnedBranchState = BranchState & {
  ledger: Ledger & { active_run: NonNullable<Ledger['active_run']> };
};

export interface EditorialAdapter {
  findPRs(branch: string): Promise<PublicationPR[]>;
  isFinalized(date: string): Promise<boolean>;
  readBranch(branch: string): Promise<BranchState | null>;
  defaultHead(): Promise<{ sha: string }>;
  commit(commit: { parent: string; files: EditorialFiles }): Promise<string>;
  updateRef(update: {
    branch: string;
    sha: string;
    expectedSha: string;
    force: false;
  }): Promise<unknown>;
  createRef(ref: { branch: string; sha: string }): Promise<unknown>;
  updatePR(pr: PublicationPR, patch: { title: string; body: string }): Promise<PublicationPR>;
  createPR(data: {
    head: string;
    title: string;
    body: string;
    draft: true;
  }): Promise<PublicationPR>;
}

export interface RunSession {
  outcome: 'acquired';
  branch: string;
  date: string;
  owner: string;
  sha: string;
  vocabulary: ReadonlySet<string>;
  ttl: number;
}

export const dailyBranch = (date: string) => `content/healthtech-ai-pulse-${date}`;
export const dailyTitle = (date: string) => `content: prepare HealthTech AI Pulse for ${date}`;
const ledgerPath = (date: string) => `docs/editorial/ledgers/${date}.json`;
const iso = (ms: number) => new Date(ms).toISOString();
export class RunBlocked extends Error {}
export class OwnershipLost extends Error {}

function lease(now: number, owner: string, ttl: number) {
  return {
    owner_token: owner,
    acquired_at: iso(now),
    heartbeat_at: iso(now),
    expires_at: iso(now + ttl),
  };
}
function assertOwner(
  snapshot: BranchState | null,
  session: RunSession,
  now: number,
): asserts snapshot is OwnedBranchState {
  const active = snapshot?.ledger?.active_run;
  if (!active || active.owner_token !== session.owner || Date.parse(active.expires_at) <= now)
    throw new OwnershipLost('Run ownership expired or changed; reread before retrying.');
}
function researchView(candidate: Ledger['candidates'][number]) {
  const copy = structuredClone(candidate);
  Reflect.deleteProperty(copy, 'publication_verification');
  Reflect.deleteProperty(copy.deduplication, 'publication_status');
  for (const claim of copy.claims ?? []) Reflect.deleteProperty(claim, 'verification');
  return copy;
}
function preserveResearch(previous: Ledger, next: Ledger) {
  for (const bucket of ['candidates', 'watchlist', 'exclusions'] as const)
    for (const old of previous[bucket]) {
      const updated = next[bucket].find((c) => c.id === old.id);
      if (!updated || !isDeepStrictEqual(researchView(old), researchView(updated)))
        throw new RunBlocked(
          `Research record ${old.id} cannot be silently rewritten; use explicit editorial adjudication.`,
        );
    }
  if (
    !isDeepStrictEqual(
      previous.human_overrides,
      next.human_overrides.slice(0, previous.human_overrides.length),
    )
  )
    throw new RunBlocked('Existing human overrides must be preserved.');
}
function assertEditorialPaths(date: string, files: EditorialFiles) {
  const safe = new RegExp(
    `^(src/content/stories/${date}-[a-z0-9-]+\\.md|src/content/pulse/${date}\\.md|public/images/stories/${date}-[a-z0-9-]+\\.webp|docs/editorial/illustrations/reviews/${date}-[a-z0-9-]+\\.json)$`,
  );
  for (const [path, value] of Object.entries(files)) {
    if (!safe.test(path)) throw new RunBlocked(`Editorial run cannot modify ${path}`);
    if (
      value !== null &&
      (!['utf-8', 'base64'].includes(value.encoding) || typeof value.content !== 'string')
    )
      throw new RunBlocked('Explicit text/base64 encoding required.');
    if (path.endsWith('.webp') && value !== null && value.encoding !== 'base64')
      throw new RunBlocked('Binary WebP must use base64 blob operations.');
  }
}
async function inspectPR(adapter: EditorialAdapter, branch: string) {
  const prs = await adapter.findPRs(branch);
  if (prs.length > 1)
    throw new RunBlocked('Multiple canonical PRs found; maintainer reconciliation required.');
  if (prs[0]?.merged) return { outcome: 'already-finalized', pr: prs[0] };
  if (prs[0]?.state === 'closed')
    throw new RunBlocked('Canonical PR closed unmerged; do not replace it.');
  if (prs[0] && !prs[0].draft)
    throw new RunBlocked('Existing PR is no longer draft; stop for maintainer direction.');
  return { pr: prs[0] ?? null };
}

/** Adapter must provide atomic createRef and updateRef({expectedSha,force:false}). */
export async function acquireRun(
  adapter: EditorialAdapter,
  {
    date,
    owner,
    seed,
    vocabulary,
    now = Date.now(),
    ttl = 120 * 60 * 1000,
  }: {
    date: string;
    owner: string;
    seed: Ledger;
    vocabulary: ReadonlySet<string>;
    now?: number;
    ttl?: number;
  },
) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !owner)
    throw new RunBlocked('Valid date and unique owner token required.');
  const branch = dailyBranch(date);
  const currentPR = await inspectPR(adapter, branch);
  if (currentPR.outcome || (await adapter.isFinalized(date)))
    return { outcome: 'already-finalized', pr: currentPR.pr };
  const current = await adapter.readBranch(branch);
  if (current && !current.ledger)
    throw new RunBlocked(
      'Existing canonical branch has no recoverable ledger; do not overwrite it.',
    );
  const base = current ?? (await adapter.defaultHead());
  const ledger = structuredClone(current?.ledger ?? seed);
  if (!current && ledger.contract_ref !== base.sha)
    throw new RunBlocked(
      'Default branch changed after contract read; reread contracts before creating the batch.',
    );
  if (ledger.editorial_date !== date || ledger.kind !== 'daily')
    throw new RunBlocked('Daily ledger/date required.');
  if (ledger.active_run && Date.parse(ledger.active_run.expires_at) > now)
    throw new RunBlocked('A run already owns this date; do not create another branch or PR.');
  ledger.active_run = lease(now, owner, ttl);
  ledger.attempts.push({
    run_id: owner,
    started_at: iso(now),
    completed_at: null,
    phases: ['ownership-acquired'],
    outcome: 'in-progress',
  });
  validateLedger(ledger, vocabulary);
  const commit = await adapter.commit({
    parent: base.sha,
    files: {
      [ledgerPath(date)]: { encoding: 'utf-8', content: JSON.stringify(ledger, null, 2) + '\n' },
    },
  });
  if (current)
    await adapter.updateRef({ branch, sha: commit, expectedSha: base.sha, force: false });
  else await adapter.createRef({ branch, sha: commit });
  return { outcome: 'acquired', branch, date, owner, sha: commit, vocabulary, ttl };
}

export async function checkpoint(
  adapter: EditorialAdapter,
  session: RunSession,
  {
    ledger,
    files = {},
    now = Date.now(),
    release = false,
  }: { ledger: Ledger; files?: EditorialFiles; now?: number; release?: boolean },
) {
  const pr = await inspectPR(adapter, session.branch);
  if (pr.outcome || (await adapter.isFinalized(session.date)))
    throw new OwnershipLost('Date finalized while run was active.');
  const current = await adapter.readBranch(session.branch);
  assertOwner(current, session, now);
  if (current.sha !== session.sha)
    throw new OwnershipLost(
      'Branch changed after checkpoint; inspect human/concurrent edits before resuming.',
    );
  preserveResearch(current.ledger, ledger);
  for (let i = 0; i < current.ledger.attempts.length; i++) {
    const old = current.ledger.attempts[i];
    const updated = ledger.attempts[i];
    if (old.run_id !== session.owner && !isDeepStrictEqual(old, updated))
      throw new RunBlocked('Previous run attempts must remain unchanged.');
  }
  assertEditorialPaths(session.date, files);
  const next = structuredClone(ledger);
  next.active_run = release
    ? null
    : { ...current.ledger.active_run, heartbeat_at: iso(now), expires_at: iso(now + session.ttl) };
  const attempt = next.attempts.find((a) => a.run_id === session.owner);
  if (!attempt) throw new RunBlocked('Current run audit record missing.');
  if (release) {
    attempt.completed_at = iso(now);
    attempt.outcome = 'checkpoint-complete';
  }
  validateLedger(next, session.vocabulary);
  const sha = await adapter.commit({
    parent: current.sha,
    files: {
      ...files,
      [ledgerPath(session.date)]: {
        encoding: 'utf-8',
        content: JSON.stringify(next, null, 2) + '\n',
      },
    },
  });
  await adapter.updateRef({ branch: session.branch, sha, expectedSha: current.sha, force: false });
  return { ...session, sha };
}

export async function ensureDraft(
  adapter: EditorialAdapter,
  session: RunSession,
  { preflightHead, body, now = Date.now() }: { preflightHead: string; body: string; now?: number },
) {
  let state = await inspectPR(adapter, session.branch);
  if (state.outcome || (await adapter.isFinalized(session.date)))
    return { outcome: 'already-finalized', pr: state.pr };
  const current = await adapter.readBranch(session.branch);
  assertOwner(current, session, now);
  if (current.sha !== session.sha || preflightHead !== current.sha)
    throw new OwnershipLost('Preflight revision is stale.');
  validateLedger(current.ledger, session.vocabulary);
  if (current.ledger.publication.mode === 'in-progress')
    throw new RunBlocked('Finalise publication/withholding before opening a draft.');
  if (state.pr)
    return {
      outcome: 'draft-existing',
      pr: await adapter.updatePR(state.pr, { title: dailyTitle(session.date), body }),
    };
  try {
    return {
      outcome: 'draft-created',
      pr: await adapter.createPR({
        head: session.branch,
        title: dailyTitle(session.date),
        body,
        draft: true,
      }),
    };
  } catch (error) {
    // A timeout may have committed the PR. Re-query before any future retry.
    state = await inspectPR(adapter, session.branch);
    if (state.pr) return { outcome: 'draft-recovered', pr: state.pr };
    throw new RunBlocked(
      `PR creation outcome unconfirmed; reread before retrying. ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

export function ciOutcome({
  mode,
  headSha,
  run,
}: {
  mode: 'ledger-only' | 'publication';
  headSha: string;
  run?: {
    headSha: string;
    status?: string;
    conclusion?: string | null;
    requiredJobs?: { name: string; conclusion: string }[];
  } | null;
}) {
  if (mode === 'ledger-only')
    return {
      outcome: 'ledger-only',
      ci: !run ? 'unavailable' : run.headSha !== headSha ? 'stale' : (run.conclusion ?? 'pending'),
    };
  if (!run || run.headSha !== headSha)
    return { outcome: 'ci-pending', ci: run ? 'stale' : 'unavailable' };
  if (run.status !== 'completed') return { outcome: 'ci-pending', ci: 'pending' };
  const jobs = run.requiredJobs ?? [];
  if (
    run.conclusion !== 'success' ||
    !jobs.length ||
    ['Verify publication', 'Browser and accessibility'].some(
      (name) => !jobs.some((j) => j.name === name && j.conclusion === 'success'),
    )
  )
    return { outcome: 'ci-failed', ci: run.conclusion ?? 'unknown' };
  return { outcome: 'review-ready', ci: 'passed' };
}
