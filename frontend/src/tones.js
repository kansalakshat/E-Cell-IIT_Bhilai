/* Shared card palette. Light theme renders these as the vivid brutalist
   blocks; dark theme as near-black planes with a hint of hue — same tokens,
   different values (see index.css). */

const SURFACE = {
  muted: 'text-ink-70',
  rule: 'border-stone',
  chip: 'bg-accent text-ink',
  stat: 'text-ink',
}

/* grass and red stay dark in BOTH themes, so their copy is literal white
   rather than the `ink` token — which flips to black in light mode. */
const ON_DARK = {
  muted: 'text-white/80',
  rule: 'border-white/25',
  stat: 'text-white',
}

export const TONES = {
  lime: { card: 'bg-lime text-ink', ...SURFACE },
  grass: { card: 'bg-grass text-white', ...ON_DARK, chip: 'bg-white text-grass' },
  blush: { card: 'bg-blush text-ink', ...SURFACE },
  butter: { card: 'bg-butter text-ink', ...SURFACE },
  violet: { card: 'bg-violet text-ink', ...SURFACE },
  sky: { card: 'bg-sky text-ink', ...SURFACE },
  red: { card: 'bg-red text-white', ...ON_DARK, chip: 'bg-white text-red' },
  ink: {
    card: 'bg-ink text-paper',
    muted: 'text-paper/60',
    rule: 'border-paper/15',
    chip: 'bg-accent text-ink',
    stat: 'text-paper',
  },
}

const CYCLE = ['lime', 'red', 'blush', 'ink', 'butter', 'violet']

/* Named tone if given, otherwise cycle the palette so a grid never comes
   out one flat colour. */
export const toneFor = (index = 0, name) =>
  TONES[name] ?? TONES[CYCLE[index % CYCLE.length]]
