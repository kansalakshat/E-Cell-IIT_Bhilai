import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useInView } from '../hooks/useInView'

export default function EventGallery({
  title,
  description,
  events = [],
  index = 0,
}) {
  const sectionRef = useRef()
  const isInView = useInView(sectionRef, { threshold: 0.2 })

  useEffect(() => {
    if (isInView && sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll('.event-card')
      gsap.to(cards, {
        duration: 0.8,
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: 'power3.out',
      })
    }
  }, [isInView])

  return (
    <section ref={sectionRef} className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="event-card group relative opacity-0 translate-y-8 rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative h-80 overflow-hidden bg-gradient-to-br from-blue-900/30 to-cyan-900/20">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent"></div>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                {/* Category Badge */}
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${event.gradient} text-white backdrop-blur-sm`}>
                    {event.category}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                  {event.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 group-hover:text-gray-200 transition-colors duration-300">
                  {event.description}
                </p>

                {/* Stats */}
                {event.stats && (
                  <div className="flex gap-4 text-sm">
                    {event.stats.map((stat, sidx) => (
                      <div key={sidx} className="text-cyan-400">
                        <div className="font-bold">{stat.value}</div>
                        <div className="text-gray-500 text-xs">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <div className="flex items-center gap-2 text-cyan-400 font-medium mt-4 group-hover:gap-3 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                  <span>View Gallery</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>

              {/* Border */}
              <div className="absolute inset-0 border border-blue-500/20 group-hover:border-cyan-500/50 rounded-2xl transition-colors duration-300 pointer-events-none"></div>

              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-cyan-500/0 to-blue-600/0 group-hover:from-blue-600/20 group-hover:via-cyan-500/20 group-hover:to-blue-600/20 transition-all duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
