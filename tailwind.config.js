/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bu-teal': '#4EC9C2',
        'bu-teal-dark': '#3ab3ac',
        'bu-navy': '#1A6B7C',
        'bu-navy-deep': '#0f4a58',
        'bu-offwhite': '#F4FAFA',
      },
      fontFamily: {
        'montserrat': ['"Montserrat Alternates"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
