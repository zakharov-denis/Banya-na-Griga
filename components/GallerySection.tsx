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
  const allGalleryImages = [
    'https://i.ibb.co/LXvvCcMs/ffff196a170572b94bbe7c562ffaff8745d352af.jpg',
    'https://i.ibb.co/DHtYkjg5/e1995d0fa7c393a67c9e207bb3e462d699b0ce06.jpg',
    'https://i.ibb.co/Zpz465CP/c88f797e6e429dbfe1447f62e27f90a3011248ab.jpg',
    'https://i.ibb.co/4nNG5pBk/453197347ee55544635467ff115a58cfc30cdad0.jpg',
    'https://i.ibb.co/DH5T21zv/329578bdf1c9c62b3ca991bc864a8d2423d161d2.jpg',
    'https://i.ibb.co/ZR9RHQjz/6626ebf24c5ab5cd5245c3ddeb1e66b400b184f8.jpg',
    'https://i.ibb.co/qMDkDVyP/4992df2a4b06a92ac1a196b68c66137cc923bbac-1.jpg',
    'https://i.ibb.co/JbMfnf7/0874a033290921344c54164a0f3f2ed50ec8fa62-1.jpg',
    'https://i.ibb.co/NdLM70fZ/5ad0915673e071d116fdeff50da75a7a93fd7540.jpg',
    'https://i.ibb.co/Nn3XmBdk/2baae3c0417ef2d1c1f94cb543bd99a4962f8df0.jpg',
    'https://i.ibb.co/d4DrQ4m6/ydym0xra1msgo4gsck80wgscwgckko.png',
    'https://i.ibb.co/LX8YyYVP/q6vleo5vha8w00wwow44k48cwkcwcs.png',
    'https://i.ibb.co/nGYpKXd/ge9i3235yhkcwggswsswc4gwwk0ok0.png',
    'https://i.ibb.co/pB4RZc5y/fjl8ynxe7r40g4oo0w04so4swo8448.png',
    'https://i.ibb.co/7NznksQn/f428nc2701wksccg8sss8cwkokgsg8.png',
    'https://i.ibb.co/67sjhnnF/452zlf0rh6m8o4swokwo0cok8kgccs.png',
    'https://i.ibb.co/7JFSntwJ/75xoa4zbcfksk8cw0s88gcgk40o4s0.png',
    'https://i.ibb.co/wNNpvSsM/46s16ev5igw0g0484kwcg840skc0ko.png',
    'https://i.ibb.co/DgQ4jWGR/9c60358o628sk4w0sk0kwwcow4wkog.png',
    'https://i.ibb.co/S7rZVLK5/6extxg9a0kg0c0c4800wwkc48ks488.png',
    'https://i.ibb.co/8g5Sjhkp/5f2t85xjx90cgo0kcs8coogk08cwk4.png',
    'https://i.ibb.co/QvkxLPWM/1tiuzu92lstcgwgcgk8occ88gk0kcc.png',
  ];

  // Slider preview - only show 8 best images for fast loading
  const sliderPreviewImages = [
    'https://i.ibb.co/LXvvCcMs/ffff196a170572b94bbe7c562ffaff8745d352af.jpg',
    'https://i.ibb.co/4nNG5pBk/453197347ee55544635467ff115a58cfc30cdad0.jpg',
    'https://i.ibb.co/ZR9RHQjz/6626ebf24c5ab5cd5245c3ddeb1e66b400b184f8.jpg',
    'https://i.ibb.co/qMDkDVyP/4992df2a4b06a92ac1a196b68c66137cc923bbac-1.jpg',
    'https://i.ibb.co/NdLM70fZ/5ad0915673e071d116fdeff50da75a7a93fd7540.jpg',
    'https://i.ibb.co/d4DrQ4m6/ydym0xra1msgo4gsck80wgscwgckko.png',
    'https://i.ibb.co/pB4RZc5y/fjl8ynxe7r40g4oo0w04so4swo8448.png',
    'https://i.ibb.co/7NznksQn/f428nc2701wksccg8sss8cwkokgsg8.png',
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
