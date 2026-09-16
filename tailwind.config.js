/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#14161A",
        graphite: "#1D2025",
        ember: "#FF5A2E",
        steel: "#3E7CB1",
        bone: "#F3F0E9",
        haze: "#8B9099",
      },
      fontFamily: {
        display: ["var(--font-anton)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-.04em",
      },
    },
  },
  plugins: [],
};
