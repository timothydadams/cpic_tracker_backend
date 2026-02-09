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

No test framework or linter is currently configured.

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
- `server/utils/` — Query string parsers, auth helpers, response formatter

### Authorization Pattern

The `authorize(policy, resource)` middleware in `server/middleware/authorize.js` is a higher-order function. Each resource has a permissions file in `server/resource_permissions/` defining role-based access rules. The authenticated user is available at `res.locals.user` after `verifyToken` runs. Role flags (`isGlobalAdmin`, `isCPICAdmin`, `isCPICMember`, `isImplementer`) are set on `res.locals.user` by the `verifyToken` middleware.

### Authentication

Multiple auth methods: WebAuthn passkeys (`@simplewebauthn/server`), Google OAuth, and email/password (bcrypt). JWT access tokens in Bearer headers, refresh tokens in secure HTTP-only cookies. Token blacklisting via Redis on logout.

### PII Privacy Extension

A custom Prisma client extension (`server/configs/prisma-pii-extenstion.js`) uses AsyncLocalStorage (`server/middleware/prisma-als-middleware.js`) to strip PII fields (emails, phone numbers) from query results for unauthenticated users.

### Database

PostgreSQL with Prisma ORM. Schema at `prisma/schema.prisma`. Prisma client is generated to `prisma/generated/prisma/` (ESM format). The client is initialized with the PII extension in `server/configs/db.js`. Key domain models: Strategy, Policy, FocusArea, Implementer, Stakeholder, Comment (threaded with self-referential `parent_id`).

### Error Handling

Global error handler in `server/middleware/handleErrors.js` maps `AppError` instances and Prisma error codes (P2002 unique, P2025 not found, P2003 foreign key) to appropriate HTTP status codes.

## Environment

Copy `.env-sample` to `.env`. Key variables: `DATABASE_URL` (PostgreSQL), `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `REDIS_SERVICE_URL` (production only; dev uses `localhost:6379`), `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `FRONTEND_DOMAIN`.

## Docker

`docker-compose.yml` runs the Express app and Redis. Port 3500 for the API, 6379 for Redis.
