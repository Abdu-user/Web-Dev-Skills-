/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,vue}",
    "./public/index.html", // Include this if you're using an HTML file
  ],
  theme: {
    extend: {
      colors: {
        "vue-color": "#28a745",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
