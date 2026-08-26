/* Pulls the releases from GitHub at build time and writes them to
 * `src/data/releases.json`.
 *
 * Why at build time and not in the browser: a download button whose href is
 * fetched by JavaScript is a download button that search engines never see and
 * that fails when the API rate-limits. Baking it in means the page is correct
 * and complete as static HTML.
 *
 * Why the file is committed: a build with no network — or with a rate-limited
 * unauthenticated API, which is 60 requests an hour — must still produce a site
 * with a working download link. The committed copy is the floor, not the
 * source. The release workflow in the application repository re-triggers this
 * one, so the floor is rarely more than a release old.
 */
import { writeFile, readFile } from 'node:fs/promises'

const REPO = 'followLemmi/cowork-deck'
const OUT = new URL('../src/data/releases.json', import.meta.url)

/* The bundle types the releases page publishes, mapped to what a person
   actually needs to know before clicking. `match` runs against the asset
   name. */
const KINDS = [
  { id: 'macos-arm', label: 'macOS · Apple silicon', match: /aarch64.*\.dmg$|_aarch64\.dmg$/i },
  { id: 'macos-intel', label: 'macOS · Intel', match: /x64.*\.dmg$|_x64\.dmg$/i },
  { id: 'linux-appimage', label: 'Linux · AppImage', match: /\.AppImage$/i },
  { id: 'linux-deb', label: 'Linux · Debian and Ubuntu', match: /\.deb$/i },
  { id: 'linux-rpm', label: 'Linux · Fedora and RHEL', match: /\.rpm$/i },
]

async function fetchReleases() {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'coworkdeck-site-build' }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

  const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=30`, { headers })
  if (!res.ok) throw new Error(`GitHub API ${res.status} ${res.statusText}`)
  const raw = await res.json()

  return raw
    .filter((r) => !r.draft)
    .map((r) => ({
      tag: r.tag_name,
      name: r.name || r.tag_name,
      url: r.html_url,
      publishedAt: r.published_at,
      prerelease: r.prerelease,
      body: r.body || '',
      downloads: KINDS.flatMap((kind) => {
        const asset = (r.assets || []).find((a) => kind.match.test(a.name))
        return asset
          ? [{ id: kind.id, label: kind.label, name: asset.name, url: asset.browser_download_url, size: asset.size }]
          : []
      }),
    }))
}

let releases
try {
  releases = await fetchReleases()
  console.log(`[releases] fetched ${releases.length} release(s) from GitHub`)
} catch (err) {
  console.warn(`[releases] ${err.message} — falling back to the committed copy`)
  try {
    releases = JSON.parse(await readFile(OUT, 'utf8')).releases
  } catch {
    console.warn('[releases] no committed copy either; the site will link to the releases page')
    releases = []
  }
  process.exitCode = 0
}

await writeFile(
  OUT,
  JSON.stringify({ fetchedAt: new Date().toISOString(), repo: REPO, releases }, null, 2) + '\n',
)
console.log(`[releases] wrote ${releases.length} release(s)`)
