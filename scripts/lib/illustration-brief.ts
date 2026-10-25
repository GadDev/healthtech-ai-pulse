import { readFileSync } from 'node:fs';
import { z } from 'astro/zod';
import { resolveRepositoryPath, sha256 } from './illustration-generation-identity.ts';

import { preservesSidebarRemovalReference } from './sidebar-removal-references.ts';

const text = z.string().trim().min(1);
export const briefSchema = z
  .object({
    story_id: text,
    verified_context: text,
    visual_idea: text,
    placement: text,
    crop: z.enum(['wide', 'square', 'landscape']),
    constraints: text.optional(),
    references: z
      .array(z.object({ path: text, sha256: z.string().regex(/^[a-f0-9]{64}$/) }).strict())
      .optional(),
  })
  .strict();

export function readIllustrationBrief(
  root: string,
  path: string,
  storyId: string,
  preservedReviewHash?: string,
) {
  const bytes = readFileSync(resolveRepositoryPath(root, path));
  const brief = briefSchema.parse(JSON.parse(bytes.toString('utf8')));
  if (brief.story_id !== storyId) throw new Error('Brief belongs to another story.');
  for (const reference of brief.references ?? []) {
    const current = readFileSync(resolveRepositoryPath(root, reference.path));
    if (
      sha256(current) !== reference.sha256 &&
      !preservesSidebarRemovalReference(
        storyId,
        preservedReviewHash,
        sha256(bytes),
        reference.path,
        reference.sha256,
        sha256(current),
      )
    )
      throw new Error(`Reference changed; refresh the brief and review: ${reference.path}`);
  }
  return { bytes, brief };
}
