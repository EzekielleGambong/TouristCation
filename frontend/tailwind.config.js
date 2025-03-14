import fluid, { extract, screens, fontSize } from "fluid-tailwind";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ["./src/**/*.{html,js}"],
    extract,
  },
  theme: {
    extend: {},
    screens,
    fontSize,
  },
  plugins: [fluid, require("@tailwindcss/forms")],
};
