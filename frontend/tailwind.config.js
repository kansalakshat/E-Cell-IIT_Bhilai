/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: '#ffffff',
        bone: '#f2f2ef',
        stone: '#e6e6e1',
        ink: '#0a0a0a',
        'ink-70': '#5c5c5c',
        'ink-40': '#9a9a9a',
        accent: '#d8ff3e',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
