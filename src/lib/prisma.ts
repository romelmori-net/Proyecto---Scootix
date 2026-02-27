import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    const databaseUrl = process.env.NEON_URL || process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL;

    return new PrismaClient({
        datasources: {
            db: {
                url: databaseUrl
            }
        }
    })
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
