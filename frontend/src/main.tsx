/**
 * @file src/main.tsx
 * @description Application Entry Point
 */

// 1. IMPORT MOCK ADAPTER FIRST (Only in Dev)
// This ensures that if we are in development, the API interceptors are attached
// before any React components try to fetch data.
if (import.meta.env.DEV) {
  import('@/services/mock/mockAdapter');
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);