'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
}

export function GalleryModal({ isOpen, onClose, images }: GalleryModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload first few images for faster display
  useEffect(() => {
    if (isOpen && !imagesLoaded) {
      const preloadImages = images.slice(0, 8);
      let loadedCount = 0;
      
      preloadImages.forEach((src) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === preloadImages.length) {
            setImagesLoaded(true);
          }
        };
      });
    }
  }, [isOpen, images, imagesLoaded]);

  const openLightbox = (image: string, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      const newIndex = selectedIndex > 0 ? selectedIndex - 1 : images.length - 1;
      setSelectedIndex(newIndex);
      setSelectedImage(images[newIndex]);
    } else {
      const newIndex = selectedIndex < images.length - 1 ? selectedIndex + 1 : 0;
      setSelectedIndex(newIndex);
      setSelectedImage(images[newIndex]);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!selectedImage) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigateImage('prev');
      if (e.key === 'ArrowRight') navigateImage('next');
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm overflow-y-auto"
          onClick={onClose}
        >
          <div className="min-h-screen p-4 sm:p-6 lg:p-8" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-white text-2xl sm:text-3xl">
                  Галерея
                </h2>
                <p className="text-white/60 text-sm sm:text-base mt-1">
                  {images.length} фото
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: Math.min(index * 0.015, 0.5),
                    ease: 'easeOut'
                  }}
                  className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative"
                  onClick={() => openLightbox(image, index)}
                >
                  <img
                    src={image}
                    alt={`Фото галереи ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading={index < 8 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Lightbox */}
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="fixed inset-0 z-[110] bg-black/98 flex items-center justify-center p-4"
                onClick={closeLightbox}
              >
                <button
                  onClick={closeLightbox}
                  className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm z-10"
                >
                  <X className="w-6 h-6 text-white" />
                </button>

                {/* Navigation Buttons */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm z-10"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 backdrop-blur-sm z-10"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                <motion.img
                  key={selectedImage}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  src={selectedImage}
                  alt="Выбранное фото"
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
                  onClick={(e) => e.stopPropagation()}
                  loading="eager"
                  decoding="async"
                />

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm backdrop-blur-sm bg-black/30 px-4 py-2 rounded-full">
                  {selectedIndex + 1} / {images.length}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
