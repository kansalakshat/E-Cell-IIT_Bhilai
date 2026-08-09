import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useInView } from '../hooks/useInView'
import { useTilt } from '../hooks/useInteractions'

/* Surfaces, not colour blocks. Each tone is a barely-different dark
   plane; only the red card and the inverted card break the field. */
const SURFACE = {
  muted: 'text-ink-70',
  rule: 'border-stone',
  chip: 'bg-accent text-ink',
  stat: 'text-ink',
}

const TONES = {
  lime: { card: 'bg-lime text-ink', ...SURFACE },
  grass: { card: 'bg-grass text-ink', ...SURFACE },
  blush: { card: 'bg-blush text-ink', ...SURFACE },
  butter: { card: 'bg-butter text-ink', ...SURFACE },
  violet: { card: 'bg-violet text-ink', ...SURFACE },
  red: {
    card: 'bg-red text-ink',
    muted: 'text-ink/80',
    rule: 'border-ink/25',
    chip: 'bg-ink text-red',
    stat: 'text-ink',
  },
  ink: {
    card: 'bg-ink text-paper',
    muted: 'text-paper/60',
    rule: 'border-paper/15',
    chip: 'bg-accent text-ink',
    stat: 'text-paper',
  },
}

const CYCLE = ['lime', 'red', 'blush', 'ink', 'butter', 'violet']

export default function FeatureCard({
  title,
  subtitle,
  description,
  metrics = [],
  cta,
  tone,
  index = 0,
}) {
  const wrapRef = useRef()
  const tiltRef = useTilt(5)
  const inView = useInView(wrapRef, { threshold: 0.15 })
  /* No tone given? Cycle the palette so a grid never comes out one flat colour. */
  const t = TONES[tone] ?? TONES[CYCLE[index % CYCLE.length]]

  useEffect(() => {
    if (!inView) return
    gsap.to(wrapRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      delay: (index % 3) * 0.08,
      ease: 'power3.out',
    })
  }, [inView, index])

  return (
    <div ref={wrapRef} className="translate-y-8 opacity-0 [perspective:1200px]">
      <article
        ref={tiltRef}
        className={`brutal group relative flex h-full flex-col overflow-hidden p-9 sm:p-10 ${t.card}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <span className="display absolute -right-2 -top-4 text-7xl opacity-15 tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>

        {subtitle && (
          <p className={`mb-5 text-xs font-bold uppercase tracking-[0.28em] ${t.muted}`}>
            {subtitle}
          </p>
        )}

        <h3 className="display text-4xl uppercase sm:text-5xl">{title}</h3>

        <p className={`mt-5 max-w-sm text-[15px] leading-relaxed ${t.muted}`}>{description}</p>

        {metrics.length > 0 && (
          <div className={`mt-auto grid grid-cols-2 gap-6 border-t-2 pt-7 ${t.rule}`}>
            {metrics.map((m) => (
              <div key={m.label}>
                <div className={`display text-2xl ${t.stat}`}>{m.value}</div>
                <div className={`mt-1 text-xs ${t.muted}`}>{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {cta && (
          <div className="mt-9 flex items-center gap-3 text-sm font-semibold">
            <span
              className={`grid h-9 w-9 place-items-center border border-current transition-transform duration-300 ease-smooth group-hover:scale-110 ${t.chip}`}
            >
              <svg
                className="h-3.5 w-3.5 transition-transform duration-500 ease-smooth group-hover:rotate-45"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            {cta}
          </div>
        )}
      </article>
    </div>
  )
}
