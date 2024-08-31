/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nerkoone: ["Nerko One", "cursive"],
        newamsterdam: ["New Amsterdam", "sans-serif"]
      }
    },
  },
  plugins: [],
}