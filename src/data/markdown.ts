/* One markdown processor for the whole build.
 *
 * Release notes arrive from the GitHub API as markdown, and they are the only
 * markdown on the site. Astro's own processor is already a dependency, so
 * rendering them costs nothing extra — and using the same one means a code
 * fence in a release note is highlighted exactly as one written by hand. */
import { createMarkdownProcessor } from '@astrojs/markdown-remark'

const processor = await createMarkdownProcessor({
  syntaxHighlight: 'shiki',
  shikiConfig: { theme: 'github-dark-default', wrap: false },
  gfm: true,
})

export async function renderMarkdown(md: string) {
  const { code } = await processor.render(md)
  return code
}

/* The first paragraph, as plain text — used as the excerpt on the changelog
 * index and as the release's meta description. Trimmed to 155 characters
 * because a description longer than that is cut by the search result anyway. */
export function firstParagraph(md: string, limit = 200) {
  const text = md
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find((block) => block && !block.startsWith('#') && !block.startsWith('```'))
  if (!text) return ''
  const flat = text
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
  return flat.length > limit ? flat.slice(0, limit - 1).replace(/\s+\S*$/, '') + '…' : flat
}
