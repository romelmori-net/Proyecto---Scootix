"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getCategories() {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                name: 'asc'
            }
        });
        return categories;
    } catch (error) {
        console.error("Error al obtener categorías:", error);
        return [];
    }
}

export async function createCategory(name: string) {
    try {
        const category = await prisma.category.create({
            data: { name }
        });
        revalidatePath("/admin/categories");
        revalidatePath("/admin/products/new");
        return { success: true, category };
    } catch (error) {
        console.error("Error al crear categoría:", error);
        return { success: false, error: "No se pudo crear la categoría" };
    }
}

export async function deleteCategory(id: string) {
    try {
        // Verificar si hay productos usando esta categoría
        const productCount = await prisma.product.count({
            where: { categoryId: id }
        });

        if (productCount > 0) {
            return { success: false, error: "No se puede eliminar una categoría que tiene productos asociados" };
        }

        await prisma.category.delete({
            where: { id }
        });
        revalidatePath("/admin/categories");
        return { success: true };
    } catch (error) {
        console.error("Error al eliminar categoría:", error);
        return { success: false, error: "No se pudo eliminar la categoría" };
    }
}
