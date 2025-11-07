import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, Shield } from 'lucide-react';
import { Button } from './ui/button';

interface LegalDocumentsProps {
  isOpen: boolean;
  onClose: () => void;
  documentType: 'offer' | 'privacy';
}

export function LegalDocuments({ isOpen, onClose, documentType }: LegalDocumentsProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 sm:inset-8 md:inset-16 lg:inset-20 bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#3D3226] to-[#4D4236] text-white px-6 sm:px-8 py-6 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                {documentType === 'offer' ? (
                  <FileText className="w-6 h-6 text-[#D4AF37]" />
                ) : (
                  <Shield className="w-6 h-6 text-[#D4AF37]" />
                )}
                <div>
                  <h2 className="text-white">
                    {documentType === 'offer' ? 'Публичная оферта' : 'Политика конфиденциальности'}
                  </h2>
                  <p className="text-sm text-white/70">
                    {documentType === 'offer' ? 'Public Offer Agreement' : 'Privacy Policy'}
                  </p>
                </div>
              </div>
              <Button
                onClick={onClose}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10">
              {documentType === 'offer' ? <PublicOfferContent /> : <PrivacyPolicyContent />}
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-r from-[#F5E6D3]/30 to-white px-6 sm:px-8 py-4 border-t border-[#D4AF37]/20">
              <p className="text-sm text-[#3D3226]/70 text-center">
                ✅ Используя этот сайт, вы соглашаетесь с нашей{' '}
                {documentType === 'offer' ? 'Публичной офертой' : 'Политикой конфиденциальности'}.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function PublicOfferContent() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 text-[#3D3226]">
      {/* Section 1 */}
      <section className="space-y-4">
        <h3 className="text-[#3D3226] flex items-center gap-2">
          <span className="text-[#D4AF37]">📜</span> 1. Предмет договора
        </h3>
        <p className="leading-relaxed">
          Настоящий документ является публичной офертой на оказание услуг сауны и оздоровления (далее — «Услуги»).
          Совершая бронирование или используя услуги, клиент (далее — «Заказчик») принимает оферту в полном объёме.
        </p>
        <p className="text-[#3D3226]/70 italic">
          <strong>1. Subject of the Agreement:</strong> This document is a public offer for the provision of sauna and wellness services (hereinafter referred to as the "Services").
          By booking or using our services, the client (hereinafter "Customer") accepts this offer in full.
        </p>
      </section>

      {/* Section 2 */}
      <section className="space-y-4">
        <h3 className="text-[#3D3226] flex items-center gap-2">
          <span className="text-[#D4AF37]">📜</span> 2. Описание услуг
        </h3>
        <p className="leading-relaxed">
          Мы предоставляем доступ к саунам, парным и сопутствующим услугам для индивидуального и группового использования.
          Все сеансы проводятся по предварительному бронированию и при наличии свободных мест.
        </p>
        <p className="text-[#3D3226]/70 italic">
          <strong>2. Services Description:</strong> We provide access to sauna facilities, steam rooms, and related amenities for individual and group use.
          All sessions are subject to prior booking and availability.
        </p>
      </section>

      {/* Section 3 */}
      <section className="space-y-4">
        <h3 className="text-[#3D3226] flex items-center gap-2">
          <span className="text-[#D4AF37]">📜</span> 3. Бронирование и оплата
        </h3>
        <p className="leading-relaxed">
          Бронирование осуществляется онлайн или лично.
          Для подтверждения бронирования может потребоваться полная или частичная предоплата.
          Оплата производится банковской картой, переводом или иными доступными способами.
        </p>
        <p className="text-[#3D3226]/70 italic">
          <strong>3. Booking and Payment:</strong> Bookings can be made online or in person. Full or partial prepayment may be required to confirm the booking.
          Payments can be made via credit/debit cards, bank transfer, or other available methods.
        </p>
      </section>

      {/* Section 4 */}
      <section className="space-y-4">
        <h3 className="text-[#3D3226] flex items-center gap-2">
          <span className="text-[#D4AF37]">📜</span> 4. Права и обязанности сторон
        </h3>
        <p className="leading-relaxed">
          Заказчик обязан соблюдать правила безопасности, гигиены и поведения в сауне.
          Компания имеет право отказать в обслуживании лицам, находящимся в состоянии алкогольного опьянения или нарушающим правила.
        </p>
        <p className="text-[#3D3226]/70 italic">
          <strong>4. Rights and Obligations:</strong> Customers must follow safety, hygiene, and conduct rules while using the sauna.
          The facility has the right to deny service to individuals under the influence of alcohol or violating regulations.
        </p>
      </section>

      {/* Section 5 */}
      <section className="space-y-4">
        <h3 className="text-[#3D3226] flex items-center gap-2">
          <span className="text-[#D4AF37]">📜</span> 5. Отмена и возврат средств
        </h3>
        <ul className="space-y-2 ml-6 list-disc leading-relaxed">
          <li>Более чем за 48 часов до бронирования: полный возврат (за вычетом 5% комиссии).</li>
          <li>За 24–48 часов до бронирования: перенос или получение ваучера.</li>
          <li>Менее чем за 24 часа: возврат не производится.</li>
        </ul>
        <p className="text-[#3D3226]/70 italic">
          <strong>5. Cancellation and Refunds:</strong> More than 48 hours before booking: Full refund (minus 5% fee).
          24–48 hours before booking: Reschedule or receive a voucher. Less than 24 hours: Non-refundable.
        </p>
      </section>

      {/* Section 6 */}
      <section className="space-y-4">
        <h3 className="text-[#3D3226] flex items-center gap-2">
          <span className="text-[#D4AF37]">📜</span> 6. Ответственность сторон
        </h3>
        <p className="leading-relaxed">
          Компания не несёт ответственности за травмы или ухудшение здоровья, вызванные неправильным использованием сауны или нарушением правил.
          Посещение осуществляется на собственный риск клиента.
        </p>
        <p className="text-[#3D3226]/70 italic">
          <strong>6. Liability:</strong> The facility is not responsible for injuries or medical issues arising from improper sauna use or rule violations.
          Customers participate at their own risk.
        </p>
      </section>

      {/* Section 7 */}
      <section className="space-y-4">
        <h3 className="text-[#3D3226] flex items-center gap-2">
          <span className="text-[#D4AF37]">📜</span> 7. Заключительные положения
        </h3>
        <p className="leading-relaxed">
          Оферта действует бессрочно и может быть изменена в любое время.
          Актуальная версия всегда доступна на сайте.
        </p>
        <p className="text-[#3D3226]/70 italic">
          <strong>7. Final Provisions:</strong> This offer is valid indefinitely and may be updated at any time.
          The current version is always available on the website.
        </p>
      </section>

      {/* Legal Info */}
      <section className="mt-8 p-6 bg-[#F5E6D3]/30 rounded-2xl border border-[#D4AF37]/20">
        <p className="text-sm space-y-1">
          <strong>Юридическое лицо:</strong> ООО "Баня в Калининграде"<br />
          <strong>ИНН:</strong> [Номер] <strong>ОГРН:</strong> [Номер]<br />
          <strong>Контакт:</strong> <a href="mailto:griga58@yandex.ru" className="text-[#D4AF37] hover:underline">griga58@yandex.ru</a>
        </p>
      </section>
    </div>
  );
}

