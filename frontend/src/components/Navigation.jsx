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
  const [open, setOpen] = useState(false)
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

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.5rem)] max-w-3xl transition-transform duration-500 ease-smooth ${
          hidden ? '-translate-y-[150%]' : 'translate-y-0'
        }`}
      >
        <nav className="flex items-center gap-2 rounded-4xl border border-stone bg-paper p-2 pl-5 shadow-soft">
          {/* Mark */}
          <Link to="/" className="group flex items-center gap-2 shrink-0">
            <span className="grid h-8 w-8 place-items-center border border-stone bg-accent text-ink text-sm font-black">
              E
            </span>
            <span className="display text-ink text-lg leading-none">
              E<span className="text-ink-40">/</span>CELL
            </span>
          </Link>

          {/* Desktop links */}
          <div className="ml-auto hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active = pathname === l.path
              return (
                <Link
                  key={l.path}
                  to={l.path}
                  className={`border px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors duration-200 ${
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
            className="ml-auto md:ml-1 grid h-10 w-10 shrink-0 place-items-center rounded-4xl border border-stone text-ink transition-colors duration-200 hover:bg-lime"
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="4.5" />
                <path strokeLinecap="round" d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.5 14.3A8.5 8.5 0 019.7 3.5a8.5 8.5 0 1010.8 10.8z" />
              </svg>
            )}
          </button>

          <Link
            to="/contact"
            className="md:ml-1 hidden sm:inline-flex items-center rounded-4xl border border-stone bg-ink px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-paper transition-colors duration-200 hover:bg-accent hover:text-ink"
          >
            Join Us
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="ml-auto sm:ml-1 md:hidden grid h-10 w-10 place-items-center border border-stone bg-lime text-ink"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 block h-[1.5px] w-4 bg-current transition-transform duration-300 ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-4 bg-current transition-transform duration-300 ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </nav>
      </header>

      {/* Mobile sheet */}
      <div
        className={`fixed inset-0 z-40 bg-ink transition-opacity duration-400 md:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex h-full flex-col justify-center px-8">
          {links.map((l, i) => (
            <Link
              key={l.path}
              to={l.path}
              style={{ transitionDelay: open ? `${i * 60 + 80}ms` : '0ms' }}
              className={`display border-b border-paper/10 py-6 text-5xl text-paper transition-all duration-500 ease-smooth ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-10 inline-flex justify-center border border-stone bg-accent px-8 py-4 font-bold uppercase tracking-wide text-ink"
          >
            Join E-Cell
          </Link>
        </div>
      </div>
    </>
  )
}
