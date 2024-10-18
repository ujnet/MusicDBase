/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#000000',
        'secondary': '#2A2A2A', // Updated to dark grey
        'accent': '#FF6500',
      },
    },
  },
  plugins: [],
};