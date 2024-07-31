/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        kodchasan: ["_Kodchasan", "sans-serif"],
        KoHo: ["_KoHo", "sans-serif"],
        DMSans: ["_DM_Sans", "sans-serif"],
        poppins: ["Poppins"],
      },
      fontSize: {
        "responsive-h1": "calc(16px + 2vw)",
      },
    },
  },
  plugins: [],
};
