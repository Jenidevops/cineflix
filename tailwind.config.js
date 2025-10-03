/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        netflix: '#E50914',  // Keep the red color
        cineflix: '#E50914', // Add cineflix alias
      },
    },
  },
  plugins: [],
}