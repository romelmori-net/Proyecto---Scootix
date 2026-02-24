"use server";

import prisma from "@/lib/prisma";

export async function getProducts() {
    try {
        const products = await prisma.product.findMany({
            include: {
                category: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return products;
    } catch (error) {
        console.error("Error al obtener productos:", error);
        return [];
    }
}

export async function getCategories() {
    try {
        const categories = await prisma.category.findMany();
        return categories;
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        return [];
    }
}

export async function getProductById(id: string) {
    try {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                category: true
            }
        });
        return product;
    } catch (error) {
        console.error("Error al obtener producto:", error);
        return null;
    }
}

export async function createProduct(data: any) {
    try {
        const product = await prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                stock: parseInt(data.stock),
                imageUrl: data.imageUrl,
                categoryId: data.categoryId,
            }
        });
        return { success: true, product };
    } catch (error) {
        console.error("Error al crear producto:", error);
        return { success: false, error: "No se pudo crear el producto" };
    }
}

export async function updateProduct(id: string, data: any) {
    try {
        const product = await prisma.product.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
                price: parseFloat(data.price),
                stock: parseInt(data.stock),
                imageUrl: data.imageUrl,
                categoryId: data.categoryId,
            }
        });
        return { success: true, product };
    } catch (error) {
        console.error("Error al actualizar producto:", error);
        return { success: false, error: "No se pudo actualizar el producto" };
    }
}

export async function deleteProduct(id: string) {
    try {
        await prisma.product.delete({
            where: { id }
        });
        return { success: true };
    } catch (error) {
        console.error("Error al eliminar producto:", error);
        return { success: false, error: "No se pudo eliminar el producto" };
    }
}
