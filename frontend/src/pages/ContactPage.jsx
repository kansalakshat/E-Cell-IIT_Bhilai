import { useRef, useEffect } from 'react'
import gsap from 'gsap'

export default function ContactPage() {
  const formRef = useRef()

  useEffect(() => {
    gsap.fromTo(
      formRef.current?.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    )
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    gsap.to(formRef.current, {
      duration: 0.5,
      scale: 0.98,
      ease: 'back.out',
    })
    gsap.to(formRef.current, {
      duration: 0.5,
      scale: 1,
      delay: 0.3,
    })
    alert('Message sent! We will get back to you soon.')
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-dark to-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-6xl font-bold mb-6 gradient-text">Get In Touch</h1>
          <p className="text-2xl text-gray-300">
            Have questions? We'd love to hear from you. Send us a message!
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: '📧',
                title: 'Email',
                info: 'contact@ecell.iitbhilai.ac.in',
                link: 'mailto:contact@ecell.iitbhilai.ac.in'
              },
              {
                icon: '📍',
                title: 'Location',
                info: 'IIT Bhilai, Raipur',
                link: '#'
              },
              {
                icon: '💬',
                title: 'Follow Us',
                info: '@ECell_IITBhilai',
                link: '#'
              },
            ].map((contact, idx) => (
              <a
                key={idx}
                href={contact.link}
                className="p-8 rounded-2xl bg-gradient-to-br from-blue-600/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 group text-center"
              >
                <div className="text-4xl mb-4">{contact.icon}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                  {contact.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {contact.info}
                </p>
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6 p-10 rounded-2xl bg-gradient-to-br from-blue-600/10 to-cyan-500/10 border border-blue-500/20"
            >
              <div>
                <label className="block text-sm font-semibold mb-3">Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-6 py-3 rounded-lg bg-slate-900/50 border border-blue-500/20 focus:border-blue-500/50 text-white placeholder-gray-500 outline-none transition-colors duration-300"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-6 py-3 rounded-lg bg-slate-900/50 border border-blue-500/20 focus:border-blue-500/50 text-white placeholder-gray-500 outline-none transition-colors duration-300"
                  placeholder="Your email"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Subject</label>
                <input
                  type="text"
                  required
                  className="w-full px-6 py-3 rounded-lg bg-slate-900/50 border border-blue-500/20 focus:border-blue-500/50 text-white placeholder-gray-500 outline-none transition-colors duration-300"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3">Message</label>
                <textarea
                  required
                  rows={6}
                  className="w-full px-6 py-3 rounded-lg bg-slate-900/50 border border-blue-500/20 focus:border-blue-500/50 text-white placeholder-gray-500 outline-none transition-colors duration-300 resize-none"
                  placeholder="Your message"
                ></textarea>
              </div>

              <button type="submit" className="btn-primary w-full">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="py-20 bg-gradient-to-b from-slate-900/50 to-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-12">Connect With Us</h2>
          <div className="flex gap-6 justify-center flex-wrap">
            {[
              { name: 'Twitter', icon: '𝕏', color: 'from-blue-600 to-blue-700' },
              { name: 'LinkedIn', icon: 'in', color: 'from-blue-700 to-blue-800' },
              { name: 'Instagram', icon: '📷', color: 'from-pink-600 to-rose-600' },
              { name: 'GitHub', icon: '⚙️', color: 'from-gray-600 to-gray-700' },
            ].map((social, idx) => (
              <a
                key={idx}
                href="#"
                className={`w-16 h-16 rounded-lg bg-gradient-to-br ${social.color} flex items-center justify-center text-2xl hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-110`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
