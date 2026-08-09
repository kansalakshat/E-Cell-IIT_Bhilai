/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: '#FAFAF7',
        bone: '#EFEEE7',
        stone: '#D8D6CB',
        ink: '#0A0A0B',
        'ink-70': '#4A4A4C',
        'ink-40': '#6B6B6E',

        /* Card tones — vivid blocks on a bone page */
        lime: '#D8FF3E',
        grass: '#0F5132',
        blush: '#FF9DB0',
        butter: '#FFE066',
        violet: '#C4B5FF',
        sky: '#9AD7F5',

        accent: '#EC4899',
        red: '#E60029',
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Righteous', 'Impact', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      /* Brutalism: corners are square. Existing rounded-4xl/5xl usage flattens here. */
      borderRadius: {
        '4xl': '0px',
        '5xl': '0px',
      },
      boxShadow: {
        hard: '8px 8px 0 0 #0A0A0B',
        'hard-sm': '4px 4px 0 0 #0A0A0B',
        'hard-accent': '8px 8px 0 0 #EC4899',
        'hard-light': '8px 8px 0 0 #FAFAF7',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
