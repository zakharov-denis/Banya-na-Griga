'use client';

import { motion } from 'motion/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const faqs = [
  {
    question: 'Какое обычно время смен?',
    answer: 'Мы предлагаем гибкие смены, включая утренние (7:00-15:00), вечерние (15:00-23:00) и сменный график. Также доступны варианты частичной занятости для некоторых должностей.',
  },
  {
    question: 'Вы проводите проверку биографии?',
    answer: 'Да, все кандидаты проходят базовую проверку биографии в рамках нашего процесса найма для обеспечения безопасности наших гостей и команды.',
  },
  {
    question: 'Какие языковые навыки требуются?',
    answer: 'Русский и английский языки обязательны. Дополнительные языки, такие как немецкий или другие европейские языки, являются плюсом, особенно для должностей, связанных с обслуживанием гостей.',
  },
  {
    question: 'Требуются ли сертификаты для всех должностей?',
    answer: 'Не для всех должностей. Для должностей уборщика и администратора специальные сертификаты не требуются. Однако массажисты должны иметь действующие сертификаты, а для банщиков предпочтительно обучение по оказанию первой помощи.',
  },
  {
    question: 'Какой дресс-код?',
    answer: 'Мы предоставляем профессиональную форму для всех членов команды. От вас ожидается поддержание чистого, аккуратного внешнего вида и соблюдение наших стандартов ухода за собой.',
  },
  {
    question: 'Предоставляется ли обучение?',
    answer: 'Да! Все новые сотрудники проходят комплексное обучение по безопасности в бане, протоколам обслуживания гостей, стандартам гигиены и процедурам в чрезвычайных ситуациях. Также доступны возможности постоянного развития.',
  },
  {
    question: 'Какие льготы вы предлагаете?',
    answer: 'Мы предлагаем конкурентные зарплаты, медицинские льготы, гибкий график, оздоровительные привилегии для персонала (включая бесплатные сеансы в бане) и возможности профессионального развития.',
  },
  {
    question: 'Сколько времени занимает процесс найма?',
    answer: 'Обычно 7-14 дней от заявки до предложения, в зависимости от должности и доступности кандидата. Мы держим всех кандидатов в курсе на протяжении всего процесса.',
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-16 sm:py-20 px-6 sm:px-8 lg:px-12 bg-white scroll-mt-20">
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
              Часто задаваемые вопросы
            </h2>
            <p className="text-[#7A5C47] text-lg">
              Распространённые вопросы о работе в Баня Хейвен
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index}
                value={`faq-${index}`}
                className="border border-[#E8DFD5] rounded-2xl px-6 overflow-hidden bg-gradient-to-br from-white to-[#FAF7F2]"
              >
                <AccordionTrigger className="hover:no-underline py-5 text-left">
                  <span className="text-[#3D3226] pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6 text-[#7A5C47] leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact */}
          <div className="text-center pt-8">
            <p className="text-[#7A5C47]">
              Остались вопросы?{' '}
              <a 
                href="mailto:hiring@banyahaven.com" 
                className="text-[#C69563] hover:underline"
              >
                Свяжитесь с нашей командой по найму
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
