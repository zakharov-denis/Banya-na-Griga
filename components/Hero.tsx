'use client';

import { ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'motion/react';

interface HeroProps {
  backgroundImage: string;
  onBookSession?: () => void;
}

export function Hero({ backgroundImage, onBookSession }: HeroProps) {
  return (
    <section id="home" className="relative min-h-screen h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Premium Gradient Overlay */}
      <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          src={backgroundImage}
          alt="Интерьер бани с паром"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient overlay - bottom to top (black to transparent) for better text contrast */}
        <div 
          className="absolute inset-0" 
          style={{
            background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 40%, rgba(0, 0, 0, 0.4) 100%)',
          }}
        />
        {/* Subtle blur overlay on lower portion for text emphasis */}
        <div 
          className="absolute inset-x-0 bottom-0 h-1/3"
          style={{
            background: 'linear-gradient(to top, rgba(61, 50, 38, 0.15) 0%, transparent 100%)',
            backdropFilter: 'blur(0.5px)',
          }}
        />
      </div>

      {/* Content - Perfectly Centered Vertically */}
      <div className="relative z-10 text-center px-6 sm:px-8 lg:px-12 max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-7">
          {/* Headline - Bold, Premium Typography */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="text-white"
            style={{
              fontSize: 'clamp(2rem, 5.5vw, 3.5rem)',
              letterSpacing: '0.02em',
              lineHeight: '1.2',
              textShadow: '0 4px 24px rgba(0, 0, 0, 0.5), 0 2px 12px rgba(0, 0, 0, 0.3)',
            }}
          >
            Настоящая русская баня в самом сердце Калининграда!
          </motion.h1>
          
          {/* Subtext - Clean, Balanced Opacity */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-xl mx-auto px-4"
            style={{
              fontSize: 'clamp(1rem, 3vw, 1.125rem)',
              lineHeight: '1.7',
              color: 'rgba(255, 255, 255, 0.7)',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            Приходите к нам за настоящим паром!
          </motion.p>
          
          {/* CTA Button - Generous Padding & Premium Feel */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            className="pt-2 sm:pt-3"
          >
            <Button
              onClick={onBookSession}
              className="bg-gradient-to-r from-[#D4A574] to-[#C69563] hover:from-[#C69563] hover:to-[#B8865A] text-white rounded-full px-10 sm:px-12 transition-all duration-300 ease-out hover:scale-105 active:scale-[0.98] [&_svg]:hidden"
              style={{
                fontSize: 'clamp(0.9375rem, 2.5vw, 1.0625rem)',
                paddingTop: 'clamp(0.875rem, 3vw, 1.125rem)',
                paddingBottom: 'clamp(0.875rem, 3vw, 1.125rem)',
                boxShadow: '0 10px 40px rgba(212, 165, 116, 0.35), 0 6px 20px rgba(198, 149, 99, 0.25), 0 2px 8px rgba(0, 0, 0, 0.15)',
                letterSpacing: '0.01em',
              }}
            >
              <span>Забронировать баню</span>
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator - Desktop Only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 sm:bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 hidden md:block"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span 
              className="text-white/60 text-xs tracking-wider uppercase"
              style={{ letterSpacing: '0.1em' }}
            >
              Листайте
            </span>
            <ChevronDown className="w-5 h-5 text-white/60" strokeWidth={2} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
