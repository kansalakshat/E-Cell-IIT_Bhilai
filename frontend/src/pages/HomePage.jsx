import { useRef, useEffect, lazy } from 'react'
import gsap from 'gsap'
import Hero3D from '../components/Hero3D'
import LazyScene from '../components/LazyScene'

/* Second three.js scene — only fetched once it scrolls into view */
const WaveField = lazy(() => import('../components/WaveField'))
import FeatureCard from '../components/FeatureCard'
import GuideCard from '../components/GuideCard'
import EntrepreneurshipCard from '../components/EntrepreneurshipCard'
import { useInView } from '../hooks/useInView'

const offerings = [
  {
    subtitle: 'Ideas',
    title: 'Innovate',
    description:
      'Bring a half-formed thought. Leave with a validated concept, a team, and a plan.',
    metrics: [
      { value: '100+', label: 'ideas incubated' },
      { value: '24h', label: 'hackathons' },
    ],
    cta: 'Pitch an idea',
  },
  {
    subtitle: 'Product',
    title: 'Execute',
    description:
      'Ship something real. We run build sprints that take you from concept to a working MVP.',
    metrics: [
      { value: '20+', label: 'MVPs shipped' },
      { value: '6mo', label: 'avg. timeline' },
    ],
    cta: 'Start building',
  },
  {
    subtitle: 'People',
    title: 'Connect',
    description:
      'Founders, operators and investors who answer their messages. The network is the product.',
    metrics: [
      { value: '500+', label: 'members' },
      { value: '100+', label: 'mentors' },
    ],
    cta: 'Meet the room',
  },
  {
    subtitle: 'Growth',
    title: 'Scale',
    description:
      'Pricing, distribution, retention — the unglamorous work that decides who survives.',
    metrics: [
      { value: '5×', label: 'avg. growth' },
      { value: '₹40Cr+', label: 'raised' },
    ],
    cta: 'Learn the playbook',
  },
  {
    subtitle: 'Craft',
    title: 'Lead',
    description:
      'Run a team, own a budget, answer to a deadline. Leadership taught by doing it badly first.',
    metrics: [
      { value: '15+', label: 'startups led' },
      { value: '80%', label: 'still running' },
    ],
    cta: 'Take ownership',
  },
  {
    subtitle: 'Purpose',
    title: 'Impact',
    description:
      'Ventures measured by what they change, not just what they earn.',
    metrics: [
      { value: '1000+', label: 'lives touched' },
      { value: 'Global', label: 'reach' },
    ],
    cta: 'Build for good',
  },
]

const journeys = [
  {
    title: 'Expert speaker sessions',
    category: 'Sessions',
    description:
      'Founders, VCs and operators on campus every month — unfiltered stories about what actually worked and what did not.',
    image:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=750&fit=crop',
    highlights: ['50+ speakers hosted', '1000+ attendees', 'Open to every branch'],
  },
  {
    title: 'E-Conclave',
    category: 'Flagship',
    description:
      'Our annual flagship at Meraz — startup showcases, pitch battles, and a room full of people who can fund you.',
    image:
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&h=750&fit=crop',
    highlights: ['20+ startups showcased', '500+ participants', 'Industry-sponsored tracks'],
    tone: 'ink',
  },
  {
    title: 'Hackathons & case comps',
    category: 'Competitions',
    description:
      'Real problem statements from real companies. 24 to 48 hours, a working prototype, and judges who hire.',
    image:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=750&fit=crop',
    highlights: ['Industry problem statements', 'Prototype-first judging', 'Cash + internships'],
  },
  {
    title: 'Workshops & mentorship',
    category: 'Learning',
    description:
      'Small-room sessions on pitching, product design, fundraising and growth — then one-on-one time with a mentor.',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=750&fit=crop',
    highlights: ['30+ workshops a year', '800+ students trained', '1:1 mentor matching'],
  },
]

