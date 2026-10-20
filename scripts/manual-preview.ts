import { appendFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { policy } from './automatic-preview.ts';

type PreviewPR = {
  number?: number;
  state?: string;
  base?: { ref?: string; repo?: { id?: number; owner?: { id?: number }; full_name?: string } };
  head?: { sha?: string; repo?: { id?: number; full_name?: string } };
};

export function validateManualRequest(
  pr: PreviewPR,
  number: number | string,
  expectedHead?: string,
) {
  if (!/^[1-9][0-9]*$/.test(String(number)) || !Number.isSafeInteger(Number(number)))
    throw new Error('PR number must be a positive safe integer.');
  if (
    pr.number !== Number(number) ||
    pr.state !== 'open' ||
    pr.base?.ref !== 'main' ||
    pr.base?.repo?.id !== policy.repositoryId ||
    pr.head?.repo?.id !== policy.repositoryId ||
    pr.base?.repo?.owner?.id !== policy.ownerId ||
    pr.base?.repo?.full_name !== policy.repository ||
    pr.head?.repo?.full_name !== policy.repository ||
    !/^[0-9a-f]{40}$/.test(pr.head?.sha || '') ||
    (expectedHead !== undefined && pr.head.sha !== expectedHead)
  )
    throw new Error(
      'PR is closed, foreign, retargeted, or no longer matches the selected revision.',
    );
  return { headSha: pr.head.sha, channel: `pr-${number}` };
}

async function main() {
  const number = process.env.PR_NUMBER;
  // Validate the input before constructing an API path.
  if (!/^[1-9][0-9]*$/.test(number || '') || !Number.isSafeInteger(Number(number)))
    throw new Error('PR number must be a positive safe integer.');
  if (process.env.GITHUB_REPOSITORY !== policy.repository || !process.env.GITHUB_TOKEN)
    throw new Error('Missing trusted target repository context or GitHub token.');
  const response = await fetch(
    `https://api.github.com/repos/${policy.repository}/pulls/${number}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
      signal: AbortSignal.timeout(30000),
    },
  );
  if (!response.ok) throw new Error(`PR metadata request failed: ${response.status}`);
  const { headSha, channel } = validateManualRequest(
    await response.json(),
    number!,
    process.env.EXPECTED_HEAD_SHA,
  );
  appendFileSync(process.env.GITHUB_OUTPUT!, `head_sha=${headSha}\nchannel=${channel}\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  });
}
