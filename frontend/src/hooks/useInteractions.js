import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

/* Every hook here is a pointer-driven flourish, so every one of them wants
   the same two answers: is there a real pointer, and has this person asked
   for less motion? Asking once here means a new hook cannot forget, and the
   reduced-motion opt-out cannot be honoured in three places and missed in a
   fourth. CSS alone would not cover it — these animate through GSAP, which
   the reduced-motion block in index.css never touches. */
const skipPointerMotion = () =>
  window.matchMedia('(hover: none)').matches ||
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Button that leans toward the cursor when you get close */
export function useMagnetic(strength = 0.35) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (skipPointerMotion()) return

    const quickX = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3.out' })
    const quickY = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3.out' })

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      quickX((e.clientX - (r.left + r.width / 2)) * strength)
      quickY((e.clientY - (r.top + r.height / 2)) * strength)
    }
    const onLeave = () => {
      quickX(0)
      quickY(0)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength])

  return ref
}

/* A badge that trails the cursor inside a container */
export function useCursorBadge() {
  const containerRef = useRef(null)
  const badgeRef = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const box = containerRef.current
    const badge = badgeRef.current
    if (!box || !badge) return
    if (skipPointerMotion()) return

    const quickX = gsap.quickTo(badge, 'x', { duration: 0.5, ease: 'power3.out' })
    const quickY = gsap.quickTo(badge, 'y', { duration: 0.5, ease: 'power3.out' })

    const onMove = (e) => {
      const r = box.getBoundingClientRect()
      quickX(e.clientX - r.left)
      quickY(e.clientY - r.top)
    }
    const onEnter = (e) => {
      const r = box.getBoundingClientRect()
      gsap.set(badge, { x: e.clientX - r.left, y: e.clientY - r.top })
      setActive(true)
    }

    box.addEventListener('mouseenter', onEnter)
    box.addEventListener('mousemove', onMove)
    box.addEventListener('mouseleave', () => setActive(false))
    return () => {
      box.removeEventListener('mouseenter', onEnter)
      box.removeEventListener('mousemove', onMove)
      box.removeEventListener('mouseleave', () => setActive(false))
    }
  }, [])

  return { containerRef, badgeRef, active }
}

/* Subtle 3D tilt toward the cursor */
export function useTilt(max = 6) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (skipPointerMotion()) return

    const quickRX = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3.out' })
    const quickRY = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3.out' })

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      quickRY(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * max)
      quickRX(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * -max)
    }
    const onLeave = () => {
      quickRX(0)
      quickRY(0)
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [max])

  return ref
}
