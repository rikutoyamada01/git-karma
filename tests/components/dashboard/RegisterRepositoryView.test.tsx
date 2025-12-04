import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import RegisterRepositoryView from "@/components/dashboard/views/RegisterRepositoryView"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"
import { mockSession } from "../../helpers"

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}))

describe("RegisterRepositoryView", () => {
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
    render(<RegisterRepositoryView />)
    expect(screen.getByText("Loading GitHub repositories...")).toBeInTheDocument()
  })

  it("should display a login prompt if not authenticated", async () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: "unauthenticated",
      update: vi.fn(),
    })
    render(<RegisterRepositoryView />)
    await waitFor(() => {
      expect(screen.getByText("Please log in to register repositories.")).toBeInTheDocument()
    })
  })

  it("should display a list of repositories for an authenticated user", async () => {
    vi.mocked(useSession).mockReturnValue({
      data: mockSession({
        user: { id: "user123", name: "Test User" },
      }),
      status: "authenticated",
      update: vi.fn(),
    })
    vi.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(
        JSON.stringify([
          { githubId: 1, name: "repo-a", fullName: "user/repo-a", url: "url-a", description: "desc-a" },
          { githubId: 2, name: "repo-b", fullName: "user/repo-b", url: "url-b", description: "desc-b" },
        ]),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      )
    )
    render(<RegisterRepositoryView />)
    await waitFor(() => {
      expect(screen.getByText("Register Your GitHub Repositories")).toBeInTheDocument()
      expect(screen.getByText("user/repo-a")).toBeInTheDocument()
      expect(screen.getByText("user/repo-b")).toBeInTheDocument()
      expect(screen.getAllByRole("button", { name: "Register" })).toHaveLength(2)
    })
  })

  it("should call the API and display success toast when Register button is clicked", async () => {
    vi.mocked(useSession).mockReturnValue({
      data: mockSession({
        user: { id: "user123", name: "Test User" },
      }),
      status: "authenticated",
      update: vi.fn(),
    })
    vi.spyOn(global, "fetch")
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify([
            { githubId: 1, name: "repo-a", fullName: "user/repo-a", url: "url-a", description: "desc-a" },
          ]),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        )
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({}), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      )
    render(<RegisterRepositoryView />)
    await waitFor(() => {
      expect(screen.getByText("user/repo-a")).toBeInTheDocument()
    })

    const registerButton = screen.getByRole("button", { name: "Register" })
    await userEvent.click(registerButton)

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/repositories", expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ githubId: 1, name: "repo-a", fullName: "user/repo-a", url: "url-a", description: "desc-a" }),
      }))
      expect(toast.success).toHaveBeenCalledWith("Repository registered successfully!")
      expect(screen.queryByText("user/repo-a")).not.toBeInTheDocument()
    })
  })

  it("should display error toast if repository registration fails", async () => {
    vi.mocked(useSession).mockReturnValue({
      data: mockSession({
        user: { id: "user123", name: "Test User" },
      }),
      status: "authenticated",
      update: vi.fn(),
    })
    vi.spyOn(global, "fetch")
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify([
            { githubId: 1, name: "repo-a", fullName: "user/repo-a", url: "url-a", description: "desc-a" },
          ]),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        )
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ message: "Registration failed" }), {
          status: 500,
        })
      )
    render(<RegisterRepositoryView />)
    await waitFor(() => {
      expect(screen.getByText("user/repo-a")).toBeInTheDocument()
    })

    const registerButton = screen.getByRole("button", { name: "Register" })
    await userEvent.click(registerButton)

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Registration failed")
    })
  })

  it("should display error message if fetching github repositories fails", async () => {
    vi.mocked(useSession).mockReturnValue({
      data: mockSession({
        user: { id: "user123", name: "Test User" },
      }),
      status: "authenticated",
      update: vi.fn(),
    })
    vi.spyOn(global, "fetch").mockResolvedValueOnce(
      new Response(JSON.stringify({ message: "Failed to fetch" }), {
        status: 500,
      })
    )
    render(<RegisterRepositoryView />)
    await waitFor(() => {
      expect(screen.getByText("Error: Failed to fetch")).toBeInTheDocument()
      expect(toast.error).toHaveBeenCalledWith("Failed to fetch")
    })
  })

  it("should show 'Registering...' when registering a repo", async () => {
    vi.mocked(useSession).mockReturnValue({
      data: mockSession({
        user: { id: "user123", name: "Test User" },
      }),
      status: "authenticated",
      update: vi.fn(),
    })
    vi.spyOn(global, "fetch")
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify([
            { githubId: 1, name: "repo-a", fullName: "user/repo-a", url: "url-a", description: "desc-a" },
          ]),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }
        )
      )
      .mockImplementationOnce(() =>
        new Promise<Response>((resolve) =>
          setTimeout(() => {
            const response = new Response(JSON.stringify({}), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
            resolve(response);
          }, 100)
        )
      )
    render(<RegisterRepositoryView />)
    await waitFor(() => {
      expect(screen.getByText("user/repo-a")).toBeInTheDocument()
    })

    const registerButton = screen.getByRole("button", { name: "Register" })
    await userEvent.click(registerButton)

    expect(screen.getByRole("button", { name: "Registering..." })).toBeInTheDocument()

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalled()
    })
  })
})
