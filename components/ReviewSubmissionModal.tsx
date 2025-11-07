'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { ConsentCheckboxes } from './ui/ConsentCheckboxes';

interface ReviewSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ReviewSubmissionModal({ isOpen, onClose }: ReviewSubmissionModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [review, setReview] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [dataConsentAccepted, setDataConsentAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      // Handle review submission
      console.log('Review submitted:', {
        rating,
        name,
        email,
        review,
        termsAccepted,
        dataConsentAccepted,
        marketingAccepted,
      });
      setIsSubmitted(true);
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  };

  const handleClose = () => {
    setRating(0);
    setName('');
    setEmail('');
    setReview('');
    setTermsAccepted(false);
    setDataConsentAccepted(false);
    setMarketingAccepted(false);
    setIsSubmitted(false);
    onClose();
  };

  const isFormValid =
    rating > 0 &&
    name.trim() !== '' &&
    email.trim() !== '' &&
    review.trim() !== '' &&
    termsAccepted &&
    dataConsentAccepted;

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
            className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-2xl z-50"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden h-full sm:h-auto max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-[#FAF7F2] to-[#F5EFE6] px-6 sm:px-8 py-6 border-b border-[#E8DFD5]">
                <button
                  onClick={handleClose}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                >
                  <X className="w-5 h-5 text-[#7A5C47]" />
                </button>

                <h2 className="text-2xl sm:text-3xl text-[#3D3226] pr-12" style={{ fontFamily: 'Georgia, serif' }}>
                  {isSubmitted ? 'Спасибо!' : 'Поделитесь своим опытом'}
                </h2>
                <p className="text-[#7A5C47] mt-2">
                  {isSubmitted
                    ? 'Ваш отзыв был успешно отправлен.'
                    : 'Помогите другим открыть для себя то спокойствие, которое испытали вы.'}
                </p>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4A574] to-[#CBA35A] flex items-center justify-center mb-4">
                      <Star className="w-10 h-10 text-white fill-white" />
                    </div>
                    <p className="text-lg text-[#3D3226] text-center">
                      Ваш отзыв помогает нам создавать лучший опыт!
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Star Rating */}
                    <div>
                      <Label className="text-[#3D3226] mb-3 block">
                        Оценка <span className="text-red-500">*</span>
                      </Label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-10 h-10 transition-colors ${
                                star <= (hoveredRating || rating)
                                  ? 'fill-[#CBA35A] text-[#CBA35A]'
                                  : 'fill-[#E8DFD5] text-[#E8DFD5]'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Name */}
                    <div>
                      <Label htmlFor="review-name" className="text-[#3D3226]">
                        Ваше имя <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="review-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Иван Петров"
                        className="mt-2 rounded-xl border-[#E8DFD5] focus:border-[#CBA35A] focus:ring-[#CBA35A]"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="review-email" className="text-[#3D3226]">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="review-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ivan@example.com"
                        className="mt-2 rounded-xl border-[#E8DFD5] focus:border-[#CBA35A] focus:ring-[#CBA35A]"
                        required
                      />
                    </div>

                    {/* Review Text */}
                    <div>
                      <Label htmlFor="review-text" className="text-[#3D3226]">
                        Ваш отзыв <span className="text-red-500">*</span>
                      </Label>
                      <Textarea
                        id="review-text"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Поделитесь своим опытом с нами..."
                        rows={4}
                        className="mt-2 rounded-xl border-[#E8DFD5] focus:border-[#CBA35A] focus:ring-[#CBA35A] resize-none"
                        required
                      />
                    </div>

                    {/* Consent Checkboxes */}
                    <div className="bg-gradient-to-br from-[#FFF9F1] to-white rounded-2xl p-6 border border-[#E8DFD5]">
                      <h3 className="text-[#3D3226] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                        Конфиденциальность и согласие
                      </h3>
                      <ConsentCheckboxes
                        termsAccepted={termsAccepted}
                        dataConsentAccepted={dataConsentAccepted}
                        marketingAccepted={marketingAccepted}
                        onTermsChange={setTermsAccepted}
                        onDataConsentChange={setDataConsentAccepted}
                        onMarketingChange={setMarketingAccepted}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4">
                      <Button
                        type="submit"
                        disabled={!isFormValid}
                        className="
                          bg-gradient-to-r from-[#D4A574] to-[#C69563] 
                          hover:from-[#C69563] hover:to-[#B8865A] 
                          text-white rounded-full px-8 py-6
                          shadow-lg hover:shadow-xl
                          transition-all duration-300 
                          hover:scale-105
                          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                          gap-2
                        "
                      >
                        <Send className="w-4 h-4" />
                        Отправить отзыв
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
