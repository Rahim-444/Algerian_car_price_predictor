/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D2071",
        background: "#03092D",
        Purple: "#902BAD",
        Blue: "#3F78E1",
      },
      borderWidth: {
        10: "10px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
