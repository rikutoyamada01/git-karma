---
description: Troubleshooting Vercel Preview Database Connection
---

# Troubleshooting Vercel Preview Database Connection

If you are encountering a `500` error on Vercel Preview related to database connection, despite having `DATABASE_URL` and `DIRECT_URL` set for "All Environments", consider the following:

## 1. Connection Pooling vs. Direct Connection

Supabase provides two connection strings:
*   **Transaction Pooler (Port 6543)**: Usually assigned to `DATABASE_URL`. Best for serverless environments (like Vercel) to manage many connections.
*   **Session Pooler / Direct (Port 5432)**: Usually assigned to `DIRECT_URL`. Used for migrations (`prisma migrate`) and sometimes direct queries.

### Prisma Configuration

In your `prisma.config.ts`, you are using:

```typescript
datasource: {
  url: env("DIRECT_URL"),
},
```

**Issue:**
Using `DIRECT_URL` (Port 5432) in a serverless environment (Vercel) can quickly exhaust the database connection limit, leading to timeouts or connection errors (`500`).

**Recommendation:**
For the application runtime (Next.js API routes), you should use the **Transaction Pooler** (`DATABASE_URL`).

Update `prisma.config.ts` to use `DATABASE_URL` for the application connection, or ensure `DIRECT_URL` points to the Transaction Pooler if that was your intent (though naming suggests otherwise).

## 2. SSL/TLS Settings

Supabase requires SSL. Ensure your connection string includes `?pgbouncer=true` (for transaction pooler) or appropriate SSL parameters.

## 3. "All Environments" Trap

Even if Vercel says "All Environments", sometimes the specific deployment doesn't pick up the change until a **Redeploy**.

*   Go to Vercel > Deployments.
*   Find the failed Preview deployment.
*   Click the three dots menu > **Redeploy**.

## 4. Check Logs

The most definitive answer is in the Vercel Function Logs. Look for:
*   `P1001`: Can't reach database server (Network/Auth issue)
*   `P1003`: Table does not exist (Migration issue)
*   `500`: Generic error (could be connection timeout)
