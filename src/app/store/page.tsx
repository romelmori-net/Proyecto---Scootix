import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { getProducts, getCategories } from "@/lib/actions/products";
import { StoreClient } from "./store-client";

export const dynamic = "force-dynamic";

export default async function StorePage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline mb-4">Tienda en Línea</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Encuentra todas las piezas, accesorios y kits de bricolaje que necesitas para mantener tu scooter en perfectas condiciones.
        </p>
      </div>

      <StoreClient initialProducts={products} categories={categories} />
    </div>
  );
}