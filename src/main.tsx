import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../styles/globals.css';
import { initAnalytics } from './firebase/config';

// Initialize Firebase Analytics
initAnalytics().catch((error) => {
  console.error('Failed to initialize Firebase Analytics:', error);
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