const path = [
  {
    number: 1,
    title: 'Validate',
    difficulty: 'Beginner',
    duration: '2 weeks',
    description: 'Find out whether anyone actually wants this before you write a line of code.',
    steps: [
      'Talk to 20+ people who have the problem',
      'Write down the riskiest assumption',
      'Put up a landing page and measure intent',
      'Kill it or commit to it',
    ],
  },
  {
    number: 2,
    title: 'Build',
    difficulty: 'Intermediate',
    duration: '4–6 weeks',
    description: 'Ship the smallest thing that proves the idea works.',
    steps: [
      'Cut the feature list in half, then half again',
      'Pick boring, fast technology',
      'Get it in front of ten real users',
      'Rewrite based on what they ignore',
    ],
  },
  {
    number: 3,
    title: 'Fundraise',
    difficulty: 'Intermediate',
    duration: '3 months',
    description: 'Raise on evidence, not adjectives.',
    steps: [
      'Build the numbers before the deck',
      'Tell the story in ten slides',
      'Warm intros beat cold emails',
      'Understand the term sheet you sign',
    ],
  },
  {
    number: 4,
    title: 'Scale',
    difficulty: 'Advanced',
    duration: '6 months+',
    description: 'Turn a product people like into a business that compounds.',
    steps: [
      'Make the unit economics work',
      'Hire slowly, fire honestly',
      'Find one channel that repeats',
      'Build something that outlasts you',
    ],
  },
]

const voices = [
  {
    quote:
      'I joined with no idea and no plan. E-Cell handed me a problem statement, a co-founder and a deadline. That was the whole beginning.',
    name: 'Rahul Sharma',
    role: 'Co-founder, fintech startup',
    year: 'Batch of 2022',
  },
  {
    quote:
      'The case competitions taught me more about structuring a problem than any course did. I use that framework every single week at work.',
    name: 'Priya Patel',
    role: 'Product Manager',
    year: 'Batch of 2021',
  },
  {
    quote:
      'Running an E-Cell event is the closest thing to running a company while you are still a student. Budget, team, sponsors, deadline.',
    name: 'Arjun Kumar',
    role: 'Investor',
    year: 'Batch of 2020',
  },
]

