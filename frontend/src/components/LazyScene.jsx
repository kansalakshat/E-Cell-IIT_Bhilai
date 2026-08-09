import { useRef, useState, useEffect, Suspense } from 'react'
import { useInView } from '../hooks/useInView'

const MIN_WIDTH = '(min-width: 768px)'

/* Mounts a three.js scene once its slot scrolls into view, so the three
   chunk is never fetched for a page the visitor doesn't reach.

   Decorative background canvases are skipped on phones — three WebGL
   contexts plus the hero's is what makes scrolling stutter there. The
   media query is watched rather than read once, so widening the window
   brings the scene in instead of leaving the slot permanently empty. */
export default function LazyScene({ scene: Scene, className = '' }) {
  const ref = useRef()
  const inView = useInView(ref, { threshold: 0.1 })
  const [wideEnough, setWideEnough] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(MIN_WIDTH).matches
  )

  useEffect(() => {
    const mq = window.matchMedia(MIN_WIDTH)
    const on = () => setWideEnough(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  return (
    <div ref={ref} className={className}>
      {inView && wideEnough && (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      )}
    </div>
  )
}
