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
      },
      maxWidth: {
        'content': '1280px',
      },
      spacing: {
        'section': '140px',
      }
    },
  },
  plugins: [],
}
