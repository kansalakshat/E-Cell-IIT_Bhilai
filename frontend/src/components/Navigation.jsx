import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme, toggleTheme } from '../theme'

const links = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Events', path: '/events' },
  { label: 'Contact', path: '/contact' },
]

export default function Navigation() {
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)
  const { pathname } = useLocation()
  const theme = useTheme()

  /* Hide on scroll down, reveal on scroll up */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > 160 && y > lastY.current)
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-3 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1rem)] max-w-3xl transition-transform duration-500 ease-smooth ${
        hidden ? '-translate-y-[150%]' : 'translate-y-0'
      }`}
    >
      <nav className="flex items-center gap-1 rounded-4xl border border-stone bg-paper p-1.5 pl-2.5 shadow-soft sm:gap-2 sm:p-2 sm:pl-5">
        {/* Mark. The wordmark is the first thing cut on small screens —
            the badge alone still identifies the site, and every link fits. */}
        <Link to="/" className="flex shrink-0 items-center gap-2" aria-label="E-Cell home">
          <span className="grid h-8 w-8 place-items-center border border-stone bg-accent text-sm font-black text-ink">
            E
          </span>
          <span className="display hidden text-lg leading-none text-ink sm:inline">
            E<span className="text-ink-40">/</span>CELL
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-0.5 sm:gap-1">
          {links.map((l) => {
            const active = pathname === l.path
            return (
              <Link
                key={l.path}
                to={l.path}
                aria-current={active ? 'page' : undefined}
                className={`border px-2 py-2 text-[11px] font-semibold uppercase tracking-wide transition-colors duration-200 sm:px-4 sm:text-sm ${
                  active
                    ? 'border-ink bg-accent text-ink'
                    : 'border-transparent text-ink hover:border-ink hover:bg-lime'
                }`}
              >
                {l.label}
              </Link>
            )
          })}
        </div>

        <button
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          title={theme === 'dark' ? 'Light (brutalist)' : 'Dark (blend)'}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-4xl border border-stone text-ink transition-colors duration-200 hover:bg-lime sm:ml-1 sm:h-10 sm:w-10"
        >
          {theme === 'dark' ? (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="4.5" />
              <path
                strokeLinecap="round"
                d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.5 14.3A8.5 8.5 0 019.7 3.5a8.5 8.5 0 1010.8 10.8z"
              />
            </svg>
          )}
        </button>

        <Link
          to="/contact"
          className="ml-1 hidden items-center rounded-4xl border border-stone bg-ink px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-paper transition-colors duration-200 hover:bg-accent hover:text-ink lg:inline-flex"
        >
          Join Us
        </Link>
      </nav>
    </header>
  )
}
