const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        gray: {
          300: "#E3E3E4",
          400: "#C4C4C4",
          600: "#828282",
          800: "#242424",
        },
        red: {
          400: "#E84C3D",
          500: "#D34C2E",
        },
        blue: {
          700: "#24588F",
        },
        green: {
          300: "#66D1AF",
        },
        yellow: {
          400: "#F69E30",
          500: "#F3922E",
        },
        "advertial-indigo": "#4F46E5",
        "advertial-blue": "#2296f3",
        "advertial-gray": "#F0EFF5",
        "advertial-navy-blue": "#1F2631",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
