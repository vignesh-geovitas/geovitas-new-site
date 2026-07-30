# Geovitas

Marketing site for Geovitas — climate infrastructure, project development and
technology-enabled advisory for regulated industry.

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · Motion.

## Running it locally

Requires **Node 20.9 or newer** (Next 16 will not run on Node 18).

```bash
npm ci
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm start            # serve the build
npm run lint
```

## Deploying to Vercel

The repo is deployable as-is — no environment variables are required and every
route prerenders as static content.

Vercel should detect the settings automatically. If it does not, these are the
values it needs:

| Setting           | Value            |
| ----------------- | ---------------- |
| Framework Preset  | Next.js          |
| Root Directory    | `./` (repo root) |
| Build Command     | `next build`     |
| Output Directory  | *(leave blank)*  |
| Install Command   | `npm ci`         |
| Node.js Version   | 20.x or later    |
| Production Branch | `main`           |

`vercel.json` pins the framework and `package.json` pins the Node engine, so a
stale dashboard preset cannot produce an empty deployment.

**Seeing a 404 on the deployment?** The build is not the problem — check that
Root Directory is the repo root and that the production branch is `main`. A
Vercel project created before the first push will sit empty until a deploy is
triggered; pushing a commit or hitting Redeploy is enough.

## Layout

```
app/
  (marketing)/         every public route, sharing nav + footer chrome
    advisory/          the three advisory verticals
    capabilities/      transition capabilities (CBG, cold cracking, carbon capture)
    impact/ insights/ company/ contact/ platform/ approach/ exposure/
  layout.tsx           <html>, fonts, metadata
  globals.css          design tokens — read the header before changing colour
components/
  site/                page sections
  ui/                  primitives (buttons, reveals, charts, mockups)
lib/                   content as data: advisory.ts, capabilities.ts, insights.ts
scripts/               check-overflow.mjs — responsive regression check
```

Content lives in `lib/`, not in the pages. A practice name or an article title
is edited in one place and every surface that shows it follows.

## Conventions worth knowing before editing

Several decisions here are deliberate and documented in comments at the top of
the relevant file. The load-bearing ones:

- **No unverifiable figures.** Anything presented as a delivered result must be
  traceable to a public instrument or signed off for external use. Illustrative
  product output is allowed but must carry the `Illustrative` chip — see the
  sourcing note in `components/ui/data-viz.tsx`. `/impact` is `noindex` and
  reads zero until real assurance-backed numbers land.
- **Typography is the brand book's.** Century Gothic, self-hosted, title case.
- **Grid items need `min-w-0`.** A grid item defaults to `min-width: auto` and
  cannot shrink below its content's min-content width, which previously pushed
  the hero off the right edge of every phone. See `components/ui/marquee.tsx`.

### Responsive regression check

Catches the layout blowout described above. Needs the site running and Chrome
installed (`CHROME_PATH` to override the location):

```bash
npm run build && npm start &
npm run check:overflow
```

It sweeps every route at 320, 390 and 768px and fails on either a sideways
document scroll or an in-flow box wider than its parent — the second matters
because a clipping ancestor hides that from a scroll check.

## Outstanding before launch

- Client logos and approved quotes (`components/site/social-proof.tsx`)
- Case studies and verified figures on `/impact`; then drop its `noindex`
- Counsel-approved copy for `/privacy` and `/terms`
- Licensed photography for the `ImageSlot` placeholders

Grep for `PlaceholderBlock` to find everything still outstanding.
