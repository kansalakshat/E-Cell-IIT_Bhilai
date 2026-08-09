import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useInView } from '../hooks/useInView'

const TONE = {
  Beginner: 'bg-lime text-ink border border-stone',
  Intermediate: 'bg-ink text-paper border border-stone',
  Advanced: 'bg-red text-ink border border-stone',
}

export default function GuideCard({
  number,
  title,
  description,
  steps = [],
  duration,
  difficulty = 'Intermediate',
  index = 0,
}) {
  const ref = useRef()
  const inView = useInView(ref, { threshold: 0.2 })

  useEffect(() => {
    if (!inView) return
    gsap.to(ref.current, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      delay: index * 0.06,
      ease: 'power3.out',
    })
  }, [inView, index])

  return (
    <article
      ref={ref}
      className="group grid translate-y-8 grid-cols-1 gap-8 border-t border-stone py-12 opacity-0 md:grid-cols-12"
    >
      {/* Step number */}
      <div className="md:col-span-2">
        <span className="display stroke-type text-7xl transition-colors duration-300 group-hover:text-accent">
          {String(number).padStart(2, '0')}
        </span>
      </div>

      {/* Title + meta */}
      <div className="md:col-span-4">
        <h3 className="display text-3xl uppercase sm:text-4xl">{title}</h3>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span
            className={`px-3 py-1 text-xs font-bold uppercase tracking-wide ${TONE[difficulty]}`}
          >
            {difficulty}
          </span>
          {duration && <span className="text-xs text-ink-40">{duration}</span>}
        </div>
      </div>

      {/* Body */}
      <div className="md:col-span-6">
        <p className="text-[15px] leading-relaxed text-ink-70">{description}</p>
        {steps.length > 0 && (
          <ul className="mt-6 space-y-3">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-4 text-sm text-ink">
                <span className="grid h-5 w-5 shrink-0 place-items-center bg-ink text-[10px] font-bold tabular-nums text-paper">
                  {i + 1}
                </span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
