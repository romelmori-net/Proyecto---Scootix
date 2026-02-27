"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/language-context";

export function AddToCartButton({ product }: { product: any }) {
    const { addToCart } = useCart();
    const { toast } = useToast();
    const { t } = useLanguage();

    const handleAddToCart = () => {
        const cartProduct = {
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category.name,
            image: {
                imageUrl: product.imageUrl || '/placeholder-scooter.jpg',
                description: product.name,
                imageHint: product.name
            }
        };

        addToCart(cartProduct as any);
        toast({
            title: t('addedToCartToastTitle') || "Agregado al carrito",
            description: `${product.name} ${t('addedToCartToastDescription') || "se ha añadido a tu carrito."}`,
        });
    };

    return (
        <Button
            size="lg"
            onClick={handleAddToCart}
            className="flex-1 h-16 rounded-2xl font-black text-lg bg-slate-900 hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-3 group"
        >
            <ShoppingCart className="h-6 w-6 group-hover:-translate-y-1 transition-transform" />
            <span>{t('add') || "Agregar al Carrito"}</span>
        </Button>
    );
}
