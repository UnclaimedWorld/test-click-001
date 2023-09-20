/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.tsx'
  ],
  theme: {
    fontFamily: {
      sans: 'Montserrat, sans-serif',
      heading: 'Roboto, Montserrat, sans-serif'
    },
    extend: {
      colors: {
      },
      spacing: {
        13: '3.25rem',
        15: '3.75rem',
      },
      animation: {
        drop: 'littleMove 250ms ease-out, opacity 250ms ease-out',
        dropOut: 'littleMoveReverse 250ms ease-out forwards, opacityReverse 250ms ease-out forwards'
      },
      keyframes: {
        littleMove: {
          '0%': { transform: 'translateY(-32px)' },
          '100%': { transform: 'translateY(0px)' }
        },
        opacity: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        littleMoveReverse: {
          '100%': { transform: 'translateY(-32px)' },
          '0%': { transform: 'translateY(0px)' }
        },
        opacityReverse: {
          '100%': { opacity: '0' },
          '0%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}

