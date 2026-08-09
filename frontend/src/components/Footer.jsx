import { Link } from 'react-router-dom'

const columns = [
  {
    heading: 'Navigate',
    links: [
      { label: 'Home', to: '/' },
      { label: 'About', to: '/about' },
      { label: 'Events', to: '/events' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    heading: 'Programmes',
    links: [
      { label: 'Speaker Sessions', to: '/events' },
      { label: 'E-Conclave', to: '/events' },
      { label: 'Hackathons', to: '/events' },
      { label: 'Mentorship', to: '/about' },
    ],
  },
]

const socials = ['Instagram', 'LinkedIn', 'X', 'GitHub']

export default function Footer() {
  return (
    <footer className="border-t border-stone bg-bone">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center border border-stone bg-accent text-sm font-black text-ink">
                E
              </span>
              <span className="display text-2xl">
                E<span className="text-ink-40">/</span>CELL
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ink-70">
              The Entrepreneurship Cell of IIT Bhilai. We build the room where ideas meet
              the people who can fund, challenge and ship them.
            </p>
            <a
              href="mailto:ecell@iitbhilai.ac.in"
              className="brutal mt-8 inline-block bg-lime px-4 py-2 text-sm font-bold"
            >
              ecell@iitbhilai.ac.in
            </a>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.heading} className="lg:col-span-2">
              <h4 className="eyebrow mb-6">{col.heading}</h4>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-[15px] text-ink-70 transition-colors hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social */}
          <div className="lg:col-span-3">
            <h4 className="eyebrow mb-6">Follow</h4>
            <ul className="space-y-3">
              {socials.map((s) => (
                <li key={s}>
                  <a
                    href="#"
                    className="group inline-flex items-center gap-2 text-[15px] text-ink-70 transition-colors hover:text-ink"
                  >
                    {s}
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H8M17 7v9" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div className="mt-20 overflow-hidden border-t border-stone pt-10">
          <div className="display stroke-type select-none text-[clamp(3rem,15vw,12rem)] leading-none">
            E-CELL
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 text-xs text-ink-40 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p>© {new Date().getFullYear()} E-Cell, IIT Bhilai. All rights reserved.</p>
            {/* CC BY 4.0 requires this credit — see public/models/README.md */}
            <p className="mt-2">
              Hero model{' '}
              <a
                href="https://sketchfab.com/3d-models/humanoid-robot-face-1532b74a76dc43d18a4fc2c5ba1f2229"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors hover:text-ink"
              >
                “Humanoid Robot Face”
              </a>{' '}
              by kito1704, licensed{' '}
              <a
                href="https://creativecommons.org/licenses/by/4.0/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors hover:text-ink"
              >
                CC BY 4.0
              </a>
              .
            </p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-ink">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-ink">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
