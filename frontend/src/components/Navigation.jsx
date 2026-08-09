import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

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
        <nav className="flex items-center gap-2 border-2 border-ink bg-paper p-2 pl-5 shadow-hard-sm">
          {/* Mark */}
          <Link to="/" className="group flex items-center gap-2 shrink-0">
            <span className="grid h-8 w-8 place-items-center border-2 border-ink bg-accent text-ink text-sm font-black">
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
                  className={`border-2 px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors duration-200 ${
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

          <Link
            to="/contact"
            className="ml-auto md:ml-1 hidden sm:inline-flex items-center border-2 border-ink bg-ink px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-paper transition-colors duration-200 hover:bg-accent hover:text-ink"
          >
            Join Us
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="ml-auto sm:ml-1 md:hidden grid h-10 w-10 place-items-center border-2 border-ink bg-lime text-ink"
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
              className={`display border-b border-white/10 py-6 text-5xl text-white transition-all duration-500 ease-smooth ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="mt-10 inline-flex justify-center border-2 border-paper bg-accent px-8 py-4 font-bold uppercase tracking-wide text-ink"
          >
            Join E-Cell
          </Link>
        </div>
      </div>
    </>
  )
}
