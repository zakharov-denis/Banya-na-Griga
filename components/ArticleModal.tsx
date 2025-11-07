import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Tag } from 'lucide-react';
import { useEffect } from 'react';

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: {
    title: string;
    date: string;
    fullContent: string;
    tags: string[];
  } | null;
}

export function ArticleModal({ isOpen, onClose, article }: ArticleModalProps) {
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

  if (!article) return null;

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
              className="relative w-full max-w-4xl max-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden pointer-events-auto"
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
                    <span className="text-sm text-white/90">{article.date}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl text-white pr-8 leading-tight">
                    {article.title}
                  </h2>
                </div>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(85vh-140px)] px-6 sm:px-8 py-8">
                <div className="prose prose-lg max-w-none">
                  {article.fullContent.split('\n\n').map((paragraph, index) => (
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

                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t border-[#E8DFD5]">
                    <div className="flex items-center gap-2 mb-3">
                      <Tag className="w-4 h-4 text-[#CBA35A]" />
                      <span className="text-sm text-[#7A5C47]">Теги</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-[#FAF7F2] to-[#F5EFE6] text-[#7A5C47] text-sm rounded-full border border-[#E8DFD5]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
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
