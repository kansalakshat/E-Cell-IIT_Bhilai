import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useInView } from '../hooks/useInView'
import { useTilt } from '../hooks/useInteractions'
import Counter from './Counter'
import { toneFor } from '../tones'

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
  const t = toneFor(index, tone)

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
    <div ref={wrapRef} className="h-full translate-y-8 opacity-0 [perspective:1200px]">
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
                <div className={`display text-2xl ${t.stat}`}>
                  <Counter value={m.value} />
                </div>
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
