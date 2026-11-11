import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, extname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { chromium } from '@playwright/test';

interface ContactSheetOptions {
  storyId: string;
  output: string;
  crop: 'wide' | 'square' | 'landscape';
  references: string[];
  candidates: string[];
  help?: boolean;
}

type ImageRecord = { label: string; path: string; name: string; url: string };

export function parseContactSheetArguments(args: string[]): ContactSheetOptions {
  const options = {
    references: [] as string[],
    candidates: [] as string[],
    crop: 'wide',
    storyId: '',
    output: '',
    help: false,
  };
  const names = new Map<string, 'storyId' | 'output' | 'crop'>([
    ['--story', 'storyId'],
    ['--out', 'output'],
    ['--crop', 'crop'],
  ]);
  const seen = new Set();
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--help' || arg === '-h') {
      options.help = true;
      continue;
    }
    if (arg === '--reference' || names.has(arg)) {
      const value = args[++i];
      if (!value || value.startsWith('--')) throw new Error(`Missing value for ${arg}`);
      if (arg === '--reference') options.references.push(value);
      else {
        if (seen.has(arg)) throw new Error(`Repeated option: ${arg}`);
        seen.add(arg);
        options[names.get(arg)!] = value;
      }
    } else if (arg.startsWith('-')) throw new Error(`Unknown option: ${arg}`);
    else options.candidates.push(arg);
  }
  if (options.help) return options as ContactSheetOptions;
  if (
    !/^\d{4}-\d{2}-\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(options.storyId || '') ||
    !options.output ||
    !options.candidates.length
  )
    throw new Error('Provide a dated --story, --out and at least one candidate.');
  if (!['wide', 'square', 'landscape'].includes(options.crop)) throw new Error('Unknown crop.');
  if (extname(options.output).toLowerCase() !== '.png')
    throw new Error('Contact sheet output must be PNG.');
  const output = resolve(options.output);
  if ([...options.references, ...options.candidates].some((p) => resolve(p) === output))
    throw new Error('Contact sheet must not overwrite an input image.');
  if (existsSync(output))
    throw new Error('Contact sheet output already exists; choose a new review path.');
  return options as ContactSheetOptions;
}

function imageRecord(input: string, label: string): ImageRecord {
  const path = resolve(input);
  if (!existsSync(path)) {
    throw new Error(`Image does not exist: ${path}`);
  }
  const mimeType: string | undefined = (
    {
      '.webp': 'image/webp',
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
    } as Record<string, string>
  )[extname(path).toLowerCase()];
  if (!mimeType) throw new Error(`Unsupported image format: ${path}`);
  return {
    label,
    path,
    name: basename(path),
    url: `data:${mimeType};base64,${readFileSync(path).toString('base64')}`,
  };
}

