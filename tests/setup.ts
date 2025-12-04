import '@testing-library/jest-dom'
import { vi } from 'vitest'
import React from 'react'

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// Mock Next.js server module for next-auth
vi.mock('next/server', () => {
  const NextResponse = {
    json: vi.fn((data, options) => ({
      status: options?.status || 200,
      headers: { 'Content-Type': 'application/json' },
      json: () => Promise.resolve(data),
    })),
    redirect: vi.fn(),
  };

  class NextRequest {
    body: BodyInit | null | undefined;
    constructor(input?: RequestInfo | URL, init?: RequestInit) {
      this.body = init?.body;
    }
    json() {
      if (typeof this.body === 'string') {
        return Promise.resolve(JSON.parse(this.body));
      }
      return Promise.resolve(null);
    }
  }

  return { NextResponse, NextRequest };
});

// Mock NextAuth
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(() => ({
    data: null,
    status: 'loading',
  })),
  signIn: vi.fn(),
  signOut: vi.fn(),
  SessionProvider: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
}))

// Mock Server Actions
vi.mock('@/lib/auth', () => ({
  signIn: vi.fn(),
  signOut: vi.fn(),
  auth: vi.fn(),
}))

// Mock next/image
vi.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // Return a simple img tag with a dummy src to avoid jsdom trying to fetch it
     
    return React.createElement('img', { ...props, src: 'test.jpg', alt: props.alt || '' })
  },
}))
