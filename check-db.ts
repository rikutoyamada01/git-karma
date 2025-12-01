import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Connecting to database...')
    await prisma.$connect()
    console.log('Connection successful.')

    console.log('Running query...')
    const userCount = await prisma.user.count()
    console.log(`Query successful. User count: ${userCount}`)
  } catch (e) {
    console.error('Database connection failed:', e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