function cards(records: ImageRecord[], type: 'reference' | 'candidate') {
  return records
    .map(
      (record) => `
      <figure class="candidate ${type}">
        <div class="label">${record.label}</div>
        <div class="frame"><img src="${record.url}" alt="${type} ${record.label}" /></div>
        <figcaption>${escapeHtml(record.name)}</figcaption>
      </figure>`,
    )
    .join('');
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

export function buildContactSheetHtml(options: ContactSheetOptions) {
  if (
    !Array.isArray(options.candidates) ||
    !options.candidates.length ||
    !Array.isArray(options.references)
  )
    throw new Error('Provide at least one candidate and an optional reference list.');
  const references = options.references.map((path, i) => imageRecord(path, `R${i + 1}`));
  const candidates = options.candidates.map((path, i) => imageRecord(path, `C${i + 1}`));
  const ratios = { wide: '16 / 9', square: '1', landscape: '3 / 2' };
  if (!Object.hasOwn(ratios, options.crop)) throw new Error('Unknown crop.');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src data:; style-src 'unsafe-inline'" />
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 48px;
    background: #f3ebdd;
    color: #171715;
    font-family: Arial, Helvetica, sans-serif;
  }
  header { margin-bottom: 30px; }
  h1 { margin: 0 0 8px; font: 700 30px Georgia, serif; }
  header p { margin: 0; color: #67625b; max-width: 1000px; line-height: 1.45; }
  section { margin-top: 36px; }
  h2 {
    margin: 0 0 16px;
    font: 700 14px ui-monospace, SFMono-Regular, Menlo, monospace;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px;
  }
  .candidate {
    position: relative;
    margin: 0;
    padding: 16px;
    background: #f8f3ea;
    border: 1px solid #d9cfc0;
  }
  .reference { background: #eee6d8; }
  .label {
    position: absolute;
    z-index: 2;
    top: 28px;
    left: 28px;
    display: grid;
    place-items: center;
    min-width: 38px;
    height: 34px;
    padding: 0 9px;
    border-radius: 999px;
    background: #171715;
    color: #f8f3ea;
    font-weight: 700;
  }
  .reference .label { background: #8a4b35; }
  .frame {
    aspect-ratio: ${ratios[options.crop]};
    overflow: hidden;
    background: #eee4d5;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
  figcaption {
    margin-top: 10px;
    color: #67625b;
    font: 12px ui-monospace, SFMono-Regular, Menlo, monospace;
  }
  .question {
    margin-top: 22px;
    padding: 18px 20px;
    border-left: 4px solid #8a4b35;
    background: #faf6ee;
    font: italic 19px Georgia, serif;
    line-height: 1.4;
  }
</style>
</head>
<body>
<header>
  <h1>${escapeHtml(options.storyId)}</h1>
  <p>HealthTech AI Pulse visual review — inspect abstraction, crop, contrast and unsupported medical implications. This sheet does not approve the image or establish clinical evidence.</p>
</header>
${references.length ? `<section><h2>Supplied comparison references</h2><div class="grid">${cards(references, 'reference')}</div></section>` : '<p>No comparison references supplied.</p>'}
<section>
  <h2>New candidates</h2>
  <div class="grid">${cards(candidates, 'candidate')}</div>
</section>
<div class="question">Would the selected candidate look intentionally commissioned for the same publication if the headline, company name and metadata were removed?</div>
</body>
</html>`;
}

export async function renderContactSheet(options: ContactSheetOptions) {
  if (extname(options.output).toLowerCase() !== '.png')
    throw new Error('Contact sheet output must be PNG.');
  // Recheck output ownership when invoked programmatically as well as through CLI.
  const inputs = [...options.references, ...options.candidates].map((p) => resolve(p));
  if (inputs.includes(resolve(options.output)) || existsSync(options.output))
    throw new Error('Contact sheet output would overwrite an existing file.');
  const html = buildContactSheetHtml(options);
  const browser = await chromium.launch({
    headless: true,
    executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH || undefined,
  });
  try {
    const page = await browser.newPage({
      viewport: { width: 1600, height: 1400 },
      deviceScaleFactor: 1,
    });
    await page.route('**/*', (route) => route.abort());
    await page.setContent(html, { waitUntil: 'load' });
    const loaded = await page.locator('img').evaluateAll((images) =>
      images.every((element) => {
        const image = element as HTMLImageElement;
        return image.complete && image.naturalWidth > 0;
      }),
    );
    if (!loaded) throw new Error('Contact sheet contains an image that could not be decoded.');
    const bytes = await page.screenshot({ fullPage: true, type: 'png' });
    writeFileSync(resolve(options.output), bytes, { flag: 'wx' });
    return resolve(options.output);
  } finally {
    await browser.close();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const options = parseContactSheetArguments(process.argv.slice(2));
    if (options.help)
      console.log(
        'Usage: npm run illustration:contact-sheet -- --story <id> --out <new.png> [--crop wide|square|landscape] [--reference <image> ...] <candidate> [more...]',
      );
    else console.log(`Contact sheet written to ${await renderContactSheet(options)}`);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
