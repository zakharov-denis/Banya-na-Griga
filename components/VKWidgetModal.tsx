import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface VKWidgetModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Declare VK on window object
declare global {
    interface Window {
        VK?: {
            init: (params: { apiId: number; onlyWidgets: boolean }) => void;
            Widgets: {
                Group: (elementId: string, options: any, groupId: number) => void;
            };
        };
    }
}

export function VKWidgetModal({ isOpen, onClose }: VKWidgetModalProps) {
    useEffect(() => {
        if (isOpen && window.VK) {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                try {
                    if (window.VK) {
                        window.VK.Widgets.Group("vk_groups", {
                            mode: 4,
                            wide: 1,
                            height: 600,
                            width: "auto",
                            color1: "FAF7F2",
                            color2: "3D3226",
                            color3: "D4A574"
                        }, 234208867);
                    }
                } catch (error) {
                    console.error('Error initializing VK widget:', error);
                }
            }, 100);
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-[#3D3226]/60 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden pointer-events-auto border-2 border-[#D4AF37]/20"
                        >
                            {/* Header */}
                            <div className="sticky top-0 bg-white border-b border-[#F5E6D3] p-6 rounded-t-3xl z-10">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-semibold text-[#3D3226]">Новости ВКонтакте</h2>
                                    <button
                                        onClick={onClose}
                                        className="w-8 h-8 rounded-full hover:bg-[#F5E6D3]/50 flex items-center justify-center transition-colors duration-200"
                                    >
                                        <X className="w-5 h-5 text-[#3D3226]" />
                                    </button>
                                </div>
                            </div>

                            {/* VK Widget Container */}
                            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                                <div id="vk_groups" className="w-full"></div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
