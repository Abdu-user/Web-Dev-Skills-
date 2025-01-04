/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,vue}",
    "./public/index.html", // Include this if you're using an HTML file
  ],
  theme: {
    extend: {
      colors: {
        "vue-color": "#4CAF50",
        "secondary-color": "#FFC107",
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
