"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { valuePropositions, services, testimonials } from "@/lib/data";
import * as Icons from "@/components/icons";
import { useLanguage } from "@/context/language-context";

export default function Home() {
  const { t } = useLanguage();
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-scooter');

  return (
    <div className="flex flex-col bg-background">
      {/* Hero Section - Tech Luxury Impact */}
      <section className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden bg-[#0F172A]">
        {heroImage && (
          <div className="absolute inset-0">
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover scale-105 opacity-40 mix-blend-overlay"
              priority
              data-ai-hint={heroImage.imageHint}
            />
            {/* Gradiente Tech: Azul Oscuro Profundo a Transparente */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0F172A] via-[#0F172A]/70 to-transparent" />
          </div>
        )}
        <div className="relative z-10 flex flex-col items-start justify-center h-full container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <span className="flex h-3 w-3 rounded-full bg-[#A3E635] animate-pulse shadow-[0_0_10px_#A3E635]" />
              <span className="text-xs font-black text-white uppercase tracking-[0.3em] font-headline">Movilidad Eléctrica de Clase Mundial</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-headline text-white leading-[1.1] tracking-tighter">
              {t('heroTitle').split(' ').map((word: string, i: number) =>
                i === t('heroTitle').split(' ').length - 1
                  ? <span key={i} className="text-[#0EA5E9] inline-block"> {word}</span>
                  : <span key={i}> {word}</span>
              )}
            </h1>
            <p className="max-w-xl text-xl md:text-2xl text-slate-300 leading-relaxed font-medium drop-shadow-sm">
              {t('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-6">
              <Button size="xl" className="rounded-2xl px-12 h-16 text-xl shadow-[0_20px_40px_-15px_rgba(14,165,233,0.5)] hover:shadow-[0_25px_50px_-12px_rgba(14,165,233,0.6)] hover:scale-105 transition-all duration-300 font-black bg-[#0EA5E9]" asChild>
                <Link href="/booking">{t('bookAppointment')}</Link>
              </Button>
              <Button size="xl" variant="outline" className="rounded-2xl px-12 h-16 text-xl bg-white/5 backdrop-blur-xl border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 font-bold" asChild>
                <Link href="/store">{t('viewServices')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions - Clean & Tech */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {valuePropositions.map((prop) => {
              const IconComponent = (Icons as any)[prop.icon];
              return (
                <div key={prop.title} className="flex gap-4 items-start">
                  {IconComponent && <IconComponent className="h-10 w-10 text-primary mt-1" />}
                  <div>
                    <h3 className="text-lg font-semibold">{t(prop.title)}</h3>
                    <p className="text-muted-foreground">{t(prop.description)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section - Conversion Power */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 text-center max-w-7xl">
          <div className="flex flex-col items-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black font-headline mb-6 tracking-tighter text-[#1E293B]">
              Soluciones de <span className="text-[#0EA5E9]">Alto Voltaje</span>
            </h2>
            <p className="text-[#64748B] max-w-2xl text-xl font-medium leading-relaxed">
              {t('ourServicesDescription')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {services.slice(0, 3).map((service) => (
              <Card key={service.title} className="text-left overflow-hidden group border-none shadow-[0_10px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_70px_rgba(14,165,233,0.12)] transition-all duration-700 rounded-[2.5rem] bg-[#F8FAFC]">
                {service.image && (
                  <div className="overflow-hidden relative h-64">
                    <Image
                      src={service.image.imageUrl}
                      alt={service.image.description}
                      fill
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                      data-ai-hint={service.image.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 to-transparent" />
                  </div>
                )}
                <CardHeader className="pt-10 px-8">
                  <CardTitle className="flex items-center gap-4 text-2xl font-black text-[#1E293B]">
                    <div className="p-3 rounded-2xl bg-[#0EA5E9]/10 text-[#0EA5E9] group-hover:bg-[#0EA5E9] group-hover:text-white transition-all duration-500">
                      <service.icon className="h-8 w-8" />
                    </div>
                    {t(service.title)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-10 px-8">
                  <p className="text-[#64748B] mb-10 text-lg leading-relaxed font-medium">{t(service.description)}</p>
                  <Button variant="outline" className="rounded-xl h-12 border-[#0EA5E9]/20 text-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white transition-all duration-300 font-bold px-8" asChild>
                    <Link href="/booking">{t('requestService')}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button size="lg" className="mt-20 rounded-2xl h-14 px-14 font-black text-lg bg-[#0EA5E9] shadow-[0_15px_30px_-10px_rgba(14,165,233,0.4)] hover:shadow-[#0EA5E9]/50 transition-all duration-300" asChild>
            <Link href="/services">{t('seeAllServices')}</Link>
          </Button>
        </div>
      </section>

      {/* Testimonials - Executive Social Proof */}
      <section className="py-32 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-5xl md:text-6xl font-black font-headline text-center mb-24 tracking-tighter text-[#1E293B]">Voces de <span className="text-[#A3E635]">Confianza</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="bg-white border-none shadow-[0_8px_30px_rgba(0,0,0,0.02)] rounded-[3rem] p-6 relative overflow-visible">
                <div className="absolute -top-6 -left-6 bg-[#A3E635] text-white p-4 rounded-3xl shadow-lg ring-8 ring-[#F8FAFC]">
                  <Star className="h-6 w-6 fill-white" />
                </div>
                <CardContent className="pt-10">
                  <div className="flex mb-8 gap-1 items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-[#A3E635] fill-[#A3E635]" />
                    ))}
                    <span className="ml-2 text-sm font-bold text-[#A3E635]">Puntuación Perfecta</span>
                  </div>
                  <p className="text-[#1E293B] mb-10 text-xl font-bold leading-relaxed tracking-tight italic">"{t(testimonial.review)}"</p>
                  <div className="flex items-center gap-5 border-t border-slate-100 pt-8">
                    {testimonial.image && (
                      <Avatar className="h-16 w-16 border-4 border-[#F8FAFC] shadow-md">
                        <AvatarImage src={testimonial.image.imageUrl} alt={testimonial.name} data-ai-hint={testimonial.image.imageHint} />
                        <AvatarFallback className="bg-[#0EA5E9] text-white font-black">{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <p className="font-black text-xl text-[#1E293B]">{testimonial.name}</p>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[#A3E635]" />
                        <p className="text-xs text-[#64748B] font-black uppercase tracking-widest text-[#0EA5E9]">Cliente Verificado</p>
                      </div>
                    </div>
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

