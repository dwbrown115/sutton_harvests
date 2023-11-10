/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        18.677: "19.332px",
        1.1: "-1px",
        2.6665: "2.6665px",
      },
      colors: {
        "red": "#FF0000",
        "blue": "#0000FF",
        "purple": "#800080",
      }
    },
  },
  plugins: [],
};