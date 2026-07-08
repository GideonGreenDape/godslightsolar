/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            50: '#eafaf1',
            100: '#c8f0d9',
            200: '#8fdcb1',
            300: '#54c286',
            400: '#279d63',
            500: '#0f7a49',
            600: '#0b5f3a',
            700: '#0b3d2e',
            800: '#082e23',
            900: '#051d16',
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
