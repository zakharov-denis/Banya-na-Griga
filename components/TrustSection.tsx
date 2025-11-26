'use client';

import { Flame, Heart, Leaf, Circle, Users, Sparkles, Droplets, Shield, Home } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function TrustSection() {
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

    const section = document.getElementById('trust-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const badges = [
    {
      icon: Home,
      title: 'Настоящая баня на дровах',
    },
    {
      icon: Shield,
      title: 'Проверенные оздоровительные процедуры',
    },
    {
      icon: Flame,
      title: 'Правильный жар',
    },
    {
      icon: Heart,
      title: 'Настоящий отдых для головы и тела',
    },
    {
      icon: Leaf,
      title: 'Натуральные травы',
    },
    {
      icon: Sparkles,
      title: 'Восстановление сил',
    },
    {
      icon: Droplets,
      title: 'Пар от опытного банщика',
    },
    {
      icon: Users,
      title: 'Спокойная семейная атмосфера',
    },
    {
      icon: Circle,
      title: 'Идеальная чистота',
    },
  ];

  // Duplicate badges multiple times for seamless infinite scroll
  // We need at least 2 complete sets to create a perfect loop
  const duplicatedBadges = [...badges, ...badges];

  return (
    <section
      id="trust-section"
      className="relative py-12 sm:py-16 md:py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FAF7F2 0%, #F5EFE6 50%, #FAF7F2 100%)',
      }}
    >
      {/* Fade gradients on left and right edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-28 md:w-36 lg:w-48 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-28 md:w-36 lg:w-48 bg-gradient-to-l from-[#FAF7F2] via-[#FAF7F2]/90 to-transparent z-10 pointer-events-none" />

      {/* Scrolling Badges Container */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Infinite Scrolling Track */}
          <motion.div
            className="flex items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16"
            animate={{
              x: [0, '-50%'],
            }}
            transition={{
              x: {
                duration: 23.4,
                repeat: Infinity,
                ease: 'linear',
                repeatType: 'loop',
              },
            }}
            style={{
              width: 'fit-content',
            }}
          >
            {duplicatedBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div
                  key={`badge-${index}`}
                  className="flex-shrink-0 group"
                >
                  {/* Circular Badge Container */}
                  <div className="flex flex-col items-center justify-start h-full">
                    {/* Circle with Icon - Fixed height container */}
                    <div className="flex items-center justify-center" style={{ height: '128px' }}>
                      <div
                        className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(250, 247, 242, 0.7) 100%)',
                          backdropFilter: 'blur(12px)',
                          boxShadow: '0 6px 24px rgba(212, 165, 116, 0.18), 0 3px 10px rgba(122, 92, 71, 0.1)',
                        }}
                      >
                        {/* Subtle glow effect */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D4A574]/25 to-[#C9A87C]/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Inner circle with gradient */}
                        <div
                          className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 lg:w-20 lg:h-20 rounded-full flex items-center justify-center relative z-10"
                          style={{
                            background: 'linear-gradient(135deg, #D4A574 0%, #C9A87C 100%)',
                            boxShadow: '0 3px 14px rgba(212, 165, 116, 0.35)',
                          }}
                        >
                          <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 text-white" strokeWidth={1.5} />
                        </div>

                        {/* Decorative ring */}
                        <div className="absolute inset-0 rounded-full border border-[#D4A574]/20 group-hover:border-[#D4A574]/40 transition-colors duration-500" />
                      </div>
                    </div>

                    {/* Badge Title - Fixed height container for consistent alignment */}
                    <div className="flex items-start justify-center mt-4 sm:mt-5 md:mt-6" style={{ minHeight: '60px' }}>
                      <p
                        className="text-[#3D3226] text-xs sm:text-sm md:text-base text-center max-w-[120px] sm:max-w-[140px] md:max-w-[160px] leading-snug"
                        style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                      >
                        {badge.title}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Optional: Add subtle texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A87C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
        }}
      />
    </section>
  );
}
