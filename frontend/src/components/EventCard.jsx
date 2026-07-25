import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function EventCard({ event }) {
  const cardRef = useRef()

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return

      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      gsap.to(cardRef.current, {
        duration: 0.3,
        '--mouse-x': `${x}px`,
        '--mouse-y': `${y}px`,
        ease: 'power2.out',
      })
    }

    cardRef.current?.addEventListener('mousemove', handleMouseMove)
    return () => cardRef.current?.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={cardRef}
      className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-900/30 to-slate-900/50 group-hover:from-blue-600/20 group-hover:to-cyan-500/20 transition-all duration-500"></div>

      {/* Border */}
      <div className="absolute inset-0 border border-blue-500/20 group-hover:border-blue-500/50 rounded-2xl transition-all duration-300"></div>

      {/* Content */}
      <div className="relative h-full p-8 flex flex-col justify-between z-10">
        <div>
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-600/20 text-blue-300 mb-4 group-hover:bg-blue-600/30 transition-colors">
            {event.type}
          </span>
          <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors duration-300">
            {event.title}
          </h3>
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
            {event.description}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {new Date(event.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </span>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-cyan-500/0 to-blue-600/0 group-hover:from-blue-600/10 group-hover:via-cyan-500/10 group-hover:to-blue-600/10 transition-all duration-300"></div>
    </div>
  )
}
