---
description: Database Connection Strategy for Vercel and Supabase
---

# Database Connection Strategy

To ensure stability in Vercel's serverless environment while allowing migrations to run correctly, we use a dynamic connection strategy in `prisma.config.ts`.

## The Problem

*   **Runtime (Next.js)**: Needs to use the **Transaction Pooler** (`DATABASE_URL`, port 6543) to handle many concurrent serverless function invocations without exhausting database connections.
*   **Migrations (`prisma migrate`)**: Needs a **Direct Connection** (`DIRECT_URL`, port 5432) because the transaction pooler does not support all SQL commands required for migrations.

## The Solution

We configured `prisma.config.ts` to switch the `url` based on an environment variable `PRISMA_MIGRATION`.

```typescript
// prisma.config.ts
datasource: {
  url: process.env.PRISMA_MIGRATION === "true" ? env("DIRECT_URL") : env("DATABASE_URL"),
}
```

## How to Use

### 1. Regular Development & Production Runtime
The application automatically uses `DATABASE_URL` (Pooler). No special action needed.

### 2. Running Migrations
Use the custom script defined in `package.json`:

```bash
npm run migrate
```

This script runs: `cross-env PRISMA_MIGRATION=true prisma migrate dev`

### 3. Environment Variables
Ensure your `.env` (local) and Vercel Environment Variables have both:

*   `DATABASE_URL`: Connection string for Transaction Pooler (e.g., `postgres://...:6543/...`)
*   `DIRECT_URL`: Connection string for Session/Direct connection (e.g., `postgres://...:5432/...`)

> 💡 **Vercel Postgres shortcut**  
> Vercel automatically injects `POSTGRES_PRISMA_URL`, `POSTGRES_URL`, and `POSTGRES_URL_NON_POOLING`.  
> The runtime automatically falls back to those keys (and, as a last resort, `DIRECT_URL`) when `DATABASE_URL` is missing, but we still recommend defining `DATABASE_URL` explicitly so CLI tools and local scripts behave consistently.
