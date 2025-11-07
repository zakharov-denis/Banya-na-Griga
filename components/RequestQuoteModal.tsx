'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Users, Calendar, Mail, Phone, User, MessageSquare, CheckCircle2, Building2, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { ConsentCheckboxes } from './ui/ConsentCheckboxes';

interface RequestQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageType?: string;
}

export function RequestQuoteModal({ isOpen, onClose, packageType = '' }: RequestQuoteModalProps) {
  const [currentStep, setCurrentStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    eventType: packageType,
    eventDate: '',
    guestCount: '',
    preferredTime: '',
    message: '',
  });

  const [termsAccepted, setTermsAccepted] = useState(false);
  const [dataConsentAccepted, setDataConsentAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);

  const eventTypes = [
    'Корпоративный отдых',
    'День рождения',
    'Мальчишник',
    'Приватный день здоровья',
    'Тимбилдинг',
    'Юбилей',
    'Индивидуальный пакет',
  ];

  const guestCountOptions = [
    '1-5 гостей',
    '6-10 гостей',
    '11-15 гостей',
    '16-20 гостей',
    '21-25 гостей',
    '25+ гостей',
  ];

  const timeSlots = [
    'Утро (8:00 - 12:00)',
    'День (12:00 - 16:00)',
    'Вечер (16:00 - 20:00)',
    'Поздний вечер (20:00 - 00:00)',
    'Гибкое время',
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const isFormValid = () => {
    return (
      formData.fullName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.eventType.trim() !== '' &&
      formData.eventDate.trim() !== '' &&
      formData.guestCount.trim() !== '' &&
      termsAccepted &&
      dataConsentAccepted
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      // Here you would typically send the data to your backend
      console.log('Quote Request:', formData);
      setCurrentStep('success');
    }
  };

  const handleClose = () => {
    setCurrentStep('form');
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      companyName: '',
      eventType: packageType,
      eventDate: '',
      guestCount: '',
      preferredTime: '',
      message: '',
    });
    setTermsAccepted(false);
    setDataConsentAccepted(false);
    setMarketingAccepted(false);
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] overflow-y-auto">
            <div className="min-h-full flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden"
              >
                {currentStep === 'form' ? (
                  <>
                    {/* Header */}
                    <div className="sticky top-0 bg-gradient-to-r from-[#3D3226] to-[#4D4236] text-white px-6 sm:px-8 py-6 z-10">
                      <button
                        onClick={handleClose}
                        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      
                      <div className="pr-12">
                        <h2 className="text-2xl sm:text-3xl mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                          Запросить расчёт
                        </h2>
                        <p className="text-white/80">
                          Расскажите нам о вашем мероприятии, и мы создадим индивидуальный пакет для вас
                        </p>
                      </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-120px)]">
                      <div className="space-y-6">
                        {/* Personal Information */}
                        <div>
                          <h3 className="text-lg text-[#3D3226] mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-[#D4A574]" />
                            Личная информация
                          </h3>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Full Name */}
                            <div>
                              <label htmlFor="fullName" className="block text-sm text-[#7A5C47] mb-2">
                                Полное имя <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                id="fullName"
                                value={formData.fullName}
                                onChange={(e) => handleInputChange('fullName', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-[#E8DFD5] focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 outline-none transition-all"
                                placeholder="Иван Петров"
                                required
                              />
                            </div>

                            {/* Email */}
                            <div>
                              <label htmlFor="email" className="block text-sm text-[#7A5C47] mb-2">
                                Email <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={(e) => handleInputChange('email', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-[#E8DFD5] focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 outline-none transition-all"
                                placeholder="ivan@example.com"
                                required
                              />
                            </div>

                            {/* Phone */}
                            <div>
                              <label htmlFor="phone" className="block text-sm text-[#7A5C47] mb-2">
                                Номер телефона <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="tel"
                                id="phone"
                                value={formData.phone}
                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-[#E8DFD5] focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 outline-none transition-all"
                                placeholder="+7 (401) 234-56-78"
                                required
                              />
                            </div>

                            {/* Company Name (Optional) */}
                            <div>
                              <label htmlFor="companyName" className="block text-sm text-[#7A5C47] mb-2">
                                Название компании <span className="text-[#7A5C47]/50">(Необязательно)</span>
                              </label>
                              <input
                                type="text"
                                id="companyName"
                                value={formData.companyName}
                                onChange={(e) => handleInputChange('companyName', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-[#E8DFD5] focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 outline-none transition-all"
                                placeholder="ООО Ваша Компания"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Event Details */}
                        <div>
                          <h3 className="text-lg text-[#3D3226] mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-[#D4A574]" />
                            Детали мероприятия
                          </h3>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Event Type */}
                            <div>
                              <label htmlFor="eventType" className="block text-sm text-[#7A5C47] mb-2">
                                Тип мероприятия <span className="text-red-500">*</span>
                              </label>
                              <select
                                id="eventType"
                                value={formData.eventType}
                                onChange={(e) => handleInputChange('eventType', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-[#E8DFD5] focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 outline-none transition-all bg-white"
                                required
                              >
                                <option value="">Выберите тип мероприятия</option>
                                {eventTypes.map((type) => (
                                  <option key={type} value={type}>
                                    {type}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Guest Count */}
                            <div>
                              <label htmlFor="guestCount" className="block text-sm text-[#7A5C47] mb-2">
                                Количество гостей <span className="text-red-500">*</span>
                              </label>
                              <select
                                id="guestCount"
                                value={formData.guestCount}
                                onChange={(e) => handleInputChange('guestCount', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-[#E8DFD5] focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 outline-none transition-all bg-white"
                                required
                              >
                                <option value="">Выберите количество гостей</option>
                                {guestCountOptions.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Event Date */}
                            <div>
                              <label htmlFor="eventDate" className="block text-sm text-[#7A5C47] mb-2">
                                Предпочтительная дата <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="date"
                                id="eventDate"
                                value={formData.eventDate}
                                onChange={(e) => handleInputChange('eventDate', e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-3 rounded-xl border border-[#E8DFD5] focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 outline-none transition-all"
                                required
                              />
                            </div>

                            {/* Preferred Time */}
                            <div>
                              <label htmlFor="preferredTime" className="block text-sm text-[#7A5C47] mb-2">
                                Предпочтительное время <span className="text-[#7A5C47]/50">(Необязательно)</span>
                              </label>
                              <select
                                id="preferredTime"
                                value={formData.preferredTime}
                                onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-[#E8DFD5] focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 outline-none transition-all bg-white"
                              >
                                <option value="">Выберите временной слот</option>
                                {timeSlots.map((slot) => (
                                  <option key={slot} value={slot}>
                                    {slot}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Additional Information */}
                        <div>
                          <h3 className="text-lg text-[#3D3226] mb-4 flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-[#D4A574]" />
                            Дополнительная информация
                          </h3>
                          
                          <div>
                            <label htmlFor="message" className="block text-sm text-[#7A5C47] mb-2">
                              Расскажите больше о вашем мероприятии <span className="text-[#7A5C47]/50">(Необязательно)</span>
                            </label>
                            <textarea
                              id="message"
                              value={formData.message}
                              onChange={(e) => handleInputChange('message', e.target.value)}
                              rows={4}
                              className="w-full px-4 py-3 rounded-xl border border-[#E8DFD5] focus:border-[#D4A574] focus:ring-2 focus:ring-[#D4A574]/20 outline-none transition-all resize-none"
                              placeholder="Специальные пожелания, диетические требования, интересующие дополнения или другие детали..."
                            />
                          </div>
                        </div>

                        {/* Consent Checkboxes */}
                        <div className="pt-4 border-t border-[#E8DFD5]">
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
                        <div className="pt-4">
                          <Button
                            type="submit"
                            disabled={!isFormValid()}
                            className="w-full bg-gradient-to-r from-[#D4A574] to-[#C69563] hover:from-[#C69563] hover:to-[#B8865A] text-white py-6 rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg"
                          >
                            Отправить запрос на расчёт
                          </Button>
                        </div>
                      </div>
                    </form>
                  </>
                ) : (
                  // Success Screen
                  <div className="p-8 sm:p-12 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', duration: 0.6 }}
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mx-auto mb-6"
                    >
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h2 className="text-2xl sm:text-3xl text-[#3D3226] mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                        Запрос получен!
                      </h2>
                      <p className="text-[#7A5C47] text-lg mb-6">
                        Благодарим вас за интерес к нашим пакетам мероприятий.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="bg-gradient-to-r from-[#FAF7F2] to-[#F5EFE6] rounded-2xl p-6 mb-8 text-left"
                    >
                      <h3 className="text-lg text-[#3D3226] mb-4">Что будет дальше?</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#D4A574] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-xs">1</span>
                          </div>
                          <p className="text-[#7A5C47]">
                            Наша команда по мероприятиям рассмотрит ваши требования
                          </p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#D4A574] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-xs">2</span>
                          </div>
                          <p className="text-[#7A5C47]">
                            Мы свяжемся с вами в течение 24 часов с индивидуальным предложением
                          </p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-[#D4A574] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-xs">3</span>
                          </div>
                          <p className="text-[#7A5C47]">
                            Вместе мы создадим идеальный опыт для вашего мероприятия
                          </p>
                        </li>
                      </ul>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="space-y-3"
                    >
                      <p className="text-sm text-[#7A5C47]">
                        Есть вопросы? Звоните нам <strong>+7 (4012) 34-56-78</strong>
                      </p>
                      <Button
                        onClick={handleClose}
                        className="bg-gradient-to-r from-[#D4A574] to-[#C69563] hover:from-[#C69563] hover:to-[#B8865A] text-white px-8 py-6 rounded-xl"
                      >
                        Закрыть
                      </Button>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
