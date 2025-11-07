'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Calendar, Clock, MapPin, Download } from 'lucide-react';
import { Button } from '../ui/button';
import confetti from 'canvas-confetti';

interface ConfirmationScreenProps {
  bookingData: {
    sauna?: {
      id: number;
      name: string;
      type: string;
      capacity: string;
      emoji: string;
      color: string;
    };
    date?: Date;
    time?: string;
    duration?: number;
  };
  onBookAnother: () => void;
  onClose: () => void;
}

export function ConfirmationScreen({
  bookingData,
  onBookAnother,
  onClose,
}: ConfirmationScreenProps) {
  const [bookingId] = useState(() => 
    `BH${Date.now().toString().slice(-8)}`
  );

  useEffect(() => {
    // Spa-themed confetti
    const duration = 2000;
    const animationEnd = Date.now() + duration;

    const colors = ['#D4A574', '#CBA35A', '#E8DFD5', '#FAF7F2'];

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: colors,
        shapes: ['circle'],
        gravity: 0.8,
        scalar: 0.8,
      });

      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: colors,
        shapes: ['circle'],
        gravity: 0.8,
        scalar: 0.8,
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (date?: Date) => {
    if (!date) return '';
    return date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleAddToCalendar = (type: 'google' | 'outlook') => {
    // Mock calendar integration
    const { sauna, date, time, duration } = bookingData;
    if (!sauna || !date || !time || !duration) return;

    const title = `Сеанс в бане ${sauna.name}`;
    const description = `${sauna.type} - ${sauna.capacity}`;
    const location = 'ул. Грига 58, Калининград, Россия';

    if (type === 'google') {
      // Google Calendar URL format
      console.log('Add to Google Calendar:', { title, description, location });
    } else {
      // Outlook Calendar format
      console.log('Add to Outlook Calendar:', { title, description, location });
    }
  };

  return (
    <div className="p-6 sm:p-8 lg:p-12 min-h-[600px] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="max-w-2xl w-full"
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0.2 
          }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4A574] to-[#CBA35A] rounded-full blur-2xl opacity-30 animate-pulse" />
            <CheckCircle className="w-24 h-24 text-[#D4A574] relative z-10" strokeWidth={1.5} />
          </div>
        </motion.div>

        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl sm:text-4xl text-[#3D3226] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Бронирование подтверждено!
          </h2>
          <p className="text-[#7A5C47] text-lg">
            Ваш аутентичный банный опыт ждёт вас. Мы зарезервировали ваш сеанс.
          </p>
        </motion.div>

        {/* Booking ID */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-r from-[#FAF7F2] to-[#F5EFE6] rounded-2xl p-4 mb-6 text-center border border-[#E8DFD5]"
        >
          <div className="text-sm text-[#7A5C47] mb-1">ID бронирования</div>
          <div className="text-2xl text-[#3D3226] tracking-wider">{bookingId}</div>
        </motion.div>

        {/* Booking Details */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6 space-y-4"
        >
          {/* Service */}
          <div className="flex items-start gap-4 pb-4 border-b border-[#E8DFD5]">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FAF7F2] to-[#E8DFD5] flex items-center justify-center text-2xl flex-shrink-0">
              {bookingData.sauna?.emoji}
            </div>
            <div className="flex-1">
              <div className="text-sm text-[#7A5C47]">Услуга</div>
              <div className="text-lg text-[#3D3226]">{bookingData.sauna?.name}</div>
              <div className="text-sm text-[#7A5C47]">{bookingData.sauna?.type}</div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="flex items-start gap-4 pb-4 border-b border-[#E8DFD5]">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FAF7F2] to-[#E8DFD5] flex items-center justify-center flex-shrink-0">
              <Calendar className="w-6 h-6 text-[#D4A574]" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-[#7A5C47]">Дата и время</div>
              <div className="text-lg text-[#3D3226]">{formatDate(bookingData.date)}</div>
              <div className="text-sm text-[#7A5C47]">в {bookingData.time}</div>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-start gap-4 pb-4 border-b border-[#E8DFD5]">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FAF7F2] to-[#E8DFD5] flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-[#D4A574]" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-[#7A5C47]">Продолжительность сеанса</div>
              <div className="text-lg text-[#3D3226]">{bookingData.duration} минут</div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FAF7F2] to-[#E8DFD5] flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-[#D4A574]" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-[#7A5C47]">Адрес</div>
              <div className="text-lg text-[#3D3226]">Баня на Грига</div>
              <div className="text-sm text-[#7A5C47]">ул. Грига 58, Калининград, Россия</div>
            </div>
          </div>
        </motion.div>

        {/* Add to Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap gap-3 justify-center mb-8"
        >
          <Button
            onClick={() => handleAddToCalendar('google')}
            variant="outline"
            className="border-2 border-[#D4A574] text-[#7A5C47] hover:bg-[#D4A574]/10 rounded-full gap-2"
          >
            <Download className="w-4 h-4" />
            Добавить в Google Calendar
          </Button>
          <Button
            onClick={() => handleAddToCalendar('outlook')}
            variant="outline"
            className="border-2 border-[#D4A574] text-[#7A5C47] hover:bg-[#D4A574]/10 rounded-full gap-2"
          >
            <Download className="w-4 h-4" />
            Добавить в Outlook
          </Button>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={onBookAnother}
            className="bg-gradient-to-r from-[#D4A574] to-[#C69563] hover:from-[#C69563] hover:to-[#B8865A] text-white rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Забронировать ещё
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="border-2 border-[#7A5C47] text-[#7A5C47] hover:bg-[#7A5C47] hover:text-white rounded-full px-8 py-6 transition-all duration-300"
          >
            Закрыть
          </Button>
        </motion.div>

        {/* Confirmation Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-sm text-[#7A5C47] mt-6"
        >
          Письмо с подтверждением отправлено на вашу электронную почту
        </motion.p>
      </motion.div>
    </div>
  );
}
