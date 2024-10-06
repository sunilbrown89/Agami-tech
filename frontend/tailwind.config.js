/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Layout/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": {
            transform: "rotate(-3deg)",
          },
          "50%": {
            transform: "rotate(3deg)",
          },
        },
      },
      animation: {
        wiggle: "wiggle 3s ease-in-out infinite",
        "bounce-slow": "bounce 3s linear infinite",
      },
      colors: {
        theme: {
          DEFAULT: "#13AF82",
          50: "#ecfdf6",
          100: "#d2f9e7",
          200: "#a9f1d3",
          300: "#71e4bb",
          400: "#37d09f",
          500: "#13af82",
          600: "#08936e",
          700: "#07755b",
          800: "#085d49",
          900: "#084c3d",
          950: "#032b24",
        },
        purpleTheme: "#8c75e7",
        themeDark: "#B1336E",
        themeLight: "#2300FF",
        primary: "#27525f",
        secondary: "#1e7f9c",
        facebook: "#4267B2",
        instagram: "#bc2a8d",
        twitter: "#1da1f2",
        linkedin: "#0077b5",
        pinterest: "#E60023",
        whatsapp: "#25d366",
        youtube: "#cd201f",
        panel: "#13AF82",
      },
      fontSize: {
        small: "15px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
