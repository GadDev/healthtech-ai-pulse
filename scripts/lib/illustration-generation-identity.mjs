import { createHash } from 'node:crypto';
import { existsSync, realpathSync } from 'node:fs';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';

const hash = /^[a-f0-9]{64}$/;
export const sha256 = (value) => createHash('sha256').update(value).digest('hex');

export function resolveRepositoryPath(root, path) {
  if (typeof path !== 'string' || !path || isAbsolute(path))
    throw new Error('Expected a repository-relative path.');
  const boundary = realpathSync(root);
  const target = resolve(boundary, path);
  const escapes = (p) => {
    const value = relative(boundary, p);
    return value === '..' || value.startsWith(`..${sep}`) || isAbsolute(value);
  };
  if (target === boundary || escapes(target)) throw new Error('Path escapes repository.');
  let ancestor = target;
  while (!existsSync(ancestor)) ancestor = dirname(ancestor);
  if (escapes(realpathSync(ancestor))) throw new Error('Symlink escapes repository.');
  return target;
}

export function buildGenerationIdentity({
  story_id,
  story_source_sha256,
  brief_sha256,
  policy_sha256,
  version = 'healthtech-1.0',
  candidate_count,
  generator,
  model_snapshot = null,
}) {
  if (!/^\d{4}-\d{2}-\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(story_id || ''))
    throw new Error('Invalid story ID.');
  if (
    ![story_source_sha256, brief_sha256, policy_sha256].every(
      (value) => typeof value === 'string' && hash.test(value),
    )
  )
    throw new Error('Identity requires exact SHA-256 fingerprints.');
  if (version !== 'healthtech-1.0') throw new Error('Unsupported illustration contract.');
  if (!Number.isSafeInteger(candidate_count) || candidate_count < 1)
    throw new Error('Candidate count must be a positive safe integer.');
  if (typeof generator !== 'string' || !generator.trim())
    throw new Error('Record the actual generator surface.');
  if (model_snapshot !== null && (typeof model_snapshot !== 'string' || !model_snapshot.trim()))
    throw new Error('Model snapshot must be a real identifier or null.');
  const fields = {
    story_id,
    story_source_sha256,
    brief_sha256,
    policy_sha256,
    version,
    candidate_count,
    generator: generator.trim(),
    model_snapshot: model_snapshot === null ? null : model_snapshot.trim(),
  };
  return { ...fields, generation_key: sha256(JSON.stringify(Object.values(fields))) };
}
