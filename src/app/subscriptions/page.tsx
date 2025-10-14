"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { subscriptionPlans } from "@/lib/data";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";

export default function SubscriptionsPage() {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline mb-4">{t('subscriptionPlans')}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('subscriptionPlansDescription')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
        {subscriptionPlans.map((plan) => (
          <Card key={plan.name} className={cn("flex flex-col", plan.popular ? "border-primary border-2 shadow-lg" : "")}>
            {plan.popular && (
              <div className="bg-primary text-primary-foreground text-sm font-bold text-center py-1 rounded-t-lg -mt-px">
                {t('mostPopular')}
              </div>
            )}
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">{t(plan.name)}</CardTitle>
              <CardDescription className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-extrabold tracking-tight">${plan.price}</span>
                <span className="text-muted-foreground">/{t('month')}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-accent" />
                    <span className="text-muted-foreground">{t(feature)}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                {t(plan.cta)}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
