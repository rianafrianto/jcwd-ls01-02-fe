/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#009B90",
        "primary-dark": "#008076",
        "primary-light": "#92C3D1",
        secondary: "#203360",
        "secondary-light": "#2B478B",
        neutral: "#222222",
        warning: "#FFB156",
        danger: "#FF6B6B",
        "neutral-gray": "#CCCCCC",
        facebook: "#527BCB",
        peach: "#FFB156",
        jumbotron: "#92C3D1",
        jbiru: "#2A426F",
      },
      boxShadow: {
        custom: "0px 2px 3px 2px rgba(0, 0, 0, 0.08)",
        "custom-lg": "0px 4px 12px 4px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar-hide")],
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
