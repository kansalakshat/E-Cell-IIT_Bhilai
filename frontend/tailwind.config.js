/** @type {import('tailwindcss').Config} */

/* Channel-triplet vars so Tailwind's opacity modifiers (text-ink/70) still work.
   Values for both themes live in src/index.css. */
const c = (name) => `rgb(var(${name}) / <alpha-value>)`

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: c('--c-paper'),
        bone: c('--c-bone'),
        stone: c('--c-stone'),
        ink: c('--c-ink'),
        'ink-70': c('--c-ink-70'),
        'ink-40': c('--c-ink-40'),

        /* Card cycle: vivid blocks in light, near-black planes in dark */
        lime: c('--c-lime'),
        grass: c('--c-grass'),
        blush: c('--c-blush'),
        butter: c('--c-butter'),
        violet: c('--c-violet'),
        sky: c('--c-sky'),

        accent: c('--c-accent'),
        red: c('--c-red'),
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      borderRadius: {
        '4xl': 'var(--r-lg)',
        '5xl': 'var(--r-xl)',
      },
      boxShadow: {
        soft: 'var(--sh-soft)',
        lift: 'var(--sh-lift)',
        glow: 'var(--sh-glow)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
