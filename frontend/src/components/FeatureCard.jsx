import { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { useInView } from '../hooks/useInView'

export default function FeatureCard({
  icon,
  title,
  description,
  index,
  subtitle,
  gradient = 'from-blue-600 to-cyan-500',
  stats,
  cta,
  metrics = [],
}) {
  const cardRef = useRef()
  const contentRef = useRef()
  const isInView = useInView(cardRef, { threshold: 0.3 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (isInView && cardRef.current) {
      gsap.to(cardRef.current, {
        duration: 0.8,
        opacity: 1,
        y: 0,
        delay: index * 0.15,
        ease: 'power3.out',
      })
    }
  }, [isInView, index])

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    setMousePosition({ x, y })

    gsap.to(cardRef.current, {
      duration: 0.3,
      '--mouse-x': `${x * 10}deg`,
      '--mouse-y': `${y * 10}deg`,
      ease: 'power2.out',
    })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        gsap.to(cardRef.current, {
          duration: 0.3,
          '--mouse-x': '0deg',
          '--mouse-y': '0deg',
        })
      }}
      className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-blue-500/30 hover:border-cyan-500/60 transition-all duration-300 opacity-0 translate-y-8 cursor-pointer overflow-hidden"
      onMouseEnter={(e) => {
        gsap.to(e.currentTarget, {
          duration: 0.3,
          y: -12,
          boxShadow: '0 30px 60px rgba(0, 217, 255, 0.25)',
        })
      }}
      onMouseLeave={(e) => {
        gsap.to(e.currentTarget, {
          duration: 0.3,
          y: 0,
          boxShadow: '0 10px 30px rgba(0, 102, 255, 0.1)',
        })
      }}
      style={{
        transform: `perspective(1000px) rotateX(var(--mouse-y, 0)) rotateY(var(--mouse-x, 0))`,
      }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-purple-600/5 to-cyan-500/0 group-hover:from-blue-600/15 group-hover:via-purple-600/20 group-hover:to-cyan-500/15 transition-all duration-500"></div>

      {/* Glow effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/0 via-cyan-500/0 to-blue-600/0 group-hover:from-blue-600/30 group-hover:via-cyan-500/30 group-hover:to-blue-600/30 blur-xl opacity-0 group-hover:opacity-50 transition-all duration-500 -z-10"></div>

      {/* Content */}
      <div className="relative z-10" ref={contentRef}>
        <div className="flex items-start justify-between mb-6">
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-3xl group-hover:shadow-2xl group-hover:shadow-cyan-500/50 transition-all duration-300 transform group-hover:scale-110`}>
            {icon}
          </div>
          {stats && (
            <div className="text-right">
              <div className="text-2xl font-bold gradient-text">{stats}</div>
            </div>
          )}
        </div>

        <h3 className="text-2xl font-bold mb-2 group-hover:text-cyan-300 transition-colors duration-300 group-hover:translate-x-1">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-cyan-400/70 mb-3 font-medium">{subtitle}</p>
        )}

        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-6 leading-relaxed">
          {description}
        </p>

        {metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mb-6 py-4 border-t border-blue-500/20">
            {metrics.map((metric, idx) => (
              <div key={idx} className="text-xs">
                <div className="text-cyan-400 font-bold">{metric.value}</div>
                <div className="text-gray-500">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        {cta && (
          <button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-blue-600/20 to-cyan-500/20 hover:from-blue-600/40 hover:to-cyan-500/40 border border-blue-500/30 hover:border-cyan-500/60 rounded-lg text-sm font-medium text-cyan-300 transition-all duration-300 group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100">
            {cta}
          </button>
        )}
      </div>

      {/* Border animation */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-blue-500/30 group-hover:via-cyan-500/30 group-hover:to-blue-500/30 pointer-events-none opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
    </div>
  )
}
