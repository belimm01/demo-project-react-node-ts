# demo-project-react-node-ts

A small full-stack TypeScript demo: a React single-page app for creating and
listing user credentials, backed by an Express + TypeORM API on PostgreSQL.

## Architecture

```
react-ts-hook-app  ──HTTP──▶  server  ──TypeORM──▶  PostgreSQL
   (Vite + React 19)          (Express 5)             (postgres)
   :3000 dev / :8080 prod     :3030
```

- **`react-ts-hook-app/`** — Vite + React 19 client. Uses
  `@tanstack/react-query` for data fetching, `react-hook-form` for the create
  form, and the native `fetch` API. The API base URL comes from `VITE_API_URL`.
- **`server/`** — Express 5 API (ES modules) exposing the credential
  endpoints. Persistence is via a TypeORM `DataSource`; all configuration and
  secrets are read from the environment.
- **`docker/`** — `docker-compose.yml` for a full local stack (Postgres +
  server + client).

### API

| Method | Path                          | Description                     |
| ------ | ----------------------------- | ------------------------------- |
| GET    | `/health`                     | Liveness probe                  |
| GET    | `/api/user/credentials/all`   | List all stored credentials     |
| POST   | `/api/user/credentials/save`  | Create a credential record      |

## Prerequisites

- Node.js 20+ and npm 10+
- Docker (optional, for the database or the full stack)

## Quick start

The fastest path is Docker Compose, which builds both apps and starts Postgres:

```bash
cd docker
docker compose up --build
```

- Client: http://localhost:8080
- API: http://localhost:3030 (try http://localhost:3030/health)

## Local development

Run Postgres (via Docker) and then each app in its own terminal.

**1. Database**

```bash
cd docker
docker compose up -d postgres
```

**2. Server**

```bash
cd server
cp .env.example .env      # adjust credentials if needed
npm install
npm run dev               # starts on http://localhost:3030 with watch reload
```

**3. Client**

```bash
cd react-ts-hook-app
cp .env.example .env      # VITE_API_URL defaults to http://localhost:3030
npm install
npm run dev               # starts on http://localhost:3000
```

## Configuration

Server (`server/.env`, see `.env.example`):

| Variable      | Default       | Purpose                          |
| ------------- | ------------- | -------------------------------- |
| `PORT`        | `3030`        | HTTP port                        |
| `CORS_ORIGIN` | `*`           | Allowed CORS origin              |
| `DB_HOST`     | `localhost`   | PostgreSQL host                  |
| `DB_PORT`     | `5432`        | PostgreSQL port                  |
| `DB_USERNAME` | `postgres`    | PostgreSQL user                  |
| `DB_PASSWORD` | `postgres`    | PostgreSQL password              |
| `DB_NAME`     | `postgres`    | PostgreSQL database              |

Client (`react-ts-hook-app/.env`): `VITE_API_URL` — base URL of the API.

> The schema is auto-created via TypeORM `synchronize: true`, which is fine for
> this demo. For production use migrations instead.

## Useful scripts

Both packages expose the same verbs:

| Command             | Server                | Client                    |
| ------------------- | --------------------- | ------------------------- |
| `npm run dev`       | tsx watch             | Vite dev server           |
| `npm run build`     | `tsc` → `dist/`       | `tsc -b` + `vite build`   |
| `npm run typecheck` | `tsc --noEmit`        | `tsc --noEmit`            |
| `npm run lint`      | ESLint (flat config)  | ESLint (flat config)      |
| `npm test`          | —                     | Vitest                    |
| `npm start`         | `node dist/app.js`    | —                         |
