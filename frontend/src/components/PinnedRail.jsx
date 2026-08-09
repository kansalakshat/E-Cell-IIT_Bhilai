import { useRef, useState, useLayoutEffect, Children } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* Holds the page still while the cards travel sideways, then releases it.
   The pin length equals the horizontal distance, so one notch of wheel or
   thumb moves the row by the same amount it would have moved the page —
   it reads as the page continuing, not as the scroll being stolen. */
export default function PinnedRail({ header, children, cardClass = '' }) {
  const section = useRef()
  const track = useRef()

  /* Read once: someone who has asked for less motion gets a plain
     scrollable row instead, since pinning is exactly what they opted out of. */
  const [reduced] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useLayoutEffect(() => {
    if (reduced) return

    const ctx = gsap.context(() => {
      /* Recomputed on refresh so resizing doesn't strand the row mid-travel */
      const distance = () => Math.max(0, track.current.scrollWidth - window.innerWidth)

      gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section.current,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={section} className="relative">
      <div className="flex min-h-screen flex-col justify-center overflow-hidden py-20">
        {header && <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">{header}</div>}

        <div
          ref={track}
          tabIndex={reduced ? 0 : undefined}
          className={`flex gap-5 px-6 sm:px-10 ${header ? 'mt-14' : ''} ${
            reduced ? 'overflow-x-auto pb-5' : 'w-max'
          }`}
        >
          {Children.map(children, (child) => (
            <div className={`h-full shrink-0 ${cardClass}`}>{child}</div>
          ))}
        </div>
      </div>
    </section>
  )
}
