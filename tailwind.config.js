/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      colors: {
        cafe: {
          50:  '#fdf8f2',
          100: '#f5ece0',
          200: '#e8d5bc',
          300: '#d4b896',
          400: '#c09a6e',
          500: '#a67c52',
          600: '#8b6340',
          700: '#6e4e32',
          800: '#3d2b1a',
          900: '#1e1409',
        }
      }
    }
  },
  plugins: []
}