function PrivacyPolicyContent() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 text-[#3D3226]">
      {/* Section 1 */}
      <section className="space-y-4">
        <h3 className="text-[#3D3226] flex items-center gap-2">
          <span className="text-[#D4AF37]">🔒</span> 1. Какие данные мы собираем
        </h3>
        <p className="leading-relaxed">
          Мы собираем персональные данные, предоставленные пользователями при бронировании или обращении:
        </p>
        <ul className="space-y-2 ml-6 list-disc leading-relaxed">
          <li>Имя, телефон, электронная почта</li>
          <li>Детали бронирования (дата, тип банной услуги, предпочтения)</li>
          <li>Платёжная информация (обрабатывается защищёнными платёжными сервисами)</li>
        </ul>
        <p className="text-[#3D3226]/70 italic">
          <strong>1. What Data We Collect:</strong> We collect personal data provided by users during booking or contact:
          Name, phone, email. Booking details (date, banya service type, preferences). Payment information (processed securely by providers).
        </p>
      </section>

      {/* Section 2 */}
      <section className="space-y-4">
        <h3 className="text-[#3D3226] flex items-center gap-2">
          <span className="text-[#D4AF37]">🔒</span> 2. Цели использования данных
        </h3>
        <ul className="space-y-2 ml-6 list-disc leading-relaxed">
          <li>Обработка бронирований и платежей</li>
          <li>Отправка подтверждений и напоминаний</li>
          <li>Улучшение качества обслуживания и поддержки клиентов</li>
        </ul>
        <p className="text-[#3D3226]/70 italic">
          <strong>2. Purpose of Data Use:</strong> To process bookings and payments. To send confirmations and reminders.
          To improve services and customer support.
        </p>
      </section>

      {/* Section 3 */}
      <section className="space-y-4">
        <h3 className="text-[#3D3226] flex items-center gap-2">
          <span className="text-[#D4AF37]">🔒</span> 3. Файлы cookie и отслеживание
        </h3>
        <p className="leading-relaxed">
          Мы используем файлы cookie для улучшения вашего опыта работы с сайтом и анализа трафика.
          Вы можете отключить cookies в настройках своего браузера в любое время.
        </p>
        <p className="text-[#3D3226]/70 italic">
          <strong>3. Cookies & Tracking:</strong> We use cookies to enhance your browsing experience and analyze website traffic.
          You can disable cookies in your browser settings at any time.
        </p>
      </section>

      {/* Section 4 */}
      <section className="space-y-4">
        <h3 className="text-[#3D3226] flex items-center gap-2">
          <span className="text-[#D4AF37]">🔒</span> 4. Хранение и безопасность данных
        </h3>
        <p className="leading-relaxed">
          Все данные хранятся безопасно и удаляются, когда больше не требуются.
          Мы соблюдаем принципы защиты данных, аналогичные GDPR.
        </p>
        <p className="text-[#3D3226]/70 italic">
          <strong>4. Data Retention & Security:</strong> All data is stored securely and deleted when no longer needed.
          We follow GDPR-like principles for protection.
        </p>
      </section>

      {/* Section 5 */}
      <section className="space-y-4">
        <h3 className="text-[#3D3226] flex items-center gap-2">
          <span className="text-[#D4AF37]">🔒</span> 5. Передача третьим лицам
        </h3>
        <p className="leading-relaxed">
          Мы не продаём и не сдаём в аренду персональные данные.
          Данные могут передаваться только надёжным платёжным системам и партнёрам по бронированию.
        </p>
        <p className="text-[#3D3226]/70 italic">
          <strong>5. Third-Party Sharing:</strong> We do not sell or rent personal data.
          Data may be shared only with payment processors and booking providers.
        </p>
      </section>

      {/* Section 6 */}
      <section className="space-y-4">
        <h3 className="text-[#3D3226] flex items-center gap-2">
          <span className="text-[#D4AF37]">🔒</span> 6. Ваши права
        </h3>
        <p className="leading-relaxed">
          Вы можете запросить исправление, удаление или копию ваших сохранённых данных в любое время, отправив письмо на электронную почту.
        </p>
        <p className="text-[#3D3226]/70 italic">
          <strong>6. Your Rights:</strong> You may request data correction, deletion, or a copy of your stored data anytime via email.
        </p>
      </section>

      {/* Section 7 */}
      <section className="space-y-4">
        <h3 className="text-[#3D3226] flex items-center gap-2">
          <span className="text-[#D4AF37]">🔒</span> 7. Контакты
        </h3>
        <p className="leading-relaxed">
          Если у вас есть вопросы о конфиденциальности, пожалуйста, свяжитесь с нами:<br />
          📧 <a href="mailto:griga58@yandex.ru" className="text-[#D4AF37] hover:underline">griga58@yandex.ru</a>
        </p>
        <p className="text-[#3D3226]/70 italic">
          <strong>7. Contact:</strong> If you have privacy concerns, please contact: 📧 griga58@yandex.ru
        </p>
      </section>

      {/* Last Updated */}
      <section className="mt-8 p-6 bg-[#F5E6D3]/30 rounded-2xl border border-[#D4AF37]/20">
        <p className="text-sm">
          <strong>Последнее обновление:</strong> 1 ноября 2025 г.
        </p>
      </section>
    </div>
  );
}
