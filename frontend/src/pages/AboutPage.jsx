import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function AboutPage() {
  const pageRef = useRef()

  useEffect(() => {
    gsap.fromTo(
      pageRef.current?.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    )
  }, [])

  return (
    <div ref={pageRef} className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-dark to-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-6xl font-bold mb-6 gradient-text">About E-Cell</h1>
          <p className="text-2xl text-gray-300 max-w-4xl">
            Empowering the next generation of entrepreneurs to innovate, execute, and create impact
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-10 rounded-2xl bg-gradient-to-br from-blue-600/10 to-cyan-500/10 border border-blue-500/20">
              <h2 className="text-4xl font-bold mb-6 gradient-text">Our Vision</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                To build a vibrant entrepreneurial ecosystem at IIT Bhilai where students are encouraged to innovate, create, lead, and solve real-world challenges through entrepreneurship and technology.
              </p>
            </div>
            <div className="p-10 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-blue-600/10 border border-blue-500/20">
              <h2 className="text-4xl font-bold mb-6 gradient-text">Our Mission</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Promote entrepreneurial thinking, bridge academia-industry gap, encourage innovation through real-world challenges, develop leadership skills, and create opportunities for networking and collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-b from-slate-900/50 to-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '💡', title: 'Innovation', desc: 'Creative thinking and breakthrough ideas' },
              { icon: '⚡', title: 'Execution', desc: 'Turning ideas into reality' },
              { icon: '👑', title: 'Leadership', desc: 'Inspiring and leading by example' },
              { icon: '🎯', title: 'Ownership', desc: 'Taking charge and accountability' },
              { icon: '🤝', title: 'Collaboration', desc: 'Working together towards common goals' },
              { icon: '🧩', title: 'Problem Solving', desc: 'Finding creative solutions' },
              { icon: '📈', title: 'Continuous Learning', desc: 'Growing every day' },
              { icon: '🌍', title: 'Impact', desc: 'Creating value for society' },
            ].map((value, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-gradient-to-br from-blue-600/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 text-center group"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-cyan-400 transition-colors">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-400">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">What We Do</h2>
          <div className="space-y-8">
            {[
              {
                title: 'Speaker Sessions',
                desc: 'Interactive talks featuring startup founders, entrepreneurs, VCs, product managers, and industry leaders sharing real-world insights and practical knowledge.'
              },
              {
                title: 'Real-World Problem Statements',
                desc: 'Industry experts provide authentic challenges. Students analyze problems, research solutions, build prototypes, and develop innovative products.'
              },
              {
                title: 'Flagship Events & Competitions',
                desc: 'Hackathons, case competitions, innovation challenges, and startup showcases that encourage creative thinking and practical execution.'
              },
              {
                title: 'Startup Culture',
                desc: 'Comprehensive learning in idea validation, design thinking, business models, customer discovery, MVP development, and pitch deck preparation.'
              },
              {
                title: 'Hands-on Learning',
                desc: 'Members develop leadership, communication, event management, and professional networking skills through organizing and executing large-scale initiatives.'
              },
              {
                title: 'Collaborations & Outreach',
                desc: 'Partnerships with other institutes and organizations to expand opportunities through cross-campus competitions and knowledge exchange.'
              },
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-xl bg-gradient-to-r from-blue-600/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300">
                <h3 className="text-2xl font-bold mb-3 gradient-text">{item.title}</h3>
                <p className="text-gray-300 text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who Can Join */}
      <section className="py-20 bg-gradient-to-b from-slate-900/50 to-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-12 text-center">Who Can Join?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-10 rounded-2xl bg-gradient-to-br from-red-600/10 to-pink-600/10 border border-red-500/20">
              <h3 className="text-2xl font-bold mb-6 text-red-400">You Don't Need...</h3>
              <ul className="space-y-4 text-gray-300">
                {['A startup idea', 'Business knowledge', 'Finance knowledge', 'Marketing experience', 'Prior entrepreneurial experience'].map((item, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="text-red-400 mr-3 text-xl">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-10 rounded-2xl bg-gradient-to-br from-green-600/10 to-emerald-600/10 border border-green-500/20">
              <h3 className="text-2xl font-bold mb-6 text-green-400">We Value...</h3>
              <ul className="space-y-4 text-gray-300">
                {['Curiosity', 'Initiative', 'Passion', 'Creativity', 'Consistency', 'Willingness to Learn', 'Ownership', 'Teamwork'].map((item, idx) => (
                  <li key={idx} className="flex items-center">
                    <span className="text-green-400 mr-3 text-xl">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="text-center mt-12">
            <p className="text-xl text-gray-300 mb-6">
              Skills can be learned. The right mindset is what truly matters.
            </p>
            <button className="btn-primary">Join E-Cell Today</button>
          </div>
        </div>
      </section>
    </div>
  )
}
