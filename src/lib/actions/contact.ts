"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function isAdmin() {
    const session = await getServerSession(authOptions);
    return session?.user && (session.user as any).role === "ADMIN";
}

export async function saveContactMessage(data: { name: string; email: string; subject: string; message: string }) {
    try {
        const message = await prisma.contactMessage.create({
            data: {
                name: data.name,
                email: data.email,
                subject: data.subject,
                message: data.message,
            }
        });
        return { success: true };
    } catch (error) {
        console.error("Error al guardar mensaje de contacto:", error);
        return { success: false, error: "No se pudo enviar el mensaje" };
    }
}

export async function getContactMessages() {
    if (!(await isAdmin())) throw new Error("Acceso denegado");
    try {
        const messages = await prisma.contactMessage.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        return messages;
    } catch (error) {
        console.error("Error al obtener mensajes:", error);
        return [];
    }
}

export async function deleteContactMessage(id: string) {
    if (!(await isAdmin())) throw new Error("Acceso denegado");
    try {
        await prisma.contactMessage.delete({
            where: { id }
        });
        return { success: true };
    } catch (error) {
        console.error("Error al eliminar mensaje:", error);
        return { success: false, error: "No se pudo eliminar el mensaje" };
    }
}
