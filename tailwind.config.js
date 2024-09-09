/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: "#151515",
        light: "#ECEBEB",
        accent: "#EF4444",
      },
    },
  },
  plugins: [],
};
