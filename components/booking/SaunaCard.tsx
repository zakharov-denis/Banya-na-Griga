'use client';

import { motion } from 'motion/react';
import { Users } from 'lucide-react';

interface SaunaCardProps {
  id: number;
  name: string;
  type: string;
  capacity: string;
  emoji: string;
  color: string;
  isSelected: boolean;
  onSelect: () => void;
}

export function SaunaCard({
  name,
  type,
  capacity,
  emoji,
  color,
  isSelected,
  onSelect,
}: SaunaCardProps) {
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative w-full text-left"
    >
      <div
        className={`
          relative rounded-2xl p-6 transition-all duration-300
          ${isSelected 
            ? 'bg-white shadow-xl ring-2 ring-[#CBA35A] ring-offset-2' 
            : 'bg-white shadow-md hover:shadow-xl'
          }
        `}
      >
        {/* Glow Effect when selected */}
        {isSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-2xl"
            style={{
              boxShadow: '0 0 30px rgba(203, 163, 90, 0.3)',
            }}
          />
        )}

        {/* Top Badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs mb-4"
          style={{ backgroundColor: `${color}20`, color: color }}
        >
          <span className="text-base">{emoji}</span>
          <span>{type}</span>
        </div>

        {/* Sauna Name */}
        <h3 className="text-xl text-[#3D3226] mb-2">
          {name}
        </h3>

        {/* Capacity */}
        <div className="flex items-center gap-2 text-[#7A5C47]">
          <Users className="w-4 h-4" />
          <span className="text-sm">{capacity}</span>
        </div>

        {/* Selected Indicator */}
        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-[#D4A574] to-[#CBA35A] flex items-center justify-center shadow-lg"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}
