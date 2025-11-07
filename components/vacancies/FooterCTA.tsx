'use client';

import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Mail, Send } from 'lucide-react';

export function FooterCTA() {
  return (
    <section className="py-20 sm:py-24 px-6 sm:px-8 lg:px-12 bg-gradient-to-br from-[#E8DFD5] to-[#F5EFE6] relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #7A5C47 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Headline */}
          <div>
            <h2 
              className="text-[#3D3226] mb-4"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontFamily: 'Georgia, serif',
              }}
            >
              Готовы присоединиться к нашей команде?
            </h2>
            <p className="text-[#7A5C47] text-lg max-w-2xl mx-auto">
              Независимо от того, являетесь ли вы индивидуальным соискателем или кадровым агентством, мы будем рады услышать вас.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => {
                const applySection = document.querySelector('#apply');
                if (applySection) {
                  applySection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-[#D4A574] to-[#C69563] hover:from-[#C69563] hover:to-[#B8865A] text-white rounded-full px-10 py-6 gap-2 transition-all duration-300 hover:scale-105"
              style={{ fontSize: '1rem' }}
            >
              <Send className="w-4 h-4" />
              Подать заявку
            </Button>

            <Button
              onClick={() => {
                window.location.href = 'mailto:hiring@banyahaven.com?subject=Запрос о найме&utm_source=vacancies-page&utm_medium=footer-cta';
              }}
              variant="outline"
              className="w-full sm:w-auto border-2 border-[#D4A574] text-[#7A5C47] hover:bg-white rounded-full px-10 py-6 gap-2 transition-all duration-300 hover:scale-105"
              style={{ fontSize: '1rem' }}
            >
              <Mail className="w-4 h-4" />
              Связаться с командой по найму
            </Button>
          </div>

          {/* Contact Info */}
          <div className="pt-8">
            <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 p-4 sm:p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-[#E8DFD5]">
              <Mail className="w-5 h-5 text-[#C69563]" />
              <div className="text-center sm:text-left">
                <p className="text-sm text-[#7A5C47]/70 mb-1">Для агентств и массовых заявок</p>
                <a 
                  href="mailto:hiring@banyahaven.com?utm_source=vacancies-page&utm_medium=footer-cta" 
                  className="text-[#C69563] hover:underline"
                >
                  hiring@banyahaven.com
                </a>
              </div>
            </div>
          </div>

          <p className="text-sm text-[#7A5C47]/60 pt-4">
            Баня Хейвен — это работодатель, предоставляющий равные возможности. Мы ценим разнообразие и стремимся создать инклюзивную среду для всех сотрудников.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
