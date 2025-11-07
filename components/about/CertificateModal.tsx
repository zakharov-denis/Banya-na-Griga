'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, Download, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: {
    title: string;
    description: string;
    image: string;
    issueDate: string;
    validUntil?: string;
  } | null;
}

export function CertificateModal({ isOpen, onClose, certificate }: CertificateModalProps) {
  if (!certificate) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-4xl z-[101]"
          >
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden h-full sm:h-auto max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-[#FAF7F2] to-[#F5EFE6] px-6 sm:px-8 py-6 border-b border-[#E8DFD5]">
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm z-10"
                >
                  <X className="w-5 h-5 text-[#7A5C47]" />
                </button>

                <h2 className="text-2xl sm:text-3xl text-[#3D3226] pr-12" style={{ fontFamily: 'Georgia, serif' }}>
                  {certificate.title}
                </h2>
                <p className="text-[#7A5C47] mt-2">{certificate.description}</p>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                <div className="bg-gradient-to-br from-[#FAF7F2] to-white rounded-2xl p-4 sm:p-6 border-2 border-[#E8DFD5] mb-6">
                  <ImageWithFallback
                    src={certificate.image}
                    alt={certificate.title}
                    className="w-full h-auto rounded-xl shadow-lg"
                  />
                </div>

                {/* Certificate Details */}
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-[#FFF9F1] rounded-xl p-4">
                    <div className="text-sm text-[#7A5C47] mb-1">Issue Date</div>
                    <div className="text-[#3D3226]">{certificate.issueDate}</div>
                  </div>
                  {certificate.validUntil && (
                    <div className="bg-[#FFF9F1] rounded-xl p-4">
                      <div className="text-sm text-[#7A5C47] mb-1">Valid Until</div>
                      <div className="text-[#3D3226]">{certificate.validUntil}</div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4A574] to-[#CBA35A] text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                  <button className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-[#CBA35A] text-[#7A5C47] rounded-full hover:bg-[#FFF9F1] transition-all duration-300">
                    <ExternalLink className="w-4 h-4" />
                    <span>Verify Online</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
