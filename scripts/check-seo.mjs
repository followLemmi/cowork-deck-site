/* A build gate for the four mistakes that are invisible in a browser and
 * expensive in a search result: a missing canonical, a missing or duplicated
 * description, a broken internal link, and an image with no alt text.
 *
 * It runs against `dist/`, after the build, in CI. Deliberately not a
 * linter — it asserts a short list of things that must be true of every page,
 * and it fails the deploy rather than printing a warning nobody reads. */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs'
import { join, extname } from 'node:path'

const DIST = 'dist'
const problems = []

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : join(dir, e.name),
  )
}

const files = walk(DIST)
const pages = files.filter((f) => f.endsWith('.html'))
const descriptions = new Map()
const titles = new Map()

for (const file of pages) {
  const html = readFileSync(file, 'utf8')
  const route = '/' + file.slice(DIST.length + 1).replace(/index\.html$/, '')
  const isError = route.startsWith('/404')

  const title = html.match(/<title>([^<]*)<\/title>/)?.[1]
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1]
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1]

  if (!title) problems.push(`${route}: no <title>`)
  if (!desc) problems.push(`${route}: no meta description`)
  if (!canonical && !isError) problems.push(`${route}: no canonical link`)
  if (desc && desc.length > 165) problems.push(`${route}: description is ${desc.length} characters; over 165 gets truncated`)

  /* Two pages with the same description are two pages competing for the same
     result, and Google picks one. */
  if (!isError) {
    if (desc) {
      if (descriptions.has(desc)) problems.push(`${route}: description duplicates ${descriptions.get(desc)}`)
      else descriptions.set(desc, route)
    }
    if (title) {
      if (titles.has(title)) problems.push(`${route}: <title> duplicates ${titles.get(title)}`)
      else titles.set(title, route)
    }
  }

  /* Exactly one h1 per page: none is a page with no subject, several is a page
     with several. */
  const h1s = html.match(/<h1[\s>]/g)?.length ?? 0
  if (h1s !== 1) problems.push(`${route}: ${h1s} <h1> elements, expected 1`)

  for (const img of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt=/.test(img[0])) problems.push(`${route}: <img> with no alt attribute`)
  }

  /* Internal links must resolve to something in dist. A 404 reached from the
     nav is the cheapest way to waste a crawl. */
  for (const link of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = link[1]
    const candidates = [
      join(DIST, href),
      join(DIST, href, 'index.html'),
      join(DIST, href.replace(/\/$/, '') + '.html'),
    ]
    const found = candidates.some((c) => existsSync(c) && statSync(c).isFile())
    const isDir = existsSync(join(DIST, href)) && statSync(join(DIST, href)).isDirectory()
    if (!found && !isDir) problems.push(`${route}: broken internal link to ${href}`)
  }

  for (const src of html.matchAll(/(?:src|content)="(\/(?:img|og)\/[^"]+)"/g)) {
    if (!existsSync(join(DIST, src[1]))) problems.push(`${route}: missing asset ${src[1]}`)
  }
}

/* The files that only matter if they are there. */
for (const required of ['robots.txt', 'sitemap-index.xml', 'llms.txt', 'rss.xml', 'CNAME', 'favicon.svg', 'og/default.png']) {
  if (!existsSync(join(DIST, required))) problems.push(`missing ${required}`)
}

/* Nothing on a page should out-weigh the page. */
for (const asset of files.filter((f) => ['.png', '.webp', '.jpg', '.gif'].includes(extname(f)))) {
  const kb = statSync(asset).size / 1024
  if (kb > 400) problems.push(`${asset.slice(DIST.length)} is ${kb.toFixed(0)} KB; over 400 KB for one image`)
}

console.log(`checked ${pages.length} pages`)
if (problems.length) {
  console.error(`\n${problems.length} problem(s):`)
  for (const p of problems) console.error(`  ✗ ${p}`)
  process.exit(1)
}
console.log('✓ no problems')
