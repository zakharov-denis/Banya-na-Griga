import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { Users, PartyPopper, Briefcase, Heart, Clock, UsersRound, Sparkles, Plus, Wine, Flower2, UtensilsCrossed, Gift } from 'lucide-react';
import { Button } from './ui/button';

interface Package {
  id: string;
  type: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  duration: string;
  groupSize: string;
  price: string;
  isGiftable: boolean;
  image: string;
}

interface EventPackagesSectionProps {
  onRequestQuote?: (packageType: string) => void;
}

export function EventPackagesSection({ onRequestQuote }: EventPackagesSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showAddOns, setShowAddOns] = useState(false);

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

    const section = document.getElementById('event-packages');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const packages: Package[] = [
    {
      id: 'corporate',
      type: 'Корпоративный отдых',
      icon: <Briefcase className="w-6 h-6" />,
      description: 'Идеально для тимбилдинга, снятия стресса и корпоративных wellness-мероприятий.',
      features: [
        'Приватный доступ к бане для команды',
        'Сессия с wellness-специалистом',
        'Напитки и полезные закуски',
        'Персональный координатор события',
        'Гибкий график бронирования',
      ],
      duration: '3-4 часа',
      groupSize: '10-25 человек',
      price: 'Запросить цену',
      isGiftable: false,
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    },
    {
      id: 'birthday',
      type: 'Пакет "День рождения"',
      icon: <PartyPopper className="w-6 h-6" />,
      description: 'Отпразднуйте свой особенный день с друзьями в роскошной приватной обстановке.',
      features: [
        'Приватная сауна',
        'Оформление ко дню рождения',
        'Шампанское и напитки',
        'Персонализированная программа',
        'Фотозоны для отдыха',
      ],
      duration: '2-3 часа',
      groupSize: 'До 12 человек',
      price: 'От 15 000 ₽',
      isGiftable: true,
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    },
    {
      id: 'stag',
      type: 'Мальчишник',
      icon: <Users className="w-6 h-6" />,
      description: 'Уникальное wellness-событие для жениха и друзей перед свадьбой.',
      features: [
        'Эксклюзивный приватный доступ',
        'Премиум баня и парные сессии',
        'Настраиваемый напиточный пакет',
        'Групповой массаж (опционально)',
        'Возможность позднего бронирования',
      ],
      duration: '3-5 часов',
      groupSize: '8-15 человек',
      price: 'От 20 000 ₽',
      isGiftable: false,
      image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80',
    },
    {
      id: 'wellness',
      type: 'Приватный wellness-день',
      icon: <Heart className="w-6 h-6" />,
      description: 'Целый день отдыха и восстановления для вас и ваших близких.',
      features: [
        'Приватный доступ на весь день',
        'Персональная wellness-программа',
        'Гурмэ обед включен',
        'Несколько банных и spa-сессий',
        'Профессиональный wellness-консультант',
      ],
      duration: 'Полный день (6-8 часов)',
      groupSize: '4-10 человек',
      price: 'От 25 000 ₽',
      isGiftable: true,
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    },
  ];

  const addOns = [
    {
      id: 'champagne',
      name: 'Шампанское и напитки',
      icon: <Wine className="w-5 h-5" />,
      description: 'Премиум напитки и легкие закуски',
      price: 'От 3 000 ₽',
    },
    {
      id: 'massage',
      name: 'Групповой массаж',
      icon: <Flower2 className="w-5 h-5" />,
      description: 'Профессиональный массаж для групп',
      price: 'От 2 500 ₽/чел',
    },
    {
      id: 'dining',
      name: 'Приватный ужин',
      icon: <UtensilsCrossed className="w-5 h-5" />,
      description: 'Отдельная комната с гурмэ меню',
      price: 'От 5 000 ₽',
    },
  ];

  const handleRequestQuote = (packageType: string) => {
    if (onRequestQuote) {
      onRequestQuote(packageType);
    } else {
      // Scroll to contact section
      const contactSection = document.querySelector('#contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section
      id="event-packages"
      className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-white via-[#F5E6D3]/20 to-white relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#F5E6D3]/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37]/10 to-[#F5E6D3]/30 mb-4">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-sm text-[#3D3226]">Специальные мероприятия</span>
          </div>
          <h2 className="text-[#3D3226] mb-4">
            Корпоративные и событийные пакеты
          </h2>
          <p className="text-[#3D3226]/70 max-w-2xl mx-auto">
            Идеально для дней рождения, мальчишников, корпоративов и приватных wellness-дней.
            Создайте незабываемые впечатления в нашем роскошном пространстве.
          </p>
        </motion.div>

        {/* Package Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <PackageCard
                package={pkg}
                onRequestQuote={() => handleRequestQuote(pkg.type)}
              />
            </motion.div>
          ))}
        </div>

        {/* Add-ons Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <button
            onClick={() => setShowAddOns(!showAddOns)}
            className="w-full flex items-center justify-between p-6 rounded-2xl bg-gradient-to-r from-white to-[#F5E6D3]/20 border border-[#D4AF37]/20 hover:border-[#D4AF37]/40 transition-all duration-300 group mb-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#F5E6D3]/40 flex items-center justify-center">
                <Plus className={`w-5 h-5 text-[#D4AF37] transition-transform duration-300 ${showAddOns ? 'rotate-45' : ''}`} />
              </div>
              <div className="text-left">
                <h3 className="text-[#3D3226]">Улучшите впечатления</h3>
                <p className="text-sm text-[#3D3226]/60">Доступны дополнительные премиум-опции</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: showAddOns ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-[#D4AF37]"
            >
              <Plus className="w-5 h-5" />
            </motion.div>
          </button>

          <AnimatePresence>
            {showAddOns && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 p-6 rounded-2xl bg-white/50 border border-[#D4AF37]/10">
                  {addOns.map((addon, index) => (
                    <motion.div
                      key={addon.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="p-5 rounded-xl bg-white border border-[#F5E6D3] hover:border-[#D4AF37]/30 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#D4AF37]/10 to-[#F5E6D3]/30 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
                          {addon.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-[#3D3226] text-sm mb-1">{addon.name}</h4>
                          <p className="text-xs text-[#3D3226]/60 mb-2">{addon.description}</p>
                          <p className="text-sm text-[#D4AF37]">{addon.price}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-[#3D3226]/70 mb-6">
            Нужен индивидуальный пакет или есть вопросы?
          </p>
          <Button
            onClick={() => handleRequestQuote('Индивидуальный пакет')}
            className="bg-gradient-to-r from-[#D4AF37] to-[#F5E6D3] text-[#3D3226] hover:from-[#C5A028] hover:to-[#E6D7C4] shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-8 py-6"
          >
            Связаться с отделом мероприятий
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

interface PackageCardProps {
  package: Package;
  onRequestQuote: () => void;
}

function PackageCard({ package: pkg, onRequestQuote }: PackageCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative h-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gift Tag */}
      {pkg.isGiftable && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="bg-gradient-to-r from-[#D4AF37] to-[#F5E6D3] text-[#3D3226] px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow-lg">
            <Gift className="w-3 h-3" />
            Подарочный
          </div>
        </div>
      )}

      <motion.div
        animate={{
          y: isHovered ? -8 : 0,
          boxShadow: isHovered
            ? '0 20px 40px rgba(212, 175, 55, 0.15)'
            : '0 4px 20px rgba(0, 0, 0, 0.08)',
        }}
        transition={{ duration: 0.3 }}
        className="h-full rounded-3xl overflow-hidden bg-white border-2 border-transparent group-hover:border-[#D4AF37]/30 transition-colors duration-300"
      >
        {/* Card Image Header */}
        <div className="relative h-48 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{ backgroundImage: `url(${pkg.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#3D3226]/40 via-[#3D3226]/20 to-transparent" />
          
          {/* Icon Badge */}
          <div className="absolute top-4 left-4">
            <div className="w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-sm flex items-center justify-center text-[#D4AF37] shadow-lg">
              {pkg.icon}
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
          {/* Title */}
          <div className="mb-4">
            <h3 className="text-[#3D3226] mb-2">{pkg.type}</h3>
            <p className="text-sm text-[#3D3226]/70">{pkg.description}</p>
          </div>

          {/* Features List */}
          <ul className="space-y-2 mb-4 flex-1">
            {pkg.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-[#3D3226]/80">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Details */}
          <div className="flex items-center gap-4 pt-3 mb-4 border-t border-[#F5E6D3]">
            <div className="flex items-center gap-2 text-sm text-[#3D3226]/70">
              <Clock className="w-4 h-4 text-[#D4AF37]" />
              <span>{pkg.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#3D3226]/70">
              <UsersRound className="w-4 h-4 text-[#D4AF37]" />
              <span>{pkg.groupSize}</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="mt-auto">
            <p className="text-[#D4AF37] mb-3">{pkg.price}</p>
            <Button
              onClick={onRequestQuote}
              className="w-full bg-gradient-to-r from-[#3D3226] to-[#4D4236] text-white hover:from-[#4D4236] hover:to-[#3D3226] transition-all duration-300 rounded-xl group-hover:shadow-lg"
            >
              Запросить цену
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
