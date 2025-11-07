'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Send, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { ConsentCheckboxes } from '../ui/ConsentCheckboxes';

export function ApplicationForm() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    experience: '',
    cv: null as File | null,
    certifications: null as File | null,
    coverLetter: '',
    availability: '',
    languages: [] as string[],
  });

  // Form consent
  const [individualTermsAccepted, setIndividualTermsAccepted] = useState(false);
  const [individualDataConsentAccepted, setIndividualDataConsentAccepted] = useState(false);
  const [individualMarketingAccepted, setIndividualMarketingAccepted] = useState(false);

  const handleLanguageToggle = (lang: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter(l => l !== lang)
        : [...prev.languages, lang]
    }));
  };

  const handleIndividualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.phone || !formData.role) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }

    if (!individualTermsAccepted || !individualDataConsentAccepted) {
      toast.error('Пожалуйста, примите обязательные согласия');
      return;
    }

    setShowConfirmation(true);
  };

  return (
    <section id="apply" className="py-16 sm:py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-[#FAF7F2] to-white scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <h2 
              className="text-[#3D3226] mb-4"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontFamily: 'Georgia, serif',
              }}
            >
              Подать заявку
            </h2>
            <p className="text-[#7A5C47] text-lg">
              Присоединяйтесь к нашей команде и станьте частью чего-то особенного
            </p>
          </div>

          {/* Application Form */}
          <Card className="rounded-2xl border-[#E8DFD5] overflow-hidden p-6 sm:p-8">
                <form onSubmit={handleIndividualSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-[#3D3226]">
                      Полное имя <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="rounded-xl border-[#E8DFD5] focus:border-[#C69563]"
                      placeholder="Введите ваше полное имя"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#3D3226]">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="rounded-xl border-[#E8DFD5] focus:border-[#C69563]"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-[#3D3226]">
                        Телефон <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="rounded-xl border-[#E8DFD5] focus:border-[#C69563]"
                        placeholder="+7 XXX XXX-XX-XX"
                      />
                    </div>
                  </div>

                  {/* Role & Experience */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-[#3D3226]">
                        Вакансия <span className="text-red-500">*</span>
                      </Label>
                      <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                        <SelectTrigger className="rounded-xl border-[#E8DFD5]">
                          <SelectValue placeholder="Выберите вакансию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cleaning">Уборщик и техобслуживание</SelectItem>
                          <SelectItem value="sauna">Банщик</SelectItem>
                          <SelectItem value="massage">Массажист</SelectItem>
                          <SelectItem value="reception">Администратор</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience" className="text-[#3D3226]">
                        Опыт работы (лет)
                      </Label>
                      <Input
                        id="experience"
                        type="number"
                        min="0"
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        className="rounded-xl border-[#E8DFD5] focus:border-[#C69563]"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* CV Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="cv" className="text-[#3D3226]">
                      Загрузить резюме (PDF/DOC) <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="cv"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setFormData({ ...formData, cv: e.target.files?.[0] || null })}
                        className="rounded-xl border-[#E8DFD5] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#D4A574]/10 file:text-[#7A5C47] hover:file:bg-[#D4A574]/20"
                      />
                    </div>
                  </div>

                  {/* Certifications Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="certifications" className="text-[#3D3226]">
                      Сертификаты (необязательно)
                    </Label>
                    <Input
                      id="certifications"
                      type="file"
                      accept=".pdf,.doc,.docx,.jpg,.png"
                      onChange={(e) => setFormData({ ...formData, certifications: e.target.files?.[0] || null })}
                      className="rounded-xl border-[#E8DFD5] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#D4A574]/10 file:text-[#7A5C47] hover:file:bg-[#D4A574]/20"
                    />
                  </div>

                  {/* Availability */}
                  <div className="space-y-2">
                    <Label htmlFor="availability" className="text-[#3D3226]">
                      Доступность по сменам
                    </Label>
                    <Select value={formData.availability} onValueChange={(value) => setFormData({ ...formData, availability: value })}>
                      <SelectTrigger className="rounded-xl border-[#E8DFD5]">
                        <SelectValue placeholder="Выберите предпочитаемые смены" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Утро (7:00-15:00)</SelectItem>
                        <SelectItem value="evening">Вечер (15:00-23:00)</SelectItem>
                        <SelectItem value="flexible">Гибкий график/Любые смены</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Languages */}
                  <div className="space-y-3">
                    <Label className="text-[#3D3226]">Языки</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {['Русский', 'Английский', 'Другой'].map((lang) => (
                        <div key={lang} className="flex items-center gap-2">
                          <div className="flex-shrink-0">
                            <Checkbox
                              id={`lang-${lang}`}
                              checked={formData.languages.includes(lang)}
                              onCheckedChange={() => handleLanguageToggle(lang)}
                              className="!rounded-full"
                            />
                          </div>
                          <label htmlFor={`lang-${lang}`} className="text-sm text-[#7A5C47] cursor-pointer flex-1">
                            {lang}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div className="space-y-2">
                    <Label htmlFor="coverLetter" className="text-[#3D3226]">
                      Сопроводительное письмо / Сообщение (необязательно)
                    </Label>
                    <Textarea
                      id="coverLetter"
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      className="rounded-xl border-[#E8DFD5] focus:border-[#C69563] min-h-[120px]"
                      placeholder="Расскажите нам, почему вы подходите для этой роли..."
                    />
                  </div>

                  {/* Consent Checkboxes */}
                  <div className="bg-gradient-to-br from-[#FFF9F1] to-white rounded-2xl p-6 border border-[#E8DFD5]">
                    <h3 className="text-[#3D3226] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                      Конфиденциальность и согласие
                    </h3>
                    <ConsentCheckboxes
                      termsAccepted={individualTermsAccepted}
                      dataConsentAccepted={individualDataConsentAccepted}
                      marketingAccepted={individualMarketingAccepted}
                      onTermsChange={setIndividualTermsAccepted}
                      onDataConsentChange={setIndividualDataConsentAccepted}
                      onMarketingChange={setIndividualMarketingAccepted}
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={!individualTermsAccepted || !individualDataConsentAccepted}
                    className="w-full bg-gradient-to-r from-[#D4A574] to-[#C69563] hover:from-[#C69563] hover:to-[#B8865A] text-white rounded-full py-6 gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    Отправить заявку
                  </Button>

                  <p className="text-xs text-center text-[#7A5C47]/60">
                    Мы ответим в течение 5 рабочих дней
                  </p>
                </form>
          </Card>
        </motion.div>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-md rounded-2xl">
          <DialogHeader className="space-y-4 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <DialogTitle className="text-2xl text-[#3D3226]">
              Заявка получена!
            </DialogTitle>
            <DialogDescription className="text-base text-[#7A5C47] leading-relaxed">
              Спасибо за ваш интерес к присоединению к Баня Хейвен. Наша команда по найму рассмотрит вашу заявку и свяжется с вами в течение 5 рабочих дней.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="p-4 bg-[#F5EFE6] rounded-xl">
              <p className="text-sm text-[#7A5C47] text-center">
                Вопросы? Свяжитесь с нашим рекрутером по адресу{' '}
                <a href="mailto:hiring@banyahaven.com" className="text-[#C69563] hover:underline">
                  hiring@banyahaven.com
                </a>
              </p>
            </div>
            <Button
              onClick={() => setShowConfirmation(false)}
              className="w-full bg-gradient-to-r from-[#D4A574] to-[#C69563] hover:from-[#C69563] hover:to-[#B8865A] text-white rounded-full"
            >
              Закрыть
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
