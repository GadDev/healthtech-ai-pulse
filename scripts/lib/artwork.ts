import { isDeepStrictEqual } from 'node:util';
import type { z } from 'astro/zod';
import type { ledgerSchema } from '../../src/lib/editorial-schema.ts';
type Ledger = z.infer<typeof ledgerSchema>;

export function validateArtwork(ledger: Ledger) {
  const progress = ledger.artwork;
  if (!progress) return; // Stored pre-extension ledgers retain their original evidence.
  const ids = new Set<string>();
  for (const story of progress.stories) {
    if (ids.has(story.story_id) || !ledger.candidates.some((c) => c.id === story.story_id))
      throw new Error('Artwork must belong to one selected candidate.');
    ids.add(story.story_id);
    const order = ['pending', 'generated', 'reviewed', 'uploaded'];
    let highest = -1;
    for (const event of story.history) {
      if (event.stage === 'blocked') continue;
      const rank = order.indexOf(event.stage);
      if (rank > highest + 1)
        throw new Error('Artwork history skips required production evidence.');
      highest = Math.max(highest, rank);
    }
    if (story.history.at(-1)?.stage !== story.stage)
      throw new Error('Artwork history must end at the recorded stage.');
    for (let i = 1; i < story.history.length; i++)
      if (Date.parse(story.history[i].at) < Date.parse(story.history[i - 1].at))
        throw new Error('Artwork history must be chronological.');
    if (story.stage === 'blocked' && !story.blocker)
      throw new Error('Blocked artwork requires the failed stage, error and next action.');
    if (story.stage !== 'blocked' && story.blocker)
      throw new Error('Clear the blocker when artwork resumes; retain the history.');
    if (
      ['generated', 'reviewed', 'uploaded'].includes(story.stage) &&
      (!story.brief_path || !story.generation_key || !story.candidates.length)
    )
      throw new Error('Generated artwork requires exact brief/key and real candidate evidence.');
    if (['reviewed', 'uploaded'].includes(story.stage) && (!story.review_path || !story.asset))
      throw new Error('Reviewed artwork requires the review and final asset evidence.');
    if (
      story.stage === 'uploaded' &&
      (!story.asset?.git_blob_sha || !story.asset.read_back_revision)
    )
      throw new Error('Uploaded artwork requires committed blob and read-back revision.');
  }
  if (ledger.publication.mode === 'publication') {
    if (Object.values(progress.capabilities).some((c) => c.status !== 'available'))
      throw new Error('Publication artwork capabilities remain blocked or unverified.');
    for (const id of ledger.publication.story_ids)
      if (!progress.stories.some((s) => s.story_id === id && s.stage === 'uploaded'))
        throw new Error(`${id}: publication artwork is not uploaded.`);
  }
}

export function preserveArtwork(previous: Ledger, next: Ledger) {
  if (!previous.artwork) return;
  if (!next.artwork) throw new Error('Artwork checkpoint evidence cannot be removed.');
  for (const old of previous.artwork.stories) {
    const current = next.artwork.stories.find((s) => s.story_id === old.story_id);
    if (!current || !isDeepStrictEqual(old.history, current.history.slice(0, old.history.length)))
      throw new Error('Preserve previous artwork stage history.');
    if (old.generation_key === current.generation_key) {
      if (!isDeepStrictEqual(old.candidates, current.candidates.slice(0, old.candidates.length)))
        throw new Error('Preserve generated candidates on unchanged-input recovery.');
      const stages = ['pending', 'generated', 'reviewed', 'uploaded'];
      const completed = old.history.filter((h) => h.stage !== 'blocked').at(-1)?.stage ?? 'pending';
      if (current.stage !== 'blocked' && stages.indexOf(current.stage) < stages.indexOf(completed))
        throw new Error('Resume at the unfinished stage; unchanged artwork must not regenerate.');
      if (old.asset) {
        const pixels = (asset: typeof old.asset | undefined) =>
          asset && {
            path: asset.path,
            sha256: asset.sha256,
            width: asset.width,
            height: asset.height,
          };
        if (!isDeepStrictEqual(pixels(old.asset), pixels(current.asset)))
          throw new Error('Preserve reviewed bytes during upload recovery.');
      }
    }
  }
}
