import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useInView } from '../hooks/useInView'

/* Image-led card, six2eight style: media on top, copy below, tag floating over the media */
export default function EntrepreneurshipCard({
  title,
  description,
  image,
  category,
  highlights = [],
  tone = 'bone',
  index = 0,
}) {
  const ref = useRef()
  const inView = useInView(ref, { threshold: 0.15 })

  useEffect(() => {
    if (!inView) return
    gsap.to(ref.current, {
      y: 0,
      opacity: 1,
      duration: 0.95,
      delay: (index % 2) * 0.1,
      ease: 'power3.out',
    })
  }, [inView, index])

  const dark = tone === 'ink'

  return (
    <article
      ref={ref}
      className={`group flex translate-y-10 flex-col overflow-hidden rounded-4xl opacity-0 ${
        dark ? 'bg-ink text-white' : 'bg-bone text-ink'
      }`}
    >
      {/* Media */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-smooth group-hover:scale-105"
        />
        {category && (
          <span className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-1.5 text-xs font-semibold text-ink backdrop-blur">
            {category}
          </span>
        )}
        <span className="absolute bottom-5 right-5 grid h-11 w-11 translate-y-3 place-items-center rounded-full bg-accent text-ink opacity-0 transition-all duration-500 ease-smooth group-hover:translate-y-0 group-hover:opacity-100">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" />
          </svg>
        </span>
      </div>

      {/* Copy */}
      <div className="flex flex-1 flex-col p-8 sm:p-9">
        <h3 className="display text-3xl sm:text-[2rem]">{title}</h3>
        <p className={`mt-4 text-[15px] leading-relaxed ${dark ? 'text-white/60' : 'text-ink-70'}`}>
          {description}
        </p>

        {highlights.length > 0 && (
          <ul
            className={`mt-7 space-y-2.5 border-t pt-6 ${
              dark ? 'border-white/15' : 'border-stone'
            }`}
          >
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-3 text-sm">
                <span className={`h-1 w-1 rounded-full ${dark ? 'bg-accent' : 'bg-ink'}`} />
                <span className={dark ? 'text-white/70' : 'text-ink-70'}>{h}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
