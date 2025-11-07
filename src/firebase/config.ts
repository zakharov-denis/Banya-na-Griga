import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import type { FirebaseApp } from 'firebase/app';
import type { Analytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6dT3ltnAZuvh_yCTO7bk-9BLLpgQQ-U8",
  authDomain: "banya-na-griga.firebaseapp.com",
  projectId: "banya-na-griga",
  storageBucket: "banya-na-griga.firebasestorage.app",
  messagingSenderId: "415000304963",
  appId: "1:415000304963:web:8d5104ed4fd1b3c0d723f6",
  measurementId: "G-CVQ9LV68CR"
};

// Initialize Firebase
export const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Analytics (only in browser environment)
export const initAnalytics = async (): Promise<Analytics | null> => {
  if (typeof window !== 'undefined') {
    const supported = await isSupported();
    if (supported) {
      return getAnalytics(app);
    }
  }
  return null;
};

