/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-beige': '#F5F5F0',
        'brand-gold': '#C8A165',
        'brand-dark': '#1F1F1F',
        'brand-gray': '#F2F2F2',
      }
    },
  },
  plugins: [],
}