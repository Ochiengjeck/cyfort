# CyFort Technologies — Site & CMS

A custom-built marketing site and content management system for CyFort
Technologies Limited, built on Next.js (App Router) with a self-hosted admin
panel at `/admin`. No third-party CMS or SaaS dependency — content lives in a
local database managed through this repo.

## Stack

- **Next.js 16** (App Router, Cache Components) + React 19 + Tailwind v4
- **Prisma 7** ORM with SQLite (via the `better-sqlite3` driver adapter) for
  local development — portable to Postgres later, see "Moving to Postgres" below
- **Custom auth** — a single admin user, hashed password, signed session
  cookie (no NextAuth/Clerk)
- Every mutation (admin CRUD, the public contact form, media upload) is a
  React Server Action — there are no `app/api` routes

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your `.env` from the example and fill in real values:

   ```bash
   cp .env.example .env
   ```

   - `DATABASE_URL` — keep the default for local SQLite
   - `SESSION_SECRET` — generate one: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` — credentials for the one
     admin account the seed script creates

3. Create the database and seed it with the real CyFort brand content
   (services, industries, about copy, theme colors, nav, etc.):

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

   Visit `http://localhost:3000` for the public site and
   `http://localhost:3000/admin` to log in and manage content.

## Content model

Everything editable from `/admin` is backed by Prisma models in
`prisma/schema.prisma`:

- **Site-wide**: `SiteSettings` (identity, contact info, 8 brand color
  tokens), `NavLink`
- **Pages**: `HomeHero`, `AboutContent`, `Differentiator`, `PromiseItem`
- **Collections**: `Service` (+ `ServiceItem`), `Industry`, `TeamMember`,
  `CaseStudy`, `InsightPost`, `JobPosting`
- **Inbox**: `ContactSubmission` (written by the public `/contact` form)
- **Media**: `Media`, files stored under `public/uploads/`

Team, Case Studies, Insights, and Careers ship empty on a fresh seed — the
public pages show an on-brand "coming soon" state until real content is
added from the admin panel.

## Theme customization

The homepage, section backgrounds, and accents are driven by 8 color fields
on `SiteSettings`, editable from `/admin/settings` → Theme tab. Every
text/background pairing is fixed (not independently editable) so no color
choice can produce illegible text. Changes are visible on the next page
load — there is no cache to invalidate.

## Useful scripts

```bash
npm run dev          # start the dev server
npm run build        # production build
npm run start        # run the production build
npm run lint         # ESLint
npm run db:migrate   # create/apply a Prisma migration
npm run db:seed      # re-run the seed script (idempotent)
npm run db:studio    # browse the database in Prisma Studio
```

## Known limitations / follow-ups

- **File uploads are local disk** (`public/uploads/`). This works for local
  dev and traditional hosting, but won't persist on a serverless platform
  like Vercel — move to S3/Blob storage before deploying there.
- **Production database is undecided.** The schema avoids SQLite-only
  features specifically so switching `datasource.provider` (and the Prisma
  driver adapter) to Postgres is a small, contained change — see below.

### Moving to Postgres

1. `npm install @prisma/adapter-pg pg`
2. In `prisma/schema.prisma`, change `provider = "sqlite"` to
   `provider = "postgresql"`.
3. Update `prisma.config.ts` and `lib/prisma.ts` (and `prisma/seed.ts`) to
   construct a `PrismaPg` adapter instead of `PrismaBetterSqlite3`, pointed
   at a Postgres `DATABASE_URL`.
4. Run `npm run db:migrate` against the new database.
