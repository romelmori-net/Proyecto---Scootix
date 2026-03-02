"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function isAdmin() {
    const session = await getServerSession(authOptions);
    return session?.user && (session.user as any).role === "ADMIN";
}

export async function getOrders() {
    if (!(await isAdmin())) throw new Error("Acceso denegado");
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                },
                items: {
                    include: {
                        product: true
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

export async function createOrder(data: { total: number; items: any[] }) {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("Debes iniciar sesión para realizar un pedido");

    try {
        // Usar una transacción para asegurar que el pedido se crea y el stock se descuenta
        const order = await prisma.$transaction(async (tx) => {
            // 1. Crear el pedido
            const newOrder = await tx.order.create({
                data: {
                    userId: (session.user as any).id,
                    total: data.total,
                    status: "PENDING",
                    items: {
                        create: data.items.map(item => ({
                            productId: item.productId,
                            quantity: item.quantity,
                            price: item.price
                        }))
                    }
                }
            });

            // 2. Descontar el stock de cada producto
            for (const item of data.items) {
                await tx.product.update({
                    where: { id: item.productId },
                    data: {
                        stock: {
                            decrement: item.quantity
                        }
                    }
                });
            }

            return newOrder;
        });

        return { success: true, orderId: order.id };
    } catch (error) {
        console.error("Error al crear pedido:", error);
        return { success: false, error: "No se pudo procesar el pedido o no hay suficiente stock" };
    }
}

export async function getOrderById(orderId: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("No autorizado");

    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                },
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        // Verificar que el pedido pertenece al usuario o que el usuario es admin
        if (!order) return null;
        if (order.userId !== (session.user as any).id && (session.user as any).role !== "ADMIN") {
            throw new Error("Acceso no autorizado a este pedido");
        }

        return order;
    } catch (error) {
        console.error("Error al obtener pedido:", error);
        return null;
    }
}

export async function getUserOrders() {
    const session = await getServerSession(authOptions);
    if (!session?.user) throw new Error("No autorizado");

    try {
        const orders = await prisma.order.findMany({
            where: {
                userId: (session.user as any).id
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return orders;
    } catch (error) {
        console.error("Error al obtener pedidos del usuario:", error);
        return [];
    }
}
