"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thanks for reaching out. We'll get back to you soon.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline mb-4">Get In Touch</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Have a question or need support? We're here to help. Reach out to us through any of the channels below.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="md:col-span-1 space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    <Mail className="h-8 w-8 text-primary" />
                    <CardTitle>Email Us</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Send us an email for inquiries.</p>
                    <a href="mailto:hello@scootix.com" className="font-semibold text-primary hover:underline">hello@scootix.com</a>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    <Phone className="h-8 w-8 text-primary" />
                    <CardTitle>Call Us</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Talk to our team directly.</p>
                    <a href="tel:+1234567890" className="font-semibold text-primary hover:underline">(123) 456-7890</a>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                    <MapPin className="h-8 w-8 text-primary" />
                    <CardTitle>Visit Us</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">123 Electric Ave, Metropolis, 12345</p>
                     <p className="font-semibold text-primary">Open Mon-Fri, 9am - 6pm</p>
                </CardContent>
            </Card>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-2">
          <Card className="shadow-lg">
             <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your Name" required/>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Your Email" required/>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Question about a repair" required/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Your message here..." rows={6} required/>
                </div>
              </CardContent>
              <CardContent>
                 <Button type="submit" className="w-full" size="lg">Send Message</Button>
              </CardContent>
             </form>
          </Card>
        </div>
      </div>
      
       {/* Map Placeholder */}
        <div className="mt-16 md:mt-24">
            <h2 className="text-3xl font-bold font-headline text-center mb-8">Find Us Here</h2>
            <div className="aspect-[16/9] bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Interactive map coming soon.</p>
            </div>
        </div>

    </div>
  );
}
