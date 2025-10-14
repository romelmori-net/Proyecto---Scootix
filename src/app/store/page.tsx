"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/lib/data";
import { ShoppingCart } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";

export default function StorePage() {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const categories = ["all", ...Array.from(new Set(products.map(p => p.category.toLowerCase())))];

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline mb-4">{t('onlineStore')}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('onlineStoreDescription')}
        </p>
      </div>
      
      <div className="flex justify-center mb-8">
        <div className="flex flex-wrap gap-2">
           {categories.map(category => (
             <Button key={category} variant={category === "all" ? "default" : "outline"}>
               {t(category)}
             </Button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden group flex flex-col">
            <Link href={`/store/${product.id}`} className="block">
              <div className="aspect-square overflow-hidden bg-secondary">
                <Image
                  src={product.image.imageUrl}
                  alt={product.image.description}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={product.image.imageHint}
                />
              </div>
            </Link>
            <CardContent className="p-4 flex-grow flex flex-col">
              <div className="flex-grow">
                <p className="text-sm text-muted-foreground">{t(product.category.toLowerCase())}</p>
                <h3 className="font-semibold text-lg leading-tight mb-2">
                  <Link href={`/store/${product.id}`}>{product.name}</Link>
                </h3>
              </div>
              <div className="flex items-center justify-between mt-4">
                <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
                <Button size="sm" onClick={() => handleAddToCart(product)}>
                  <ShoppingCart className="mr-2 h-4 w-4" /> {t('add')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}