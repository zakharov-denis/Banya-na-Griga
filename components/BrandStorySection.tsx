'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

interface BrandStorySectionProps {
  onLearnMore?: () => void;
}

export function BrandStorySection({ onLearnMore }: BrandStorySectionProps) {
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

    const section = document.getElementById('about');
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
      id="about"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#FAF7F2] relative overflow-hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23D4C4B0' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            {/* Main Image */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1757940113920-69e3686438d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBzYXVuYSUyMGludGVyaW9yfGVufDF8fHx8MTc2MTkzMDY3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Wooden sauna interior"
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D3226]/40 to-transparent" />
              
              {/* Decorative Frame */}
              <div className="absolute inset-2 sm:inset-4 border-2 border-white/30 rounded-xl sm:rounded-2xl pointer-events-none" />
            </div>

            {/* Small Decorative Image - Top Left */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -top-6 -left-6 sm:-top-8 sm:-left-8 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shadow-2xl border-4 border-white hidden sm:block"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1741601272577-fc2c46f87d9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXVuYSUyMHN0b25lcyUyMHN0ZWFtfGVufDF8fHx8MTc2MjAyMzE3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Sauna stones"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-2xl"
            >
              <div className="text-center">
                <div className="text-3xl sm:text-4xl text-[#7A5C47] mb-1">10+</div>
                <div className="text-xs sm:text-sm text-[#8B7761] whitespace-nowrap">Years of Excellence</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6 lg:pl-8 order-1 lg:order-2"
          >
            {/* Label */}
            <div className="inline-block px-4 py-2 bg-[#E8DFD5] rounded-full">
              <span className="text-[#7A5C47] text-xs sm:text-sm">About Us</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-[#3D3226] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl">
              Our Story
            </h2>

            {/* Subheading */}
            <h3 className="text-[#7A5C47] text-xl sm:text-2xl lg:text-3xl">
              Where Ancient Tradition Meets Modern Wellness.
            </h3>

            {/* Body Text */}
            <div className="space-y-3 sm:space-y-4 text-[#8B7761] text-base sm:text-lg leading-relaxed">
              <p>
                Banya Haven began with a simple goal — to bring the age-old sauna culture into today's fast-paced world.
              </p>
              <p>
                Inspired by the rituals of Finnish and Russian banyas, our space was designed to help people reconnect with their bodies, find stillness, and heal through warmth.
              </p>
              <p className="hidden sm:block">
                Every detail, from the hand-selected wood to the carefully controlled heat, honors centuries of tradition while embracing modern comfort and hygiene standards.
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-2 sm:pt-4">
              <Button
                onClick={onLearnMore}
                variant="outline"
                className="w-full sm:w-auto rounded-full px-6 sm:px-8 py-5 sm:py-6 border-2 border-[#7A5C47] text-[#7A5C47] hover:bg-[#7A5C47] hover:text-white transition-all duration-300 hover:scale-105"
              >
                Learn More About Us
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
