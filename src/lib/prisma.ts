import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const resolveDatabaseUrl = () => {
  const candidateKeys = [
    'DATABASE_URL',
    'POSTGRES_PRISMA_URL',
    'POSTGRES_URL',
    'POSTGRES_URL_NON_POOLING',
    'DIRECT_URL',
  ] as const

  for (const key of candidateKeys) {
    const value = process.env[key]
    if (value) {
      try {
        const parsed = new URL(value)
        if (!['postgres:', 'postgresql:'].includes(parsed.protocol)) {
          throw new Error(`Unsupported protocol "${parsed.protocol}"`)
        }
        // Normalize to ensure downstream tools (Prisma client) can access DATABASE_URL.
        if (!process.env.DATABASE_URL) {
          process.env.DATABASE_URL = value
        }
        return value
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unknown parse error'
        throw new Error(
          `${key} is set but is not a valid PostgreSQL connection string: ${message}. ` +
            'Review docs/ENVIRONMENT_SETUP.md for the expected format.'
        )
      }
    }
  }

  throw new Error(
    'No database connection string found. Set DATABASE_URL (preferred) or POSTGRES_PRISMA_URL/POSTGRES_URL/DIRECT_URL. ' +
      'Refer to docs/ENVIRONMENT_SETUP.md or docs/DATABASE_CONNECTION.md.'
  )
}

const connectionString = resolveDatabaseUrl()

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const prisma =
  globalForPrisma.prisma ||
  (() => {
    const pool = new Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    return new PrismaClient({ adapter })
  })()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
