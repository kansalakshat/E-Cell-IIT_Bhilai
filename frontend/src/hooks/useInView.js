import { useEffect, useState, useRef } from 'react'

export function useInView(ref, { threshold = 0.1, rootMargin = '0px' } = {}) {
  const [isInView, setIsInView] = useState(false)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsInView(true)
          hasAnimated.current = true
          observer.unobserve(node)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [ref, threshold, rootMargin])

  return isInView
}
