'use client';

import { motion } from 'motion/react';
import { DollarSign, Clock, Award, Heart } from 'lucide-react';
import { Card } from '../ui/card';

const stats = [
  {
    icon: DollarSign,
    title: 'Конкурентная оплата',
    description: 'Лучшие на рынке компенсационные пакеты',
  },
  {
    icon: Clock,
    title: 'Гибкий график',
    description: 'Доступны варианты полной и частичной занятости',
  },
  {
    icon: Award,
    title: 'Обучение и сертификация',
    description: 'Возможности профессионального развития',
  },
  {
    icon: Heart,
    title: 'Медицинские льготы',
    description: 'Комплексное медицинское страхование',
  },
];

export function QuickStats() {
  return null;
}
