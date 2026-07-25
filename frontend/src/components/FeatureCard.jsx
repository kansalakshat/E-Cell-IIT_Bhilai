import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useInView } from '../hooks/useInView'

export default function FeatureCard({
  icon,
  title,
  description,
  index,
  subtitle,
  stats,
  cta,
  metrics = [],
}) {
  const cardRef = useRef()
  const contentRef = useRef()
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
      className="group relative p-12 opacity-0 translate-y-12 cursor-pointer overflow-hidden transition-all duration-500"
      onMouseEnter={(e) => {
        gsap.to(e.currentTarget, {
          duration: 0.4,
          y: -8,
          boxShadow: '0 40px 80px rgba(255, 107, 53, 0.15)',
        })
      }}
      onMouseLeave={(e) => {
        gsap.to(e.currentTarget, {
          duration: 0.4,
          y: 0,
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        })
      }}
    >
      {/* Minimalist Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-950 rounded-3xl"></div>

      {/* Subtle Border Glow */}
      <div className="absolute inset-0 rounded-3xl border border-orange-500/20 group-hover:border-orange-500/40 transition-colors duration-500"></div>

      {/* Gradient Accent Line (six2eight style) */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-600 via-orange-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Content */}
      <div className="relative z-10" ref={contentRef}>
        {/* Icon with Premium Styling */}
        <div className="text-6xl mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:-rotate-6">
          {icon}
        </div>

        {/* Title - Large & Bold (six2eight style) */}
        <h3 className="text-4xl md:text-5xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-orange-300 group-hover:bg-clip-text transition-all duration-500 leading-tight">
          {title}
        </h3>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-sm md:text-base text-orange-400 mb-6 font-medium uppercase tracking-wider">
            {subtitle}
          </p>
        )}

        {/* Description - Spacious */}
        <p className="text-base md:text-lg text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mb-8 leading-relaxed font-light">
          {description}
        </p>

        {/* Metrics Grid - Six2Eight Style */}
        {metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-8 mb-10 py-8">
            {metrics.map((metric, idx) => (
              <div key={idx} className="group/metric">
                <div className="text-3xl md:text-4xl font-bold text-orange-500 group-hover/metric:text-orange-400 transition-colors">
                  {metric.value}
                </div>
                <div className="text-sm md:text-base text-gray-500 mt-2">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Badge */}
        {stats && (
          <div className="inline-block mb-8 px-6 py-3 bg-orange-500/10 border border-orange-500/30 rounded-full">
            <span className="text-orange-400 font-semibold">{stats}</span>
          </div>
        )}

        {/* CTA Button - Premium */}
        {cta && (
          <button className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-full transition-all duration-300 group-hover/btn:gap-4">
            {cta}
            <svg className="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        )}
      </div>

      {/* Premium Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/0 via-orange-500/0 to-orange-600/0 group-hover:from-orange-600/20 group-hover:via-orange-500/20 group-hover:to-orange-600/20 rounded-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-2xl pointer-events-none"></div>
    </div>
  )
}
