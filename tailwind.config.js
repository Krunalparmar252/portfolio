/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#080807',
          raise: '#12110f',
        },
        surface: 'rgba(20, 19, 16, 0.65)',
        line: 'rgba(255, 255, 255, 0.09)',
        ivory: '#f5f2eb',
        cream: {
          DEFAULT: '#e8dfd0',
          soft: '#f2eadc',
          muted: '#b5ab99',
        },
        muted: '#9a9488',
        royal: {
          DEFAULT: '#d8ceb8',
          deep: '#9e927c',
          vivid: '#e5dbc7',
          soft: '#e8dfd0',
          glow: 'rgba(216, 206, 184, 0.32)',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Inter Tight"', 'Manrope', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"ThreeUI Fragment Mono"', '"Fragment Mono"', 'ui-monospace', 'monospace'],
        funky: ['"Syne"', '"Unbounded"', 'sans-serif'],
        chrome: ['"Unbounded"', '"Syne"', 'sans-serif'],
      },
      maxWidth: {
        'content': '1280px',
      },
      spacing: {
        'section': '140px',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-16px) rotate(2deg)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(14px) rotate(-2deg)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.04)' },
        },
        'scroll-pill': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '70%': { transform: 'translateY(8px)', opacity: '0.2' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        radar: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'float-reverse': 'float-reverse 6s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'scroll-pill': 'scroll-pill 1.8s ease-in-out infinite',
        radar: 'radar 3s linear infinite',
        shimmer: 'shimmer 4s linear infinite',
      },
    },
  },
  plugins: [],
}
