import { useEffect, useRef } from 'react'

/* Maps the page's vertical progress across a rail onto its horizontal
   scroll, so scrolling down walks the cards to the right.

   Runs on rAF rather than a scroll listener because Lenis animates scroll
   in its own frame loop — listening for `scroll` lands a frame behind it.
   The observer keeps the loop off whenever the rail isn't on screen. */
export function useScrollRail() {
  const ref = useRef()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    /* Touch keeps its native swipe; reduced-motion opts out entirely. */
    const enabled =
      window.matchMedia('(min-width: 768px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!enabled) return

    let frame = 0

    const tick = () => {
      const max = el.scrollWidth - el.clientWidth
      if (max > 0) {
        const vh = window.innerHeight
        const { top, height } = el.getBoundingClientRect()
        /* p = 0 with the rail low in the viewport, 1 as it exits the top */
        const start = vh * 0.85
        const end = vh * 0.15 - height
        const p = (start - top) / (start - end)
        el.scrollLeft = Math.min(Math.max(p, 0), 1) * max
      }
      frame = requestAnimationFrame(tick)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !frame) {
          frame = requestAnimationFrame(tick)
        } else if (!entry.isIntersecting && frame) {
          cancelAnimationFrame(frame)
          frame = 0
        }
      },
      { threshold: 0 }
    )
    io.observe(el)

    return () => {
      io.disconnect()
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return ref
}
