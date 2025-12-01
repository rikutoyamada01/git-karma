# Coding Rules

To maintain code quality and consistency across the Git Karma project, please adhere to the following coding rules.

## 1. General Principles

- **TypeScript First**: All new code must be written in TypeScript. Avoid `any` types; use explicit types or generics.
- **Functional Components**: Use React Functional Components with Hooks. Class components are discouraged.
- **Server Components by Default**: In Next.js App Router, components are Server Components by default. Only add `"use client"` when interactivity (state, effects, event listeners) is required.

## 2. Naming Conventions

- **Files & Directories**:
  - Components: `PascalCase.tsx` (e.g., `UserProfile.tsx`)
  - Utilities/Hooks: `camelCase.ts` (e.g., `useAuth.ts`, `formatDate.ts`)
  - Constants: `UPPER_SNAKE_CASE`
- **Variables & Functions**: `camelCase`
- **Components**: `PascalCase`
- **Interfaces/Types**: `PascalCase` (No `I` prefix for interfaces)

## 3. Directory Structure & Colocation

- **Colocation**: Keep related files close together. If a component is only used in one feature, keep it in that feature's directory.
- **Shared Components**: Reusable UI components go in `src/components/ui` or `src/components/common`.
- **Features**: Feature-specific logic goes in `src/features/` or `src/components/<feature>`.

## 4. Styling (Tailwind CSS)

- **Utility First**: Use Tailwind CSS utility classes for styling.
- **Avoid Arbitrary Values**: Avoid using `w-[123px]` unless absolutely necessary. Use theme values (e.g., `w-32`).
- **Class Sorting**: Ideally, follow a consistent order (e.g., layout -> spacing -> typography -> visual).

## 5. State Management

- **Server State**: Prefer fetching data on the server (Server Components) and passing it down.
- **Client State**: Use `useState` and `useReducer` for local UI state.
- **Global State**: Minimize global state. Use Context API only when necessary for widely accessible data (like Theme or Auth).

## 6. Database & API

- **Prisma**: Use the global Prisma client instance from `@/lib/prisma`.
- **Server Actions**: Prefer Server Actions for mutations over API routes where appropriate.
- **Validation**: Use **Zod** for schema validation on both client (forms) and server (API inputs).

## 7. Testing

- **Unit Tests**: Write unit tests for utility functions and complex logic using Vitest.
- **Component Tests**: Test critical UI components.

## 8. Git & Commits

- **Conventional Commits**: Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.
  - `feat`: New feature
  - `fix`: Bug fix
  - `docs`: Documentation only
  - `style`: Formatting, missing semi colons, etc.
  - `refactor`: Code change that neither fixes a bug nor adds a feature
  - `test`: Adding missing tests
  - `chore`: Maintenance tasks
