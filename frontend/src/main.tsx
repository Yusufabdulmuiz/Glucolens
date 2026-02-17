import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// ----------------------------------------------------------------------
// CONFIGURATION IMPORTS
// ----------------------------------------------------------------------
import './lib/i18n'; // <--- NEW: Loads translation logic

// ----------------------------------------------------------------------
// MOCK ADAPTER LOADER
// ----------------------------------------------------------------------
// Logic: Load the mock database if we are in:
// 1. Development Mode (Localhost)
// 2. Production Mode BUT with the "VITE_USE_MOCK" flag set to true (Cloudflare Preview)
if (import.meta.env.DEV || import.meta.env.VITE_USE_MOCK === 'true') {
  import('./services/mock/mockAdapter');
  console.log('⚠️ [System] Mock Adapter Loaded. Using fake data.');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
