import { logEvent, type Analytics } from 'firebase/analytics';
import { initAnalytics } from './config';

let analyticsInstance: Analytics | null = null;

// Initialize analytics instance
export const getAnalyticsInstance = async (): Promise<Analytics | null> => {
  if (!analyticsInstance) {
    analyticsInstance = await initAnalytics();
  }
  return analyticsInstance;
};

// Track custom events
export const trackEvent = async (
  eventName: string,
  eventParams?: Record<string, any>
): Promise<void> => {
  const analytics = await getAnalyticsInstance();
  if (analytics) {
    logEvent(analytics, eventName, eventParams);
  }
};

// Common event tracking functions
export const trackPageView = async (pageName: string): Promise<void> => {
  await trackEvent('page_view', { page_name: pageName });
};

export const trackButtonClick = async (buttonName: string, location?: string): Promise<void> => {
  await trackEvent('button_click', { button_name: buttonName, location });
};

export const trackFormSubmit = async (formName: string): Promise<void> => {
  await trackEvent('form_submit', { form_name: formName });
};

export const trackBookingStart = async (): Promise<void> => {
  await trackEvent('booking_start');
};

export const trackBookingComplete = async (saunaType?: string): Promise<void> => {
  await trackEvent('booking_complete', { sauna_type: saunaType });
};

