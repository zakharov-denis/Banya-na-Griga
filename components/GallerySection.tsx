'use client';

import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { ImageAutoSlider } from './ui/image-auto-slider';
import { GalleryModal } from './ui/gallery-modal';
import { Image } from 'lucide-react';

export function GallerySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    const section = document.getElementById('gallery');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Full gallery - all 22 images
  // Изображения хранятся локально в папке public/images/gallery/
  // Добавьте ваши изображения в эту папку и обновите пути ниже
  const allGalleryImages = [
    '/images/gallery/gallery-01.jpg',
    '/images/gallery/gallery-02.jpg',
    '/images/gallery/gallery-03.jpg',
    '/images/gallery/gallery-04.jpg',
    '/images/gallery/gallery-05.jpg',
    '/images/gallery/gallery-06.jpg',
    '/images/gallery/gallery-07.jpg',
    '/images/gallery/gallery-08.jpg',
    '/images/gallery/gallery-09.jpg',
    '/images/gallery/gallery-10.jpg',
    '/images/gallery/gallery-11.png',
    '/images/gallery/gallery-12.png',
    '/images/gallery/gallery-13.png',
    '/images/gallery/gallery-14.png',
    '/images/gallery/gallery-15.png',
    '/images/gallery/gallery-16.png',
    '/images/gallery/gallery-17.png',
    '/images/gallery/gallery-18.png',
    '/images/gallery/gallery-19.png',
    '/images/gallery/gallery-20.png',
    '/images/gallery/gallery-21.png',
    '/images/gallery/gallery-22.png',
  ];

  // Slider preview - only show 8 best images for fast loading
  const sliderPreviewImages = [
    '/images/gallery/gallery-01.jpg',
    '/images/gallery/gallery-04.jpg',
    '/images/gallery/gallery-06.jpg',
    '/images/gallery/gallery-07.jpg',
    '/images/gallery/gallery-09.jpg',
    '/images/gallery/gallery-11.png',
    '/images/gallery/gallery-14.png',
    '/images/gallery/gallery-15.png',
  ];

  return (
    <section id="gallery" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-[#3D3226] via-[#2A2318] to-[#3D3226] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#D4AF37] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 lg:mb-16 px-4"
        >
          <h2 className="text-white mb-3 sm:mb-4 text-3xl sm:text-4xl md:text-5xl">
            Галерея
          </h2>
          <p className="text-white/70 text-base sm:text-lg max-w-2xl mx-auto">
            Загляните в наше спокойное пространство и откройте красоту настоящего wellness.
          </p>
        </motion.div>

        {/* Infinite Auto-Slider - Preview with 8 images for fast loading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ImageAutoSlider
            images={sliderPreviewImages}
            speed={30}
            imageSize={{
              mobile: 'w-56 h-56',
              tablet: 'md:w-72 md:h-72',
              desktop: 'lg:w-80 lg:h-80'
            }}
          />
        </motion.div>

        {/* See More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-10 sm:mt-12 lg:mt-16 px-4 relative z-30"
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className="
              group
              bg-gradient-to-r from-[#D4A574] to-[#C69563] 
              hover:from-[#C69563] hover:to-[#B8865A] 
              text-white 
              rounded-full 
              px-5 sm:px-6 py-2 sm:py-2.5
              shadow-lg hover:shadow-2xl
              transition-all duration-300 
              hover:scale-105
              relative
              overflow-hidden
              flex items-center gap-2
            "
          >
            <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
              <Image className="w-4 h-4" />
              <span>Посмотреть всю галерею</span>
              <span className="text-white/80 text-xs sm:text-sm">({allGalleryImages.length} фото)</span>
            </span>
            <span className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </motion.div>

        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#3D3226] to-transparent z-20 pointer-events-none" />
      </div>

      {/* Gallery Modal - Shows all 22 images */}
      <GalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={allGalleryImages}
      />
    </section>
  );
}
