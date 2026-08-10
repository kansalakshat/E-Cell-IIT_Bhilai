import { useRef, useLayoutEffect } from 'react'
import gsap from 'gsap'
import { useInView } from '../hooks/useInView'
import { statParts, decimalsOf } from '../lib/statParts'

export default function Counter({ value, className = '' }) {
  const ref = useRef()
  /* 0.4 rather than the usual 0.1: a number that starts counting while still
     half off-screen has finished by the time you can read it. */
  const inView = useInView(ref, { threshold: 0.4 })
  const parts = statParts(value)

  useLayoutEffect(() => {
    if (!inView || !parts) return
    const el = ref.current
    const { prefix, digits, suffix } = parts

    const ctx = gsap.context(() => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        const decimals = decimalsOf(digits)
        const n = { v: 0 }

        /* Written before the browser paints — useEffect would let the final
           value show for a frame and then visibly snap back to zero. */
        el.textContent = prefix + (0).toFixed(decimals) + suffix

        gsap.to(n, {
          v: parseFloat(digits),
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = prefix + n.v.toFixed(decimals) + suffix
          },
        })
      })
    }, ref)

    return () => ctx.revert()
  }, [inView, value])

  /* Renders the finished value, so it is already correct for reduced motion,
     for a failed match, and for anything reading the DOM before the tween.
     tabular-nums keeps the box from twitching as the digits roll. */
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value}
    </span>
  )
}
