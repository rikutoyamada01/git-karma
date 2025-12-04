import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"

export interface GithubRepository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
}

export async function GET(req: NextRequest) {
  const session = await auth()

  if (!session?.user?.accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const githubRes = await fetch("https://api.github.com/user/repos?type=owner", {
      headers: {
        Authorization: `token ${session.user.accessToken}`,
      },
    })

    if (!githubRes.ok) {
      const errorText = await githubRes.text()
      console.error("GitHub API Error:", errorText)
      return NextResponse.json(
        { message: "Failed to fetch repositories from GitHub", error: errorText },
        { status: githubRes.status },
      )
    }

    const repos: GithubRepository[] = await githubRes.json()

    const filteredRepos = repos
      .filter((repo) => !repo.fork) // Exclude forked repositories
      .map((repo) => ({
        githubId: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        url: repo.html_url,
        description: repo.description,
      }))

    return NextResponse.json(filteredRepos)
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
