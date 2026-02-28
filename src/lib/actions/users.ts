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
