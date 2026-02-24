import { getProductById, getCategories } from "@/lib/actions/products";
import { ProductForm } from "../product-form";
import { notFound } from "next/navigation";

export default async function EditProductPage({
    params
}: {
    params: { id: string }
}) {
    const { id } = params;
    const product = await getProductById(id);
    const categories = await getCategories();

    if (!product) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Editar Producto</h1>
                <p className="text-muted-foreground">Actualiza los detalles de "{product.name}".</p>
            </div>

            <ProductForm product={product} categories={categories} />
        </div>
    );
}
