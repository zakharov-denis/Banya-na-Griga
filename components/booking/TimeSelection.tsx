'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Sunrise, Sun, Sunset } from 'lucide-react';
import { Button } from '../ui/button';
import { BookingSummary } from './BookingSummary';
import { ConsentCheckboxes } from '../ui/ConsentCheckboxes';

interface TimeSelectionProps {
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
  };
  onSelect: (time: string, duration: number) => void;
  onBack: () => void;
  onOpenLegalDoc?: (docType: 'offer' | 'privacy') => void;
  onOpenCancellationPolicy?: () => void;
}

const timeSlots = {
  morning: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30'],
  afternoon: ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'],
  evening: ['16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'],
};

const durations = [30, 60, 90];

export function TimeSelection({ bookingData, onSelect, onBack, onOpenLegalDoc, onOpenCancellationPolicy }: TimeSelectionProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [dataConsentAccepted, setDataConsentAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);

  const handleContinue = () => {
    if (selectedTime && termsAccepted && dataConsentAccepted) {
      onSelect(selectedTime, selectedDuration);
    }
  };

  const isFormValid = selectedTime && termsAccepted && dataConsentAccepted;

  const TimeSlotButton = ({ time }: { time: string }) => {
    const isSelected = selectedTime === time;
    
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setSelectedTime(time)}
        className={`
          px-6 py-3 rounded-xl text-sm transition-all duration-200
          ${isSelected
            ? 'bg-gradient-to-r from-[#D4A574] to-[#CBA35A] text-white shadow-lg'
            : 'bg-white text-[#3D3226] hover:bg-[#FAF7F2] shadow-sm hover:shadow-md'
          }
        `}
      >
        {time}
      </motion.button>
    );
  };

  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#7A5C47] hover:text-[#3D3226] transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Вернуться к календарю</span>
        </button>

        {/* Summary */}
        <BookingSummary 
          sauna={bookingData.sauna!} 
          date={bookingData.date}
        />

        {/* Duration Selector */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <h3 className="text-xl text-[#3D3226] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Продолжительность сеанса
          </h3>
          <div className="flex flex-wrap gap-3">
            {durations.map((duration) => (
              <motion.button
                key={duration}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedDuration(duration)}
                className={`
                  px-8 py-4 rounded-xl transition-all duration-200
                  ${selectedDuration === duration
                    ? 'bg-gradient-to-r from-[#D4A574] to-[#CBA35A] text-white shadow-lg ring-2 ring-[#CBA35A] ring-offset-2'
                    : 'bg-[#FAF7F2] text-[#3D3226] hover:bg-[#E8DFD5]'
                  }
                `}
              >
                <div className="text-2xl">{duration}</div>
                <div className="text-xs mt-1">минут</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h3 className="text-xl text-[#3D3226] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Доступные временные слоты
          </h3>

          {/* Morning */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FDB462] to-[#FFD700] flex items-center justify-center">
                <Sunrise className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg text-[#3D3226]">Утро</h4>
              <span className="text-sm text-[#7A5C47]">08:00 - 12:00</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">
              {timeSlots.morning.map((time) => (
                <TimeSlotButton key={time} time={time} />
              ))}
            </div>
          </div>

          {/* Afternoon */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFB347] to-[#FFCC33] flex items-center justify-center">
                <Sun className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg text-[#3D3226]">День</h4>
              <span className="text-sm text-[#7A5C47]">12:00 - 16:00</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">
              {timeSlots.afternoon.map((time) => (
                <TimeSlotButton key={time} time={time} />
              ))}
            </div>
          </div>

          {/* Evening */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF8C69] to-[#FF6347] flex items-center justify-center">
                <Sunset className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg text-[#3D3226]">Вечер</h4>
              <span className="text-sm text-[#7A5C47]">16:00 - 20:00</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3">
              {timeSlots.evening.map((time) => (
                <TimeSlotButton key={time} time={time} />
              ))}
            </div>
          </div>
        </div>

        {/* Consent Checkboxes */}
        <div className="bg-gradient-to-br from-[#FFF9F1] to-white rounded-2xl shadow-md p-6 sm:p-8 mt-6 border border-[#E8DFD5]">
          <h3 className="text-lg text-[#3D3226] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Согласие на обработку данных
          </h3>
          <ConsentCheckboxes
            termsAccepted={termsAccepted}
            dataConsentAccepted={dataConsentAccepted}
            marketingAccepted={marketingAccepted}
            onTermsChange={setTermsAccepted}
            onDataConsentChange={setDataConsentAccepted}
            onMarketingChange={setMarketingAccepted}
            onOpenLegalDoc={onOpenLegalDoc}
          />

          {/* Cancellation Policy Notice */}
          <div className="mt-4 p-4 bg-[#FFF9F1] rounded-lg border border-[#D4AF37]/20">
            <p className="text-sm text-[#3D3226]/80">
              Совершая бронирование, вы соглашаетесь с нашей{' '}
              <button
                onClick={onOpenCancellationPolicy}
                className="text-[#D4AF37] hover:text-[#C5A028] underline underline-offset-2 transition-colors"
              >
                Политикой отмены и возврата
              </button>
              .
            </p>
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleContinue}
            disabled={!isFormValid}
            className="
              bg-gradient-to-r from-[#D4A574] to-[#C69563] 
              hover:from-[#C69563] hover:to-[#B8865A] 
              text-white rounded-full px-8 py-6
              shadow-lg hover:shadow-xl
              transition-all duration-300 
              hover:scale-105
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            "
          >
            Подтвердить бронирование →
          </Button>
        </div>
      </div>
    </div>
  );
}
