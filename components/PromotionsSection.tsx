'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Flame } from 'lucide-react';

export function PromotionsSection() {
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

    const section = document.getElementById('promotions-section');
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
      id="promotions-section"
      className="py-12 sm:py-16 md:py-20 relative overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1739869451056-a8cf6d396452?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aW50ZXIlMjBzYXVuYSUyMHNub3d8ZW58MXx8fHwxNzYyMDIzMTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Winter sauna"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#D4A574]/95 via-[#E8C9A0]/90 to-[#F5E6D3]/95" />
      </div>

      {/* Steam Overlay Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-48 sm:w-80 h-48 sm:h-80 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-40 sm:w-64 h-40 sm:h-64 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Fire Icon with Animation */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center mb-4 sm:mb-6"
          >
            <div className="bg-white/30 backdrop-blur-sm rounded-full p-3 sm:p-4">
              <Flame className="w-8 h-8 sm:w-12 sm:h-12 text-[#D4754E]" fill="#D4754E" />
            </div>
          </motion.div>

          {/* Headline */}
          <h2 className="text-[#3D3226] mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl px-2">
            🔥 Специальные цены для детей!
          </h2>

          {/* Subtext */}
          <p className="text-[#6B4D3A] mb-6 sm:mb-8 text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4">
            Отдыхайте всей семьёй с выгодой
          </p>

          {/* Pricing Info */}
          <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4 max-w-2xl mx-auto">
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
              <p className="text-[#3D3226] text-lg sm:text-xl md:text-2xl font-semibold">
                Дети до 7 лет — бесплатно
              </p>
            </div>
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4 sm:p-6">
              <p className="text-[#3D3226] text-lg sm:text-xl md:text-2xl font-semibold">
                Дети с 7 до 14 лет — 200 ₽/час
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-4 sm:mb-6">
            <Button
              className="w-full sm:w-auto bg-[#6B4D3A] hover:bg-[#5A3D2A] text-white rounded-full px-8 sm:px-12 py-5 sm:py-7 text-base sm:text-lg shadow-2xl hover:shadow-xl transition-all hover:scale-105"
            >
              Забронировать
            </Button>
          </div>

          {/* Additional Info */}
          <p className="text-[#8B7761] text-xs sm:text-sm">
            Приведите детей и наслаждайтесь семейным отдыхом
          </p>
        </motion.div>
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-0 left-0 w-20 h-20 sm:w-32 sm:h-32 bg-white/10 rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-white/10 rounded-tl-full" />
    </section>
  );
}
