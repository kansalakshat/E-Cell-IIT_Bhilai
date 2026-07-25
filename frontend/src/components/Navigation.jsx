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
        <nav className="flex items-center gap-2 rounded-full bg-ink/95 backdrop-blur-xl p-2 pl-5 shadow-[0_8px_40px_rgba(0,0,0,0.25)] ring-1 ring-white/10">
          {/* Mark */}
          <Link to="/" className="group flex items-center gap-2 shrink-0">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-accent text-ink text-sm font-black">
              E
            </span>
            <span className="text-white font-bold tracking-tight leading-none">
              e<span className="text-accent">/</span>cell
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
                  className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                    active
                      ? 'text-ink bg-white'
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
          </div>

          <Link
            to="/contact"
            className="ml-auto md:ml-1 hidden sm:inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink hover:bg-accent transition-colors duration-300"
          >
            Join Us
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
            className="ml-auto sm:ml-1 md:hidden grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white"
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
            className="mt-10 inline-flex justify-center rounded-full bg-accent px-8 py-4 font-bold text-ink"
          >
            Join E-Cell
          </Link>
        </div>
      </div>
    </>
  )
}
