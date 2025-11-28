import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { TrustSection } from '../components/TrustSection';
import { Services } from '../components/Services';
import { GiftSection } from '../components/GiftSection';
import { PromotionsSection } from '../components/PromotionsSection';
import { GallerySection } from '../components/GallerySection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FAQSection } from '../components/FAQSection';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { VacanciesPage } from '../components/VacanciesPage';
import { BookingWidget } from '../components/booking/BookingWidget';
import { AboutUsPage } from '../components/AboutUsPage';
import { CookieConsent } from '../components/CookieConsent';
import { EventPackagesSection } from '../components/EventPackagesSection';
import { LegalDocuments } from '../components/LegalDocuments';
import { PricingPage } from '../components/PricingPage';
import { BlogsPage } from '../components/BlogsPage';
import { RequestQuoteModal } from '../components/RequestQuoteModal';
import { CancellationPolicyPage } from '../components/CancellationPolicyPage';
import { VKWidgetModal } from '../components/VKWidgetModal';
import { Toaster } from '../components/ui/sonner';
import { openYClientsWidget } from './utils/yclients';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'vacancies' | 'about-us' | 'pricing' | 'blogs' | 'cancellation'>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [shouldHighlightFirst, setShouldHighlightFirst] = useState(false);
  const [scrollToSection, setScrollToSection] = useState<string | null>(null);
  const [legalDocOpen, setLegalDocOpen] = useState<{ isOpen: boolean; docType: 'offer' | 'privacy' }>({
    isOpen: false,
    docType: 'privacy'
  });
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedPackageType, setSelectedPackageType] = useState('');
  const [isVKWidgetOpen, setIsVKWidgetOpen] = useState(false);

  // Handle scrolling to sections after navigation
  useEffect(() => {
    if (currentPage === 'home' && scrollToSection) {
      // Small delay to ensure page has rendered
      setTimeout(() => {
        if (scrollToSection === 'TOP') {
          // Scroll to top of page
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          // Scroll to specific section
          const element = document.querySelector(scrollToSection);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
        setScrollToSection(null);
      }, 100);
    }
  }, [currentPage, scrollToSection]);

  const handleNavigateToHomeWithScroll = (sectionId?: string) => {
    setCurrentPage('home');
    // If no section provided, scroll to top
    setScrollToSection(sectionId || 'TOP');
  };

  const handleBookFromAbout = () => {
    // Open YClients widget
    setTimeout(() => {
      openYClientsWidget();
    }, 100);
  };

  const handleRequestQuote = (packageType: string) => {
    setSelectedPackageType(packageType);
    setIsQuoteModalOpen(true);
  };

  // Global booking handler - opens YClients widget
  const handleBookSession = () => {
    // Wait a bit for YClients script to initialize, then open widget
    setTimeout(() => {
      openYClientsWidget();
    }, 100);
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Conditional Page Rendering */}
      {currentPage === 'home' ? (
        <>
          <Header
            onNavigateToCareers={() => setCurrentPage('vacancies')}
            onNavigateToAbout={() => setCurrentPage('about-us')}
            onNavigateToBlogs={() => setIsVKWidgetOpen(true)}
            onNavigateToHome={() => setCurrentPage('home')}
            onBookSession={handleBookSession}
            onNavigateToHomeWithScroll={handleNavigateToHomeWithScroll}
            currentPage={currentPage}
          />
          <Hero
            backgroundImage="/images/gallery/glavnaya.jpg"
            onBookSession={handleBookSession}
          />
          <TrustSection />
          <Services onNavigateToPricing={() => setCurrentPage('pricing')} />
          <EventPackagesSection onRequestQuote={handleRequestQuote} />
          <GallerySection />
          <GiftSection />
          <PromotionsSection onBookSession={handleBookSession} />
          <TestimonialsSection />
          <FAQSection />
          <ContactSection onBookSession={handleBookSession} />
          <Footer
            onNavigateToCareers={() => setCurrentPage('vacancies')}
            onOpenLegalDoc={(docType) => setLegalDocOpen({ isOpen: true, docType })}
            onOpenCancellationPolicy={() => setCurrentPage('cancellation')}
          />
        </>
      ) : currentPage === 'vacancies' ? (
        <VacanciesPage
          onNavigateToHome={() => setCurrentPage('home')}
          onNavigateToHomeWithScroll={handleNavigateToHomeWithScroll}
          onNavigateToAbout={() => setCurrentPage('about-us')}
          onNavigateToBlogs={() => setCurrentPage('blogs')}
          onBookSession={handleBookSession}
        />
      ) : currentPage === 'pricing' ? (
        <PricingPage
          onNavigateToHome={() => setCurrentPage('home')}
          onNavigateToHomeWithScroll={handleNavigateToHomeWithScroll}
          onNavigateToAbout={() => setCurrentPage('about-us')}
          onNavigateToBlogs={() => setCurrentPage('blogs')}
          onNavigateToCareers={() => setCurrentPage('vacancies')}
          onBookNow={() => {
            // Open YClients widget
            setTimeout(() => {
              openYClientsWidget();
            }, 100);
          }}
        />
      ) : currentPage === 'blogs' ? (
        <BlogsPage
          onNavigateToHome={() => setCurrentPage('home')}
          onNavigateToHomeWithScroll={handleNavigateToHomeWithScroll}
          onNavigateToAbout={() => setCurrentPage('about-us')}
          onNavigateToCareers={() => setCurrentPage('vacancies')}
          onBookSession={handleBookSession}
        />
      ) : currentPage === 'cancellation' ? (
        <CancellationPolicyPage onClose={() => setCurrentPage('home')} />
      ) : (
        <AboutUsPage
          onNavigateToHome={() => setCurrentPage('home')}
          onBookSession={handleBookFromAbout}
          onNavigateToCareers={() => setCurrentPage('vacancies')}
          onOpenLegalDoc={(docType) => setLegalDocOpen({ isOpen: true, docType })}
        />
      )}

      {/* Booking Widget Modal */}
      <BookingWidget
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setShouldHighlightFirst(false);
        }}
        shouldHighlightFirst={shouldHighlightFirst}
        onOpenLegalDoc={(docType) => setLegalDocOpen({ isOpen: true, docType })}
        onOpenCancellationPolicy={() => {
          setIsBookingOpen(false);
          setCurrentPage('cancellation');
        }}
      />

      {/* Cookie Consent Banner */}
      <CookieConsent />

      {/* Legal Documents Modal */}
      <LegalDocuments
        isOpen={legalDocOpen.isOpen}
        onClose={() => setLegalDocOpen({ ...legalDocOpen, isOpen: false })}
        documentType={legalDocOpen.docType}
      />

      {/* Request Quote Modal */}
      <RequestQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        packageType={selectedPackageType}
      />

      {/* VK Widget Modal */}
      <VKWidgetModal
        isOpen={isVKWidgetOpen}
        onClose={() => setIsVKWidgetOpen(false)}
      />

      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}
