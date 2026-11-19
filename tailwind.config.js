/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Every color is a CSS variable (RGB channels) set in index.css, so
      // light and dark themes swap in one place and /opacity modifiers still work.
      colors: {
        background: {
          DEFAULT: 'rgb(var(--c-bg) / <alpha-value>)',
          dark: 'rgb(var(--c-bg-dark) / <alpha-value>)',
          light: 'rgb(var(--c-bg-light) / <alpha-value>)',
        },
        // Charcoal (light) / near-white (dark): headings and strong text
        primary: {
          DEFAULT: 'rgb(var(--c-primary) / <alpha-value>)',
          dark: 'rgb(var(--c-primary-dark) / <alpha-value>)',
          light: 'rgb(var(--c-primary-light) / <alpha-value>)',
        },
        // Body text
        secondary: {
          DEFAULT: 'rgb(var(--c-secondary) / <alpha-value>)',
          dark: 'rgb(var(--c-secondary-dark) / <alpha-value>)',
          light: 'rgb(var(--c-secondary-light) / <alpha-value>)',
        },
        // Deep green: main buttons, links, key numbers only
        accent: {
          DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)',
          dark: 'rgb(var(--c-accent-dark) / <alpha-value>)',
          light: 'rgb(var(--c-accent-light) / <alpha-value>)',
        },
        // Text on a solid accent fill
        'on-accent': 'rgb(var(--c-on-accent) / <alpha-value>)',
        surface: {
          DEFAULT: 'rgb(var(--c-surface) / <alpha-value>)',
          dark: 'rgb(var(--c-surface-dark) / <alpha-value>)',
          light: 'rgb(var(--c-surface-light) / <alpha-value>)',
        },
        // Raised panels and alternating section bands (white in light mode)
        card: 'rgb(var(--c-card) / <alpha-value>)',
        // The closing contact band: dark in both themes, text stays white
        inverse: 'rgb(var(--c-inverse) / <alpha-value>)',
        border: {
          DEFAULT: 'rgb(var(--c-border) / <alpha-value>)',
          dark: 'rgb(var(--c-border-dark) / <alpha-value>)',
          light: 'rgb(var(--c-border-light) / <alpha-value>)',
        },
        text: {
          primary: 'rgb(var(--c-primary) / <alpha-value>)',
          secondary: 'rgb(var(--c-secondary) / <alpha-value>)',
          light: 'rgb(var(--c-secondary-light) / <alpha-value>)',
        },
      },
      // Focus-ring gap matches the page instead of always white
      ringOffsetColor: {
        DEFAULT: 'rgb(var(--c-bg))',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'enter': 'enter 0.6s cubic-bezier(0.2, 0.7, 0.2, 1) both',
        'swap': 'swap 150ms cubic-bezier(0.23, 1, 0.32, 1) both',
        'spin-in': 'spin-in 200ms cubic-bezier(0.23, 1, 0.32, 1) both',
      },
      keyframes: {
        'spin-in': {
          '0%': { transform: 'rotate(-90deg) scale(0.8)', opacity: '0' },
          '100%': { transform: 'rotate(0) scale(1)', opacity: '1' },
        },
        swap: {
          '0%': { transform: 'translateY(4px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        enter: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
