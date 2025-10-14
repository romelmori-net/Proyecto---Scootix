"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { faqItems } from "@/lib/data";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldCheck, Zap, Heart } from "lucide-react";
import { useLanguage } from "@/context/language-context";

export default function AboutPage() {
  const { t } = useLanguage();
  const teamImage = PlaceHolderImages.find(img => img.id === 'about-team');
  const advantages = [
    { icon: ShieldCheck, title: t('transparency'), description: t('transparencyDescription') },
    { icon: Zap, title: t('innovation'), description: t('innovationDescription') },
    { icon: Heart, title: t('guarantee'), description: t('guaranteeDescription') },
  ];

  return (
    <>
      <div className="bg-secondary">
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">{t('makingUrbanMobilitySmarter')}</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('ourMission')}
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold font-headline mb-4">{t('whoWeAre')}</h2>
            <p className="text-muted-foreground mb-6">
              {t('whoWeAreDescription')}
            </p>
          </div>
          {teamImage && (
            <div className="overflow-hidden rounded-lg shadow-lg">
              <Image
                src={teamImage.imageUrl}
                alt={teamImage.description}
                width={600}
                height={400}
                className="w-full h-full object-cover"
                data-ai-hint={teamImage.imageHint}
              />
            </div>
          )}
        </div>
        
        <div className="py-16 md:py-24">
            <h2 className="text-3xl font-bold font-headline text-center mb-12">{t('theScootixAdvantage')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {advantages.map((adv) => (
                    <div key={adv.title} className="p-6">
                        <adv.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">{adv.title}</h3>
                        <p className="text-muted-foreground">{adv.description}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="max-w-3xl mx-auto">
           <h2 className="text-3xl font-bold font-headline text-center mb-12">{t('frequentlyAskedQuestions')}</h2>
           <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg">{t(item.question)}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {t(item.answer)}
                </AccordionContent>
              </AccordionItem>
            ))}
           </Accordion>
        </div>

      </div>
    </>
  );
}
