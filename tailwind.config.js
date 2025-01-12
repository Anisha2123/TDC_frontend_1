/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",          // Include your index.html
    "./src/**/*.{js,jsx}",   // Include all JS and JSX files in src
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}

