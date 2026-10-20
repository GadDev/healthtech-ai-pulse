import { mkdir, readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

// favicon.svg is the single editable master. Raster assets intentionally ignore
// its dark-mode media query: launchers need an opaque, self-contained tile.
const source = await readFile(new URL('../public/favicon.svg', import.meta.url), 'utf8');
const artwork = source
  .replace(/<style>[\s\S]*?<\/style>/, '')
  .replaceAll('class="page"', 'fill="#ffffff"')
  .replaceAll('class="signal"', 'fill="#ffffff"')
  .replace(/<\/?svg[^>]*>/g, '')
  .trim();

function tile(maskable = false) {
  // Maskable artwork sits inside the central circle of radius 40% of width.
  const transform = maskable ? 'translate(8 8) scale(.75)' : '';
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">` +
      `<rect width="64" height="64" fill="#344f51"/>` +
      `<g transform="${transform}">${artwork}</g></svg>`,
  );
}

const root = new URL('../public/', import.meta.url);
await mkdir(new URL('icons/', root), { recursive: true });
for (const [name, size, maskable] of [
  ['apple-touch-icon.png', 180, false],
  ['icons/app-192.png', 192, false],
  ['icons/app-512.png', 512, false],
  ['icons/maskable-512.png', 512, true],
]) {
  await sharp(tile(maskable))
    .resize(size, size)
    .removeAlpha()
    .png()
    .toFile(new URL(name, root).pathname);
}

// ICO directory followed by PNG frames; each size is rasterised independently.
// The tile keeps the fallback readable on both light and dark browser chrome.
const sizes = [16, 32, 48];
const frames = [];
for (const size of sizes) frames.push(await sharp(tile()).resize(size, size).png().toBuffer());
const directory = Buffer.alloc(6 + 16 * frames.length);
directory.writeUInt16LE(1, 2);
directory.writeUInt16LE(frames.length, 4);
let offset = directory.length;
for (const [index, frame] of frames.entries()) {
  const entry = 6 + index * 16;
  directory[entry] = sizes[index];
  directory[entry + 1] = sizes[index];
  directory.writeUInt16LE(1, entry + 4);
  directory.writeUInt16LE(32, entry + 6);
  directory.writeUInt32LE(frame.length, entry + 8);
  directory.writeUInt32LE(offset, entry + 12);
  offset += frame.length;
}
await writeFile(new URL('favicon.ico', root), Buffer.concat([directory, ...frames]));
console.log('Generated touch/app icons and 16/32/48px ICO from public/favicon.svg.');
