import { useEffect, useState, useRef } from 'react'

export function useInView(ref, { threshold = 0.1, rootMargin = '0px' } = {}) {
  const [isInView, setIsInView] = useState(false)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node || hasAnimated.current) return

    const reveal = () => {
      if (hasAnimated.current) return
      hasAnimated.current = true
      setIsInView(true)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal()
          observer.unobserve(node)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)

    /* Safety net: if the element is already on screen but measured zero-size
       when first observed — fonts still loading, images without dimensions,
       a route that just swapped — the observer reports "not intersecting"
       and, with nothing left to scroll, never fires again. The section then
       sits invisible until some unrelated interaction forces a recalculation.
       One rect check after layout settles covers that case. */
    const raf = requestAnimationFrame(() => {
      const r = node.getBoundingClientRect()
      const visible =
        r.height > 0 && r.top < window.innerHeight && r.bottom > 0 && r.width > 0
      if (visible) {
        reveal()
        observer.unobserve(node)
      }
    })

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [ref, threshold, rootMargin])

  return isInView
}
