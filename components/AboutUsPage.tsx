'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Award, Heart, Sparkles, Users, Shield, FileCheck, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CertificateModal } from './about/CertificateModal';
import { Footer } from './Footer';

interface AboutUsPageProps {
  onNavigateToHome: () => void;
  onBookSession?: () => void;
  onNavigateToCareers?: () => void;
  onOpenLegalDoc?: (docType: 'offer' | 'privacy') => void;
}

export function AboutUsPage({ onNavigateToHome, onBookSession, onNavigateToCareers, onOpenLegalDoc }: AboutUsPageProps) {
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set document title for SEO
    document.title = 'О нас | Баня в Калининграде';
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Узнайте о нашей бане, нашей миссии, истории и о том, что делает наш велнес-центр и банный опыт уникальными.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Узнайте о нашей бане, нашей миссии, истории и о том, что делает наш велнес-центр и банный опыт уникальными.';
      document.head.appendChild(meta);
    }

    // Scroll to top on mount
    window.scrollTo(0, 0);
    setTimeout(() => setIsVisible(true), 100);

    return () => {
      // Reset title when unmounting
      document.title = 'Баня в Калининграде | Премиум баня и велнес';
    };
  }, []);

  const teamMembers = [
    {
      name: 'Людмила Баранова',
      role: 'Основатель и директор по здоровью',
      bio: 'Привношу аутентичные русские банные традиции в мир велнеса.',
      image: 'https://images.unsplash.com/photo-1635695696701-fc9b49c991bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzcGElMjB0aGVyYXBpc3QlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjIwMTUwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Дмитрий Петров',
      role: 'Главный банщик',
      bio: 'Эксперт в традиционных банных техниках и теплотерапии.',
      image: 'https://images.unsplash.com/photo-1758876020435-5dad92700ed4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsbmVzcyUyMG1hbmFnZXIlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyMDE1MDYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'София Мартинес',
      role: 'Спа-терапевт',
      bio: 'Специалист по ароматерапии и расслабляющим процедурам.',
      image: 'https://images.unsplash.com/photo-1606033329692-748cf5d103f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjByZWNlcHRpb25pc3QlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyMDE1MDY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      name: 'Елена Козлова',
      role: 'Менеджер по работе с гостями',
      bio: 'Каждое посещение — это путешествие к гармонии и покою.',
      image: 'https://images.unsplash.com/photo-1598542712487-759a96dbeb69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHJlbGF4ZWQlMjBoYXBweXxlbnwxfHx8fDE3NjE5MzA4MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  const timeline = [
    {
      year: '2018',
      title: 'Видение',
      description: 'Людмила Баранова мечтает привнести аутентичную русскую банную культуру в современное велнес-сообщество.',
      icon: Sparkles,
    },
    {
      year: '2019',
      title: 'Первое открытие',
      description: 'Наша баня открывает двери в Калининграде с приверженностью традициям и качеству.',
      icon: Heart,
    },
    {
      year: '2021',
      title: 'Признание наград',
      description: 'Признана "Лучшим велнес-центром" Национальной ассоциацией спа.',
      icon: Award,
    },
    {
      year: '2023',
      title: 'Рост сообщества',
      description: 'Обслуживаем более 10 000 гостей ежегодно, создавая процветающее велнес-сообщество.',
      icon: Users,
    },
    {
      year: '2025',
      title: 'Планы расширения',
      description: 'Планируем новые локации, сохраняя нашу приверженность аутентичному опыту.',
      icon: ChevronRight,
    },
  ];

  const certificates = [
    {
      title: 'Сертификат охраны здоровья и безопасности',
      description: 'Сертифицировано Национальным управлением здравоохранения за соответствие всем стандартам безопасности и санитарии.',
      image: 'https://images.unsplash.com/photo-1637763723578-79a4ca9225f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNlcnRpZmljYXRlJTIwZG9jdW1lbnR8ZW58MXx8fHwxNzYxOTI5MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      issueDate: '15 января 2024',
      validUntil: '15 января 2026',
    },
    {
      title: 'Соответствие пожарной безопасности',
      description: 'Одобрено пожарной службой со всеми мерами пожарной безопасности.',
      image: 'https://images.unsplash.com/photo-1637763723578-79a4ca9225f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNlcnRpZmljYXRlJTIwZG9jdW1lbnR8ZW58MXx8fHwxNzYxOTI5MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      issueDate: '10 марта 2024',
      validUntil: '10 марта 2025',
    },
    {
      title: 'Бизнес-лицензия',
      description: 'Лицензирована для работы в качестве премиум-велнес и спа-центра.',
      image: 'https://images.unsplash.com/photo-1637763723578-79a4ca9225f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNlcnRpZmljYXRlJTIwZG9jdW1lbnR8ZW58MXx8fHwxNzYxOTI5MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      issueDate: '1 ноября 2023',
      validUntil: '1 ноября 2025',
    },
    {
      title: 'Санитарное разрешение',
      description: 'Качество воды и стандарты санитарии проверены и одобрены.',
      image: 'https://images.unsplash.com/photo-1637763723578-79a4ca9225f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNlcnRpZmljYXRlJTIwZG9jdW1lbnR8ZW58MXx8fHwxNzYxOTI5MTY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      issueDate: '20 февраля 2024',
      validUntil: '20 февраля 2026',
    },
  ];

  return (
    <>
      {/* Header with Home Button */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E8DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl text-[#3D3226]" style={{ fontFamily: 'Georgia, serif' }}>
            О нас
          </h1>
          <button
            onClick={onNavigateToHome}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF7F2] hover:bg-[#E8DFD5] transition-all duration-300 hover:scale-105"
          >
            <X className="w-5 h-5 text-[#7A5C47]" />
            <span className="text-[#7A5C47] text-sm">На главную</span>
          </button>
        </div>
      </div>

      {/* Full Page Content */}
      <div className="bg-white overflow-y-auto"
      >

            {/* Hero Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF7F2] to-white relative overflow-hidden"
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#CBA35A]/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4A574]/5 rounded-full blur-3xl" />

              <div className="max-w-4xl mx-auto text-center relative z-10">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl text-[#3D3226] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                  Добро пожаловать в нашу баню
                </h2>
                <p className="text-lg sm:text-xl text-[#7A5C47] leading-relaxed max-w-3xl mx-auto">
                  Где древние традиции встречаются с современным велнесом. Мы создаём оазис 
                  спокойствия, аутентичные русские банные впечатления и целостное обновление.
                </p>
              </div>
            </motion.section>

            {/* Team Section */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-center mb-12"
                >
                  <h2 className="text-3xl sm:text-4xl text-[#3D3226] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                    Познакомьтесь с нашей командой
                  </h2>
                  <p className="text-[#7A5C47] text-lg max-w-2xl mx-auto">
                    Увлечённые профессионалы, посвятившие себя вашему велнес-путешествию
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={member.name}
                      initial={{ opacity: 0, y: 30 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                      className="group"
                    >
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#CBA35A] to-[#D4A574] rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                        <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden ring-4 ring-[#E8DFD5] group-hover:ring-[#CBA35A] transition-all duration-300">
                          <ImageWithFallback
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl text-[#3D3226] mb-1">{member.name}</h3>
                        <p className="text-[#CBA35A] mb-2">{member.role}</p>
                        <p className="text-sm text-[#7A5C47] leading-relaxed">{member.bio}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Our Story Timeline */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#FAF7F2] relative overflow-hidden">
              {/* Animated Steam Effect */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#CBA35A]/10 rounded-full blur-3xl"
                />
                <motion.div
                  animate={{
                    y: [0, -30, 0],
                    opacity: [0.1, 0.15, 0.1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 2,
                  }}
                  className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#D4A574]/10 rounded-full blur-3xl"
                />
              </div>

              <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-3xl sm:text-4xl text-[#3D3226] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                    Наша история
                  </h2>
                  <p className="text-[#7A5C47] text-lg max-w-2xl mx-auto">
                    Путешествие страсти, традиций и здоровья
                  </p>
                </motion.div>

                <div className="space-y-8">
                  {timeline.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={item.year}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                        className={`flex flex-col sm:flex-row items-center gap-6 ${
                          index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                        }`}
                      >
                        {/* Content */}
                        <div className={`flex-1 ${index % 2 === 0 ? 'sm:text-right' : 'sm:text-left'} text-center sm:text-left`}>
                          <div className="inline-block px-4 py-1 bg-gradient-to-r from-[#D4A574] to-[#CBA35A] text-white rounded-full text-sm mb-3">
                            {item.year}
                          </div>
                          <h3 className="text-2xl text-[#3D3226] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                            {item.title}
                          </h3>
                          <p className="text-[#7A5C47] leading-relaxed">{item.description}</p>
                        </div>

                        {/* Icon */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FAF7F2] to-[#E8DFD5] flex items-center justify-center shadow-lg">
                            <Icon className="w-8 h-8 text-[#CBA35A]" />
                          </div>
                        </div>

                        {/* Spacer for alignment */}
                        <div className="flex-1 hidden sm:block" />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-[#FAF7F2]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="max-w-4xl mx-auto text-center"
              >
                <h2 className="text-3xl sm:text-4xl text-[#3D3226] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                  Готовы посетить нашу баню?
                </h2>
                <p className="text-[#7A5C47] text-lg mb-8 max-w-2xl mx-auto">
                  Присоединяйтесь к нашему сообществу любителей здоровья и откройте для себя преобразующую силу аутентичной банной терапии.
                </p>
                <motion.button
                  onClick={() => {
                    onBookSession?.();
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4A574] to-[#CBA35A] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <span className="relative z-10">Забронировать баню</span>
                  <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </motion.div>
            </section>
      </div>

      {/* Footer */}
      <Footer 
        onNavigateToCareers={onNavigateToCareers}
        onOpenLegalDoc={onOpenLegalDoc}
      />

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={!!selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
        certificate={selectedCertificate}
      />
    </>
  );
}
