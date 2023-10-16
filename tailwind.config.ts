/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#e5e7eb",
        secondary: "#1e293b",
      },
      fontFamily: {
        primary: ["Montserrat", "sans"],
        secondary: ["Open Sans", "sans"],
      },
    },
  },
  plugins: [],
};
