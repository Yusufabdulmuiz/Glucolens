/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Brand Colors (Royal Blue)
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6', // Standard Action Blue
          600: '#2563eb', // Hover State
          700: '#1d4ed8', // Active State
        },
        // Risk Level Colors
        risk: {
          low: '#10b981',    // Emerald-500
          medium: '#f59e0b', // Amber-500
          high: '#ef4444',   // Red-500
        },
        // Neutral Backgrounds
        surface: {
          ground: '#f3f4f6', // Page Background
          card: '#ffffff',   // Card Background
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        // Soft, diffused shadow for the "Medical Clean" look
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}