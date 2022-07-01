/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#009B90",
        "primary-dark": "#008076",
        secondary: "#213360",
        neutral: "#222222",
        danger: "#FF6B6B",
        "neutral-gray": "#CCCCCC",
        facebook: "#527BCB",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: [
      {
        mytheme: {
          primary: "#009B90",

          secondary: "#009B90",
          "secondary-content": "#ffffff",

          accent: "#f4eb95",

          neutral: "#2F2136",

          "base-100": "#ffffff",

          info: "#7ED8F7",

          success: "#23E198",

          warning: "#F2B23A",

          error: "#EB1E4A",

          "--border-btn": "2px",
          "--btn-text-case": "none",
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
};
