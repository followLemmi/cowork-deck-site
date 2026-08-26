/* The release feed.
 *
 * Two reasons it exists beyond politeness: a feed is how the handful of people
 * who follow a tool closely actually hear about a release, and it is a
 * machine-readable statement that this site is still maintained — which is one
 * of the signals that decides how often a crawler comes back. */
import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { SITE } from '../data/site'
import { firstParagraph } from '../data/markdown'
import data from '../data/releases.json'

export const GET: APIRoute = () =>
  rss({
    title: `${SITE.name} releases`,
    description: `New versions of ${SITE.name} — ${SITE.tagline}.`,
    site: SITE.url,
    trailingSlash: true,
    items: data.releases.map((release) => ({
      title: `${SITE.name} ${release.tag}`,
      link: `/changelog/${release.tag}/`,
      pubDate: new Date(release.publishedAt),
      description: firstParagraph(release.body, 400),
    })),
    customData: '<language>en</language>',
  })
