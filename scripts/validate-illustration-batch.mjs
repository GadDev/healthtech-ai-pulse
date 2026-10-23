import sharp from 'sharp';
import { checkEditorial, inside } from './lib/editorial.ts';
import { documents } from './lib/content.ts';
import { storySchema } from '../src/lib/editorial-schema.ts';
// Shared healthcare validation checks every ledger, story and declared asset.
if (process.argv.length > 3) throw new Error('Expected at most one explicit ledger path.');
const root = process.cwd();
const result = checkEditorial(root, process.argv[2]);
for (const story of documents(`${root}/src/content/stories`)) {
  const { illustration: image } = storySchema.parse(story.data);
  if (image.mode !== 'generated') continue;
  const decoder = sharp(inside(root, `public${image.image}`));
  const metadata = await decoder.metadata();
  await decoder.raw().toBuffer();
  if (
    metadata.format !== 'webp' ||
    (image.width && metadata.width !== image.width) ||
    (image.height && metadata.height !== image.height)
  )
    throw new Error(`${story.id}: decoded WebP dimensions disagree with frontmatter`);
}
console.log('Illustration decoding and publication mappings passed:', result);
