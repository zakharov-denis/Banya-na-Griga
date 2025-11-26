'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Copy,
  Check,
  Car,
  Train,
  FootprintsIcon,
  Navigation,
  Calendar
} from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ContactSectionProps {
  onBookSession?: () => void;
}

export function ContactSection({ onBookSession }: ContactSectionProps) {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0); // 0 = map, 1 = parking photo
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const contactInfo = {
    address: 'улица Грига, 58, Калининград, Россия, 236016',
    phones: ['+7 (4012) 45-22-36', '+7 (4012) 53-85-81'],
    email: 'griga58@yandex.ru',
    hours: [
      { day: 'Понедельник - Вторник', time: 'Закрыто' },
      { day: 'Среда', time: '15:00–23:00' },
      { day: 'Четверг - Воскресенье', time: '10:00–23:00' },
    ],
    routes: {
      car: 'Бесплатная парковка на территории. Находится в центре Калининграда с удобным подъездом с основных дорог.',
      publicTransport: 'Доступен на местных автобусных маршрутах и такси. Центральное расположение в Калининграде.',
      walking: 'Удобно расположена на улице Грига в самом центре Калининграда.',
    },
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18440.937827704693!2d20.517771049999997!3d54.70756065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46e3160b340c169f%3A0x48d8581f4e24927!2sBanya%20Na%20Griga!5e0!3m2!1sen!2sin!4v1762282672348!5m2!1sen!2sin',
    directionsUrl: 'https://www.google.com/maps/search/?api=1&query=Griga+Street+58,+Kaliningrad,+Russia',
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-play slider
  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 4500); // 4.5 seconds

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlaying]);

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentSlide(index);

    // Resume auto-play after 10 seconds
    if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  const handleCopyAddress = async () => {
    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(contactInfo.address);
        setCopiedAddress(true);
        setTimeout(() => setCopiedAddress(false), 2000);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = contactInfo.address;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          textArea.remove();
          setCopiedAddress(true);
          setTimeout(() => setCopiedAddress(false), 2000);
        } catch (err) {
          console.error('Failed to copy text: ', err);
          textArea.remove();
          // Show a message or alert to the user
          alert(`Address: ${contactInfo.address}`);
        }
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Final fallback - show address in alert
      alert(`Address: ${contactInfo.address}`);
    }
  };

  const handleCallClick = (phone: string) => {
    window.location.href = `tel:${phone.replace(/\s/g, '')}`;
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${contactInfo.email}`;
  };

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2] relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#CBA35A]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4A574]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#FAF7F2] to-[#F5EFE6] rounded-full mb-4">
            <MapPin className="w-5 h-5 text-[#CBA35A]" />
            <span className="text-[#7A5C47]">Посетите нас</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl text-[#3D3226] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Найдите и свяжитесь с нами
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#D4A574] to-[#CBA35A] mx-auto rounded-full" />
          <p className="text-[#7A5C47] text-lg mt-6 max-w-2xl mx-auto">
            Мы готовы приветствовать вас в нашем оазисе здоровья и благополучия
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Map/Parking Slider */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-2 lg:order-1 space-y-6"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#D4A574] to-[#CBA35A] rounded-3xl opacity-20 blur group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl h-[400px] sm:h-[500px]">
                <AnimatePresence mode="wait">
                  {currentSlide === 0 ? (
                    <motion.div
                      key="map"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                      className="absolute inset-0"
                    >
                      <iframe
                        src={contactInfo.mapUrl}
                        width="100%"
                        height="500"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full"
                        title="Расположение бани"
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="parking"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                      className="absolute inset-0"
                    >
                      <ImageWithFallback
                        src="/images/gallery/Вывеска Баня на грига .JPG"
                        alt="Парковка и территория"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Navigation Dots */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
                <button
                  onClick={() => handleDotClick(0)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === 0
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label="Показать карту"
                />
                <button
                  onClick={() => handleDotClick(1)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === 1
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label="Показать парковку"
                />
              </div>

              {/* See on Map Button Overlay - Only show on map slide */}
              {currentSlide === 0 && (
                <motion.a
                  href={contactInfo.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="absolute top-6 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4A574] to-[#CBA35A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Navigation className="w-5 h-5" />
                  <span>Показать на карте</span>
                </motion.a>
              )}
            </div>

            {/* Book Session Button */}
            {onBookSession && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-[#D4A574] to-[#CBA35A] rounded-3xl opacity-20 blur group-hover:opacity-30 transition-opacity duration-300" />
                <Button
                  onClick={onBookSession}
                  className="
                    w-full
                    bg-gradient-to-r from-[#D4A574] to-[#CBA35A] 
                    hover:from-[#C69563] hover:to-[#B8865A] 
                    text-white rounded-full px-6 py-4
                    shadow-md hover:shadow-xl
                    transition-all duration-300 
                    hover:scale-105
                    relative
                    overflow-hidden
                    group/btn
                  "
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5" />
                    <span>Забронировать сеанс</span>
                  </span>
                  <span className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                </Button>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-1 lg:order-2 space-y-6"
          >
            {/* Address */}
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#E8DFD5]">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-[#D4A574] to-[#CBA35A] flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg text-[#3D3226] mb-2">Наше расположение</h3>
                  <p className="text-[#7A5C47] leading-relaxed mb-3">
                    {contactInfo.address}
                  </p>
                  <button
                    onClick={handleCopyAddress}
                    className="inline-flex items-center gap-2 text-sm text-[#CBA35A] hover:text-[#D4A574] transition-colors duration-300"
                    aria-label="Copy address to clipboard"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Скопировано!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Копировать адрес</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {/* Phone Numbers */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#E8DFD5]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4A574] to-[#CBA35A] flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg text-[#3D3226]">Позвоните нам</h3>
                </div>
                <div className="space-y-2">
                  {contactInfo.phones.map((phone, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleCallClick(phone)}
                      whileHover={{ x: 4 }}
                      className="w-full text-left py-2 px-3 rounded-lg hover:bg-[#FAF7F2] transition-all duration-300 group"
                    >
                      <p className="text-[#3D3226] group-hover:text-[#CBA35A] transition-colors duration-300">
                        {phone}
                      </p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Email */}
              <motion.button
                onClick={handleEmailClick}
                whileHover={{ y: -4 }}
                className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[#E8DFD5] hover:border-[#CBA35A] text-left group"
                aria-label="Email us"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4A574] to-[#CBA35A] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm text-[#7A5C47] mb-1">Напишите нам</h3>
                <p className="text-[#3D3226] group-hover:text-[#CBA35A] transition-colors duration-300 text-sm sm:text-base break-all">
                  {contactInfo.email}
                </p>
              </motion.button>
            </div>

            {/* Opening Hours */}
            <div className="bg-gradient-to-br from-white to-[#FAF7F2] rounded-2xl p-6 shadow-lg border border-[#E8DFD5]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4A574] to-[#CBA35A] flex items-center justify-center">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg text-[#3D3226]">Режим работы</h3>
              </div>
              <div className="space-y-3">
                {contactInfo.hours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-[#E8DFD5] last:border-0">
                    <span className="text-[#7A5C47]">{schedule.day}</span>
                    <span className="text-[#3D3226]">{schedule.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How to Reach Us */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#E8DFD5]">
              <h3 className="text-lg text-[#3D3226] mb-4">Как до нас добраться</h3>
              <div className="space-y-4">
                {/* By Car */}
                <div className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center group-hover:bg-[#F5EFE6] transition-colors duration-300">
                    <Car className="w-4 h-4 text-[#CBA35A]" />
                  </div>
                  <div>
                    <h4 className="text-sm text-[#3D3226] mb-1">На автомобиле</h4>
                    <p className="text-sm text-[#7A5C47] leading-relaxed">
                      {contactInfo.routes.car}
                    </p>
                  </div>
                </div>

                {/* By Public Transport */}
                <div className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center group-hover:bg-[#F5EFE6] transition-colors duration-300">
                    <Train className="w-4 h-4 text-[#CBA35A]" />
                  </div>
                  <div>
                    <h4 className="text-sm text-[#3D3226] mb-1">Общественным транспортом</h4>
                    <p className="text-sm text-[#7A5C47] leading-relaxed">
                      {contactInfo.routes.publicTransport}
                    </p>
                  </div>
                </div>

                {/* Walking */}
                <div className="flex items-start gap-3 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FAF7F2] flex items-center justify-center group-hover:bg-[#F5EFE6] transition-colors duration-300">
                    <FootprintsIcon className="w-4 h-4 text-[#CBA35A]" />
                  </div>
                  <div>
                    <h4 className="text-sm text-[#3D3226] mb-1">Пешком</h4>
                    <p className="text-sm text-[#7A5C47] leading-relaxed">
                      {contactInfo.routes.walking}
                    </p>
                  </div>
                </div>
              </div>
            </div>


          </motion.div>
        </div>
      </div>
    </section>
  );
}
