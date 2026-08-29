/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#121212',
        'surface-dim': '#0c0605',
        'surface-container': '#1a0e0c',
        'surface-container-high': '#281512',
        'surface-container-highest': '#361b17',
        primary: '#E60000',
        'primary-hover': '#FF1A1A',
        'primary-container': '#980000',
        'primary-dim': '#690000',
        'on-primary': '#ffffff',
        secondary: '#ffb4a8',
        'on-surface': '#ffdad4',
        'on-surface-variant': '#e9bcb5',
        'on-surface-muted': '#9e807c',
        outline: '#382220',
        'outline-variant': '#5f3f3a',
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'red-glow': '0 0 25px rgba(230, 0, 0, 0.35)',
        'red-glow-lg': '0 0 50px rgba(230, 0, 0, 0.5)',
        'red-glow-intense': '0 0 80px rgba(230, 0, 0, 0.65)',
        'inner-glow': 'inset 0 0 20px rgba(230, 0, 0, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-breathe': 'glowBreathe 5s ease-in-out infinite',
        'spin-slow': 'spin 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowBreathe: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.08)' },
        }
      }
    },
  },
  plugins: [],
}
