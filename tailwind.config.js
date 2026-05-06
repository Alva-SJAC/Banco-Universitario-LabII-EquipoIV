/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bu-teal': '#49beb7',
        'bu-teal-dark': '#085f63',
        'bu-navy': '#1A6B7C',
        'bu-navy-deep': '#0f4a58',
        'bu-offwhite': '#f8fafc',
      },
      fontFamily: {
        'montserrat': ['"Montserrat Alternates"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
