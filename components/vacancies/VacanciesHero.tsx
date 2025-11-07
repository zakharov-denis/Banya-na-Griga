'use client';

import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { ArrowRight, Building2 } from 'lucide-react';

export function VacanciesHero() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #FAF7F2 0%, #E8DFD5 50%, #F5EFE6 100%)',
      }}
    >
      {/* Subtle wood texture overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1678742753298-9e6b10fcc42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwdGV4dHVyZSUyMHNhdW5hfGVufDF8fHx8MTc2MjAwNzA0NXww&ixlib=rb-4.1.0&q=80&w=1080')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Faint pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #7A5C47 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto py-20 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-6 sm:space-y-8"
        >
          {/* Headline */}
          <h1 
            className="text-[#3D3226]"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: '1.15',
              letterSpacing: '-0.01em',
              fontFamily: 'Georgia, serif',
            }}
          >
            Присоединяйтесь к Банный Рай — Карьера в велнесе и гостеприимстве
          </h1>

          {/* Subtext */}
          <p 
            className="text-[#7A5C47] max-w-3xl mx-auto"
            style={{
              fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
              lineHeight: '1.7',
            }}
          >
            Мы ищем сотрудников, которые любят велнес, безопасность и отличный сервис. 
            Приглашаем агентства — присылайте списки кандидатов нашей команде по подбору персонала.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button
              onClick={() => scrollToSection('#positions')}
              className="w-full sm:w-auto bg-gradient-to-r from-[#D4A574] to-[#C69563] hover:from-[#C69563] hover:to-[#B8865A] text-white rounded-full px-8 py-6 transition-all duration-300 hover:scale-105 [&_svg]:hidden gap-2"
              style={{
                fontSize: '1rem',
                boxShadow: '0 8px 24px rgba(212, 165, 116, 0.3)',
              }}
            >
              <span>Посмотреть вакансии</span>
              <ArrowRight className="w-4 h-4 inline-block [&]:block" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
