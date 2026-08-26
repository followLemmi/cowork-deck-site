/* Structured data, built from `site.ts` rather than written out by hand.
 *
 * What each node is for, since none of them are decorative:
 *   SoftwareApplication  — the one that can produce a rich result for a
 *                          downloadable app: name, platforms, price, licence.
 *   WebSite              — declares the site as a single entity so Google
 *                          attributes every page to it.
 *   BreadcrumbList       — the trail Google prints under a result instead of
 *                          the raw URL.
 *   FAQPage              — question-and-answer results, and the node that AI
 *                          answer engines lift from most readily.
 */
import { SITE } from './site'

export const person = {
  '@type': 'Person',
  name: SITE.author.name,
  url: SITE.author.url,
}

export const softwareApplication = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  '@id': `${SITE.url}/#app`,
  name: SITE.name,
  alternateName: 'cowork deck',
  applicationCategory: 'DeveloperApplication',
  applicationSubCategory: 'Terminal multiplexer for AI coding agents',
  operatingSystem: 'macOS, Linux, Windows (from source)',
  description: SITE.description,
  url: SITE.url,
  downloadUrl: SITE.releases,
  installUrl: `${SITE.url}/install/`,
  softwareHelp: `${SITE.url}/faq/`,
  releaseNotes: `${SITE.url}/changelog/`,
  license: SITE.licenseUrl,
  isAccessibleForFree: true,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: person,
  maintainer: person,
  screenshot: [
    `${SITE.url}/img/deck.webp`,
    `${SITE.url}/img/zoom.webp`,
    `${SITE.url}/img/board.webp`,
  ],
  featureList: [
    'Many Claude Code sessions as tiles in one window',
    'Live session state from Claude Code hooks',
    'A separate GitHub account per workspace',
    'A board reading markdown cards or GitHub issues',
    'Pull requests with checks and diffs',
    'Saved prompts as scenarios, with schedules',
    'A run journal of every session',
    'Settings that sync to your own private repository',
  ],
  softwareRequirements: 'Claude Code, and the GitHub CLI for GitHub features',
  programmingLanguage: ['Rust', 'TypeScript'],
}

export const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  inLanguage: 'en',
  publisher: person,
}

export function breadcrumbs(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: step.name,
      item: new URL(step.path, SITE.url).href,
    })),
  }
}

export function faqPage(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}

export function techArticle(opts: {
  headline: string
  description: string
  path: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: opts.headline,
    description: opts.description,
    url: new URL(opts.path, SITE.url).href,
    image: opts.image ? new URL(opts.image, SITE.url).href : undefined,
    author: person,
    publisher: person,
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE.url}/#website` },
    about: { '@id': `${SITE.url}/#app` },
  }
}
