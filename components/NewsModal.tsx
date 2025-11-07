import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar } from 'lucide-react';
import { useEffect } from 'react';

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  news: {
    headline: string;
    date: string;
    fullContent: string;
    image?: string;
  } | null;
}

export function NewsModal({ isOpen, onClose, news }: NewsModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!news) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, type: 'spring', damping: 25 }}
              className="relative w-full max-w-3xl max-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header with gradient */}
              <div className="sticky top-0 z-10 bg-gradient-to-r from-[#D4A574] to-[#CBA35A] px-6 sm:px-8 py-6">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-200 backdrop-blur-sm"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-white" />
                </button>

                <div className="pr-12">
                  {/* Date */}
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-4 h-4 text-white/90" />
                    <span className="text-sm text-white/90">{news.date}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl text-white pr-8 leading-tight">
                    {news.headline}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(85vh-140px)]">
                {/* Image (if exists) */}
                {news.image && (
                  <div className="relative h-64 sm:h-80 bg-gradient-to-br from-[#E8DFD5] to-[#F5EFE6]">
                    <img
                      src={news.image}
                      alt={news.headline}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="px-6 sm:px-8 py-8">
                  <div className="prose prose-lg max-w-none">
                    {news.fullContent.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-[#3D3226] leading-relaxed mb-6">
                        {paragraph.split('\n').map((line, lineIndex) => (
                          <span key={lineIndex}>
                            {line}
                            {lineIndex < paragraph.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent px-6 sm:px-8 py-4 border-t border-[#E8DFD5]">
                <button
                  onClick={onClose}
                  className="w-full py-3 px-6 bg-gradient-to-r from-[#D4A574] to-[#CBA35A] text-white rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  Закрыть
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
