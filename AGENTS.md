# Base44 Development Environment

## Stack
- **Vite 8 + React 19 + TypeScript** frontend with Tailwind CSS v4
- **Express** backend (`server.ts`) that serves both the API and the Vite dev server (middleware mode) on a single port (3000)
- Data persisted to `data/registrations.json` (JSON file, no database)
- `tsx` runs `server.ts` directly in dev — no separate build step needed for development

## Running
```
docker compose -f docker-compose.base44.yml up -d
```
- Uses `node:22-slim`, bind-mounts the repo at `/app`, installs deps on startup with `npm install --legacy-peer-deps` (the `esbuild` peer dep conflict between Vite 8 and the pinned `esbuild@^0.25.0` requires this flag).
- Dev server binds `0.0.0.0:3000`; Vite middleware mode serves live source (edits hot-reload).
- Healthcheck probes `GET /api/registrations`.

## Notes
- **No lockfile** exists in the repo; `npm install` resolves versions fresh each boot.
- `GEMINI_API_KEY` is listed in `.env.example` and `metadata.json` but is **not referenced anywhere in the code** — the app boots and fully works without it. Only needed if Gemini AI features are introduced.
- The `data/` directory is bind-mounted, so registrations persist across container restarts.
- Admin login passcodes are hardcoded in `server.ts` (`/api/admin/login`): `skill2scale2026`, `admin2026`, or `admin`.
