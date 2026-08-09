import { useRef, useEffect, useState, lazy, Suspense } from 'react'
import gsap from 'gsap'

/* three.js is heavy — load it after the text has painted */
const HeroScene = lazy(() => import('./HeroScene'))

export default function Hero3D() {
  const root = useRef()
  const [showScene, setShowScene] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .from('.hero-line > span', { yPercent: 115, duration: 1.15, stagger: 0.08 }, 0.1)
        .from('.hero-fade', { y: 22, opacity: 0, duration: 0.9, stagger: 0.09 }, '-=0.65')
    }, root)

    /* Defer the canvas until the browser is idle so LCP stays fast */
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 200))
    const id = idle(() => setShowScene(true))

    return () => {
      ctx.revert()
      window.cancelIdleCallback?.(id)
    }
  }, [])

  return (
    <section ref={root} className="relative min-h-[100svh] w-full overflow-hidden">
      <div className="absolute inset-0">
        {showScene && (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        )}
      </div>

      {/* Wash so type stays legible over the geometry. Vertical on phones,
          where the copy spans the full width, horizontal from sm up. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-paper via-paper/85 to-paper/40 sm:bg-gradient-to-r sm:via-paper/70 sm:to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pt-32 pb-24 sm:px-10">
        <p className="hero-fade eyebrow mb-8">Entrepreneurship Cell — IIT Bhilai</p>

        <h1 className="display text-[clamp(2.4rem,10.5vw,10rem)] uppercase">
          <span className="hero-line line-mask">
            <span className="block">Build.</span>
          </span>
          <span className="hero-line line-mask">
            <span className="block stroke-type">Innovate.</span>
          </span>
          <span className="hero-line line-mask">
            <span className="grad-text block">Lead.</span>
          </span>
        </h1>

        <p className="hero-fade lead mt-10 max-w-lg text-lg leading-relaxed text-ink-70 sm:text-xl">
          We turn curiosity into companies — ideas, mentors, funding, and a room full of
          people building things that actually matter.
        </p>

        <div className="hero-fade mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="/contact"
            className="brutal group inline-flex items-center justify-center gap-3 bg-accent px-8 py-4 font-bold uppercase tracking-wide text-ink"
          >
            Join E-Cell
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="/events"
            className="brutal inline-flex items-center justify-center bg-paper px-8 py-4 font-bold uppercase tracking-wide text-ink"
          >
            See our events
          </a>
        </div>

        <div className="hero-fade mt-20 flex flex-wrap">
          {[
            ['500+', 'members'],
            ['50+', 'events a year'],
            ['20+', 'startups'],
          ].map(([v, l]) => (
            <div key={l} className="border border-stone bg-paper px-7 py-4 -ml-[2px] first:ml-0">
              <div className="display text-3xl">{v}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-widest text-ink-40">
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex">
        <span className="text-[10px] uppercase tracking-[0.3em] text-ink-40">Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-ink to-transparent" />
      </div>
    </section>
  )
}
