# System Architecture

Git Karma is built as a monolithic Next.js application, leveraging the App Router for both frontend UI and backend API routes.

## Tech Stack

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/) (v7) - Uses dynamic connection switching for serverless compatibility.
- **Authentication**: [NextAuth.js](https://next-auth.js.org/) (v5) - Implemented via `src/proxy.ts` middleware.
- **Styling**: Tailwind CSS (via `globals.css` and utility classes)
- **Testing**: [Vitest](https://vitest.dev/)

## Directory Structure

```
src/
├── app/                 # Next.js App Router
│   ├── (dashboard)/     # Dashboard layout group
│   ├── api/             # API Routes (Backend)
│   └── page.tsx         # Landing page
├── components/          # React components
│   ├── dashboard/       # Dashboard-specific components
│   └── ...
├── lib/                 # Shared utilities
│   ├── prisma.ts        # Prisma client instance
│   └── auth.ts          # NextAuth configuration
└── ...
```

## Key Concepts

### Frontend
The frontend is server-rendered by default (React Server Components), with client-side interactivity added via `"use client"` directives where necessary. We use a component-based architecture.

### Backend (API)
The API resides in `src/app/api`. It handles data fetching and mutations.
- **Authentication**: Protected routes use `auth()` from `@/lib/auth` to verify sessions.
- **Validation**: We use [Zod](https://zod.dev/) for runtime request validation.
- **Database Access**: All database access is done via Prisma Client.
