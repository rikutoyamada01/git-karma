import { describe, it, expect } from 'vitest'
import { authConfig } from '../../src/auth.config'

// Mock Request and Response for Edge Runtime simulation
const createMockRequest = (url: string, isLoggedIn: boolean) => {
  return {
    nextUrl: new URL(url, 'http://localhost:3000'),
    auth: isLoggedIn ? { user: { name: 'Test User' } } : null,
  }
}

describe('Auth Configuration (Middleware Logic)', () => {
  describe('authorized callback', () => {
    const { authorized } = authConfig.callbacks!

    it('should allow access to public pages when not logged in', async () => {
      const req = createMockRequest('/', false)
      // @ts-expect-error - Mocking the context object for testing
      const result = await authorized({ auth: req.auth, request: req })
      expect(result).toBe(true)
    })

    it('should redirect unauthenticated users from protected dashboard routes', async () => {
      const req = createMockRequest('/dashboard', false)
      // @ts-expect-error - Mocking the context object for testing
      const result = await authorized({ auth: req.auth, request: req })
      expect(result).toBe(false) // false triggers redirect to login in NextAuth middleware
    })

    it('should allow authenticated users to access dashboard', async () => {
      const req = createMockRequest('/dashboard', true)
      // @ts-expect-error - Mocking the context object for testing
      const result = await authorized({ auth: req.auth, request: req })
      expect(result).toBe(true)
    })

    it('should redirect authenticated users away from login page', async () => {
        const req = createMockRequest('/login', true)
        // @ts-expect-error - Mocking the context object for testing
        const result = await authorized({ auth: req.auth, request: req })
        // Expecting a Response object for redirect
        expect(result).toBeInstanceOf(Response)
        expect((result as Response).headers.get('Location')).toBe('http://localhost:3000/dashboard')
    })

    it('should allow unauthenticated users to access login page', async () => {
        const req = createMockRequest('/login', false)
        // @ts-expect-error - Mocking the context object for testing
        const result = await authorized({ auth: req.auth, request: req })
        expect(result).toBe(true)
    })
  })
})
