import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { isDeepStrictEqual } from 'node:util';
import { parse } from 'yaml';
import {
  ledgerSchema,
  storySchema,
  reviewSchema,
  weightedScore,
} from '../../src/lib/editorial-schema.mjs';
import { documents, markdown, checkContent } from './content.mjs';
import { buildGenerationIdentity, sha256 } from './illustration-generation-identity.ts';

export const digest = sha256;
export function inside(root, path) {
  const resolved = resolve(root, path);
  if (relative(root, resolved).startsWith('..') || relative(root, resolved) === '')
    throw new Error(`Unsafe path: ${path}`);
  return resolved;
}
const verified = (status) => ['verified', 'verified-with-claim-scope'].includes(status);
export function validateLedger(input, vocabulary) {
  const ledger = ledgerSchema.parse(input);
  const seen = new Set();
  for (const [bucket, decision] of [
    ['candidates', 'selected'],
    ['watchlist', 'watch'],
    ['exclusions', 'rejected'],
  ]) {
    for (const c of ledger[bucket]) {
      if (c.decision !== decision || seen.has(c.id))
        throw new Error(`${c.id}: decision/bucket mismatch or duplicate`);
      seen.add(c.id);
      if (!c.id.startsWith(`${ledger.editorial_date}-`))
        throw new Error(`${c.id}: wrong editorial date`);
      if (c.topics.some((t) => !vocabulary.has(t))) throw new Error(`${c.id}: uncontrolled topic`);
      const sources = new Map(c.sources.map((s) => [s.id, s]));
      if (sources.size !== c.sources.length) throw new Error(`${c.id}: repeated source id`);
      if (!c.sources.some((s) => s.url === c.primary_source_url && s.role === 'primary'))
        throw new Error(`${c.id}: missing primary source mapping`);
      if (
        c.editorial_score &&
        weightedScore(c.editorial_score) !== c.editorial_score.weighted_total
      )
        throw new Error(`${c.id}: score arithmetic mismatch`);
      if (decision === 'watch' && (!c.promote_when.length || !c.next_review_at))
        throw new Error(`${c.id}: watch promotion condition/review date missing`);
      if (decision !== 'selected') continue;
      const score = c.editorial_score;
      if (
        !c.scope_fit.in_scope ||
        !score ||
        score.weighted_total < 75 ||
        score.significance < 2 ||
        score.claim_support < 2 ||
        score.relevance < 2 ||
        score.material_change < 1
      )
        throw new Error(`${c.id}: failed selection gate`);
      if (
        !c.format ||
        !c.depth ||
        !c.evidence ||
        !c.claims.length ||
        c.deduplication.status === 'repeat' ||
        c.deduplication.status === 'uncertain'
      )
        throw new Error(`${c.id}: incomplete selected evidence/novelty`);
      if (
        c.deduplication.status === 'material-update' &&
        (!c.deduplication.material_delta ||
          (!c.deduplication.previous_candidate_ids.length &&
            !c.deduplication.previous_story_ids.length))
      )
        throw new Error(`${c.id}: material update lacks prior reference/delta`);
      const claimIds = new Set();
      for (const claim of c.claims) {
        if (claimIds.has(claim.id)) throw new Error(`${c.id}: duplicate claim id`);
        claimIds.add(claim.id);
        if (claim.source_ids.some((s) => !sources.has(s)))
          throw new Error(`${c.id}: unknown claim source`);
        if (
          claim.type === 'availability' &&
          !claim.source_ids.includes(claim.availability.artifact_source_id)
        )
          throw new Error(`${c.id}: artifact source missing`);
        if (
          claim.type === 'patient-benefit' &&
          c.evidence.clinical_utility !== 'demonstrated-in-studied-setting'
        )
          throw new Error(`${c.id}: patient benefit lacks demonstrated utility`);
        if (
          claim.type === 'regulatory' &&
          !claim.source_ids.includes(claim.regulation.official_source_id)
        )
          throw new Error(`${c.id}: regulatory record source missing`);
        if (claim.study)
          for (const result of claim.study.results)
            if (!claim.source_ids.includes(result.source_id))
              throw new Error(`${c.id}: study result source missing`);
      }
    }
  }
  const published = ledger.publication.story_ids;
  if (published.length > 2)
    throw new Error('Pilot capacity exceeded: at most two surviving stories');
  const withheld = ledger.publication.withheld_selected.map((c) => c.id);
  if (new Set([...published, ...withheld]).size !== published.length + withheld.length)
    throw new Error('Duplicate or drafted/withheld overlap');
  if (
    published.some((id) => !ledger.candidates.some((c) => c.id === id)) ||
    withheld.some((id) => !ledger.candidates.some((c) => c.id === id))
  )
    throw new Error('Only selected candidates may be drafted/withheld');
  if (
    ledger.publication.mode !== 'in-progress' &&
    ledger.candidates.some((c) => !published.includes(c.id) && !withheld.includes(c.id))
  )
    throw new Error('Selected candidate not accounted for');
  if (
    ledger.publication.mode === 'ledger-only' &&
    (published.length || ledger.publication.issue_path || ledger.publication.must_know_story_id)
  )
    throw new Error('Ledger-only batch cannot contain issue/stories/MUST KNOW');
  if (
    ledger.publication.mode === 'publication' &&
    (!published.length ||
      ledger.publication.issue_path !== `src/content/pulse/${ledger.editorial_date}.md`)
  )
    throw new Error('Publication batch must reference its issue');
  for (const id of published) {
    const c = ledger.candidates.find((c) => c.id === id);
    if (
      !verified(c.publication_verification.status) ||
      !c.publication_verification.checked_at ||
      !c.publication_verification.checked_by ||
      !['new-confirmed', 'material-update-confirmed'].includes(c.deduplication.publication_status)
    )
      throw new Error(`${id}: failed publication verification/deduplication gate`);
    for (const claim of c.claims) {
      if (
        !verified(claim.verification.status) ||
        !claim.verification.checked_at ||
        !claim.verification.checked_by
      )
        throw new Error(`${id}: unverified publishable claim`);
      const sources = c.sources.filter((s) => claim.source_ids.includes(s.id));
      if (!sources.some((s) => s.inspected_at && s.access_level !== 'unavailable'))
        throw new Error(`${id}: claim has no inspected evidence`);
      if (
        claim.type === 'regulatory' &&
        !sources.some(
          (s) =>
            s.id === claim.regulation.official_source_id &&
            s.inspected_at &&
            s.source_type === 'regulatory-record',
        )
      )
        throw new Error(`${id}: official regulatory record not inspected`);
    }
  }
  const must = ledger.publication.must_know_story_id;
  if (must) {
    const c = ledger.candidates.find((c) => c.id === must);
    if (
      !published.includes(must) ||
      c.editorial_score.weighted_total < 90 ||
      c.editorial_score.significance !== 4 ||
      c.editorial_score.claim_support < 3
    )
      throw new Error('Invalid MUST KNOW designation');
  }
  return ledger;
}
export function validateIllustration(root, story, bytes) {
  if (story.data.illustration.mode === 'none') return;
  const i = story.data.illustration;
  const asset = inside(root, `public${i.image}`);
  const review = reviewSchema.parse(JSON.parse(readFileSync(inside(root, i.reviewPath), 'utf8')));
  const image = readFileSync(asset);
  if (image.subarray(0, 4).toString() !== 'RIFF' || image.subarray(8, 12).toString() !== 'WEBP')
    throw new Error(`${story.id}: not WebP bytes`);
  if (
    review.story_id !== story.id ||
    review.asset_sha256 !== digest(image) ||
    review.story_source_sha256 !== digest(bytes)
  )
    throw new Error(`${story.id}: stale illustration identity/integrity`);
  if (review.policy_sha256 !== digest(readFileSync(`${root}/docs/EDITORIAL.md`)))
    throw new Error(`${story.id}: illustration policy changed`);
  const key = buildGenerationIdentity(review).generation_key;
  if (key !== review.generation_key) throw new Error(`${story.id}: invalid generation key`);
}
export function checkEditorial(root = process.cwd(), explicit, { allowInProgress = false } = {}) {
  checkContent(root);
  const vocabulary = new Set(
    Object.keys(parse(readFileSync(`${root}/docs/editorial/TOPICS_V1.yml`, 'utf8')).topics),
  );
  const directories = ['docs/editorial/ledgers', 'docs/editorial/trials'];
  if (explicit && !existsSync(inside(root, explicit)))
    throw new Error('Requested ledger does not exist');
  const paths = directories.flatMap((dir) =>
    existsSync(`${root}/${dir}`)
      ? readdirSync(`${root}/${dir}`)
          .filter((n) => n.endsWith('.json'))
          .map((n) => `${root}/${dir}/${n}`)
      : [],
  );
  if (explicit && !paths.includes(inside(root, explicit)))
    throw new Error(
      'Explicit input must be in a dated ledger directory, not an unchecked JSON file.',
    );
  const ledgers = paths.map((path) => {
    const ledger = validateLedger(JSON.parse(readFileSync(path, 'utf8')), vocabulary);
    if (path.split('/').at(-1) !== `${ledger.editorial_date}.json`)
      throw new Error(`${path}: date/filename mismatch`);
    if (ledger.publication.mode === 'in-progress' && !allowInProgress)
      throw new Error(`${path}: unfinished checkpoint cannot pass final validation`);
    if (ledger.kind === 'controlled-trial' && ledger.publication.story_ids.length)
      throw new Error('Controlled trials are isolated from live story mappings');
    return ledger;
  });
  const identities = new Map();
  for (const ledger of [...ledgers]
    .filter((l) => l.kind === 'daily')
    .sort((a, b) => a.editorial_date.localeCompare(b.editorial_date)))
    for (const id of ledger.publication.story_ids) {
      const c = ledger.candidates.find((c) => c.id === id);
      const keys = [
        `url:${c.primary_source_url}`,
        ...Object.entries(c.underlying_identity)
          .filter(([, value]) => value)
          .map(([key, value]) => `${key}:${value}`),
      ];
      const previous = new Set(keys.flatMap((key) => identities.get(key) ?? []));
      if (
        previous.size &&
        !(
          c.deduplication.status === 'material-update' &&
          c.deduplication.material_delta &&
          [...previous].some((id) => c.deduplication.previous_story_ids.includes(id))
        )
      )
        throw new Error(`${id}: underlying development already covered without material delta`);
      for (const key of keys) identities.set(key, [...(identities.get(key) ?? []), id]);
    }
  const allStories = documents(`${root}/src/content/stories`);
  for (const story of allStories) {
    const data = storySchema.parse(story.data);
    if (/FIXTURE ONLY|SYNTHETIC TEST DATA/.test(story.body))
      throw new Error(`${story.id}: fixture leaked into live content`);
    const ledger = ledgers.find(
      (l) => l.editorial_date === data.editorialDate && l.kind === 'daily',
    );
    if (!ledger || !ledger.publication.story_ids.includes(story.id))
      throw new Error(`${story.id}: no daily publication mapping`);
    const c = ledger.candidates.find((c) => c.id === data.candidateId);
    if (
      !c ||
      c.id !== story.id ||
      data.category !== c.desk ||
      data.type !== c.format ||
      data.depth !== c.depth ||
      !isDeepStrictEqual(data.evidence, c.evidence) ||
      !isDeepStrictEqual([...data.tags].sort(), [...c.topics].sort()) ||
      !isDeepStrictEqual(data.claims, [...c.claims.map((c) => c.id)])
    )
      throw new Error(`${story.id}: story/ledger evidence mapping mismatch`);
    for (const source of data.sources)
      if (!c.sources.some((s) => s.id === source.id && s.url === source.url))
        throw new Error(`${story.id}: source mapping mismatch`);
    if (!data.sources.some((s) => s.url === c.primary_source_url))
      throw new Error(`${story.id}: primary source omitted`);
    const bytes = readFileSync(`${root}/src/content/stories/${story.id}.md`);
    validateIllustration(root, { ...story, data }, bytes);
  }
  for (const ledger of ledgers) {
    for (const id of ledger.publication.story_ids)
      if (!allStories.some((s) => s.id === id)) throw new Error(`${id}: mapped story missing`);
    const issue = `${root}/src/content/pulse/${ledger.editorial_date}.md`;
    if (ledger.kind === 'controlled-trial') continue;
    if (ledger.publication.mode === 'ledger-only' && existsSync(issue))
      throw new Error('Ledger-only batch has issue');
    if (ledger.publication.mode === 'publication') {
      const refs = markdown(readFileSync(issue, 'utf8')).data;
      if (
        !isDeepStrictEqual(
          [...refs.sections.flatMap((s) => s.stories)].sort(),
          [...ledger.publication.story_ids].sort(),
        ) ||
        (refs.mustKnow ?? null) !== ledger.publication.must_know_story_id
      )
        throw new Error(`${issue}: issue/ledger mapping mismatch`);
    }
  }
  // Every issue needs a daily ledger, even if its date was not the latest one.
  for (const issue of documents(`${root}/src/content/pulse`))
    if (
      !ledgers.some(
        (l) =>
          l.kind === 'daily' &&
          l.editorial_date === issue.id &&
          l.publication.mode === 'publication',
      )
    )
      throw new Error(`${issue.id}: issue has no daily ledger`);
  return { ledgers: ledgers.length, stories: allStories.length };
}