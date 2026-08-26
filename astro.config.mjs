// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

/* The canonical origin. Every absolute URL on the site — canonical tags, Open
   Graph images, the sitemap, the RSS feed, the JSON-LD — is derived from this
   one value, so moving the site is a one-line change rather than a sweep. */
export const SITE_URL = 'https://coworkdeck.dev'

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      // Pages that exist for machines, not for search results.
      filter: (page) => !page.includes('/404'),
      changefreq: 'weekly',
      lastmod: new Date(),
    }),
  ],
  vite: {
    build: {
      // A landing page has no reason to ship a JS bundle; what little there is
      // (the copy button) is inlined so the page costs one request.
      assetsInlineLimit: 4096,
    },
  },
})
