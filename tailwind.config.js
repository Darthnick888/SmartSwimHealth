/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0f172a",
        sky: "#38bdf8",
        mint: "#7dd3fc",
        stone: "#94a3b8"
      }
    }
  },
  plugins: []
};
