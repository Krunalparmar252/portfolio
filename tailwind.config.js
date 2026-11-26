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
          DEFAULT: '#050714',
          raise: '#0c1126',
        },
        surface: 'rgba(14, 20, 44, 0.55)',
        line: 'rgba(255, 255, 255, 0.09)',
        ivory: '#f8f7f4',
        cream: {
          DEFAULT: '#f6efe2',
          soft: '#faecd6',
          muted: '#dcd1c0',
        },
        muted: '#94a3b8',
        royal: {
          DEFAULT: '#3b82f6',
          deep: '#1d4ed8',
          vivid: '#2563eb',
          soft: '#60a5fa',
          glow: 'rgba(59, 130, 246, 0.35)',
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
