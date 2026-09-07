/* The release list, plus the one derived fact two different places need.
 *
 * `getStaticPaths` builds a page per release, and the sitemap decides which of
 * those pages belongs in it. Both need to know which releases carry no notes of
 * their own, so that answer is computed once here rather than in each of them.
 */
import data from './releases.json'

export const RELEASES = data.releases

/* A release whose body is byte-identical to an earlier one's has no notes of
 * its own — the three oldest tags all carry the same install instructions and
 * nothing else. Those pages still exist, because a link to a version should
 * resolve and the downloads for it are real, but they are three near-identical
 * pages competing for one result, so they stay out of the index.
 *
 * Derived rather than listed: the next release that ships without notes joins
 * the set on its own, and one that gains notes leaves it.
 */
export const UNDOCUMENTED_TAGS: string[] = (() => {
  const firstSeen = new Map<string, string>()
  const duplicates: string[] = []
  /* Oldest first, so the tag that introduced a body is the one that keeps it. */
  for (const release of [...RELEASES].reverse()) {
    const body = (release.body ?? '').trim()
    if (!body) {
      duplicates.push(release.tag)
      continue
    }
    const owner = firstSeen.get(body)
    if (owner) duplicates.push(release.tag)
    else firstSeen.set(body, release.tag)
  }
  return duplicates
})()

export const isUndocumented = (tag: string) => UNDOCUMENTED_TAGS.includes(tag)
