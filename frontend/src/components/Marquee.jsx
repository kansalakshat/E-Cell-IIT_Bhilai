import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* The strip reacts to how you scroll. Flick the page and it accelerates;
   scroll back up and it runs backwards; stop and it eases down to its own
   pace in whichever direction you left it.

   This is why it is GSAP and not the CSS keyframe it replaces: the speed has
   to be a live value, and timeScale is the one knob that changes it without
   restarting the loop or dropping the strip mid-travel. */
export default function Marquee({ items }) {
  const track = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        /* The row holds two identical halves, so travelling exactly -50%
           lands the second half where the first began and the repeat is
           invisible. */
        const loop = gsap.to(track.current, {
          xPercent: -50,
          duration: 34,
          ease: 'none',
          repeat: -1,
        })

        ScrollTrigger.create({
          onUpdate: (self) => {
            const boost = gsap.utils.clamp(1, 6, Math.abs(self.getVelocity()) / 380)
            /* Snap to the boosted speed, then coast back to baseline. Doing
               it as one timeline means there is no need to detect when
               scrolling stopped: the settle is already scheduled, and the
               next scroll event simply overwrites it. */
            gsap
              .timeline({ overwrite: true })
              .set(loop, { timeScale: self.direction * boost })
              .to(loop, { timeScale: self.direction, duration: 0.9, ease: 'power2.out' })
          },
        })
      })
    }, track)

    return () => ctx.revert()
  }, [])

  return (
    <div className="overflow-hidden border-y border-stone bg-red py-5">
      <div ref={track} className="flex w-max gap-12 whitespace-nowrap">
        {/* Two halves, each a full pass of the list. -50% is what makes the
            seam land exactly, so this count is load-bearing. */}
        {Array.from({ length: 2 }).map((_, half) => (
          <span
            key={half}
            aria-hidden={half === 1 || undefined}
            className="display flex items-center gap-12 text-xl uppercase tracking-wide text-white"
          >
            {items.map((label) => (
              <span key={label} className="flex items-center gap-12">
                {label}
                <span className="text-white/45">/</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
