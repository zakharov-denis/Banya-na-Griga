'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Clock, MapPin, DollarSign, Download, CheckCircle2 } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

interface Position {
  id: number;
  title: string;
  type: string;
  location: string;
  summary: string;
  badges: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  shifts: string;
  salary: string;
}

interface RoleDetailsModalProps {
  position: Position | null;
  isOpen: boolean;
  onClose: () => void;
}

export function RoleDetailsModal({ position, isOpen, onClose }: RoleDetailsModalProps) {
  if (!position) return null;

  const handleApplyNow = () => {
    onClose();
    setTimeout(() => {
      const applySection = document.querySelector('#apply');
      if (applySection) {
        applySection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 rounded-2xl">
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6 sm:p-8">
            <DialogHeader className="space-y-4">
              <div className="flex flex-wrap gap-2">
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
              
              <DialogTitle className="text-2xl sm:text-3xl text-[#3D3226]">
                {position.title}
              </DialogTitle>

              <div className="flex flex-wrap gap-4 text-sm text-[#7A5C47]/70">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {position.type}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {position.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4" />
                  {position.salary}
                </span>
              </div>

              <DialogDescription className="text-base text-[#7A5C47] leading-relaxed">
                {position.description}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 mt-8">
              {/* Responsibilities */}
              <div>
                <h3 className="text-lg text-[#3D3226] mb-3">
                  Основные обязанности
                </h3>
                <ul className="space-y-2">
                  {position.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-[#7A5C47]">
                      <CheckCircle2 className="w-5 h-5 text-[#C69563] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h3 className="text-lg text-[#3D3226] mb-3">
                  Требования
                </h3>
                <ul className="space-y-2">
                  {position.requirements.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-[#7A5C47]">
                      <CheckCircle2 className="w-5 h-5 text-[#C69563] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Shift Information */}
              <div className="p-4 rounded-xl bg-[#F5EFE6] border border-[#E8DFD5]">
                <h3 className="text-sm text-[#3D3226] mb-1">
                  Информация о сменах
                </h3>
                <p className="text-[#7A5C47]">{position.shifts}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={handleApplyNow}
                  className="flex-1 bg-gradient-to-r from-[#D4A574] to-[#C69563] hover:from-[#C69563] hover:to-[#B8865A] text-white rounded-full py-6"
                >
                  Подать заявку
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-[#D4A574] text-[#7A5C47] hover:bg-[#D4A574]/10 rounded-full py-6 gap-2"
                  onClick={() => {
                    // In a real app, this would trigger a download
                    alert('Здесь будет начата загрузка описания вакансии в формате PDF');
                  }}
                >
                  <Download className="w-4 h-4" />
                  Скачать описание
                </Button>
              </div>

              <p className="text-xs text-center text-[#7A5C47]/60">
                Вопросы? Напишите нам на{' '}
                <a 
                  href="mailto:hiring@banyahaven.com" 
                  className="text-[#C69563] hover:underline"
                >
                  hiring@banyahaven.com
                </a>
              </p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
