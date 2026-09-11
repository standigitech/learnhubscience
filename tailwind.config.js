/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        learnsci: {
          blue: "#2563EB",
          purple: "#7C3AED",
          math: "#0284C7",
          chem: "#9333EA",
          physics: "#F97316",
          bio: "#10B981",
          dark: "#0F172A",
          surface: "#F8FAFC",
        }
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.04)',
        'elevated': '0 10px 30px -4px rgba(15, 23, 42, 0.08), 0 4px 10px -2px rgba(15, 23, 42, 0.04)',
      }
    },
  },
  plugins: [],
}
