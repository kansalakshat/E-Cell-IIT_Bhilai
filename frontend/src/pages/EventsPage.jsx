import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import EventCard from '../components/EventCard'

const allEvents = [
  {
    id: 1,
    title: "Startup Founder Panel",
    date: "2024-08-15",
    description: "Learn from successful founders about their entrepreneurial journey",
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
  {
    id: 4,
    title: "Pitch Competition",
    date: "2024-10-05",
    description: "Showcase your ideas to investors and mentors",
    type: "competition"
  },
  {
    id: 5,
    title: "VC Fireside Chat",
    date: "2024-10-20",
    description: "Insights from venture capitalists on fundraising",
    type: "speaker_session"
  },
  {
    id: 6,
    title: "Case Study Competition",
    date: "2024-11-01",
    description: "Solve complex business problems in teams",
    type: "competition"
  },
]

export default function EventsPage() {
  const [selectedType, setSelectedType] = useState('all')
  const [filteredEvents, setFilteredEvents] = useState(allEvents)
  const containerRef = useRef()

  useEffect(() => {
    const filtered = selectedType === 'all'
      ? allEvents
      : allEvents.filter(e => e.type === selectedType)
    setFilteredEvents(filtered)

    if (containerRef.current) {
      gsap.to(containerRef.current.children, {
        duration: 0.3,
        opacity: 0,
        y: 20,
      })
      gsap.to(containerRef.current.children, {
        duration: 0.6,
        opacity: 1,
        y: 0,
        delay: 0.1,
        stagger: 0.05,
      })
    }
  }, [selectedType])

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-dark to-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-6xl font-bold mb-6 gradient-text">Our Events</h1>
          <p className="text-2xl text-gray-300">
            Join us for exciting opportunities to learn, network, and showcase your skills
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-12 bg-dark border-b border-blue-500/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {['all', 'speaker_session', 'competition', 'challenge'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedType === type
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-blue-600/10 text-blue-300 border border-blue-500/20 hover:border-blue-500/50'
                }`}
              >
                {type === 'all' ? 'All Events' : type.replace('_', ' ').toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20 bg-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            ref={containerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">No events found for this category</p>
            </div>
          )}
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="py-20 bg-gradient-to-b from-slate-900/50 to-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Never Miss An Event</h2>
          <p className="text-xl text-gray-400 mb-8">
            Subscribe to our newsletter to get updates about upcoming events and opportunities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg bg-slate-900/50 border border-blue-500/20 focus:border-blue-500/50 text-white placeholder-gray-500 outline-none transition-colors duration-300"
            />
            <button className="btn-primary">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  )
}
