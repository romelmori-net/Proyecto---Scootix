"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import { useCart } from "@/context/cart-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { createOrder } from "@/lib/actions/orders";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Truck, Store, CreditCard, Package } from "lucide-react";

export default function CheckoutPage() {
  const { t } = useLanguage();
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = cart.length > 0 ? 10.00 : 0;
  const total = subtotal + shipping;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/checkout");
    }
    if (cart.length === 0 && status !== "loading") {
      router.push('/store');
    }
  }, [cart, router, status]);

  const handlePay = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isProcessing) return;

    // Validación básica de tarjeta
    if (cardNumber.replace(/\s/g, '').length < 16) {
      toast({ title: "Error de Pago", description: "El número de tarjeta es inválido.", variant: "destructive" });
      return;
    }

    setIsProcessing(true);
    try {
      const result = await createOrder({
        total,
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      });

      if (result.success) {
        toast({ title: "¡Pago Exitoso!", description: "Tu pedido ha sido procesado correctamente.", className: "bg-green-500 text-white font-bold" });
        clearCart();
        setTimeout(() => {
          router.push(`/checkout/success?orderId=${result.orderId}`);
        }, 1500);
      } else {
        toast({
          title: "Error",
          description: result.error || "No se pudo procesar el pedido",
          variant: "destructive"
        });
        setIsProcessing(false);
      }
    } catch (error) {
      console.error("Error en pago:", error);
      toast({
        title: "Error",
        description: "Ocurrió un error inesperado. Inténtalo de nuevo.",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 relative">
      {isProcessing && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300">
          <Card className="max-w-xs w-full p-8 text-center rounded-[2rem] border-none shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="relative h-20 w-20 mx-auto mb-4">
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <CreditCard className="absolute inset-0 m-auto h-8 w-8 text-primary animate-pulse" />
            </div>
            <h3 className="text-xl font-black text-slate-900">Verificando Pago</h3>
            <p className="text-slate-500 text-sm mt-2">Estamos procesando tu transacción de forma segura...</p>
          </Card>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Checkout Form */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-xl">
              <ShoppingBag className="h-6 w-6" />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">{t('checkout')}</h1>
          </div>

          {/* Delivery Information */}
          <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
            <CardHeader className="bg-slate-50/50 p-6 border-b border-slate-100">
              <CardTitle className="text-lg font-black text-slate-900">{t('deliveryInformation')}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="font-bold text-slate-700 ml-1">{t('firstName')}</Label>
                  <Input id="firstName" className="rounded-xl h-12 border-slate-200 focus:ring-primary" placeholder={t('firstNamePlaceholder')} defaultValue={session?.user?.name?.split(' ')[0] || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="font-bold text-slate-700 ml-1">{t('lastName')}</Label>
                  <Input id="lastName" className="rounded-xl h-12 border-slate-200 focus:ring-primary" placeholder={t('lastNamePlaceholder')} defaultValue={session?.user?.name?.split(' ').slice(1).join(' ') || ''} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address" className="font-bold text-slate-700 ml-1">{t('address')}</Label>
                <Input id="address" className="rounded-xl h-12 border-slate-200 focus:ring-primary" placeholder={t('addressPlaceholder')} />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="city" className="font-bold text-slate-700 ml-1">{t('city')}</Label>
                  <Input id="city" className="rounded-xl h-12 border-slate-200 focus:ring-primary" placeholder={t('cityPlaceholder')} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip" className="font-bold text-slate-700 ml-1">{t('zipCode')}</Label>
                  <Input id="zip" className="rounded-xl h-12 border-slate-200 focus:ring-primary" placeholder={t('zipCodePlaceholder')} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Method */}
          <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
            <CardHeader className="bg-slate-50/50 p-6 border-b border-slate-100">
              <CardTitle className="text-lg font-black text-slate-900">{t('shippingMethod')}</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <RadioGroup defaultValue="delivery" className="space-y-4">
                <Label className="flex items-center gap-4 border-2 rounded-2xl p-4 cursor-pointer hover:bg-slate-50 transition-all has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                  <RadioGroupItem value="delivery" id="delivery" className="border-2 border-slate-300" />
                  <div className="p-2 bg-slate-100 rounded-xl text-slate-600">
                    <Truck className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-slate-900 leading-tight">{t('homeDelivery')}</p>
                    <p className="text-xs text-slate-500 font-medium">{t('homeDeliveryDescription')}</p>
                  </div>
                  <Badge variant="outline" className="rounded-lg font-bold">+$10.00</Badge>
                </Label>
                <Label className="flex items-center gap-4 border-2 rounded-2xl p-4 cursor-pointer hover:bg-slate-50 transition-all has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
                  <RadioGroupItem value="pickup" id="pickup" className="border-2 border-slate-300" />
                  <div className="p-2 bg-slate-100 rounded-xl text-slate-600">
                    <Store className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-slate-900 leading-tight">{t('inStorePickup')}</p>
                    <p className="text-xs text-slate-500 font-medium">{t('inStorePickupDescription')}</p>
                  </div>
                  <Badge variant="outline" className="rounded-lg font-bold">GRATIS</Badge>
                </Label>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Payment */}
          <Card className="border-none shadow-sm rounded-[2rem] overflow-hidden">
            <CardHeader className="bg-slate-50/50 p-6 border-b border-slate-100">
              <CardTitle className="text-lg font-black text-slate-900">{t('payment')}</CardTitle>
              <CardDescription className="font-medium">{t('paymentDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-4 border-2 border-primary/20 rounded-2xl p-4 bg-primary/5">
                <div className="p-2 bg-primary text-white rounded-xl">
                  <CreditCard className="h-6 w-6" />
                </div>
                <p className="font-black text-slate-900">{t('creditDebitCard')}</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cardNumber" className="font-bold text-slate-700 ml-1">{t('cardNumber')}</Label>
                <Input
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19))}
                  className="rounded-xl h-12 border-slate-200 focus:ring-primary font-mono text-lg"
                  placeholder="0000 0000 0000 0000"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate" className="font-bold text-slate-700 ml-1">{t('expirationDate')}</Label>
                  <Input
                    id="expiryDate"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value.replace(/\D/g, '').replace(/(.{2})/, '$1/').slice(0, 5))}
                    className="rounded-xl h-12 border-slate-200 focus:ring-primary font-mono"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc" className="font-bold text-slate-700 ml-1">CVC</Label>
                  <Input
                    id="cvc"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                    className="rounded-xl h-12 border-slate-200 focus:ring-primary font-mono"
                    placeholder="123"
                  />
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
              <Button
                size="lg"
                className="w-full mt-6"
                onClick={handlePay}
                disabled={isProcessing}
              >
                {isProcessing ? "Procesando..." : t('payNow')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}