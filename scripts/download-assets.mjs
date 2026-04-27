import { createWriteStream, mkdirSync, existsSync } from 'fs';
import { pipeline } from 'stream/promises';
import path from 'path';

const BASE = process.cwd();

const assets = [
  // Logo
  { url: 'https://romeocouture.com/images/logo-default.png', dest: 'public/images/logo-default.png' },
  // Slide decoration
  { url: 'https://romeocouture.com/images/slide-title-border.png', dest: 'public/images/slide-title-border.png' },
  // Icons
  { url: 'https://romeocouture.com/images/icons/arrow-right.svg', dest: 'public/images/icons/arrow-right.svg' },
  { url: 'https://romeocouture.com/images/icons/envelope.svg', dest: 'public/images/icons/envelope.svg' },
  { url: 'https://romeocouture.com/images/icons/phone.svg', dest: 'public/images/icons/phone.svg' },
  // Parallax background
  { url: 'https://romeocouture.com/images/tours/defile-malaga-1.jpg', dest: 'public/images/tours/defile-malaga-1.jpg' },
  // Videos
  { url: 'https://romeocouture.com/videos/video-collection-13.mp4', dest: 'public/videos/video-collection-13.mp4' },
  { url: 'https://romeocouture.com/videos/video-pres-a-porter.mp4', dest: 'public/videos/video-pres-a-porter.mp4' },
  { url: 'https://romeocouture.com/videos/video-collection-7.mp4', dest: 'public/videos/video-collection-7.mp4' },
  { url: 'https://romeocouture.com/videos/video-collection-14.mp4', dest: 'public/videos/video-collection-14.mp4' },
  // Favicons
  { url: 'https://romeocouture.com/favicon/favicon.ico', dest: 'public/seo/favicon.ico' },
  { url: 'https://romeocouture.com/favicon/favicon-32x32.png', dest: 'public/seo/favicon-32x32.png' },
  { url: 'https://romeocouture.com/favicon/favicon-96x96.png', dest: 'public/seo/favicon-96x96.png' },
  { url: 'https://romeocouture.com/favicon/apple-icon-180x180.png', dest: 'public/seo/apple-icon-180x180.png' },
  { url: 'https://romeocouture.com/favicon/android-icon-192x192.png', dest: 'public/seo/android-icon-192x192.png' },
];

async function download(url, destRel) {
  const dest = path.join(BASE, destRel);
  const dir = path.dirname(dest);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`  SKIP ${url} (${res.status})`);
    return;
  }
  await pipeline(res.body, createWriteStream(dest));
  console.log(`  ✓ ${destRel}`);
}

// Batch 4 at a time
async function batchDownload(items, batchSize = 4) {
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    await Promise.all(batch.map(({ url, dest }) => download(url, dest).catch(e => console.warn(`  ERR ${url}: ${e.message}`))));
  }
}

console.log('Downloading assets...');
await batchDownload(assets);
console.log('Done.');
