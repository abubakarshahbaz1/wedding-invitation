// Downloads the original invitation artwork and music from the reference site
// into public/assets/ under clean filenames. Existing files are never overwritten.
//
//   npm run assets
//
// Requires Node 18+ (built-in fetch) and network access.

import { mkdir, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ORIGIN = 'https://card-olive-pi.vercel.app';
const OUT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../public/assets');

// local filename  ->  original file on the reference site
const FILES = {
  'walima.png': 'Walima.png',
  'alfaaz.mp3': 'Alfaaz (Lyrics) - Hamza Malik & Zain Zohaib [zO0y9LR9kpE] (mp3cut.net).mp3',
};

const exists = (file) => access(file).then(() => true, () => false);

await mkdir(OUT_DIR, { recursive: true });
let failed = 0;

for (const [local, remote] of Object.entries(FILES)) {
  const target = path.join(OUT_DIR, local);
  if (await exists(target)) {
    console.log(`skip     ${local} (already exists)`);
    continue;
  }
  const url = `${ORIGIN}/${encodeURIComponent(remote)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    await writeFile(target, buffer);
    console.log(`saved    ${local} (${(buffer.length / 1024).toFixed(0)} KB)`);
  } catch (error) {
    failed += 1;
    console.error(`FAILED   ${local} <- ${url}\n         ${error.message}`);
  }
}

if (failed) {
  console.error(`\n${failed} file(s) could not be downloaded. Add them to public/assets/ manually.`);
  process.exit(1);
}
console.log('\nAll assets are in public/assets/.');
