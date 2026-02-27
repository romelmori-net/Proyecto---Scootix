"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Send } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { valuePropositions, services, testimonials as initialTestimonials } from "@/lib/data";
import * as Icons from "@/components/icons";
import { useLanguage } from "@/context/language-context";
import { TechDivider } from "@/components/ui/tech-divider";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function Home() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-scooter');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [dbTestimonials, setDbTestimonials] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: 5,
  });

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      if (Array.isArray(data)) {
        setDbTestimonials(data);
      }
    } catch (error) {
      console.error("Error fetching testimonials", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const allTestimonials = [
    ...(Array.isArray(initialTestimonials) ? initialTestimonials : []),
    ...(Array.isArray(dbTestimonials) ? dbTestimonials : [])
  ];

  const handleTestimonialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Error al enviar');

      toast({
        title: "¡Gracias por tu opinión!",
        description: "Tu testimonio ha sido enviado y está pendiente de aprobación.",
      });

      setFormData({ name: "", review: "", rating: 5 });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo enviar el testimonio. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col bg-background overflow-hidden">
      {/* Hero Section - Compacto y Visible (Sin Scroll) */}
      <section className="relative h-[calc(100vh-80px)] min-h-[600px] w-full overflow-hidden bg-white flex flex-col justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/hero.png"
            alt="Premium Electric Scooter"
            fill
            className="object-cover scale-105 opacity-80"
            priority
          />
          {/* Protrección de texto: Gradiente profundo desde la izquierda */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent z-1" />
        </div>

        <div className="relative z-10 flex flex-col items-start container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl space-y-6 md:space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white shadow-xl border border-slate-100 group cursor-default">
              <span className="flex h-3 w-3 rounded-full bg-accent animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
              <span className="text-xs font-black text-slate-700 uppercase tracking-[0.3em] font-headline group-hover:text-primary transition-colors">Todo para tu Scooter Eléctrico</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black font-headline text-slate-900 leading-[1.05] tracking-tighter">
              {t('heroTitle').split(' ').map((word: string, i: number) =>
                i === t('heroTitle').split(' ').length - 1
                  ? <span key={i} className="text-primary inline-block"> {word}</span>
                  : <span key={i}> {word}</span>
              )}
            </h1>

            <p className="max-w-xl text-xl md:text-2xl text-slate-600 leading-relaxed font-medium">
              Especialistas en reparación, mantenimiento y venta de repuestos originales para que tu scooter siempre esté al 100%.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Button
                size="xl"
                className="group relative rounded-2xl px-12 h-16 text-xl shadow-[0_20px_50px_-15px_rgba(0,123,255,0.4)] hover:shadow-[0_25px_60px_-12px_rgba(0,123,255,0.6)] hover:-translate-y-2 active:translate-y-0 transition-all duration-500 font-black bg-primary text-white border-none"
                asChild
              >
                <Link href="/booking" className="flex items-center gap-3">
                  <span>{t('bookAppointment')}</span>
                  <Icons.Settings className="h-6 w-6 group-hover:rotate-180 transition-transform duration-700" />
                </Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="group rounded-2xl px-12 h-16 text-xl bg-white border-2 border-primary/30 text-slate-900 hover:bg-primary/5 hover:border-primary hover:text-primary transition-all duration-500 font-bold shadow-lg hover:shadow-xl hover:-translate-y-2"
                asChild
              >
                <Link href="/store" className="flex items-center gap-3">
                  <span>Ver Repuestos</span>
                  <Icons.Search className="h-6 w-6 group-hover:scale-125 transition-transform duration-500" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <TechDivider />

      {/* Value Propositions - Executive Trust Section */}
      <section className="py-24 bg-slate-50/50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valuePropositions.map((prop) => {
              const IconComponent = (Icons as any)[prop.icon];
              return (
                <Card key={prop.title} className="group border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 rounded-[2.5rem] bg-white overflow-hidden hover:-translate-y-2">
                  <CardContent className="p-8 flex flex-col items-start gap-6">
                    <div className="p-4 rounded-3xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      {IconComponent && <IconComponent className="h-8 w-8" />}
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-black text-slate-900 leading-tight">
                        {t(prop.title)}
                      </h3>
                      <p className="text-slate-600 font-medium leading-relaxed">
                        {t(prop.description)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <TechDivider />

      {/* Services Section - Conversion Power */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 text-center max-w-7xl">
          <div className="flex flex-col items-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black font-headline mb-6 tracking-tighter text-slate-900">
              Soluciones de <span className="text-primary">Alto Voltaje</span>
            </h2>
            <p className="text-slate-600 max-w-2xl text-xl font-medium leading-relaxed">
              {t('ourServicesDescription')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {services.slice(0, 3).map((service) => (
              <Card key={service.title} className="text-left overflow-hidden group border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-700 rounded-[2.5rem] bg-white">
                {service.image && (
                  <div className="overflow-hidden relative h-64">
                    <Image
                      src={service.image.imageUrl}
                      alt={service.image.description}
                      fill
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      data-ai-hint={service.image.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-80" />
                  </div>
                )}
                <CardHeader className="pt-10 px-8">
                  <CardTitle className="flex items-center gap-4 text-2xl font-black text-slate-900">
                    <div className="p-3 rounded-2xl bg-slate-100 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                      <service.icon className="h-8 w-8" />
                    </div>
                    {t(service.title)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-10 px-8">
                  <p className="text-slate-600 mb-10 text-lg leading-relaxed font-medium">{t(service.description)}</p>
                  <Button variant="outline" className="rounded-xl h-12 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-primary transition-all duration-300 font-bold px-8 shadow-sm" asChild>
                    <Link href="/booking">{t('requestService')}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button size="lg" className="mt-20 rounded-2xl h-14 px-14 font-black text-lg bg-primary text-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300" asChild>
            <Link href="/services">{t('seeAllServices')}</Link>
          </Button>
        </div>
      </section>

      <TechDivider />

      {/* Testimonials - Voces de Confianza Carousel */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
                Voces de <span className="text-primary">Confianza</span>
              </h2>
              <p className="text-xl text-slate-600 font-medium">
                Lo que dicen nuestros clientes sobre la experiencia Scootix.
              </p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="rounded-2xl border-2 border-primary/20 hover:border-primary text-primary font-bold h-12 px-8 transition-all">
                  Dinos tu opinión
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] rounded-[2rem] border-none shadow-2xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-black text-slate-900 leading-tight">Tu Experiencia <span className="text-primary">Scootix</span></DialogTitle>
                  <DialogDescription className="text-slate-600 font-medium pt-2">
                    Ayúdanos a mejorar contándonos qué tal fue tu servicio.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleTestimonialSubmit} className="space-y-6 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-700 font-bold ml-1">Tu Nombre</Label>
                    <Input
                      id="name"
                      placeholder="Ej. Juan Pérez"
                      required
                      className="rounded-xl border-slate-200 focus:ring-primary h-12 px-4 font-medium"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="review" className="text-slate-700 font-bold ml-1">Tu Comentario</Label>
                    <Textarea
                      id="review"
                      placeholder="Cuéntanos los detalles..."
                      required
                      className="rounded-xl border-slate-200 focus:ring-primary min-h-[120px] p-4 font-medium"
                      value={formData.review}
                      onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-700 font-bold ml-1">Calificación</Label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="transition-transform active:scale-90"
                        >
                          <Star className={cn("h-8 w-8 transition-colors", star <= formData.rating ? "fill-primary text-primary" : "text-slate-200")} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <DialogFooter className="pt-4">
                    <Button type="submit" disabled={isSubmitting} className="w-full h-14 rounded-2xl font-black text-lg bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
                      {isSubmitting ? "Enviando..." : (
                        <>
                          Enviar Testimonio
                          <Send className="h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative px-4"
          >
            <CarouselContent className="-ml-4">
              {allTestimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/2 xl:basis-1/2">
                  <Card className="h-full border-none shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-[2.5rem] bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all duration-500">
                    <CardContent className="p-10 flex flex-col h-full">
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={cn("h-5 w-5 fill-primary text-primary", i >= testimonial.rating && "fill-slate-200 text-slate-200")} />
                        ))}
                      </div>

                      <blockquote className="text-xl md:text-2xl font-bold text-slate-800 leading-tight mb-8 italic">
                        "{t(testimonial.review)}"
                      </blockquote>

                      <div className="mt-auto flex items-center gap-4">
                        <Avatar className="h-14 w-14 border-2 border-white shadow-md">
                          <AvatarImage src={typeof testimonial.image === 'string' ? testimonial.image : testimonial.image?.imageUrl} />
                          <AvatarFallback className="bg-primary/10 text-primary font-bold">{testimonial.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-black text-slate-900">{testimonial.name}</p>
                          <p className="text-sm text-primary font-bold uppercase tracking-wider">Cliente Verificado</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-6 h-12 w-12 bg-white shadow-lg border-none hover:bg-slate-50" />
              <CarouselNext className="-right-6 h-12 w-12 bg-white shadow-lg border-none hover:bg-slate-50" />
            </div>
          </Carousel>
        </div>
      </section>
    </div>
  );
}
