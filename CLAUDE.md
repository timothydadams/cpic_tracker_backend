# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CPIC Tracker Backend — an Express.js 5 REST API for a strategic planning/policy tracking system. Uses ES modules (`"type": "module"`), PostgreSQL via Prisma ORM, Redis for token blacklisting/caching, and Socket.IO for real-time features.

## Common Commands

- **Dev server:** `npm run dev` (nodemon on port 3500)
- **Production:** `npm start`
- **Install:** `npm install` (runs `prisma generate` automatically via postinstall)
- **Generate Prisma client:** `npx prisma generate`
- **Run migrations:** `npx prisma migrate dev`
- **Seed database:** `npx prisma db seed`
- **Reset database:** `npx prisma migrate reset`

### Testing

- **Run all tests:** `npm test` (vitest run)
- **Watch mode:** `npm run test:watch` (vitest)
- **Unit tests only:** `npm run test:unit`
- **Integration tests only:** `npm run test:integration`
- **Coverage:** `npm run test:coverage` (v8 provider, covers `server/**/*.js`)

## Architecture

### Request Flow

```
Routes → (verifyToken middleware) → (authorize middleware) → Controllers → Services → Prisma ORM
```

All API routes are mounted under `/api` in `server/express.js`.

### Directory Layout

- `server/routes/` — Express routers, one per resource. Wired together in `server/routes/index.js`
- `server/controllers/` — Request/response handling. Use `handleResponse(res, status, message, data)` from `server/utils/defaultResponse.js` for consistent JSON responses
- `server/services/` — Business logic and Prisma queries
- `server/middleware/` — Auth (`verifyToken`, `requireGlobalAdmin`), `authorize` (policy-based), `userContextMiddleware` (AsyncLocalStorage for PII filtering), error handler
- `server/resource_permissions/` — Per-resource authorization policies exporting `canCreate`, `canRead`, `canUpdate`, `canDelete` functions that take `(user, resource)` and return boolean
- `server/configs/` — Prisma client setup (`db.js`), CORS config, PII extension, AsyncLocalStorage context
- `server/errors/` — `AppError` class (extends Error with `statusCode` and `data`)
- `server/utils/` — Query string parsers, auth helpers, response formatter, comment tree builder (`commentTree.js`), username generator (`generateUsername.js`)
- `scripts/` — One-off maintenance scripts (e.g., `backfill-usernames.js`)

### Authorization Pattern

The `authorize(policy, resource)` middleware in `server/middleware/authorize.js` is a higher-order function. Each resource has a permissions file in `server/resource_permissions/` defining role-based access rules. The authenticated user is available at `res.locals.user` after `verifyToken` runs. Role flags (`isGlobalAdmin`, `isCPICAdmin`, `isCPICMember`, `isImplementer`) are set on `res.locals.user` by the `verifyToken` middleware. Truly public read endpoints (e.g., `GET /comments/:id`) skip `authorize` entirely since it requires auth context — do not wrap public controllers in `authorize` unless the route also has `verifyToken`.

### Authentication

Multiple auth methods: WebAuthn passkeys (`@simplewebauthn/server`), Google OAuth, and email/password (bcrypt). JWT access tokens in Bearer headers, refresh tokens in secure HTTP-only cookies. Token blacklisting via Redis on logout.

### Auth-Aware PII Stripping

The system uses AsyncLocalStorage (ALS) to propagate auth state from the middleware layer into the Prisma ORM layer, where a client extension strips PII fields (emails, phone numbers) for unauthenticated users. Three components cooperate:

1. **`userContextMiddleware`** (`server/middleware/prisma-als-middleware.js`) — Runs globally on every request. Uses hybrid auth detection: first checks the access token from the Authorization header (with Redis blacklist check), then falls back to the refresh token cookie. Sets `{ isAuthenticated, user }` in ALS. Never rejects requests.

2. **`verifyToken`** (`server/middleware/requireAuth.js`) — Runs per-route on protected endpoints. After successful verification, syncs the ALS store to ensure consistency between route-level auth and PII-level auth.

3. **`removePiiExtension`** (`server/configs/prisma-pii-extenstion.js`) — Prisma client extension that reads `isAuthenticated` from ALS. For unauthenticated users, applies `omit` on top-level PII fields and recursively sanitizes nested includes.

**Design rationale**: The cookie fallback ensures logged-in users see PII on public routes (where the frontend doesn't send an Authorization header). The `verifyToken` ALS sync ensures protected routes always have consistent auth state. The Redis blacklist check in `userContextMiddleware` prevents revoked tokens from bypassing PII stripping.

### Database

PostgreSQL with Prisma ORM. Schema at `prisma/schema.prisma`. Prisma client is generated to `prisma/generated/prisma/` (ESM format). The client is initialized with the PII extension in `server/configs/db.js`. Key domain models: Strategy, Policy, FocusArea, Implementer, Stakeholder, Comment (threaded with self-referential `parent_id`).

### Error Handling

Global error handler in `server/middleware/handleErrors.js` maps `AppError` instances and Prisma error codes (P2002 unique, P2025 not found, P2003 foreign key) to appropriate HTTP status codes.

### Testing Structure

Uses **Vitest** with globals enabled and Node environment. Config at `vitest.config.js`, setup file at `tests/setup.js` (sets test env vars).

```
tests/
├── setup.js                        — Test environment variables
├── fixtures/users.js               — Shared user fixtures
├── mocks/
│   ├── prisma.js                   — Prisma client mock
│   ├── redis.js                    — Redis client mock
│   └── express.js                  — Express req/res/next mock helpers
├── unit/
│   ├── middleware/                  — verifyToken, authorize, errorHandler, etc.
│   ├── resource_permissions/       — Permission policy tests per resource
│   ├── services/                   — Service layer tests
│   └── utils/                      — Utility function tests
└── integration/
    └── routes/                     — Supertest-based route tests per resource
```

- **Unit tests** mock Prisma and Redis via `tests/mocks/`. Use `vi.mock()` for module-level mocking.
- **Integration tests** use Supertest against the Express app to test full request/response cycles.
- Test files follow the naming convention `<module>.test.js` and mirror the `server/` directory structure.

## Environment

Copy `.env-sample` to `.env`. Key variables: `DATABASE_URL` (PostgreSQL), `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `REDIS_SERVICE_URL` (production only; dev uses `localhost:6379`), `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `FRONTEND_DOMAIN`.

## Docker

`docker-compose.yml` runs the Express app and Redis. Port 3500 for the API, 6379 for Redis.
