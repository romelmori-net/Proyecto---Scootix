"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export default function ContactPage() {
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: t('messageSentToastTitle'),
      description: t('messageSentToastDescription'),
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline mb-4">{t('getInTouch')}</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {t('getInTouchDescription')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="md:col-span-1 space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    <Mail className="h-8 w-8 text-primary" />
                    <CardTitle>{t('emailUs')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{t('emailUsDescription')}</p>
                    <a href="mailto:hello@scootix.com" className="font-semibold text-primary hover:underline">hello@scootix.com</a>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    <Phone className="h-8 w-8 text-primary" />
                    <CardTitle>{t('callUs')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{t('callUsDescription')}</p>
                    <a href="tel:+1234567890" className="font-semibold text-primary hover:underline">(123) 456-7890</a>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    <MapPin className="h-8 w-8 text-primary" />
                    <CardTitle>{t('visitUs')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">123 Electric Ave, Metropolis, 12345</p>
                     <p className="font-semibold text-primary">{t('officeHours')}</p>
                </CardContent>
            </Card>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <Card className="shadow-lg">
             <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>{t('sendMessage')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('name')}</Label>
                    <Input id="name" placeholder={t('namePlaceholder')} required/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('email')}</Label>
                    <Input id="email" type="email" placeholder={t('emailPlaceholder')} required/>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">{t('subject')}</Label>
                  <Input id="subject" placeholder={t('subjectPlaceholder')} required/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{t('message')}</Label>
                  <Textarea id="message" placeholder={t('messagePlaceholder')} rows={6} required/>
                </div>
              </CardContent>
              <CardContent>
                 <Button type="submit" className="w-full" size="lg">{t('sendMessage')}</Button>
              </CardContent>
             </form>
          </Card>
        </div>
      </div>
      
       {/* Map Placeholder */}
        <div className="mt-16 md:mt-24">
            <h2 className="text-3xl font-bold font-headline text-center mb-8">{t('findUsHere')}</h2>
            <div className="aspect-[16/9] bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">{t('mapComingSoon')}</p>
            </div>
        </div>

    </div>
  );
}
