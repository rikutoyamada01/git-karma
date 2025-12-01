import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import { z } from "zod"
import { Prisma } from "@prisma/client"
export const dynamic = "force-dynamic"

const sendKarmaSchema = z.object({
  toUserId: z.string(),
  amount: z.number().int().positive(),
  description: z.string().optional(),
})

export async function POST(req: Request) {
  const session = await auth()

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { toUserId, amount, description } = sendKarmaSchema.parse(body)

    const fromUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!fromUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    if (fromUser.id === toUserId) {
      return NextResponse.json({ error: "Cannot send karma to yourself" }, { status: 400 })
    }

    // Transaction: Update both users and create transaction record
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Deduct from sender (allow negative? let's say yes for now, or maybe they need balance?)
      // For now, let's assume karma is just a score you give, not a currency you spend.
      // Wait, "Transaction" implies transfer. If it's just giving, maybe sender doesn't lose?
      // "GitKarma" usually implies giving recognition.
      // Let's assume for now it's a transfer or just points generation.
      // If it's a transfer, we need to check balance.
      // If it's generation (like "giving kudos"), we just add to receiver.
      // Let's implement as "giving kudos" (generation) for now, but track who gave it.
      // Sender's karma doesn't decrease, but maybe we limit how much they can give?
      // For simplicity, let's just add to receiver and track the transaction.
      
      // Update receiver
      const updatedReceiver = await tx.user.update({
        where: { id: toUserId },
        data: { karma: { increment: amount } },
      })

      // Create transaction record
      const transaction = await tx.transaction.create({
        data: {
          amount,
          description,
          fromUserId: fromUser.id,
          toUserId,
        },
      })

      return { updatedReceiver, transaction }
    })

    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof z.ZodError) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return NextResponse.json({ error: (error as any).errors }, { status: 400 })
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function GET() {
  const session = await auth()

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  const transactions = await prisma.transaction.findMany({
    where: {
      OR: [
        { fromUserId: user.id },
        { toUserId: user.id },
      ],
    },
    include: {
      fromUser: { select: { name: true, image: true } },
      toUser: { select: { name: true, image: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(transactions)
}