/* Reveal helper for section headings */
function Reveal({ children, className = '' }) {
  const ref = useRef()
  const inView = useInView(ref, { threshold: 0.2 })

  useEffect(() => {
    if (!inView) return
    gsap.to(ref.current, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
  }, [inView])

  return (
    <div ref={ref} className={`translate-y-8 opacity-0 ${className}`}>
      {children}
    </div>
  )
}

export default function HomePage() {
  return (
    <div>
      <Hero3D />

      {/* Marquee strip */}
      <div className="overflow-hidden border-y border-stone bg-red py-5">
        <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="display flex items-center gap-12 text-xl uppercase tracking-wide text-ink"
            >
              <span>Speaker Sessions</span>
              <span className="text-ink/40">/</span>
              <span>E-Conclave</span>
              <span className="text-ink/40">/</span>
              <span>Hackathons</span>
              <span className="text-ink/40">/</span>
              <span>Case Competitions</span>
              <span className="text-ink/40">/</span>
              <span>Mentorship</span>
              <span className="text-ink/40">/</span>
            </span>
          ))}
        </div>
      </div>

      {/* Manifesto */}
      <section className="mx-auto max-w-7xl px-6 py-28 sm:px-10 sm:py-36">
        <Reveal>
          <p className="eyebrow mb-10">Who we are</p>
          <h2 className="display max-w-4xl text-[clamp(2rem,5.2vw,4.2rem)] uppercase">
            Entrepreneurship is not about starting companies. It is about noticing a{' '}
            <span className="bg-lime px-2">problem worth solving</span> — and refusing to
            leave it alone.
          </h2>
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-ink-70">
            E-Cell is the official entrepreneurship body of IIT Bhilai. We build the room
            where students meet founders, investors and researchers, then go and build
            things of their own.
          </p>
        </Reveal>
      </section>

      {/* Offerings */}
      <section className="mx-auto max-w-7xl px-6 pb-28 sm:px-10 sm:pb-36">
        <Reveal className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow mb-5">What we do</p>
            <h2 className="display text-[clamp(2.2rem,5.5vw,4.5rem)] uppercase">Six ways in.</h2>
          </div>
          <p className="max-w-sm text-ink-70">
            No startup idea required. No business background required. Curiosity and
            follow-through are the entire entry fee.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {offerings.map((o, i) => (
            <FeatureCard key={o.title} {...o} index={i} />
          ))}
        </div>
      </section>

      {/* 3D metrics section */}
      <section className="relative overflow-hidden bg-bone">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 py-28 sm:px-10 lg:grid-cols-2 lg:py-32">
          <Reveal>
            <p className="eyebrow mb-5">By the numbers</p>
            <h2 className="display text-[clamp(2.2rem,5.5vw,4.5rem)] uppercase">
              Small cell.
              <br />
              Loud output.
            </h2>

            <div className="mt-14 grid grid-cols-2">
              {[
                ['20+', 'active startups'],
                ['₹40Cr+', 'raised by alumni'],
                ['80%', 'ventures still running'],
                ['1000+', 'students reached'],
              ].map(([v, l], i) => (
                <div
                  key={l}
                  className={`-ml-[2px] -mt-[2px] border border-stone p-6 ${
                    i % 3 === 0 ? 'bg-lime' : 'bg-paper'
                  }`}
                >
                  <div className="display text-4xl sm:text-5xl">{v}</div>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-widest text-ink-40">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <LazyScene scene={WaveField} className="h-[360px] sm:h-[460px] lg:h-[560px]" />
        </div>
      </section>

      {/* Journeys */}
      <section className="mx-auto max-w-7xl px-6 py-28 sm:px-10 sm:py-36">
        <Reveal className="mb-14">
          <p className="eyebrow mb-5">What runs through the year</p>
          <h2 className="display max-w-3xl text-[clamp(2.2rem,5.5vw,4.5rem)] uppercase">
            Things we actually run.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {journeys.map((j, i) => (
            <EntrepreneurshipCard key={j.title} {...j} index={i} />
          ))}
        </div>
      </section>

      {/* Founder path */}
      <section>
        <div className="mx-auto max-w-7xl px-6 pb-28 sm:px-10 sm:pb-36">
          <Reveal className="mb-6">
            <p className="eyebrow mb-5">The path</p>
            <h2 className="display max-w-3xl text-[clamp(2.2rem,5.5vw,4.5rem)] uppercase">
              Idea to company, in four moves.
            </h2>
          </Reveal>

          <div>
            {path.map((p, i) => (
              <GuideCard key={p.number} {...p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Voices */}
      <section className="bg-ink py-28 text-paper sm:py-36">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <Reveal className="mb-14">
            <p className="eyebrow mb-5 text-paper/70">From the room</p>
            <h2 className="display text-[clamp(2.2rem,5.5vw,4.5rem)] uppercase">
              People who went through it.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {voices.map((v) => (
              <figure
                key={v.name}
                className="brutal-light flex flex-col justify-between bg-ink p-9"
              >
                <blockquote className="text-lg leading-relaxed text-paper/80">
                  “{v.quote}”
                </blockquote>
                <figcaption className="mt-10 border-t border-paper/20 pt-6">
                  <div className="display text-xl uppercase">{v.name}</div>
                  <div className="mt-1 text-sm text-accent">{v.role}</div>
                  <div className="mt-1 text-xs text-paper/60">{v.year}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-7xl px-6 py-32 sm:px-10 sm:py-44">
        <Reveal className="text-center">
          <h2 className="display mx-auto max-w-4xl text-[clamp(2.6rem,8vw,7rem)] uppercase">
            Bring the curiosity. <span className="bg-accent px-3 text-ink">We handle the rest.</span>
          </h2>
          <p className="mx-auto mt-10 max-w-xl text-lg text-ink-70">
            Open to every branch, every year. No idea, no experience and no business
            background required.
          </p>
          <a
            href="/contact"
            className="brutal group mt-12 inline-flex items-center gap-4 bg-accent px-10 py-5 text-lg font-bold uppercase tracking-wide text-ink"
          >
            Join E-Cell
            <span className="grid h-8 w-8 place-items-center border border-stone">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" />
              </svg>
            </span>
          </a>
        </Reveal>
      </section>
    </div>
  )
}
