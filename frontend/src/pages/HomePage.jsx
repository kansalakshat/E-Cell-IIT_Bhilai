import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero3D from '../components/Hero3D'
import FeatureCard from '../components/FeatureCard'
import EventCard from '../components/EventCard'
import { useInView } from '../hooks/useInView'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: '💡',
    title: 'Innovation',
    description: 'Foster creative thinking and breakthrough ideas that solve real-world problems',
  },
  {
    icon: '🚀',
    title: 'Execution',
    description: 'Transform ideas into tangible products and impactful solutions',
  },
  {
    icon: '👥',
    title: 'Collaboration',
    description: 'Connect with like-minded entrepreneurs and industry leaders',
  },
  {
    icon: '📚',
    title: 'Learning',
    description: 'Gain practical skills beyond classroom through real-world challenges',
  },
  {
    icon: '🎯',
    title: 'Leadership',
    description: 'Develop leadership and ownership skills through hands-on experience',
  },
  {
    icon: '🌟',
    title: 'Impact',
    description: 'Create value for society through entrepreneurial thinking',
  },
]

const events = [
  {
    id: 1,
    title: "Startup Founder Panel",
    date: "2024-08-15",
    description: "Learn from successful founders about their journey",
    type: "speaker_session"
  },
  {
    id: 2,
    title: "Innovation Hackathon",
    date: "2024-09-01",
    description: "48-hour hackathon to build innovative solutions",
    type: "competition"
  },
  {
    id: 3,
    title: "Problem Statement Challenge",
    date: "2024-09-15",
    description: "Solve real-world industry challenges",
    type: "challenge"
  },
]

// Premium testimonials
const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Co-founder, TechStartup",
    quote: "E-Cell gave me the platform and mentorship I needed to launch my startup. The network alone is invaluable!",
    year: "2022 Batch"
  },
  {
    name: "Priya Patel",
    role: "Product Manager, Amazon",
    quote: "The problem-solving skills I gained through E-Cell competitions helped me excel in my career.",
    year: "2021 Batch"
  },
  {
    name: "Arjun Kumar",
    role: "Investor, Venture Capital Fund",
    quote: "The quality of ideas and execution from E-Cell members is consistently impressive. Worth tracking!",
    year: "2020 Batch"
  },
]

