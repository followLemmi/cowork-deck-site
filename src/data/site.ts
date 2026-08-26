/* One place for every fact the pages and the structured data both assert.
 *
 * The rule that keeps this honest: nothing here is written twice. A page that
 * needs the repository URL, the licence or the supported platforms reads it
 * from this module, and so does the JSON-LD in the layout — so a page and the
 * machine-readable description of that page cannot disagree. */

export const SITE = {
  url: 'https://coworkdeck.dev',
  name: 'cowork-deck',
  /* The one-line answer to "what is this", reused as the default meta
     description and as the JSON-LD `description`. Kept under 155 characters so
     search results do not truncate it. */
  tagline: 'A desktop deck for running many Claude Code sessions at once',
  description:
    'Run many Claude Code sessions side by side in one window. Every tile is a real terminal with live state, and every workspace gets its own GitHub account.',
  repo: 'https://github.com/followLemmi/cowork-deck',
  releases: 'https://github.com/followLemmi/cowork-deck/releases',
  issues: 'https://github.com/followLemmi/cowork-deck/issues',
  latestReleaseUrl: 'https://github.com/followLemmi/cowork-deck/releases/latest',
  license: 'MIT',
  licenseUrl: 'https://github.com/followLemmi/cowork-deck/blob/main/LICENSE',
  author: {
    name: 'followLemmi',
    url: 'https://github.com/followLemmi',
  },
  platforms: ['macOS', 'Linux'],
  /* Windows has no published bundle yet; saying so is more useful than a badge
     that implies one exists. */
  platformsFromSource: ['Windows'],
} as const

export const NAV = [
  { href: '/features/', label: 'Features' },
  { href: '/install/', label: 'Install' },
  { href: '/design/', label: 'Design' },
  { href: '/changelog/', label: 'Changelog' },
  { href: '/faq/', label: 'FAQ' },
] as const

export type Feature = {
  slug: string
  title: string
  /* The <title> for the feature's own page; longer and more literal than the
     card title, because it is competing in a search result rather than on a
     grid. */
  pageTitle: string
  summary: string
  image?: { src: string; alt: string }
}
