'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, ExternalLink, QrCode, Edit3, TrendingUp } from 'lucide-react';
import { ReviewSubmissionModal } from './ReviewSubmissionModal';

interface Review {
  name: string;
  level: number;
  date: string;
  review: string;
  rating: number;
}

export function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewsToShow, setReviewsToShow] = useState(4);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

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

    const section = document.getElementById('testimonials-section');
    if (section) {
      observer.observe(section);
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Auto-advance carousel on mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.min(reviewsToShow, allReviews.length));
    }, 5000);

    return () => clearInterval(interval);
  }, [isMobile, reviewsToShow]);

  const allReviews: Review[] = [
    {
      name: 'Роман Малов',
      level: 3,
      date: '17 августа 2024',
      review: 'Цены немного растут каждые полгода, но баня всё равно отличная. Парная большая и мощная, не так много пожилых людей, регулярно добавляют ароматные травы для пара. Много постоянных посетителей, включая меня. Место имеет ностальгическую советскую атмосферу, купель и небольшой бассейн.',
      rating: 5,
    },
    {
      name: 'Тим',
      level: 12,
      date: '22 августа 2024',
      review: 'Очень приятное место! Снял приватную сауну на 3–4 человека. Была комната отдыха, туалет, вешалки, душ и электрическая парная на 110°C. В зоне отдыха чай и телевизор (правда, каналы не переключались).',
      rating: 5,
    },
    {
      name: 'Олеся Подгорная',
      level: 9,
      date: '23 февраля 2024',
      review: 'Посещали несколько раз. Девушки на ресепшене очень вежливые. Хороший выбор веников; можно арендовать простыни и тапочки. Попробовали и маленькую, и большую сауны с бассейном. Вода в бассейне для меня была прохладной, но сыну и его друзьям понравилась. Пар отличный!',
      rating: 5,
    },
    {
      name: 'Николай Кантор',
      level: 11,
      date: '21 июля 2024',
      review: 'Отличная баня! Особая благодарность внимательному персоналу. Приехал в Калининград на отдых и не пожалел, что посетил Баню на Грига. Всем, кто приезжает в город, очень рекомендую это место!',
      rating: 5,
    },
    {
      name: 'Екатерина Горшкова',
      level: 5,
      date: '12 ноября 2024',
      review: 'Очень понравилось! Были с детьми в сауне с бассейном на 6 человек. Уютно, комфортно и очень чисто! Никаких неприятных запахов.',
      rating: 5,
    },
    {
      name: 'Дм Мртз',
      level: 12,
      date: '17 февраля 2024',
      review: 'Замечательно! Завсегдатаи превратили это место в настоящее сообщество любителей бани. Настои, травы, ароматы — всё на высшем уровне! Персонал отличный, можно даже купить пиво, тапочки и простыни. Очень рекомендую!',
      rating: 5,
    },
    {
      name: 'Мария М.',
      level: 15,
      date: '27 апреля 2024',
      review: 'Вероятно стоит 800₽ из-за хорошего ремонта, но качество разочаровало. Напор воды в душе слабый, и все веники замачиваются в одной общей ёмкости.',
      rating: 3,
    },
    {
      name: 'Евгений Баландин',
      level: 20,
      date: '4 августа 2024',
      review: 'Отличная баня во всех отношениях! Персонал заслуживает 5+ звёзд. Посещал в Новый год — даже раздавали бесплатные веники в подарок!',
      rating: 5,
    },
    {
      name: 'Сергей А.',
      level: 9,
      date: '11 августа 2024',
      review: 'Отличное расположение, но всё внутри старое и сломанное. Раздевалки душные и сырые. У места есть потенциал, но действительно нужен ремонт.',
      rating: 3,
    },
    {
      name: 'Маргарита Круглик',
      level: 10,
      date: '7 августа 2024',
      review: 'Моя любимая баня! Посещаю с 1970-х годов. Чисто, приветливый персонал. Единственная жалоба — душевая лейка слишком высоко и устарела.',
      rating: 5,
    },
    {
      name: 'Аноним',
      level: 3,
      date: '6 марта 2024',
      review: 'Хорошая баня, но не хватает стульев. Когда людно, приходится стоять и ждать. Температура воды была низкой во время моего визита.',
      rating: 4,
    },
    {
      name: 'Сергей',
      level: 4,
      date: '26 января 2024',
      review: 'Баня в советском стиле, но идеально подходит, если вы просто хотите попариться и расслабиться. Все принадлежности можно купить на месте.',
      rating: 4,
    },
    {
      name: 'Сергей С.',
      level: 7,
      date: '15 декабря 2023',
      review: 'Забронировал приватную комнату за 1600₽/2 часа. Принадлежности не включены. Пар был слабым, а душевые лейки старые и текли.',
      rating: 3,
    },
    {
      name: 'Сергей Фёдоров',
      level: 14,
      date: '13 июня 2024',
      review: 'Считается элитной баней среди местных. Уютная, знакомая атмосфера, с собственной парковкой.',
      rating: 5,
    },
    {
      name: 'Анастасия Авдеева',
      level: 15,
      date: '18 декабря 2023',
      review: 'Хорошая общественная баня с чистым женским отделением, шкафчиками и массажными кабинетами. Парная отличная; небольшая проблема — отсутствует рассеиватель на душевой лейке.',
      rating: 4,
    },
    {
      name: 'Оксана Б.',
      level: 3,
      date: '12 августа 2024',
      review: 'Посещаю уже 15 лет, почти всегда идеально. Единственная проблема — парная однажды перестала работать рано.',
      rating: 5,
    },
    {
      name: 'Евгений',
      level: 7,
      date: '10 января 2024',
      review: 'Легендарное место! Лучшая общественная баня в городе — тёплая атмосфера и дружелюбные люди.',
      rating: 5,
    },
    {
      name: 'Лаврентий Д.',
      level: 13,
      date: '28 мая 2024',
      review: 'Фантастическая баня — ароматная, весёлая, расслабляющая! Действительно омолаживает.',
      rating: 5,
    },
    {
      name: 'Людмила Порсик',
      level: 4,
      date: '8 июня 2024',
      review: 'Отличная сауна, уютная атмосфера. Напор воды мог бы быть лучше. Хотелось бы традиционного парения с вениками.',
      rating: 4,
    },
    {
      name: 'Геннадий Г.',
      level: 15,
      date: '23 декабря 2023',
      review: 'Отличная общественная баня. Можно арендовать тапочки, шапку, простыню и веник. Вход 650₽, без ограничения по времени. Большая парная, купель и барная зона.',
      rating: 5,
    },
    {
      name: 'Сергей Козлов',
      level: 5,
      date: '7 мая 2024',
      review: 'Лучшая общественная баня в городе. Расслабление для тела и души. Отличная парная, бассейн и холодная купель.',
      rating: 5,
    },
    {
      name: 'Гена Ц.',
      level: 3,
      date: '29 декабря 2024',
      review: 'Посещаю с детства — 1–2 раза в неделю. Персонал и место теперь как семья. Очень рекомендую!',
      rating: 5,
    },
    {
      name: 'Павел Заярный',
      level: 10,
      date: '21 июня 2024',
      review: 'Не для всех. Мужское отделение было на ремонте, поэтому пришлось идти в женское, где в тот день вообще не было пара.',
      rating: 2,
    },
    {
      name: 'Вера Д.',
      level: 10,
      date: '19 февраля 2023',
      review: 'Классическая баня в советском стиле. Хорошая парная, приветливый персонал, хороший чай и доступные массажные услуги. В женском отделении нет бассейна, но в мужском есть.',
      rating: 4,
    },
    {
      name: 'Данке',
      level: 13,
      date: '1 ноября 2023',
      review: 'Невероятный опыт! Много душевых, купель и 4-метровый бассейн с прохладной водой. Большая зона отдыха со шкафчиками, столами, лавками и телевизором.',
      rating: 5,
    },
    {
      name: 'Руслан Панкратов',
      level: 17,
      date: '22 октября 2023',
      review: 'Восхитительный опыт за очень разумную цену (650₽ за 2 часа). Настоящий пар от дров, приветливый персонал и уважительные посетители.',
      rating: 5,
    },
  ];

  const visibleReviews = allReviews.slice(0, reviewsToShow);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % visibleReviews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + visibleReviews.length) % visibleReviews.length);
  };

  const loadMore = () => {
    setReviewsToShow((prev) => Math.min(prev + 4, allReviews.length));
  };

  const ReviewCard = ({ review, index }: { review: Review; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_4px_20px_rgba(203,163,90,0.1)] hover:shadow-[0_8px_30px_rgba(203,163,90,0.2)] transition-all duration-300 h-full flex flex-col relative overflow-hidden group"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFF9F1]/0 to-[#CBA35A]/0 group-hover:from-[#FFF9F1]/30 group-hover:to-[#CBA35A]/5 transition-all duration-300 rounded-2xl pointer-events-none" />
      
      <div className="relative z-10">
        {/* Author Info */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="text-[#3D3226] mb-1 text-base">{review.name}</h4>
            <div className="flex items-center gap-2 text-xs text-[#7A5C47]">
              <span className="px-2 py-0.5 bg-[#F5EFE6] rounded-full">Level {review.level}</span>
              <span className="text-[#7A5C47]/60">{review.date}</span>
            </div>
          </div>
        </div>

        {/* Star Rating */}
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating
                  ? 'fill-[#CBA35A] text-[#CBA35A]'
                  : 'fill-[#E8DFD5] text-[#E8DFD5]'
              }`}
            />
          ))}
        </div>

        {/* Review Text */}
        <p className="text-[#7A5C47] leading-relaxed text-sm sm:text-base">
          {review.review}
        </p>
      </div>
    </motion.div>
  );

  return (
    <section
      id="testimonials-section"
      className="py-12 lg:py-16 bg-gradient-to-b from-white via-[#FAF7F2] to-white relative overflow-hidden"
    >
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#CBA35A]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#D4A574]/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-[#3D3226] mb-4">
              Что говорят наши гости
            </h2>
            <p className="text-[#7A5C47] max-w-2xl mx-auto mb-6">
              Реальный опыт наших посетителей.
            </p>
          </motion.div>

          {/* Rating Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto bg-gradient-to-br from-white to-[#FFF9F1] rounded-2xl p-4 sm:p-6 shadow-[0_4px_20px_rgba(203,163,90,0.15)] mb-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {/* Overall Rating */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Star className="w-6 h-6 fill-[#CBA35A] text-[#CBA35A]" />
                  <span className="text-3xl text-[#3D3226]" style={{ fontFamily: 'Georgia, serif' }}>5.0</span>
                </div>
                <p className="text-[#7A5C47] text-xs sm:text-sm">Общий рейтинг</p>
              </div>

              {/* Total Reviews */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <Edit3 className="w-5 h-5 text-[#D4A574]" />
                  <span className="text-3xl text-[#3D3226]" style={{ fontFamily: 'Georgia, serif' }}>421</span>
                </div>
                <p className="text-[#7A5C47] text-xs sm:text-sm">Всего отзывов</p>
              </div>

              {/* Total Ratings */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-1.5 mb-1">
                  <TrendingUp className="w-5 h-5 text-[#CBA35A]" />
                  <span className="text-3xl text-[#3D3226]" style={{ fontFamily: 'Georgia, serif' }}>1044</span>
                </div>
                <p className="text-[#7A5C47] text-xs sm:text-sm">Оценок получено</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Reviews Grid (Desktop) or Carousel (Mobile) */}
        {isMobile ? (
          <div className="max-w-md mx-auto relative mb-8">
            {/* Carousel */}
            <div className="relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <ReviewCard review={visibleReviews[currentSlide]} index={0} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevSlide}
                className="w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center hover:bg-[#FFF9F1]"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-6 h-6 text-[#7A5C47]" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {visibleReviews.slice(0, 5).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentSlide ? 'bg-[#CBA35A] w-8' : 'bg-[#E8DFD5] w-2'
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center hover:bg-[#FFF9F1]"
                aria-label="Next review"
              >
                <ChevronRight className="w-6 h-6 text-[#7A5C47]" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {visibleReviews.map((review, index) => (
              <ReviewCard key={index} review={review} index={index} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {reviewsToShow < allReviews.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <button
              onClick={loadMore}
              className="px-6 py-3 bg-gradient-to-r from-[#D4A574] to-[#CBA35A] text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm"
            >
              Показать ещё (осталось {allReviews.length - reviewsToShow})
            </button>
          </motion.div>
        )}

        {/* Call-to-Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid lg:grid-cols-3 gap-4 max-w-6xl mx-auto"
        >
          {/* Google Reviews Button */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white to-[#FFF9F1] rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(203,163,90,0.1)] hover:shadow-[0_8px_30px_rgba(203,163,90,0.2)] transition-all duration-300 h-full flex flex-col justify-center">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-[#3D3226] mb-2 text-lg sm:text-xl">
                    Смотрите все наши отзывы
                  </h3>
                  <p className="text-[#7A5C47] mb-4 text-sm">
                    Читайте больше отзывов наших гостей в Google Reviews.
                  </p>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Griga+Street+58,+Kaliningrad,+Russia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#D4A574] to-[#CBA35A] text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm"
                  >
                    <span>Читать на Google</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Write Review Section */}
          <div className="bg-gradient-to-br from-[#3D3226] to-[#7A5C47] rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(61,50,38,0.3)] text-white flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-[#CBA35A] rounded-full flex items-center justify-center mb-3 shadow-lg">
              <QrCode className="w-6 h-6 text-white" />
            </div>
            <h4 className="text-white mb-2 text-base sm:text-lg">Поделитесь впечатлениями</h4>
            <p className="text-[#E8DFD5] text-xs sm:text-sm leading-relaxed mb-3">
              Будем рады узнать о вашем визите!
            </p>
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#3D3226] rounded-full hover:bg-[#FAF7F2] transition-all duration-300 hover:scale-105 shadow-md text-sm"
            >
              <Edit3 className="w-4 h-4" />
              <span>Написать отзыв</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Review Submission Modal */}
      <ReviewSubmissionModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
    </section>
  );
}
