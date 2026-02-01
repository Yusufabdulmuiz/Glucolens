/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6', // Brand Blue
          600: '#2563eb',
          700: '#1d4ed8',
        },
        risk: {
          low: '#10b981',    // Emerald
          medium: '#f59e0b', // Amber
          high: '#ef4444',   // Red
        },
        surface: {
          ground: '#f3f4f6', // Light Gray Background
          card: '#ffffff',   // White Card
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}