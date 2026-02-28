"use server";

import prisma from "@/lib/prisma";

export async function getOrders() {
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return orders;
    } catch (error) {
        console.error("Error al obtener pedidos:", error);
        return [];
    }
}
