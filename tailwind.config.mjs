/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';
import aspectRatio from '@tailwindcss/aspect-ratio';
import lineClamp from '@tailwindcss/line-clamp';

export default {
  content: [
    "./index.html",          // Include your index.html
    "./src/**/*.{js,jsx}",   // Include all JS and JSX files in src
  ],
  theme: {
    extend: {},
  },
  plugins: [
    typography,
    aspectRatio,
    lineClamp,
  ],
};

