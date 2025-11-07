'use client';

import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const steps = [
    { number: 1, label: 'Выбор сауны' },
    { number: 2, label: 'Дата' },
    { number: 3, label: 'Время' },
  ];

  return (
    <div className="w-full">
      {/* Desktop View */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex flex-col items-center relative z-10">
              <motion.div
                initial={false}
                animate={{
                  scale: currentStep === step.number ? 1.1 : 1,
                  backgroundColor: currentStep > step.number ? '#CBA35A' : currentStep === step.number ? '#D4A574' : '#E8DFD5',
                }}
                transition={{ duration: 0.3 }}
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-md"
              >
                {currentStep > step.number ? (
                  <Check className="w-6 h-6 text-white" />
                ) : (
                  <span className={`text-lg ${currentStep >= step.number ? 'text-white' : 'text-[#7A5C47]'}`}>
                    {step.number}
                  </span>
                )}
              </motion.div>
              <span className="text-xs sm:text-sm text-[#7A5C47] mt-2 whitespace-nowrap">
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-4 bg-[#E8DFD5] rounded-full overflow-hidden">
                <motion.div
                  initial={false}
                  animate={{
                    width: currentStep > step.number ? '100%' : '0%',
                  }}
                  transition={{ duration: 0.4 }}
                  className="h-full bg-gradient-to-r from-[#D4A574] to-[#CBA35A]"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile View - Dots */}
      <div className="flex md:hidden items-center justify-center gap-3">
        {steps.map((step) => (
          <motion.div
            key={step.number}
            initial={false}
            animate={{
              width: currentStep === step.number ? '32px' : '12px',
              backgroundColor: currentStep >= step.number ? '#D4A574' : '#E8DFD5',
            }}
            transition={{ duration: 0.3 }}
            className="h-3 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}
