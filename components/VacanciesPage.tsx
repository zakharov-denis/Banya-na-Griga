'use client';

import { Header } from './Header';
import { QuickStats } from './vacancies/QuickStats';
import { OpenPositions } from './vacancies/OpenPositions';
import { FooterCTA } from './vacancies/FooterCTA';
import { Toaster } from './ui/sonner';

interface VacanciesPageProps {
  onNavigateToHome?: () => void;
  onNavigateToHomeWithScroll?: (sectionId?: string) => void;
  onNavigateToAbout?: () => void;
  onNavigateToBlogs?: () => void;
  onBookSession?: () => void;
}

export function VacanciesPage({ onNavigateToHome, onNavigateToHomeWithScroll, onNavigateToAbout, onNavigateToBlogs, onBookSession }: VacanciesPageProps) {
  return (
    <div id="vacancies-page" className="min-h-screen bg-white">
      {/* Header with Home Button */}
      <Header 
        onNavigateToCareers={() => {}} // Stay on current page
        onNavigateToAbout={onNavigateToAbout}
        onNavigateToBlogs={onNavigateToBlogs}
        onNavigateToHome={onNavigateToHome}
        showHomeButton={true}
        onBookSession={onBookSession}
        onNavigateToHomeWithScroll={onNavigateToHomeWithScroll}
        currentPage="vacancies"
      />
      
      {/* Quick Stats */}
      <QuickStats />

      {/* Open Positions */}
      <OpenPositions />

      {/* Footer CTA */}
      <FooterCTA />

      {/* Toast Notifications */}
      <Toaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#FAF7F2',
            color: '#3D3226',
            border: '1px solid #E8DFD5',
          },
        }}
      />
    </div>
  );
}
