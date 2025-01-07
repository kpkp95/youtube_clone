/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#1DA1F2", // Example primary color
        secondary: "#14171A", // Example secondary color
      },
      screens: {
        xs: "400px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "md-lg": "900px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
