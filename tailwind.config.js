/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        res_xm: "430px",
        res_sm: "540px",
        res_md: "720px",
        res_hlg: "880px",
      },
    },
  },
  plugins: [],
});
