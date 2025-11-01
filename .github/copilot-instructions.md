## Purpose

This file gives concise, actionable guidance for AI coding agents working in the `slack` repo so they can be productive immediately.

Follow these rules and examples when making changes.

## Top-level overview

- This repository contains a small Express-based backend under `slack-backend/`.
- Entry point: `slack-backend/src/index.js` (ESM-style imports; package.json uses "type": "module").
- Configuration: environment variables are loaded from `.env` via `src/config/serverConfig.js` (uses `dotenv`).
- Database: MongoDB with Mongoose ODM; connection config in `src/config/dbConfig.js`.

## Important files

- `slack-backend/package.json` — contains scripts and dependencies including Express, Mongoose, dotenv, and nodemon.
- `slack-backend/src/index.js` — starts an Express server and reads `PORT` from `src/config/serverConfig.js`.
- `slack-backend/src/config/serverConfig.js` — calls `dotenv.config()` and exports `PORT`, `NODE_ENV`, and `MONGO_URI`.
- `slack-backend/src/config/dbConfig.js` — MongoDB connection logic using Mongoose; connects to localhost in dev, uses MONGO_URI in production.
- `docker-compose.yml` — production setup with backend and MongoDB services.
- `docker-compose.dev.yml` — development setup with hot-reload and volume mounts.
- `DOCKER.md` — comprehensive Docker usage guide.

## Project-specific conventions & gotchas

- ESM modules only: the backend uses native ESM imports ("type": "module"). Use `import`/`export` and avoid CommonJS `require`.
- Small single-service layout: all runtime code lives under `slack-backend/src/` and config under `src/config/`.
- dotenv is used for runtime configuration. Expect `.env` at the `slack-backend/` level (not committed here). When adding new config values, add them to `serverConfig.js` or a new config module under `src/config/`.
- Scripts: the `dev` script uses `nodemon src/index.js`. Run from `slack-backend` directory (see example below).
- MongoDB connection: in development, connects to `mongodb://localhost:27017/slackDB`; in production uses `MONGO_URI` env var.
- Import paths: always include `.js` extension when importing local modules (ESM requirement).

## Build / run / debug (what works now)

Examples an agent can use or suggest:

1) Install and run development server (local)

   cd slack-backend
   npm install
   npm run dev

2) Quick run (no nodemon)

   cd slack-backend
   node ./src/index.js

3) Run with Docker (production)

   docker-compose up -d
   docker-compose logs -f backend

4) Run with Docker (development with hot-reload)

   docker-compose -f docker-compose.dev.yml up -d
   docker-compose -f docker-compose.dev.yml logs -f backend

Note: MongoDB must be running (locally or via Docker) for the app to start successfully. See `DOCKER.md` for comprehensive Docker usage.

## Editing patterns and PR guidance for agents

- Keep changes minimal and localized. For backend changes, update files within `slack-backend/src/` and `slack-backend/package.json` only.
- When adding new environment variables, update `src/config/serverConfig.js` and include an example `.env.example` entry in the repo root or `slack-backend/` (ask the repo owner first).
- Use ESM import style across new files. Example: `import express from 'express'`.

## Examples from this codebase

- Reading the port:

  // slack-backend/src/config/serverConfig.js
  import dotenv from 'dotenv'
  dotenv.config()
  export const PORT = process.env.PORT || 3000

- Starting the server:

  // slack-backend/src/index.js
  import express from 'express'
  import { PORT } from './config/serverConfig.js'
  const app = express()
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

## What not to assume

- There are no tests or CI config present. Don't assume a test framework or build pipeline is in place.
- There's no contributor or PR guideline in the repo — ask the maintainer before introducing repository-wide processes.

## When you make changes

- Run the dev script locally from `slack-backend/` to sanity-check runtime behavior.
- If you modify `package.json`, validate JSON syntax and `npm install` locally.
- Keep changes small and explain reasoning in PR description (what was changed and why). Point reviewers to `src/index.js` and `src/config/serverConfig.js` for runtime changes.

If anything above is unclear, tell me which section you want expanded or provide additional repo context and I'll iterate.
