'use client';

import { motion } from 'motion/react';
import { Card } from '../ui/card';
import { FileText, Phone, Users, Briefcase, Award } from 'lucide-react';

const timelineSteps = [
  {
    icon: FileText,
    title: 'Рассмотрение заявки',
    description: 'Мы рассматриваем вашу заявку и резюме',
    duration: '1-2 дня',
  },
  {
    icon: Phone,
    title: 'Телефонное интервью',
    description: 'Краткий звонок для обсуждения вашей биографии',
    duration: '1-2 дня',
  },
  {
    icon: Users,
    title: 'Собеседование',
    description: 'Агентское или очное собеседование с менеджером по найму',
    duration: '2-3 дня',
  },
  {
    icon: Briefcase,
    title: 'Пробная смена',
    description: 'Практический опыт работы на нашем объекте',
    duration: '1-2 дня',
  },
  {
    icon: Award,
    title: 'Предложение о работе',
    description: 'Предложение о работе и адаптация',
    duration: '1-2 дня',
  },
];

export function InterviewTimeline() {
  return (
    <section className="py-16 sm:py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-white to-[#FAF7F2]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
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
              Процесс собеседования и сроки
            </h2>
            <p className="text-[#7A5C47] text-lg">
              От заявки до предложения примерно за 7-14 дней
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Connection Line - Desktop */}
            <div className="hidden lg:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-[#E8DFD5] via-[#D4A574] to-[#E8DFD5]" />

            {/* Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
              {timelineSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <Card className="p-6 rounded-2xl border-[#E8DFD5] bg-white hover:shadow-lg transition-all duration-300 h-full">
                      {/* Step Number */}
                      <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-to-br from-[#D4A574] to-[#C69563] text-white flex items-center justify-center text-sm shadow-md">
                        {index + 1}
                      </div>

                      <div className="space-y-4">
                        {/* Icon */}
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4A574]/20 to-[#C69563]/10 flex items-center justify-center mx-auto lg:mx-0">
                          <Icon className="w-6 h-6 text-[#C69563]" strokeWidth={2} />
                        </div>

                        {/* Content */}
                        <div className="text-center lg:text-left">
                          <h3 className="text-[#3D3226] mb-2">
                            {step.title}
                          </h3>
                          <p className="text-sm text-[#7A5C47]/70 leading-relaxed mb-2">
                            {step.description}
                          </p>
                          <p className="text-xs text-[#C69563]">
                            {step.duration}
                          </p>
                        </div>
                      </div>
                    </Card>

                    {/* Arrow - Mobile/Tablet */}
                    {index < timelineSteps.length - 1 && (
                      <div className="lg:hidden flex justify-center my-2">
                        <div className="w-0.5 h-6 bg-gradient-to-b from-[#D4A574] to-[#E8DFD5]" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center">
            <p className="text-sm text-[#7A5C47]/70">
              Сроки могут варьироваться в зависимости от должности и доступности кандидата. Мы стремимся держать вас в курсе на каждом этапе.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
