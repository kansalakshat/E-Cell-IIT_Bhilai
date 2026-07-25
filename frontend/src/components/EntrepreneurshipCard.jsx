import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useInView } from '../hooks/useInView'

export default function EntrepreneurshipCard({
  title,
  description,
  image,
  category = 'Journey',
  gradient = 'from-blue-600 to-cyan-500',
  icon,
  highlights = [],
  index = 0,
  isLarge = false,
}) {
  const cardRef = useRef()
  const imageRef = useRef()
  const isInView = useInView(cardRef, { threshold: 0.2 })

  useEffect(() => {
    if (isInView && cardRef.current) {
      gsap.to(cardRef.current, {
        duration: 0.9,
        opacity: 1,
        y: 0,
        delay: index * 0.12,
        ease: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      })
    }
  }, [isInView, index])

  return (
    <div
      ref={cardRef}
      className={`group relative opacity-0 translate-y-12 overflow-hidden rounded-2xl transition-all duration-500 ${
        isLarge ? 'md:col-span-2 md:row-span-2' : ''
      }`}
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-900/80 to-slate-900/60 z-0"></div>

      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Content wrapper */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Image/Visual Section */}
        {image && (
          <div className="relative h-48 md:h-64 overflow-hidden bg-gradient-to-br from-blue-900/30 to-cyan-900/20">
            <img
              ref={imageRef}
              src={image}
              alt={title}
              className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${gradient} text-white backdrop-blur-sm shadow-lg`}>
            {category}
          </span>
        </div>

        {/* Icon Circle */}
        {icon && (
          <div className={`absolute ${image ? '-bottom-8 left-6' : 'top-6 left-6'} w-16 h-16 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-3xl shadow-2xl z-20 group-hover:shadow-cyan-500/50 transition-shadow duration-500 group-hover:scale-110 group-hover:-rotate-6`}>
            {icon}
          </div>
        )}

        {/* Text Content */}
        <div className={`flex-1 flex flex-col ${image ? 'p-8 pt-12' : 'p-8'}`}>
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white group-hover:text-cyan-300 transition-colors duration-300 leading-tight">
            {title}
          </h3>

          <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-6 flex-1 leading-relaxed">
            {description}
          </p>

          {/* Highlights */}
          {highlights.length > 0 && (
            <div className="space-y-2 mb-6 py-4 border-t border-blue-500/20">
              {highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
                  {highlight}
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center gap-2 text-cyan-400 font-medium group-hover:gap-3 transition-all duration-300">
            <span>Explore Journey</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-radial-gradient opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"></div>

      {/* Border */}
      <div className="absolute inset-0 border border-blue-500/20 group-hover:border-cyan-500/50 rounded-2xl transition-colors duration-500 pointer-events-none"></div>
    </div>
  )
}
