/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#fdf5ef',
          100: '#fbe8d5',
          200: '#f6cdaa',
          300: '#f0ab74',
          400: '#e8833c',
          500: '#e26a1b',
          600: '#d45211',
          700: '#af3d10',
          800: '#8c3215',
          900: '#712b14',
          950: '#3d1308',
        },
        accent: {
          400: '#c2956a',
          500: '#b07d4f',
          600: '#9a6639',
        },
        surface: {
          0:   '#121210',
          50:  '#1a1a17',
          100: '#222220',
          200: '#2c2c28',
          300: '#3a3a35',
          400: '#4a4a44',
        },
        cream: {
          50:  '#faf8f5',
          100: '#f5f0ea',
          200: '#ede5d8',
          300: '#e0d3c0',
          400: '#cdb9a0',
          500: '#b89c7e',
        },
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(226, 106, 27, 0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(226, 106, 27, 0.5)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
