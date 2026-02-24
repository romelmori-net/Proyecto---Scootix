import { PrismaClient } from '@prisma/client'
import { products } from '../src/lib/data'
import * as bcrypt from 'bcrypt'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const prisma = new PrismaClient()

async function main() {
    console.log('Iniciando seed...')

    // Crear usuario administrador por defecto
    const adminEmail = 'admin@scootix.com'
    const hashedPassword = await bcrypt.hash('admin123', 10)

    await prisma.user.upsert({
        where: { email: adminEmail },
        update: {},
        create: {
            email: adminEmail,
            name: 'Admin Scootix',
            password: hashedPassword,
            role: 'ADMIN'
        }
    })
    console.log('Usuario Admin creado: admin@scootix.com / admin123')

    // Crear categorías base
    const categories = ['Batteries', 'Parts', 'Accessories', 'DIY Kits']
    for (const catName of categories) {
        await prisma.category.upsert({
            where: { name: catName },
            update: {},
            create: { name: catName }
        })
    }

    const allCategories = await prisma.category.findMany()

    // Crear productos
    for (const product of products) {
        const category = allCategories.find((c: any) => c.name === product.category)
        if (!category) continue

        await prisma.product.create({
            data: {
                name: product.name,
                description: product.image.description,
                price: product.price,
                stock: 10, // Stock por defecto
                imageUrl: product.image.imageUrl,
                categoryId: category.id
            }
        })
    }

    console.log('Seed completado con éxito.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
