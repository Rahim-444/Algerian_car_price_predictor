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
        ternary: "#1C23C5",
        background: "#03092D",
        Purple: "#902BAD",
        Blue: "#3F78E1",
        CardBlue: "#141545",
      },
      borderWidth: {
        10: "10px",
      },
      boxShadow: {
        "custom-light": "0 0 10px #ffffff, 0 0 20px #ffffff",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
