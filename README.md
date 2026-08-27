# Drive7

A pixel-accurate rebuild of [drive7.com](https://drive7.com) on Next.js 16 + Payload CMS 3 + PostgreSQL (Neon).
Header, footer and every page section are editable from the admin dashboard.

```
npm install
cp .env.example .env        # fill in DATABASE_URL + PAYLOAD_SECRET (see below)
npm run seed                # creates the admin user, uploads media, builds the homepage
npm run dev                 # http://localhost:3000  ·  admin at /admin
```

Default seeded login: `admin@drive7.com` / `Drive7!admin` (override with `SEED_ADMIN_EMAIL` /
`SEED_ADMIN_PASSWORD`). **Change this before the site is reachable from the internet.**

## Layout

```
src/
├─ payload.config.ts          Collections, globals, Postgres + S3 adapters
├─ collections/               Pages, Media, Users
├─ globals/                   Header, Footer, SiteSettings
├─ blocks/CanvasSection/      The section block every page is built from
├─ fields/                    Reusable field groups (canvas layers, SEO)
├─ lib/
│  ├─ design.ts               Breakpoints, design widths, brand colours
│  ├─ canvas.ts               Layer placement → CSS custom properties
│  ├─ payload.ts              Cached, tag-invalidated data access
│  └─ media.ts                Upload helpers
├─ components/
│  ├─ canvas/                 CanvasSection + Layer renderers
│  ├─ layout/                 SiteHeader, SiteFooter, MobileMenu, RenderPage
│  ├─ ui/                     WhatsAppFloat
│  ├─ icons/                  Social brand glyphs
│  └─ admin/                  Row labels and admin branding
├─ app/(frontend)/            Public site
├─ app/(payload)/             Admin panel + REST/GraphQL API
└─ seed/                      Homepage content, DB reset helper
```

## The canvas model

drive7.com's homepage is authored as a stack of fixed-height design canvases with absolutely
positioned layers, not as a flow layout. `CanvasSection` reproduces that model exactly, so the
rebuild matches the original to the pixel while staying fully editable:

- Each **section** is a band of fixed height per breakpoint (740 / 700 / varies).
- Inside sits a **canvas** capped at that breakpoint's design width — **1280** desktop,
  **1024** tablet, **360** mobile — centred, and scaled down proportionally below it.
- Each **layer** is placed by an **anchor origin** (`tl`…`br`) plus an x/y offset. Edge anchors
  inset *into* the canvas: `x` grows rightwards from `l` and leftwards from `r`, `y` downwards
  from `t` and upwards from `b`. Centre anchors offset the layer's own centre.
- The canvas is a CSS size container, so every design length is emitted as
  `L / designWidth * 100` **cqw** — which resolves to `L × (canvasWidth / designWidth)`.
  Font sizes are *not* scaled; they are set per breakpoint, matching the original.
- Layers may overflow the canvas; the band clips them (the ceramic-coating car, for example,
  is 1505px tall inside a 740px band).

`lib/canvas.ts` turns a layer's three placements into `--d-*` / `--t-*` / `--m-*` custom
properties; `globals.css` has one rule set per breakpoint that reads them, with tablet and
mobile falling back to the desktop value. No JavaScript is involved in layout.

Tablet and mobile placements inherit every field left blank on desktop. Visibility is
tri-state (`inherit` / `visible` / `hidden`) so a layer can be desktop-only or mobile-only —
which is how the source site swaps compositions between breakpoints.

## Editing

| What | Where |
| --- | --- |
| Menu, logo, header colours and heights | **Site → Header** |
| Social links, footer links, colours, spacing | **Site → Footer** |
| Site name, SEO defaults, WhatsApp button, GTM | **Site → Site Settings** |
| Page sections, layers, per-breakpoint placement | **Content → Pages** |
| Images | **Content → Media** |

Pages use drafts with autosave and live preview. Publishing revalidates the affected route
through the `afterChange` hooks in `src/hooks/revalidatePage.ts`.

## Environment

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string (Neon) |
| `PAYLOAD_SECRET` | Signing secret — required |
| `NEXT_PUBLIC_SERVER_URL` | Public origin, used for absolute URLs |
| `S3_BUCKET` | Neon object-storage bucket (`media`). Omit to store uploads on local disk |
| `AWS_ENDPOINT_URL_S3`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION` | Neon storage credentials |

Neon's object storage is S3-compatible and path-style addressed; `payload.config.ts` sets
`forcePathStyle: true` accordingly.

## Deploying to Vercel

1. **Build Command** must be `npm run ci:build` (runs pending migrations, then builds).
   The default `npm run build` skips migrations.
2. Set the environment variables from `.env.example` in the Vercel project —
   `DATABASE_URL`, `PAYLOAD_SECRET`, `S3_BUCKET`, `AWS_ENDPOINT_URL_S3`,
   `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, and
   `NEXT_PUBLIC_SERVER_URL` pointing at the deployed domain.
3. Node 20 or newer.

Media is served straight from the Neon bucket (`disablePayloadAccessControl` +
`generateFileURL`), so images never hit a serverless function. Uploads go from
the browser directly to the bucket (`clientUploads`), which sidesteps Vercel's
4.5MB request-body limit.

### Migrations

The schema is pushed automatically in development, but **push is disabled in
production** — deploys apply `src/migrations` instead. After changing any
collection, global or field:

```bash
npm run migrate:create   # generate the migration
npm run migrate:status   # confirm what will run
```

Commit the generated files; `ci:build` applies them on the next deploy.

The initial migration was *baselined* — the database already matched it, so it
is recorded as applied rather than re-run.

### Still to do before going live

- **No email adapter is configured.** "Forgot password" will not send mail;
  password resets have to be done from the Users collection. Add an adapter
  (e.g. `@payloadcms/email-resend`) when a provider is available.
- **Change the seeded admin password** (Users → admin@drive7.com).

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` / `build` / `start` | Next.js |
| `npm run ci:build` | Migrate then build — use this as Vercel's Build Command |
| `npm run migrate` / `migrate:create` / `migrate:status` | Schema migrations |
| `npm run seed` | Idempotent — creates the admin user if none exists, uploads any missing media, writes the globals and the homepage |
| `npm run db:reset` | **Destructive.** Drops and recreates the `public` schema. Requires `CONFIRM_DB_RESET=yes` |
| `npm run generate:types` | Regenerate `src/payload-types.ts` after schema changes |
| `npm run generate:importmap` | Regenerate the admin import map after adding admin components |
| `npm run typecheck` | `tsc --noEmit` |


## Fidelity

Verified by screenshotting the live site and this build at the same viewports and diffing:

- Desktop (1440×900): every section, layer, header and footer box matches the live site to
  **0.0px**; total document height 3653px in both. 0.26% of pixels differ by more than 80/255,
  all of it photo resampling and text anti-aliasing.
- Mobile (390×844): every layer rect matches exactly.

Two deliberate differences from the original:

1. The live mobile page scrolls horizontally because two off-canvas counter widgets sit past
   the viewport edge. They render nothing, so they are not reproduced and the page no longer
   overflows.
2. Tablet (768–1024px) auto-height text can sit up to ~4px from the original, because the
   source stores a measured height and scales it while leaving the font size fixed. Set an
   explicit `h` on a text layer to pin it.
