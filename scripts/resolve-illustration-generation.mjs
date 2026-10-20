import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { z } from 'astro/zod';
import { storySchema, reviewSchema } from '../src/lib/editorial-schema.mjs';
import { markdown } from './lib/content.mjs';
import {
  buildGenerationIdentity,
  resolveRepositoryPath,
  sha256,
} from './lib/illustration-generation-identity.ts';

const text = z.string().trim().min(1);
const briefSchema = z
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

export function resolveIllustrationGeneration(root, options) {
  const id = options.storyId;
  if (!/^\d{4}-\d{2}-\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id || ''))
    throw new Error('Use a dated canonical story ID.');
  const sourcePath = resolveRepositoryPath(root, `src/content/stories/${id}.md`);
  const source = readFileSync(sourcePath);
  const story = storySchema.parse(markdown(source.toString('utf8')).data);
  if (story.candidateId !== id) throw new Error('Story ID does not match its candidate.');
  if (story.draft) throw new Error('Finalize the English story before illustration decisions.');
  if (story.illustration.mode === 'none')
    return { decision: 'NONE', reason: 'optional-illustration-none', story_id: id };
  if (!options.briefPath) throw new Error('--brief is required for generated imagery.');
  const briefBytes = readFileSync(resolve(root, options.briefPath));
  const brief = briefSchema.parse(JSON.parse(briefBytes.toString('utf8')));
  if (brief.story_id !== id) throw new Error('Brief belongs to another story.');
  for (const reference of brief.references || []) {
    const bytes = readFileSync(resolveRepositoryPath(root, reference.path));
    if (sha256(bytes) !== reference.sha256)
      throw new Error(`Reference changed; refresh the brief and review: ${reference.path}`);
  }
  const identity = buildGenerationIdentity({
    story_id: id,
    story_source_sha256: sha256(source),
    brief_sha256: sha256(briefBytes),
    policy_sha256: sha256(readFileSync(resolveRepositoryPath(root, 'docs/EDITORIAL.md'))),
    candidate_count: options.candidateCount ?? 1,
    generator: options.generatorSurface,
    model_snapshot: options.modelSnapshot ?? null,
  });
  const base = { story_id: id, expected_identity: identity, requires_batch_validation: true };
  const reviewPath = resolveRepositoryPath(root, story.illustration.reviewPath);
  if (!existsSync(reviewPath)) return { ...base, decision: 'GENERATE', reason: 'review-missing' };
  const review = reviewSchema.parse(JSON.parse(readFileSync(reviewPath, 'utf8')));
  if (buildGenerationIdentity(review).generation_key !== review.generation_key)
    throw new Error('Existing review has an invalid generation key; repair it explicitly.');
  if (review.story_id !== id) throw new Error('Review belongs to another story.');
  if (review.generation_key !== identity.generation_key || review.crop !== brief.crop)
    return { ...base, decision: 'GENERATE', reason: 'generation-inputs-changed' };
  const assetPath = resolveRepositoryPath(root, `public${story.illustration.image}`);
  if (!existsSync(assetPath)) return { ...base, decision: 'GENERATE', reason: 'asset-missing' };
  const asset = readFileSync(assetPath);
  if (asset.subarray(0, 4).toString() !== 'RIFF' || asset.subarray(8, 12).toString() !== 'WEBP')
    throw new Error('Existing asset is not a WebP container.');
  if (sha256(asset) !== review.asset_sha256)
    return { ...base, decision: 'GENERATE', reason: 'asset-bytes-changed' };
  return {
    ...base,
    decision: 'REUSE',
    reason: 'identity-and-asset-match',
    asset: story.illustration.image,
  };
}

export function parseGenerationArguments(args) {
  const names = new Map([
    ['--story', 'storyId'],
    ['--brief', 'briefPath'],
    ['--generator-surface', 'generatorSurface'],
    ['--candidate-count', 'candidateCount'],
    ['--model-snapshot', 'modelSnapshot'],
  ]);
  const options = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--json') {
      options.json = true;
      continue;
    }
    if (args[i] === '--help' || args[i] === '-h') {
      options.help = true;
      continue;
    }
    const name = names.get(args[i]);
    if (!name || Object.hasOwn(options, name) || !args[i + 1] || args[i + 1].startsWith('--'))
      throw new Error(`Invalid or repeated argument: ${args[i]}`);
    options[name] = args[++i];
  }
  if (options.candidateCount !== undefined) {
    if (
      !/^[1-9][0-9]*$/.test(options.candidateCount) ||
      !Number.isSafeInteger(Number(options.candidateCount))
    )
      throw new Error('--candidate-count must be a positive safe integer.');
    options.candidateCount = Number(options.candidateCount);
  }
  return options;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const options = parseGenerationArguments(process.argv.slice(2));
    if (options.help)
      console.log(
        'Usage: npm run illustration:decision -- --story <id> [--brief <file.json> --generator-surface <actual-tool> --candidate-count <n> --model-snapshot <actual-id>] [--json]',
      );
    else
      console.log(JSON.stringify(resolveIllustrationGeneration(process.cwd(), options), null, 2));
  } catch (error) {
    console.error(JSON.stringify({ error: 'decision-blocked', message: error.message }));
    process.exitCode = 2;
  }
}