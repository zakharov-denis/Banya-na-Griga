'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { SaunaSelection } from './SaunaSelection';
import { DateSelection } from './DateSelection';
import { TimeSelection } from './TimeSelection';
import { ConfirmationScreen } from './ConfirmationScreen';
import { ProgressBar } from './ProgressBar';

interface BookingData {
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
}

interface BookingWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  shouldHighlightFirst?: boolean;
  onOpenLegalDoc?: (docType: 'offer' | 'privacy') => void;
  onOpenCancellationPolicy?: () => void;
}

export function BookingWidget({ isOpen, onClose, shouldHighlightFirst = false, onOpenLegalDoc, onOpenCancellationPolicy }: BookingWidgetProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingData>({});

  const handleSaunaSelect = (sauna: BookingData['sauna']) => {
    setBookingData({ ...bookingData, sauna });
    setCurrentStep(2);
  };

  const handleDateSelect = (date: Date) => {
    setBookingData({ ...bookingData, date });
    setCurrentStep(3);
  };

  const handleTimeSelect = (time: string, duration: number) => {
    setBookingData({ ...bookingData, time, duration });
    setCurrentStep(4);
  };

  const handleBack = () => {
    setCurrentStep(Math.max(1, currentStep - 1));
  };

  const handleReset = () => {
    setBookingData({});
    setCurrentStep(1);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-4 sm:inset-8 md:inset-12 lg:inset-16 z-50 flex items-center justify-center"
          >
            <div className="w-full max-w-6xl h-full max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-[#FAF7F2] to-[#F5EFE6] px-6 sm:px-8 py-6 border-b border-[#E8DFD5]">
                <button
                  onClick={handleClose}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                >
                  <X className="w-5 h-5 text-[#7A5C47]" />
                </button>
                
                <h2 className="text-2xl sm:text-3xl text-[#3D3226] tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                  Забронировать баню
                </h2>
                <p className="text-[#7A5C47] mt-2">
                  Забронируйте вашу аутентичную русскую баню всего за несколько шагов
                </p>

                {/* Progress Bar */}
                {currentStep < 4 && (
                  <div className="mt-6">
                    <ProgressBar currentStep={currentStep} totalSteps={3} />
                  </div>
                )}
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                    >
                      <SaunaSelection onSelect={handleSaunaSelect} shouldHighlightFirst={shouldHighlightFirst} />
                    </motion.div>
                  )}

                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <DateSelection
                        sauna={bookingData.sauna!}
                        onSelect={handleDateSelect}
                        onBack={handleBack}
                      />
                    </motion.div>
                  )}

                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TimeSelection
                        bookingData={bookingData}
                        onSelect={handleTimeSelect}
                        onBack={handleBack}
                        onOpenLegalDoc={onOpenLegalDoc}
                        onOpenCancellationPolicy={onOpenCancellationPolicy}
                      />
                    </motion.div>
                  )}

                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <ConfirmationScreen
                        bookingData={bookingData}
                        onBookAnother={handleReset}
                        onClose={handleClose}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
