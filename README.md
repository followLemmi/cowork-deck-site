# coworkdeck.dev

The site for [cowork-deck](https://github.com/followLemmi/cowork-deck) — a
desktop deck for running many Claude Code sessions at once.

Static, built with [Astro](https://astro.build/), deployed to GitHub Pages on
every push to `main`. No client-side framework and no analytics; the only
JavaScript that reaches a visitor is one inline block on the install page, which
marks the download matching their platform and puts a copy button on each
command. Every other interactive part of the site is a `<details>` element and
ships no script at all — including the mobile navigation.

## Running it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # fetches releases, builds to dist/, then run the SEO gate
npm run preview
```

`npm run build` calls `scripts/fetch-releases.mjs` first, which pulls the
release list from the GitHub API into `src/data/releases.json`. That file is
**committed on purpose**: a build with no network, or against a rate-limited
unauthenticated API, must still produce a site with working download links. The
committed copy is the floor, not the source.

## Where the content lives

Prose lives in the page that shows it. Everything asserted in more than one
place lives in `src/data/`, so a page and the structured data describing that
page cannot disagree:

| File | What it is the single source of |
|---|---|
| `src/data/site.ts` | Origin, name, repository, licence, platforms |
| `src/data/features.ts` | The six features: titles, descriptions, screenshots |
| `src/data/faq.ts` | Every question, rendered as prose *and* as `FAQPage` JSON-LD |
| `src/data/schema.ts` | The structured-data nodes, built from the three above |
| `src/data/releases.json` | Generated; the changelog and every download link |

## The SEO gate

`scripts/check-seo.mjs` runs after every build, locally and in CI, and **fails
the deploy** on the mistakes that are invisible in a browser and expensive in a
search result:

- a missing `<title>`, meta description or canonical link
- a description over 165 characters, or one that duplicates another page's
- a duplicated `<title>`
- anything other than exactly one `<h1>`
- an `<img>` with no `alt`
- a broken internal link, or a referenced image that is not in `dist/`
- a missing `robots.txt`, `sitemap-index.xml`, `llms.txt`, `rss.xml` or `CNAME`
- any single image over 400 KB

Adding a page means adding it to nothing: the sitemap, the canonical and the
Open Graph tags are derived. What the gate checks is that you did not skip the
two props the layout requires.

## Images

`scripts/make-assets.mjs` derives every image from the application repository's
own assets — the screenshots in `docs/images/`, the icon in
`src-tauri/icons/`. It is run by hand, not by the build, because this repository
has no dependency on that one:

```bash
node scripts/make-assets.mjs ../cowork-deck
```

Screenshots are served as WebP (~80 KB each, from ~430 KB of PNG). The Open
Graph cards stay PNG: not every scraper handles WebP. The demo is an MP4 and a
WebM rather than the README's 5.5 MB GIF.

## Design

The palette is the app's own True Ink tokens, copied from `src/styles.css` in
the application repository rather than imported. A landing page that had drifted
a shade from the product it shows would be worse than one that never matched.
The reasoning is on [/design/](https://coworkdeck.dev/design/).

`src/styles/global.css` is the whole system — there is no per-page stylesheet
worth the name. Three rules it enforces, written at the top of the file:

- **Hue belongs to state.** Green, amber and red mean working, waiting and
  broken, so there is not one coloured button on the site.
- **Elevation is lightness,** and at most one surface per screen is raised: the
  screenshot. Everything else is separated by a hairline on the canvas.
- **Structure is rules and a numeric gutter, not a stack of cards.** Three
  arguments are not three of the same object; six features are not six of one.

Two consequences worth knowing before editing:

- `src/components/StateTiles.astro` rebuilds the four session states in HTML
  rather than cropping them out of a screenshot. 1600px of dense terminal scaled
  to a 335px phone is texture, not information, and the state rail is the one
  thing a reader has to be able to read. Its fixture text is the harness's, so
  the component and `/img/deck.webp` cannot disagree.
- Anything with `display: grid` in `global.css` — `.row`, `.fitem`, `.release`,
  `.swatch` — needs its content wrapped in an element. A loose text node in a
  grid container becomes its own grid item, which is how a three-step list once
  rendered one word per line.

## Licence

MIT, matching the application. The screenshots show invented fixture data — see
the application repository's `harness/`.
