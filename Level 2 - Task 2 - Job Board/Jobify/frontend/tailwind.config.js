/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: "#5d33d3",
        secondary: "#9677ef",
        accent: "#7546fa",
        text: "#0d0a15",
        bg: "#f8f6fc",
        para: "",
      },
      backgroundImage: {
        "banner": "linear-gradient(to bottom left ,rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.9)), url('./assets/banner.jpg')",
      },
    },
  },
  plugins: [],
}

