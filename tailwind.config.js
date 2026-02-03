/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ireland-green': '#169b62',
        'ireland-orange': '#ff883e',
        'celtic-blue': '#0065bd',
      },
    },
  },
  plugins: [],
}