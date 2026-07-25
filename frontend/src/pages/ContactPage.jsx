import { useState } from 'react'
import PageHeader from '../components/PageHeader'

const channels = [
  { label: 'Email', value: 'contact@ecell.iitbhilai.ac.in', href: 'mailto:contact@ecell.iitbhilai.ac.in' },
  { label: 'Campus', value: 'IIT Bhilai, Kutelabhata, Durg', href: '#' },
  { label: 'Social', value: '@ecell_iitbhilai', href: '#' },
]

export default function ContactPage() {
  const [status, setStatus] = useState('idle')

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          message: form.get('message'),
        }),
      })
      setStatus(res.ok ? 'sent' : 'error')
      if (res.ok) e.target.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="bg-paper">
      <PageHeader
        eyebrow="Contact"
        title="Say hello"
        lead="Questions about joining, sponsoring an event, or speaking on campus? Write to us — we read everything."
      />

      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-10 sm:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Channels */}
          <div className="lg:col-span-4">
            <p className="eyebrow mb-10">Reach us</p>
            <ul>
              {channels.map((c) => (
                <li key={c.label} className="border-t border-stone py-7">
                  <div className="text-xs uppercase tracking-[0.2em] text-ink-40">{c.label}</div>
                  <a
                    href={c.href}
                    className="mt-2 block text-lg font-medium transition-colors hover:text-ink-70"
                  >
                    {c.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            <form onSubmit={onSubmit} className="rounded-4xl bg-bone p-8 sm:p-12">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <label className="block">
                  <span className="eyebrow">Name</span>
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    className="mt-3 w-full border-b border-stone bg-transparent pb-3 text-lg outline-none transition-colors placeholder:text-ink-40 focus:border-ink"
                  />
                </label>
                <label className="block">
                  <span className="eyebrow">Email</span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="mt-3 w-full border-b border-stone bg-transparent pb-3 text-lg outline-none transition-colors placeholder:text-ink-40 focus:border-ink"
                  />
                </label>
              </div>

              <label className="mt-10 block">
                <span className="eyebrow">Message</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell us what you're thinking about…"
                  className="mt-3 w-full resize-none border-b border-stone bg-transparent pb-3 text-lg outline-none transition-colors placeholder:text-ink-40 focus:border-ink"
                />
              </label>

              <div className="mt-12 flex flex-wrap items-center gap-6">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="rounded-full bg-ink px-9 py-4 font-semibold text-white transition-colors hover:bg-accent hover:text-ink disabled:opacity-50"
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>

                {status === 'sent' && (
                  <p className="text-sm font-medium text-ink">
                    Thanks — we'll get back to you shortly.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-sm font-medium text-ink-70">
                    Something went wrong. Try emailing us directly.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
