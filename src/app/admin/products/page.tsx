import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { getProducts } from "@/lib/actions/products";
import { AdminProductList } from "./product-list";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
    const products = await getProducts();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
                    <p className="text-muted-foreground">Gestiona el catálogo de Scootix, precios e inventario.</p>
                </div>
                <Button asChild>
                    <Link href="/admin/products/new">
                        <Plus className="mr-2 h-4 w-4" /> Nuevo Producto
                    </Link>
                </Button>
            </div>

            <AdminProductList products={products} />
        </div>
    );
}
