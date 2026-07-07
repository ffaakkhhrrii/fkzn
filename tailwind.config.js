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
          DEFAULT: '#0B0C10',
          dark: '#000000',
          light: '#1F2833',
        },
        primary: {
          DEFAULT: '#66FCF1',
          dark: '#45A29E',
          light: '#8FFDF5',
        },
        secondary: {
          DEFAULT: '#45A29E',
          dark: '#2C6E6D',
          light: '#66C7C2',
        },
        accent: {
          DEFAULT: '#66FCF1',
          dark: '#45A29E',
          light: '#8FFDF5',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#C5C6C7',
          light: '#66FCF1',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
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
          '0%': { boxShadow: '0 0 5px rgba(102, 252, 241, 0.5), 0 0 10px rgba(102, 252, 241, 0.3)' },
          '100%': { boxShadow: '0 0 10px rgba(102, 252, 241, 0.8), 0 0 20px rgba(102, 252, 241, 0.5)' },
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
