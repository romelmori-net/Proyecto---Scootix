import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Truck, Store, CreditCard } from "lucide-react";
import Image from "next/image";
import { products } from "@/lib/data";

const cartItems = [
    { ...products[0], quantity: 1 },
    { ...products[2], quantity: 2 },
];

export default function CheckoutPage() {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 10.00;
  const total = subtotal + shipping;
  
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Checkout Form */}
        <div className="space-y-8">
          <h1 className="text-3xl font-bold font-headline">Checkout</h1>
          
          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Electric Ave" />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                 <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Metropolis" />
                 </div>
                 <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" placeholder="12345" />
                 </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Shipping Method */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Method</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="delivery" className="space-y-4">
                <Label className="flex items-center gap-4 border rounded-md p-4 cursor-pointer hover:bg-accent has-[[data-state=checked]]:border-primary">
                  <RadioGroupItem value="delivery" id="delivery"/>
                  <Truck className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold">Home Delivery</p>
                    <p className="text-sm text-muted-foreground">Arrives in 2-3 business days. $10.00</p>
                  </div>
                </Label>
                <Label className="flex items-center gap-4 border rounded-md p-4 cursor-pointer hover:bg-accent has-[[data-state=checked]]:border-primary">
                  <RadioGroupItem value="pickup" id="pickup"/>
                  <Store className="h-6 w-6 text-primary" />
                  <div>
                    <p className="font-semibold">In-Store Pickup</p>
                    <p className="text-sm text-muted-foreground">Ready for pickup tomorrow. FREE</p>
                  </div>
                </Label>
              </RadioGroup>
            </CardContent>
          </Card>
          
          {/* Payment */}
          <Card>
              <CardHeader>
                  <CardTitle>Payment</CardTitle>
                  <CardDescription>All transactions are secure and encrypted.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="flex items-center gap-4 border rounded-md p-4 bg-secondary">
                    <CreditCard className="h-6 w-6 text-primary"/>
                    <p className="font-semibold">Credit/Debit Card</p>
                 </div>
                 <div className="space-y-2">
                     <Label htmlFor="cardNumber">Card Number</Label>
                     <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                         <Label htmlFor="expiryDate">Expiration Date</Label>
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
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {cartItems.map(item => (
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
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between text-muted-foreground">
                  <span>Taxes</span>
                  <span>Calculated at next step</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button asChild size="lg" className="w-full mt-6">
                <Link href="/checkout/success">Pay Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
