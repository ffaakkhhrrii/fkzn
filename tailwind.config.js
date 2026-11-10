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
          DEFAULT: '#FAFAF8',
          dark: '#F1F1EE',
          light: '#FFFFFF',
        },
        // Charcoal: headings and strong text
        primary: {
          DEFAULT: '#1C1C1A',
          dark: '#0F0F0E',
          light: '#3C3D37',
        },
        // Body text (7.8:1 on the page ground)
        secondary: {
          DEFAULT: '#4F4F4A',
          dark: '#3C3D37',
          light: '#6B6B68',
        },
        // Deep green: main buttons, links, key numbers only
        accent: {
          DEFAULT: '#1F5E46',
          dark: '#174A37',
          light: '#E6F0EB',
        },
        surface: {
          DEFAULT: '#F1F1EE',
          dark: '#E8E8E4',
          light: '#FFFFFF',
        },
        border: {
          DEFAULT: '#E2E2DE',
          dark: '#CFCFCA',
          light: '#EEEEEB',
        },
        text: {
          primary: '#1C1C1A',
          secondary: '#4F4F4A',
          light: '#6B6B68',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'enter': 'enter 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both',
      },
      keyframes: {
        enter: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
