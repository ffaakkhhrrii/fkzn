/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#F5F5F4',
          light: '#FFFFFF',
        },
        primary: {
          DEFAULT: '#3C3D37',
          dark: '#2A2B26',
          light: '#5C5D55',
        },
        secondary: {
          DEFAULT: '#6B6B68',
          dark: '#4A4A48',
          light: '#8A8A88',
        },
        accent: {
          DEFAULT: '#3C3D37',
          dark: '#2A2B26',
          light: '#5C5D55',
        },
        surface: {
          DEFAULT: '#F5F5F4',
          dark: '#EBEBE9',
          light: '#FFFFFF',
        },
        border: {
          DEFAULT: '#E5E5E3',
          dark: '#D5D5D3',
          light: '#F0F0EE',
        },
        text: {
          primary: '#1C1C1A',
          secondary: '#6B6B68',
          light: '#9A9A98',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(60, 61, 55, 0.1), 0 0 10px rgba(107, 107, 104, 0.08)' },
          '100%': { boxShadow: '0 0 10px rgba(60, 61, 55, 0.18), 0 0 20px rgba(107, 107, 104, 0.12)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
