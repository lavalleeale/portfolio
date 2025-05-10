module.exports = {
  darkMode: false,
  content: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {
      screens: {
        header: "1100px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
