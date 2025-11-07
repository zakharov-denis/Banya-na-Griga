'use client';

import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Instagram, Facebook, MapPinned } from 'lucide-react';

interface FooterProps {
  onNavigateToCareers?: () => void;
  onOpenLegalDoc?: (docType: 'offer' | 'privacy') => void;
  onOpenCancellationPolicy?: () => void;
}

export function Footer({ onNavigateToCareers, onOpenLegalDoc, onOpenCancellationPolicy }: FooterProps) {
  const quickLinks = [
    { label: 'Главная', href: '#home', isExternal: false },
    { label: 'Услуги', href: '#services', isExternal: false },
    { label: 'Цены', href: '#pricing', isExternal: false },
    { label: 'Галерея', href: '#gallery', isExternal: false },
    { label: 'О нас', href: '#about', isExternal: false },
    { label: 'Контакты', href: '#contact', isExternal: false },
    { label: 'Вакансии', href: '#careers', isExternal: true },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isExternal: boolean) => {
    e.preventDefault();
    
    if (isExternal && href === '#careers' && onNavigateToCareers) {
      onNavigateToCareers();
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#3D3226] to-[#2A241A] text-white py-10 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-8 sm:mb-10 md:mb-12">
          {/* Brand Section */}
          <div className="space-y-4 sm:space-y-6 sm:col-span-2 lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://i.ibb.co/JWJ913Vb/5204071771186266480-removebg-preview.png" 
                  alt="Banya Logo" 
                  className="h-16 sm:h-20 w-auto object-contain"
                />
                <h3 className="text-2xl sm:text-3xl text-[#D4A574] tracking-wide">
                  Баня в Калининграде
                </h3>
              </div>
              <p className="text-[#E8DFD5] leading-relaxed text-sm sm:text-base">
                Ваш оазис аутентичной русской бани и велнес-ритуалов. 
                Испытайте идеальное сочетание древних традиций и современного к��мфорта.
              </p>
            </motion.div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg sm:text-xl mb-3 sm:mb-4 text-[#D4A574]">Быстрые ссылки</h4>
              <ul className="space-y-2 sm:space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href, link.isExternal)}
                      className="text-[#E8DFD5] hover:text-[#D4A574] transition-colors duration-300 inline-flex items-center group text-sm sm:text-base cursor-pointer"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-[#D4A574] mr-0 group-hover:mr-2 transition-all duration-300" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 sm:space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg sm:text-xl mb-3 sm:mb-4 text-[#D4A574]">Свяжитесь с нами</h4>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4A574] mt-1 flex-shrink-0" />
                  <span className="text-[#E8DFD5] text-sm sm:text-base">
                    улица Грига, 58,<br />Калининград, Россия
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4A574] flex-shrink-0" />
                  <div className="flex flex-col gap-1">
                    <a
                      href="tel:+74012452236"
                      className="text-[#E8DFD5] hover:text-[#D4A574] transition-colors text-sm sm:text-base"
                    >
                      +7 (4012) 45-22-36
                    </a>
                    <a
                      href="tel:+74012538581"
                      className="text-[#E8DFD5] hover:text-[#D4A574] transition-colors text-sm sm:text-base"
                    >
                      +7 (4012) 53-85-81
                    </a>
                  </div>
                </li>
                <li className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4A574] mt-0.5 flex-shrink-0" />
                  <a
                    href="mailto:griga58@yandex.ru"
                    className="text-[#E8DFD5] hover:text-[#D4A574] transition-colors text-sm sm:text-base break-all"
                  >
                    griga58@yandex.ru
                  </a>
                </li>
              </ul>

              {/* Social Icons */}
              <div className="flex space-x-3 sm:space-x-4 mt-4 sm:mt-6">
                <a
                  href="#"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A574] transition-all duration-300 group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8DFD5] group-hover:text-white transition-colors" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A574] transition-all duration-300 group"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8DFD5] group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Griga+Street+58,+Kaliningrad,+Russia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4A574] transition-all duration-300 group"
                  aria-label="Google Maps"
                >
                  <MapPinned className="w-4 h-4 sm:w-5 sm:h-5 text-[#E8DFD5] group-hover:text-white transition-colors" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-6 sm:pt-8 border-t border-white/10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-[#B8A896] text-xs sm:text-sm">
              © 2025 Баня в Калининграде. Все права защищены.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
              <button
                onClick={() => {
                  localStorage.removeItem('banya-cookie-consent');
                  localStorage.removeItem('banya-cookie-consent-date');
                  window.location.reload();
                }}
                className="text-[#D4A574] hover:text-[#E8DFD5] transition-colors text-xs sm:text-sm underline underline-offset-2"
              >
                Настройки cookie
              </button>
              <span className="text-[#B8A896]">•</span>
              <button
                onClick={() => onOpenLegalDoc?.('privacy')}
                className="text-[#D4A574] hover:text-[#E8DFD5] transition-colors text-xs sm:text-sm underline underline-offset-2"
              >
                Политика конфиденциальности
              </button>
              <span className="text-[#B8A896]">•</span>
              <button
                onClick={() => onOpenLegalDoc?.('offer')}
                className="text-[#D4A574] hover:text-[#E8DFD5] transition-colors text-xs sm:text-sm underline underline-offset-2"
              >
                Публичная оферта
              </button>
              <span className="text-[#B8A896]">•</span>
              <button
                onClick={onOpenCancellationPolicy}
                className="text-[#D4A574] hover:text-[#E8DFD5] transition-colors text-xs sm:text-sm underline underline-offset-2"
              >
                Политики и правила
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
