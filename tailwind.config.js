/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['DM Sans', 'sans-serif'] },
      borderRadius: {
        'none': '0',
        'sm':   '0',
        DEFAULT: '0',
        'md':   '0',
        'lg':   '0',
        'xl':   '0',
        '2xl':  '0',
        '3xl':  '0',
        'full': '0',
      }
    }
  },
  plugins: []
}
