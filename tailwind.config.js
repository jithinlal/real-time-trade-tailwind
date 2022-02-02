module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lobster Two", "cursive"],
        serif: ["Lobster Two", "cursive"],
      },
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
