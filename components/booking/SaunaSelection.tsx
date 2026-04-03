'use client';

import { useState, useEffect } from 'react';
import { SaunaCard } from './SaunaCard';

interface Sauna {
  id: number;
  name: string;
  type: string;
  capacity: string;
  emoji: string;
  color: string;
}

interface SaunaSelectionProps {
  onSelect: (sauna: Sauna) => void;
  shouldHighlightFirst?: boolean;
}

const saunas: Sauna[] = [
  { id: 1, name: 'Баня на дровах', type: 'Банная услуга', capacity: '2 часа - 2400 ₽', emoji: '🔥', color: '#D4A574' },
  { id: 2, name: 'Общая баня (муж/жен)', type: 'Банная услуга', capacity: 'С человека - 1000 ₽', emoji: '👥', color: '#7A5C47' },
  { id: 6, name: 'Сауна с бассейном (до 10 чел)', type: 'Приватная сауна', capacity: '2 часа - 5000 ₽', emoji: '💧', color: '#5B9FD5' },
  { id: 3, name: 'Сауна с бассейном (до 6 чел)', type: 'Приватная сауна', capacity: '2 часа - 2400 ₽', emoji: '💧', color: '#5B9FD5' },
  { id: 4, name: 'Сауна с ванной', type: 'Приватная сауна', capacity: 'До 3 человек - 2000 ₽', emoji: '🛁', color: '#CBA35A' },
  { id: 5, name: 'Компактная сауна', type: 'Приватная сауна', capacity: '3-4 человека - 1800 ₽', emoji: '🏠', color: '#8B7355' },
  { id: 7, name: 'Пенсионеры и инвалиды (Пт-Вс)', type: 'Специальный тариф', capacity: '2 часа - 1000 ₽', emoji: '🏷️', color: '#9C8775' },
  { id: 8, name: 'Дети (7-14 лет)', type: 'Специальный тариф', capacity: '2 часа - 200 ₽', emoji: '👶', color: '#B8A490' },
  { id: 9, name: 'Душ', type: 'Услуги душа', capacity: '1 час - 300 ₽', emoji: '🚿', color: '#6BA3C4' },
  { id: 10, name: 'Душ для пенсионеров и детей', type: 'Услуги душа', capacity: '1 час - 200 ₽', emoji: '🧴', color: '#7DB4D8' },
];

export function SaunaSelection({ onSelect, shouldHighlightFirst = false }: SaunaSelectionProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [highlightFirst, setHighlightFirst] = useState(shouldHighlightFirst);

  const handleSelect = (sauna: Sauna) => {
    setSelectedId(sauna.id);
    // Add slight delay for visual feedback before transitioning
    setTimeout(() => {
      onSelect(sauna);
    }, 300);
  };

  // Clear highlight after 2 seconds
  useEffect(() => {
    if (highlightFirst) {
      const timer = setTimeout(() => {
        setHighlightFirst(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [highlightFirst]);

  return (
    <div className="p-6 sm:p-8 lg:p-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl text-[#3D3226] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
            Выберите ваш банный опыт
          </h3>
          <p className="text-[#7A5C47]">
            Выберите из наших аутентичных русских банных услуг
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {saunas.map((sauna, index) => (
            <div
              key={sauna.id}
              className={`${
                highlightFirst && index === 0
                  ? 'relative animate-pulse-glow'
                  : ''
              }`}
            >
              <SaunaCard
                {...sauna}
                isSelected={selectedId === sauna.id}
                onSelect={() => handleSelect(sauna)}
              />
              {highlightFirst && index === 0 && (
                <div className="absolute -inset-1 bg-gradient-to-r from-[#D4A574] to-[#CBA35A] rounded-2xl opacity-30 blur-md -z-10 animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
