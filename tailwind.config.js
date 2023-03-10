/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        montserrat: "Montserrat-Regular",
        monserratbold:"Montserrat-Bold"
      }
    },
    variables: {
      "--base-color": "#009688",
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
