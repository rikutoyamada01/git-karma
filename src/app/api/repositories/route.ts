import { auth } from "@/lib/auth"
import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const { githubId, name, fullName, url, description } = await req.json()

    if (!githubId || !name || !fullName || !url) {
      return NextResponse.json(
        { message: "Missing required repository fields" },
        { status: 400 },
      )
    }

    const existingRepository = await prisma.repository.findUnique({
      where: { githubId: githubId },
    })

    if (existingRepository) {
      return NextResponse.json(
        { message: "Repository already registered" },
        { status: 409 },
      )
    }

    const newRepository = await prisma.repository.create({
      data: {
        githubId,
        name,
        fullName,
        url,
        description,
        registeredBy: {
          connect: {
            id: session.user.id,
          },
        },
      },
    })

    return NextResponse.json(newRepository, { status: 201 })
  } catch (error) {
    console.error("Error registering repository:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  try {
    const repositories = await prisma.repository.findMany({
      include: {
        registeredBy: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(repositories)
  } catch (error) {
    console.error("Error fetching registered repositories:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
