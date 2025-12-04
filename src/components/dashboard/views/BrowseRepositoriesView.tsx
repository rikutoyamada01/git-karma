"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import toast from "react-hot-toast"
import Image from "next/image"

interface RegisteredUser {
  id: string
  name: string | null
  username: string | null
  image: string | null
}

interface RegisteredRepository {
  id: string
  githubId: number
  name: string
  fullName: string
  url: string
  description: string | null
  createdAt: string
  registeredBy: RegisteredUser
}

export default function BrowseRepositoriesView() {
  const { data: session, status } = useSession()
  const [repositories, setRepositories] = useState<RegisteredRepository[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRepositories() {
      if (status === "authenticated") {
        setLoading(true)
        setError(null)
        try {
          const response = await fetch("/api/repositories")
          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || "Failed to fetch registered repositories")
          }
          const data: RegisteredRepository[] = await response.json()
          setRepositories(data)
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "Failed to fetch registered repositories"
          setError(message)
          toast.error(message)
        } finally {
          setLoading(false)
        }
      } else if (status === "unauthenticated") {
        setLoading(false)
      }
    }

    fetchRepositories()
  }, [status])

  if (status === "loading" || loading) {
    return <div className="p-4">Loading registered repositories...</div>
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>
  }

  if (!session?.user) {
    return <div className="p-4">Please log in to browse repositories.</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Browse Registered Repositories</h1>
      {repositories.length === 0 ? (
        <p>No repositories have been registered yet.</p>
      ) : (
        <ul className="space-y-4">
          {repositories.map((repo) => (
            <li key={repo.id} className="p-4 border rounded-md shadow-sm">
              <h2 className="text-lg font-semibold">{repo.fullName}</h2>
              <p className="text-sm text-gray-600">{repo.description || "No description"}</p>
              <a href={repo.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">
                View on GitHub
              </a>
              <div className="text-xs text-gray-500 mt-2">
                Registered by: {repo.registeredBy?.name || repo.registeredBy?.username || "Unknown"}
                {repo.registeredBy?.image && (
                  <Image
                    src={repo.registeredBy.image}
                    alt={repo.registeredBy?.username || "User avatar"}
                    width={20}
                    height={20}
                    className="w-5 h-5 rounded-full inline-block ml-2"
                  />
                )}
                {" "} on {new Date(repo.createdAt).toLocaleDateString()}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
