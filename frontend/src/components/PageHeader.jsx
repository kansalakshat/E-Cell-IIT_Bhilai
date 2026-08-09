import { useRef, useEffect } from 'react'
import gsap from 'gsap'

/* Shared oversized page masthead */
export default function PageHeader({ eyebrow, title, lead }) {
  const ref = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.ph-line > span', { yPercent: 115, duration: 1, stagger: 0.08 }, 0.05)
        .from('.ph-fade', { y: 20, opacity: 0, duration: 0.8, stagger: 0.08 }, '-=0.55')
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <header ref={ref} className="border-b border-stone bg-bone">
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-40 sm:px-10 sm:pb-28 sm:pt-48">
        {eyebrow && <p className="ph-fade eyebrow mb-8">{eyebrow}</p>}
        <h1 className="display text-[clamp(2.1rem,9vw,8rem)] uppercase">
          <span className="ph-line line-mask">
            <span className="block">{title}</span>
          </span>
        </h1>
        {lead && (
          <p className="ph-fade lead mt-10 max-w-xl text-lg leading-relaxed text-ink-70 sm:text-xl">
            {lead}
          </p>
        )}
      </div>
    </header>
  )
}
