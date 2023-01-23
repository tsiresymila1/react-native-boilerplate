/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    variables: {
      "--base-color": "#211f4a",
      "--second-color": "#2f2d4f",
      "--text-base-color": "white",
      "--placeholder-base-color": "rgba(135,135,153,0.64)",
      "--btn-color": "#2b207f"
    },
    darkVariables: {
      "--colors-custom-500": "white"
    },
  },
  plugins: [],
}
