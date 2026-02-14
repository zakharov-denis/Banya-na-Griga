'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

interface ServicesProps {
  onNavigateToPricing?: () => void;
}

export function Services({ onNavigateToPricing }: ServicesProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('services');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const serviceCategories = [
    {
      title: 'Услуги бани',
      icon: '🔥',
      services: [
        { name: 'Баня на дровах', price: '2400 ₽', duration: '2 часа' },
        { name: 'Общая баня (муж/жен)', price: '1000 ₽', duration: 'с человека' },
        { name: 'Общая баня СР', price: '600 ₽', duration: 'с человека' },
        { name: 'Общая баня Чт с 10–14', price: '600 ₽', duration: 'с человека' },
        { name: 'Душ', price: '300 ₽', duration: 'за час' },
      ],
      image: '/images/technical/banya-pech.jpg',
    },
    {
      title: 'Сауны',
      icon: '🛁',
      services: [
        { name: 'Сауна с бассейном (до 6 чел)', price: '2400 ₽', duration: '2 часа' },
        { name: 'Сауна с бассейном (до 10 чел)', price: '5000 ₽', duration: '2 часа' },
        { name: 'Сауна с купелью (до 3 чел)', price: '2000 ₽', duration: '2 часа' },
        { name: 'Компактная сауна (3–4 чел)', price: '1800 ₽', duration: '2 часа' },
      ],
      image: '/images/technical/hero-vertikalno.jpg',
    },
    {
      title: 'Дополнительные удобства',
      icon: '✨',
      services: [
        { name: 'Жетоны для массажного кресла', price: '200 ₽', duration: 'штука' },
        { name: 'Аренда простыни', price: '200 ₽', duration: '' },
        { name: 'Аренда полотенца', price: '300 ₽', duration: '' },
        { name: 'Аренда халата', price: '300 ₽', duration: '' },
        { name: 'Аренда банной шапки', price: '100 ₽', duration: '' },
      ],
      image: '/images/technical/massazhnoe-kreslo.jpg',
    },
  ];

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16"
        >
          <h2 className="text-[#3D3226] mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl">
            Наши услуги
          </h2>
          <p className="text-[#8B7761] max-w-2xl mx-auto text-base sm:text-lg px-4">
            Комфорт, релаксация и настоящая банная атмосфера.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10 lg:mb-12">
          {serviceCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
                {/* Image */}
                <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 lg:p-6 flex-1 flex flex-col">
                  <h3 className="text-[#3D3226] mb-3 sm:mb-4 text-base sm:text-lg">
                    {category.title}
                  </h3>
                  
                  {/* Services List */}
                  <ul className="space-y-2 flex-1">
                    {category.services.map((service, idx) => (
                      <li key={idx} className="text-sm text-[#8B7761] flex items-start gap-2">
                        <span className="text-[#D4A574] mt-1">•</span>
                        <div className="flex-1">
                          <div className="flex justify-between items-start gap-2">
                            <span>{service.name}</span>
                            <span className="text-[#D4A574] whitespace-nowrap">{service.price}</span>
                          </div>
                          {service.duration && (
                            <span className="text-xs text-[#8B7761]/60">{service.duration}</span>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <Button
            variant="outline"
            onClick={() => {
              onNavigateToPricing?.();
            }}
            className="w-full sm:w-auto rounded-full px-6 sm:px-8 py-5 sm:py-6 border-2 border-[#7A5C47] text-[#7A5C47] hover:bg-[#7A5C47] hover:text-white transition-all duration-300 hover:scale-105 max-w-xs sm:max-w-none"
          >
            Полный прайс-лист
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
