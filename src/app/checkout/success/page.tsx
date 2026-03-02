"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/language-context";

import { useSearchParams } from "next/navigation";

export default function CheckoutSuccessPage() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const id = searchParams.get('orderId');
    if (id) {
      setOrderId(id.slice(-8).toUpperCase());
    } else {
      setOrderId(`ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`);
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 flex items-center justify-center min-h-[60vh]">
      <Card className="max-w-md w-full text-center p-8">
        <CardContent className="flex flex-col items-center">
          <CheckCircle2 className="h-16 w-16 text-accent mb-6" />
          <h1 className="text-3xl font-bold font-headline mb-4">{t('paymentSuccessful')}</h1>
          <p className="text-muted-foreground mb-2">
            {t('paymentSuccessfulDescription')}
          </p>
          <p className="font-semibold text-lg mb-6">
            {t('yourOrderId')}: <span className="text-primary">{orderId || '...'}</span>
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            {t('emailConfirmation')}
          </p>
          <Button asChild size="lg" className="w-full">
            <Link href="/">{t('returnToHomepage')}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
