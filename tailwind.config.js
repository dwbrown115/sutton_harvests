/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        18.677: "19.332px",
        1.1: "-1px",
        2.6665: "2.6665px",
        "1/1": "100%",
        ".5px": "2.97px",
        "12/25": "48%",
      },
      colors: {
        red: "#FF0000",
        blue: "#0000FF",
        purple: "#800080",
        "3665f3": "#3665f3",
        sidebarGray: "#e5e5e5",
      },
      width: {
        620: "620px",
        723: "723px",
        245: "245px",
      },
      height: {
        465: "465px",
      },
      minWidth: {
        0: "0",
        "1/6": "16.666667%",
        "1/5": "20%",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        full: "100%",
      },
      padding: {
        "1/2": "50%",
      },
    },
  },
  plugins: [],
};
