/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: {
            50: '#eaf0fa',
            100: '#c8d8f0',
            200: '#8faedc',
            300: '#5480c2',
            400: '#27569d',
            500: '#0f3a7a',
            600: '#0b2d5f',
            700: '#0b1f3d',
            800: '#08172e',
            900: '#050f1d',
          },
          yellow: {
            50: '#fff8e8',
            100: '#ffedc2',
            200: '#ffdb8a',
            300: '#ffc24f',
            400: '#f5a623',
            500: '#e08e0b',
            600: '#b96f08',
            700: '#8f550a',
          },
          red: {
            500: '#f34e3f',
            600: '#f02614',
          },
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(245, 166, 35, 0.25)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
