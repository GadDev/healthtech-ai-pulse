import { readFileSync } from 'node:fs';
import { resolveRepositoryPath, sha256 } from './illustration-generation-identity.ts';

// Exact, unchanged review records at main 45f94e7463883353304d1d3c216d8bd9705790f3.
// These are historical provenance, never new approvals or permission to change pixels.
const reviews = new Map([
  [
    '2026-10-12-clinical-ai-language-evidence',
    'ac421b7da41cd076245eff1d12816b3c263fb835085d7c746be329c5a5b9e632',
  ],
  [
    '2026-10-13-epilepsy-feedback-replay',
    'bdccf1da20d8095fcfd37bf961d5343f4bf1608a3bcdcf43f4c1b627543de242',
  ],
  [
    '2026-10-19-oncology-ai-ehr-handoff',
    '38c21b765913541aee35248ceb8755a39fc403863a2ca25e44df349ac13cd4ec',
  ],
  [
    '2026-10-20-astrazeneca-oracle-trials-agreement',
    '3af70abf3b3553de70da03428e0f0f3adc16cb6d0c7fdc3f88fcae8f6bfe31c9',
  ],
  [
    '2026-10-21-expertise-automation-bias-neonatal-imaging',
    '07a9e1ee2d7e58030838a1d9faa28248d4a171e44228fa593c27c2515fb6b5e0',
  ],
  [
    '2026-10-21-fda-ai-device-change-plan-examples',
    'fd1e653cc05d0239a32c9514e8e0650d2e278ed45d6890d1398412ab4a0285e5',
  ],
  [
    '2026-10-22-tga-digital-scribe-review',
    '9c0f7c6f85def7ac911556c0231ddb0f9e78a0de3c36723a3d6d30d9d3bc8437',
  ],
  [
    '2026-10-23-dynavelo-b-cell-rescue-predictions',
    'd324af1b0f4e2fad3c44a555f2f8c644d61df41c5dae54c2e8335beb1cf55e50',
  ],
  [
    '2026-10-24-head-ct-ai-advice-reliance',
    'f529dac7b63961d1d1a7a1fa44a2dc5dcfd44ad9f6281ac15fa1ff60feda21dc',
  ],
  [
    '2026-10-24-microsoft-sequential-diagnosis-benchmark',
    'e280602f886445d94d460355186593de06275ba45e6680772c46d9a857d163eb',
  ],
]);

// Only these exact old → new renderer bytes are compatible. No geometry/CSS change.
const renderers = new Map([
  [
    'src/pages/stories/[...id].astro',
    [
      '2c088b58c041762930eb35c4c3fa66578123c0e10ad36b0c79b8a60e3c369ca5',
      '2efd4b344a56c65b8022d0374bf3b3a31e9b20fbb22ce1e7472a3c69e6133f77',
    ],
  ],
  [
    'src/components/StoryList.astro',
    [
      '2b23835997f9887f42d46b6ae98d4718ded2e8e8347ecf4b61aac51b8e3bfbed',
      '4df3eca273190968c9e1e8272c25c6fae623c347007c817225b427255c425dc3',
    ],
  ],
  [
    'src/pages/index.astro',
    [
      '35b280e2359b32c8514707b8884f0f37ec0142b480ba46dc247d4798e44fc7e6',
      '38ebf8e4ec99f3a6fcf67ed4176e1f219744fe3c3df7f1241c04ce11b190bb47',
    ],
  ],
]);

export function preservedRendererReference(
  root: string,
  storyId: string,
  briefBytes: Buffer,
  reference: { path: string; sha256: string },
  currentHash: string,
) {
  const pair = renderers.get(reference.path);
  if (!pair || pair[0] !== reference.sha256 || pair[1] !== currentHash) return false;
  try {
    const read = (path: string) => readFileSync(resolveRepositoryPath(root, path));
    const reviewBytes = read(`docs/editorial/illustrations/reviews/${storyId}.json`);
    if (reviews.get(storyId) !== sha256(reviewBytes)) return false;
    const review = JSON.parse(reviewBytes.toString('utf8'));
    return (
      review.brief_sha256 === sha256(briefBytes) &&
      review.story_source_sha256 === sha256(read(`src/content/stories/${storyId}.md`)) &&
      review.asset_sha256 === sha256(read(`public/images/stories/${storyId}.webp`))
    );
  } catch {
    return false;
  }
}
