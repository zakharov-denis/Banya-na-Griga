import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Flame, Droplets, Users, Clock, Shirt, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';

interface PricingSectionProps {
  onBookNow?: (saunaType?: string) => void;
}

export function PricingSection({ onBookNow }: PricingSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

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

    const section = document.querySelector('#pricing');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Main Sauna Services
  const mainServices = [
    {
      name: 'Баня на дровах',
      duration: '2 часа',
      price: '2400',
      description: 'Традиционная деревянная баня',
    },
    {
      name: 'Общая баня (мужское/женское отделение)',
      duration: '2 часа на человека',
      price: '800',
      description: 'Общее отделение для мужчин и женщин',
    },
    {
      name: 'Пенсионеры и инвалиды (Пт–Вс)',
      duration: '2 часа на человека',
      price: '1000',
      description: 'Льготный вход',
    },
    {
      name: 'Дети (7–14 лет)',
      duration: '2 часа на человека',
      price: '200',
      description: 'Вход для детей',
    },
  ];

  // Showers
  const showerServices = [
    {
      name: 'Душ',
      duration: '1 час на человека',
      price: '300',
      description: 'Обычный душ',
    },
    {
      name: 'Душ для пенсионеров и детей',
      duration: '1 час на человека',
      price: '200',
      description: 'Льготный душ',
    },
  ];

  // Private Sauna Rooms
  const privateSaunas = [
    {
      type: 'Сауна с бассейном',
      capacity: 'До 6 человек',
      duration: '2 часа',
      price: '2400',
      available: true,
    },
    {
      type: 'Сауна с купелью',
      capacity: 'До 3 человек',
      duration: '2 часа',
      price: '2000',
      available: true,
    },
    {
      type: 'Компактная сауна',
      capacity: '3–4 человека',
      duration: '2 часа',
      price: '1800',
      available: true,
    },
  ];

  // Additional Services
  const additionalServices = [
    { name: 'Жетоны для массажного кресла', price: '200', unit: 'за штуку' },
    { name: 'Аренда простыни', price: '200', unit: 'за штуку' },
    { name: 'Аренда полотенца', price: '300', unit: 'за штуку' },
    { name: 'Аренда халата', price: '300', unit: 'за штуку' },
    { name: 'Аренда банной шапки', price: '100', unit: 'за штуку' },
  ];

  return (
    <section id="pricing" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white via-[#F5E6D3]/20 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#D4A574] rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#3D3226] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-[#3D3226] mb-4">
            Цены
          </h2>
          <p className="text-[#3D3226]/70 max-w-2xl mx-auto">
            Прозрачные и простые цены для всех наших гостей.
          </p>
        </motion.div>

        {/* Main Sauna Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Flame className="w-7 h-7 text-[#CBA35A]" />
            <h3 className="text-[#3D3226] text-center">Основные банные услуги</h3>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl shadow-xl overflow-hidden border border-[#E8DFD5]">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#D4A574] to-[#CBA35A]">
                  <th className="px-6 py-4 text-left text-white">Услуга</th>
                  <th className="px-6 py-4 text-center text-white">Длительность</th>
                  <th className="px-6 py-4 text-center text-white">Цена</th>
                </tr>
              </thead>
              <tbody>
                {mainServices.map((service, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#E8DFD5] hover:bg-[#FAF7F2] transition-colors"
                  >
                    <td className="px-6 py-5 text-[#3D3226]">{service.name}</td>
                    <td className="px-6 py-5 text-center text-[#7A5C47]">{service.duration}</td>
                    <td className="px-6 py-5 text-center">
                      <span className="text-[#CBA35A]">{service.price} ₽</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {mainServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-[#E8DFD5]"
              >
                <h4 className="text-[#3D3226] mb-3">{service.name}</h4>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-[#7A5C47]">Длительность</p>
                    <p className="text-[#3D3226]">{service.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#7A5C47] mb-1">Цена</p>
                    <p className="text-[#CBA35A]">{service.price} ₽</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Showers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Droplets className="w-7 h-7 text-[#CBA35A]" />
            <h3 className="text-[#3D3226] text-center">Души</h3>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl shadow-xl overflow-hidden border border-[#E8DFD5]">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#D4A574] to-[#CBA35A]">
                  <th className="px-6 py-4 text-left text-white">Услуга</th>
                  <th className="px-6 py-4 text-center text-white">Длительность</th>
                  <th className="px-6 py-4 text-center text-white">Цена</th>
                </tr>
              </thead>
              <tbody>
                {showerServices.map((service, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#E8DFD5] last:border-b-0 hover:bg-[#FAF7F2] transition-colors"
                  >
                    <td className="px-6 py-5 text-[#3D3226]">{service.name}</td>
                    <td className="px-6 py-5 text-center text-[#7A5C47]">{service.duration}</td>
                    <td className="px-6 py-5 text-center">
                      <span className="text-[#CBA35A]">{service.price} ₽</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {showerServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-[#E8DFD5]"
              >
                <h4 className="text-[#3D3226] mb-3">{service.name}</h4>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-[#7A5C47]">Длительность</p>
                    <p className="text-[#3D3226]">{service.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[#7A5C47] mb-1">Цена</p>
                    <p className="text-[#CBA35A]">{service.price} ₽</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Private Sauna Rooms */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Users className="w-7 h-7 text-[#CBA35A]" />
            <h3 className="text-[#3D3226] text-center">Приватные сауны</h3>
          </div>
          
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl shadow-xl overflow-hidden border border-[#E8DFD5]">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#D4A574] to-[#CBA35A]">
                  <th className="px-6 py-4 text-left text-white">Тип сауны</th>
                  <th className="px-6 py-4 text-center text-white">Вместимость</th>
                  <th className="px-6 py-4 text-center text-white">Длительность</th>
                  <th className="px-6 py-4 text-center text-white">Цена</th>
                  <th className="px-6 py-4 text-center text-white">Статус</th>
                </tr>
              </thead>
              <tbody>
                {privateSaunas.map((sauna, index) => (
                  <tr
                    key={index}
                    className={`border-b border-[#E8DFD5] last:border-b-0 transition-colors ${
                      sauna.available ? 'hover:bg-[#FAF7F2]' : 'bg-gray-50'
                    }`}
                  >
                    <td className={`px-6 py-5 ${sauna.available ? 'text-[#3D3226]' : 'text-[#3D3226]/40'}`}>
                      {sauna.type}
                    </td>
                    <td className={`px-6 py-5 text-center ${sauna.available ? 'text-[#7A5C47]' : 'text-[#7A5C47]/40'}`}>
                      {sauna.capacity}
                    </td>
                    <td className={`px-6 py-5 text-center ${sauna.available ? 'text-[#7A5C47]' : 'text-[#7A5C47]/40'}`}>
                      {sauna.duration}
                    </td>
                    <td className="px-6 py-5 text-center">
                      {sauna.price ? (
                        <span className={sauna.available ? 'text-[#CBA35A]' : 'text-[#CBA35A]/40'}>
                          {sauna.price} ₽
                        </span>
                      ) : (
                        <span className="text-[#7A5C47]/40">—</span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-center">
                      {sauna.available ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                          Доступна
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-700">
                          Недоступна
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {privateSaunas.map((sauna, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 shadow-lg border ${
                  sauna.available 
                    ? 'bg-white border-[#E8DFD5]' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className={sauna.available ? 'text-[#3D3226]' : 'text-[#3D3226]/40'}>
                    {sauna.type}
                  </h4>
                  {sauna.available ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                      Доступна
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-red-100 text-red-700">
                      Недоступна
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-[#7A5C47]/70">Вместимость</p>
                    <p className={sauna.available ? 'text-[#3D3226]' : 'text-[#3D3226]/40'}>
                      {sauna.capacity}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#7A5C47]/70">Длительность</p>
                    <p className={sauna.available ? 'text-[#3D3226]' : 'text-[#3D3226]/40'}>
                      {sauna.duration}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-[#7A5C47]/70 mb-1">Цена</p>
                    {sauna.price ? (
                      <p className={sauna.available ? 'text-[#CBA35A]' : 'text-[#CBA35A]/40'}>
                        {sauna.price} ₽
                      </p>
                    ) : (
                      <p className="text-[#7A5C47]/40">—</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <Shirt className="w-7 h-7 text-[#CBA35A]" />
            <h3 className="text-[#3D3226] text-center">Дополнительные услуги</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {additionalServices.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg border border-[#E8DFD5] flex items-center justify-between hover:shadow-xl transition-all hover:border-[#CBA35A]"
              >
                <div>
                  <h4 className="text-[#3D3226]">{service.name}</h4>
                </div>
                <p className="text-[#CBA35A] whitespace-nowrap ml-4">{service.price} ₽</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why Visit Our Sauna - Wellness Paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-br from-[#FAF7F2] to-[#F5EFE6] rounded-3xl p-8 sm:p-12 shadow-xl border border-[#E8DFD5]">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Clock className="w-8 h-8 text-[#CBA35A]" />
                <h3 className="text-[#3D3226] text-center">Почему стоит посетить нашу баню?</h3>
              </div>
              <p className="text-[#3D3226]/80 text-center leading-relaxed text-lg">
                В современной занятой жизни отдых — это не роскошь, а необходимость. 
                Наша баня поможет вам расслабиться, восстановить силы и позаботиться о здоровье. 
                Посещение бани улучшает сон, расслабляет мышцы, очищает кожу и восстанавливает жизненную энергию. 
                Приходите ли вы один, с друзьями или семьёй — здесь вас ждёт полное расслабление и гармония.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Note about pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mb-12"
        >
          <div className="max-w-4xl mx-auto bg-[#F5EFE6]/50 rounded-2xl p-6 border border-[#E8DFD5]">
            <p className="text-[#3D3226]/70 text-center text-sm">
              Все цены включают базовые удобства. Для групповых бронирований или продлённых сеансов свяжитесь с администрацией.
            </p>
          </div>
        </motion.div>

        {/* Book Now CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Button
            onClick={() => onBookNow?.()}
            className="bg-gradient-to-r from-[#D4A574] to-[#CBA35A] hover:from-[#CBA35A] hover:to-[#D4A574] text-white px-12 py-6 text-lg rounded-2xl shadow-xl transform hover:scale-105 transition-all"
          >
            📅 Забронировать
          </Button>
          <p className="text-sm text-[#7A5C47] mt-4">
            Забронируйте идеальный отдых уже сегодня
          </p>
        </motion.div>
      </div>
    </section>
  );
}
