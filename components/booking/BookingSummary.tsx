'use client';

import { motion } from 'motion/react';
import { Calendar, Clock } from 'lucide-react';

interface BookingSummaryProps {
  sauna: {
    name: string;
    type: string;
    emoji: string;
  };
  date?: Date;
  duration?: number;
}

export function BookingSummary({ sauna, date, duration }: BookingSummaryProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-[#FAF7F2] to-[#F5EFE6] rounded-2xl p-6 mb-6 border border-[#E8DFD5]"
    >
      <div className="flex flex-wrap items-center gap-4 sm:gap-6">
        {/* Sauna Info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl shadow-sm">
            {sauna.emoji}
          </div>
          <div>
            <div className="text-sm text-[#7A5C47]">Выбранная услуга</div>
            <div className="text-[#3D3226]">{sauna.name}</div>
            <div className="text-xs text-[#7A5C47]">{sauna.type}</div>
          </div>
        </div>

        {/* Divider */}
        {date && <div className="hidden sm:block w-px h-12 bg-[#E8DFD5]" />}

        {/* Date Info */}
        {date && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
              <Calendar className="w-5 h-5 text-[#D4A574]" />
            </div>
            <div>
              <div className="text-sm text-[#7A5C47]">Дата</div>
              <div className="text-[#3D3226]">{formatDate(date)}</div>
            </div>
          </div>
        )}

        {/* Duration Info */}
        {duration && (
          <>
            <div className="hidden sm:block w-px h-12 bg-[#E8DFD5]" />
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Clock className="w-5 h-5 text-[#D4A574]" />
              </div>
              <div>
                <div className="text-sm text-[#7A5C47]">Продолжительность</div>
                <div className="text-[#3D3226]">{duration} минут</div>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
