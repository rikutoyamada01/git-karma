"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast" // react-hot-toast をインポート

interface GithubRepository {
  githubId: number
  name: string
  fullName: string
  url: string
  description: string | null
}

export default function RegisterRepositoryView() {
  const { data: session, status } = useSession()
  const [githubRepos, setGithubRepos] = useState<GithubRepository[]>([])
  const [loadingRepos, setLoadingRepos] = useState(true)
  const [registeringRepoId, setRegisteringRepoId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGithubRepos() {
      if (status === "authenticated") {
        setLoadingRepos(true)
        setError(null)
        try {
          const response = await fetch("/api/github/repos")
          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || "Failed to fetch GitHub repositories")
          }
          const data: GithubRepository[] = await response.json()
          setGithubRepos(data)
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "Failed to fetch GitHub repositories"
          setError(message)
          toast.error(message)
        } finally {
          setLoadingRepos(false)
        }
      } else if (status === "unauthenticated") {
        setLoadingRepos(false)
      }
    }

    fetchGithubRepos()
  }, [status])

  const handleRegisterRepository = async (repo: GithubRepository) => {
    setRegisteringRepoId(repo.githubId)
    setError(null)
    try {
      const response = await fetch("/api/repositories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(repo),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to register repository")
      }

      toast.success("Repository registered successfully!")
      setGithubRepos((prev) => prev.filter((r) => r.githubId !== repo.githubId))
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to register repository"
      setError(message)
      toast.error(message)
    } finally {
      setRegisteringRepoId(null)
    }
  }

  if (status === "loading" || loadingRepos) {
    return <div className="p-4">Loading GitHub repositories...</div>
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>
  }

  if (!session?.user) {
    return <div className="p-4">Please log in to register repositories.</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Register Your GitHub Repositories</h1>
      {githubRepos.length === 0 ? (
        <p>No GitHub repositories found or all have been registered.</p>
      ) : (
        <ul className="space-y-4">
          {githubRepos.map((repo) => (
            <li key={repo.githubId} className="flex items-center justify-between p-4 border rounded-md shadow-sm">
              <div>
                <h2 className="text-lg font-semibold">{repo.fullName}</h2>
                <p className="text-sm text-gray-600">{repo.description || "No description"}</p>
                <a href={repo.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">
                  View on GitHub
                </a>
              </div>
              <button // 仮の Button コンポーネント
                onClick={() => handleRegisterRepository(repo)}
                disabled={registeringRepoId === repo.githubId}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {registeringRepoId === repo.githubId ? "Registering..." : "Register"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
