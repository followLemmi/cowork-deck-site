/* Derives every image the site serves from the app's own assets.
 *
 * Run by hand (`node scripts/make-assets.mjs`), not by the build: the sources
 * live in the application repository, which this one does not depend on. The
 * outputs are committed so a clone builds without them. */
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

const SRC = process.argv[2]
if (!SRC) throw new Error('usage: make-assets.mjs <path-to-cowork-deck-checkout>')

await mkdir('public/og', { recursive: true })

/* Social cards are 1200×630 by convention — the size Open Graph consumers
   assume when they lay out a large card. The screenshots are 1600×857, close
   enough in ratio that `cover` trims a few pixels of chrome rather than
   cutting into the content. */
const CARDS = {
  'default.png': 'deck.png',
  'sessions.png': 'zoom.png',
  'board.png': 'board.png',
  'issues.png': 'issues.png',
  'pull-requests.png': 'pull-requests.png',
  'workspaces.png': 'workspace-window.png',
}

for (const [out, src] of Object.entries(CARDS)) {
  await sharp(`${SRC}/docs/images/${src}`)
    .resize(1200, 630, { fit: 'cover', position: 'top' })
    .png({ quality: 90, compressionLevel: 9 })
    .toFile(`public/og/${out}`)
  console.log('og/' + out)
}

/* Icons. The 256px master downsamples cleanly to every size a browser asks
   for; 180 is Apple's touch icon, 32 the header mark. */
const ICON = `${SRC}/src-tauri/icons/128x128@2x.png`
for (const size of [32, 180, 192, 512]) {
  await sharp(ICON).resize(size, size).png().toFile(`public/icon-${size}.png`)
  console.log(`icon-${size}.png`)
}
await sharp(ICON).resize(180, 180).png().toFile('public/apple-touch-icon.png')
console.log('apple-touch-icon.png')
