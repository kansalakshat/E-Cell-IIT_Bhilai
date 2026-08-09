import { useState, useMemo, lazy } from 'react'
import PageHeader from '../components/PageHeader'
import EventCard from '../components/EventCard'
import LazyScene from '../components/LazyScene'
import PinnedRail from '../components/PinnedRail'

const Burst = lazy(() => import('../components/Burst'))

const allEvents = [
  {
    id: 1,
    title: 'Startup Founder Panel',
    date: '2024-08-15',
    description: 'Founders on what the first eighteen months actually looked like.',
    type: 'speaker_session',
  },
  {
    id: 2,
    title: 'Innovation Hackathon',
    date: '2024-09-01',
    description: '48 hours, a live problem statement, and a working prototype at the end.',
    type: 'competition',
  },
  {
    id: 3,
    title: 'Problem Statement Challenge',
    date: '2024-09-15',
    description: 'Industry-sourced challenges solved in teams over a full semester.',
    type: 'challenge',
  },
  {
    id: 4,
    title: 'Pitch Competition',
    date: '2024-10-05',
    description: 'Eight minutes in front of investors and operators who ask real questions.',
    type: 'competition',
  },
  {
    id: 5,
    title: 'VC Fireside Chat',
    date: '2024-10-20',
    description: 'How early-stage funds actually decide, from the people who write cheques.',
    type: 'speaker_session',
  },
  {
    id: 6,
    title: 'Case Study Competition',
    date: '2024-11-01',
    description: 'Structure an ambiguous business problem and defend your recommendation.',
    type: 'competition',
  },
  {
    id: 7,
    title: 'Self Branding & Soft Skills',
    date: '2024-11-14',
    description: 'Communication, positioning and presence — run as a hands-on workshop.',
    type: 'workshop',
  },
  {
    id: 8,
    title: 'E-Conclave',
    date: '2024-12-02',
    description: 'Our flagship: showcases, keynotes and the whole ecosystem in one room.',
    type: 'flagship',
  },
]

const filters = [
  { key: 'all', label: 'All' },
  { key: 'speaker_session', label: 'Speaker sessions' },
  { key: 'competition', label: 'Competitions' },
  { key: 'workshop', label: 'Workshops' },
  { key: 'challenge', label: 'Challenges' },
  { key: 'flagship', label: 'Flagship' },
]

export default function EventsPage() {
  const [active, setActive] = useState('all')

  const shown = useMemo(
    () => (active === 'all' ? allEvents : allEvents.filter((e) => e.type === active)),
    [active]
  )

  return (
    <div>
      <PageHeader
        eyebrow="Events"
        title="What's on"
        lead="Sessions, competitions and workshops running through the academic year. Open to every branch and every year."
      />

      {/* Filter pills */}
      <section className="glass sticky top-0 z-20 border-b border-stone">
        <div className="mx-auto max-w-7xl px-6 py-5 sm:px-10">
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filters.map((f) => {
              const on = active === f.key
              return (
                <button
                  key={f.key}
                  onClick={() => setActive(f.key)}
                  aria-pressed={on}
                  className={`shrink-0 border border-stone px-5 py-2.5 text-sm font-bold uppercase tracking-wide transition-colors duration-200 ${
                    on ? 'bg-accent text-ink' : 'bg-paper text-ink hover:bg-lime'
                  }`}
                >
                  {f.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Grid — page pins while the cards travel sideways */}
      {shown.length > 0 ? (
        /* Keyed on the filter: changing it changes the card count, so the
           pin distance has to be remeasured. Remounting is cheaper than
           threading a refresh through ScrollTrigger. */
        <PinnedRail key={active} cardClass="w-[80vw] sm:w-[52vw] lg:w-[26rem]" header={null}>
          {shown.map((e, i) => (
            <EventCard key={e.id} event={e} index={i} />
          ))}
        </PinnedRail>
      ) : (
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28">
          <p className="py-20 text-center text-ink-40">Nothing scheduled in this category yet.</p>
        </section>
      )}

      {/* Newsletter — burst pulses behind the form */}
      <section className="relative overflow-hidden border-t border-stone bg-bone py-24 sm:py-32">
        <LazyScene scene={Burst} className="scene-bg pointer-events-none absolute inset-0" />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center sm:px-10">
          <h2 className="display text-[clamp(1.6rem,5vw,3.5rem)] uppercase">Never miss one.</h2>
          <p className="mx-auto mt-6 max-w-md text-ink-70">
            Event announcements, problem statements and opportunities — straight to your inbox.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="you@iitbhilai.ac.in"
              className="flex-1 border border-stone bg-paper px-6 py-4 text-ink outline-none placeholder:text-ink-40 focus:bg-lime"
            />
            <button
              type="submit"
              className="brutal bg-accent px-8 py-4 font-bold uppercase tracking-wide text-ink"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
