'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Gift, Sparkles } from 'lucide-react';

export function GiftSection() {
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

    const section = document.getElementById('gift-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section
      id="gift-section"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-[#E8DFD5] via-[#D4C4B0] to-[#E8DFD5] relative overflow-hidden"
    >
      {/* Decorative Sparkles - Hidden on mobile */}
      <div className="hidden sm:block absolute top-10 right-10 opacity-20">
        <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-[#7A5C47]" />
      </div>
      <div className="hidden sm:block absolute bottom-10 left-10 opacity-20">
        <Sparkles className="w-10 h-10 sm:w-16 sm:h-16 text-[#7A5C47]" />
      </div>
      <div className="hidden md:block absolute top-1/2 left-1/4 opacity-10">
        <Sparkles className="w-8 h-8 text-[#7A5C47]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759887244219-17c3d64a7f01?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWZ0JTIwY2FyZCUyMGx1eHVyeXxlbnwxfHx8fDE3NjE5MzAzNTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Gift card"
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#7A5C47]/30 to-transparent" />
              
              {/* Floating Gift Icon */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 right-4 sm:top-8 sm:right-8 bg-white p-3 sm:p-4 rounded-full shadow-xl"
              >
                <Gift className="w-6 h-6 sm:w-8 sm:h-8 text-[#7A5C47]" />
              </motion.div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6 order-1 lg:order-2"
          >
            <div className="inline-block px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full text-sm sm:text-base">
              <span className="text-[#7A5C47]">Премиум подарочный сертификат</span>
            </div>

            <h2 className="text-[#3D3226] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
              Подарите впечатления от русской бани.
            </h2>

            <p className="text-[#8B7761] text-base sm:text-lg leading-relaxed">
              Удивите близких подарочным сертификатом — идеальный подарок для расслабления и обновления. Подарите спокойствие, здоровье и незабываемые моменты.
            </p>

            <div className="space-y-3 sm:space-y-4 pt-2 sm:pt-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#7A5C47] rounded-full flex-shrink-0" />
                <span className="text-[#3D3226] text-sm sm:text-base">Действует на все услуги и пакеты</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-[#7A5C47] rounded-full flex-shrink-0" />
                <span className="text-[#3D3226] text-sm sm:text-base">Любой номинал</span>
              </div>
            </div>

            <div className="pt-4 sm:pt-6">
              <Button
                className="w-full sm:w-auto bg-[#7A5C47] hover:bg-[#6B4D3A] text-white rounded-full px-8 sm:px-10 py-5 sm:py-7 text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                Получить подарочный сертификат
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
