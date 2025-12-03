// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type NextAuth, { DefaultSession, DefaultUser } from "next-auth"
import { DefaultJWT } from "next-auth/jwt"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { AdapterUser } from "next-auth/adapters"

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string; // Make id non-optional in Session.user
      karma?: number;
      username?: string;
    }
  }

  interface User extends DefaultUser {
    id: string; // Already non-optional
    karma?: number;
    username?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string; // Make id non-optional in JWT
    karma?: number;
    username?: string;
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    id: string; // Ensure AdapterUser has a non-optional id
    karma?: number;
    username?: string;
  }
}

// Extend the Profile type for GitHub to include 'login'
declare module "next-auth/providers/github" {
  interface GitHubProfile {
    login?: string;
  }
}