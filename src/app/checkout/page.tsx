"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Truck, Store, CreditCard } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import { useCart } from "@/context/cart-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function CheckoutPage() {
  const { t } = useLanguage();
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const { data: session, status } = useSession();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = cart.length > 0 ? 10.00 : 0;
  const total = subtotal + shipping;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/checkout");
    }
    if (cart.length === 0) {
      router.push('/store');
    }
  }, [cart, router, status]);

  const handlePay = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // In a real app, you would process the payment here
    clearCart();
    router.push("/checkout/success");
  };

  if (cart.length === 0) {
    return null; // Or a loading spinner
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Checkout Form */}
        <div className="space-y-8">
          <h1 className="text-3xl font-bold font-headline">{t('checkout')}</h1>

          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle>{t('deliveryInformation')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t('firstName')}</Label>
                  <Input id="firstName" placeholder={t('firstNamePlaceholder')} defaultValue={session?.user?.name?.split(' ')[0] || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t('lastName')}</Label>
                  <Input id="lastName" placeholder={t('lastNamePlaceholder')} defaultValue={session?.user?.name?.split(' ').slice(1).join(' ') || ''} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">{t('address')}</Label>
                <Input id="address" placeholder={t('addressPlaceholder')} />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="city">{t('city')}</Label>
                  <Input id="city" placeholder={t('cityPlaceholder')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">{t('zipCode')}</Label>
                  <Input id="zip" placeholder={t('zipCodePlaceholder')} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Method */}
          <Card>
            <CardHeader>
              <CardTitle>{t('shippingMethod')}</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="delivery" className="space-y-4">
                <Label className="flex items-center gap-4 border rounded-md p-4 cursor-pointer hover:bg-accent has-[[data-state=checked]]:border-primary">
                  <RadioGroupItem value="delivery" id="delivery" />
                  <Truck className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold">{t('homeDelivery')}</p>
                    <p className="text-sm text-muted-foreground">{t('homeDeliveryDescription')}</p>
                  </div>
                </Label>
                <Label className="flex items-center gap-4 border rounded-md p-4 cursor-pointer hover:bg-accent has-[[data-state=checked]]:border-primary">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Store className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold">{t('inStorePickup')}</p>
                    <p className="text-sm text-muted-foreground">{t('inStorePickupDescription')}</p>
                  </div>
                </Label>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card>
            <CardHeader>
              <CardTitle>{t('payment')}</CardTitle>
              <CardDescription>{t('paymentDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 border rounded-md p-4 bg-secondary">
                <CreditCard className="h-6 w-6 text-primary" />
                <p className="font-semibold">{t('creditDebitCard')}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardNumber">{t('cardNumber')}</Label>
                <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">{t('expirationDate')}</Label>
                  <Input id="expiryDate" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Order Summary */}
        <div className="sticky top-24">
          <Card className="bg-secondary">
            <CardHeader>
              <CardTitle>{t('orderSummary')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {cart.map(item => (
                  <li key={item.id} className="flex items-center gap-4">
                    <div className="relative">
                      <Image
                        src={item.image.imageUrl}
                        alt={item.image.description}
                        width={64}
                        height={64}
                        className="rounded-md object-cover"
                        data-ai-hint={item.image.imageHint}
                      />
                      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">{item.quantity}</span>
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold">{item.name}</p>
                    </div>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </li>
                ))}
              </ul>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{t('subtotal')}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('shipping')}</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>{t('taxes')}</span>
                  <span>{t('taxesCalculated')}</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>{t('total')}</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button asChild size="lg" className="w-full mt-6">
                <Link href="/checkout/success" onClick={handlePay}>{t('payNow')}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}