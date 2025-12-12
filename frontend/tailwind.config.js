/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#6f3cff",
          yellow: "#ffcc00",
          dark: "#0f172a",
          light: "#f8fafc",
          accent: "#38bdf8"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif']
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'neon': '0 0 10px rgba(111, 60, 255, 0.5), 0 0 20px rgba(111, 60, 255, 0.3)'
      }
    },
  },
  plugins: [],
};
