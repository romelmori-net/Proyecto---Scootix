"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function CheckoutSuccessPage() {
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    setOrderId(`ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-md w-full text-center p-8">
        <CardContent className="flex flex-col items-center">
            <CheckCircle2 className="h-16 w-16 text-accent mb-6" />
            <h1 className="text-3xl font-bold font-headline mb-4">Payment Successful!</h1>
            <p className="text-muted-foreground mb-2">
                Thank you for your order. We've received your payment and are processing your request.
            </p>
            <p className="font-semibold text-lg mb-6">
                Your Order ID: <span className="text-primary">{orderId || '...'}</span>
            </p>
            <p className="text-sm text-muted-foreground mb-8">
                You will receive an email confirmation with your order details and receipt shortly.
            </p>
            <Button asChild size="lg" className="w-full">
                <Link href="/">Return to Homepage</Link>
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
