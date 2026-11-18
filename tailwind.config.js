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
          DEFAULT: '#07060d',
          raise: '#0e0c1a',
        },
        surface: 'rgba(20, 17, 36, 0.45)',
        line: 'rgba(255, 255, 255, 0.08)',
        ivory: '#f4efe4',
        muted: '#a59fb8',
        gold: {
          DEFAULT: '#c9a45c',
          soft: '#e6cf9a',
          dark: '#8b6f33',
        },
        royal: '#3b2a8c',
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
