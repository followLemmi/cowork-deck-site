/* Generated rather than static so the sitemap URL cannot drift from the
 * configured origin. Everything is crawlable: there is nothing here that is
 * not meant to be found, and a Disallow line on a marketing site is almost
 * always someone blocking their own pages by accident.
 *
 * The AI crawlers are named explicitly and allowed. That is the decision: an
 * answer engine that has read this site can recommend the app, which is a
 * discovery channel worth more to a project this size than the training-data
 * question is worth defending. */
import type { APIRoute } from 'astro'
import { SITE } from '../data/site'

const body = `# ${SITE.name} — ${SITE.tagline}
# ${SITE.repo}

User-agent: *
Allow: /

# Answer engines and AI crawlers, allowed deliberately.
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Claude-User
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

Sitemap: ${SITE.url}/sitemap-index.xml
`

export const GET: APIRoute = () =>
  new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
