/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        apple: {
          blue: '#007AFF',
          'blue-light': '#E8F2FF',
          green: '#34C759',
          'green-light': '#E8F8ED',
          orange: '#FF9500',
          'orange-light': '#FFF3E0',
          red: '#FF3B30',
          'red-light': '#FFE8E6',
          purple: '#AF52DE',
          'purple-light': '#F0E6F9',
          pink: '#FF2D55',
          'pink-light': '#FFE8EE',
          teal: '#5AC8FA',
          'teal-light': '#E6F7FF',
          yellow: '#FFCC00',
          'yellow-light': '#FFF8E0',
          gray: {
            50: '#F5F5F7',
            100: '#E8E8ED',
            200: '#D2D2D7',
            300: '#AEAEB2',
            400: '#8E8E93',
            500: '#636366',
            600: '#48484A',
            700: '#363639',
            800: '#1C1C1E',
            900: '#121213',
          }
        }
      },
      fontFamily: {
        sans: ['Segoe UI', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        heading: ['Segoe UI', '-apple-system', 'system-ui', 'sans-serif'],
        body: ['Segoe UI', '-apple-system', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        normal: '450',
        medium: '550',
        semibold: '650',
        bold: '720',
      },
      backgroundImage: {
        'apple-gradient-blue': 'linear-gradient(135deg, #007AFF 0%, #5856D6 100%)',
        'apple-gradient-green': 'linear-gradient(135deg, #34C759 0%, #30B350 100%)',
        'apple-gradient-orange': 'linear-gradient(135deg, #FF9500 0%, #FF6B00 100%)',
        'apple-gradient-red': 'linear-gradient(135deg, #FF3B30 0%, #D63031 100%)',
        'apple-gradient-purple': 'linear-gradient(135deg, #AF52DE 0%, #8944C2 100%)',
        'apple-gradient-multi': 'linear-gradient(135deg, #007AFF 0%, #AF52DE 50%, #FF2D55 100%)',
        'apple-glass': 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 100%)',
      },
      boxShadow: {
        'apple-sm': '0 1px 3px rgba(0,0,0,0.08)',
        'apple-md': '0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'apple-lg': '0 4px 24px rgba(0,0,0,0.08)',
        'apple-xl': '0 8px 40px rgba(0,0,0,0.1)',
        'apple-inner': 'inset 0 1px 0 rgba(255,255,255,0.8)',
      },
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
