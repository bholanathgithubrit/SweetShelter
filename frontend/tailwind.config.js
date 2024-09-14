/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-custom': 'rgb(41, 175, 209)',
      },
    },
    container:{
      padding:{
        md:"10rem"
      }
    }
  },
  plugins: [],
}

