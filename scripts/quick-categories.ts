import { PrismaClient } from '@prisma/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })
dotenv.config({ path: '.env.local', override: true })

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.NEON_URL || process.env.DATABASE_URL
        }
    }
})

async function main() {
    console.log('Insertando categorías...')
    const categories = ['Scooters', 'Baterías', 'Repuestos', 'Accesorios', 'Kits DIY']

    for (const name of categories) {
        await prisma.category.upsert({
            where: { name },
            update: {},
            create: { name }
        })
        console.log(`- ${name}`)
    }
    console.log('¡Categorías listas!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
