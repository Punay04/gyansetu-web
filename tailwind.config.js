/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // for app directory
    "./pages/**/*.{js,ts,jsx,tsx}", // for pages directory
    "./components/**/*.{js,ts,jsx,tsx}", // for components
    "./modals/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#FAF9F5",
        primary: "#C96442",
        secondary: "#FAF9F5",
        highlight: "#E9C46A",
      },
    },
  },
  plugins: [],
};
