/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    "bg-red-100",
    "border-red-400",
    "text-red-700",
    "bg-green-100",
    "border-green-400",
    "text-green-700",
    "bg-blue-100",
    "border-blue-400",
    "text-blue-700",
  ],
};
