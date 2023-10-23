/** @type {import('tailwindcss').Config} */
/*eslint-env node*/
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        azul: {
          DEFAULT: "#3F72AF",
          escuro: "#112D4E",
          claro: "#DBE2EF",
        },
        branco: {
          DEFAULT: "#F9F7F7",
        },
        cinza: {
          claro: "#827d80",
          claroFooter: "#5E575C",
          escuro: "#333333",
        },
        vermelho: {
          claro: "#e2001a",
          escuro: "#9c2225",
          hover: "#c42a2e",
        },
      },
    },
  },
  plugins: [],
};
