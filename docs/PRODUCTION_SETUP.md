---
description: Production Environment Setup for NextAuth.js
---

# Production Environment Setup for NextAuth.js

The error `MissingSecret: Please define a 'secret'` indicates that the `AUTH_SECRET` environment variable is missing in your production environment.

## 1. Generate a Secret

You can generate a secure random secret using the following command:

```bash
npx auth secret
```

This will add `AUTH_SECRET` to your `.env.local` file.

Alternatively, you can generate one using `openssl`:

```bash
openssl rand -base64 32
```

## 2. Configure Environment Variables

### Vercel (Production)

1. Go to your Vercel project dashboard.
2. Navigate to **Settings** > **Environment Variables**.
3. Add a new variable:
   - **Key**: `AUTH_SECRET`
   - **Value**: (The secret you generated in step 1)
   - **Environments**: Check `Production`, `Preview`, and `Development`.

### Other Hosting Platforms

Ensure that `AUTH_SECRET` is set in your deployment environment variables.

## 3. Verify `auth.config.ts` (Optional but Recommended)

Although NextAuth.js v5 automatically infers `AUTH_SECRET` from the environment variable, you can explicitly add it to your configuration if issues persist, but it is generally not required if the environment variable is set correctly.

```typescript
// src/auth.config.ts
export const authConfig = {
  // ...
  secret: process.env.AUTH_SECRET, // explicit fallback (usually not needed in v5)
}
```

## 4. Checklist

- [ ] `AUTH_SECRET` is generated.
- [ ] `AUTH_SECRET` is added to Vercel/Production environment variables.
- [ ] `AUTH_URL` (optional in Vercel, but good practice) is set to your canonical URL (e.g., `https://your-app.com`).
- [ ] `AUTH_TRUST_HOST` is set to `true` if you are behind a proxy or using Vercel Preview deployments (Vercel sets this automatically).
