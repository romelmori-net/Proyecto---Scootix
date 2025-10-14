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

export default function BookingPage() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Appointment Booked!",
      description: "We've received your request and will confirm shortly.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold font-headline mb-4">Book an Appointment</h1>
          <p className="text-lg text-muted-foreground">
            Schedule your scooter service with us. It's fast and easy.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6 bg-card p-8 rounded-lg">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" required />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john@example.com" required />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="(123) 456-7890" required />
            </div>
            <div>
              <Label htmlFor="service-type">Service Type</Label>
              <Select required>
                <SelectTrigger id="service-type">
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.title} value={service.title}>
                      {service.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-6 bg-card p-8 rounded-lg">
             <div>
              <Label>Select a Date</Label>
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
                <Label>Select a Time</Label>
                 <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a time slot" />
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
             <Button type="submit" className="w-full" size="lg">Book Now</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
