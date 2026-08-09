import { useRef, useState, useEffect, Suspense } from 'react'
import { useInView } from '../hooks/useInView'

/* Mounts a three.js scene only once its slot scrolls into view, so the
   three chunk is never fetched for a page the visitor doesn't reach. */
export default function LazyScene({ scene: Scene, className = '' }) {
  const ref = useRef()
  const inView = useInView(ref, { threshold: 0.1 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (inView) setMounted(true)
  }, [inView])

  return (
    <div ref={ref} className={className}>
      {mounted && (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      )}
    </div>
  )
}
