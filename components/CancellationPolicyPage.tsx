'use client';

import { motion } from 'motion/react';
import { X, FileText, RefreshCw, Clock, AlertCircle, Shield, Users, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface CancellationPolicyPageProps {
  onClose: () => void;
}

export function CancellationPolicyPage({ onClose }: CancellationPolicyPageProps) {
  return (
    <div className="min-h-screen bg-[#fff9f2]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-10 bg-gradient-to-r from-[#3D3226] to-[#4D4236] text-white px-4 sm:px-6 lg:px-8 py-6 shadow-lg"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
              <RefreshCw className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h1 className="text-white" style={{ fontFamily: 'Georgia, serif' }}>
                Политики и правила
              </h1>
              <p className="text-sm text-white/70">Policies & Rules</p>
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
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
      >
        {/* Tabs */}
        <Tabs defaultValue="cancellation" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/80 backdrop-blur-sm p-1 rounded-2xl shadow-lg">
            <TabsTrigger 
              value="cancellation" 
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D4A574] data-[state=active]:to-[#C69563] data-[state=active]:text-white transition-all duration-300"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Отмена и возврат
            </TabsTrigger>
            <TabsTrigger 
              value="rules" 
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D4A574] data-[state=active]:to-[#C69563] data-[state=active]:text-white transition-all duration-300"
            >
              <Shield className="w-4 h-4 mr-2" />
              Правила посещения
            </TabsTrigger>
          </TabsList>

          {/* Cancellation & Refund Policy Tab */}
          <TabsContent value="cancellation" className="mt-0">
        {/* Introduction */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#F5E6D3]/30 flex items-center justify-center flex-shrink-0">
              <FileText className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h2 className="text-2xl text-[#3D3226] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                Общие положения
              </h2>
              <p className="text-[#7A5C47] leading-relaxed">
                Данная политика определяет условия отмены бронирования и возврата денежных средств 
                для услуг «Баня в Калининграде». Мы стремимся обеспечить справедливые и прозрачные 
                условия для наших гостей.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#FFF9F1] to-[#F5E6D3]/30 rounded-xl p-5 border border-[#D4AF37]/20">
            <p className="text-sm text-[#3D3226]/80 leading-relaxed">
              <strong className="text-[#3D3226]">Важно:</strong> Условия возврата зависят от времени, 
              оставшегося до начала забронированного сеанса. Пожалуйста, внимательно ознакомьтесь с 
              условиями ниже.
            </p>
          </div>
        </div>

        {/* Cancellation Terms */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4A9B7F]/20 to-[#3D8B6F]/10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-6 h-6 text-[#4A9B7F]" />
            </div>
            <div>
              <h2 className="text-2xl text-[#3D3226] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                Условия отмены бронирования
              </h2>
              <p className="text-[#7A5C47] leading-relaxed mb-4">
                Размер возврата зависит от времени уведомления об отмене.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* 100% Refund */}
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#E8F5F1] to-white rounded-xl border-l-4 border-[#4A9B7F]">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#4A9B7F] flex items-center justify-center">
                <span className="text-white">100%</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-[#3D3226] mb-2">
                  Полный возврат средств
                </h3>
                <p className="text-sm text-[#7A5C47] leading-relaxed">
                  <strong>Более чем за 48 часов до начала сеанса</strong>
                  <br />
                  При отмене бронирования более чем за 48 часов до начала сеанса, вам будет 
                  возвращено 100% стоимости бронирования.
                </p>
              </div>
            </div>

            {/* 50% Refund */}
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#FFF4E6] to-white rounded-xl border-l-4 border-[#D4A574]">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#D4A574] flex items-center justify-center">
                <span className="text-white">50%</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-[#3D3226] mb-2">
                  Частичный возврат средств
                </h3>
                <p className="text-sm text-[#7A5C47] leading-relaxed">
                  <strong>От 24 до 48 часов до начала сеанса</strong>
                  <br />
                  При отмене бронирования за 24-48 часов до начала сеанса, вам будет 
                  возвращено 50% стоимости бронирования.
                </p>
              </div>
            </div>

            {/* No Refund */}
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#FFE8E8] to-white rounded-xl border-l-4 border-[#C97064]">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#C97064] flex items-center justify-center">
                <span className="text-white">0%</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-[#3D3226] mb-2">
                  Возврат не предусмотрен
                </h3>
                <p className="text-sm text-[#7A5C47] leading-relaxed">
                  <strong>Менее чем за 24 часа до начала сеанса или неявка</strong>
                  <br />
                  При отмене бронирования менее чем за 24 часа до начала сеанса или в случае 
                  неявки, возврат средств не производится.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Refund Process */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6B8CAE]/20 to-[#5A7B9E]/10 flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-6 h-6 text-[#6B8CAE]" />
            </div>
            <div>
              <h2 className="text-2xl text-[#3D3226] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                Процесс возврата средств
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-white text-sm">
                1
              </div>
              <div>
                <h4 className="text-[#3D3226] mb-1">Подача запроса на отмену</h4>
                <p className="text-sm text-[#7A5C47] leading-relaxed">
                  Свяжитесь с нами по телефону <a href="tel:+74952501234" className="text-[#D4AF37] hover:underline">+7 (495) 250-12-34</a> или 
                  email <a href="mailto:info@banya-kaliningrad.ru" className="text-[#D4AF37] hover:underline">info@banya-kaliningrad.ru</a> для 
                  подачи запроса на отмену бронирования.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-white text-sm">
                2
              </div>
              <div>
                <h4 className="text-[#3D3226] mb-1">Подтверждение отмены</h4>
                <p className="text-sm text-[#7A5C47] leading-relaxed">
                  После обработки вашего запроса, вы получите подтверждение отмены на указанный 
                  при бронировании email адрес.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-white text-sm">
                3
              </div>
              <div>
                <h4 className="text-[#3D3226] mb-1">Возврат денежных средств</h4>
                <p className="text-sm text-[#7A5C47] leading-relaxed">
                  Возврат средств осуществляется на платежное средство, использованное при оплате, 
                  в течение 5-10 рабочих дней с момента подтверждения отмены.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Special Circumstances */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-[#F5E6D3]/30 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div>
              <h2 className="text-2xl text-[#3D3226] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                Особые обстоятельства
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-[#3D3226] mb-2">🏥 Медицинские причины</h4>
              <p className="text-sm text-[#7A5C47] leading-relaxed">
                В случае документально подтвержденных медицинских причин (справка от врача), 
                мы можем рассмотреть возможность полного возврата средств или переноса 
                бронирования на другую дату, независимо от сроков отмены.
              </p>
            </div>

            <div>
              <h4 className="text-[#3D3226] mb-2">🌧️ Форс-мажорные обстоятельства</h4>
              <p className="text-sm text-[#7A5C47] leading-relaxed">
                При возникновении форс-мажорных обстоятельств (стихийные бедствия, техническая 
                неисправность оборудования и т.д.) со стороны «Баня в Калининграде», 
                производится полный возврат средств или предоставляется возможность переноса 
                бронирования.
              </p>
            </div>

            <div>
              <h4 className="text-[#3D3226] mb-2">📅 Перенос бронирования</h4>
              <p className="text-sm text-[#7A5C47] leading-relaxed">
                Вы можете перенести бронирование на другую дату без дополнительных комиссий 
                при условии уведомления не менее чем за 48 часов до начала сеанса и наличия 
                свободных слотов на желаемую дату.
              </p>
            </div>
          </div>
        </div>

        {/* Group Bookings */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <h2 className="text-2xl text-[#3D3226] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Корпоративные и групповые бронирования
          </h2>
          <p className="text-[#7A5C47] leading-relaxed mb-4">
            Для корпоративных мероприятий и групповых бронирований (более 10 человек) могут 
            применяться особые условия отмены и возврата. Индивидуальные условия обсуждаются 
            и фиксируются в договоре при оформлении бронирования.
          </p>
        </div>

        {/* Modifications */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
          <h2 className="text-2xl text-[#3D3226] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Изменения в бронировании
          </h2>
          <p className="text-[#7A5C47] leading-relaxed mb-4">
            Изменения в существующем бронировании (время, дата, тип сауны) возможны при наличии 
            свободных слотов. Изменения бесплатны при уведомлении не менее чем за 48 часов до 
            начала сеанса. При изменении бронирования менее чем за 48 часа может взиматься 
            комиссия в размере 500 ₽.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-br from-[#3D3226] to-[#4D4236] text-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Свяжитесь с нами
          </h2>
          <p className="text-white/80 leading-relaxed mb-4">
            Если у вас есть вопросы по поводу нашей политики отмены и возврата средств, 
            пожалуйста, свяжитесь с нами:
          </p>
          <div className="space-y-2">
            <p className="flex items-center gap-2">
              <span className="text-[#D4AF37]">📞</span>
              <a href="tel:+74952501234" className="text-white hover:text-[#D4AF37] transition-colors">
                +7 (495) 250-12-34
              </a>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#D4AF37]">✉️</span>
              <a href="mailto:info@banya-kaliningrad.ru" className="text-white hover:text-[#D4AF37] transition-colors">
                info@banya-kaliningrad.ru
              </a>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-[#D4AF37]">📍</span>
              <span className="text-white/80">ул. Грига 58, Калининград, Россия</span>
            </p>
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center mt-8">
          <p className="text-sm text-[#7A5C47]">
            Последнее обновление: 5 ноября 2025 г.
          </p>
        </div>
          </TabsContent>

          {/* Visitor Rules Tab */}
          <TabsContent value="rules" className="mt-0">
            {/* Introduction */}
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
              <div className="bg-[#FFF9F2] border-l-4 border-[#d8b272] p-4 rounded-r-xl mb-6">
                <p className="text-[#3D3226] text-sm">
                  Посещая наш комплекс и совершая бронирование, вы автоматически соглашаетесь с настоящими правилами.
                </p>
              </div>

              {/* Section 1: General Provisions */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d8b272] to-[#c59f6d] flex items-center justify-center text-white">
                    1
                  </div>
                  <h3 className="text-xl text-[#3D3226]">Общие положения</h3>
                </div>
                <div className="space-y-2 text-[#705b36] pl-13">
                  <p>• Настоящие правила определяют взаимоотношения между посетителями и комплексом.</p>
                  <p>• Посетители соглашаются с данными условиями при оплате и входе.</p>
                  <p>• Комплекс включает сауны, парные, массажные зоны и зоны отдыха.</p>
                  <p>• Для обеспечения безопасности и порядка ведется видеонаблюдение.</p>
                  <p>• Посетители обязаны ознакомиться с правилами перед использованием услуг.</p>
                </div>
              </div>

              {/* Section 2: Service Access & Payment */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d8b272] to-[#c59f6d] flex items-center justify-center text-white">
                    2
                  </div>
                  <h3 className="text-xl text-[#3D3226]">Доступ к услугам и оплата</h3>
                </div>
                <div className="space-y-2 text-[#705b36] pl-13">
                  <p>• Посетители получают доступ после оплаты и получения электронного браслета (ключ + таймер).</p>
                  <p>• Стоимость потери браслета: 3 000₽.</p>
                  <p>• Часы работы и тарифы указаны в действующем прайс-листе.</p>
                  <p>• Оплата производится в рублях наличными или картой.</p>
                  <p>• Возврат средств за досрочный выход или неиспользованное время не производится.</p>
                  <p>• При превышении лимита времени начисляются дополнительные поминутные платежи.</p>
                </div>
              </div>

              {/* Section 3: Minors */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d8b272] to-[#c59f6d] flex items-center justify-center text-white">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl text-[#3D3226]">Несовершеннолетние</h3>
                </div>
                <div className="space-y-2 text-[#705b36] pl-13">
                  <p>• Лица до 18 лет должны находиться в сопровождении взрослого.</p>
                  <p>• Дети до 3 лет: обязательно использование подгузников для плавания.</p>
                  <p>• Один взрослый может сопровождать не более 2 детей.</p>
                  <p>• Взрослые несут полную ответственность за безопасность и поведение детей.</p>
                </div>
              </div>

              {/* Section 4: Restrictions */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d8b272] to-[#c59f6d] flex items-center justify-center text-white">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl text-[#3D3226]">Ограничения</h3>
                </div>
                <div className="space-y-2 text-[#705b36] pl-13">
                  <p>• Вход запрещен лицам в состоянии опьянения или представляющим угрозу здоровью/безопасности.</p>
                  <p>• Курение, еда и напитки разрешены только в специально отведенных зонах.</p>
                  <p>• Запрещено вносить стеклянные, острые или опасные предметы.</p>
                  <p>• Животные не допускаются, за исключением собак-поводырей.</p>
                  <p>• Съемка в коммерческих целях без письменного разрешения запрещена.</p>
                </div>
              </div>

              {/* Section 5: Visitor Conduct */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d8b272] to-[#c59f6d] flex items-center justify-center text-white">
                    5
                  </div>
                  <h3 className="text-xl text-[#3D3226]">Правила поведения</h3>
                </div>
                <div className="space-y-2 text-[#705b36] pl-13">
                  <p>• Обязателен душ перед входом в сауну или бассейн.</p>
                  <p>• Купальная одежда обязательна; нижнее белье и верхняя одежда запрещены.</p>
                  <p>• Всегда носите обувь с резиновой подошвой в общественных зонах.</p>
                  <p>• Избегайте использования масел или косметики в парных.</p>
                  <p>• Запрещены прыжки и ныряние в бассейнах и джакузи.</p>
                  <p>• Соблюдайте гигиену и уважение к другим посетителям.</p>
                </div>
              </div>

              {/* Section 6: Safety & Liability */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d8b272] to-[#c59f6d] flex items-center justify-center text-white">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl text-[#3D3226]">Безопасность и ответственность</h3>
                </div>
                <div className="space-y-2 text-[#705b36] pl-13">
                  <p>• Комплекс не несет ответственности за личные вещи, оставленные без присмотра.</p>
                  <p>• Посетители несут ответственность за ущерб, причиненный имуществу.</p>
                  <p>• Нарушение правил может привести к удалению без возврата средств.</p>
                  <p>• Администрация может отказать в будущем посещении нарушителям.</p>
                  <p>• Комплекс не несет ответственности за травмы или состояния, возникшие вследствие не раскрытых проблем со здоровьем.</p>
                </div>
              </div>

              {/* Section 7: Prohibited Health Conditions */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d8b272] to-[#c59f6d] flex items-center justify-center text-white">
                    7
                  </div>
                  <h3 className="text-xl text-[#3D3226]">Медицинские противопоказания</h3>
                </div>
                <div className="bg-[#FFF9F2] border border-[#e4d7c4] rounded-2xl p-6">
                  <p className="text-[#3D3226] mb-4">
                    Лицам со следующими состояниями следует избегать сауны или массажных услуг:
                  </p>
                  <div className="space-y-2 text-[#705b36]">
                    <p>• Сердечно-сосудистые заболевания, гипертония, туберкулез</p>
                    <p>• Онкологические заболевания, инфекции крови или кожи</p>
                    <p>• Психическая нестабильность или состояние опьянения</p>
                    <p>• Беременность (для некоторых процедур)</p>
                    <p>• Открытые раны, лихорадка или острое воспаление</p>
                  </div>
                </div>
              </div>

              {/* Section 8: Contact Information */}
              <div className="bg-gradient-to-br from-[#F5E6D3] to-[#FFF9F2] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d8b272] to-[#c59f6d] flex items-center justify-center text-white">
                    8
                  </div>
                  <h3 className="text-xl text-[#3D3226]">Контактная информация</h3>
                </div>
                <div className="space-y-3 pl-13">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#d8b272] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-[#3D3226]">Адрес:</p>
                      <p className="text-[#705b36]">ул. Грига, 58, Калининград, Россия</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#d8b272] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-[#3D3226]">Телефон:</p>
                      <p className="text-[#705b36]">+7 (4012) 45-22-36, +7 (4012) 53-85-81</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#d8b272] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-[#3D3226]">Email:</p>
                      <p className="text-[#705b36]">griga58@yandex.ru</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#d8b272] mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-[#3D3226]">Часы работы:</p>
                      <p className="text-[#705b36]">Среда: 15:00–23:00 | Чт–Вс: 10:00–23:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-center mt-8">
              <p className="text-sm text-[#7A5C47]">
                Действует с: 29 июля 2025 года
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Back Button */}
        <div className="text-center mt-8">
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-[#D4A574] to-[#C69563] hover:from-[#C69563] hover:to-[#B8865A] text-white rounded-full px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Вернуться назад
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
