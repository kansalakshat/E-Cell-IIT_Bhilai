import { useEffect, useState, useRef } from 'react'

export function useInView(ref, options = {}) {
  const [isInView, setIsInView] = useState(false)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        setIsInView(true)
        hasAnimated.current = true
      }
    }, {
      threshold: options.threshold || 0.1,
      margin: options.margin || '0px',
    })

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [options])

  return isInView
}
