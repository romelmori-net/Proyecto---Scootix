"use client"

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { X, Plus, Minus } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useCart } from "@/context/cart-context";

export default function CartPage() {
  const { t } = useLanguage();
  const { cart, updateQuantity, removeFromCart } = useCart();
  
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = cart.length > 0 ? 10.00 : 0;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="text-3xl font-bold font-headline mb-8 text-center">{t('shoppingCart')}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2">
            <Card>
                <CardContent className="p-0">
                  {cart.length > 0 ? (
                    <ul className="divide-y">
                        {cart.map(item => (
                            <li key={item.id} className="flex items-center gap-4 p-4">
                                <Image
                                    src={item.image.imageUrl}
                                    alt={item.image.description}
                                    width={80}
                                    height={80}
                                    className="rounded-md object-cover"
                                    data-ai-hint={item.image.imageHint}
                                />
                                <div className="flex-grow">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                                </div>
                                <div className="flex items-center gap-2 border rounded-md p-1">
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}><Minus className="h-4 w-4" /></Button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus className="h-4 w-4" /></Button>
                                </div>
                                <p className="font-semibold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => removeFromCart(item.id)}>
                                    <X className="h-5 w-5" />
                                </Button>
                            </li>
                        ))}
                    </ul>
                    ) : (
                      <p className="p-8 text-center text-muted-foreground">{t('cartEmpty')}</p>
                    )
                  }
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-1 sticky top-24">
          <Card>
            <CardHeader>
              <CardTitle>{t('orderSummary')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('subtotal')}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('shipping')}</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>{t('total')}</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button asChild size="lg" className="w-full mt-4" disabled={cart.length === 0}>
                <Link href="/checkout">{t('proceedToCheckout')}</Link>
              </Button>
               <Button asChild variant="outline" className="w-full">
                <Link href="/store">{t('continueShopping')}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}