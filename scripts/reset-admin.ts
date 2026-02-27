import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.NEON_URL || process.env.DATABASE_URL
        }
    }
});

async function main() {
    const email = "romelmori81@gmail.com";
    const newPassword = "Admin123Sc@otix";
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword,
            role: 'ADMIN'
        },
        create: {
            email,
            name: 'Roly Mori',
            password: hashedPassword,
            role: 'ADMIN'
        }
    });

    console.log("-----------------------------------------");
    console.log("✅ ¡CONTRASEÑA RESETEADA CON ÉXITO!");
    console.log("-----------------------------------------");
    console.log("Correo:", email);
    console.log("Nueva Contraseña:", newPassword);
    console.log("-----------------------------------------");
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
