/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /* Ground — Linear/Vercel: near-black canvas, layered surfaces */
        paper: '#08090A',
        bone: '#0E0F11',
        stone: '#23252A',

        /* Foreground — Apple's neutral greys. `ink` doubles as the
           inverted (light) block colour, so `bg-ink text-paper` reads. */
        ink: '#F5F5F7',
        'ink-70': '#A1A1A6',
        'ink-40': '#86868B',

        /* Surfaces for the card cycle: barely-there hue shifts, not pastels */
        lime: '#17191D',
        grass: '#0F1A15',
        blush: '#1A1418',
        butter: '#1A1712',
        violet: '#15151F',
        sky: '#121A20',

        /* One accent. Ferrari red, used sparingly. */
        accent: '#E6002A',
        red: '#E6002A',
      },
      fontFamily: {
        /* Nike's massive uppercase display + Apple/Linear neutral body */
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      /* Stripe/Linear: soft radii, never square, never pill */
      borderRadius: {
        '4xl': '14px',
        '5xl': '20px',
      },
      boxShadow: {
        /* Depth by shadow + inset highlight, not by offset blocks */
        soft: '0 1px 0 0 rgb(255 255 255 / 0.05) inset, 0 18px 50px -24px rgb(0 0 0 / 0.9)',
        lift: '0 1px 0 0 rgb(255 255 255 / 0.08) inset, 0 30px 70px -28px rgb(0 0 0 / 1)',
        glow: '0 0 0 1px rgb(230 0 42 / 0.35), 0 20px 60px -20px rgb(230 0 42 / 0.45)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
