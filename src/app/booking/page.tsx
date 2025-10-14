"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { services } from "@/lib/data";
import { useLanguage } from "@/context/language-context";

export default function BookingPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: t('appointmentBookedToastTitle'),
      description: t('appointmentBookedToastDescription'),
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline mb-4">{t('bookAppointment')}</h1>
          <p className="text-lg text-muted-foreground">
            {t('bookAppointmentDescription')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6 bg-card p-8 rounded-lg">
            <div>
              <Label htmlFor="name">{t('fullName')}</Label>
              <Input id="name" placeholder={t('fullNamePlaceholder')} required />
            </div>
            <div>
              <Label htmlFor="email">{t('emailAddress')}</Label>
              <Input id="email" type="email" placeholder={t('emailAddressPlaceholder')} required />
            </div>
            <div>
              <Label htmlFor="phone">{t('phoneNumber')}</Label>
              <Input id="phone" type="tel" placeholder={t('phoneNumberPlaceholder')} required />
            </div>
            <div>
              <Label htmlFor="service-type">{t('serviceType')}</Label>
              <Select required>
                <SelectTrigger id="service-type">
                  <SelectValue placeholder={t('selectServicePlaceholder')} />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.title} value={t(service.title)}>
                      {t(service.title)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-6 bg-card p-8 rounded-lg">
             <div>
              <Label>{t('selectDate')}</Label>
               <div className="flex justify-center">
                 <Calendar
                   mode="single"
                   selected={date}
                   onSelect={setDate}
                   className="rounded-md border"
                   disabled={(day) => day < new Date(new Date().setDate(new Date().getDate() - 1))}
                 />
               </div>
            </div>
            <div>
                <Label>{t('selectTime')}</Label>
                 <Select>
                    <SelectTrigger>
                        <SelectValue placeholder={t('selectTimePlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="09:00">9:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM</SelectItem>
                        <SelectItem value="13:00">1:00 PM</SelectItem>
                        <SelectItem value="15:00">3:00 PM</SelectItem>
                        <SelectItem value="17:00">5:00 PM</SelectItem>
                    </SelectContent>
                </Select>
            </div>
             <Button type="submit" className="w-full" size="lg">{t('bookNow')}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
