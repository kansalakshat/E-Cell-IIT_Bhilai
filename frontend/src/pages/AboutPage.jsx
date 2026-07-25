import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import PageHeader from '../components/PageHeader'
import { useInView } from '../hooks/useInView'

const values = [
  ['Innovation', 'Noticing what everyone else walked past.'],
  ['Execution', 'Ideas are cheap. Shipping is the whole job.'],
  ['Leadership', 'Going first, especially when it is uncomfortable.'],
  ['Ownership', 'If it is broken and you saw it, it is yours.'],
  ['Collaboration', 'Nobody builds anything worthwhile alone.'],
  ['Problem Solving', 'Sitting with a hard problem longer than is comfortable.'],
  ['Continuous Learning', 'Being wrong quickly and updating faster.'],
  ['Impact', 'Measuring work by what it changes.'],
]

const doing = [
  [
    'Speaker sessions',
    'Founders, VCs, product leaders and researchers on campus through the year. Practical, unfiltered, and always open to questions.',
  ],
  [
    'Real-world problem statements',
    'Companies hand us live problems. Students analyse, prototype and present solutions — individually or in teams.',
  ],
  [
    'Flagship events',
    'Industry-sponsored challenges, startup showcases and pitch nights, most visibly during Meraz, the institute festival.',
  ],
  [
    'Competitions',
    'Case competitions, hackathons, datathons, product design sprints and pitching events across the calendar.',
  ],
  [
    'Startup culture',
    'Idea validation, design thinking, business models, customer discovery, MVP development and pitch decks — taught by doing.',
  ],
  [
    'Collaborations',
    'Cross-campus events and knowledge exchange with peer institutes including IIT Dhanbad and NIT Agartala.',
  ],
]

function Reveal({ children, className = '' }) {
  const ref = useRef()
  const inView = useInView(ref, { threshold: 0.15 })
  useEffect(() => {
    if (!inView) return
    gsap.to(ref.current, { y: 0, opacity: 1, duration: 0.95, ease: 'power3.out' })
  }, [inView])
  return (
    <div ref={ref} className={`translate-y-8 opacity-0 ${className}`}>
      {children}
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="bg-paper">
      <PageHeader
        eyebrow="About"
        title="About us"
        lead="The official entrepreneurship and innovation body of IIT Bhilai — building an ecosystem where students learn to notice problems, and then do something about them."
      />

      {/* Vision / Mission */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-4xl bg-bone p-10 sm:p-12">
              <p className="eyebrow mb-8">Vision</p>
              <p className="display text-[clamp(1.6rem,3vw,2.4rem)]">
                A campus where students are expected to innovate, create, lead and solve
                real problems — not just study them.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="h-full rounded-4xl bg-ink p-10 text-white sm:p-12">
              <p className="eyebrow mb-8 text-white/40">Mission</p>
              <ul className="space-y-5">
                {[
                  'Promote entrepreneurial thinking across every discipline.',
                  'Bridge the gap between academia and industry.',
                  'Encourage innovation through real-world challenges.',
                  'Develop leadership, teamwork and execution.',
                  'Create room for networking, mentorship and collaboration.',
                  'Help students turn ideas into things that exist.',
                ].map((m) => (
                  <li key={m} className="flex gap-4 text-white/75">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-stone bg-bone py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <Reveal className="mb-14">
            <p className="eyebrow mb-5">What we hold to</p>
            <h2 className="display text-[clamp(2.2rem,5.5vw,4.5rem)]">Core values.</h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-x-12 sm:grid-cols-2">
            {values.map(([title, body], i) => (
              <Reveal key={title}>
                <div className="flex gap-6 border-t border-stone py-8">
                  <span className="pt-1 text-sm tabular-nums text-ink-40">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="display text-2xl">{title}</h3>
                    <p className="mt-2 text-[15px] text-ink-70">{body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32">
        <Reveal className="mb-14">
          <p className="eyebrow mb-5">Programmes</p>
          <h2 className="display text-[clamp(2.2rem,5.5vw,4.5rem)]">What we do.</h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {doing.map(([title, body], i) => (
            <Reveal key={title}>
              <div className="group h-full rounded-4xl border border-stone p-9 transition-colors duration-500 ease-smooth hover:border-ink hover:bg-ink">
                <span className="text-sm tabular-nums text-ink-40 transition-colors duration-500 group-hover:text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="display mt-6 text-2xl transition-colors duration-500 group-hover:text-white">
                  {title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-70 transition-colors duration-500 group-hover:text-white/60">
                  {body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Who can join */}
      <section className="bg-ink py-24 text-white sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <Reveal className="mb-14">
            <p className="eyebrow mb-5 text-white/40">Membership</p>
            <h2 className="display max-w-3xl text-[clamp(2.2rem,5.5vw,4.5rem)]">
              Who can join? Everyone.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <Reveal>
              <div className="rounded-4xl border border-white/10 p-10">
                <p className="eyebrow mb-8 text-white/40">You do not need</p>
                <ul className="space-y-4">
                  {[
                    'A startup idea',
                    'Business knowledge',
                    'Finance knowledge',
                    'Marketing experience',
                    'Any prior entrepreneurial experience',
                  ].map((x) => (
                    <li key={x} className="flex items-center gap-4 text-white/50 line-through decoration-white/20">
                      <span className="h-px w-5 bg-white/25" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal>
              <div className="rounded-4xl bg-accent p-10 text-ink">
                <p className="eyebrow mb-8 text-ink/50">We look for</p>
                <ul className="space-y-4">
                  {[
                    'Curiosity',
                    'Initiative',
                    'Consistency',
                    'Willingness to learn',
                    'Ownership and teamwork',
                  ].map((x) => (
                    <li key={x} className="flex items-center gap-4 font-medium">
                      <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-16 text-center">
            <p className="display mx-auto max-w-2xl text-[clamp(1.6rem,3.5vw,2.6rem)]">
              Skills can be taught. The mindset is what we are actually looking for.
            </p>
            <a
              href="/contact"
              className="mt-10 inline-flex rounded-full bg-white px-9 py-4 font-semibold text-ink transition-colors hover:bg-accent"
            >
              Join E-Cell
            </a>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
