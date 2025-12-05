import { describe, it, expect, vi, beforeEach } from "vitest"

import { GET } from "@/app/api/github/repos/route"
import { auth } from "@/lib/auth"
import type { Session } from "next-auth"
import type { GithubRepository } from "@/app/api/github/repos/route"
import { mockSession } from "../helpers"

// Mock auth
vi.mock("@/lib/auth", () => ({
  auth: vi.fn(),
}))

describe("GET /api/github/repos", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return 401 if user is not authenticated", async () => {
    vi.mocked(auth as unknown as () => Promise<Session | null>).mockResolvedValue(null)

    const response = await GET()

    expect(response.status).toBe(401)
    await expect(response.json()).resolves.toEqual({ message: "Unauthorized" })
  })

  it("should return 401 if user has no access token", async () => {
    vi.mocked(auth as unknown as () => Promise<Session | null>).mockResolvedValue(
      mockSession({
        user: {
          id: "user123",
          name: "Test User",
          email: "test@example.com",
          image: "https://example.com/avatar.png",
          // No accessToken
        }
      })
    )

    const response = await GET()

    expect(response.status).toBe(401)
    await expect(response.json()).resolves.toEqual({ message: "Unauthorized" })
  })

  it("should return a list of non-forked repositories for an authenticated user", async () => {
    const mockAccessToken = "mock_access_token"
    vi.mocked(auth as unknown as () => Promise<Session | null>).mockResolvedValue(
      mockSession({
        user: {
          id: "user123",
          accessToken: mockAccessToken,
          name: "Test User",
          email: "test@example.com",
          image: "https://example.com/avatar.png",
        }
      })
    )

    const mockGithubRepos: GithubRepository[] = [
      { id: 1, name: "repo-a", full_name: "user/repo-a", html_url: "url-a", description: "desc-a", fork: false },
      { id: 2, name: "repo-b", full_name: "user/repo-b", html_url: "url-b", description: "desc-b", fork: true },
      { id: 3, name: "repo-c", full_name: "user/repo-c", html_url: "url-c", description: "desc-c", fork: false },
    ]

    vi.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify(mockGithubRepos), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    )

    const response = await GET()

    expect(response.status).toBe(200)
    const jsonResponse = await response.json() as { githubId: number }[]
    expect(jsonResponse).toEqual([
      { githubId: 1, name: "repo-a", fullName: "user/repo-a", url: "url-a", description: "desc-a" },
      { githubId: 3, name: "repo-c", fullName: "user/repo-c", url: "url-c", description: "desc-c" },
    ])
    expect(jsonResponse.some((repo) => repo.githubId === 2)).toBeFalsy()

    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.github.com/user/repos?type=owner",
      expect.objectContaining({
        headers: {
          Authorization: `token ${mockAccessToken}`,
        },
      }),
    )
  })

  it("should return 500 if GitHub API returns an error", async () => {
    const mockAccessToken = "mock_access_token"
    vi.mocked(auth as unknown as () => Promise<Session | null>).mockResolvedValue(
      mockSession({
        user: {
          id: "user123",
          accessToken: mockAccessToken,
          name: "Test User",
          email: "test@example.com",
          image: "https://example.com/avatar.png",
        }
      })
    )

    vi.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response("GitHub API Error", {
        status: 500,
        statusText: "Internal Server Error",
      })
    )

    const response = await GET()

    expect(response.status).toBe(500)
    await expect(response.json()).resolves.toEqual({ message: "Failed to fetch repositories from GitHub", error: "GitHub API Error" })
  })
})
