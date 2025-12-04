import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import BrowseRepositoriesView from "@/components/dashboard/views/BrowseRepositoriesView"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"
import { mockSession } from "../../helpers"

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe("BrowseRepositoriesView", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useSession).mockClear()
  })

  it("should display a loading message when session status is loading", () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: "loading",
      update: vi.fn(),
    })
    render(<BrowseRepositoriesView />)
    expect(screen.getByText("Loading registered repositories...")).toBeInTheDocument()
  })

  it("should display a login prompt if not authenticated", async () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: "unauthenticated",
      update: vi.fn(),
    })
    render(<BrowseRepositoriesView />)
    await waitFor(() => {
      expect(screen.getByText("Please log in to browse repositories.")).toBeInTheDocument()
    })
  })

  it("should display a list of registered repositories for an authenticated user", async () => {
    vi.mocked(useSession).mockReturnValue({
      data: mockSession({
        user: { id: "user123", name: "Test User", username: "testuser", karma: 100 },
      }),
      status: "authenticated",
      update: vi.fn(),
    })
    const mockRegisteredRepos = [
      {
        id: "repo1",
        githubId: 1,
        name: "repo-one",
        fullName: "user/repo-one",
        url: "url-one",
        description: "desc-one",
        createdAt: new Date().toISOString(),
        registeredBy: { id: "regUser1", name: "Reg User A", username: "regusera", image: null },
      },
      {
        id: "repo2",
        githubId: 2,
        name: "repo-two",
        fullName: "user/repo-two",
        url: "url-two",
        description: "desc-two",
        createdAt: new Date().toISOString(),
        registeredBy: { id: "regUser2", name: "Reg User B", username: "reguserb", image: "avatar.jpg" },
      },
    ]
    vi.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify(mockRegisteredRepos), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    )
    render(<BrowseRepositoriesView />)
    await waitFor(() => {
      expect(screen.getByText("Browse Registered Repositories")).toBeInTheDocument()
      expect(screen.getByText("user/repo-one")).toBeInTheDocument()
      expect(screen.getByText("user/repo-two")).toBeInTheDocument()
      expect(screen.getByText(/Registered by: Reg User A/)).toBeInTheDocument()
      expect(screen.getByText(/Registered by: Reg User B/)).toBeInTheDocument()
      expect(screen.getByAltText("reguserb")).toBeInTheDocument()
    })
  })

  it("should display a message if no repositories are registered", async () => {
    vi.mocked(useSession).mockReturnValue({
      data: mockSession({
        user: { id: "user123", name: "Test User", username: "testuser", karma: 100 },
      }),
      status: "authenticated",
      update: vi.fn(),
    })
    vi.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    )
    render(<BrowseRepositoriesView />)
    await waitFor(() => {
      expect(screen.getByText("No repositories have been registered yet.")).toBeInTheDocument()
    })
  })

  it("should display error message if fetching registered repositories fails", async () => {
    vi.mocked(useSession).mockReturnValue({
      data: mockSession({
        user: { id: "user123", name: "Test User", username: "testuser", karma: 100 },
      }),
      status: "authenticated",
      update: vi.fn(),
    })
    vi.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ message: "Failed to fetch" }), {
        status: 500,
      })
    )
    render(<BrowseRepositoriesView />)
    await waitFor(() => {
      expect(screen.getByText("Error: Failed to fetch")).toBeInTheDocument()
      expect(toast.error).toHaveBeenCalledWith("Failed to fetch")
    })
  })
})
