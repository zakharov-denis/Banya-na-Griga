'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Search, Grid2x2, List, MapPin, Clock, ExternalLink } from 'lucide-react';

const positions = [
  {
    id: 1,
    title: 'Уборщик и техобслуживание',
    type: 'Полная занятость',
    location: 'Калининград',
    summary: 'Поддержание саун, гигиены и гостевых зон в соответствии с премиальными стандартами.',
    badges: ['Срочный найм', 'Через агентство'],
    description: 'Мы ищем ответственных сотрудников по уборке и обслуживанию, чтобы наши объекты оставались безупречными и гостеприимными.',
    responsibilities: [
      'Ежедневная уборка и дезинфекция саун',
      'Поддержание стандартов гигиены во всех гостевых зонах',
      'Оперативное сообщение о проблемах с обслуживанием',
      'Пополнение запасов и принадлежностей',
    ],
    requirements: [
      'Опыт работы 1+ год в гостиничном или спа-обслуживании',
      'Внимание к деталям',
      'Физическая выносливость',
      'Знание протоколов гигиены',
    ],
    shifts: 'Утро (7:00-15:00) или Вечер (15:00-23:00)',
    salary: '40 000 - 55 000 ₽/месяц',
  },
  {
    id: 2,
    title: 'Банщик',
    type: 'Полная занятость',
    location: 'Калининград',
    summary: 'Управление сеансами в бане и комфортом гостей с заботой и профессионализмом.',
    badges: ['Обучение предоставляется', 'Через агентство'],
    description: 'Присоединяйтесь к нашей команде в качестве банщика, чтобы создавать исключительные оздоровительные впечатления для наших гостей.',
    responsibilities: [
      'Контроль температуры и влажности в бане',
      'Помощь гостям с протоколами бани',
      'Обеспечение безопасности во время сеансов',
      'Предоставление полотенец и напитков',
    ],
    requirements: [
      'Опыт обслуживания клиентов',
      'Хорошие коммуникативные навыки',
      'Базовые знания охраны труда',
      'Физическая подготовка и комфорт с жарой',
    ],
    shifts: 'Сменный график (6:00-14:00, 14:00-22:00)',
    salary: '45 000 - 65 000 ₽/месяц',
  },
];

interface OpenPositionsProps {
  onViewDetails: (position: typeof positions[0]) => void;
}

