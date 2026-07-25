import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useInView } from '../hooks/useInView'

export default function FeatureCard({ icon, title, description, index }) {
  const cardRef = useRef()
  const isInView = useInView(cardRef, { threshold: 0.3 })

  useEffect(() => {
    if (isInView && cardRef.current) {
      gsap.to(cardRef.current, {
        duration: 0.8,
        opacity: 1,
        y: 0,
        delay: index * 0.2,
        ease: 'power3.out',
      })
    }
  }, [isInView, index])

  return (
    <div
      ref={cardRef}
      className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-900/20 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 opacity-0 translate-y-8 cursor-pointer overflow-hidden"
      onMouseEnter={(e) => {
        gsap.to(e.currentTarget, {
          duration: 0.3,
          y: -8,
          boxShadow: '0 20px 40px rgba(0, 102, 255, 0.2)',
        })
      }}
      onMouseLeave={(e) => {
        gsap.to(e.currentTarget, {
          duration: 0.3,
          y: 0,
          boxShadow: 'none',
        })
      }}
    >
      {/* Background gradient animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/0 to-cyan-500/0 group-hover:from-blue-600/10 group-hover:via-cyan-500/10 group-hover:to-blue-600/0 transition-all duration-300"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center mb-6 text-2xl group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 group-hover:text-cyan-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
      </div>

      {/* Border animation */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-blue-500/20 group-hover:via-cyan-500/20 group-hover:to-blue-500/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  )
}
