/* Tells Bing and Yandex that pages changed, instead of waiting to be crawled.
 *
 * IndexNow is a one-request protocol: submit the URLs, prove ownership with a
 * key file served from the site root. Google does not participate — for Google
 * the sitemap and the crawl budget are the mechanism — but Bing picks changes
 * up in hours rather than weeks, and Bing is what several answer engines read.
 *
 * Failure here is never a failed deploy. The site is already published by the
 * time this runs; a search engine not being told is not a reason to go red. */
import { readFileSync } from 'node:fs'

const KEY = '4c1a3dd0c60b20abce05017ff042a1f2'
const HOST = 'coworkdeck.dev'

const sitemap = readFileSync('dist/sitemap-0.xml', 'utf8')
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])

if (urlList.length === 0) {
  console.warn('[indexnow] no URLs in the sitemap; nothing submitted')
  process.exit(0)
}

const res = await fetch('https://api.indexnow.org/IndexNow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList,
  }),
}).catch((err) => ({ ok: false, status: 0, statusText: err.message }))

console.log(`[indexnow] ${urlList.length} URL(s) → ${res.status} ${res.statusText || ''}`.trim())
