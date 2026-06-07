/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ydl: {
          yellow: '#D4AF34',
          'yellow-light': '#E8C84A',
          'yellow-dark': '#B8942A',
          dark: '#0A0A0A',
          'dark-card': 'rgba(255, 255, 255, 0.03)',
          'dark-card-hover': 'rgba(255, 255, 255, 0.06)',
          'dark-border': 'rgba(212, 175, 52, 0.15)',
          'dark-border-hover': 'rgba(212, 175, 52, 0.3)',
          surface: '#111111',
          'surface-light': '#1A1A1A',
          muted: '#888888',
          'muted-light': '#AAAAAA',
        },
      },
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        body: ['Nunito Sans', 'sans-serif'],
        accent: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'ydl-gradient':
          'linear-gradient(135deg, #D4AF34 0%, #B8942A 50%, #8C6E1A 100%)',
        'ydl-glow':
          'radial-gradient(ellipse at center, rgba(212, 175, 52, 0.15) 0%, transparent 70%)',
        'ydl-card-gradient':
          'linear-gradient(180deg, rgba(212, 175, 52, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
      },
      boxShadow: {
        'ydl-gold': '0 0 20px rgba(212, 175, 52, 0.15)',
        'ydl-gold-lg': '0 0 40px rgba(212, 175, 52, 0.2)',
        'ydl-card': '0 4px 24px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'ticker': 'ticker 30s linear infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
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
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 52, 0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 52, 0.3)' },
        },
      },
    },
  },
  plugins: [],
}
