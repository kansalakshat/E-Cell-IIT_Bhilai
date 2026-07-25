import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero3D from '../components/Hero3D'
import FeatureCard from '../components/FeatureCard'
import EventCard from '../components/EventCard'
import EntrepreneurshipCard from '../components/EntrepreneurshipCard'
import GuideCard from '../components/GuideCard'
import Stats3D from '../components/Stats3D'
import { useInView } from '../hooks/useInView'

gsap.registerPlugin(ScrollTrigger)

const coreValues = [
  {
    icon: '💡',
    title: 'Innovation',
    subtitle: 'Disruptive Thinking',
    description: 'Foster breakthrough ideas that solve real-world problems and create market opportunities',
    gradient: 'from-blue-600 to-cyan-500',
    metrics: [
      { value: '100+', label: 'Ideas Incubated' },
      { value: '24h', label: 'Hackathons' },
    ],
    cta: 'Submit Idea',
  },
  {
    icon: '🚀',
    title: 'Execution',
    subtitle: 'From Concept to MVP',
    description: 'Transform ideas into tangible products with actionable strategies and frameworks',
    gradient: 'from-purple-600 to-pink-500',
    metrics: [
      { value: '20+', label: 'MVPs Built' },
      { value: '6mo', label: 'Launch Cycle' },
    ],
    cta: 'Build Now',
  },
  {
    icon: '👥',
    title: 'Collaboration',
    subtitle: 'Ecosystem Building',
    description: 'Network with mentors, investors, and fellow entrepreneurs in thriving community',
    gradient: 'from-cyan-600 to-blue-500',
    metrics: [
      { value: '500+', label: 'Network' },
      { value: '100+', label: 'Mentors' },
    ],
    cta: 'Connect',
  },
  {
    icon: '📈',
    title: 'Growth',
    subtitle: 'Scaling Strategies',
    description: 'Learn data-driven growth hacking and business scaling techniques',
    gradient: 'from-green-600 to-emerald-500',
    metrics: [
      { value: '5x', label: 'Avg Growth' },
      { value: '$50M+', label: 'Fundraised' },
    ],
    cta: 'Scale Up',
  },
  {
    icon: '🎯',
    title: 'Leadership',
    subtitle: 'Founder DNA',
    description: 'Develop entrepreneurial leadership skills and founding team dynamics',
    gradient: 'from-orange-600 to-red-500',
    metrics: [
      { value: '15+', label: 'Startups Led' },
      { value: '80%', label: 'Success Rate' },
    ],
    cta: 'Lead',
  },
  {
    icon: '🌍',
    title: 'Impact',
    subtitle: 'Sustainable Value',
    description: 'Create measurable social and environmental impact through business innovation',
    gradient: 'from-teal-600 to-cyan-500',
    metrics: [
      { value: '1000+', label: 'Lives Changed' },
      { value: 'Global', label: 'Reach' },
    ],
    cta: 'Make Impact',
  },
]

// Entrepreneurship journey data
const entrepreneurshipJourneys = [
  {
    title: 'From Student to Founder',
    description: 'Real stories of IIT Bhilai students who turned their ideas into successful ventures',
    category: 'Success Story',
    icon: '🚀',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    highlights: ['First 100 customers', 'Series A funding', 'Global expansion'],
  },
  {
    title: 'Building in Deep Tech',
    description: 'Exploring opportunities in AI, blockchain, and quantum computing startups',
    category: 'Deep Tech',
    icon: '⚙️',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
    highlights: ['Technical moat', 'Patent portfolio', 'Enterprise clients'],
    isLarge: true,
  },
  {
    title: 'B2B SaaS Playbook',
    description: 'Learn proven strategies for building B2B software businesses at scale',
    category: 'SaaS',
    icon: '📊',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    highlights: ['CAC optimization', 'LTV models', 'Enterprise sales'],
  },
]

