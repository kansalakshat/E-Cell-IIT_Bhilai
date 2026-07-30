import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useInView } from '../hooks/useInView'
import { useTilt } from '../hooks/useInteractions'

/* Each tone is a full colour block — bg, text, hairline, arrow chip */
const TONES = {
  lime: {
    card: 'bg-lime text-ink',
    muted: 'text-ink/65',
    rule: 'border-ink/15',
    chip: 'bg-ink text-lime',
    stat: 'text-ink',
  },
  grass: {
    card: 'bg-grass text-white',
    muted: 'text-white/70',
    rule: 'border-white/20',
    chip: 'bg-lime text-ink',
    stat: 'text-lime',
  },
  blush: {
    card: 'bg-blush text-ink',
    muted: 'text-ink/65',
    rule: 'border-ink/15',
    chip: 'bg-ink text-blush',
    stat: 'text-ink',
  },
  butter: {
    card: 'bg-butter text-ink',
    muted: 'text-ink/65',
    rule: 'border-ink/15',
    chip: 'bg-ink text-butter',
    stat: 'text-ink',
  },
  violet: {
    card: 'bg-violet text-ink',
    muted: 'text-ink/65',
    rule: 'border-ink/15',
    chip: 'bg-ink text-violet',
    stat: 'text-ink',
  },
  ink: {
    card: 'bg-ink text-white',
    muted: 'text-white/60',
    rule: 'border-white/15',
    chip: 'bg-lime text-ink',
    stat: 'text-lime',
  },
}

export default function FeatureCard({
  title,
  subtitle,
  description,
  metrics = [],
  cta,
  tone = 'lime',
  index = 0,
}) {
  const wrapRef = useRef()
  const tiltRef = useTilt(5)
  const inView = useInView(wrapRef, { threshold: 0.15 })
  const t = TONES[tone] ?? TONES.lime

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
        className={`group relative flex h-full flex-col overflow-hidden rounded-4xl p-9 transition-shadow duration-500 ease-smooth hover:shadow-[0_28px_70px_-24px_rgba(0,0,0,0.45)] sm:p-10 ${t.card}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Sheen that sweeps across on hover */}
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[900ms] ease-smooth group-hover:translate-x-full" />

        <span className={`absolute right-8 top-8 text-sm tabular-nums ${t.muted}`}>
          {String(index + 1).padStart(2, '0')}
        </span>

        {subtitle && (
          <p className={`mb-5 text-xs uppercase tracking-[0.28em] ${t.muted}`}>{subtitle}</p>
        )}

        <h3 className="display text-4xl sm:text-5xl">{title}</h3>

        <p className={`mt-5 max-w-sm text-[15px] leading-relaxed ${t.muted}`}>{description}</p>

        {metrics.length > 0 && (
          <div className={`mt-auto grid grid-cols-2 gap-6 border-t pt-7 ${t.rule}`}>
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
              className={`grid h-9 w-9 place-items-center rounded-full transition-transform duration-500 ease-smooth group-hover:scale-110 ${t.chip}`}
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
