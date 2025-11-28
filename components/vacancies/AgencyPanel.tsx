'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Download, Upload, Mail, FileText, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export function AgencyPanel() {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      const validTypes = ['.pdf', '.doc', '.docx', '.csv', '.zip'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (validTypes.includes(fileExtension)) {
        setUploadedFile(file);
        toast.success(`Файл "${file.name}" успешно загружен`);
      } else {
        toast.error('Неверный тип файла. Пожалуйста, загрузите файлы PDF, DOC, DOCX, CSV или ZIP.');
      }
    }
  };

  const handleSubmit = () => {
    if (!agreedToTerms) {
      toast.error('Пожалуйста, примите условия конфиденциальности');
      return;
    }
    
    if (!uploadedFile) {
      toast.error('Пожалуйста, загрузите файлы кандидатов');
      return;
    }

    // In a real app, this would submit to a backend
    toast.success('Заявка получена! Мы рассмотрим её и ответим в течение 2 рабочих дней.');
    setUploadedFile(null);
    setAgreedToTerms(false);
  };

  return (
    <section 
      id="agency-panel" 
      className="py-16 sm:py-20 px-6 sm:px-8 lg:px-12 bg-white scroll-mt-20"
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card 
            className="p-8 sm:p-10 rounded-2xl border-2 border-[#D4A574]/30 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #F5EFE6 0%, #E8DFD5 100%)',
            }}
          >
            {/* Accent Corner */}
            <div 
              className="absolute top-0 right-0 w-32 h-32 opacity-10"
              style={{
                background: 'radial-gradient(circle at top right, #C69563 0%, transparent 70%)',
              }}
            />

            <div className="relative z-10 space-y-8">
              {/* Header */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-[#D4A574]/20 px-4 py-2 rounded-full mb-4">
                  <FileText className="w-4 h-4 text-[#C69563]" />
                  <span className="text-sm text-[#7A5C47]">Для кадровых агентств</span>
                </div>
                <h2 
                  className="text-[#3D3226] mb-3"
                  style={{
                    fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)',
                    fontFamily: 'Georgia, serif',
                  }}
                >
                  Отправка кандидатов
                </h2>
                <p className="text-[#7A5C47] max-w-2xl mx-auto">
                  Мы приветствуем партнёрство с агентствами. Отправляйте квалифицированных кандидатов через наш упрощённый процесс.
                </p>
              </div>

              {/* Instructions */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#E8DFD5]">
                <h3 className="text-[#3D3226] text-lg mb-4">
                  Требования к заявке
                </h3>
                <ul className="space-y-3">
                  {[
                    'ФИО кандидата, телефон, email',
                    'Вакансия',
                    'Опыт работы (лет)',
                    'Соответствующие сертификаты',
                    'Ссылка на резюме или прикреплённый PDF/DOC',
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-[#7A5C47]">
                      <CheckCircle2 className="w-5 h-5 text-[#C69563] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Download Template */}
              <div className="flex flex-col sm:flex-row gap-4">

                <Button
                  variant="outline"
                  className="flex-1 border-[#D4A574] text-[#7A5C47] hover:bg-white rounded-full py-6 gap-2"
                  onClick={() => {
                    window.location.href = 'mailto:griga58@yandex.ru?subject=Заявка от агентства';
                  }}
                >
                  <Mail className="w-4 h-4" />
                  Email: griga58@yandex.ru
                </Button>
              </div>

              {/* Upload Section */}
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-dashed border-[#D4A574]/40">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-[#D4A574]/10 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-[#C69563]" />
                  </div>
                  
                  <div>
                    <h3 className="text-[#3D3226] mb-2">
                      Загрузить файлы кандидатов
                    </h3>
                    <p className="text-sm text-[#7A5C47]/70 mb-4">
                      CSV, ZIP, PDF или DOC файлы (макс. 10МБ)
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.csv,.zip"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#D4A574] to-[#C69563] hover:from-[#C69563] hover:to-[#B8865A] text-white rounded-full px-6 py-3 transition-all duration-300 hover:scale-105">
                        <Upload className="w-4 h-4" />
                        <span>Выбрать файлы</span>
                      </div>
                    </label>

                    {uploadedFile && (
                      <div className="flex items-center justify-center gap-2 text-sm text-[#7A5C47]">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span>{uploadedFile.name}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-[#7A5C47]/60 pt-4">
                    Или отправьте вложения на{' '}
                    <a 
                      href="mailto:griga58@yandex.ru?subject=Заявка%20от%20агентства%20%E2%80%94%20[Название%20агентства]"
                      className="text-[#C69563] hover:underline"
                    >
                      griga58@yandex.ru
                    </a>
                    <br />
                    Тема: «Заявка от агентства — [Название вашего агентства]»
                  </p>
                </div>
              </div>

              {/* Privacy Agreement */}
              <div className="flex items-start gap-3 p-4 bg-white/50 rounded-xl">
                <div className="flex-shrink-0 mt-1">
                  <Checkbox
                    id="privacy-terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                    className="!rounded-full md:!rounded-[4px]"
                  />
                </div>
                <label 
                  htmlFor="privacy-terms" 
                  className="text-sm text-[#7A5C47] leading-relaxed cursor-pointer flex-1"
                >
                  Я согласен с условиями передачи данных кандидатов и конфиденциальности.{' '}
                  <a href="#" className="text-[#C69563] hover:underline">
                    Читать политику конфиденциальности
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                onClick={handleSubmit}
                disabled={!agreedToTerms || !uploadedFile}
                className="w-full bg-gradient-to-r from-[#D4A574] to-[#C69563] hover:from-[#C69563] hover:to-[#B8865A] text-white rounded-full py-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Отправить список кандидатов
              </Button>

              <p className="text-xs text-center text-[#7A5C47]/60">
                Мы рассмотрим заявки в течение 2 рабочих дней и свяжемся с вами напрямую.
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
