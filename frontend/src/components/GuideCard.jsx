import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useInView } from '../hooks/useInView'

export default function GuideCard({
  number,
  title,
  description,
  steps = [],
  icon,
  duration,
  difficulty = 'Intermediate',
  index = 0,
}) {
  const cardRef = useRef()
  const isInView = useInView(cardRef, { threshold: 0.3 })
  const [expanded, setExpanded] = useInView ? [false] : [true]

  useEffect(() => {
    if (isInView && cardRef.current) {
      gsap.to(cardRef.current, {
        duration: 0.8,
        opacity: 1,
        x: 0,
        delay: index * 0.1,
        ease: 'power3.out',
      })
    }
  }, [isInView, index])

  const difficultyColor = {
    Beginner: 'from-green-500 to-emerald-600',
    Intermediate: 'from-blue-500 to-cyan-600',
    Advanced: 'from-purple-500 to-pink-600',
  }[difficulty]

  return (
    <div
      ref={cardRef}
      className="group relative opacity-0 -translate-x-8 transition-all duration-500"
    >
      {/* Card Container */}
      <div className="relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/60 to-slate-900/30 border border-blue-500/20 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden cursor-pointer"
        onMouseEnter={(e) => {
          gsap.to(e.currentTarget, {
            duration: 0.3,
            y: -8,
            boxShadow: '0 20px 50px rgba(0, 217, 255, 0.2)',
          })
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, {
            duration: 0.3,
            y: 0,
            boxShadow: '0 10px 30px rgba(0, 102, 255, 0.1)',
          })
        }}
      >
        {/* Step Number Circle */}
        <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-3xl font-bold text-white opacity-90 group-hover:opacity-100 transition-opacity duration-300 shadow-2xl">
          {String(number).padStart(2, '0')}
        </div>

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1 pt-4">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
              {title}
            </h3>
            <div className="flex items-center gap-3">
              <span className={`inline-block px-2 py-1 rounded-lg text-xs font-semibold bg-gradient-to-r ${difficultyColor} text-white`}>
                {difficulty}
              </span>
              {duration && (
                <span className="text-xs text-gray-400">⏱ {duration}</span>
              )}
            </div>
          </div>
          {icon && (
            <div className="text-3xl ml-4">{icon}</div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Steps List */}
        {steps.length > 0 && (
          <div className="bg-slate-900/50 rounded-xl p-4 mb-6 max-h-48 overflow-y-auto">
            <h4 className="text-sm font-bold text-cyan-400 mb-3">Key Steps:</h4>
            <ul className="space-y-2">
              {steps.map((step, idx) => (
                <li key={idx} className="flex gap-3 items-start text-sm text-gray-400">
                  <span className="text-cyan-500 font-bold min-w-max">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 uppercase tracking-wider">Learning Path</span>
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600/20 to-cyan-500/20 hover:from-blue-600/40 hover:to-cyan-500/40 border border-blue-500/30 text-cyan-300 text-sm font-medium transition-all duration-300 hover:border-cyan-500/60">
            Start Now
          </button>
        </div>
      </div>

      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>
    </div>
  )
}
