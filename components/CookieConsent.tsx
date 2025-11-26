import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, Shield, Settings, X } from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';

interface CookiePreferences {
  essential: boolean;
  performance: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

const defaultPreferences: CookiePreferences = {
  essential: true,
  performance: false,
  functional: false,
  analytics: false,
  marketing: false,
};

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);

  useEffect(() => {
    const consent = localStorage.getItem('banya-cookie-consent');
    const consentDate = localStorage.getItem('banya-cookie-consent-date');

    // Temporarily force show for testing
    setTimeout(() => setShowBanner(true), 1000);

    /* Original logic - commented for testing
    if (!consent) {
      setTimeout(() => setShowBanner(true), 2000);
    } else {
      if (consentDate) {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        const consentDateObj = new Date(consentDate);
        
        if (consentDateObj < sixMonthsAgo) {
          setTimeout(() => setShowBanner(true), 2000);
        }
      }
      
      try {
        const savedPreferences = JSON.parse(consent);
        setPreferences({ ...defaultPreferences, ...savedPreferences });
      } catch (e) {
        setTimeout(() => setShowBanner(true), 1000);
      }
    }
    */
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      performance: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    saveConsent(allAccepted);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
    setShowModal(false);
  };

  const saveConsent = (prefs: CookiePreferences) => {
    localStorage.setItem('banya-cookie-consent', JSON.stringify(prefs));
    localStorage.setItem('banya-cookie-consent-date', new Date().toISOString());
    setPreferences(prefs);
    setShowBanner(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return;
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <>
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed bottom-4 left-4 z-50 w-full max-w-[380px]"
          >
            <div className="w-full">
              <div className="relative bg-[#F5F0E8]/70 backdrop-blur-[10px] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-3 sm:p-4">
                <button
                  onClick={() => setShowBanner(false)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full hover:bg-[#E4D7C4]/50 flex items-center justify-center transition-colors duration-200 z-10"
                >
                  <X className="w-4 h-4 text-[#3D3226]" />
                </button>
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="flex-shrink-0 text-xl sm:text-2xl mt-0.5">
                    🍪
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#3D3226] text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                      Мы ценим вашу конфиденциальность. Используем cookie для улучшения вашего опыта и персонализации предложений.
                    </p>
                    <div className="flex justify-center">
                      <Button
                        onClick={handleAcceptAll}
                        className="bg-gradient-to-r from-[#d8b272] to-[#c59f6d] text-white hover:from-[#c5a061] hover:to-[#b38e5c] shadow-sm transition-all duration-300 rounded-lg h-8 sm:h-9 text-xs sm:text-sm px-8"
                      >
                        Принять все
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-[#3D3226]/60 backdrop-blur-sm z-50"
              onClick={() => setShowModal(false)}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto border-2 border-[#D4AF37]/20"
              >
                <div className="sticky top-0 bg-white border-b border-[#F5E6D3] p-6 rounded-t-3xl z-10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37]/10 to-[#F5E6D3]/30 flex items-center justify-center">
                        <Settings className="w-5 h-5 text-[#D4AF37]" />
                      </div>
                      <h2 className="text-[#3D3226]">Настройки Cookie</h2>
                    </div>
                    <button
                      onClick={() => setShowModal(false)}
                      className="w-8 h-8 rounded-full hover:bg-[#F5E6D3]/50 flex items-center justify-center transition-colors duration-200"
                    >
                      <X className="w-5 h-5 text-[#3D3226]" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  <p className="text-[#3D3226]/70">
                    Управляйте настройками файлов cookie ниже. Необходимые cookie требуются для работы сайта и не могут быть отключены.
                  </p>

                  <CookieCategory
                    icon={<Shield className="w-5 h-5" />}
                    title="Необходимые Cookie"
                    description="Требуются для базовой функциональности сайта, безопасности и аутентификации пользователей. Не могут быть отключены."
                    enabled={preferences.essential}
                    onToggle={() => { }}
                    locked
                  />

                  <CookieCategory
                    icon={<Cookie className="w-5 h-5" />}
                    title="Cookie производительности"
                    description="Помогают нам понять, как посетители взаимодействуют с нашим сайтом, собирая анонимные данные."
                    enabled={preferences.performance}
                    onToggle={() => togglePreference('performance')}
                  />

                  <CookieCategory
                    icon={<Settings className="w-5 h-5" />}
                    title="Функциональные Cookie"
                    description="Обеспечивают расширенную функциональность и персонализацию, например, запоминание ваших предпочтений."
                    enabled={preferences.functional}
                    onToggle={() => togglePreference('functional')}
                  />

                  <CookieCategory
                    icon={<Cookie className="w-5 h-5" />}
                    title="Аналитические Cookie"
                    description="Позволяют анализировать использование сайта и улучшать наши услуги на основе поведения посетителей."
                    enabled={preferences.analytics}
                    onToggle={() => togglePreference('analytics')}
                  />

                  <CookieCategory
                    icon={<Cookie className="w-5 h-5" />}
                    title="Маркетинговые Cookie"
                    description="Используются для показа персонализированной рекламы и рекламного контента, релевантного для вас."
                    enabled={preferences.marketing}
                    onToggle={() => togglePreference('marketing')}
                  />
                </div>

                <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent border-t border-[#F5E6D3] p-6 rounded-b-3xl">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleSavePreferences}
                      className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#F5E6D3] text-[#3D3226] hover:from-[#C5A028] hover:to-[#E6D7C4] shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                    >
                      Сохранить настройки
                    </Button>
                    <Button
                      onClick={handleAcceptAll}
                      className="flex-1 bg-[#3D3226] text-white hover:bg-[#4D4236] transition-all duration-300 rounded-xl"
                    >
                      Принять все
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

interface CookieCategoryProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  locked?: boolean;
}

function CookieCategory({ icon, title, description, enabled, onToggle, locked }: CookieCategoryProps) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-2xl border border-[#F5E6D3] hover:border-[#D4AF37]/30 transition-colors duration-300 bg-gradient-to-br from-white to-[#F5E6D3]/10">
      <div className="flex-shrink-0 mt-1">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37]/10 to-[#F5E6D3]/30 flex items-center justify-center text-[#D4AF37]">
          {icon}
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[#3D3226] mb-1">{title}</h4>
        <p className="text-sm text-[#3D3226]/60">{description}</p>
      </div>
      <div className="flex-shrink-0">
        {locked ? (
          <div className="px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs">
            Всегда активно
          </div>
        ) : (
          <Switch
            checked={enabled}
            onCheckedChange={onToggle}
            className="data-[state=checked]:bg-[#D4AF37]"
          />
        )}
      </div>
    </div>
  );
}