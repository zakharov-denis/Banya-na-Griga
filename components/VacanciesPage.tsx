'use client';

import { useState } from 'react';
import { Header } from './Header';
import { QuickStats } from './vacancies/QuickStats';
import { OpenPositions } from './vacancies/OpenPositions';
import { RoleDetailsModal } from './vacancies/RoleDetailsModal';
import { AgencyPanel } from './vacancies/AgencyPanel';
import { InterviewTimeline } from './vacancies/InterviewTimeline';
import { FooterCTA } from './vacancies/FooterCTA';
import { Toaster } from './ui/sonner';

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

interface VacanciesPageProps {
  onNavigateToHome?: () => void;
  onNavigateToHomeWithScroll?: (sectionId?: string) => void;
  onNavigateToAbout?: () => void;
  onNavigateToBlogs?: () => void;
  onBookSession?: () => void;
}

export function VacanciesPage({ onNavigateToHome, onNavigateToHomeWithScroll, onNavigateToAbout, onNavigateToBlogs, onBookSession }: VacanciesPageProps) {
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (position: Position) => {
    setSelectedPosition(position);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay clearing the position to allow for exit animation
    setTimeout(() => setSelectedPosition(null), 300);
  };

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
      <OpenPositions onViewDetails={handleViewDetails} />

      {/* Agency Panel */}
      <AgencyPanel />

      {/* Interview Timeline */}
      <InterviewTimeline />

      {/* Footer CTA */}
      <FooterCTA />

      {/* Role Details Modal */}
      <RoleDetailsModal
        position={selectedPosition}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

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
