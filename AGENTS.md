<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repository

Next.js 16 (App Router, TypeScript) client for an event-management app. This git repo is only the `client/` folder; the backend is a **sibling folder `../server`** (separate git repo: plain Express JS, single `index.js`, port 8000, `npm run dev` = nodemon, own `vercel.json`). The client never talks to Mongo for app data — all CRUD goes to `process.env.NEXT_PUBLIC_API_URL` (`http://localhost:8000` locally). The only MongoDB access in this repo is better-auth.

## Commands

- `npm run dev` / `build` / `start` — plain Next.js commands.
- `npm run lint` — `eslint` flat config (`eslint.config.mjs`). Currently 0 errors (a handful of pre-existing warnings); keep it error-free.
- `npm run typecheck` — `tsc --noEmit`; passes clean, keep it clean.
- `npm run format` — Prettier, but the script only covers `**/*.{ts,tsx}` (not css/md/json). `.prettierrc`: no semicolons, double quotes, `prettier-plugin-tailwindcss` class sorting. Run before committing.
- **No test suite exists.** Verification = `format` → `lint` → `typecheck` → `build`.
- `CLAUDE.md` is just `@AGENTS.md`; keep all guidance in this file.

## Architecture facts that aren't obvious

- **Middleware is `proxy.ts` at the repo root** (Next 16 renamed `middleware.ts` → `proxy.ts`, exporting `proxy` + `config.matcher`). It calls `auth.api.getSession` and redirects to `/login` when there's no session. Its matcher only lists the protected paths (`/dashboard/create`, `/joined-event`, `/manage-events`, `/events/:path`) — everything else is intentionally public. **Adding a protected page means adding it to that matcher.** Note `/events/:path` matches exactly one segment, so deeper routes need their own entry.
- The proxy is only a UX redirect; **real enforcement is on the Express side**: `verifyApi` middleware in `../server/index.js` checks the `Authorization` Bearer token (the better-auth JWT). Only `GET /all-events` and `GET /recent-events` are unguarded — every other endpoint 401s without a token.
- Server components that need the token call `auth.api.getToken({ headers: await headers() })` and forward it as `authorization: Bearer <token>` on their fetch (see `app/events/[id]/page.tsx`). Copy this pattern when adding a page that hits a guarded endpoint.
- Auth: better-auth with the Mongo adapter in `lib/auth.ts` (JWT plugin + cookie cache), handler mounted at `app/api/auth/[...all]/route.ts`, browser client `lib/auth-client.ts`. `lib/auth.ts` **throws at import time if `MONGODB_URI` is unset**, so build/dev fail early without `.env`.
- Required env (gitignored `.env`, keys verified): `MONGODB_URI`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_API_URL`. The last is inlined at build time into server-component fetches.
- Pages under `app/` mix thin wrappers (`app/page.tsx` → `components/home-page.tsx`) with pages that fetch for themselves (`app/events/[id]`, `app/manage-events/*`, `app/joined-event/*`). Data fetches use `cache: "no-store"` — dynamic pages, not ISR. Server-fetched API paths in use: `/all-events`, `/all-events/:id`, `/recent-events`, `/joined_people`, `/joined_people/:id`.
- shadcn/ui components live in `components/ui/` (config: `components.json`, add via `npx shadcn@latest add ...`); shared TS types live in `components/types.ts` and `components/joinTypes.ts`, not `lib/`.
- `cn` is the **`cn` npm package**, re-exported by `lib/utils.ts` — not the usual `clsx` + `tailwind-merge` implementation.
- Path alias: `@/*` → repo root.

## Git / working state

- Treat uncommitted changes as user work — don't revert or restage them.
- `.env*`, `.next/`, `*.tsbuildinfo`, `next-env.d.ts` are gitignored; never commit or print secrets.
- The `nextjs-agent-rules` block at the top is auto-generated — leave it intact and committed.
