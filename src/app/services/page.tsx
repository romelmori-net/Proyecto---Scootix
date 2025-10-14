"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { services } from "@/lib/data";
import { useLanguage } from "@/context/language-context";

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline mb-4">{t('ourServices')}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('servicesPageDescription')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Card key={service.title} className="flex flex-col overflow-hidden group">
            {service.image && (
              <div className="overflow-hidden">
                <Image
                  src={service.image.imageUrl}
                  alt={service.image.description}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={service.image.imageHint}
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <service.icon className="h-7 w-7 text-primary" />
                <span className="text-xl">{t(service.title)}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <p className="text-muted-foreground mb-6 flex-grow">{t(service.description)}</p>
              <Button asChild className="w-full">
                <Link href="/booking">{t('requestService')}</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
