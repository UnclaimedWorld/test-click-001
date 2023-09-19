/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    fontFamily: {
      sans: 'sans-serif'
    },
    extend: {
      colors: {
      },
      spacing: {
        13: '3.25rem',
        15: '3.75rem',
      }
    },
  },
  plugins: [],
}

