import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useInView } from '../hooks/useInView'

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

  return (
    <article
      ref={ref}
      className="group flex translate-y-8 flex-col justify-between rounded-4xl border border-stone bg-paper p-8 opacity-0 transition-colors duration-500 ease-smooth hover:border-ink hover:bg-ink"
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full bg-bone px-3 py-1 text-xs font-semibold capitalize text-ink transition-colors duration-500 group-hover:bg-accent">
            {label}
          </span>
          <time className="text-xs text-ink-40 transition-colors duration-500 group-hover:text-white/40">
            {fmt(event.date)}
          </time>
        </div>

        <h3 className="display mt-7 text-3xl transition-colors duration-500 group-hover:text-white">
          {event.title}
        </h3>
        <p className="mt-4 text-[15px] leading-relaxed text-ink-70 transition-colors duration-500 group-hover:text-white/60">
          {event.description}
        </p>
      </div>

      <div className="mt-10 flex items-center gap-3 text-sm font-semibold transition-colors duration-500 group-hover:text-white">
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
        Details
      </div>
    </article>
  )
}