// Guides data
const entrepreneurshipGuides = [
  {
    number: 1,
    title: 'Validate Your Idea',
    description: 'Learn proven methods to validate product-market fit before building',
    icon: '✓',
    difficulty: 'Beginner',
    duration: '2 weeks',
    steps: [
      'Define your target customer with precision',
      'Conduct 20+ customer interviews',
      'Build and test landing page',
      'Measure product-market fit signals',
      'Iterate based on feedback',
    ],
  },
  {
    number: 2,
    title: 'Build Your MVP',
    description: 'Create minimum viable product with lean methodology',
    icon: '🔨',
    difficulty: 'Intermediate',
    duration: '4-6 weeks',
    steps: [
      'Define core features only',
      'Choose tech stack wisely',
      'Set realistic launch timeline',
      'Build with first customers in mind',
      'Deploy and gather feedback',
    ],
  },
  {
    number: 3,
    title: 'Raise Funding',
    description: 'Master the art of pitching and closing investor rounds',
    icon: '💰',
    difficulty: 'Intermediate',
    duration: '3 months',
    steps: [
      'Prepare financial projections',
      'Create compelling pitch deck',
      'Build investor relationships',
      'Negotiate terms effectively',
      'Close your first round',
    ],
  },
  {
    number: 4,
    title: 'Go-to-Market Strategy',
    description: 'Launch and scale your product with data-driven GTM',
    icon: '🎯',
    difficulty: 'Advanced',
    duration: '6 months',
    steps: [
      'Identify ideal customer profile',
      'Design acquisition channels',
      'Implement referral programs',
      'Measure all metrics religiously',
      'Optimize and scale profitably',
    ],
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

      {/* Stats Section with 3D */}
      <section ref={statsRef} className="py-20 bg-gradient-to-b from-dark to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 3D Visualization */}
            <div className="h-96 rounded-2xl border border-blue-500/20 overflow-hidden">
              <Stats3D />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-8">
              {[
                { number: 500, label: 'Active Members', icon: '👥' },
                { number: 50, label: 'Events Yearly', icon: '🎯' },
                { number: 20, label: 'Startups Founded', icon: '🚀' },
                { number: 100, label: 'Expert Mentors', icon: '🎓' },
              ].map((stat, idx) => (
                <div key={idx} className="text-center group">
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="stat-number text-4xl md:text-5xl font-bold gradient-text mb-2 group-hover:text-cyan-300 transition-colors" data-target={stat.number}>
                    0
                  </div>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
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

      {/* Core Values Section */}
      <section ref={featuresRef} className="py-20 bg-gradient-to-b from-slate-900/50 to-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Core Values of E-Cell</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Six pillars that define our entrepreneurial ecosystem
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, idx) => (
              <FeatureCard
                key={idx}
                {...value}
                index={idx}
                stats={value.metrics[0]?.value}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Entrepreneurship Journeys Section */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Entrepreneurship Journeys</h2>
            <p className="text-xl text-gray-400">Real stories and playbooks from successful founders</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {entrepreneurshipJourneys.map((journey, idx) => (
              <EntrepreneurshipCard
                key={idx}
                {...journey}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Learning Guides Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900/50 to-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Entrepreneurship Roadmap</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Structured learning paths to guide your startup journey from idea to scale
            </p>
          </div>
          <div className="space-y-6">
            {entrepreneurshipGuides.map((guide, idx) => (
              <GuideCard
                key={idx}
                {...guide}
                index={idx}
              />
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

      {/* Startup Benchmarks Section */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4">Startup Success Metrics</h2>
            <p className="text-xl text-gray-400">Data-driven insights from our portfolio</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                metric: '20+',
                label: 'Active Startups',
                desc: 'Portfolio companies',
                icon: '📈',
                gradient: 'from-blue-600 to-cyan-500',
              },
              {
                metric: '$50M+',
                label: 'Funds Raised',
                desc: 'By E-Cell founders',
                icon: '💰',
                gradient: 'from-green-600 to-emerald-500',
              },
              {
                metric: '80%',
                label: 'Success Rate',
                desc: 'Surviving ventures',
                icon: '✓',
                gradient: 'from-purple-600 to-pink-500',
              },
              {
                metric: '1000+',
                label: 'Jobs Created',
                desc: 'By our founders',
                icon: '👥',
                gradient: 'from-orange-600 to-red-500',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative p-8 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-blue-500/30 hover:border-cyan-500/60 transition-all duration-300 overflow-hidden"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    duration: 0.3,
                    y: -8,
                    boxShadow: '0 20px 40px rgba(0, 217, 255, 0.2)',
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
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-2xl mb-4 group-hover:shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300`}>
                  {item.icon}
                </div>
                <div className="text-4xl font-bold gradient-text mb-2">{item.metric}</div>
                <h3 className="text-lg font-bold text-white mb-1">{item.label}</h3>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            ))}
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
