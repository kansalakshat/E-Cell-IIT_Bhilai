import { useRef, Suspense } from 'react'
import { useInView } from '../hooks/useInView'

/* Mounts a three.js scene once its slot scrolls into view, so the three
   chunk is never fetched for a page the visitor doesn't reach. */
export default function LazyScene({ scene: Scene, className = '' }) {
  const ref = useRef()
  const inView = useInView(ref, { threshold: 0.1 })

  return (
    <div ref={ref} className={className}>
      {inView && (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      )}
    </div>
  )
}
