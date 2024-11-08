/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        "60px": "60px",
        "300px": "300px",
        "260px": "260px",
      },
      height: {
        "275px": "275px",
      },
      transitionProperty: {
        width: "width",
        rotate: "rotate",
        scale: "scale",
      },
      scale: {
        101: "1.01",
      },
      maxHeight: {
        "screen-minus-extras": "calc(100vh - 200px)",
      },
      maxWidth: {
        "lg-screen-centre": "1600px",
      },
      screens: {
        mdl: "960px",
        "3xl": "1900px",
      },
      translate: {
        "-288px": "-288px",
      },
    },
  },
  daisyui: {
    themes: ["sunset", "nord"],
  },
  plugins: [require("daisyui")],
};
