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
    { name: 'Блоги', url: '#blogs', icon: Newspaper },
    { name: 'Галерея', url: '#gallery', icon: Image },
    { name: 'О нас', url: '#about', icon: User },
    { name: 'Контакты', url: '#contact', icon: Mail },
  ];

  return (
    <NavBar 
      items={navItems}
      onNavigateToAbout={onNavigateToAbout}
      onNavigateToBlogs={onNavigateToBlogs}
      onNavigateToHome={onNavigateToHome}
      onNavigateToHomeWithScroll={onNavigateToHomeWithScroll}
      currentPage={currentPage}
      secondaryCta={onNavigateToCareers || showHomeButton ? (
        <Button
          onClick={showHomeButton ? () => onNavigateToHomeWithScroll?.() : onNavigateToCareers}
          variant="outline"
          className="
            border-2 border-[#D4A574] 
            text-[#7A5C47]
            bg-transparent
            hover:bg-[#D4A574]/10
            rounded-full px-3 md:px-4 py-2 text-sm
            shadow-sm hover:shadow-md
            transition-all duration-300 
            hover:scale-105
            gap-2
            whitespace-nowrap
            w-full sm:w-auto
            justify-center sm:justify-start
          "
        >
          {showHomeButton ? (
            <>
              <HomeIcon className="w-4 h-4" />
              <span>Главная</span>
            </>
          ) : (
            <>
              <Briefcase className="w-4 h-4" />
              <span>Вакансии</span>
            </>
          )}
        </Button>
      ) : undefined}
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
