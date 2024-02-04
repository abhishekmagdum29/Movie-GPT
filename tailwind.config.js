/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        anim: {
          "100%": { height: "100%" },
        },
      },
    },
  },
  plugins: [],
};
