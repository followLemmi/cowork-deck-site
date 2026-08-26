/* The FAQ, in one list, rendered as prose on /faq/ and as a FAQPage node in the
 * same page's head.
 *
 * Answers are written to be liftable: each one stands alone, names the subject
 * instead of saying "it", and does not depend on the question above it. That is
 * what makes them usable as a search snippet — and it is also what an AI answer
 * engine quotes, which is now a discovery channel worth writing for.
 *
 * `a` is plain text because schema.org wants text; `html` is the version the
 * page renders when the answer needs a link or a code span. Where `html` is
 * absent the page renders `a`. */

export type QA = { q: string; a: string; html?: string; group: string }

export const FAQ: QA[] = [
  // --- What it is ------------------------------------------------------
  {
    group: 'What it is',
    q: 'What is cowork-deck?',
    a: 'cowork-deck is a free, open-source desktop app for running many Claude Code sessions at once. Each session is a tile holding a real PTY-backed terminal in a project folder, with a coloured rail showing whether it is working, waiting on a decision, finished, or stopped on an error.',
  },
  {
    group: 'What it is',
    q: 'Is cowork-deck free and open source?',
    a: 'Yes. cowork-deck is MIT-licensed, and the whole application is in a public GitHub repository — including the screenshot harness the images on this site were shot with. There is no paid tier and no hosted service.',
    html: 'Yes. cowork-deck is MIT-licensed, and the whole application is in a <a href="https://github.com/followLemmi/cowork-deck" rel="noopener">public GitHub repository</a> — including the screenshot harness the images on this site were shot with. There is no paid tier and no hosted service.',
  },
  {
    group: 'What it is',
    q: 'Is cowork-deck made by Anthropic?',
    a: 'No. cowork-deck is an independent open-source project and is not affiliated with, endorsed by, or supported by Anthropic. It drives the Claude Code CLI the same way a person at a terminal would.',
  },

  // --- Cost and requirements -------------------------------------------
  {
    group: 'Cost and requirements',
    q: 'Do I need an API key or a subscription to use cowork-deck?',
    a: 'No. cowork-deck runs the Claude Code already installed on your machine, under whatever plan you already use. The app adds no account, no server, and no cost of its own — it is a window around processes you could start by hand.',
  },
  {
    group: 'Cost and requirements',
    q: 'What do I need installed?',
    a: 'Claude Code, logged in. The GitHub CLI is optional and only needed for the account bindings, the boards that read GitHub issues, and the pull request views. If claude is not on your PATH, set COWORK_CLAUDE_PATH; COWORK_GH_PATH does the same for gh.',
  },
  {
    group: 'Cost and requirements',
    q: 'How many Claude Code sessions can run at the same time?',
    a: 'As many as your machine and your plan allow — the app imposes no limit. cowork-deck itself uses around 100 MB of memory; each session costs what the same claude process would cost in an ordinary terminal.',
  },

  // --- Platforms --------------------------------------------------------
  {
    group: 'Platforms',
    q: 'Which operating systems does cowork-deck support?',
    a: 'Prebuilt bundles exist for macOS (Apple silicon and Intel, as .dmg) and Linux (AppImage, .deb and .rpm). Windows builds and runs from source but has no published bundle yet.',
    html: 'Prebuilt bundles exist for macOS (Apple silicon and Intel, as <code>.dmg</code>) and Linux (AppImage, <code>.deb</code> and <code>.rpm</code>). Windows builds and runs from source but has no published bundle yet — see <a href="/install/#source">building from source</a>.',
  },
  {
    group: 'Platforms',
    q: 'Is there a Windows version of cowork-deck?',
    a: 'Not as a published download. Windows is supported in the sense that the app builds and runs there: install Node.js, a Rust toolchain and the Tauri v2 prerequisites, then run npm install and npm run tauri build.',
    html: 'Not as a published download. Windows is supported in the sense that the app builds and runs there: install Node.js, a Rust toolchain and the Tauri v2 prerequisites, then run <code>npm install</code> and <code>npm run tauri build</code>. Full steps are on <a href="/install/#source">the install page</a>.',
  },
  {
    group: 'Platforms',
    q: 'macOS says cowork-deck is damaged and can’t be opened. Is the download broken?',
    a: 'No. The app is not notarized, because there is no paid Apple Developer account behind the project, so macOS quarantines the download instead of checking a signature. Clear the flag once by running: xattr -cr /Applications/cowork-deck.app. System Settings → Privacy & Security → Open Anyway does the same thing.',
    html: 'No. The app is not notarized, because there is no paid Apple Developer account behind the project, so macOS quarantines the download instead of checking a signature. Clear the flag once: <code>xattr -cr /Applications/cowork-deck.app</code>. System Settings → Privacy &amp; Security → <em>Open Anyway</em> does the same thing. More on <a href="/install/#gatekeeper">the install page</a>.',
  },

  // --- How it compares --------------------------------------------------
  {
    group: 'How it compares',
    q: 'How is this different from running Claude Code in tmux or in terminal tabs?',
    a: 'A multiplexer splits panes but does not know what an agent session is. It cannot tell you that one pane finished a turn, that another is blocked on a permission request, what each has spent, or which branch each is on. cowork-deck reads that from Claude Code’s own hooks and shows it as a rail on every tile, plus two counts in the top bar for the only two things that want a person.',
    html: 'A multiplexer splits panes but does not know what an agent session is. It cannot tell you that one pane finished a turn, that another is blocked on a permission request, what each has spent, or which branch each is on. cowork-deck reads that from Claude Code’s own hooks and shows it as <a href="/features/multiple-claude-code-sessions/">a rail on every tile</a>, plus two counts in the top bar for the only two things that want a person.',
  },
  {
    group: 'How it compares',
    q: 'Why not just use Claude Code’s own subagents or git worktrees?',
    a: 'Those solve a different problem. Subagents run inside one session under one conversation; worktrees give you separate checkouts but no view over them. cowork-deck is the layer above: many independent top-level sessions, in different projects, under different GitHub accounts, with their state visible at once. It uses worktrees itself when starting a session on an issue or a pull request.',
  },
  {
    group: 'How it compares',
    q: 'Does cowork-deck work with Codex, Copilot CLI or opencode?',
    a: 'Not yet. Claude Code is the only agent CLI supported today. Reading other CLIs’ session logs — Codex, Copilot and opencode — is on the roadmap, starting with the activity panel that reports which tools and subagents actually ran.',
    html: 'Not yet. Claude Code is the only agent CLI supported today. Reading other CLIs’ session logs is <a href="https://github.com/followLemmi/cowork-deck/issues/330" rel="noopener">on the roadmap</a>, starting with the activity panel that reports which tools and subagents actually ran.',
  },

  // --- Privacy and accounts ---------------------------------------------
  {
    group: 'Privacy and accounts',
    q: 'Does cowork-deck store my GitHub token?',
    a: 'No. A workspace’s settings hold the account name and nothing else. The token is read from the GitHub CLI’s own keyring at the moment a session starts and handed to the child process through environment variables — GH_TOKEN, GIT_AUTHOR_*, and GIT_SSH_COMMAND where needed.',
  },
  {
    group: 'Privacy and accounts',
    q: 'Can I use two GitHub accounts at the same time?',
    a: 'Yes, and without switching. Each workspace is bound to its own gh account, so sessions in two projects push, open pull requests and sign commits as two different people simultaneously. The app never calls gh auth switch, so your own shell keeps whichever account was active in it.',
    html: 'Yes, and without switching. Each workspace is bound to its own <code>gh</code> account, so sessions in two projects push, open pull requests and sign commits as two different people simultaneously. The app never calls <code>gh auth switch</code>, so your own shell keeps whichever account was active in it. See <a href="/features/github-account-per-workspace/">a GitHub account per workspace</a>.',
  },
  {
    group: 'Privacy and accounts',
    q: 'Does cowork-deck send any data anywhere?',
    a: 'No. There is no telemetry, no analytics and no account. The optional settings sync writes to a private GitHub repository that you own and create; it is off until you switch it on, and it never carries absolute paths.',
    html: 'No. There is no telemetry, no analytics and no account. The optional <a href="/features/settings-sync/">settings sync</a> writes to a private GitHub repository that you own and create; it is off until you switch it on, and it never carries absolute paths.',
  },
  {
    group: 'Privacy and accounts',
    q: 'Where does cowork-deck keep its settings?',
    a: 'In your platform’s ordinary application config directory, as plain files. Boards made of markdown cards live in folders you choose, inside your repository or anywhere else. Uninstalling is deleting the app; nothing is hidden elsewhere.',
  },

  // --- Behaviour --------------------------------------------------------
  {
    group: 'How it behaves',
    q: 'Can cowork-deck run sessions in the background when the window is closed?',
    a: 'No. Sessions are children of the app: there is no detached mode, and the scheduler only fires while the window is open. Missed scheduled runs are not lost — each scheduled scenario catches up once on the next launch, once rather than repeatedly.',
    html: 'No. Sessions are children of the app: there is no detached mode, and the scheduler only fires while the window is open. Missed scheduled runs are not lost — each <a href="/features/scenarios-and-schedules/">scheduled scenario</a> catches up once on the next launch, once rather than repeatedly.',
  },
  {
    group: 'How it behaves',
    q: 'Can I schedule Claude Code to run unattended?',
    a: 'Yes. Save a prompt as a scenario and attach an hourly, daily or weekly schedule; it fires into a fresh session using stored defaults. The run happens on your machine through your own Claude Code, so there is no cloud agent and no extra bill, and it has your full local context. A scenario whose previous run is still working is skipped rather than stacked.',
  },
  {
    group: 'How it behaves',
    q: 'What happens if Claude Code’s hooks do not fire?',
    a: 'The terminal is unaffected — you can type, scroll and work normally. The only symptom is a tile whose state label stays on idle. State tracking degrades on its own; nothing else depends on it.',
  },
  {
    group: 'How it behaves',
    q: 'What happens to running processes when I quit?',
    a: 'Quitting names the sessions that still have something running and waits for you. What is killed is the whole process session, so a build started inside a shell dies with it rather than outliving the app. Restarting resumes the conversation with claude --resume, and yesterday’s tiles come back on the next launch.',
  },

  // --- The project ------------------------------------------------------
  {
    group: 'The project',
    q: 'How do I report a bug or request a feature?',
    a: 'Open a GitHub issue on the repository. Work is tracked there, and decisions worth outliving their issue are written as architecture decision records under docs/adr/.',
    html: 'Open <a href="https://github.com/followLemmi/cowork-deck/issues" rel="noopener">a GitHub issue</a> on the repository. Work is tracked there, and decisions worth outliving their issue are written as architecture decision records under <code>docs/adr/</code>.',
  },
  {
    group: 'The project',
    q: 'What is cowork-deck built with?',
    a: 'Tauri v2 with a Rust backend handling PTYs and process management, and a TypeScript frontend using xterm.js with no UI framework at all. Resident memory is around 100 MB.',
  },
  {
    group: 'The project',
    q: 'Is the interface available in other languages?',
    a: 'Not yet. The interface is English-only today by written rule, which is a decision about the source rather than about the person using it. A language switch and translated strings are on the roadmap. Prompts are unaffected: a scenario’s placeholders are matched by letter rather than by ASCII, so a prompt written in any script names its fields in that script.',
  },
]

export const FAQ_GROUPS = [...new Set(FAQ.map((f) => f.group))]
