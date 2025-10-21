/** @type {import('tailwindcss').Config} */
export default {
  // This tells Tailwind where to scan your files for class names
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Add custom fonts or colors for the CoC look here later
      // For example, to use a custom font:
      // fontFamily: {
      //   fantasy: ['Cinzel', 'serif'], 
      // },
    },
  },
  plugins: [],
}