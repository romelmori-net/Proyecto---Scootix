"use client";

import { products } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useCart } from "@/context/cart-context";
import { useToast } from "@/hooks/use-toast";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const product = products.find(p => p.id === params.id);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addToCart(product);
    toast({
      title: t('addedToCartToastTitle'),
      description: `${product.name} ${t('addedToCartToastDescription')}`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start">
        <div className="bg-secondary rounded-lg aspect-square overflow-hidden">
          <Image
            src={product.image.imageUrl}
            alt={product.image.description}
            width={600}
            height={600}
            className="w-full h-full object-cover"
            data-ai-hint={product.image.imageHint}
          />
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground mb-2">{t(product.category.toLowerCase())}</p>
          <h1 className="text-3xl lg:text-4xl font-bold font-headline mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <span className="text-muted-foreground text-sm">(125 {t('reviews')})</span>
          </div>

          <p className="text-3xl font-bold mb-6">${product.price.toFixed(2)}</p>
          
          <p className="text-muted-foreground mb-8">
            {t('productDescriptionPlaceholder')}
          </p>

          <div className="flex items-center gap-4">
            <Button size="lg" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2"/>
                {t('add')}
            </Button>
            <Button size="lg" variant="outline">{t('buyNow')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}