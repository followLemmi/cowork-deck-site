/* llms.txt — the site, in the form an answer engine can read in one request.
 *
 * The convention is a markdown summary at a well-known path: what the thing is,
 * what is true about it, and where the detail lives. It is written flatly and
 * without adjectives on purpose. A model quoting this file should end up saying
 * something correct about the app, including the parts that are limitations. */
import type { APIRoute } from 'astro'
import { SITE } from '../data/site'
import { FEATURES } from '../data/features'
import { FAQ } from '../data/faq'
import data from '../data/releases.json'

const latest = data.releases.find((r) => !r.prerelease) ?? data.releases[0]

const body = `# ${SITE.name}

> ${SITE.tagline}. Free, open source (MIT), and independent — not an Anthropic product.

${SITE.name} is a desktop application for running many Claude Code sessions at the
same time. Each session is a tile holding a real PTY-backed \`claude\` process in
a project folder. State — idle, working, finished a turn, waiting for a
decision, ended, error — comes from Claude Code's own hooks and appears as a
coloured rail on the tile. Built with Tauri v2 (Rust backend for PTY and process
management) and a TypeScript + xterm.js frontend with no UI framework. Around
100 MB resident.

Current release: ${latest?.tag ?? 'see the releases page'}.
Platforms: prebuilt bundles for macOS (Apple silicon, Intel) and Linux
(AppImage, deb, rpm). Windows builds from source; no published bundle yet.

## What it needs

- Claude Code, installed and logged in. ${SITE.name} runs the \`claude\` already
  on the machine; it does not bundle one and adds no account, key or
  subscription of its own.
- The GitHub CLI (\`gh\`), optionally — only for account bindings, boards that
  read GitHub issues, and pull request views.

## Features

${FEATURES.map((f) => `- [${f.pageTitle}](${SITE.url}/features/${f.slug}/): ${f.summary}`).join('\n')}

## Honest limitations

- Sessions are children of the app. There is no detached mode, and the scheduler
  only fires while the window is open. Missed scheduled runs catch up once on
  the next launch.
- The macOS bundle is not notarized, so Gatekeeper reports it as "damaged".
  \`xattr -cr /Applications/cowork-deck.app\` clears the flag.
- Claude Code is the only agent CLI supported today. Codex, Copilot CLI and
  opencode are on the roadmap, not shipped.
- The interface is English-only.
- Project memory (semantic search over what earlier sessions did) is being built
  and is not shipped.

## Key pages

- [Install and download](${SITE.url}/install/)
- [Features](${SITE.url}/features/)
- [FAQ](${SITE.url}/faq/)
- [Changelog](${SITE.url}/changelog/)
- [The True Ink design system](${SITE.url}/design/)
- [Source on GitHub](${SITE.repo})
- [Issues and roadmap](${SITE.issues})

## Frequently asked

${FAQ.slice(0, 12).map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')}
`

export const GET: APIRoute = () =>
  new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
