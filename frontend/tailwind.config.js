/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff6b35',      // Premium Orange
        secondary: '#f7931e',     // Gold Orange
        accent: '#00d9ff',        // Cyan for highlights
        dark: '#0f0f0f',          // Pure black background
        'dark-secondary': '#1a1a1a',  // Subtle dark
        'text-muted': '#808080',      // Muted text
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '7xl': '4.5rem',
        '8xl': '6rem',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
