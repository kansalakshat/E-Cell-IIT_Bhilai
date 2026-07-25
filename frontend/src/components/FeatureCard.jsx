import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useInView } from '../hooks/useInView'

export default function FeatureCard({
  title,
  subtitle,
  description,
  metrics = [],
  cta,
  index = 0,
}) {
  const ref = useRef()
  const inView = useInView(ref, { threshold: 0.15 })

  useEffect(() => {
    if (!inView) return
    gsap.to(ref.current, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      delay: (index % 3) * 0.08,
      ease: 'power3.out',
    })
  }, [inView, index])

  return (
    <article
      ref={ref}
      className="group relative flex translate-y-8 flex-col overflow-hidden rounded-4xl border border-stone bg-bone p-9 opacity-0 transition-colors duration-500 ease-smooth hover:border-ink hover:bg-ink sm:p-10"
    >
      {/* Index */}
      <span className="absolute right-8 top-8 text-sm tabular-nums text-ink-40 transition-colors duration-500 group-hover:text-white/40">
        {String(index + 1).padStart(2, '0')}
      </span>

      {subtitle && (
        <p className="eyebrow mb-5 transition-colors duration-500 group-hover:text-accent">
          {subtitle}
        </p>
      )}

      <h3 className="display text-4xl transition-colors duration-500 group-hover:text-white sm:text-5xl">
        {title}
      </h3>

      <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink-70 transition-colors duration-500 group-hover:text-white/60">
        {description}
      </p>

      {metrics.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-6 border-t border-stone pt-7 transition-colors duration-500 group-hover:border-white/15">
          {metrics.map((m) => (
            <div key={m.label}>
              <div className="display text-2xl transition-colors duration-500 group-hover:text-accent">
                {m.value}
              </div>
              <div className="mt-1 text-xs text-ink-40 transition-colors duration-500 group-hover:text-white/40">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {cta && (
        <div className="mt-9 flex items-center gap-3 text-sm font-semibold transition-colors duration-500 group-hover:text-white">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-ink transition-all duration-500 ease-smooth group-hover:border-accent group-hover:bg-accent">
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
  )
}
