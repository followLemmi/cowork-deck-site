/* The feature set, in one list.
 *
 * The landing grid, the /features/ index and each feature page's own head read
 * from here, so a feature cannot be described one way on the front page and
 * another way in the search result that leads to it.
 *
 * `query` is the phrase the page is written to answer. It is not a keyword to
 * sprinkle — it is a check: if the page does not actually answer that
 * question in its first screen, the page is wrong, not the keyword. */

export type FeatureMeta = {
  slug: string
  /* Card title on the grid. */
  title: string
  /* <title> for the feature's own page. Longer and more literal, because it
     competes in a search result rather than on a grid. */
  pageTitle: string
  /* <meta name="description">, under 155 characters. */
  description: string
  /* One sentence on the grid card. */
  summary: string
  query: string
  image: string
  imageAlt: string
  og: string
}

export const FEATURES: FeatureMeta[] = [
  {
    slug: 'multiple-claude-code-sessions',
    title: 'Many sessions, one window',
    pageTitle: 'Run multiple Claude Code sessions at once',
    description:
      'Every Claude Code session is a tile with a real terminal in it, and a coloured rail that says whether it is working, waiting on you, or broken.',
    summary:
      'A dozen agents running at once, and one glance that says which of them needs you.',
    query: 'how to run multiple Claude Code sessions at the same time',
    image: '/img/zoom.webp',
    imageAlt:
      'One terminal zoomed to fill the window, the other sessions reduced to a filmstrip of cards below it, each card carrying its name, state, branch and token count.',
    og: '/og/sessions.png',
  },
  {
    slug: 'github-account-per-workspace',
    title: 'A GitHub account per project',
    pageTitle: 'Two GitHub accounts at the same time, one per workspace',
    description:
      'Bind each workspace to a gh account. Sessions in two projects push, open pull requests and sign commits as two different people — with no account switching.',
    summary:
      'Work and personal, side by side, without `gh auth switch` and without either one leaking into the other.',
    query: 'use two GitHub accounts at the same time on one machine',
    image: '/img/workspace-window.webp',
    imageAlt:
      'A workspace pulled out into a window of its own: one workspace, its sessions, its board and its pull requests, and no rail at all.',
    og: '/og/workspaces.png',
  },
  {
    slug: 'task-board',
    title: 'A board that starts sessions',
    pageTitle: 'A task board for Claude Code — markdown cards or GitHub issues',
    description:
      'Every workspace gets a board, from markdown files in your repository or from the repository’s own GitHub issues. Press play on a card and it becomes a session.',
    summary:
      'Cards in your repo, or the repository’s issues. Either way, ▶ turns one into a running session.',
    query: 'task board for AI coding agents that launches the agent',
    image: '/img/board.webp',
    imageAlt:
      'The board: configured columns of cards, each card carrying its kind and the arrows that move it, one card in the working step marked as having a session running on it.',
    og: '/og/board.png',
  },
  {
    slug: 'github-issues-and-pull-requests',
    title: 'Issues and pull requests',
    pageTitle: 'GitHub issues and pull requests, without leaving the deck',
    description:
      'Read a repository’s issues as documents, open one as a session on its own branch, and review pull requests with their checks and their diff in the same window.',
    summary:
      'Issues open as documents. Pull requests carry their checks, their verdict and their diff.',
    query: 'review GitHub pull requests from a desktop app with AI sessions',
    image: '/img/pull-requests.webp',
    imageAlt:
      'A pull request’s diff open in the workspace panel: two sticky line-number columns, plus and minus markers, added and removed bands.',
    og: '/og/pull-requests.png',
  },
  {
    slug: 'scenarios-and-schedules',
    title: 'Saved prompts, on a schedule',
    pageTitle: 'Scheduled Claude Code runs on your own machine',
    description:
      'Save a prompt as a scenario, give it a schedule, and it fires unattended into a fresh session — through your own Claude Code, with no cloud agent to pay for.',
    summary:
      'A prompt under a name, launched in one press — or hourly, daily, weekly, unattended.',
    query: 'schedule Claude Code to run automatically',
    image: '/img/deck.webp',
    imageAlt:
      'Five Claude Code sessions as tiles in one window — one working, one waiting for a decision, one finished, one stopped on an error, one idle.',
    og: '/og/default.png',
  },
  {
    slug: 'settings-sync',
    title: 'The same setup everywhere',
    pageTitle: 'Sync your setup between machines through your own private repo',
    description:
      'Workspaces, bindings, scenarios and the run journal live in a private GitHub repository that is yours. No account, no cloud, no telemetry.',
    summary:
      'Your workspaces and scenarios follow you to the next machine, through a repository nobody else owns.',
    query: 'sync developer tool settings between machines without a cloud account',
    image: '/img/issues.webp',
    imageAlt:
      'The board reading a repository’s GitHub issues, filtered by state and label, each row deep enough to show an excerpt of the body.',
    og: '/og/issues.png',
  },
]

export const featureBySlug = (slug: string) =>
  FEATURES.find((f) => f.slug === slug)!
