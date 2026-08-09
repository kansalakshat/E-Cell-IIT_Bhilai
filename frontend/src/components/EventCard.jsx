import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useInView } from '../hooks/useInView'
import { toneFor } from '../tones'

const fmt = (d) =>
  new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })

export default function EventCard({ event, index = 0 }) {
  const ref = useRef()
  const inView = useInView(ref, { threshold: 0.15 })

  useEffect(() => {
    if (!inView) return
    gsap.to(ref.current, {
      y: 0,
      opacity: 1,
      duration: 0.85,
      delay: (index % 3) * 0.07,
      ease: 'power3.out',
    })
  }, [inView, index])

  const label = (event.type || event.category || 'event').replace(/_/g, ' ')
  const t = toneFor(event.id ?? index)

  return (
    <article
      ref={ref}
      className={`brutal group flex translate-y-8 flex-col justify-between p-8 opacity-0 ${t.card}`}
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <span
            className={`px-3 py-1 text-xs font-bold uppercase tracking-wide ${t.chip}`}
          >
            {label}
          </span>
          <time className={`text-xs font-semibold uppercase tracking-wide ${t.muted}`}>
            {fmt(event.date)}
          </time>
        </div>

        <h3 className="display mt-7 text-3xl uppercase">{event.title}</h3>
        <p className={`mt-4 text-[15px] leading-relaxed ${t.muted}`}>{event.description}</p>
      </div>

      <div className="mt-10 flex items-center gap-3 text-sm font-bold uppercase tracking-wide">
        <span className="grid h-9 w-9 place-items-center border border-current transition-transform duration-300 ease-smooth group-hover:scale-110">
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
        Details
      </div>
    </article>
  )
}
