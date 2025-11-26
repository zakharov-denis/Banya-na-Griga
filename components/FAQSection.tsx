import { motion } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { ImageWithFallback } from './figma/ImageWithFallback';

const faqData = [
  {
    id: '1',
    question: 'Где можно припарковаться при посещении бани?',
    answer: 'У нас есть просторная парковка прямо за зданием бани с зарезервированными местами возле входа. Дополнительная парковочный места находятся в 2 минутах ходьбы. Рекомендуем приезжать на 10-15 минут раньше.',
  },
  {
    id: '2',
    question: 'Нужно ли приносить полотенца и какие удобства доступны?',
    answer: 'Принесите два полотенца (одно для сидения, одно для вытирания), купальник, тапочки. Также у нас можно арендовать полотенца, простыни и шапки.',
  },
  {
    id: '3',
    question: 'Могут ли дети и домашние животные посещать баню?',
    answer: 'Дети от 7 лет допускаются под присмотром взрослых. Домашние животные не допускаются, за исключением сертифицированных собак-поводырей.',
  },
  {
    id: '4',
    question: 'Какие способы оплаты вы принимаете и предлагаете ли скидки?',
    answer: 'Мы принимаем все основные карты, мобильные платежи и наличные.',
  },
  {
    id: '5',
    question: 'Какова ваша политика отмены и возврата средств?',
    answer: (
      <div className="space-y-3">
        <div>
          <strong className="text-[#7A5C47]">За 48+ часов:</strong> Полный возврат средств.
        </div>
        <div>
          <strong className="text-[#7A5C47]">За 24-48 часов:</strong> Бесплатный перенос или ваучер
        </div>
        <div>
          <strong className="text-[#7A5C47]">Менее 24 часов:</strong> Без возврата и переноса
        </div>
        <div className="pt-2 border-t border-[#E8DFD5]">
          Если отменяем мы, гарантирован полный возврат средств или перенос.
        </div>
      </div>
    ),
  },
  {
    id: '6',
    question: 'Как подготовиться до и после банного сеанса?',
    answer: (
      <div className="space-y-3">
        <div>
          <strong className="text-[#7A5C47]">До:</strong> Легкий прием пищи, душ, снимите украшения, приезжайте заранее.
        </div>
        <div>
          <strong className="text-[#7A5C47]">После:</strong> Охладитесь, пейте воду, отдохните 2 часа и поешьте легкую пищу.
        </div>
      </div>
    ),
  },
  {
    id: '7',
    question: 'Что такое традиционная русская баня и каковы её польза для здоровья?',
    answer: 'Русская баня сочетает пар, массаж веником и охлаждающие перерывы. Польза включает снятие стресса, восстановление мышц, улучшение кожи и сна.',
  },
];

export function FAQSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#F9F7F3] overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#CBA35A]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#D4A574]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-[#3D3226] mb-4">
            Часто задаваемые вопросы
          </h2>
          <p className="text-[#7A5C47] text-lg max-w-2xl mx-auto">
            Всё, что нужно знать перед следующим посещением бани.
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Side - FAQs (Column 1) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.slice(0, 4).map((faq, index) => (
                <FAQItem key={faq.id} faq={faq} index={index} />
              ))}
            </Accordion>
          </motion.div>

          {/* Center - Decorative Image (Desktop Only) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex lg:col-span-2 items-center justify-center"
          >
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#D4A574]/20 to-[#CBA35A]/20 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4A574]/30 to-[#CBA35A]/30 flex items-center justify-center">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1749561532365-1d60917caf1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXVuYSUyMHJlbGF4YXRpb24lMjBsaW5lJTIwYXJ0fGVufDF8fHx8MTc2MjAxMzMwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Sauna relaxation"
                    className="w-16 h-16 object-cover rounded-full opacity-60"
                  />
                </div>
              </div>
              {/* Decorative circles */}
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#CBA35A]/30" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full bg-[#D4A574]/30" />
            </div>
          </motion.div>

          {/* Right Side - FAQs (Column 2) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqData.slice(4).map((faq, index) => (
                <FAQItem key={faq.id} faq={faq} index={index + 4} />
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ faq, index }: { faq: typeof faqData[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <AccordionItem
        value={faq.id}
        className="
          bg-white rounded-2xl border-0 
          shadow-[0_2px_12px_rgba(203,163,90,0.08)]
          hover:shadow-[0_4px_20px_rgba(203,163,90,0.15)]
          transition-all duration-300
          overflow-hidden
          data-[state=open]:bg-[#FFF9F1]
          data-[state=open]:shadow-[0_4px_20px_rgba(203,163,90,0.2)]
          data-[state=open]:ring-1
          data-[state=open]:ring-[#CBA35A]/30
        "
      >
        <AccordionTrigger className="px-6 py-5 hover:no-underline group">
          <div className="flex items-start gap-4 text-left w-full">
            {/* Icon Toggle */}
            <div className="flex-shrink-0 mt-0.5">
              <div className="
                w-6 h-6 rounded-full 
                bg-gradient-to-br from-[#D4A574] to-[#CBA35A]
                flex items-center justify-center
                group-hover:scale-110 transition-transform duration-300
              ">
                <Plus className="w-3.5 h-3.5 text-white group-data-[state=open]:hidden" />
                <Minus className="w-3.5 h-3.5 text-white hidden group-data-[state=open]:block" />
              </div>
            </div>
            
            {/* Question Text */}
            <span className="text-[#3D3226] pr-8 leading-relaxed">
              {faq.question}
            </span>
          </div>
        </AccordionTrigger>
        
        <AccordionContent className="px-6 pb-6">
          <div className="pl-10 text-[#7A5C47] leading-relaxed">
            {faq.answer}
          </div>
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
}
