import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validation = registerSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                { message: validation.error.errors[0].message },
                { status: 400 }
            );
        }

        const { name, email, password } = validation.data;

        const exists = await prisma.user.findUnique({
            where: { email }
        });

        if (exists) {
            return NextResponse.json(
                { message: "No se pudo completar el registro" }, // No revelar que el email existe por seguridad
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12); // Seguridad reforzada

        // Leer emails de admin de variables de entorno
        const adminEmails = (process.env.ADMIN_EMAILS || "").split(",").map(e => e.trim().toLowerCase());
        const isDefaultAdmin = adminEmails.includes(email.toLowerCase());

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: isDefaultAdmin ? "ADMIN" : "CUSTOMER"
            }
        });

        return NextResponse.json(
            { message: "Usuario registrado con éxito", user: { id: user.id, email: user.email } },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error en registro:", error);
        return NextResponse.json(
            { message: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
