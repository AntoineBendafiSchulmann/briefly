'use client';

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselItem, CarouselControls } from '@/components/ui/carousel';
import Image from 'next/image';
import { useRef } from 'react';

export default function HomePage() {
  const items = [
    { src: '/images/placeholder1.png', description: 'Reformulez vos textes en un clic.' },
    { src: '/images/placeholder2.png', description: 'Gagnez du temps avec nos outils.' },
    { src: '/images/placeholder3.png', description: 'Améliorez vos communications rapidement.' },
  ];

  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="p-20">
      <h1 className="text-4xl font-bold mb-6 text-center">Bienvenue sur Briefly 👋</h1>
      <p className="text-lg text-muted-foreground mb-8 text-center">
        Simplifiez vos reformulations avec notre outil intelligent. Découvrez comment nous pouvons vous aider à gagner du temps et améliorer vos communications.
      </p>

      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Découvrez nos fonctionnalités</h2>
        <div className="relative">
          <Carousel ref={carouselRef} className="flex gap-4 overflow-hidden">
            {items.map((item, index) => (
              <CarouselItem key={index} className="relative w-[300px] h-[400px] flex-shrink-0">
                <div className="relative w-full h-full overflow-hidden rounded-lg">
                  <Image
                    src={item.src}
                    alt={item.description}
                    fill
                    className="object-cover transition-opacity duration-300 hover:opacity-90"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-70 transition-opacity duration-300">
                    <p className="text-white text-center text-lg font-medium px-4">{item.description}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </Carousel>
          <CarouselControls onPrev={scrollPrev} onNext={scrollNext} />
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-center">Nos tarifs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Gratuit', description: 'Accédez aux fonctionnalités de base.', button: 'Commencer' },
            { title: 'Pro', description: 'Pour les utilisateurs avancés.', button: 'Choisir Pro' },
            { title: 'Entreprise', description: 'Solutions personnalisées pour les entreprises.', button: 'Contactez-nous' },
          ].map((plan, index) => (
            <Card key={index} className="flex flex-col items-center text-center p-6 rounded-lg shadow-lg bg-background">
              <CardHeader className="w-full">
                <CardTitle className="text-xl font-bold text-center">{plan.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </CardContent>
              <CardFooter className="mt-auto w-full">
                <Button variant="default" size="lg" className="w-full">
                  {plan.button}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Questions fréquentes</h2>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Comment fonctionne Briefly ?</AccordionTrigger>
            <AccordionContent>
              Briefly utilise des algorithmes avancés pour analyser votre texte et le reformuler dans le contexte que vous choisissez. Il est rapide, précis et facile à utiliser.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Est-ce gratuit ?</AccordionTrigger>
            <AccordionContent>
              Briefly propose un plan gratuit avec des fonctionnalités de base. Des options premium sont disponibles pour des besoins avancés.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Qui peut utiliser Briefly ?</AccordionTrigger>
            <AccordionContent>
              Briefly est conçu pour tout le monde : étudiants, professionnels, écrivains, et toute personne ayant besoin de reformuler des textes.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