export function OpenPositions({ onViewDetails }: OpenPositionsProps) {
  // Determine initial view based on screen size and localStorage
  const getInitialView = (): 'grid' | 'list' => {
    // Check localStorage first
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('banya_positions_view');
      if (saved === 'grid' || saved === 'list') return saved;
      
      // Default based on screen size
      return window.innerWidth < 768 ? 'list' : 'grid';
    }
    return 'grid';
  };

  const [viewMode, setViewMode] = useState<'grid' | 'list'>(getInitialView);
  const [filterRole, setFilterRole] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Persist view preference
  useEffect(() => {
    localStorage.setItem('banya_positions_view', viewMode);
  }, [viewMode]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setViewMode('grid');
    } else if (e.key === 'ArrowRight') {
      setViewMode('list');
    }
  };

  const filteredPositions = positions.filter(position => {
    const matchesRole = filterRole === 'all' || position.title.toLowerCase().includes(filterRole.toLowerCase());
    const matchesType = filterType === 'all' || position.type === filterType;
    const matchesSearch = searchQuery === '' || 
      position.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      position.summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesRole && matchesType && matchesSearch;
  });

  return (
    <section id="positions" className="py-16 sm:py-20 px-6 sm:px-8 lg:px-12 bg-gradient-to-b from-white to-[#FAF7F2]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 
            className="text-[#3D3226] mb-4"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontFamily: 'Georgia, serif',
            }}
          >
            Открытые вакансии
          </h2>
          <p className="text-[#7A5C47] text-lg max-w-2xl mx-auto">
            Изучите наши текущие возможности и найдите идеальную роль
          </p>
        </div>

        {/* Filter Bar */}
        <Card className="p-6 rounded-2xl border-[#E8DFD5] mb-8 bg-white/80 backdrop-blur-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            {/* Search */}
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-4 h-4 text-[#7A5C47]/60 pointer-events-none" />
              <Input
                placeholder="Поиск вакансий..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-11 pl-11 pr-4 rounded-full border-[#E8DFD5] focus:border-[#C69563] text-[#3D3226] placeholder:text-[#7A5C47]/60"
              />
            </div>

            {/* Role Filter */}
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="h-11 rounded-full border-[#E8DFD5] focus:border-[#C69563] text-[#3D3226]">
                <SelectValue placeholder="Выберите роль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все роли</SelectItem>
                <SelectItem value="уборщик">Уборщик и техобслуживание</SelectItem>
                <SelectItem value="банщик">Банщик</SelectItem>
              </SelectContent>
            </Select>

            {/* Type Filter */}
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="h-11 rounded-full border-[#E8DFD5] focus:border-[#C69563] text-[#3D3226]">
                <SelectValue placeholder="Тип занятости" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все типы</SelectItem>
                <SelectItem value="Полная занятость">Полная занятость</SelectItem>
                <SelectItem value="Частичная занятость">Частичная занятость</SelectItem>
                <SelectItem value="Договор">Договор</SelectItem>
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="w-full sm:w-auto flex justify-center sm:justify-end">
              <ToggleGroup
                type="single"
                value={viewMode}
                onValueChange={(value) => value && setViewMode(value as 'grid' | 'list')}
                onKeyDown={handleKeyDown}
                className="h-11 bg-white/60 backdrop-blur-sm p-1.5 rounded-full border border-[#E8DFD5] shadow-sm inline-flex items-center gap-1.5"
                role="tablist"
                aria-label="Переключатель вида"
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <ToggleGroupItem
                      value="grid"
                      aria-pressed={viewMode === 'grid'}
                      aria-label="Вид сеткой"
                      className={`
                        !rounded-full inline-flex items-center justify-center h-8 w-11 transition-all duration-200 overflow-hidden border-0 shadow-none
                        ${viewMode === 'grid' 
                          ? 'bg-gradient-to-br from-[#D4A574] to-[#C69563] text-white shadow-md shadow-[#C69563]/20' 
                          : 'bg-transparent text-[#7A5C47] hover:bg-[#F5EFE6]/50'
                        }
                      `}
                    >
                      <Grid2x2 className="w-4 h-4 stroke-[2.5] flex-shrink-0" />
                      <span className="sr-only">Вид сеткой</span>
                    </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="top" 
                    sideOffset={8}
                    className="bg-[#3D3226] text-white text-xs rounded-lg px-3 py-1.5"
                  >
                    Вид сеткой
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <ToggleGroupItem
                      value="list"
                      aria-pressed={viewMode === 'list'}
                      aria-label="Вид списком"
                      className={`
                        !rounded-full inline-flex items-center justify-center h-8 w-11 transition-all duration-200 overflow-hidden border-0 shadow-none
                        ${viewMode === 'list' 
                          ? 'bg-gradient-to-br from-[#D4A574] to-[#C69563] text-white shadow-md shadow-[#C69563]/20' 
                          : 'bg-transparent text-[#7A5C47] hover:bg-[#F5EFE6]/50'
                        }
                      `}
                    >
                      <List className="w-4 h-4 stroke-[2.5] flex-shrink-0" />
                      <span className="sr-only">Вид списком</span>
                    </ToggleGroupItem>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="top" 
                    sideOffset={8}
                    className="bg-[#3D3226] text-white text-xs rounded-lg px-3 py-1.5"
                  >
                    Вид списком
                  </TooltipContent>
                </Tooltip>
              </ToggleGroup>
            </div>
          </div>
        </Card>

        {/* Results Count */}
        <p className="text-[#7A5C47]/70 mb-6">
          Показано {filteredPositions.length} {filteredPositions.length === 1 ? 'вакансия' : filteredPositions.length < 5 ? 'вакансии' : 'вакансий'}
        </p>

        {/* Positions Grid/List */}
        <motion.div 
          id="positions-list"
          layout
          className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          <AnimatePresence mode="wait">
            {filteredPositions.map((position, index) => (
              <motion.div
                key={position.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ 
                  duration: 0.2,
                  delay: index * 0.03,
                  layout: { duration: 0.2 }
                }}
              >
                <Card className={`p-6 rounded-2xl border-[#E8DFD5] bg-white hover:shadow-xl transition-all duration-300 hover:scale-[1.02] ${viewMode === 'list' ? 'flex gap-6' : ''}`}>
                <div className="flex-1 flex flex-col">
                  {/* Header */}
                  <div className="mb-3">
                    <h3 className="text-[#3D3226] text-xl mb-2">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-sm text-[#7A5C47]/70">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {position.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {position.location}
                      </span>
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-[#7A5C47] text-sm leading-relaxed mb-3">
                    {position.summary}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {position.badges.map((badge) => (
                      <Badge 
                        key={badge}
                        variant="secondary"
                        className="bg-[#D4A574]/10 text-[#7A5C47] border border-[#D4A574]/20 rounded-full"
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                    <Button
                      onClick={() => {
                        window.location.href = 'mailto:griga58@yandex.ru?subject=Заявка на вакансию: ' + encodeURIComponent(position.title);
                      }}
                      className="flex-1 h-11 bg-gradient-to-r from-[#D4A574] to-[#C69563] hover:from-[#C69563] hover:to-[#B8865A] text-white rounded-full transition-all duration-200"
                    >
                      Быстрая подача
                    </Button>
                    <Button
                      onClick={() => onViewDetails(position)}
                      variant="outline"
                      className="flex-1 h-11 border-[#D4A574] text-[#7A5C47] hover:bg-[#D4A574]/10 rounded-full inline-flex items-center justify-center gap-2 transition-all duration-200"
                    >
                      Подробности
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>

        {filteredPositions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#7A5C47]/70 text-lg">
              Вакансий по вашим фильтрам не найдено. Попробуйте изменить параметры поиска.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
