import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { valuePropositions, services, testimonials } from "@/lib/data";
import * as Icons from "@/components/icons";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-scooter');

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold drop-shadow-lg">
            Reliable Maintenance & Repair for Electric Scooters
          </h1>
          <p className="mt-4 text-lg md:text-2xl font-light text-primary-foreground/80 drop-shadow-md">
            Energy that moves you.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link href="/booking">Book Appointment</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 sm:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valuePropositions.map((prop) => {
               const IconComponent = (Icons as any)[prop.icon];
               return(
                <div key={prop.title} className="flex gap-4 items-start">
                    {IconComponent && <IconComponent className="h-10 w-10 text-primary mt-1" />}
                  <div>
                    <h3 className="text-lg font-semibold">{prop.title}</h3>
                    <p className="text-muted-foreground">{prop.description}</p>
                  </div>
                </div>
               );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold font-headline mb-2">Our Services</h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            From routine check-ups to complex repairs, we've got the expertise to keep you on the road.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service) => (
              <Card key={service.title} className="text-left overflow-hidden group">
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
                  <CardTitle className="flex items-center gap-2">
                    <service.icon className="h-6 w-6 text-primary" />
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Button variant="outline" asChild>
                    <Link href="/booking">Request Service</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button size="lg" className="mt-12" asChild>
            <Link href="/services">See All Services</Link>
          </Button>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 sm:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold font-headline text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="bg-card">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.review}"</p>
                  <div className="flex items-center gap-4">
                    {testimonial.image && (
                      <Avatar>
                        <AvatarImage src={testimonial.image.imageUrl} alt={testimonial.name} data-ai-hint={testimonial.image.imageHint} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <p className="font-semibold">{testimonial.name}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
