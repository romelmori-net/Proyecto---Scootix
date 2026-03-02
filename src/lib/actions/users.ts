"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import bcrypt from 'bcryptjs';

async function isAdmin() {
    const session = await getServerSession(authOptions);
    return session?.user && (session.user as any).role === "ADMIN";
}

export async function getUsers() {
    if (!(await isAdmin())) throw new Error("Acceso denegado");

    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return users;
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        return [];
    }
}

export async function createUser(data: any) {
    if (!(await isAdmin())) throw new Error("Acceso denegado");

    try {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: data.role || 'USER'
            }
        });
        return { success: true, user };
    } catch (error) {
        console.error("Error al crear usuario:", error);
        return { success: false, error: "El email ya podría estar registrado" };
    }
}

export async function updateUserRole(userId: string, role: string) {
    if (!(await isAdmin())) throw new Error("Acceso denegado");

    try {
        const user = await prisma.user.update({
            where: { id: userId },
            data: { role: role as any }
        });
        return { success: true, user };
    } catch (error) {
        console.error("Error al actualizar rol de usuario:", error);
        return { success: false, error: "No se pudo actualizar el rol" };
    }
}

export async function deleteUser(userId: string) {
    if (!(await isAdmin())) throw new Error("Acceso denegado");

    try {
        await prisma.user.delete({
            where: { id: userId }
        });
        return { success: true };
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        return { success: false, error: "No se pudo eliminar el usuario" };
    }
}

export async function updateUserProfile(data: { name: string; image?: string }) {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("No autorizado");

    try {
        const user = await prisma.user.update({
            where: { id: (session.user as any).id },
            data: {
                name: data.name,
                image: data.image
            }
        });
        return { success: true, user };
    } catch (error) {
        console.error("Error al actualizar perfil:", error);
        return { success: false, error: "No se pudo actualizar el perfil" };
    }
}

export async function requestVerificationCode() {
    const session = await getServerSession(authOptions);
    if (!session?.user) return { success: false, error: "No autorizado" };

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutos

    try {
        await prisma.user.update({
            where: { id: (session.user as any).id },
            data: {
                verificationCode: code,
                verificationCodeExpires: expires
            }
        });

        // En un entorno real, aquí se enviaría el correo/SMS
        console.log(`[SECURITY] Código de verificación para ${session.user.email}: ${code}`);

        return {
            success: true,
            message: "Código enviado correctamente (revisa la consola de desarrollo en local)."
        };
    } catch (error) {
        console.error("Error al generar código:", error);
        return { success: false, error: "Error al generar el código" };
    }
}

export async function updateUserPassword(data: {
    currentPassword?: string;
    newPassword: string;
    code: string
}) {
    const session = await getServerSession(authOptions);
    if (!session?.user) return { success: false, error: "No autorizado" };

    try {
        const user = await prisma.user.findUnique({
            where: { id: (session.user as any).id }
        });

        if (!user) return { success: false, error: "Usuario no encontrado" };

        // 1. Validar Código
        if (!user.verificationCode || user.verificationCode !== data.code) {
            return { success: false, error: "Código de verificación inválido" };
        }

        // 2. Validar Expiración
        if (!user.verificationCodeExpires || user.verificationCodeExpires < new Date()) {
            return { success: false, error: "El código ha expirado" };
        }

        // 3. Validar Contraseña Actual (opcional pero recomendado)
        if (data.currentPassword && user.password) {
            const isMatch = await bcrypt.compare(data.currentPassword, user.password);
            if (!isMatch) return { success: false, error: "La contraseña actual es incorrecta" };
        }

        // 4. Actualizar Contraseña
        const hashed = await bcrypt.hash(data.newPassword, 10);
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashed,
                verificationCode: null, // Limpiar código tras uso
                verificationCodeExpires: null
            }
        });

        return { success: true, message: "Contraseña actualizada con éxito" };
    } catch (error) {
        console.error("Error al actualizar contraseña:", error);
        return { success: false, error: "No se pudo procesar el cambio" };
    }
}
