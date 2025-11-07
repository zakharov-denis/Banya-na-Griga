'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Button } from '../ui/button';
import { Copy, Download, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const interviewQuestions = {
  'Опыт и биография': [
    'Работали ли вы раньше в спа, оздоровительных центрах или гостиничном бизнесе? Где и как долго?',
    'Какие обязанности вы выполняли на предыдущей должности?',
    'Почему вы хотите работать в банном / оздоровительном центре?',
    'Есть ли у вас опыт работы в жарких или влажных условиях?',
  ],
  'Знания о бане': [
    'Знаете ли вы разницу между сухой сауной и паровой баней?',
    'Какие правила безопасности следует соблюдать в бане?',
    'Вы когда-нибудь пользовались баней? Каков был ваш опыт?',
    'Как бы вы объяснили пользу бани гостю, который посещает её впервые?',
  ],
  'Профессиональная квалификация': [
    'Есть ли у вас какие-либо сертификаты (например, первая помощь, массаж, гостиничное дело)?',
    'Вас устраивает работа посменно (утро, вечер, выходные)?',
    'Можете ли вы стоять, ходить или поднимать тяжести в течение нескольких часов подряд?',
    'Обучены ли вы СЛР или действиям в чрезвычайных ситуациях?',
  ],
  'Трудовая этика и гибкость': [
    'Вы доступны для работы в выходные и праздничные дни?',
    'Как вы справляетесь с напряжёнными периодами с большим количеством гостей?',
    'Если коллега опаздывает, можете ли вы остаться дольше, чтобы подменить?',
    'Как вы сохраняете мотивацию в спокойные периоды?',
  ],
  'Технические навыки и решение проблем': [
    'Если гость жалуется, что в бане слишком жарко или недостаточно жарко, что бы вы сделали?',
    'Что бы вы сделали, если заметили проблему безопасности (например, мокрый пол, сломанная скамья)?',
    'Как бы вы поступили с гостем, которому стало плохо или кружится голова в бане?',
    'Гость просит дополнительные полотенца, но у вас их мало. Как вы поступите?',
  ],
  'Личные качества': [
    'Почему мы должны нанять вас на эту должность?',
    'Опишите себя тремя словами.',
    'Как вы справляетесь со стрессом или трудными гостями?',
    'Что для вас означает «гостеприимство»?',
    'Каковы ваши зарплатные ожидания?',
    'Когда вы сможете приступить к работе, если вас выберут?',
  ],
};

export function RequirementsSection() {
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const copyToClipboard = async (category: string, questions: string[]) => {
    const text = `${category}\n\n${questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}`;
    
    try {
      // Try modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopiedSection(category);
        toast.success(`Вопросы "${category}" скопированы!`);
        setTimeout(() => setCopiedSection(null), 2000);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
          const successful = document.execCommand('copy');
          textArea.remove();
          
          if (successful) {
            setCopiedSection(category);
            toast.success(`Вопросы "${category}" скопированы!`);
            setTimeout(() => setCopiedSection(null), 2000);
          } else {
            throw new Error('Copy command failed');
          }
        } catch (err) {
          textArea.remove();
          toast.error('Не удалось скопировать в буфер обмена. Попробуйте скачать вместо этого.');
        }
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast.error('Не удалось скопировать в буфер обмена. Попробуйте скачать вместо этого.');
    }
  };

  const downloadAllQuestions = () => {
    let allText = 'Баня Хейвен - Вопросы для собеседования\n\n';
    Object.entries(interviewQuestions).forEach(([category, questions]) => {
      allText += `${category}\n${'-'.repeat(category.length)}\n`;
      questions.forEach((q, i) => {
        allText += `${i + 1}. ${q}\n`;
      });
      allText += '\n';
    });

    const blob = new Blob([allText], { type: 'text/plain; charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'banya-haven-interview-questions.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Вопросы скачаны!');
  };

  return (
    <section id="requirements" className="py-16 sm:py-20 px-6 sm:px-8 lg:px-12 bg-white scroll-mt-20">
      <div className="max-w-5xl mx-auto">
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
              Требования к персоналу и вопросы собеседования
            </h2>
            <p className="text-[#7A5C47] text-lg max-w-3xl mx-auto mb-6">
              Для агентств и менеджеров по найму: полные вопросы для собеседования, организованные по категориям
            </p>
            <Button
              onClick={downloadAllQuestions}
              variant="outline"
              className="border-[#D4A574] text-[#7A5C47] hover:bg-[#D4A574]/10 rounded-full px-6 py-3 gap-2"
            >
              <Download className="w-4 h-4" />
              Скачать все вопросы
            </Button>
          </div>

          {/* Accordion */}
          <Accordion type="multiple" className="space-y-4">
            {Object.entries(interviewQuestions).map(([category, questions]) => (
              <AccordionItem 
                key={category}
                value={category}
                className="border border-[#E8DFD5] rounded-2xl px-6 overflow-hidden bg-gradient-to-br from-white to-[#FAF7F2]"
              >
                <AccordionTrigger className="hover:no-underline py-5 text-left">
                  <div className="flex items-center justify-between w-full pr-4">
                    <span className="text-[#3D3226] text-lg">
                      {category}
                    </span>
                    <span className="text-sm text-[#7A5C47]/60">
                      {questions.length} {questions.length === 1 ? 'вопрос' : questions.length < 5 ? 'вопроса' : 'вопросов'}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6">
                  <div className="space-y-4">
                    <ul className="space-y-3">
                      {questions.map((question, idx) => (
                        <li key={idx} className="flex gap-3 text-[#7A5C47]">
                          <span className="text-[#C69563] flex-shrink-0 mt-1">
                            {idx + 1}.
                          </span>
                          <span className="leading-relaxed">{question}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      onClick={() => copyToClipboard(category, questions)}
                      variant="outline"
                      size="sm"
                      className="border-[#D4A574] text-[#7A5C47] hover:bg-[#D4A574]/10 rounded-full gap-2 mt-4"
                    >
                      {copiedSection === category ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          Скопировано!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Скопировать вопросы
                        </>
                      )}
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
