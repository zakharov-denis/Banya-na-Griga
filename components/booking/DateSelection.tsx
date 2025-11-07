'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { BookingSummary } from './BookingSummary';

interface DateSelectionProps {
  sauna: {
    id: number;
    name: string;
    type: string;
    capacity: string;
    emoji: string;
    color: string;
  };
  onSelect: (date: Date) => void;
  onBack: () => void;
}

export function DateSelection({ sauna, onSelect, onBack }: DateSelectionProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  // Adjust for Monday start (Russian calendar standard)
  // getDay() returns 0 for Sunday, 1 for Monday, etc.
  // We want Monday to be 0, so we subtract 1 and handle Sunday specially
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  // Get today's date properly normalized to midnight
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todayTimestamp = today.getTime();

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const dayNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    // Don't allow navigating before current month
    const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    if (prevMonth >= currentMonthStart) {
      setCurrentMonth(prevMonth);
    }
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    setCurrentMonth(nextMonth);
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dateTimestamp = date.getTime();
    
    if (dateTimestamp >= todayTimestamp) {
      setSelectedDate(date);
    }
  };

  const handleContinue = () => {
    if (selectedDate) {
      onSelect(selectedDate);
    }
  };

  const isDatePast = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const dateTimestamp = date.getTime();
    return dateTimestamp < todayTimestamp;
  };

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.toDateString() === selectedDate.toDateString();
  };

  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#7A5C47] hover:text-[#3D3226] transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Вернуться к выбору саун</span>
        </button>

        {/* Summary */}
        <BookingSummary sauna={sauna} />

        {/* Calendar Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl text-[#3D3226]" style={{ fontFamily: 'Georgia, serif' }}>
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={handlePrevMonth}
                disabled={
                  currentMonth.getMonth() === today.getMonth() &&
                  currentMonth.getFullYear() === today.getFullYear()
                }
                className="w-10 h-10 rounded-full bg-[#FAF7F2] hover:bg-[#E8DFD5] flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#FAF7F2]"
              >
                <ChevronLeft className="w-5 h-5 text-[#7A5C47]" />
              </button>
              <button
                onClick={handleNextMonth}
                className="w-10 h-10 rounded-full bg-[#FAF7F2] hover:bg-[#E8DFD5] flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-[#7A5C47]" />
              </button>
            </div>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center text-xs sm:text-sm text-[#7A5C47] py-1 sm:py-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: adjustedFirstDay }).map((_, index) => (
              <div 
                key={`empty-${index}`}
                className="aspect-square min-h-[40px] sm:min-h-0"
              />
            ))}

            {/* Calendar days */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const isPast = isDatePast(day);
              const isSelected = isDateSelected(day);

              return (
                <motion.button
                  key={day}
                  whileHover={!isPast ? { scale: 1.05 } : {}}
                  whileTap={!isPast ? { scale: 0.95 } : {}}
                  onClick={() => handleDateClick(day)}
                  disabled={isPast}
                  className={`
                    aspect-square rounded-lg sm:rounded-xl flex items-center justify-center
                    text-xs sm:text-sm md:text-base
                    min-h-[40px] sm:min-h-0
                    transition-all duration-200
                    ${isPast 
                      ? 'text-[#B8A896] bg-[#F5F5F5] cursor-not-allowed' 
                      : isSelected
                        ? 'bg-gradient-to-br from-[#D4A574] to-[#CBA35A] text-white shadow-lg ring-1 sm:ring-2 ring-[#CBA35A] ring-offset-1 sm:ring-offset-2'
                        : 'bg-[#FAF7F2] text-[#3D3226] hover:bg-[#E8DFD5] hover:shadow-md'
                    }
                  `}
                >
                  {day}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleContinue}
            disabled={!selectedDate}
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
            Выбрать время →
          </Button>
        </div>
      </div>
    </div>
  );
}
