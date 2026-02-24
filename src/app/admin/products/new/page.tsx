import { getCategories } from "@/lib/actions/products";
import { ProductForm } from "../product-form";

export default async function NewProductPage() {
    const categories = await getCategories();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Nuevo Producto</h1>
                <p className="text-muted-foreground">Añade un nuevo scooter o accesorio al catálogo.</p>
            </div>

            <ProductForm categories={categories} />
        </div>
    );
}
