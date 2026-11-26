<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Repository

Next.js 16 (App Router, TypeScript) client for an event-management app. This git repo is only the `client/` folder; the backend is a **sibling folder `../server`** (separate git repo: plain Express JS, port 8000, `npm run dev` = nodemon, deployed via its own `vercel.json`). The client never does CRUD against Mongo directly — data calls go to `process.env.NEXT_PUBLIC_API_URL` (`http://localhost:8000` locally). Only MongoDB access inside this repo is better-auth.

## Commands

- `npm run dev` / `build` / `start` — plain Next.js commands.
- `npm run lint` — `eslint` with flat config (`eslint.config.mjs`), lints the current dir. Currently **0 errors, 19 warnings**; keep it error-free.
- `npm run typecheck` — `tsc --noEmit`; passes clean today, keep it clean.
- `npm run format` — Prettier, but **only over `**/*.{ts,tsx}`** (not css/md/json). Config (`.prettierrc`): no semicolons, double quotes, `prettier-plugin-tailwindcss` class sorting. Run before committing.
- **No test suite exists.** Verification = `format` → `lint` → `typecheck` → `build`.
- `CLAUDE.md` is just `@AGENTS.md`; keep all guidance in this file.

## Architecture facts that aren't obvious

- **Middleware is `proxy.ts` at the repo root** (Next 16 renamed `middleware.ts` → `proxy.ts`, exporting `proxy` + `config.matcher`). It guards routes with `auth.api.getSession`; its matcher lists the protected paths (`/dashboard/create`, `/joined-event`, `/manage-events`, `/events/*`). **Adding a protected page means adding it to that matcher** — and remember the matcher only runs client-side, real auth is enforced by the API.
- Auth: better-auth with the Mongo adapter in `lib/auth.ts` (JWT plugin + cookie cache), handler mounted at `app/api/auth/[...all]/route.ts`, browser client `lib/auth-client.ts`. `lib/auth.ts` **throws at import time if `MONGODB_URI` is unset**, so builds/dev fail early without `.env`.
- Required env (all in gitignored `.env`): `MONGODB_URI`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_ID/SECRET`, `NEXT_PUBLIC_API_URL`. Last one is inlined at build time into server-component fetches.
- Pages under `app/` are thin wrappers; real UI/data-fetch lives in `components/` (e.g. `components/events-page.tsx`). Server components fetch directly from Express endpoints `/all-events`, `/all-events/:id`, `/recent-events`, `/joined_people`.
- shadcn/ui components live in `components/ui/`; `cn` comes from the `cn` npm package re-exported by `lib/utils.ts` (not the usual `clsx/tailwind-merge` implementation).
- Path alias: `@/*` → repo root.

## Git / working state

- Treat uncommitted changes as user work — don't revert or restage them.
- `.env*`, `.next/`, `*.tsbuildinfo`, `next-env.d.ts` are gitignored; never commit or print secrets.
- The `nextjs-agent-rules` block at the top is auto-generated — leave it intact and committed.
