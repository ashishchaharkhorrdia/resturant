/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#DC2626',
          orange: '#EA580C',
          amber: '#F59E0B',
          dark: '#0f172a',
          surface: '#1e293b'
        }
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #DC2626 0%, #EA580C 50%, #F59E0B 100%)',
        'brand-gradient-h': 'linear-gradient(90deg, #DC2626 0%, #EA580C 50%, #F59E0B 100%)',
      }
    },
  },
  plugins: [],
}
