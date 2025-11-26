'use client';

import { Button } from './ui/button';
import { Home as HomeIcon, Package, Image, User, Mail, Briefcase, Newspaper } from 'lucide-react';
import { NavBar } from './ui/tubelight-navbar';

interface HeaderProps {
  onNavigateToCareers?: () => void;
  onNavigateToAbout?: () => void;
  onNavigateToBlogs?: () => void;
  onNavigateToHome?: () => void;
  showHomeButton?: boolean;
  onBookSession?: () => void;
  onNavigateToHomeWithScroll?: (sectionId?: string) => void;
  currentPage?: string;
}

export function Header({ onNavigateToCareers, onNavigateToAbout, onNavigateToBlogs, onNavigateToHome, showHomeButton = false, onBookSession, onNavigateToHomeWithScroll, currentPage }: HeaderProps) {
  const navItems = [
    { name: 'Главная', url: '#home', icon: HomeIcon },
    { name: 'Услуги', url: '#services', icon: Package },
    { name: 'Новости', url: '#blogs', icon: Newspaper },
    { name: 'Галерея', url: '#gallery', icon: Image },
    { name: 'О нас', url: '#about', icon: User },
    { name: 'Контакты', url: '#contact', icon: Mail },
    { name: 'Вакансии', url: '#vacancies', icon: Briefcase },
  ];

  return (
    <NavBar
      items={navItems}
      onNavigateToAbout={onNavigateToAbout}
      onNavigateToBlogs={onNavigateToBlogs}
      onNavigateToCareers={onNavigateToCareers}
      onNavigateToHome={onNavigateToHome}
      onNavigateToHomeWithScroll={onNavigateToHomeWithScroll}
      currentPage={currentPage}
      ctaButton={
        <Button
          onClick={onBookSession}
          className="
            bg-gradient-to-r from-[#D4A574] to-[#C69563] 
            hover:from-[#C69563] hover:to-[#B8865A] 
            text-white rounded-full px-4 md:px-5 py-2 text-sm
            shadow-md hover:shadow-xl
            transition-all duration-300 
            hover:scale-105
            relative
            overflow-hidden
            group
            whitespace-nowrap
            w-full sm:w-auto
            justify-center
          "
        >
          <span className="relative z-10">Забронировать</span>
          <span className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
      }
    />
  );
}