export default function HomePage() {
  const statsRef = useRef()
  const featuresRef = useRef()
  const eventsRef = useRef()

  const statsInView = useInView(statsRef, { threshold: 0.5 })
  const featuresInView = useInView(featuresRef, { threshold: 0.2 })

  useEffect(() => {
    if (statsInView && statsRef.current) {
      const stats = statsRef.current.querySelectorAll('.stat-number')
      stats.forEach((stat) => {
        const targetNumber = parseInt(stat.getAttribute('data-target'))
        gsap.to(stat, {
          innerText: targetNumber,
          duration: 2,
          snap: { innerText: 1 },
          ease: 'power2.out',
        })
      })
    }
  }, [statsInView])

  return (
    <div className="overflow-hidden">
      {/* Hero Section with 3D */}
      <Hero3D />

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-gradient-to-b from-dark to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: 500, label: 'Active Members' },
              { number: 50, label: 'Events Yearly' },
              { number: 20, label: 'Startups Founded' },
              { number: 100, label: 'Mentors' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="stat-number text-4xl md:text-5xl font-bold gradient-text mb-2" data-target={stat.number}>
                  0
                </div>
                <p className="text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6">About E-Cell</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                The Entrepreneurship Cell (E-Cell) at IIT Bhilai is the official entrepreneurship and innovation body dedicated to fostering an entrepreneurial mindset among students.
              </p>
              <p className="text-gray-400 mb-8">
                We believe that entrepreneurship is not merely about starting companies—it's about identifying opportunities, solving meaningful problems, building impactful solutions, and creating value for society.
              </p>
              <button className="btn-primary">Learn More</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Vision', desc: 'Build a vibrant entrepreneurial ecosystem' },
                { title: 'Mission', desc: 'Promote entrepreneurial thinking across all disciplines' },
                { title: 'Values', desc: 'Innovation, Execution, Leadership, Impact' },
                { title: 'Culture', desc: 'Collaboration, Problem Solving, Continuous Learning' },
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-gradient-to-br from-blue-600/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300">
                  <h3 className="font-bold text-cyan-400 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-gradient-to-b from-slate-900/50 to-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">What We Offer</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Comprehensive programs designed to nurture innovation and entrepreneurial excellence
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <FeatureCard key={idx} {...feature} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Our Initiatives</h2>
            <p className="text-xl text-gray-400">Programs that shape tomorrow's entrepreneurs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Speaker Sessions',
                desc: 'Interactive talks with entrepreneurs, VCs, and industry leaders',
                points: ['Startup founders', 'Venture Capitalists', 'Product Managers', 'Technology Leaders']
              },
              {
                title: 'Real-World Problem Statements',
                desc: 'Solve authentic industry challenges and build innovative solutions',
                points: ['Industry challenges', 'Research & develop', 'Build prototypes', 'Present ideas']
              },
              {
                title: 'Competitions & Events',
                desc: 'Showcase your skills through various competitions',
                points: ['Case Competitions', 'Hackathons', 'Innovation Challenges', 'Pitch Competitions']
              },
              {
                title: 'Startup Culture',
                desc: 'Learn and implement startup fundamentals',
                points: ['Idea Validation', 'Design Thinking', 'MVP Development', 'Pitch Deck Preparation']
              },
            ].map((initiative, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-gradient-to-br from-blue-600/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 group"
              >
                <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                  {initiative.title}
                </h3>
                <p className="text-gray-400 mb-6">{initiative.desc}</p>
                <ul className="space-y-2">
                  {initiative.points.map((point, pidx) => (
                    <li key={pidx} className="text-sm text-gray-300 flex items-start">
                      <span className="text-cyan-400 mr-3">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section ref={eventsRef} className="py-20 bg-gradient-to-b from-slate-900/50 to-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-xl text-gray-400">Join us for exciting opportunities and experiences</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          <div className="text-center">
            <button className="btn-primary">View All Events</button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-b from-dark to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">What Our Community Says</h2>
            <p className="text-xl text-gray-400">Stories from members who transformed their ideas into reality</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-2xl bg-gradient-to-br from-slate-900/60 to-slate-900/30 border border-blue-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10"
              >
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-300 italic mb-6 text-lg">"{testimonial.quote}"</p>
                <div className="border-t border-blue-500/20 pt-6">
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-cyan-400">{testimonial.role}</p>
                  <p className="text-xs text-gray-500 mt-2">{testimonial.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-20 bg-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-blue-500/5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Why Join E-Cell?</h2>
            <p className="text-xl text-gray-400">Unlock your entrepreneurial potential</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🎯', title: 'Clear Direction', desc: 'Structured programs to guide your entrepreneurial journey' },
              { icon: '🤝', title: 'Mentorship', desc: 'Learn from experienced entrepreneurs and industry leaders' },
              { icon: '💼', title: 'Funding Support', desc: 'Access to investors and funding opportunities' },
              { icon: '🔗', title: 'Network', desc: 'Connect with passionate students and professionals' },
              { icon: '🛠️', title: 'Practical Skills', desc: 'Real-world experience beyond classroom learning' },
              { icon: '🏆', title: 'Recognition', desc: 'Showcase your ideas and win prestigious competitions' },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-xl bg-gradient-to-br from-blue-600/10 to-cyan-500/10 border border-blue-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-105"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-blue-600/20 border-y border-blue-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Active Members' },
              { number: '50+', label: 'Annual Events' },
              { number: '20+', label: 'Startups Founded' },
              { number: '100+', label: 'Expert Mentors' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="text-3xl md:text-4xl font-bold gradient-text group-hover:text-cyan-400 transition-colors">
                  {stat.number}
                </div>
                <p className="text-gray-400 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Premium */}
      <section className="py-32 bg-dark relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-6xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Don't Just Dream.</span>
            <br />
            <span className="text-white">Build. Ship. Scale.</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join a community of 500+ ambitious students who are turning ideas into impactful businesses. Get mentorship, funding, and the network you need to succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg font-semibold text-white text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105">
              Join E-Cell Today
            </button>
            <button className="px-10 py-4 border-2 border-cyan-400 text-cyan-400 rounded-lg font-semibold hover:bg-cyan-400/10 transition-all duration-300">
              Learn More
            </button>
          </div>
          <p className="text-gray-500">No experience needed. Just bring your passion and ideas. 🚀</p>
        </div>
      </section>
    </div>
  )
}
