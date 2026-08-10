import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { useInView } from '../hooks/useInView'

gsap.registerPlugin(SplitText)

/* The shared section reveal. Was duplicated verbatim in HomePage and
   AboutPage; it lives here now so both pages move the same way.

   Headings unmask line by line — the move the hero opens with. A section
   heading arriving mid-page then speaks in the page's own voice instead of
   sliding up as one undifferentiated block. Everything else in the block
   staggers in behind it, so the heading always lands first. */
export default function Reveal({ children, className = '' }) {
  const ref = useRef()
  const inView = useInView(ref, { threshold: 0.15 })

  useEffect(() => {
    if (!inView) return
    const el = ref.current

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      /* The reduced-motion rule in index.css only reaches CSS transitions —
         GSAP tweens run right past it. This is where the opt-out is honoured:
         the content simply appears. */
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(el, { opacity: 1 })
      })

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set(el, { opacity: 1 })

        const heads = gsap.utils.toArray('h1, h2, h3', el)

        heads.forEach((h, i) =>
          SplitText.create(h, {
            type: 'lines',
            mask: 'lines',
            /* Re-splits when the font finally lands or the column changes
               width, which is what keeps the line breaks honest. The tween is
               built inside onSplit and returned so GSAP re-targets the new
               line elements and carries the progress across — without the
               return, a resize would replay a finished reveal. */
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 115,
                duration: 1.05,
                stagger: 0.08,
                delay: i * 0.06,
                ease: 'power3.out',
              }),
          })
        )

        /* Direct children only. A child that itself contains a heading still
           fades in as a panel while its heading unmasks inside — the two read
           as one move rather than fighting. */
        const rest = Array.from(el.children).filter((c) => !heads.includes(c))
        if (rest.length) {
          gsap.from(rest, {
            y: 22,
            opacity: 0,
            duration: 0.85,
            stagger: 0.09,
            delay: heads.length ? 0.15 : 0,
            ease: 'power3.out',
          })
        }
      })
    }, el)

    return () => ctx.revert()
  }, [inView])

  return (
    <div ref={ref} className={`opacity-0 ${className}`}>
      {children}
    </div>
  )
}
